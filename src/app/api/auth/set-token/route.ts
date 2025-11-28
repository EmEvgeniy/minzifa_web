import { AUTH_COOKIE_NAME } from '@/constants';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const cookieStore = await cookies();

    cookieStore.set(AUTH_COOKIE_NAME, 'true', {
      path: '/',
      maxAge: 86400,
      httpOnly: false,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error setting auth token:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to set auth token' },
      { status: 500 },
    );
  }
}
