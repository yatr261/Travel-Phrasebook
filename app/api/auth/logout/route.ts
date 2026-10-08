import { NextResponse } from 'next/server';
import { destroySessionCookie } from '../../../../lib/auth/session';

export async function POST() {
  try {
    await destroySessionCookie();
    return NextResponse.json(
      { success: true, message: 'Logged out successfully!' },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error('Logout API Error:', err);
    return NextResponse.json(
      { error: 'Failed to logout cleanly.' },
      { status: 500 }
    );
  }
}
