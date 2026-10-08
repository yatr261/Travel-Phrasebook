import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'auth_session';
const DEFAULT_SECRET = 'travel_phrasebook_jwt_secret_key_2026_super_secure';

function getJwtSecret(): string {
  return process.env.JWT_SECRET || DEFAULT_SECRET;
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
}

export interface JwtPayload {
  user: SessionUser;
  exp: number;
}

// Simple Web Crypto HMAC SHA-256 JWT implementation (Edge & Node compatible)
function base64UrlEncode(str: string): string {
  const base64 = btoa(str);
  return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return atob(base64);
}

async function signJwt(payload: JwtPayload): Promise<string> {
  const secret = getJwtSecret();
  const header = { alg: 'HS256', typ: 'JWT' };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const dataToSign = `${encodedHeader}.${encodedPayload}`;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(dataToSign));
  const signatureArray = Array.from(new Uint8Array(signature));
  const signatureBase64 = base64UrlEncode(
    String.fromCharCode(...signatureArray)
  );

  return `${dataToSign}.${signatureBase64}`;
}

export async function verifyJwt(token: string): Promise<JwtPayload | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [encodedHeader, encodedPayload, signature] = parts;
    const dataToSign = `${encodedHeader}.${encodedPayload}`;

    const secret = getJwtSecret();
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const sigBinary = Uint8Array.from(
      base64UrlDecode(signature),
      (c) => c.charCodeAt(0)
    );

    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      sigBinary,
      encoder.encode(dataToSign)
    );

    if (!isValid) return null;

    const payload: JwtPayload = JSON.parse(base64UrlDecode(encodedPayload));
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return null; // Expired
    }

    return payload;
  } catch (err) {
    console.error('JWT Verification Error:', err);
    return null;
  }
}

export async function createSessionCookie(user: SessionUser): Promise<string> {
  const sevenDaysInSeconds = 7 * 24 * 60 * 60;
  const exp = Math.floor(Date.now() / 1000) + sevenDaysInSeconds;

  const token = await signJwt({ user, exp });

  const cookieStore = await cookies();
  cookieStore.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: sevenDaysInSeconds,
  });

  return token;
}

export async function destroySessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set({
    name: SESSION_COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}

export async function getSessionFromCookies(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    if (!sessionCookie?.value) return null;

    const payload = await verifyJwt(sessionCookie.value);
    return payload?.user || null;
  } catch {
    return null;
  }
}
