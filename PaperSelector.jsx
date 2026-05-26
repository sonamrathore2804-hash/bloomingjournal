import { useState } from 'react';
import { PAPER_TYPES } from '../data/journalData';

export function PaperSelector({ selected, onChange }) {
  const [open, setOpen] = useState(false);
  const current = PAPER_TYPES.find(p => p.id === selected) || PAPER_TYPES[0];

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '7px 14px', borderRadius: 10,
          border: '1px solid rgba(0,0,0,0.1)',
          background: open ? '#ede9ff' : 'white',
          color: open ? '#534AB7' : '#555',
          cursor: 'pointer', fontSize: 13, fontWeight: 500,
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          transition: 'background 0.15s',
        }}
      >
        <PaperPreview paper={current} size={20} />
        {current.name}
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', left: 0, zIndex: 200,
          width: 300, background: 'white', borderRadius: 14,
          boxShadow: '0 12px 40px rgba(0,0,0,0.14)',
          border: '1px solid rgba(0,0,0,0.06)',
          padding: '14px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Paper type</span>
            <button onClick={() => setOpen(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 16, color: '#aaa' }}>×</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {PAPER_TYPES.map(paper => (
              <button
                key={paper.id}
                onClick={() => { onChange(paper.id); setOpen(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 12px', borderRadius: 10,
                  border: `2px solid ${selected === paper.id ? '#7F77DD' : '#ebebeb'}`,
                  background: selected === paper.id ? '#f5f0ff' : 'white',
                  cursor: 'pointer', textAlign: 'left',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => { if (selected !== paper.id) e.currentTarget.style.borderColor = '#ccc'; }}
                onMouseLeave={e => { if (selected !== paper.id) e.currentTarget.style.borderColor = '#ebebeb'; }}
              >
                <PaperPreview paper={paper} size={36} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: selected === paper.id ? '#534AB7' : '#333' }}>
                    {paper.name}
                  </div>
                  {paper.dark && <div style={{ fontSize: 10, color: '#aaa' }}>Dark theme</div>}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PaperPreview({ paper, size }) {
  const style = {
    width: size, height: size * 1.3,
    borderRadius: 4,
    flexShrink: 0,
    border: '1px solid rgba(0,0,0,0.1)',
    overflow: 'hidden',
    position: 'relative',
    background: paper.gradient ? paper.bg : paper.preview || paper.bg,
  };

  return (
    <div style={style}>
      {paper.lines && (
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          {paper.lines.includes('grid') ? (
            <path d={`M ${size/2} 0 L ${size/2} ${size*1.3} M 0 ${size*0.5} L ${size} ${size*0.5}`}
              stroke={paper.dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'} strokeWidth="0.5" fill="none"/>
          ) : paper.lines === 'dotted' ? (
            <>
              <circle cx={size*0.3} cy={size*0.4} r="1" fill={paper.dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'}/>
              <circle cx={size*0.7} cy={size*0.4} r="1" fill={paper.dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'}/>
              <circle cx={size*0.3} cy={size*0.7} r="1" fill={paper.dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'}/>
              <circle cx={size*0.7} cy={size*0.7} r="1" fill={paper.dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'}/>
            </>
          ) : (
            <>
              <line x1="0" y1={size*0.35} x2={size} y2={size*0.35} stroke={paper.dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'} strokeWidth="0.8"/>
              <line x1="0" y1={size*0.65} x2={size} y2={size*0.65} stroke={paper.dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'} strokeWidth="0.8"/>
              <line x1="0" y1={size*0.95} x2={size} y2={size*0.95} stroke={paper.dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'} strokeWidth="0.8"/>
            </>
          )}
        </svg>
      )}
    </div>
  );
}
