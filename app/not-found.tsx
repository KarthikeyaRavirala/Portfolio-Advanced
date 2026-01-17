'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home if on a 404 that should not exist
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      router.push('/');
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
      <p className="mb-4">The page you are looking for might have been removed or doesn't exist.</p>
      <a 
        href="/" 
        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity"
      >
        Go Back Home
      </a>
    </div>
  );
}