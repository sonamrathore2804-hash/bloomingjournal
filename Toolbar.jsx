import { useState } from 'react';
import { FONTS, FONT_SIZES, FONT_COLORS } from '../data/journalData';

export function Toolbar({ settings, onChange }) {
  const [activePanel, setActivePanel] = useState(null);

  const toggle = (panel) => setActivePanel(p => p === panel ? null : panel);

  const currentFont = FONTS.find(f => f.id === settings.fontId) || FONTS[2];
  const currentColor = FONT_COLORS.find(c => c.id === settings.colorId) || FONT_COLORS[0];

  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '4px',
        padding: '6px 10px',
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(8px)',
        borderRadius: '12px',
        boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
        border: '1px solid rgba(0,0,0,0.06)',
        flexWrap: 'wrap',
      }}>
        {/* Font family */}
        <button onClick={() => toggle('font')} style={btnStyle(activePanel === 'font')} title="Font">
          <span style={{ fontFamily: currentFont.family, fontSize: '13px', fontWeight: 500 }}>Aa</span>
          <span style={{ fontSize: '11px', marginLeft: 4, opacity: 0.7 }}>{currentFont.name}</span>
        </button>

        <Divider />

        {/* Font size */}
        <button onClick={() => toggle('size')} style={btnStyle(activePanel === 'size')} title="Size">
          <span style={{ fontSize: '12px' }}>T</span>
          <span style={{ fontSize: '10px', verticalAlign: 'super', marginLeft: 1 }}>{settings.fontSize}</span>
        </button>

        <Divider />

        {/* Color */}
        <button onClick={() => toggle('color')} style={btnStyle(activePanel === 'color')} title="Text color">
          <span style={{ fontSize: '14px', fontWeight: 700, color: currentColor.value,
            textShadow: currentColor.value === '#ffffff' ? '0 0 0 1px #ccc' : 'none' }}>A</span>
          <span style={{
            display: 'block', width: 14, height: 3, borderRadius: 2,
            background: currentColor.value,
            border: currentColor.value === '#ffffff' ? '1px solid #ddd' : 'none',
            marginLeft: 2,
          }}/>
        </button>

        <Divider />

        {/* Bold / Italic */}
        <button
          onClick={() => onChange({ bold: !settings.bold })}
          style={btnStyle(settings.bold)}
          title="Bold"
        >
          <span style={{ fontWeight: 700, fontSize: '13px' }}>B</span>
        </button>
        <button
          onClick={() => onChange({ italic: !settings.italic })}
          style={btnStyle(settings.italic)}
          title="Italic"
        >
          <span style={{ fontStyle: 'italic', fontSize: '13px' }}>i</span>
        </button>

        <Divider />

        {/* Align */}
        {['left','center','right'].map(align => (
          <button key={align}
            onClick={() => onChange({ align })}
            style={btnStyle(settings.align === align)}
            title={`Align ${align}`}
          >
            <AlignIcon align={align} />
          </button>
        ))}
      </div>

      {/* Font panel */}
      {activePanel === 'font' && (
        <FloatingPanel onClose={() => setActivePanel(null)} title="Choose font">
          {['script','handwritten','serif','typewriter'].map(cat => (
            <div key={cat} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em',
                color: '#999', marginBottom: 6 }}>{cat}</div>
              {FONTS.filter(f => f.category === cat).map(font => (
                <button key={font.id}
                  onClick={() => { onChange({ fontId: font.id }); setActivePanel(null); }}
                  style={{
                    display: 'block', width: '100%', textAlign: 'left',
                    padding: '8px 12px', borderRadius: 8, border: 'none', cursor: 'pointer',
                    background: settings.fontId === font.id ? '#f0ebff' : 'transparent',
                    fontFamily: font.family, fontSize: '17px',
                    color: settings.fontId === font.id ? '#534AB7' : '#333',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => { if (settings.fontId !== font.id) e.target.style.background = '#f7f7f7'; }}
                  onMouseLeave={e => { if (settings.fontId !== font.id) e.target.style.background = 'transparent'; }}
                >
                  {font.name}
                </button>
              ))}
            </div>
          ))}
        </FloatingPanel>
      )}

      {/* Size panel */}
      {activePanel === 'size' && (
        <FloatingPanel onClose={() => setActivePanel(null)} title="Font size" width={180}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {FONT_SIZES.map(size => (
              <button key={size}
                onClick={() => { onChange({ fontSize: size }); setActivePanel(null); }}
                style={{
                  width: 44, height: 36, borderRadius: 8, border: '1px solid',
                  borderColor: settings.fontSize === size ? '#7F77DD' : '#e0e0e0',
                  background: settings.fontSize === size ? '#f0ebff' : 'white',
                  color: settings.fontSize === size ? '#534AB7' : '#333',
                  fontSize: '13px', fontWeight: 500, cursor: 'pointer',
                }}
              >{size}</button>
            ))}
          </div>
        </FloatingPanel>
      )}

      {/* Color panel */}
      {activePanel === 'color' && (
        <FloatingPanel onClose={() => setActivePanel(null)} title="Text color" width={220}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {FONT_COLORS.map(c => (
              <button key={c.id}
                onClick={() => { onChange({ colorId: c.id }); setActivePanel(null); }}
                title={c.label}
                style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: c.value,
                  border: settings.colorId === c.id ? '3px solid #7F77DD' : '2px solid rgba(0,0,0,0.1)',
                  cursor: 'pointer', transition: 'transform 0.1s',
                }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.1)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
              />
            ))}
          </div>
        </FloatingPanel>
      )}
    </div>
  );
}

function FloatingPanel({ children, onClose, title, width = 240 }) {
  return (
    <div style={{
      position: 'absolute', top: 'calc(100% + 8px)', left: 0, zIndex: 100,
      width, background: 'white', borderRadius: 12,
      boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
      border: '1px solid rgba(0,0,0,0.06)',
      padding: '14px 16px',
      maxHeight: 360, overflowY: 'auto',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{title}</span>
        <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 16, color: '#999', padding: '0 2px' }}>×</button>
      </div>
      {children}
    </div>
  );
}

function Divider() {
  return <div style={{ width: 1, height: 20, background: 'rgba(0,0,0,0.1)', margin: '0 2px' }}/>;
}

function AlignIcon({ align }) {
  const lines = align === 'left'
    ? [[0,12],[0,8],[0,10]]
    : align === 'center'
    ? [[1,10],[2,8],[1,10]]
    : [[2,12],[2,8],[2,10]];
  return (
    <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
      {lines.map(([offset, w], i) => (
        <line key={i} x1={offset} y1={i*4+1} x2={offset+w} y2={i*4+1} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      ))}
    </svg>
  );
}

function btnStyle(active) {
  return {
    display: 'flex', alignItems: 'center',
    padding: '5px 8px', borderRadius: 7,
    border: 'none', cursor: 'pointer',
    background: active ? '#ede9ff' : 'transparent',
    color: active ? '#534AB7' : '#555',
    transition: 'background 0.15s',
  };
}
