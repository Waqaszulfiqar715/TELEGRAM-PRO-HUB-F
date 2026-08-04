import React, { useState } from 'react';
import { HardDrive, Search, Download, ExternalLink, Copy, Check, AlertTriangle, Film } from 'lucide-react';

export default function TeraBoxDownloader() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleInspect = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setError('');
    setFileInfo(null);
    setCopied(false);

    try {
      const res = await fetch('/api/terabox/info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.detail || data.error || 'Could not resolve TeraBox link');
      }
      setFileInfo(data);
    } catch (err) {
      if (err.message.includes('json') || err.message.includes('JSON') || err.message.includes('fetch')) {
        setError('❌ Backend Server offline hai! Pehly Python Backend chalayen ya Render server URL verify karein.');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    if (!fileInfo?.download_url) return;
    navigator.clipboard.writeText(fileInfo.download_url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  return (
    <div className="animate-fade">
      <div className="glass-card" style={{ padding: '28px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <HardDrive size={24} color="var(--text-accent)" />
          <h2 style={{ fontSize: '1.3rem' }}>📦 TeraBox & DiskWala Cloud Downloader</h2>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px' }}>
          Paste any TeraBox or DiskWala share link (terabox.com, diskwala.com, thediskwala.com, etc.) to <strong>generate instant high-speed download links</strong>!
        </p>

        <form onSubmit={handleInspect} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 280px' }}>
            <input
              type="text"
              className="input-field"
              placeholder="https://terasharefile.com/s/1xxxx or https://diskwala.com/s/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            <Search size={18} />
            <span>{loading ? 'Resolving TeraBox...' : 'Inspect & Play'}</span>
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

      {fileInfo && (
        <div className="glass-card animate-fade" style={{ padding: '28px', border: '1px solid var(--border-glow)' }}>
          {/* Top File Title & Metadata */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid var(--border-glass)' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              {fileInfo.thumb ? (
                <img
                  src={fileInfo.thumb}
                  alt="TeraBox Thumb"
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '12px',
                    objectFit: 'cover',
                    border: '1px solid var(--border-glass)'
                  }}
                />
              ) : (
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '12px',
                  background: 'rgba(0, 242, 254, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Film size={28} color="var(--text-accent)" />
                </div>
              )}

              <div>
                <h3 style={{ fontSize: '1.2rem', wordBreak: 'break-all' }}>
                  {fileInfo.file_name}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Size: <strong>{fileInfo.size}</strong> • Source: <strong>{fileInfo.source}</strong>
                </p>
                {fileInfo.note && (
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-accent)', marginTop: '4px' }}>
                    💡 {fileInfo.note}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Download Action Buttons */}
          <div>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
              📥 Choose a Fast Download Server to get your file:
            </h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              <a 
                href={fileInfo.download_url}
                target="_blank"
                rel="noreferrer"
                className="btn-primary" 
                style={{ 
                  padding: '12px 24px', 
                  textDecoration: 'none', 
                  background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)', 
                  color: '#000', 
                  fontWeight: 700 
                }}
              >
                <Download size={20} />
                <span>⚡ Download Server 1 (Fast)</span>
              </a>

              {fileInfo.backup_url && (
                <a 
                  href={fileInfo.backup_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary" 
                  style={{ 
                    padding: '12px 20px', 
                    textDecoration: 'none', 
                    background: 'rgba(255, 255, 255, 0.12)', 
                    border: '1px solid var(--border-glass)' 
                  }}
                >
                  <ExternalLink size={18} />
                  <span>🌐 Mirror Server 2</span>
                </a>
              )}

              <button 
                onClick={handleCopyLink} 
                className="btn-primary" 
                style={{
                  background: copied ? '#10b981' : 'rgba(255, 255, 255, 0.08)',
                  color: copied ? '#fff' : 'var(--text-main)',
                  border: '1px solid var(--border-glass)',
                  padding: '12px 18px'
                }}
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                <span>{copied ? 'Copied URL! ✅' : 'Copy Direct Link'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
