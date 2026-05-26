import { useState } from 'react';
import { FlowerSVG } from './FlowerSVG';
import { FLOWER_DATA } from '../data/journalData';

const EMAILJS_PUBLIC_KEY = 'uwyzH6muyaY0OC256';
const EMAILJS_SERVICE_ID = 'service_zd25728';
const EMAILJS_TEMPLATE_ID = 'template_azaq91b';

async function sendEmail({ to_email, flower_name, flower_meaning, quote, author, reflection }) {
  const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATE_ID,
      user_id: EMAILJS_PUBLIC_KEY,
      template_params: { to_email, flower_name, flower_meaning, quote, author, reflection },
    }),
  });
  if (!res.ok) throw new Error('Email failed');
}

export function BloomResult({ result, onWriteAgain }) {
  const [email, setEmail] = useState('');
  const [wantsEmail, setWantsEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState('idle'); // idle | sending | sent | error
  const flower = FLOWER_DATA[result.flower] || FLOWER_DATA.daisy;

  const handleEmail = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailStatus('invalid');
      return;
    }
    setEmailStatus('sending');
    try {
      await sendEmail({
        to_email: email,
        flower_name: flower.name,
        flower_meaning: flower.meaning,
        quote: result.quote,
        author: result.author,
        reflection: result.reflection,
      });
      setEmailStatus('sent');
    } catch {
      setEmailStatus('error');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #fdf6ff 0%, #f0f7ff 50%, #fff5f8 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '40px 20px',
    }}>
      <div style={{ maxWidth: 520, width: '100%', animation: 'bloomIn 0.6s cubic-bezier(0.34,1.56,0.64,1) both' }}>

        {/* Flower card */}
        <div style={{
          textAlign: 'center', marginBottom: 20,
          background: 'white', borderRadius: 24,
          padding: '40px 32px 32px',
          boxShadow: '0 4px 40px rgba(127,119,221,0.12), 0 1px 8px rgba(0,0,0,0.04)',
          border: '1px solid rgba(127,119,221,0.1)',
        }}>
          <FlowerSVG type={result.flower} size={140} />

          <div style={{
            display: 'inline-block', padding: '4px 14px', borderRadius: 20,
            background: flower.color + '22', color: flower.color,
            fontSize: 12, fontWeight: 600, textTransform: 'uppercase',
            letterSpacing: '0.08em', margin: '12px 0 20px',
          }}>
            {flower.name} · {flower.meaning}
          </div>

          <blockquote style={{
            fontFamily: "'Lora', serif", fontSize: 20, lineHeight: 1.6,
            fontStyle: 'italic', color: '#2a2a3e', margin: '0 0 12px',
          }}>
            "{result.quote}"
          </blockquote>

          <p style={{ fontSize: 14, color: '#888', margin: '0 0 24px' }}>— {result.author}</p>

          <p style={{
            fontSize: 15, lineHeight: 1.7, color: '#555',
            padding: '16px 20px', borderRadius: 12,
            background: '#faf8ff', border: '1px solid rgba(127,119,221,0.12)',
            margin: 0, textAlign: 'left',
          }}>
            {result.reflection}
          </p>
        </div>

        {/* Email card */}
        <div style={{
          background: 'white', borderRadius: 16, padding: '20px 24px',
          boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
          border: '1px solid rgba(0,0,0,0.06)', marginBottom: 16,
        }}>
          {emailStatus === 'sent' ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#3B6D11', fontSize: 14 }}>
              <span style={{ fontSize: 22 }}>✉️</span>
              <span>Sent to <strong>{email}</strong> — check your inbox! 🌸</span>
            </div>
          ) : (
            <>
              <label style={{
                display: 'flex', alignItems: 'center', gap: 10,
                cursor: 'pointer', marginBottom: wantsEmail ? 12 : 0,
                fontSize: 14, color: '#555',
              }}>
                <input type="checkbox" checked={wantsEmail}
                  onChange={e => { setWantsEmail(e.target.checked); setEmailStatus('idle'); }}
                  style={{ width: 16, height: 16, cursor: 'pointer' }}
                />
                Email me my flower & quote 🌸
              </label>

              {wantsEmail && (
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    type="email" value={email}
                    onChange={e => { setEmail(e.target.value); setEmailStatus('idle'); }}
                    placeholder="your@email.com"
                    onKeyDown={e => e.key === 'Enter' && handleEmail()}
                    style={{
                      flex: 1, padding: '8px 12px', borderRadius: 8,
                      border: `1px solid ${emailStatus === 'invalid' ? '#e24b4a' : '#ddd'}`,
                      fontSize: 14, outline: 'none',
                    }}
                  />
                  <button onClick={handleEmail}
                    disabled={emailStatus === 'sending'}
                    style={{
                      padding: '8px 16px', borderRadius: 8,
                      background: emailStatus === 'sending' ? '#b0a8f0' : '#7F77DD',
                      color: 'white', border: 'none',
                      fontSize: 14, cursor: emailStatus === 'sending' ? 'not-allowed' : 'pointer',
                      fontWeight: 500, minWidth: 64,
                    }}>
                    {emailStatus === 'sending' ? '...' : 'Send'}
                  </button>
                </div>
              )}

              {emailStatus === 'invalid' && (
                <p style={{ fontSize: 12, color: '#e24b4a', marginTop: 6 }}>Please enter a valid email address.</p>
              )}
              {emailStatus === 'error' && (
                <p style={{ fontSize: 12, color: '#e24b4a', marginTop: 6 }}>Something went wrong — please try again.</p>
              )}
            </>
          )}
        </div>

        <button onClick={onWriteAgain} style={{
          width: '100%', padding: '13px', borderRadius: 12,
          border: '1.5px solid rgba(127,119,221,0.3)',
          background: 'transparent', color: '#7F77DD',
          fontSize: 15, fontWeight: 500, cursor: 'pointer',
          transition: 'all 0.15s',
        }}
          onMouseEnter={e => e.target.style.background = '#f5f0ff'}
          onMouseLeave={e => e.target.style.background = 'transparent'}
        >
          ✍️ Write another entry
        </button>
      </div>

      <style>{`
        @keyframes bloomIn {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
