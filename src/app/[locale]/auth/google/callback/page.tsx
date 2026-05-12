'use client';

import { useEffect } from 'react';

export default function GoogleCallbackPage() {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const status = searchParams.get('status');

    if (status === 'error') {
      const message = searchParams.get('message') || 'Authentication failed';
      window.opener?.postMessage(
        { type: 'google-auth-error', error: message },
        '*'
      );
      window.close();
      return;
    }

    if (status === 'success') {
      window.opener?.postMessage(
        { type: 'google-auth-success' },
        '*'
      );
    }

    window.close();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-500">Completing sign in...</p>
    </div>
  );
}
