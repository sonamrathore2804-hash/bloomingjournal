import { useState, useRef } from 'react';
import { STICKERS } from '../data/journalData';

export function StickerPicker({ onAdd }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = STICKERS.filter(s =>
    s.label.toLowerCase().includes(search.toLowerCase()) ||
    s.emoji.includes(search)
  );

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '7px 14px', borderRadius: 10,
          border: '1px solid rgba(0,0,0,0.1)',
          background: open ? '#ede9ff' : 'white',
          color: open ? '#534AB7' : '#555',
          cursor: 'pointer', fontSize: 13, fontWeight: 500,
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          transition: 'background 0.15s',
        }}
        title="Add sticker"
      >
        <span style={{ fontSize: 16 }}>✨</span> Stickers
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', right: 0, zIndex: 200,
          width: 280, background: 'white', borderRadius: 14,
          boxShadow: '0 12px 40px rgba(0,0,0,0.14)',
          border: '1px solid rgba(0,0,0,0.06)',
          padding: '12px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Stickers</span>
            <button onClick={() => setOpen(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 16, color: '#aaa' }}>×</button>
          </div>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search…"
            style={{
              width: '100%', padding: '6px 10px', borderRadius: 8,
              border: '1px solid #e0e0e0', fontSize: 13, marginBottom: 10,
              outline: 'none',
            }}
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 4 }}>
            {filtered.map(sticker => (
              <button key={sticker.id}
                onClick={() => { onAdd(sticker); setOpen(false); }}
                title={sticker.label}
                style={{
                  fontSize: 22, padding: 4, borderRadius: 8, border: 'none',
                  background: 'transparent', cursor: 'pointer', lineHeight: 1.4,
                  transition: 'background 0.1s, transform 0.1s',
                }}
                onMouseEnter={e => { e.target.style.background = '#f5f0ff'; e.target.style.transform = 'scale(1.15)'; }}
                onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.transform = 'scale(1)'; }}
              >
                {sticker.emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function StickerOverlay({ stickers, onUpdate, onRemove, containerRef }) {
  const dragInfo = useRef(null);

  const handleMouseDown = (e, id) => {
    e.preventDefault();
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    dragInfo.current = {
      id,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    };

    const handleMove = (ev) => {
      if (!dragInfo.current || !containerRef.current) return;
      const cRect = containerRef.current.getBoundingClientRect();
      const x = ev.clientX - cRect.left - dragInfo.current.offsetX;
      const y = ev.clientY - cRect.top - dragInfo.current.offsetY;
      onUpdate(dragInfo.current.id, { x, y });
    };

    const handleUp = () => {
      dragInfo.current = null;
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
  };

  return (
    <>
      {stickers.map(s => (
        <div key={s.instanceId}
          style={{
            position: 'absolute',
            left: s.x, top: s.y,
            fontSize: s.size || 36,
            cursor: 'grab',
            userSelect: 'none',
            zIndex: 10,
            lineHeight: 1,
          }}
          onMouseDown={e => handleMouseDown(e, s.instanceId)}
        >
          <div style={{ position: 'relative' }}>
            {s.emoji}
            <button
              onMouseDown={e => e.stopPropagation()}
              onClick={() => onRemove(s.instanceId)}
              style={{
                position: 'absolute', top: -8, right: -8,
                width: 18, height: 18, borderRadius: '50%',
                background: '#ff4444', color: 'white',
                border: 'none', fontSize: 10, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                lineHeight: 1, padding: 0,
                opacity: 0,
                transition: 'opacity 0.15s',
              }}
              className="sticker-remove"
            >×</button>
          </div>
        </div>
      ))}
      <style>{`.sticker-remove { opacity: 0 !important; } div:hover > div > .sticker-remove { opacity: 1 !important; }`}</style>
    </>
  );
}
