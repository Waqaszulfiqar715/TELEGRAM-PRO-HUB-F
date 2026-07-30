import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      marginTop: '60px',
      padding: '30px 0',
      borderTop: '1px solid var(--border-glass)',
      textAlign: 'center',
      color: 'var(--text-muted)',
      fontSize: '0.85rem'
    }}>
      <p style={{ marginBottom: '8px' }}>
        ⚡ <strong>Telegram Pro Media Hub</strong> — Fast & Secure Restricted Media Downloader
      </p>
      <p style={{ fontSize: '0.8rem' }}>
        Powered by MTProto Cloud API • Secure & Privacy Protected
      </p>
    </footer>
  );
}
