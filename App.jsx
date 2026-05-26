import { useState, useRef, useCallback } from 'react';
import { Toolbar } from './components/Toolbar';
import { PaperSelector } from './components/PaperSelector';
import { PaperBackground } from './components/PaperBackground';
import { StickerPicker, StickerOverlay } from './components/StickerOverlay';
import { BloomResult } from './components/BloomResult';
import { PAPER_TYPES, FONTS, FONT_COLORS } from './data/journalData';
import { analyzeJournalEntry } from './utils/api';

const DEFAULT_SETTINGS = {
  fontId: 'caveat',
  fontSize: 18,
  colorId: 'ink',
  bold: false,
  italic: false,
  align: 'left',
};

export default function App() {
  const [view, setView] = useState('write');
  const [paperId, setPaperId] = useState('lined');
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [text, setText] = useState('');
  const [stickers, setStickers] = useState([]);
  const [images, setImages] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const paperRef = useRef(null);
  const imageInputRef = useRef(null);

  const paper = PAPER_TYPES.find(p => p.id === paperId) || PAPER_TYPES[1];
  const font = FONTS.find(f => f.id === settings.fontId) || FONTS[2];
  const color = FONT_COLORS.find(c => c.id === settings.colorId) || FONT_COLORS[0];

  const wordCount = text.trim().split(/\s+/).filter(w => w.length > 0).length;

  const handleSettingsChange = useCallback((updates) => {
    setSettings(s => ({ ...s, ...updates }));
  }, []);

  const handleAddSticker = (sticker) => {
    setStickers(s => [...s, {
      ...sticker,
      instanceId: Date.now() + Math.random(),
      x: 40 + Math.random() * 200,
      y: 40 + Math.random() * 200,
      size: 36,
    }]);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImages(imgs => [...imgs, {
          id: Date.now() + Math.random(),
          src: ev.target.result,
          x: 60 + Math.random() * 150,
          y: 60 + Math.random() * 150,
          width: 120,
        }]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const handleBloom = async () => {
    if (wordCount < 10) return;
    setError('');
    setView('loading');
    try {
      const res = await analyzeJournalEntry(text);
      setResult(res);
      setView('result');
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setView('write');
    }
  };

  const handleWriteAgain = () => {
    setView('write');
    setText('');
    setStickers([]);
    setImages([]);
    setResult(null);
    setError('');
  };

  if (view === 'result') {
    return <BloomResult result={result} onWriteAgain={handleWriteAgain} />;
  }

  if (view === 'loading') {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(160deg, #fdf6ff 0%, #f0f7ff 100%)',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 60, marginBottom: 24, animation: 'spin 3s linear infinite' }}>🌸</div>
          <p style={{ fontFamily: "'Lora', serif", fontSize: 20, color: '#7F77DD', fontStyle: 'italic' }}>
            Finding your flower…
          </p>
          <p style={{ fontSize: 14, color: '#aaa', marginTop: 8 }}>Reading what your heart wrote</p>
        </div>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #faf7ff 0%, #f5f8ff 50%, #fff8fa 100%)',
      padding: '0 0 60px',
    }}>
      <header style={{ textAlign: 'center', padding: '32px 20px 20px' }}>
        <h1 style={{
          fontFamily: "'Satisfy', cursive",
          fontSize: 36, fontWeight: 400,
          background: 'linear-gradient(135deg, #7F77DD 0%, #D4537E 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          margin: '0 0 6px',
        }}>
          Blooming Journal
        </h1>
        <p style={{ fontSize: 14, color: '#aaa', margin: 0, fontFamily: "'Lora', serif", fontStyle: 'italic' }}>
          Write freely. Receive your flower.
        </p>
      </header>

      <div style={{
        maxWidth: 820, margin: '0 auto 16px',
        padding: '0 20px',
        display: 'flex', alignItems: 'center',
        gap: 10, flexWrap: 'wrap',
      }}>
        <PaperSelector selected={paperId} onChange={setPaperId} />
        <div style={{ flex: 1 }} />
        <StickerPicker onAdd={handleAddSticker} />
        <button
          onClick={() => imageInputRef.current?.click()}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '7px 14px', borderRadius: 10,
            border: '1px solid rgba(0,0,0,0.1)',
            background: 'white', color: '#555',
            cursor: 'pointer', fontSize: 13, fontWeight: 500,
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          }}
        >
          <span style={{ fontSize: 16 }}>🖼️</span> Photo
        </button>
        <input ref={imageInputRef} type="file" accept="image/*" multiple onChange={handleImageUpload} style={{ display: 'none' }} />
      </div>

      <div style={{ maxWidth: 820, margin: '0 auto 12px', padding: '0 20px' }}>
        <Toolbar settings={settings} onChange={handleSettingsChange} />
      </div>

      <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 20px' }}>
        <div ref={paperRef} style={{
          position: 'relative', borderRadius: 12,
          boxShadow: '0 8px 40px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
          minHeight: 500,
        }}>
          <PaperBackground paper={paper}>
            {images.map(img => (
              <DraggableImage key={img.id} img={img}
                onUpdate={(id, u) => setImages(imgs => imgs.map(i => i.id === id ? { ...i, ...u } : i))}
                onRemove={(id) => setImages(imgs => imgs.filter(i => i.id !== id))}
                containerRef={paperRef}
              />
            ))}
            <StickerOverlay
              stickers={stickers}
              onUpdate={(id, u) => setStickers(s => s.map(st => st.instanceId === id ? { ...st, ...u } : st))}
              onRemove={(id) => setStickers(s => s.filter(st => st.instanceId !== id))}
              containerRef={paperRef}
            />
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Dear journal… write whatever is on your heart today."
              style={{
                width: '100%', minHeight: 500,
                padding: '32px 40px',
                background: 'transparent', border: 'none', outline: 'none', resize: 'none',
                fontFamily: font.family,
                fontSize: settings.fontSize,
                fontWeight: settings.bold ? 700 : 400,
                fontStyle: settings.italic ? 'italic' : 'normal',
                textAlign: settings.align,
                color: paper.dark && color.id === 'ink' ? '#e8e8f0' : color.value,
                lineHeight: 2,
                position: 'relative', zIndex: 3,
                caretColor: color.value,
              }}
            />
          </PaperBackground>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 }}>
          <span style={{ fontSize: 13, color: '#bbb' }}>
            {wordCount} word{wordCount !== 1 ? 's' : ''}
            {wordCount < 10 && wordCount > 0 && <span style={{ color: '#D4537E' }}> — write a little more</span>}
          </span>
          {error && <span style={{ fontSize: 13, color: '#e24b4a' }}>{error}</span>}
          <button
            onClick={handleBloom}
            disabled={wordCount < 10}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '12px 28px', borderRadius: 12,
              background: wordCount >= 10 ? 'linear-gradient(135deg, #7F77DD 0%, #D4537E 100%)' : '#e0e0e0',
              color: wordCount >= 10 ? 'white' : '#aaa',
              border: 'none', cursor: wordCount >= 10 ? 'pointer' : 'not-allowed',
              fontSize: 15, fontWeight: 500,
              boxShadow: wordCount >= 10 ? '0 4px 20px rgba(127,119,221,0.35)' : 'none',
              transition: 'all 0.2s',
              fontFamily: "'Satisfy', cursive",
            }}
          >
            🌸 Bloom my entry
          </button>
        </div>
      </div>
    </div>
  );
}

