// One table scene, two worlds. magic=false: ordinary game night. magic=true: the same people, transformed.
// Everything magic-only has class "m-only", everything normal-only "n-only", so GSAP can crossfade
// between them in a single SVG (see concepts.jsx). Pass `both` to render both layers at once.

const PLAYERS = [
  // x, y, scale, flip, shirt, skin, hair, magic outfit
  { x: 165, y: 470, s: 1.05, flip: false, shirt: '#5b7fa6', skin: '#e8b98f', hair: '#3b2a1e', role: 'mage', robe: '#3b2a7a' },
  { x: 255, y: 430, s: 0.85, flip: false, shirt: '#8a9a5b', skin: '#c68a5e', hair: '#1c1410', role: 'barbarian', robe: '#6b2d1a' },
  { x: 545, y: 430, s: 0.85, flip: true, shirt: '#b0605a', skin: '#f0c9a4', hair: '#c2803c', role: 'elf', robe: '#2f5a3a' },
  { x: 635, y: 470, s: 1.05, flip: true, shirt: '#6f6f7a', skin: '#8d5a3b', hair: '#140d0a', role: 'rogue', robe: '#22242e' },
]

function Hat({ role }) {
  if (role === 'mage') return (
    <g>
      <path d="M-40,-136 Q0,-122 40,-136 L44,-128 Q0,-112 -44,-128 Z" fill="#2a1f5c" />
      <path d="M-30,-132 L28,-132 Q14,-170 22,-214 Q-4,-190 -30,-132 Z" fill="#3b2a7a" />
      <circle cx="-4" cy="-160" r="3" fill="#f5d27a" />
      <circle cx="10" cy="-182" r="2" fill="#f5d27a" />
    </g>
  )
  if (role === 'barbarian') return (
    <g>
      <path d="M-30,-122 Q0,-162 30,-122 Z" fill="#8a8f99" stroke="#4a4d55" strokeWidth="2" />
      <path d="M-28,-128 Q-58,-140 -54,-176 Q-46,-148 -22,-138 Z" fill="#efe4c8" />
      <path d="M28,-128 Q58,-140 54,-176 Q46,-148 22,-138 Z" fill="#efe4c8" />
    </g>
  )
  if (role === 'elf') return (
    <g>
      <path d="M-27,-118 L-48,-138 L-25,-108 Z" fill="#f0c9a4" />
      <path d="M27,-118 L48,-138 L25,-108 Z" fill="#f0c9a4" />
      <path d="M-26,-130 Q0,-140 26,-130" stroke="#f5d27a" strokeWidth="3" fill="none" />
      <circle cx="0" cy="-138" r="4" fill="#7fe0c0" />
    </g>
  )
  return ( // rogue hood
    <path d="M-36,-90 Q-42,-150 0,-154 Q42,-150 36,-90 Q30,-130 0,-132 Q-30,-130 -36,-90 Z" fill="#22242e" />
  )
}

function Person({ p, magic }) {
  const wow = magic
  return (
    <g transform={`translate(${p.x},${p.y}) scale(${p.flip ? -p.s : p.s},${p.s})`}>
      {/* body */}
      <path d="M-44,0 Q-46,-66 -22,-88 L22,-88 Q46,-66 44,0 Z" fill={magic ? p.robe : p.shirt} />
      {magic && <path d="M-6,-88 L0,-40 L6,-88 Z" fill="#f5d27a" opacity="0.7" />}
      {/* arms: down on table normally, thrown up in awe when magic */}
      {wow ? (
        <g stroke={magic ? p.robe : p.shirt} strokeWidth="16" strokeLinecap="round" fill="none">
          <path d="M-30,-76 Q-62,-110 -50,-150" />
          <path d="M30,-76 Q64,-104 58,-146" />
        </g>
      ) : (
        <g stroke={p.shirt} strokeWidth="16" strokeLinecap="round" fill="none">
          <path d="M-30,-76 Q-40,-40 -6,-44" />
          <path d="M30,-76 Q44,-40 70,-48" />
        </g>
      )}
      {wow && <><circle cx="-50" cy="-156" r="9" fill={p.skin} /><circle cx="58" cy="-152" r="9" fill={p.skin} /></>}
      {/* head */}
      <rect x="-9" y="-100" width="18" height="16" fill={p.skin} />
      <circle cx="0" cy="-116" r="27" fill={p.skin} />
      {!(magic && p.role === 'barbarian') && <path d="M-27,-118 Q-26,-148 0,-146 Q28,-148 27,-118 Q14,-134 -27,-118 Z" fill={p.hair} />}
      {/* face: facing inward, so features sit on the right side */}
      <circle cx="10" cy="-118" r="2.6" fill="#1a0f0a" />
      <circle cx="22" cy="-118" r="2.6" fill="#1a0f0a" />
      {wow
        ? <ellipse cx="16" cy="-102" rx="5" ry="7" fill="#3a1410" />
        : <path d="M10,-104 Q16,-101 22,-104" stroke="#3a1410" strokeWidth="2" fill="none" />}
      {wow && <path d="M6,-128 Q10,-131 14,-128 M18,-128 Q22,-131 26,-128" stroke="#1a0f0a" strokeWidth="2" fill="none" />}
      {magic && <Hat role={p.role} />}
      {/* phone glow in the boring world */}
      {!magic && p.role === 'rogue' && <rect x="58" y="-60" width="12" height="20" rx="2" fill="#9fd4ff" />}
    </g>
  )
}

