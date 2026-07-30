import React, { useState } from 'react';
import { Download, Search, Film, Lock, Unlock, FileText, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export default function DownloaderTab() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [mediaInfo, setMediaInfo] = useState(null);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState(false);

  const handleInspect = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setError('');
    setMediaInfo(null);

    try {
      const res = await fetch('/api/media/info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.detail || data.error || 'Media not found');
      }
      setMediaInfo(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!url.trim()) return;
    setDownloading(true);
    // Direct stream link via FastAPI backend
    const streamUrl = `/api/media/download?url=${encodeURIComponent(url.trim())}`;
    
    // Trigger download in browser
    const link = document.createElement('a');
    link.href = streamUrl;
    link.setAttribute('download', mediaInfo?.file_name || 'telegram_download.mp4');
    document.body.appendChild(link);
    link.click();
    link.remove();
    
    setTimeout(() => {
      setDownloading(false);
    }, 3000);
  };

  const formatSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="animate-fade">
      <div className="glass-card" style={{ padding: '28px', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>
          📥 Download Restricted & Private Telegram Videos
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px' }}>
          Paste any Telegram post link (e.g. <code>https://t.me/c/123456789/100</code>). Even if Saving Content is restricted by channel admins, our Cloud Hub extracts it securely.
        </p>

        <form onSubmit={handleInspect} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 280px' }}>
            <input
              type="text"
              className="input-field"
              placeholder="https://t.me/c/123456789/150 or https://t.me/channel/15"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            <Search size={18} />
            <span>{loading ? 'Analyzing...' : 'Fetch Media Info'}</span>
          </button>
        </form>

        {error && (
          <div style={{
            marginTop: '16px',
            padding: '14px',
            borderRadius: '10px',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            color: '#fca5a5',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <AlertTriangle size={18} />
            <span>{error}</span>
          </div>
        )}
      </div>

      {mediaInfo && (
        <div className="glass-card animate-fade" style={{ padding: '28px', border: '1px solid var(--border-glow)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '12px',
                background: 'rgba(0, 242, 254, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Film size={28} color="var(--text-accent)" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', wordBreak: 'break-all' }}>{mediaInfo.file_name}</h3>
                <div style={{ display: 'flex', gap: '12px', marginTop: '6px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Size: <strong style={{ color: 'var(--text-main)' }}>{formatSize(mediaInfo.file_size)}</strong>
                  </span>
                  <span style={{
                    fontSize: '0.85rem',
                    padding: '2px 8px',
                    borderRadius: '20px',
                    background: mediaInfo.is_protected ? 'rgba(245, 158, 11, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                    color: mediaInfo.is_protected ? '#fbbf24' : '#34d399',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    {mediaInfo.is_protected ? <Lock size={12} /> : <Unlock size={12} />}
                    {mediaInfo.is_protected ? 'Restricted / Protected' : 'Public Access'}
                  </span>
                </div>
              </div>
            </div>

            <button 
              onClick={handleDownload} 
              className="btn-primary" 
              disabled={downloading}
              style={{ padding: '14px 28px' }}
            >
              <Download size={20} />
              <span>{downloading ? 'Starting Stream...' : 'Download Now'}</span>
            </button>
          </div>

          {mediaInfo.caption && (
            <div style={{
              marginTop: '20px',
              padding: '16px',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '10px',
              borderLeft: '3px solid var(--text-accent)'
            }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                <FileText size={14} style={{ display: 'inline', marginRight: '6px' }} />
                Caption / Description:
              </p>
              <p style={{ fontSize: '0.95rem', whiteSpace: 'pre-wrap' }}>{mediaInfo.caption}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