function DraggableImage({ img, onUpdate, onRemove, containerRef }) {
  const dragInfo = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    dragInfo.current = { offsetX: e.clientX - rect.left, offsetY: e.clientY - rect.top };

    const handleMove = (ev) => {
      if (!dragInfo.current || !containerRef.current) return;
      const cRect = containerRef.current.getBoundingClientRect();
      onUpdate(img.id, {
        x: ev.clientX - cRect.left - dragInfo.current.offsetX,
        y: ev.clientY - cRect.top - dragInfo.current.offsetY,
      });
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
    <div style={{ position: 'absolute', left: img.x, top: img.y, width: img.width, zIndex: 9, userSelect: 'none' }}
      onMouseDown={handleMouseDown}>
      <img src={img.src} alt="" style={{
        width: '100%', borderRadius: 8, cursor: 'grab',
        boxShadow: '0 2px 12px rgba(0,0,0,0.15)', border: '2px solid white', display: 'block',
      }} draggable={false} />
      <button onMouseDown={e => e.stopPropagation()} onClick={() => onRemove(img.id)}
        style={{
          position: 'absolute', top: -8, right: -8,
          width: 22, height: 22, borderRadius: '50%',
          background: '#ff4444', color: 'white',
          border: '2px solid white', fontSize: 12, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700,
        }}>×</button>
      <div style={{
        position: 'absolute', bottom: -6, right: -6,
        width: 14, height: 14, borderRadius: '50%',
        background: 'white', border: '2px solid #7F77DD', cursor: 'se-resize', zIndex: 11,
      }}
        onMouseDown={e => {
          e.stopPropagation(); e.preventDefault();
          const startX = e.clientX, startW = img.width;
          const mv = (ev) => onUpdate(img.id, { width: Math.max(60, startW + ev.clientX - startX) });
          const up = () => { window.removeEventListener('mousemove', mv); window.removeEventListener('mouseup', up); };
          window.addEventListener('mousemove', mv); window.addEventListener('mouseup', up);
        }} />
    </div>
  );
}
