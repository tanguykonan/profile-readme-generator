'use client';

import { useEffect } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import Link from 'next/link';
import { Button } from './components/ui/button/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled Application Error:', error);
  }, [error]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
        padding: '24px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'rgba(244, 63, 94, 0.12)',
          color: '#f43f5e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px',
        }}
      >
        <AlertTriangle size={28} />
      </div>

      <h1
        style={{
          fontSize: '1.75rem',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          margin: '0 0 8px',
        }}
      >
        Something went wrong
      </h1>

      <p
        style={{
          fontSize: '0.9375rem',
          color: 'var(--color-text-secondary)',
          maxWidth: '480px',
          margin: '0 0 24px',
          lineHeight: 1.6,
        }}
      >
        An unexpected error occurred while rendering this page. Don&apos;t worry, your drafts in
        local storage are preserved.
      </p>

      <div style={{ display: 'flex', gap: '12px' }}>
        <Button variant="primary" icon={<RotateCcw size={16} />} onClick={() => reset()}>
          Try Again
        </Button>
        <Link href="/">
          <Button variant="secondary" icon={<Home size={16} />}>
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
