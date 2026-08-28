import Link from 'next/link';
import { FileQuestion, Home } from 'lucide-react';
import { Button } from './components/ui/button/button';

export default function NotFound() {
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
          background: 'var(--color-accent-subtle)',
          color: 'var(--color-accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px',
        }}
      >
        <FileQuestion size={28} />
      </div>

      <h1
        style={{
          fontSize: '2rem',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          margin: '0 0 8px',
        }}
      >
        404 — Page Not Found
      </h1>

      <p
        style={{
          fontSize: '0.9375rem',
          color: 'var(--color-text-secondary)',
          maxWidth: '440px',
          margin: '0 0 24px',
          lineHeight: 1.6,
        }}
      >
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>

      <Link href="/">
        <Button variant="primary" icon={<Home size={16} />}>
          Back to README Generator
        </Button>
      </Link>
    </div>
  );
}
