import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
}

export interface PublicUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

const DB_DIR = path.join(process.cwd(), 'lib', 'db', 'data');
const DB_FILE = path.join(DB_DIR, 'users.json');

// In-memory cache for ultra-fast access
let usersCache: UserRecord[] | null = null;

function ensureDbDirectory(): void {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
}

function loadUsersFromDisk(): UserRecord[] {
  if (usersCache !== null) {
    return usersCache;
  }

  ensureDbDirectory();

  if (!fs.existsSync(DB_FILE)) {
    // Seed initial demo user securely
    const demoPasswordHash = bcrypt.hashSync('Password123!', 10);
    const initialUsers: UserRecord[] = [
      {
        id: 'usr_demo_1',
        name: 'Yatri Traveler',
        email: 'test@example.com',
        passwordHash: demoPasswordHash,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    fs.writeFileSync(DB_FILE, JSON.stringify(initialUsers, null, 2), 'utf-8');
    usersCache = initialUsers;
    return usersCache;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    usersCache = JSON.parse(raw) as UserRecord[];
    return usersCache;
  } catch (err) {
    console.error('Error reading users database from disk:', err);
    usersCache = [];
    return usersCache;
  }
}

function saveUsersToDisk(users: UserRecord[]): void {
  ensureDbDirectory();
  usersCache = users;
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing users database to disk:', err);
  }
}

export function sanitizeUser(user: UserRecord): PublicUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}

export async function findUserByEmail(email: string): Promise<UserRecord | null> {
  const users = loadUsersFromDisk();
  const normalizedEmail = email.trim().toLowerCase();
  const user = users.find((u) => u.email.toLowerCase() === normalizedEmail);
  return user || null;
}

export async function findUserById(id: string): Promise<UserRecord | null> {
  const users = loadUsersFromDisk();
  const user = users.find((u) => u.id === id);
  return user || null;
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
}): Promise<PublicUser> {
  const normalizedEmail = data.email.trim().toLowerCase();
  const existing = await findUserByEmail(normalizedEmail);

  if (existing) {
    throw new Error('An account with this email already exists.');
  }

  // Hash password securely with bcrypt
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(data.password, saltRounds);

  const newUser: UserRecord = {
    id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: data.name.trim(),
    email: normalizedEmail,
    passwordHash,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const users = loadUsersFromDisk();
  users.push(newUser);
  saveUsersToDisk(users);

  return sanitizeUser(newUser);
}

export async function verifyUserPassword(
  email: string,
  password: string
): Promise<PublicUser | null> {
  const user = await findUserByEmail(email);
  if (!user) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    return null;
  }

  return sanitizeUser(user);
}
