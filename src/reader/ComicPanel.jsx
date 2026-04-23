import { Box, Paper, Typography } from '@mui/material';

// Inline SVG placeholders. Replace with commissioned art later; the structure stays.
const ART = {
  alert: (
    <g>
      <rect x="20" y="30" width="260" height="140" rx="10" fill="#eceff1" stroke="#1E3A5F" strokeWidth="2" />
      <rect x="40" y="55" width="180" height="12" rx="3" fill="#1E3A5F" />
      <rect x="40" y="78" width="220" height="8" rx="3" fill="#90a4ae" />
      <rect x="40" y="94" width="160" height="8" rx="3" fill="#90a4ae" />
      <circle cx="245" cy="62" r="16" fill="#c62828" />
      <text x="245" y="67" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="700">!</text>
      <rect x="40" y="125" width="70" height="24" rx="4" fill="#1E3A5F" />
      <rect x="120" y="125" width="70" height="24" rx="4" fill="#fff" stroke="#1E3A5F" strokeWidth="2" />
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
      <circle cx="150" cy="50" r="18" fill="#1E3A5F" />
      <path d="M150 68 L90 110 M150 68 L210 110" stroke="#1E3A5F" strokeWidth="2" />
      <rect x="50" y="110" width="80" height="60" rx="6" fill="#F3E4D8" stroke="#1E3A5F" />
      <text x="90" y="135" textAnchor="middle" fill="#1E3A5F" fontSize="11" fontWeight="600">ALERT</text>
      <text x="90" y="152" textAnchor="middle" fill="#1E3A5F" fontSize="10">arm</text>
      <rect x="170" y="110" width="80" height="60" rx="6" fill="#f5f5f5" stroke="#607d8b" />
      <text x="210" y="135" textAnchor="middle" fill="#455a64" fontSize="11" fontWeight="600">USUAL</text>
      <text x="210" y="152" textAnchor="middle" fill="#455a64" fontSize="10">care</text>
    </g>
  ),
  null: (
    <g>
      <line x1="40" y1="160" x2="260" y2="160" stroke="#455a64" strokeWidth="1.5" />
      <line x1="40" y1="40" x2="40" y2="160" stroke="#455a64" strokeWidth="1.5" />
      <polyline points="40,120 80,118 120,115 160,113 200,112 240,112" fill="none" stroke="#1E3A5F" strokeWidth="3" />
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
      <rect x="30" y="60" width="60" height="80" rx="6" fill="#F3E4D8" stroke="#1E3A5F" />
      <text x="60" y="105" textAnchor="middle" fill="#1E3A5F" fontSize="10">phenotype</text>
      <path d="M90 100 L130 100" stroke="#1E3A5F" strokeWidth="2" markerEnd="url(#arrow)" />
      <rect x="130" y="60" width="80" height="80" rx="6" fill="#1E3A5F" />
      <text x="170" y="95" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="600">model</text>
      <text x="170" y="115" textAnchor="middle" fill="#fff" fontSize="9">trained on</text>
      <text x="170" y="128" textAnchor="middle" fill="#fff" fontSize="9">ELAIA-1</text>
      <path d="M210 100 L250 100" stroke="#1E3A5F" strokeWidth="2" markerEnd="url(#arrow)" />
      <rect x="250" y="70" width="30" height="60" rx="4" fill="#c8e6c9" />
      <rect x="250" y="100" width="30" height="30" rx="4" fill="#ffcdd2" />
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#1E3A5F" />
        </marker>
      </defs>
    </g>
  ),
  outcome: (
    <g>
      <line x1="40" y1="160" x2="260" y2="160" stroke="#455a64" strokeWidth="1.5" />
      <rect x="70" y="90" width="30" height="70" fill="#1E3A5F" />
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
      <text x="150" y="85" textAnchor="middle" fill="#1E3A5F" fontSize="48" fontWeight="800">43</text>
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
            fill={(row * 12 + col) % 4 === 0 ? '#1E3A5F' : '#D6CDBE'}
          />
        ))
      )}
      <text x="150" y="40" textAnchor="middle" fill="#1E3A5F" fontSize="13" fontWeight="700">230,000 opioid dependents</text>
      <text x="150" y="185" textAnchor="middle" fill="#607d8b" fontSize="10">76% aged 18–35 (PODS 2015)</text>
    </g>
  ),
  map: (
    <g>
      <rect x="20" y="40" width="260" height="130" rx="4" fill="#f5f5f5" stroke="#cfd8dc" />
      <path d="M90 80 Q105 65 130 70 Q155 60 165 80 L170 110 Q150 125 115 120 Q95 115 90 95 Z" fill="#F3E4D8" stroke="#1E3A5F" strokeWidth="1.5" />
      <text x="130" y="100" textAnchor="middle" fill="#1E3A5F" fontSize="11" fontWeight="700">PUNJAB</text>
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
      <rect x="80" y="70" width="140" height="50" rx="25" fill="#fff" stroke="#1E3A5F" strokeWidth="3" />
      <rect x="80" y="70" width="70" height="50" rx="25" fill="#1E3A5F" />
      <line x1="150" y1="70" x2="150" y2="120" stroke="#1E3A5F" strokeWidth="3" />
      <text x="115" y="100" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">BUP</text>
      <text x="185" y="100" textAnchor="middle" fill="#1E3A5F" fontSize="11" fontWeight="700">NX</text>
      <text x="150" y="150" textAnchor="middle" fill="#455a64" fontSize="11">buprenorphine + naloxone</text>
      <text x="150" y="168" textAnchor="middle" fill="#9e9e9e" fontSize="9">ceiling effect · long-acting · low overdose risk</text>
    </g>
  ),
  phases: (
    <g>
      <line x1="30" y1="110" x2="270" y2="110" stroke="#cfd8dc" strokeWidth="2" />
      <circle cx="60" cy="110" r="14" fill="#1E3A5F" />
      <text x="60" y="114" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="700">1</text>
      <text x="60" y="140" textAnchor="middle" fill="#1E3A5F" fontSize="10" fontWeight="600">Induction</text>
      <text x="60" y="155" textAnchor="middle" fill="#607d8b" fontSize="8">days</text>
      <circle cx="150" cy="110" r="18" fill="#C26A3D" />
      <text x="150" y="114" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">2</text>
      <text x="150" y="144" textAnchor="middle" fill="#2e7d32" fontSize="10" fontWeight="600">Maintenance</text>
      <text x="150" y="159" textAnchor="middle" fill="#607d8b" fontSize="8">1–2 years</text>
      <circle cx="240" cy="110" r="14" fill="#607d8b" />
      <text x="240" y="114" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="700">3</text>
      <text x="240" y="140" textAnchor="middle" fill="#455a64" fontSize="10" fontWeight="600">Termination</text>
      <text x="240" y="155" textAnchor="middle" fill="#607d8b" fontSize="8">2–3 months</text>
      <text x="150" y="50" textAnchor="middle" fill="#1E3A5F" fontSize="12" fontWeight="700">Stages of OST</text>
    </g>
  ),
  calendar: (
    <g>
      <rect x="60" y="45" width="180" height="130" rx="6" fill="#fff" stroke="#1E3A5F" strokeWidth="2" />
      <rect x="60" y="45" width="180" height="28" rx="6" fill="#1E3A5F" />
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
      <text x="150" y="35" textAnchor="middle" fill="#1E3A5F" fontSize="12" fontWeight="700">Follow-up interval</text>
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
      <rect x="45" y="85" width="60" height="30" rx="3" fill="#1E3A5F" />
      <text x="75" y="104" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700">Evidence</text>
      <rect x="195" y="85" width="60" height="30" rx="3" fill="#c62828" />
      <text x="225" y="104" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700">14-day SOP</text>
      <text x="150" y="30" textAnchor="middle" fill="#455a64" fontSize="11" fontWeight="700">Right to life (Art. 21)</text>
    </g>
  ),

  // ---- keys added for mmi-perceptions ----

  samples: (
    <g>
      {/* Sample tray being handed over */}
      <rect x="40" y="90" width="100" height="60" rx="4" fill="#F3E4D8" stroke="#1E3A5F" strokeWidth="1.5" />
      <circle cx="60" cy="110" r="6" fill="#C26A3D" />
      <circle cx="80" cy="110" r="6" fill="#2e7d32" />
      <circle cx="100" cy="110" r="6" fill="#c62828" />
      <circle cx="120" cy="110" r="6" fill="#ff8f00" />
      <circle cx="60" cy="130" r="6" fill="#9e9e9e" />
      <circle cx="80" cy="130" r="6" fill="#1E3A5F" />
      <circle cx="100" cy="130" r="6" fill="#C26A3D" />
      <circle cx="120" cy="130" r="6" fill="#2e7d32" />
      {/* Left figure — rep */}
      <circle cx="30" cy="70" r="12" fill="#1E3A5F" />
      <rect x="18" y="82" width="24" height="28" fill="#1E3A5F" />
      <rect x="24" y="110" width="4" height="18" fill="#0B1728" />
      <rect x="32" y="110" width="4" height="18" fill="#0B1728" />
      <rect x="20" y="94" width="20" height="4" fill="#FAF7F2" />
      <text x="30" y="62" textAnchor="middle" fontSize="8" fill="#0B1728" fontFamily="ui-sans-serif,system-ui">rep</text>
      {/* Right figure — doctor with white coat */}
      <circle cx="170" cy="70" r="12" fill="#C26A3D" />
      <rect x="158" y="82" width="24" height="28" fill="#FAF7F2" stroke="#1E3A5F" strokeWidth="1" />
      <rect x="164" y="110" width="4" height="18" fill="#0B1728" />
      <rect x="172" y="110" width="4" height="18" fill="#0B1728" />
      <text x="170" y="62" textAnchor="middle" fontSize="8" fill="#0B1728" fontFamily="ui-sans-serif,system-ui">doctor</text>
      {/* Exchange arrow */}
      <path d="M50 105 L150 105" stroke="#1E3A5F" strokeWidth="1.5" strokeDasharray="3,2" />
      <polygon points="150,105 144,102 144,108" fill="#1E3A5F" />
    </g>
  ),

  rulebook: (
    <g>
      <rect x="60" y="40" width="90" height="120" rx="3" fill="#1E3A5F" />
      <rect x="66" y="46" width="78" height="108" fill="#FAF7F2" />
      <rect x="60" y="40" width="4" height="120" fill="#0B1728" />
      <text x="105" y="70" textAnchor="middle" fontSize="9" fill="#1E3A5F" fontFamily="ui-sans-serif,system-ui" fontWeight="600">MMA Code</text>
      <text x="105" y="82" textAnchor="middle" fontSize="7" fill="#1E3A5F" fontFamily="ui-sans-serif,system-ui">of Professional</text>
      <text x="105" y="92" textAnchor="middle" fontSize="7" fill="#1E3A5F" fontFamily="ui-sans-serif,system-ui">Conduct · 2019</text>
      <line x1="72" y1="108" x2="138" y2="108" stroke="#9e9e9e" strokeWidth="0.8" />
      <line x1="72" y1="118" x2="138" y2="118" stroke="#9e9e9e" strokeWidth="0.8" />
      <line x1="72" y1="128" x2="128" y2="128" stroke="#9e9e9e" strokeWidth="0.8" />
      <line x1="72" y1="138" x2="138" y2="138" stroke="#9e9e9e" strokeWidth="0.8" />
      <rect x="165" y="50" width="120" height="38" rx="6" fill="#C26A3D" />
      <polygon points="165,72 155,78 165,82" fill="#C26A3D" />
      <text x="225" y="68" textAnchor="middle" fontSize="11" fill="#FAF7F2" fontFamily="ui-sans-serif,system-ui" fontWeight="600">Only 6%</text>
      <text x="225" y="81" textAnchor="middle" fontSize="9" fill="#FAF7F2" fontFamily="ui-sans-serif,system-ui">had heard of it</text>
    </g>
  ),

  stat: (
    <g>
      <rect x="40" y="168" width="40" height="12" fill="#c62828" />
      <text x="60" y="160" textAnchor="middle" fontSize="14" fill="#0B1728" fontFamily="ui-sans-serif,system-ui" fontWeight="700">6%</text>
      <text x="60" y="193" textAnchor="middle" fontSize="8" fill="#0B1728" fontFamily="ui-sans-serif,system-ui">knew rules</text>
      <rect x="130" y="100" width="40" height="80" fill="#1E3A5F" />
      <text x="150" y="92" textAnchor="middle" fontSize="14" fill="#0B1728" fontFamily="ui-sans-serif,system-ui" fontWeight="700">40%</text>
      <text x="150" y="193" textAnchor="middle" fontSize="8" fill="#0B1728" fontFamily="ui-sans-serif,system-ui">knew they interact</text>
      <rect x="220" y="12" width="40" height="168" fill="#C26A3D" />
      <text x="240" y="10" textAnchor="middle" fontSize="14" fill="#0B1728" fontFamily="ui-sans-serif,system-ui" fontWeight="700">84%</text>
      <text x="240" y="193" textAnchor="middle" fontSize="8" fill="#0B1728" fontFamily="ui-sans-serif,system-ui">endorsed samples</text>
      <line x1="20" y1="181" x2="280" y2="181" stroke="#0B1728" strokeWidth="1" />
    </g>
  ),

  compare: (
    <g>
      {/* Left — undergraduate / or left-hand comparator (HAIRA reuses for radiology vs hospital) */}
      <circle cx="75" cy="70" r="14" fill="#C26A3D" />
      <rect x="63" y="84" width="24" height="32" fill="#1E3A5F" />
      <rect x="69" y="116" width="4" height="20" fill="#0B1728" />
      <rect x="77" y="116" width="4" height="20" fill="#0B1728" />
      <text x="75" y="152" textAnchor="middle" fontSize="9" fill="#0B1728" fontFamily="ui-sans-serif,system-ui">undergrad</text>
      <rect x="38" y="20" width="74" height="30" rx="6" fill="#F3E4D8" stroke="#1E3A5F" strokeWidth="1" />
      <text x="75" y="40" textAnchor="middle" fontSize="13" fill="#1E3A5F" fontFamily="ui-sans-serif,system-ui" fontWeight="700">35.9%</text>
      {/* Right — intern */}
      <circle cx="225" cy="70" r="14" fill="#1E3A5F" />
      <rect x="213" y="84" width="24" height="32" fill="#FAF7F2" stroke="#1E3A5F" strokeWidth="1" />
      <rect x="219" y="116" width="4" height="20" fill="#0B1728" />
      <rect x="227" y="116" width="4" height="20" fill="#0B1728" />
      <text x="225" y="152" textAnchor="middle" fontSize="9" fill="#0B1728" fontFamily="ui-sans-serif,system-ui">intern</text>
      <rect x="188" y="20" width="74" height="30" rx="6" fill="#C26A3D" />
      <text x="225" y="40" textAnchor="middle" fontSize="13" fill="#FAF7F2" fontFamily="ui-sans-serif,system-ui" fontWeight="700">51.6%</text>
      <line x1="112" y1="35" x2="188" y2="35" stroke="#0B1728" strokeWidth="1" strokeDasharray="2,2" />
      <text x="150" y="32" textAnchor="middle" fontSize="10" fill="#0B1728" fontFamily="ui-sans-serif,system-ui" fontStyle="italic">p = 0.03</text>
      <text x="150" y="180" textAnchor="middle" fontSize="9" fill="#0B1728" fontFamily="ui-sans-serif,system-ui">aware of MMI interactions</text>
    </g>
  ),

  database: (
    <g>
      <rect x="30" y="30" width="240" height="140" rx="6" fill="#FAF7F2" stroke="#1E3A5F" strokeWidth="1.5" />
      <rect x="30" y="30" width="240" height="22" rx="6" fill="#1E3A5F" />
      <rect x="30" y="45" width="240" height="7" fill="#1E3A5F" />
      <circle cx="42" cy="41" r="3" fill="#c62828" />
      <circle cx="52" cy="41" r="3" fill="#ff8f00" />
      <circle cx="62" cy="41" r="3" fill="#2e7d32" />
      <text x="150" y="45" textAnchor="middle" fontSize="9" fill="#FAF7F2" fontFamily="ui-sans-serif,system-ui">Open Payments · MY</text>
      <rect x="44" y="62" width="212" height="18" rx="9" fill="#F3E4D8" stroke="#1E3A5F" strokeWidth="1" />
      <circle cx="56" cy="71" r="4" fill="none" stroke="#1E3A5F" strokeWidth="1.2" />
      <line x1="59" y1="74" x2="63" y2="78" stroke="#1E3A5F" strokeWidth="1.2" />
      <text x="74" y="75" fontSize="8" fill="#9e9e9e" fontFamily="ui-sans-serif,system-ui">search physician name…</text>
      <rect x="44" y="92" width="212" height="18" fill="#F3E4D8" />
      <text x="50" y="104" fontSize="8" fill="#0B1728" fontFamily="ui-sans-serif,system-ui">Dr A. Kumar</text>
      <text x="180" y="104" fontSize="8" fill="#C26A3D" fontFamily="ui-sans-serif,system-ui" fontWeight="600">RM 4,200 · 2024</text>
      <rect x="44" y="114" width="212" height="18" fill="#FAF7F2" />
      <text x="50" y="126" fontSize="8" fill="#0B1728" fontFamily="ui-sans-serif,system-ui">Dr S. Lim</text>
      <text x="180" y="126" fontSize="8" fill="#C26A3D" fontFamily="ui-sans-serif,system-ui" fontWeight="600">RM 1,150 · 2024</text>
      <rect x="44" y="136" width="212" height="18" fill="#F3E4D8" />
      <text x="50" y="148" fontSize="8" fill="#0B1728" fontFamily="ui-sans-serif,system-ui">Dr N. Rahman</text>
      <text x="180" y="148" fontSize="8" fill="#C26A3D" fontFamily="ui-sans-serif,system-ui" fontWeight="600">RM 8,600 · 2023</text>
    </g>
  ),

  classroom: (
    <g>
      <rect x="80" y="30" width="140" height="60" rx="3" fill="#1E3A5F" />
      <text x="150" y="55" textAnchor="middle" fontSize="10" fill="#FAF7F2" fontFamily="ui-sans-serif,system-ui" fontWeight="600">Physician–MMI Ethics</text>
      <text x="150" y="70" textAnchor="middle" fontSize="8" fill="#F3E4D8" fontFamily="ui-sans-serif,system-ui">Week 6 · Role-play scenarios</text>
      <text x="150" y="82" textAnchor="middle" fontSize="8" fill="#F3E4D8" fontFamily="ui-sans-serif,system-ui">MMA Code · disclosure · cases</text>
      <circle cx="50" cy="120" r="8" fill="#C26A3D" />
      <circle cx="90" cy="120" r="8" fill="#1E3A5F" />
      <circle cx="130" cy="120" r="8" fill="#C26A3D" />
      <circle cx="170" cy="120" r="8" fill="#1E3A5F" />
      <circle cx="210" cy="120" r="8" fill="#C26A3D" />
      <circle cx="250" cy="120" r="8" fill="#1E3A5F" />
      <circle cx="50" cy="150" r="8" fill="#1E3A5F" />
      <circle cx="90" cy="150" r="8" fill="#C26A3D" />
      <circle cx="130" cy="150" r="8" fill="#1E3A5F" />
      <circle cx="170" cy="150" r="8" fill="#C26A3D" />
      <circle cx="210" cy="150" r="8" fill="#1E3A5F" />
      <circle cx="250" cy="150" r="8" fill="#C26A3D" />
      <circle cx="50" cy="180" r="8" fill="#C26A3D" />
      <circle cx="90" cy="180" r="8" fill="#1E3A5F" />
      <circle cx="130" cy="180" r="8" fill="#C26A3D" />
      <circle cx="170" cy="180" r="8" fill="#1E3A5F" />
      <circle cx="210" cy="180" r="8" fill="#C26A3D" />
      <circle cx="250" cy="180" r="8" fill="#1E3A5F" />
    </g>
  ),

  // ---- keys added for haira-maturity ----

  funnel: (
    <g>
      {/* PRISMA cascade: 2,351 → 2,110 → 260 → 29 */}
      <polygon points="40,30 260,30 230,65 70,65" fill="#F3E4D8" stroke="#1E3A5F" strokeWidth="1.5"/>
      <polygon points="70,75 230,75 210,110 90,110" fill="#F3E4D8" stroke="#1E3A5F" strokeWidth="1.5"/>
      <polygon points="90,120 210,120 190,155 110,155" fill="#C26A3D" opacity="0.25" stroke="#C26A3D" strokeWidth="1.5"/>
      <polygon points="110,165 190,165 175,195 125,195" fill="#C26A3D" stroke="#C26A3D" strokeWidth="1.5"/>
      <text x="150" y="52" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0B1728">2,351 screened</text>
      <text x="150" y="97" textAnchor="middle" fontSize="12" fontWeight="600" fill="#0B1728">2,110 after dedup</text>
      <text x="150" y="142" textAnchor="middle" fontSize="12" fontWeight="600" fill="#0B1728">260 full-text</text>
      <text x="150" y="185" textAnchor="middle" fontSize="13" fontWeight="700" fill="#FAF7F2">29 included</text>
      <text x="270" y="68" fontSize="10" fill="#0B1728" opacity="0.55">−241</text>
      <text x="270" y="113" fontSize="10" fill="#0B1728" opacity="0.55">−1,850</text>
      <text x="270" y="158" fontSize="10" fill="#0B1728" opacity="0.55">−231</text>
    </g>
  ),

  wheel: (
    <g>
      {/* 7 domains as spokes — the 'org structure' spoke is highlighted (weakest at 9/29) */}
      <circle cx="150" cy="100" r="22" fill="#1E3A5F" />
      <text x="150" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#FAF7F2">HAIRA</text>
      <text x="150" y="108" textAnchor="middle" fontSize="8" fill="#FAF7F2">7 domains</text>
      <line x1="150" y1="100" x2="150" y2="25"  stroke="#1E3A5F" strokeWidth="1.5"/>
      <line x1="150" y1="100" x2="223" y2="66"  stroke="#1E3A5F" strokeWidth="1.5"/>
      <line x1="150" y1="100" x2="223" y2="140" stroke="#1E3A5F" strokeWidth="1.5"/>
      <line x1="150" y1="100" x2="180" y2="172" stroke="#1E3A5F" strokeWidth="1.5"/>
      <line x1="150" y1="100" x2="120" y2="172" stroke="#1E3A5F" strokeWidth="1.5"/>
      <line x1="150" y1="100" x2="77"  y2="140" stroke="#1E3A5F" strokeWidth="1.5"/>
      <line x1="150" y1="100" x2="77"  y2="66"  stroke="#1E3A5F" strokeWidth="1.5"/>
      <circle cx="150" cy="25"  r="9"  fill="#F3E4D8" stroke="#1E3A5F" strokeWidth="1.2"/>
      <circle cx="223" cy="66"  r="9"  fill="#F3E4D8" stroke="#1E3A5F" strokeWidth="1.2"/>
      <circle cx="223" cy="140" r="9"  fill="#F3E4D8" stroke="#1E3A5F" strokeWidth="1.2"/>
      <circle cx="180" cy="172" r="9"  fill="#F3E4D8" stroke="#1E3A5F" strokeWidth="1.2"/>
      <circle cx="120" cy="172" r="9"  fill="#F3E4D8" stroke="#1E3A5F" strokeWidth="1.2"/>
      <circle cx="77"  cy="140" r="9"  fill="#F3E4D8" stroke="#1E3A5F" strokeWidth="1.2"/>
      <circle cx="77"  cy="66"  r="11" fill="#C26A3D" stroke="#C26A3D" strokeWidth="1.5"/>
      <text x="150" y="18"  textAnchor="middle" fontSize="8.5" fill="#0B1728">Problem</text>
      <text x="236" y="62"  textAnchor="start"  fontSize="8.5" fill="#0B1728">Ext eval</text>
      <text x="236" y="144" textAnchor="start"  fontSize="8.5" fill="#0B1728">Algo dev</text>
      <text x="186" y="188" textAnchor="middle" fontSize="8.5" fill="#0B1728">Model eval</text>
      <text x="114" y="188" textAnchor="middle" fontSize="8.5" fill="#0B1728">Deploy</text>
      <text x="64"  y="144" textAnchor="end"    fontSize="8.5" fill="#0B1728">Monitor</text>
      <text x="64"  y="62"  textAnchor="end"    fontSize="8.5" fontWeight="700" fill="#C26A3D">Org struct</text>
    </g>
  ),

  ladder: (
    <g>
      <line x1="90"  y1="25" x2="90"  y2="185" stroke="#1E3A5F" strokeWidth="3"/>
      <line x1="210" y1="25" x2="210" y2="185" stroke="#1E3A5F" strokeWidth="3"/>
      {/* L1–L5 rungs, L4/L5 highlighted as advanced */}
      <rect x="90" y="162" width="120" height="16" fill="#F3E4D8" stroke="#1E3A5F" strokeWidth="1.2"/>
      <text x="150" y="174" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0B1728">L1 — Initial / Ad Hoc</text>
      <rect x="90" y="132" width="120" height="16" fill="#F3E4D8" stroke="#1E3A5F" strokeWidth="1.2"/>
      <text x="150" y="144" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0B1728">L2 — Defined</text>
      <rect x="90" y="102" width="120" height="16" fill="#F3E4D8" stroke="#1E3A5F" strokeWidth="1.2"/>
      <text x="150" y="114" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0B1728">L3 — Established</text>
      <rect x="90" y="72"  width="120" height="16" fill="#C26A3D" opacity="0.35" stroke="#1E3A5F" strokeWidth="1.2"/>
      <text x="150" y="84"  textAnchor="middle" fontSize="10" fontWeight="600" fill="#FAF7F2">L4 — Advanced</text>
      <rect x="90" y="42"  width="120" height="16" fill="#C26A3D" stroke="#1E3A5F" strokeWidth="1.2"/>
      <text x="150" y="54"  textAnchor="middle" fontSize="10" fontWeight="600" fill="#FAF7F2">L5 — Leading</text>
      <path d="M 150 25 L 144 34 M 150 25 L 156 34" stroke="#C26A3D" strokeWidth="2" fill="none"/>
      <text x="170" y="20" fontSize="9" fill="#0B1728" opacity="0.6">maturity</text>
    </g>
  ),

  chain: (
    <g>
      {/* Five chain links — the middle one is cracked, representing the weakest-link rule */}
      <ellipse cx="40"  cy="100" rx="22" ry="14" fill="none" stroke="#1E3A5F" strokeWidth="4"/>
      <ellipse cx="90"  cy="100" rx="22" ry="14" fill="none" stroke="#1E3A5F" strokeWidth="4"/>
      <ellipse cx="140" cy="100" rx="22" ry="14" fill="none" stroke="#c62828" strokeWidth="3" strokeDasharray="4 3"/>
      <ellipse cx="190" cy="100" rx="22" ry="14" fill="none" stroke="#1E3A5F" strokeWidth="4"/>
      <ellipse cx="240" cy="100" rx="22" ry="14" fill="none" stroke="#1E3A5F" strokeWidth="4"/>
      <path d="M 132 100 L 138 94 L 142 106 L 148 100" stroke="#c62828" strokeWidth="2.5" fill="none"/>
      <text x="150" y="40" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0B1728">One weak domain</text>
      <text x="150" y="55" textAnchor="middle" fontSize="12" fontWeight="700" fill="#c62828">caps the whole system</text>
      <text x="140" y="145" textAnchor="middle" fontSize="9" fill="#c62828">weakest link</text>
      <text x="150" y="175" textAnchor="middle" fontSize="10" fill="#0B1728" opacity="0.7">minimum-domain rule</text>
    </g>
  ),

  committee: (
    <g>
      {/* Round AI oversight committee */}
      <ellipse cx="150" cy="115" rx="70" ry="28" fill="#F3E4D8" stroke="#1E3A5F" strokeWidth="1.5"/>
      <text x="150" y="118" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0B1728">AI oversight</text>
      <text x="150" y="130" textAnchor="middle" fontSize="9" fill="#0B1728" opacity="0.7">committee</text>
      <circle cx="70"  cy="90"  r="9" fill="#1E3A5F"/>
      <path d="M 58 104 Q 70 96 82 104" fill="none" stroke="#1E3A5F" strokeWidth="1.5"/>
      <text x="70" y="77" textAnchor="middle" fontSize="8.5" fill="#0B1728">CMO</text>
      <circle cx="150" cy="70"  r="9" fill="#1E3A5F"/>
      <path d="M 138 84 Q 150 76 162 84" fill="none" stroke="#1E3A5F" strokeWidth="1.5"/>
      <text x="150" y="57" textAnchor="middle" fontSize="8.5" fill="#0B1728">CAIO</text>
      <circle cx="230" cy="90"  r="9" fill="#1E3A5F"/>
      <path d="M 218 104 Q 230 96 242 104" fill="none" stroke="#1E3A5F" strokeWidth="1.5"/>
      <text x="230" y="77" textAnchor="middle" fontSize="8.5" fill="#0B1728">CIO</text>
      <circle cx="230" cy="140" r="9" fill="#1E3A5F"/>
      <path d="M 218 154 Q 230 146 242 154" fill="none" stroke="#1E3A5F" strokeWidth="1.5"/>
      <text x="230" y="127" textAnchor="middle" fontSize="8.5" fill="#0B1728">Ethics</text>
      <circle cx="150" cy="160" r="9" fill="#1E3A5F"/>
      <path d="M 138 174 Q 150 166 162 174" fill="none" stroke="#1E3A5F" strokeWidth="1.5"/>
      <text x="150" y="147" textAnchor="middle" fontSize="8.5" fill="#0B1728">Clin lead</text>
      <circle cx="70"  cy="140" r="9" fill="#1E3A5F"/>
      <path d="M 58 154 Q 70 146 82 154" fill="none" stroke="#1E3A5F" strokeWidth="1.5"/>
      <text x="70" y="127" textAnchor="middle" fontSize="8.5" fill="#0B1728">Data sci</text>
      <text x="150" y="56" textAnchor="middle" fontSize="12" fontWeight="700" fill="#C26A3D">★</text>
      <text x="150" y="192" textAnchor="middle" fontSize="9" fill="#0B1728" opacity="0.6">Level 2: clinical + IT • Level 4: executive + subcommittees</text>
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
        borderTop: '4px solid #1E3A5F'
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