function DM({ magic }) {
  return (
    <g transform="translate(400,330)">
      {magic && <circle cx="0" cy="-120" r="110" fill="url(#dmGlow)" />}
      <path d="M-58,40 Q-62,-60 -30,-84 L30,-84 Q62,-60 58,40 Z" fill={magic ? '#4a1f7a' : '#7a7f86'} />
      {magic
        ? <path d="M-30,-84 L0,-20 L30,-84" fill="none" stroke="#f5d27a" strokeWidth="3" />
        : <path d="M-14,-84 Q0,-64 14,-84" fill="none" stroke="#5f6369" strokeWidth="6" />}
      <circle cx="0" cy="-112" r="30" fill="#e3b088" />
      <circle cx="-10" cy="-114" r="3" fill="#1a0f0a" />
      <circle cx="10" cy="-114" r="3" fill="#1a0f0a" />
      {magic ? (
        <g>
          <path d="M-24,-100 Q0,-30 24,-100 Q0,-88 -24,-100 Z" fill="#eee6d6" />
          <path d="M-12,-122 Q-10,-126 -6,-122 M6,-122 Q10,-126 12,-122" stroke="#1a0f0a" strokeWidth="2.5" fill="none" />
          <path d="M-52,-134 Q0,-118 52,-134 L56,-124 Q0,-106 -56,-124 Z" fill="#2e1450" />
          <path d="M-36,-130 L36,-130 Q20,-190 40,-250 Q0,-210 -36,-130 Z" fill="#4a1f7a" />
          <path d="M-34,-140 Q0,-150 34,-140" stroke="#f5d27a" strokeWidth="4" fill="none" />
          <circle cx="0" cy="-200" r="4" fill="#f5d27a" />
          {/* hands casting */}
          <g stroke="#4a1f7a" strokeWidth="18" strokeLinecap="round" fill="none">
            <path d="M-44,-60 Q-90,-80 -100,-130" /><path d="M44,-60 Q90,-80 100,-130" />
          </g>
          <circle cx="-100" cy="-138" r="12" fill="#e3b088" />
          <circle cx="100" cy="-138" r="12" fill="#e3b088" />
          <circle className="orb" cx="-100" cy="-164" r="16" fill="#9ff0ff" filter="url(#glow)" />
          <circle className="orb" cx="100" cy="-164" r="16" fill="#ffb36b" filter="url(#glow)" />
        </g>
      ) : (
        <g>
          <path d="M-8,-100 Q0,-96 8,-100" stroke="#3a1410" strokeWidth="2" fill="none" />
          <path d="M-30,-118 Q-30,-146 0,-146 Q30,-146 30,-118 L42,-120 Q30,-152 0,-152 Q-30,-152 -30,-118 Z" fill="#2f3a4a" />
        </g>
      )}
    </g>
  )
}

function Room({ magic }) {
  return magic ? (
    <g>
      <rect width="800" height="520" fill="#22141c" />
      {/* stone blocks */}
      <g stroke="#2a1c22" strokeWidth="2" opacity="0.8">
        {Array.from({ length: 9 }, (_, r) => <line key={r} x1="0" x2="800" y1={r * 44} y2={r * 44} />)}
        {Array.from({ length: 80 }, (_, i) => <line key={i} x1={(i % 10) * 90 + ((Math.floor(i / 10) % 2) * 45)} x2={(i % 10) * 90 + ((Math.floor(i / 10) % 2) * 45)} y1={Math.floor(i / 10) * 44} y2={Math.floor(i / 10) * 44 + 44} />)}
      </g>
      {/* arched window + moon */}
      <path d="M560,190 L560,90 Q600,40 640,90 L640,190 Z" fill="#1d2a4a" stroke="#3a2a30" strokeWidth="6" />
      <circle cx="610" cy="100" r="16" fill="#f1e4c8" />
      {/* dragon shadow on the wall */}
      <path className="dragon" filter="url(#blur)" fill="#050203" opacity="0.8"
        d="M150,170 Q200,120 260,140 Q300,90 360,60 Q330,110 340,130 Q400,80 470,70 Q420,110 420,140 Q470,140 500,170 Q440,165 400,180 Q380,210 330,215 Q300,240 250,230 Q280,210 270,195 Q220,200 150,170 Z" />
      {/* torches */}
      {[90, 710].map((x) => (
        <g key={x}>
          <rect x={x - 5} y="170" width="10" height="40" fill="#5a3a22" />
          <path className="flame" d={`M${x},132 Q${x + 16},160 ${x},172 Q${x - 16},160 ${x},132 Z`} fill="#ffb347" filter="url(#glow)" />
        </g>
      ))}
      <rect y="300" width="800" height="220" fill="#1c1116" />
    </g>
  ) : (
    <g>
      <rect width="800" height="520" fill="#d9ccb4" />
      <rect x="540" y="70" width="130" height="110" fill="#b9d3e6" stroke="#f4efe6" strokeWidth="8" />
      <line x1="605" y1="70" x2="605" y2="180" stroke="#f4efe6" strokeWidth="6" />
      {/* framed poster + lamp */}
      <rect x="120" y="80" width="90" height="70" fill="#a5937a" stroke="#6b5a45" strokeWidth="5" />
      <path d="M720,120 L760,120 L750,90 L730,90 Z" fill="#efe1b8" />
      <rect x="738" y="120" width="4" height="180" fill="#6b5a45" />
      <rect y="300" width="800" height="220" fill="#b8a385" />
    </g>
  )
}

