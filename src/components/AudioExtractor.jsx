import React, { useState } from 'react';
import { Headphones, Search, Download, Music, Clock, User, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function AudioExtractor() {
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
        throw new Error(data.detail || data.error || 'Audio/Media not found');
      }
      setMediaInfo(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadAudio = () => {
    if (!url.trim()) return;
    setDownloading(true);
    const streamUrl = `/api/media/download?url=${encodeURIComponent(url.trim())}`;
    
    const link = document.createElement('a');
    link.href = streamUrl;
    link.setAttribute('download', mediaInfo?.file_name || 'telegram_audio.mp3');
    document.body.appendChild(link);
    link.click();
    link.remove();
    
    setTimeout(() => {
      setDownloading(false);
    }, 3000);
  };

  const formatDuration = (sec) => {
    if (!sec || sec <= 0) return 'Unknown duration';
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <Headphones size={24} color="var(--text-accent)" />
          <h2 style={{ fontSize: '1.3rem' }}>🎧 Audio & Voice Note Hub</h2>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px' }}>
          Download MP3 music, voice messages, or lectures from any restricted Telegram channel link. Save data by downloading lightweight audio!
        </p>

        <form onSubmit={handleInspect} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 280px' }}>
            <input
              type="text"
              className="input-field"
              placeholder="https://t.me/c/123456789/205 or https://t.me/music_channel/15"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            <Search size={18} />
            <span>{loading ? 'Analyzing Audio...' : 'Inspect Audio'}</span>
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
                background: 'rgba(0, 242, 254, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Music size={28} color="var(--text-accent)" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', wordBreak: 'break-all' }}>
                  {mediaInfo.title || mediaInfo.file_name}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {mediaInfo.performer ? `Artist / Performer: ${mediaInfo.performer}` : `Type: ${mediaInfo.media_type.toUpperCase()}`}
                </p>

                <div style={{ display: 'flex', gap: '14px', marginTop: '10px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={14} color="var(--text-accent)" />
                    {formatDuration(mediaInfo.duration)}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Size: <strong>{formatSize(mediaInfo.file_size)}</strong>
                  </span>
                </div>
              </div>
            </div>

            <button 
              onClick={handleDownloadAudio} 
              className="btn-primary" 
              disabled={downloading}
              style={{ padding: '14px 28px' }}
            >
              <Download size={20} />
              <span>{downloading ? 'Streaming...' : 'Download Audio / File'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
