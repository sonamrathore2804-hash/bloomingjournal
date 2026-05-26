export function FlowerSVG({ type, size = 160 }) {
  const props = { width: size, height: size * 1.15, viewBox: '0 0 120 140' };

  if (type === 'rose') return (
    <svg {...props} aria-label="Rose">
      <ellipse cx="60" cy="125" rx="8" ry="15" fill="#3B6D11"/>
      <path d="M60 125 Q45 100 38 75" stroke="#3B6D11" strokeWidth="2.5" fill="none"/>
      <ellipse cx="42" cy="88" rx="12" ry="7" fill="#639922" transform="rotate(-30 42 88)"/>
      <circle cx="60" cy="58" r="28" fill="#F7C1C1"/>
      <circle cx="60" cy="58" r="22" fill="#F09595"/>
      <circle cx="60" cy="58" r="16" fill="#E24B4A"/>
      <circle cx="60" cy="58" r="9" fill="#A32D2D"/>
      <ellipse cx="48" cy="42" rx="12" ry="8" fill="#F7C1C1" transform="rotate(-20 48 42)"/>
      <ellipse cx="74" cy="40" rx="12" ry="8" fill="#F7C1C1" transform="rotate(20 74 40)"/>
      <ellipse cx="38" cy="60" rx="10" ry="7" fill="#F09595" transform="rotate(-10 38 60)"/>
      <ellipse cx="82" cy="58" rx="10" ry="7" fill="#F09595" transform="rotate(10 82 58)"/>
    </svg>
  );

  if (type === 'sunflower') {
    const petals = Array.from({ length: 12 }, (_, i) => {
      const a = i * 30;
      const r = 28, cx = 60 + r * Math.cos(a * Math.PI / 180), cy = 50 + r * Math.sin(a * Math.PI / 180);
      return <ellipse key={i} cx={cx} cy={cy} rx="9" ry="16" fill="#FAC775" transform={`rotate(${a} ${cx} ${cy})`}/>;
    });
    const seeds = Array.from({ length: 8 }, (_, i) => {
      const a = i * 45, r = 8, cx = 60 + r * Math.cos(a * Math.PI / 180), cy = 50 + r * Math.sin(a * Math.PI / 180);
      return <circle key={i} cx={cx} cy={cy} r="2.5" fill="#FAC775"/>;
    });
    return (
      <svg {...props} aria-label="Sunflower">
        <rect x="57" y="80" width="6" height="55" rx="3" fill="#3B6D11"/>
        <ellipse cx="42" cy="100" rx="13" ry="7" fill="#639922" transform="rotate(-30 42 100)"/>
        <ellipse cx="78" cy="108" rx="13" ry="7" fill="#639922" transform="rotate(20 78 108)"/>
        {petals}
        <circle cx="60" cy="50" r="18" fill="#633806"/>
        <circle cx="60" cy="50" r="13" fill="#412402"/>
        {seeds}
      </svg>
    );
  }

  if (type === 'lotus') return (
    <svg {...props} aria-label="Lotus">
      <ellipse cx="60" cy="118" rx="35" ry="8" fill="#9FE1CB"/>
      <path d="M60 115 Q52 90 55 70" stroke="#0F6E56" strokeWidth="2.5" fill="none"/>
      <ellipse cx="60" cy="85" rx="5" ry="18" fill="#AFA9EC"/>
      <ellipse cx="60" cy="85" rx="5" ry="18" fill="#AFA9EC" transform="rotate(20 60 85)"/>
      <ellipse cx="60" cy="85" rx="5" ry="18" fill="#AFA9EC" transform="rotate(-20 60 85)"/>
      <ellipse cx="60" cy="80" rx="8" ry="22" fill="#CECBF6" transform="rotate(40 60 80)"/>
      <ellipse cx="60" cy="80" rx="8" ry="22" fill="#CECBF6" transform="rotate(-40 60 80)"/>
      <ellipse cx="60" cy="78" rx="10" ry="25" fill="#EEEDFE" transform="rotate(65 60 78)"/>
      <ellipse cx="60" cy="78" rx="10" ry="25" fill="#EEEDFE" transform="rotate(-65 60 78)"/>
      <ellipse cx="60" cy="76" rx="11" ry="26" fill="#EEEDFE" transform="rotate(90 60 76)"/>
      <circle cx="60" cy="72" r="10" fill="#7F77DD"/>
      <circle cx="60" cy="72" r="5" fill="#FAC775"/>
    </svg>
  );

  if (type === 'lavender') {
    const buds = [0,8,16,24,32,40].map((y, i) => {
      const x = 60 + (i % 2 === 0 ? -5 : 5);
      const fill = i < 2 ? '#534AB7' : i < 4 ? '#7F77DD' : '#AFA9EC';
      return <ellipse key={i} cx={x} cy={55+y} rx="6" ry="5" fill={fill}/>;
    });
    return (
      <svg {...props} aria-label="Lavender">
        <line x1="60" y1="130" x2="60" y2="55" stroke="#3B6D11" strokeWidth="2.5"/>
        <line x1="60" y1="100" x2="45" y2="88" stroke="#3B6D11" strokeWidth="1.5"/>
        <line x1="60" y1="90" x2="75" y2="78" stroke="#3B6D11" strokeWidth="1.5"/>
        {buds}
        <ellipse cx="60" cy="50" rx="5" ry="7" fill="#3C3489"/>
      </svg>
    );
  }

  if (type === 'daisy') {
    const petals = Array.from({ length: 10 }, (_, i) => {
      const a = i * 36, r = 26, cx = 58 + r * Math.cos(a * Math.PI / 180), cy = 52 + r * Math.sin(a * Math.PI / 180);
      return <ellipse key={i} cx={cx} cy={cy} rx="7" ry="14" fill="#F1EFE8" transform={`rotate(${a} ${cx} ${cy})`}/>;
    });
    return (
      <svg {...props} aria-label="Daisy">
        <rect x="55" y="78" width="6" height="57" rx="3" fill="#3B6D11"/>
        <ellipse cx="40" cy="105" rx="14" ry="7" fill="#639922" transform="rotate(-25 40 105)"/>
        {petals}
        <circle cx="58" cy="52" r="14" fill="#EF9F27"/>
        <circle cx="58" cy="52" r="8" fill="#BA7517"/>
      </svg>
    );
  }

  if (type === 'cherry_blossom') {
    const branch1Petals = [[-8,-8,0],[8,-8,15],[-14,0,-25],[14,0,25],[0,-15,0]].map(([dx,dy,rot], i) => (
      <ellipse key={i} cx={30+dx} cy={25+dy} rx="9" ry="11"
        fill={i%2===0?'#FBEAF0':'#F4C0D1'} transform={`rotate(${rot} ${30+dx} ${25+dy})`}/>
    ));
    const branch2Petals = [[-8,-8,0],[8,-8,15],[-12,0,-25],[12,0,25],[0,-14,0]].map(([dx,dy,rot], i) => (
      <ellipse key={i} cx={80+dx} cy={40+dy} rx="9" ry="11"
        fill={i%2===0?'#FBEAF0':'#F4C0D1'} transform={`rotate(${rot} ${80+dx} ${40+dy})`}/>
    ));
    return (
      <svg {...props} aria-label="Cherry Blossom">
        <path d="M60 130 Q55 110 50 90 Q45 70 55 55" stroke="#633806" strokeWidth="3" fill="none"/>
        <path d="M55 55 Q40 40 30 25" stroke="#633806" strokeWidth="2" fill="none"/>
        <path d="M55 70 Q70 55 80 40" stroke="#633806" strokeWidth="2" fill="none"/>
        {branch1Petals}
        {branch2Petals}
        <circle cx="30" cy="18" r="5" fill="#FAC775"/>
        <circle cx="80" cy="33" r="5" fill="#FAC775"/>
      </svg>
    );
  }

  return null;
}
