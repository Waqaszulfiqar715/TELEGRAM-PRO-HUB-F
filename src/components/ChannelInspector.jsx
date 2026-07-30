import React, { useState } from 'react';
import { Search, Users, ShieldAlert, Film, Calendar, Lock, Unlock, AlertTriangle } from 'lucide-react';

export default function ChannelInspector() {
  const [channelUrl, setChannelUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const handleInspect = async (e) => {
    e.preventDefault();
    if (!channelUrl.trim()) return;
    setLoading(true);
    setError('');
    setData(null);

    try {
      const res = await fetch('/api/channel/inspect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channel_url: channelUrl.trim() })
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.detail || result.error || 'Channel inspection failed');
      }
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade">
      <div className="glass-card" style={{ padding: '28px', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>
          🔍 Channel Inspector & Protection Checker
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px' }}>
          Inspect any Telegram channel to check if admins have enabled "Restrict Saving Content" and view recent media files.
        </p>

        <form onSubmit={handleInspect} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 280px' }}>
            <input
              type="text"
              className="input-field"
              placeholder="https://t.me/channel_name or @channel_name"
              value={channelUrl}
              onChange={(e) => setChannelUrl(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            <Search size={18} />
            <span>{loading ? 'Inspecting...' : 'Analyze Channel'}</span>
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

      {data && (
        <div className="glass-card animate-fade" style={{ padding: '28px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid var(--border-glass)',
            paddingBottom: '20px',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <h3 style={{ fontSize: '1.3rem' }}>{data.channel.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                @{data.channel.username || data.channel.id}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{
                padding: '8px 16px',
                borderRadius: '20px',
                background: 'rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Users size={16} color="var(--text-accent)" />
                <span style={{ fontSize: '0.9rem' }}>{data.channel.members_count.toLocaleString()} Members</span>
              </div>

              <div style={{
                padding: '8px 16px',
                borderRadius: '20px',
                background: data.channel.has_protected_content ? 'rgba(245, 158, 11, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                color: data.channel.has_protected_content ? '#fbbf24' : '#34d399',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                {data.channel.has_protected_content ? <Lock size={16} /> : <Unlock size={16} />}
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                  {data.channel.has_protected_content ? 'Restricted Content Enabled' : 'Normal / Downloadable'}
                </span>
              </div>
            </div>
          </div>

          <h4 style={{ fontSize: '1rem', marginBottom: '14px', color: 'var(--text-muted)' }}>
            Recent Posts & Media Status:
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {data.recent_posts.map((post) => (
              <div key={post.id} style={{
                padding: '16px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-glass)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    background: 'rgba(0, 242, 254, 0.15)',
                    color: 'var(--text-accent)'
                  }}>
                    {post.type} #{post.id}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {post.date ? new Date(post.date).toLocaleDateString() : ''}
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', minHeight: '38px', marginBottom: '8px' }}>
                  {post.caption || 'No caption text'}
                </p>
                <div style={{ fontSize: '0.8rem', color: post.is_protected ? '#fbbf24' : '#34d399' }}>
                  {post.is_protected ? '🛡️ Protected Content' : '✅ Direct Download Available'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