function TableTop({ magic }) {
  return (
    <g>
      {magic && <ellipse cx="400" cy="410" rx="290" ry="70" fill="url(#tableGlow)" />}
      <path d="M140,380 Q400,350 660,380 L700,460 Q400,490 100,460 Z" fill={magic ? '#4a2c1a' : '#9a7650'} />
      <path d="M100,460 Q400,490 700,460 L700,476 Q400,506 100,476 Z" fill={magic ? '#2e1a0f' : '#7a5a3a'} />
      {/* DM screen */}
      <path d="M320,360 L360,330 L440,330 L480,360 L480,400 L320,400 Z" fill={magic ? '#6b1414' : '#4f6a8a'} stroke={magic ? '#d4a64a' : '#3a4f6a'} strokeWidth="3" />
      {magic && <path d="M400,345 L410,370 L390,370 Z" fill="none" stroke="#d4a64a" strokeWidth="2" />}
      {magic ? (
        <g>
          <path d="M190,420 L300,412 L310,450 L196,458 Z" fill="#e8d6a8" stroke="#8a6a3a" strokeWidth="2" />
          <path d="M210,430 Q240,440 260,425 Q280,440 295,432" stroke="#9e1b1b" strokeWidth="2" fill="none" strokeDasharray="4 3" />
          <polygon className="d20-glow" points="560,412 576,421 576,439 560,448 544,439 544,421" fill="#d4a64a" filter="url(#glow)" />
          <rect x="510" y="408" width="10" height="22" rx="4" fill="#7fe0c0" />
          <rect x="600" y="410" width="10" height="22" rx="4" fill="#e07f7f" />
          {[250, 520].map((x) => (
            <g key={x}>
              <rect x={x} y="390" width="10" height="26" fill="#f1e4c8" />
              <path className="flame" d={`M${x + 5},372 Q${x + 13},384 ${x + 5},392 Q${x - 3},384 ${x + 5},372 Z`} fill="#ffcf6b" filter="url(#glow)" />
            </g>
          ))}
        </g>
      ) : (
        <g>
          <rect x="190" y="412" width="110" height="34" fill="#e9dcc2" stroke="#b9a582" strokeWidth="2" transform="rotate(-3 245 429)" />
          <rect x="520" y="410" width="16" height="30" rx="3" fill="#c0392b" />
          <rect x="600" y="414" width="16" height="30" rx="3" fill="#2e86c1" />
          <rect x="560" y="440" width="22" height="12" rx="2" fill="#222" />
        </g>
      )}
    </g>
  )
}

function Sparkles() {
  return (
    <g className="sparkles">
      {Array.from({ length: 26 }, (_, i) => (
        <circle key={i} className="spark" cx={120 + ((i * 97) % 560)} cy={120 + ((i * 53) % 240)} r={1.5 + (i % 3)} fill={i % 2 ? '#f5d27a' : '#9ff0ff'} />
      ))}
    </g>
  )
}

function Defs() {
  return (
    <defs>
      <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="5" result="b" />
        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <filter id="blur"><feGaussianBlur stdDeviation="6" /></filter>
      <radialGradient id="dmGlow"><stop offset="0" stopColor="#9f6bff" stopOpacity="0.55" /><stop offset="1" stopColor="#9f6bff" stopOpacity="0" /></radialGradient>
      <radialGradient id="tableGlow"><stop offset="0" stopColor="#ff9a3c" stopOpacity="0.6" /><stop offset="1" stopColor="#ff9a3c" stopOpacity="0" /></radialGradient>
      <radialGradient id="vignette"><stop offset="0.55" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity="0.45" /></radialGradient>
    </defs>
  )
}

export function World({ magic }) {
  return (
    <g className={magic ? 'm-only' : 'n-only'}>
      <Room magic={magic} />
      <DM magic={magic} />
      <TableTop magic={magic} />
      {PLAYERS.map((p) => <Person key={p.role} p={p} magic={magic} />)}
      {magic && <Sparkles />}
      {magic && <rect width="800" height="520" fill="url(#vignette)" />}
    </g>
  )
}

export default function Scene({ magic = false, both = false, className = '', label }) {
  return (
    <svg viewBox="0 0 800 520" className={className} role="img" aria-label={label}>
      <Defs />
      {both ? <><World magic={false} /><World magic /></> : <World magic={magic} />}
    </svg>
  )
}
