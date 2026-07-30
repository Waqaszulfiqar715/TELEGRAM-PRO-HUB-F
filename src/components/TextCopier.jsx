import React, { useState } from 'react';
import { FileText, Search, Copy, Check, AlertTriangle, MessageSquare, AlignLeft } from 'lucide-react';

export default function TextCopier() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [textData, setTextData] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleInspect = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setError('');
    setTextData(null);
    setCopied(false);

    try {
      const res = await fetch('/api/media/info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.detail || data.error || 'Message text not found');
      }
      setTextData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyText = () => {
    if (!textData?.caption) return;
    navigator.clipboard.writeText(textData.caption);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  const wordCount = textData?.caption ? textData.caption.trim().split(/\s+/).filter(Boolean).length : 0;
  const charCount = textData?.caption ? textData.caption.length : 0;

  return (
    <div className="animate-fade">
      <div className="glass-card" style={{ padding: '28px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <FileText size={24} color="var(--text-accent)" />
          <h2 style={{ fontSize: '1.3rem' }}>📝 Restricted Text & Caption Copier</h2>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px' }}>
          Channels often disable copying text or course notes using "Restrict Saving Content". Paste any link here to copy formatted text instantly!
        </p>

        <form onSubmit={handleInspect} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 280px' }}>
            <input
              type="text"
              className="input-field"
              placeholder="https://t.me/c/123456789/400 or https://t.me/notes_channel/90"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            <Search size={18} />
            <span>{loading ? 'Extracting Text...' : 'Extract Text / Caption'}</span>
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

      {textData && (
        <div className="glass-card animate-fade" style={{ padding: '28px', border: '1px solid var(--border-glow)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AlignLeft size={20} color="var(--text-accent)" />
              <h3 style={{ fontSize: '1.1rem' }}>Extracted Message Content</h3>
              <span style={{ fontSize: '0.8rem', padding: '2px 10px', borderRadius: '20px', background: 'rgba(255,255,255,0.06)', color: 'var(--text-muted)' }}>
                {wordCount} Words • {charCount} Characters
              </span>
            </div>

            <button 
              onClick={handleCopyText} 
              className="btn-primary" 
              style={{
                background: copied ? '#10b981' : 'var(--gradient-neon)',
                color: '#080c16'
              }}
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              <span>{copied ? 'Copied to Clipboard! ✅' : 'Copy Full Text'}</span>
            </button>
          </div>

          <div style={{
            padding: '20px',
            borderRadius: '12px',
            background: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid var(--border-glass)',
            minHeight: '120px',
            maxHeight: '400px',
            overflowY: 'auto',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.95rem',
            lineHeight: '1.7',
            whiteSpace: 'pre-wrap',
            color: textData.caption ? 'var(--text-main)' : 'var(--text-muted)'
          }}>
            {textData.caption || 'No text or caption found in this message.'}
          </div>
        </div>
      )}
    </div>
  );
}
