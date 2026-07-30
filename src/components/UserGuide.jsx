import React from 'react';
import { Key, Phone, Shield, Download, ExternalLink, HelpCircle, CheckCircle2, Lock, ArrowRight } from 'lucide-react';

export default function UserGuide() {
  return (
    <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Welcome Card */}
      <div className="glass-card" style={{ padding: '28px', border: '1px solid var(--border-glow)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'rgba(0, 242, 254, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <HelpCircle size={24} color="var(--text-accent)" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem' }}>📖 Help & User Guide</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Easy step-by-step tutorial on how to get API ID / Hash and download restricted Telegram videos
            </p>
          </div>
        </div>
      </div>

      {/* Step by Step Guide Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        
        {/* Step 1 */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              background: 'var(--gradient-neon)',
              color: '#080c16',
              fontWeight: 800,
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.9rem'
            }}>1</span>
            <h3 style={{ fontSize: '1.15rem' }}>Get Free API ID & API Hash</h3>
          </div>
          
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            To download restricted/private videos, you need an official free API ID from Telegram:
          </p>

          <ol style={{ paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>
              Open <a href="https://my.telegram.org" target="_blank" rel="noreferrer" style={{ color: 'var(--text-accent)', textDecoration: 'underline' }}>
                my.telegram.org <ExternalLink size={12} style={{ display: 'inline' }} />
              </a> in your browser.
            </li>
            <li>Login using your Telegram Phone Number & OTP verification code.</li>
            <li>Click on <strong>"API development tools"</strong>.</li>
            <li>
              Copy your <strong>App api_id</strong> (number) and <strong>App api_hash</strong> (long text string).
            </li>
          </ol>

          <div style={{
            marginTop: 'auto',
            padding: '12px',
            borderRadius: '8px',
            background: 'rgba(0, 242, 254, 0.08)',
            fontSize: '0.8rem',
            color: 'var(--text-accent)'
          }}>
            💡 Tip: This is 100% free and official from Telegram. You only need to do this once!
          </div>
        </div>

        {/* Step 2 */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              background: 'var(--gradient-neon)',
              color: '#080c16',
              fontWeight: 800,
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.9rem'
            }}>2</span>
            <h3 style={{ fontSize: '1.15rem' }}>Connect Your Account</h3>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Click the <strong>"Connect Telegram"</strong> button at the top right of this app:
          </p>

          <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>
              <strong>API ID:</strong> Paste the number you copied (e.g. <code>12345678</code>).
            </li>
            <li>
              <strong>API Hash:</strong> Paste the text string you copied.
            </li>
            <li>
              <strong>Phone Number:</strong> Always include country code with plus sign (e.g. <code>+92300...</code> or <code>+9198...</code>).
            </li>
            <li>
              Enter the OTP verification code received inside your Telegram app.
            </li>
          </ul>

          <div style={{
            marginTop: 'auto',
            padding: '12px',
            borderRadius: '8px',
            background: 'rgba(16, 185, 129, 0.1)',
            fontSize: '0.8rem',
            color: '#34d399',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <CheckCircle2 size={16} />
            <span>Your credentials are auto-saved in your browser!</span>
          </div>
        </div>

        {/* Step 3 */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              background: 'var(--gradient-neon)',
              color: '#080c16',
              fontWeight: 800,
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.9rem'
            }}>3</span>
            <h3 style={{ fontSize: '1.15rem' }}>Download Restricted Videos</h3>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Once connected, go to the <strong>Restricted Downloader</strong> tab:
          </p>

          <ol style={{ paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>
              Copy any message link from a Telegram channel (right click message &rarr; Copy Post Link).
            </li>
            <li>
              Example formats supported:<br />
              <code>https://t.me/c/123456789/105</code> (Private Channel)<br />
              <code>https://t.me/channelname/45</code> (Public Channel)
            </li>
            <li>
              Click <strong>Fetch Media Info</strong> and then <strong>Download Now</strong>!
            </li>
          </ol>

          <div style={{
            marginTop: 'auto',
            padding: '12px',
            borderRadius: '8px',
            background: 'rgba(245, 158, 11, 0.1)',
            fontSize: '0.8rem',
            color: '#fbbf24',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Lock size={16} />
            <span>Works even if "Restrict Saving Content" is ON!</span>
          </div>
        </div>

      </div>

      {/* Urdu / Hindi Simple Summary Card */}
      <div className="glass-card" style={{ padding: '24px', background: 'rgba(255, 255, 255, 0.02)' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '10px', color: 'var(--text-accent)' }}>
          💬 Asaan Urdu / Hindi Guidance:
        </h3>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
          <strong>API ID kahan se milti hai?</strong> Aap <code>my.telegram.org</code> par jaa kar apna number aur Telegram ka OTP daalein. Wahan <em>"API development tools"</em> ke andar aap ko <strong>App api_id</strong> aur <strong>App api_hash</strong> mil jayega. Yeh bilkul free aur Telegram ki tarf se legal hai.<br /><br />
          <strong>Phone number kaise likhna hai?</strong> Hamesha country code ke sath likhein (jaise Pakistan ke liye <code>+92300...</code> ya India ke liye <code>+9198...</code>). Ek baar login hone ke baad browser aap ki details save rakhy ga!
        </p>
      </div>

    </div>
  );
}
