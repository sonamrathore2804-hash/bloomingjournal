export function PaperBackground({ paper, children }) {
  const lineColor = {
    'lined': 'rgba(180,200,220,0.5)',
    'dotted': 'rgba(160,180,200,0.5)',
    'grid': 'rgba(160,180,210,0.35)',
    'lined-sepia': 'rgba(140,100,60,0.2)',
    'lined-pink': 'rgba(220,140,160,0.3)',
    'lined-green': 'rgba(100,160,100,0.3)',
    'lined-dark': 'rgba(255,255,255,0.07)',
  };

  const getBackground = () => {
    if (paper.gradient) return paper.bg;
    return paper.bg;
  };

  const getOverlay = () => {
    if (!paper.lines) return null;
    const color = lineColor[paper.lines] || 'rgba(180,200,220,0.4)';

    if (paper.lines === 'dotted') {
      return (
        <svg style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:1}} preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="12" cy="12" r="1.2" fill={color}/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)"/>
        </svg>
      );
    }

    if (paper.lines === 'grid') {
      return (
        <svg style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:1}} preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d={`M 24 0 L 0 0 0 24`} fill="none" stroke={color} strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)"/>
        </svg>
      );
    }

    // lined variants
    return (
      <svg style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:1}} preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="lines" x="0" y="0" width="100%" height="32" patternUnits="userSpaceOnUse">
            <line x1="0" y1="31.5" x2="100%" y2="31.5" stroke={color} strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#lines)"/>
      </svg>
    );
  };

  return (
    <div style={{
      position: 'relative',
      background: getBackground(),
      borderRadius: '8px',
      overflow: 'hidden',
      minHeight: '100%',
    }}>
      {paper.texture === 'grain' && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          opacity: 0.3,
        }}/>
      )}
      {getOverlay()}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
}
