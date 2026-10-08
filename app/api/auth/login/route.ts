import { NextRequest, NextResponse } from 'next/server';
import { verifyUserPassword } from '../../../../lib/db/users';
import { createSessionCookie } from '../../../../lib/auth/session';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // 1. Validation
    if (!email || typeof email !== 'string' || !email.trim()) {
      return NextResponse.json(
        { error: 'Email is required.' },
        { status: 400 }
      );
    }

    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Password is required.' },
        { status: 400 }
      );
    }

    // 2. Verify user credentials (bcrypt comparison)
    const publicUser = await verifyUserPassword(email, password);

    if (!publicUser) {
      // Do NOT reveal whether email exists separately from wrong password
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // 3. Create HTTP-only session cookie
    await createSessionCookie({
      id: publicUser.id,
      name: publicUser.name,
      email: publicUser.email,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Logged in successfully!',
        user: publicUser,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error('Login API Error:', err);
    return NextResponse.json(
      { error: (err as Error)?.message || 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
