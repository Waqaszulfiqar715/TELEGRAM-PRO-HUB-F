import React from 'react';
import { Shield, Radio, Terminal, ExternalLink } from 'lucide-react';

export default function Header({ authStatus, onOpenAuth }) {
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 0',
      borderBottom: '1px solid var(--border-glass)',
      marginBottom: '32px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '12px',
          background: 'var(--gradient-neon)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 20px rgba(0, 242, 254, 0.4)'
        }}>
          <Radio size={24} color="#080c16" />
        </div>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
            TELEGRAM <span style={{ color: 'var(--text-accent)' }}>PRO HUB</span>
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Restricted Media Downloader & Cloud Suite
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button 
          onClick={onOpenAuth}
          className="btn-secondary" 
          style={{
            padding: '8px 16px',
            fontSize: '0.85rem',
            borderColor: authStatus?.authenticated ? '#10b981' : 'var(--border-glass)'
          }}
        >
          <Shield size={16} color={authStatus?.authenticated ? '#10b981' : 'var(--text-accent)'} />
          <span>
            {authStatus?.authenticated 
              ? `Connected (${authStatus.user?.first_name})` 
              : 'Connect Telegram'}
          </span>
        </button>
      </div>
    </header>
  );
}
