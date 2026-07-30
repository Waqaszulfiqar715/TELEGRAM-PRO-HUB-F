import React from 'react';
import { Terminal, Cloud, Server, Smartphone, ExternalLink, Code } from 'lucide-react';

export default function ProTools() {
  return (
    <div className="animate-fade" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
      
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
          <Cloud size={24} color="var(--text-accent)" />
          <h3 style={{ fontSize: '1.2rem' }}>1. Frontend on Vercel</h3>
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
          Your React frontend includes a pre-configured <code>vercel.json</code>. You can deploy it to Vercel in 1 click for free mobile & web access everywhere.
        </p>
        <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '12px', borderRadius: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#38bdf8' }}>
          npm i -g vercel<br />
          cd frontend && vercel --prod
        </div>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
          <Server size={24} color="var(--text-accent)" />
          <h3 style={{ fontSize: '1.2rem' }}>2. Backend on Render</h3>
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
          The FastAPI backend has a ready-to-use <code>Dockerfile</code> and <code>render.yaml</code> for Render.com free cloud hosting.
        </p>
        <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '12px', borderRadius: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#34d399' }}>
          # Render &rarr; New &rarr; Blueprint<br />
          # Select repository & build from render.yaml
        </div>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
          <Terminal size={24} color="var(--text-accent)" />
          <h3 style={{ fontSize: '1.2rem' }}>3. Offline PC Script</h3>
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
          Don't have internet or cloud servers? Use our standalone Python CLI script directly on your computer terminal.
        </p>
        <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '12px', borderRadius: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#facc15' }}>
          python cli_downloader.py --url "t.me/c/123/10"
        </div>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
          <Smartphone size={24} color="var(--text-accent)" />
          <h3 style={{ fontSize: '1.2rem' }}>4. Mobile Optimized UI</h3>
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
          The entire interface is built with responsive touch targets and glassmorphism styling, making it feel like a native app on Android or iOS.
        </p>
        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
          <span style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: '20px', background: 'rgba(255,255,255,0.08)' }}>
            📱 Responsive
          </span>
          <span style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: '20px', background: 'rgba(255,255,255,0.08)' }}>
            ⚡ Fast Streaming
          </span>
        </div>
      </div>

    </div>
  );
}
