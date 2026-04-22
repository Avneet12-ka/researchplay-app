import { Box, Paper, Typography } from '@mui/material';

// Inline SVG placeholders. Replace with commissioned art later; the structure stays.
const ART = {
  alert: (
    <g>
      <rect x="20" y="30" width="260" height="140" rx="10" fill="#eceff1" stroke="#1a237e" strokeWidth="2" />
      <rect x="40" y="55" width="180" height="12" rx="3" fill="#1a237e" />
      <rect x="40" y="78" width="220" height="8" rx="3" fill="#90a4ae" />
      <rect x="40" y="94" width="160" height="8" rx="3" fill="#90a4ae" />
      <circle cx="245" cy="62" r="16" fill="#c62828" />
      <text x="245" y="67" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="700">!</text>
      <rect x="40" y="125" width="70" height="24" rx="4" fill="#1a237e" />
      <rect x="120" y="125" width="70" height="24" rx="4" fill="#fff" stroke="#1a237e" strokeWidth="2" />
    </g>
  ),
  patient: (
    <g>
      <rect x="40" y="40" width="220" height="120" rx="8" fill="#f5f5f5" stroke="#607d8b" />
      <circle cx="90" cy="95" r="26" fill="#90a4ae" />
      <rect x="70" y="125" width="40" height="30" rx="4" fill="#90a4ae" />
      <rect x="140" y="60" width="110" height="10" rx="2" fill="#c62828" />
      <rect x="140" y="78" width="90" height="8" rx="2" fill="#90a4ae" />
      <rect x="140" y="94" width="100" height="8" rx="2" fill="#90a4ae" />
      <rect x="140" y="110" width="70" height="8" rx="2" fill="#90a4ae" />
      <polyline points="140,145 160,135 180,150 200,130 220,140 240,125" fill="none" stroke="#c62828" strokeWidth="2" />
    </g>
  ),
  trial: (
    <g>
      <circle cx="150" cy="50" r="18" fill="#1a237e" />
      <path d="M150 68 L90 110 M150 68 L210 110" stroke="#1a237e" strokeWidth="2" />
      <rect x="50" y="110" width="80" height="60" rx="6" fill="#e8eaf6" stroke="#1a237e" />
      <text x="90" y="135" textAnchor="middle" fill="#1a237e" fontSize="11" fontWeight="600">ALERT</text>
      <text x="90" y="152" textAnchor="middle" fill="#1a237e" fontSize="10">arm</text>
      <rect x="170" y="110" width="80" height="60" rx="6" fill="#f5f5f5" stroke="#607d8b" />
      <text x="210" y="135" textAnchor="middle" fill="#455a64" fontSize="11" fontWeight="600">USUAL</text>
      <text x="210" y="152" textAnchor="middle" fill="#455a64" fontSize="10">care</text>
    </g>
  ),
  null: (
    <g>
      <line x1="40" y1="160" x2="260" y2="160" stroke="#455a64" strokeWidth="1.5" />
      <line x1="40" y1="40" x2="40" y2="160" stroke="#455a64" strokeWidth="1.5" />
      <polyline points="40,120 80,118 120,115 160,113 200,112 240,112" fill="none" stroke="#1a237e" strokeWidth="3" />
      <polyline points="40,122 80,119 120,116 160,114 200,113 240,113" fill="none" stroke="#9e9e9e" strokeWidth="3" strokeDasharray="4 4" />
      <text x="150" y="30" textAnchor="middle" fill="#455a64" fontSize="11">No separation</text>
    </g>
  ),
  split: (
    <g>
      <rect x="40" y="40" width="220" height="120" rx="8" fill="#f5f5f5" />
      <circle cx="95" cy="100" r="30" fill="#c8e6c9" />
      <text x="95" y="104" textAnchor="middle" fill="#2e7d32" fontSize="11" fontWeight="700">helped</text>
      <circle cx="205" cy="100" r="30" fill="#ffcdd2" />
      <text x="205" y="104" textAnchor="middle" fill="#c62828" fontSize="11" fontWeight="700">harmed</text>
      <line x1="150" y1="50" x2="150" y2="150" stroke="#607d8b" strokeDasharray="3 3" />
      <text x="150" y="40" textAnchor="middle" fill="#455a64" fontSize="10">average = null</text>
    </g>
  ),
  model: (
    <g>
      <rect x="30" y="60" width="60" height="80" rx="6" fill="#e8eaf6" stroke="#1a237e" />
      <text x="60" y="105" textAnchor="middle" fill="#1a237e" fontSize="10">phenotype</text>
      <path d="M90 100 L130 100" stroke="#1a237e" strokeWidth="2" markerEnd="url(#arrow)" />
      <rect x="130" y="60" width="80" height="80" rx="6" fill="#1a237e" />
      <text x="170" y="95" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="600">model</text>
      <text x="170" y="115" textAnchor="middle" fill="#fff" fontSize="9">trained on</text>
      <text x="170" y="128" textAnchor="middle" fill="#fff" fontSize="9">ELAIA-1</text>
      <path d="M210 100 L250 100" stroke="#1a237e" strokeWidth="2" markerEnd="url(#arrow)" />
      <rect x="250" y="70" width="30" height="60" rx="4" fill="#c8e6c9" />
      <rect x="250" y="100" width="30" height="30" rx="4" fill="#ffcdd2" />
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#1a237e" />
        </marker>
      </defs>
    </g>
  ),
  outcome: (
    <g>
      <line x1="40" y1="160" x2="260" y2="160" stroke="#455a64" strokeWidth="1.5" />
      <rect x="70" y="90" width="30" height="70" fill="#1a237e" />
      <rect x="110" y="70" width="30" height="90" fill="#9e9e9e" />
      <rect x="170" y="55" width="30" height="105" fill="#c62828" />
      <rect x="210" y="75" width="30" height="85" fill="#9e9e9e" />
      <text x="85" y="175" textAnchor="middle" fontSize="9" fill="#455a64">benefit</text>
      <text x="125" y="175" textAnchor="middle" fontSize="9" fill="#455a64">usual</text>
      <text x="185" y="175" textAnchor="middle" fontSize="9" fill="#455a64">harm</text>
      <text x="225" y="175" textAnchor="middle" fontSize="9" fill="#455a64">usual</text>
      <text x="150" y="30" textAnchor="middle" fill="#455a64" fontSize="11">p-interaction &lt; 0.0001</text>
    </g>
  ),
  lives: (
    <g>
      <text x="150" y="85" textAnchor="middle" fill="#1a237e" fontSize="48" fontWeight="800">43</text>
      <text x="150" y="115" textAnchor="middle" fill="#455a64" fontSize="14">deaths potentially</text>
      <text x="150" y="135" textAnchor="middle" fill="#455a64" fontSize="14">preventable</text>
      <text x="150" y="160" textAnchor="middle" fill="#9e9e9e" fontSize="10">in external cohorts (counterfactual)</text>
    </g>
  ),
  crowd: (
    <g>
      {Array.from({ length: 6 }).map((_, row) =>
        Array.from({ length: 12 }).map((_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={40 + col * 20}
            cy={55 + row * 18}
            r={5}
            fill={(row * 12 + col) % 4 === 0 ? '#1a237e' : '#c5cae9'}
          />
        ))
      )}
      <text x="150" y="40" textAnchor="middle" fill="#1a237e" fontSize="13" fontWeight="700">230,000 opioid dependents</text>
      <text x="150" y="185" textAnchor="middle" fill="#607d8b" fontSize="10">76% aged 18–35 (PODS 2015)</text>
    </g>
  ),
  map: (
    <g>
      <rect x="20" y="40" width="260" height="130" rx="4" fill="#f5f5f5" stroke="#cfd8dc" />
      <path d="M90 80 Q105 65 130 70 Q155 60 165 80 L170 110 Q150 125 115 120 Q95 115 90 95 Z" fill="#e8eaf6" stroke="#1a237e" strokeWidth="1.5" />
      <text x="130" y="100" textAnchor="middle" fill="#1a237e" fontSize="11" fontWeight="700">PUNJAB</text>
      <circle cx="55" cy="75" r="14" fill="#ffecb3" stroke="#ff8f00" />
      <text x="55" y="78" textAnchor="middle" fill="#ff8f00" fontSize="8" fontWeight="700">Golden</text>
      <text x="55" y="88" textAnchor="middle" fill="#ff8f00" fontSize="8" fontWeight="700">Crescent</text>
      <circle cx="235" cy="135" r="14" fill="#ffecb3" stroke="#ff8f00" />
      <text x="235" y="135" textAnchor="middle" fill="#ff8f00" fontSize="8" fontWeight="700">Golden</text>
      <text x="235" y="145" textAnchor="middle" fill="#ff8f00" fontSize="8" fontWeight="700">Triangle</text>
      <path d="M70 80 Q100 95 125 95" stroke="#ff8f00" strokeWidth="1.5" fill="none" strokeDasharray="3 2" />
      <path d="M220 130 Q180 115 150 105" stroke="#ff8f00" strokeWidth="1.5" fill="none" strokeDasharray="3 2" />
    </g>
  ),
  pill: (
    <g>
      <rect x="80" y="70" width="140" height="50" rx="25" fill="#fff" stroke="#1a237e" strokeWidth="3" />
      <rect x="80" y="70" width="70" height="50" rx="25" fill="#1a237e" />
      <line x1="150" y1="70" x2="150" y2="120" stroke="#1a237e" strokeWidth="3" />
      <text x="115" y="100" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">BUP</text>
      <text x="185" y="100" textAnchor="middle" fill="#1a237e" fontSize="11" fontWeight="700">NX</text>
      <text x="150" y="150" textAnchor="middle" fill="#455a64" fontSize="11">buprenorphine + naloxone</text>
      <text x="150" y="168" textAnchor="middle" fill="#9e9e9e" fontSize="9">ceiling effect · long-acting · low overdose risk</text>
    </g>
  ),
  phases: (
    <g>
      <line x1="30" y1="110" x2="270" y2="110" stroke="#cfd8dc" strokeWidth="2" />
      <circle cx="60" cy="110" r="14" fill="#1a237e" />
      <text x="60" y="114" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="700">1</text>
      <text x="60" y="140" textAnchor="middle" fill="#1a237e" fontSize="10" fontWeight="600">Induction</text>
      <text x="60" y="155" textAnchor="middle" fill="#607d8b" fontSize="8">days</text>
      <circle cx="150" cy="110" r="18" fill="#4caf50" />
      <text x="150" y="114" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">2</text>
      <text x="150" y="144" textAnchor="middle" fill="#2e7d32" fontSize="10" fontWeight="600">Maintenance</text>
      <text x="150" y="159" textAnchor="middle" fill="#607d8b" fontSize="8">1–2 years</text>
      <circle cx="240" cy="110" r="14" fill="#607d8b" />
      <text x="240" y="114" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="700">3</text>
      <text x="240" y="140" textAnchor="middle" fill="#455a64" fontSize="10" fontWeight="600">Termination</text>
      <text x="240" y="155" textAnchor="middle" fill="#607d8b" fontSize="8">2–3 months</text>
      <text x="150" y="50" textAnchor="middle" fill="#1a237e" fontSize="12" fontWeight="700">Stages of OST</text>
    </g>
  ),
  calendar: (
    <g>
      <rect x="60" y="45" width="180" height="130" rx="6" fill="#fff" stroke="#1a237e" strokeWidth="2" />
      <rect x="60" y="45" width="180" height="28" rx="6" fill="#1a237e" />
      <text x="150" y="64" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">14-DAY MAX</text>
      {Array.from({ length: 14 }).map((_, i) => (
        <rect
          key={i}
          x={72 + (i % 7) * 24}
          y={84 + Math.floor(i / 7) * 24}
          width="20"
          height="20"
          fill="#c62828"
          opacity="0.85"
        />
      ))}
      {Array.from({ length: 14 }).map((_, i) => (
        <text
          key={`t-${i}`}
          x={82 + (i % 7) * 24}
          y={98 + Math.floor(i / 7) * 24}
          textAnchor="middle"
          fill="#fff"
          fontSize="10"
          fontWeight="700"
        >
          {i + 1}
        </text>
      ))}
      <text x="150" y="160" textAnchor="middle" fill="#c62828" fontSize="10" fontWeight="600">or 100 tablets, whichever is less</text>
    </g>
  ),
  truck: (
    <g>
      <rect x="40" y="95" width="120" height="50" rx="4" fill="#455a64" />
      <rect x="160" y="75" width="60" height="70" rx="4" fill="#607d8b" />
      <rect x="170" y="85" width="40" height="25" rx="2" fill="#b0bec5" />
      <circle cx="80" cy="155" r="14" fill="#263238" />
      <circle cx="80" cy="155" r="7" fill="#90a4ae" />
      <circle cx="200" cy="155" r="14" fill="#263238" />
      <circle cx="200" cy="155" r="7" fill="#90a4ae" />
      <path d="M60 90 Q120 60 250 60" stroke="#ff8f00" strokeWidth="2" strokeDasharray="4 3" fill="none" />
      <text x="150" y="50" textAnchor="middle" fill="#455a64" fontSize="11">30-day haul · 14-day supply</text>
      <text x="100" y="122" fill="#fff" fontSize="9">Punjab → South</text>
    </g>
  ),
  clock: (
    <g>
      <text x="150" y="35" textAnchor="middle" fill="#1a237e" fontSize="12" fontWeight="700">Follow-up interval</text>
      <rect x="30" y="70" width="70" height="80" rx="6" fill="#e8f5e9" stroke="#2e7d32" />
      <text x="65" y="95" textAnchor="middle" fill="#2e7d32" fontSize="11" fontWeight="700">HTN / DM</text>
      <text x="65" y="120" textAnchor="middle" fill="#2e7d32" fontSize="18" fontWeight="800">2–3</text>
      <text x="65" y="140" textAnchor="middle" fill="#2e7d32" fontSize="9">months</text>
      <rect x="115" y="70" width="70" height="80" rx="6" fill="#e8f5e9" stroke="#2e7d32" />
      <text x="150" y="95" textAnchor="middle" fill="#2e7d32" fontSize="11" fontWeight="700">Arthritis</text>
      <text x="150" y="120" textAnchor="middle" fill="#2e7d32" fontSize="18" fontWeight="800">2–3</text>
      <text x="150" y="140" textAnchor="middle" fill="#2e7d32" fontSize="9">months</text>
      <rect x="200" y="70" width="70" height="80" rx="6" fill="#ffebee" stroke="#c62828" />
      <text x="235" y="95" textAnchor="middle" fill="#c62828" fontSize="11" fontWeight="700">OST (PB)</text>
      <text x="235" y="120" textAnchor="middle" fill="#c62828" fontSize="18" fontWeight="800">14</text>
      <text x="235" y="140" textAnchor="middle" fill="#c62828" fontSize="9">days</text>
    </g>
  ),
  scales: (
    <g>
      <line x1="150" y1="40" x2="150" y2="160" stroke="#455a64" strokeWidth="3" />
      <line x1="70" y1="70" x2="230" y2="70" stroke="#455a64" strokeWidth="3" />
      <polygon points="150,160 130,175 170,175" fill="#455a64" />
      <rect x="45" y="85" width="60" height="30" rx="3" fill="#1a237e" />
      <text x="75" y="104" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700">Evidence</text>
      <rect x="195" y="85" width="60" height="30" rx="3" fill="#c62828" />
      <text x="225" y="104" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700">14-day SOP</text>
      <text x="150" y="30" textAnchor="middle" fill="#455a64" fontSize="11" fontWeight="700">Right to life (Art. 21)</text>
    </g>
  )
};

export default function ComicPanel({ panel, index }) {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        height: '100%',
        borderTop: '4px solid #1a237e'
      }}
    >
      <Typography variant="caption" sx={{ color: '#9e9e9e', letterSpacing: '0.1em', fontWeight: 600 }}>
        PANEL {String(index + 1).padStart(2, '0')}
      </Typography>
      <Box
        sx={{
          backgroundColor: '#fafafa',
          borderRadius: 1,
          aspectRatio: '3 / 2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <svg viewBox="0 0 300 200" style={{ width: '100%', height: '100%' }}>
          {ART[panel.svg] ?? ART.alert}
        </svg>
      </Box>
      <Typography variant="h6" sx={{ fontFamily: 'Roboto Slab, serif', mt: 1 }}>
        {panel.title}
      </Typography>
      <Typography variant="body2" sx={{ color: '#37474f', lineHeight: 1.6 }}>
        {panel.caption}
      </Typography>
    </Paper>
  );
}
