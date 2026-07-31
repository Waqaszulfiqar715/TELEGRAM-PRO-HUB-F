import React from 'react';
import { Shield, Radio, LogOut } from 'lucide-react';

export default function Header({ authStatus, onOpenAuth, onLogout }) {
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 0',
      borderBottom: '1px solid var(--border-glass)',
      marginBottom: '32px',
      flexWrap: 'wrap',
      gap: '16px'
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

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        {authStatus?.authenticated ? (
          <>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid #10b981',
                borderRadius: '12px',
                color: '#10b981',
                fontSize: '0.85rem',
                fontWeight: 600
              }}
            >
              <Shield size={16} />
              <span>Connected ({authStatus.user?.first_name || 'User'})</span>
            </div>

            <button
              onClick={onLogout}
              className="btn-secondary"
              style={{
                padding: '8px 14px',
                fontSize: '0.8rem',
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid #ef4444',
                color: '#f87171',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              title="Disconnect and log in with another account"
            >
              <LogOut size={15} />
              <span>Disconnect</span>
            </button>
          </>
        ) : (
          <button 
            onClick={onOpenAuth}
            className="btn-secondary" 
            style={{
              padding: '8px 16px',
              fontSize: '0.85rem',
              borderColor: 'var(--text-accent)'
            }}
          >
            <Shield size={16} color="var(--text-accent)" />
            <span>Connect Telegram</span>
          </button>
        )}
      </div>
    </header>
  );
}
