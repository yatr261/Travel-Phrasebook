import { NextResponse } from 'next/server';
import { getSessionFromCookies } from '../../../../lib/auth/session';

export async function GET() {
  try {
    const user = await getSessionFromCookies();

    if (!user) {
      return NextResponse.json(
        { authenticated: false, user: null },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        authenticated: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error('Session check error:', err);
    return NextResponse.json(
      { authenticated: false, user: null },
      { status: 200 }
    );
  }
}
