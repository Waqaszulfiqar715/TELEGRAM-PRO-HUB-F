import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import DownloaderTab from './components/DownloaderTab';
import TeraBoxDownloader from './components/TeraBoxDownloader';
import AudioExtractor from './components/AudioExtractor';
import TextCopier from './components/TextCopier';
import ChannelInspector from './components/ChannelInspector';
import UserGuide from './components/UserGuide';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import { Download, Search, Shield, HelpCircle, Headphones, FileText, HardDrive } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('downloader'); // downloader | terabox | audio | text | inspector | guide
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authStatus, setAuthStatus] = useState({ authenticated: false, user: null });

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const res = await fetch('/api/auth/status');
      const data = await res.json();
      if (data.authenticated) {
        setAuthStatus(data);
      }
    } catch (err) {
      console.log('Backend offline or not running locally yet.');
    }
  };

  const tabs = [
    { id: 'downloader', label: '📥 Video Downloader', icon: Download },
    { id: 'terabox', label: '📦 TeraBox & DiskWala Hub', icon: HardDrive },
    { id: 'audio', label: '🎧 Audio & Voice Hub', icon: Headphones },
    { id: 'text', label: '📝 Text & Caption Copier', icon: FileText },
    { id: 'inspector', label: '🔍 Channel Inspector', icon: Search },
    { id: 'guide', label: '📖 Help & User Guide', icon: HelpCircle },
  ];

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
      <Header 
        authStatus={authStatus} 
        onOpenAuth={() => setAuthModalOpen(true)} 
      />

      {/* Navigation Tabs */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '28px',
        borderBottom: '1px solid var(--border-glass)',
        paddingBottom: '16px',
        overflowX: 'auto'
      }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: activeTab === tab.id ? 'rgba(0, 242, 254, 0.15)' : 'transparent',
              color: activeTab === tab.id ? 'var(--text-accent)' : 'var(--text-muted)',
              border: activeTab === tab.id ? '1px solid var(--text-accent)' : '1px solid transparent',
              borderRadius: '12px',
              padding: '10px 20px',
              fontSize: '0.95rem',
              fontWeight: activeTab === tab.id ? 700 : 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <main>
        {activeTab === 'downloader' && <DownloaderTab />}
        {activeTab === 'terabox' && <TeraBoxDownloader />}
        {activeTab === 'audio' && <AudioExtractor />}
        {activeTab === 'text' && <TextCopier />}
        {activeTab === 'inspector' && <ChannelInspector />}
        {activeTab === 'guide' && <UserGuide />}
      </main>

      <Footer />

      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        onAuthSuccess={(user) => setAuthStatus({ authenticated: true, user })}
      />
    </div>
  );
}
