import React, { useState, useEffect } from 'react';
import { Shield, Key, Phone, Check, AlertCircle, Lock } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [step, setStep] = useState('phone'); // phone | code
  const [apiId, setApiId] = useState('');
  const [apiHash, setApiHash] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Auto-load saved API ID & API Hash from browser LocalStorage
  useEffect(() => {
    const savedId = localStorage.getItem('tg_saved_api_id');
    const savedHash = localStorage.getItem('tg_saved_api_hash');
    const savedPhone = localStorage.getItem('tg_saved_phone');
    if (savedId) setApiId(savedId);
    if (savedHash) setApiHash(savedHash);
    if (savedPhone) setPhone(savedPhone);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSendCode = async (e) => {
    e.preventDefault();
    if (!apiId || !apiHash || !phone) {
      setError('Please fill in API ID, API Hash, and Phone Number.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      // Save credentials in Browser LocalStorage so user doesn't type again
      localStorage.setItem('tg_saved_api_id', apiId.trim());
      localStorage.setItem('tg_saved_api_hash', apiHash.trim());
      localStorage.setItem('tg_saved_phone', phone.trim());

      const res = await fetch('/api/auth/send_code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_id: parseInt(apiId, 10),
          api_hash: apiHash.trim(),
          phone_number: phone.trim()
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.detail || data.error || 'Failed to send OTP code');
      }
      setStep('code');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (!code) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/verify_code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: code.trim(),
          password: password.trim() || null
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.detail || data.error || 'Invalid OTP verification code');
      }
      onAuthSuccess(data.user);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(8, 12, 22, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div className="glass-card animate-fade" style={{ width: '100%', maxWidth: '480px', padding: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <Shield size={26} color="var(--text-accent)" />
          <div>
            <h3 style={{ fontSize: '1.25rem' }}>Telegram Account Login</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Connect directly via MTProto API to access private channels
            </p>
          </div>
        </div>

        {error && (
          <div style={{
            padding: '12px',
            borderRadius: '8px',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#fca5a5',
            fontSize: '0.85rem',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {step === 'phone' ? (
          <form onSubmit={handleSendCode} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                API ID (<a href="https://my.telegram.org" target="_blank" rel="noreferrer" style={{ color: 'var(--text-accent)' }}>Get Free from Telegram</a>)
              </label>
              <input
                type="number"
                className="input-field"
                placeholder="12345678"
                value={apiId}
                onChange={(e) => setApiId(e.target.value)}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                API Hash
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="0123456789abcdef0123456789abcdef"
                value={apiHash}
                onChange={(e) => setApiHash(e.target.value)}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                Phone Number (with Country Code)
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="+923001234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
              <button type="button" onClick={onClose} className="btn-secondary" style={{ flex: 1 }}>
                Cancel
              </button>
              <button type="submit" className="btn-primary" disabled={loading} style={{ flex: 2 }}>
                <span>{loading ? 'Sending Code...' : 'Send OTP Code'}</span>
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerifyCode} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                Telegram Verification Code (Sent via Telegram App)
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="12345"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                2FA Password (Optional, only if enabled)
              </label>
              <input
                type="password"
                className="input-field"
                placeholder="Enter Two-Factor password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
              <button type="button" onClick={() => setStep('phone')} className="btn-secondary" style={{ flex: 1 }}>
                Back
              </button>
              <button type="submit" className="btn-primary" disabled={loading} style={{ flex: 2 }}>
                <span>{loading ? 'Verifying...' : 'Complete Login'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
