import { NextRequest, NextResponse } from 'next/server';
import { createUser, findUserByEmail } from '../../../../lib/db/users';
import { createSessionCookie } from '../../../../lib/auth/session';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, confirmPassword } = body;

    // 1. Validation
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        { error: 'Name is required.' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !email.trim()) {
      return NextResponse.json(
        { error: 'Email is required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Password is required.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match.' },
        { status: 400 }
      );
    }

    // 2. Check if email already exists
    const existing = await findUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email already exists.' },
        { status: 400 }
      );
    }

    // 3. Create user in database (password is hashed inside createUser)
    const publicUser = await createUser({
      name,
      email,
      password,
    });

    // 4. Create HTTP-only session cookie
    await createSessionCookie({
      id: publicUser.id,
      name: publicUser.name,
      email: publicUser.email,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Account created successfully!',
        user: publicUser,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error('Registration API Error:', err);
    return NextResponse.json(
      { error: (err as Error)?.message || 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
