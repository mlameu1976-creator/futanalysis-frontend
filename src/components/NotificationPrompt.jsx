import { useEffect, useState } from 'react';
import { requestNotificationPermission, onForegroundMessage } from '../lib/firebase';

const T = {
  bg: "#080C10", surface: "#0E1419", border: "#1E2830",
  yellow: "#F5C518", green: "#2ECC71", red: "#E83B3B",
  text: "#EDF2F7", textMid: "#94A3B8",
  font: "'JetBrains Mono', 'Fira Code', monospace",
};

export default function NotificationPrompt() {
  const [status, setStatus]   = useState('idle'); // idle | asking | granted | denied
  const [toast, setToast]     = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem('notif_status');
    if (saved) setStatus(saved);

    // escuta mensagens em foreground
    onForegroundMessage((payload) => {
      setToast({
        title: payload.notification?.title || 'FutAnalysis',
        body:  payload.notification?.body  || '',
      });
      setTimeout(() => setToast(null), 8000);
    });
  }, []);

  async function handleEnable() {
    setStatus('asking');
    try {
      const token = await requestNotificationPermission();
      if (token) {
        setStatus('granted');
        localStorage.setItem('notif_status', 'granted');
      } else {
        setStatus('denied');
        localStorage.setItem('notif_status', 'denied');
      }
    } catch (e) {
      setStatus('denied');
      localStorage.setItem('notif_status', 'denied');
    }
  }

  if (status === 'granted' && !toast) return null;
  if (status === 'denied') return null;
  if (status === 'asking') return null;

  return (
    <>
      {/* Toast de notificação foreground */}
      {toast && (
        <div style={{
          position: 'fixed', top: '1rem', right: '1rem', zIndex: 9999,
          background: T.surface, border: `1px solid ${T.yellow}`,
          borderRadius: '10px', padding: '1rem 1.2rem',
          maxWidth: '320px', fontFamily: T.font,
          boxShadow: `0 4px 20px rgba(0,0,0,0.5)`,
        }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: T.yellow, marginBottom: '0.3rem' }}>
            ⚡ {toast.title}
          </div>
          <div style={{ fontSize: '0.75rem', color: T.textMid }}>{toast.body}</div>
          <button onClick={() => setToast(null)} style={{
            position: 'absolute', top: '0.5rem', right: '0.7rem',
            background: 'none', border: 'none', color: T.textMid,
            cursor: 'pointer', fontSize: '1rem',
          }}>×</button>
        </div>
      )}

      {/* Banner de permissão */}
      {status === 'idle' && (
        <div style={{
          position: 'fixed', bottom: '1rem', left: '50%',
          transform: 'translateX(-50%)', zIndex: 9998,
          background: T.surface, border: `1px solid ${T.border}`,
          borderRadius: '12px', padding: '1rem 1.5rem',
          width: 'calc(100% - 2rem)', maxWidth: '420px',
          fontFamily: T.font, boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          display: 'flex', flexDirection: 'column', gap: '0.8rem',
        }}>
          <div style={{ fontSize: '0.82rem', color: T.text, fontWeight: 700 }}>
            🔔 Ativar alertas de pressão ao vivo?
          </div>
          <div style={{ fontSize: '0.72rem', color: T.textMid }}>
            Receba notificações quando um time estiver em alta pressão e com grande chance de gol.
          </div>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <button onClick={handleEnable} style={{
              flex: 1, background: T.yellow, color: '#000',
              border: 'none', borderRadius: '8px', padding: '0.6rem',
              fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer',
              fontFamily: T.font,
            }}>Ativar notificações</button>
            <button onClick={() => { setStatus('denied'); localStorage.setItem('notif_status','denied'); }} style={{
              background: T.surface, color: T.textMid,
              border: `1px solid ${T.border}`, borderRadius: '8px',
              padding: '0.6rem 1rem', fontSize: '0.78rem',
              cursor: 'pointer', fontFamily: T.font,
            }}>Agora não</button>
          </div>
        </div>
      )}
    </>
  );
}
