export default function Loading() {
  return (
    <div
      style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '32px 16px',
        paddingTop: '80px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <div
        style={{
          height: '140px',
          background: 'var(--color-bg-secondary)',
          borderRadius: 'var(--radius-xl)',
          animation: 'pulse 1.5s infinite',
        }}
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
        }}
      >
        <div
          style={{
            height: '400px',
            background: 'var(--color-bg-secondary)',
            borderRadius: 'var(--radius-xl)',
            animation: 'pulse 1.5s infinite',
          }}
        />
        <div
          style={{
            height: '400px',
            background: 'var(--color-bg-secondary)',
            borderRadius: 'var(--radius-xl)',
            animation: 'pulse 1.5s infinite',
          }}
        />
      </div>
    </div>
  );
}
