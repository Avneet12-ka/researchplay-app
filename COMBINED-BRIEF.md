# Combined Claude Code Brief — Add Two Papers to ResearchPlay

Execute this end-to-end. One branch, one commit, two papers.

**Context**

- Repo: ResearchPlay
- Branch: `claude/research-paper-app-BM2lF` — check out this branch before starting
- Target files: `src/reader/ComicPanel.jsx` and `src/data/papers.js`
- Two papers being added:
  1. `mmi-perceptions` — Kaur A, Singh S, Singh H. *Physician–MMI Relationships: Perceptions of Malaysian medical students and interns.* Natl Med J India 2024;37(1):46–9. DOI 10.25259/NMJI_328_2023.
  2. `haira-maturity` — Hussein R et al. *Healthcare AI Governance Readiness Assessment.* npj Digital Medicine 2026;9:236. DOI 10.1038/s41746-026-02418-7.

**What the brief does**

1. Add 11 new SVG art keys to `ComicPanel.jsx` (6 for MMI + 5 for HAIRA).
2. Append two paper objects to `src/data/papers.js`.
3. Commit and push with a combined message.

All Aurum-palette colors are inlined as hex so the existing codebase style is preserved: `#1E3A5F` primary navy, `#C26A3D` terracotta, `#F3E4D8` primary-subtle, `#FAF7F2` surface, `#0B1728` ink, plus semantic `#c62828` red / `#2e7d32` green / `#9e9e9e` grey / `#ff8f00` amber / `#455a64` mid-grey.

---

## Part 1 — Add 11 SVG keys to `src/reader/ComicPanel.jsx`

Open the file. Find the `ART` object near the top (it has entries like `alert:`, `patient:`, `trial:`, etc.). Append the following eleven new entries just before the closing `};` of `ART`. Preserve the existing trailing-comma pattern.

If the target file at the above path does not exist, check `src/components/ComicPanel.jsx` instead — the component may live there. If neither exists, run `grep -R "const ART" src` from the repo root and patch the file you find.

```jsx
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
  ),
```

Note on `crowd` (used by MMI panel 3): the existing codebase already has this key, reused. If a search of `ART` shows no `crowd`, use `classroom` as a substitute — the panel caption still reads correctly.

---

## Part 2 — Append both paper objects to `src/data/papers.js`

Open `src/data/papers.js`. Scroll to the end of the `papers` array — the closing `];` just before the `getPaper` helper function.

Put a comma after the last existing entry's closing `}`. Then paste **both** of the following objects in order, each followed by a comma except the last. The final shape should look like:

```js
export const papers = [
  // ... existing entries ...
  { id: 'punjab-deaddiction', ... },     // <-- existing, now with trailing comma
  { id: 'mmi-perceptions',   ... },      // <-- MMI (below)
  { id: 'haira-maturity',    ... },      // <-- HAIRA (below), no trailing comma
];
```

### 2.1 — Paste this MMI object first

```js
  {
    id: 'mmi-perceptions',
    title: 'Physician–Medical Manufacturing Industry Relationships',
    subtitle: 'Perceptions of Malaysian medical students and interns',
    authors: 'Kaur A, Singh S, Singh H',
    journal: 'Natl Med J India 2024;37(1):46–9',
    doi: '10.25259/NMJI_328_2023',
    tagline: '215 students took a survey about pharma gifts. 40% knew doctors and industry work together. Only 6% knew there were rules. The gap between what is happening and what students recognise as an ethical question is where the curriculum has work to do.',

    comic: {
      panels: [
        { title: 'The first time a rep walks in',       caption: 'A pharmaceutical representative arrives on the ward with pens, a pamphlet, and a tray of samples. A medical student watches the consultant accept them. No one explains what just happened.', svg: 'samples' },
        { title: 'The rule book nobody opens',          caption: 'The Malaysian Medical Association’s 2019 Code of Professional Conduct tells doctors to avoid any inducement that might compromise professional judgment. Only 6% of students in this study had heard of it.', svg: 'rulebook' },
        { title: 'Two hundred and fifteen responses',   caption: 'Medical students and interns/housemen at UTAR answered a survey — five yes/no awareness questions, 26 Likert-style items across acceptability, perceived harm, disclosure attitude, and distrust. Cronbach’s alpha 0.72.', svg: 'crowd' },
        { title: 'Six, forty, eighty-four',             caption: '6% knew rules existed. 40% knew doctors and industry interact. 84% still thought free samples were a good way to learn about new drugs. Knowing what happens is not the same as recognising the ethical stake.', svg: 'stat' },
        { title: 'Interns knew more. Women accepted more.', caption: 'Awareness was higher in interns/housemen (51.6%) than in undergraduates (35.9%), p = 0.03. Across gender, women were the only subgroup with significantly higher acceptability of these interactions (p = 0.01) — a reversal of findings from most prior literature.', svg: 'compare' },
        { title: 'The US$200 threshold',                caption: '43% of respondents said gifts under US$200 were acceptable. The MMA rule isn’t a dollar amount — it’s whether the gift could reasonably be seen as influencing judgment. That’s a harder threshold to internalise than a price.', svg: 'scales' },
        { title: 'Disclose, publicly',                  caption: '43% preferred a public online database as the disclosure method — the model of the US Open Payments registry. Malaysia has no equivalent. Whether to build one is a policy question the next generation of clinicians will be asked to weigh in on.', svg: 'database' },
        { title: 'Where curriculum goes',               caption: 'The paper argues for course material on MMI interactions, role-play of industry scenarios, MMI conduct as a rated element in student evaluations, and institutional guidelines that make the conflict-of-interest conversation part of clinical training, not an optional aside.', svg: 'classroom' }
      ]
    },

    slides: [
      { kind: 'title', eyebrow: 'Slide 1 of 10', title: 'Do students see the ethics of pharma gifts?', body: 'Most Malaysian medical students will meet the medical manufacturing industry before they ever write a prescription. This paper asks whether they have been taught to recognise what those meetings mean.' },
      { kind: 'text', eyebrow: 'Slide 2 of 10 — Background', title: 'Why this matters', body: 'Physician–industry relationships range from conference registration fees and travel reimbursement to free drug samples and company-owned stock. Evidence from the US opioid crisis and a decade of prescribing-behaviour studies links these interactions to downstream prescribing patterns. The Malaysian Medical Association’s 2019 Code of Professional Conduct formally names this as a conflict of interest. Whether the next generation of doctors recognises it is an open question.' },
      { kind: 'text', eyebrow: 'Slide 3 of 10 — The gap in the literature', title: 'Most prior work studied residents. This one starts earlier.', body: 'Systematic reviews of medical-student attitudes toward the pharmaceutical industry have documented exposure but not consistently measured ethical awareness. Data from Malaysian undergraduates specifically is almost absent. The study reported here is a single-institution survey, but it fills a particular descriptive gap.' },
      { kind: 'text', eyebrow: 'Slide 4 of 10 — Design', title: '215 students, 33 questions, one institution', body: 'A cross-sectional questionnaire administered via Google Forms to 215 medical students and interns at UTAR (Sungai Long, Selangor). Five yes/no awareness items, 26 Likert-scale items covering acceptability, perceived negative effects, attitude toward disclosure, and distrust, plus two disclosure-method questions. Internal consistency: Cronbach’s α = 0.723. Ethics approval: UTAR SERC.' },
      {
        kind: 'chart', eyebrow: 'Slide 5 of 10 — The awareness headline', title: 'What students know, vs what students think is fine',
        body: 'Three numbers anchor this paper. 40% know the relationship exists. 6% know rules exist. 84% still endorse free samples as an educational tool. The shape of the gap is visible in the bars.',
        chart: { kind: 'bars', unit: '%', max: 100, bars: [
          { label: 'Knew doctors & industry interact', value: 40, color: '#1E3A5F' },
          { label: 'Knew MMA rules on gifts exist', value: 6, color: '#c62828' },
          { label: 'Felt prepared to interact with MMI', value: 7, color: '#c62828' },
          { label: 'Endorsed free samples as education', value: 84, color: '#C26A3D' },
          { label: 'Said doctors shouldn’t accept MMI gifts', value: 21, color: '#9e9e9e' }
        ] }
      },
      { kind: 'text', eyebrow: 'Slide 6 of 10 — The paradox', title: 'Aware of the relationship, not of the stake', body: 'The same respondents who recognise that doctors and industry interact also overwhelmingly approve of the interactions’ most visible form. 78% deemed industry funding of educational programmes satisfactory. 30% considered personal use of free drug samples acceptable — a practice the MMA explicitly prohibits. Descriptive knowledge and ethical knowledge are not moving together.' },
      {
        kind: 'cohortChart', eyebrow: 'Slide 7 of 10 — Subgroup differences', title: 'Awareness and acceptability by training stage and gender',
        body: 'Awareness rose meaningfully between undergraduates and interns/housemen, consistent with on-the-job exposure. The gender split is the surprising finding: in this cohort, women showed significantly higher acceptability of physician–industry interactions, reversing the pattern reported in most US and European studies.',
        cohorts: {
          'By training stage': { note: 'Awareness of MMI-related activities, by year of training', bars: [
            { label: 'Undergraduates — aware', value: 35.9, color: '#1E3A5F' },
            { label: 'Undergraduates — unaware', value: 64.1, color: '#9e9e9e' },
            { label: 'Interns/housemen — aware', value: 51.6, color: '#1E3A5F' },
            { label: 'Interns/housemen — unaware', value: 48.4, color: '#9e9e9e' }
          ] },
          'By prior exposure': { note: 'Prior participation in MMI-related activities (samples, gifts, meals, talks)', bars: [
            { label: 'Undergraduates — exposed', value: 30.1, color: '#1E3A5F' },
            { label: 'Undergraduates — not exposed', value: 69.9, color: '#9e9e9e' },
            { label: 'Interns/housemen — exposed', value: 62.9, color: '#1E3A5F' },
            { label: 'Interns/housemen — not exposed', value: 37.1, color: '#9e9e9e' }
          ] },
          'By preferred disclosure': { note: 'Student-preferred method of disclosing physician–MMI financial ties', bars: [
            { label: 'Public online database', value: 43, color: '#1E3A5F' },
            { label: 'Hospital or institution only', value: 27, color: '#455a64' },
            { label: 'At point of prescription', value: 18, color: '#455a64' },
            { label: 'No disclosure needed', value: 12, color: '#c62828' }
          ] }
        }, max: 100
      },
      { kind: 'text', eyebrow: 'Slide 8 of 10 — What students ask for', title: 'Disclosure via a public registry', body: '43% — the largest single group — preferred a public online database. The closest international analogue is the US Open Payments registry, which has been associated with lower brand-name prescribing and higher clinician awareness of conflicts. Malaysia has no equivalent. The student preference is, in effect, an institutional ask.' },
      { kind: 'headline', eyebrow: 'Slide 9 of 10 — The thesis', title: 'The curriculum is downstream of clinical habits', body: 'Students accept what they see practised around them. If the consultants accept samples, the students will. The authors argue that waiting for learners to notice the ethics on their own is a pedagogical failure. The intervention belongs upstream of clinical rotation.' },
      { kind: 'text', eyebrow: 'Slide 10 of 10 — What next', title: 'Five concrete curricular changes', body: 'The paper recommends: (i) dedicated course material on MMI interactions with role-played scenarios; (ii) MMI conduct as a rated element in student evaluations; (iii) any MMI engagement with students to be faculty-chaperoned and structured as a teaching session; (iv) published institutional policy on MMI dealings; (v) transparent institutional-level disclosure of MMI ties. The survey is the baseline. The curriculum is the intervention.' }
    ],

    paper: {
      glossary: {
        'MMI': 'Medical manufacturing industry. Pharmaceutical, device, and diagnostics companies that interact with physicians through samples, sponsored education, consulting, and gifts.',
        'MMA': 'Malaysian Medical Association. The professional body whose 2015/2019 Code of Professional Conduct names the rules governing physician–industry relationships in Malaysia.',
        'conflict of interest': 'A situation in which a secondary interest (financial, reputational, personal) could unduly influence a primary professional judgment. The existence of a conflict is not the same as wrongdoing — the test is whether it could reasonably be perceived to compromise judgment.',
        'Likert scale': 'An ordinal response scale where respondents mark agreement on a graded continuum — here, 1 = strongly disagree to 5 = strongly agree. Commonly analysed with means and non-parametric tests.',
        'Cronbach’s alpha': 'A measure of internal consistency — whether items on a questionnaire move together. Values above 0.7 are generally considered acceptable for survey research.',
        'chi-square test': 'A statistical test of whether two categorical variables (here, demographic characteristics vs awareness) are associated more than chance alone would produce.',
        'Open Payments': 'A US federal registry, mandated by the Physician Payments Sunshine Act, that makes industry payments to physicians publicly searchable by name. Malaysia has no equivalent.',
        'disclosure': 'The act of making a relationship visible to a relevant audience — patients, peers, the institution, or the public. The unit of disclosure (individual physician vs institution) is itself a policy choice.',
        'hidden curriculum': 'The norms, values, and expectations transmitted through routine clinical practice rather than formal teaching. What students see attendings do carries more weight than what they are told.',
        'pragmatic trial': 'A study design that tests an intervention under routine conditions rather than idealised ones. Cited here as the evidence standard for prescribing-behaviour studies.'
      },
      marginNotes: {
        'abstract-gap': 'What this sentence actually claims: not that students approve of pharma gifts, but that they recognise the interaction exists without recognising it as an ethical question. The gap is the finding.',
        'results-gender': 'What this sentence actually claims: this cohort’s gender finding reverses most international data. The authors flag it as a finding to replicate, not to generalise. Single-institution, n = 215.',
        'discussion-curriculum': 'What this sentence actually claims: the proposed interventions are evidence-informed (Farah & Bilszta 2022 lecture-based intervention; Wofford & Ohl 2005 workshop design), but none has been deployed in a Malaysian undergraduate programme at scale. The recommendation is structural, not yet empirical.'
      },
      sections: [
        {
          heading: 'Abstract',
          paragraphs: [
            { id: 'abstract-1', text: [
              'Background. Physicians and the ',
              { term: 'MMI', text: 'medical manufacturing industry (MMI)' },
              ' are closely associated and may have some form of financial or business arrangement. Research has highlighted that these interactions negatively impact physicians’ prescribing behaviour. We explored medical students’ perspectives regarding these interactions.'
            ] },
            { id: 'abstract-methods', text: [
              'Methods. A questionnaire-based survey (215 respondents) captured demographic information and included five yes/no awareness questions, 26 ',
              { term: 'Likert scale', text: 'Likert-style items' },
              ', and two disclosure-method questions. Internal consistency was assessed with ',
              { term: 'Cronbach’s alpha', text: 'Cronbach’s alpha' },
              ' (0.72). Associations between independent variables and awareness were tested using the ',
              { term: 'chi-square test', text: 'chi-square test' },
              '.'
            ] },
            { id: 'abstract-gap', marginNote: 'abstract-gap', text: [
              'Results. About 40% of students knew that doctors and MMI work together, but only 6% knew there were rules about accepting gifts from MMI. Eighty-four per cent of respondents felt free samples from MMI were an excellent way to learn about new products. Awareness was higher in interns/housemen (51.6%) than in medical students (35.9%). Most participants (43%) preferred an online database as a method of ',
              { term: 'disclosure', text: 'disclosure' },
              '.'
            ] },
            { id: 'abstract-conclusion', text: [
              'Conclusions. Findings indicated students’ knowledge gaps regarding ethical considerations and the recommended guidelines governing physician–MMI relationships. Students should be taught appropriate conduct and best practices and must develop skepticism toward MMI marketing claims.'
            ] }
          ]
        },
        {
          heading: 'Results — Awareness and exposure',
          paragraphs: [
            { id: 'results-1', text: ['Of the 215 respondents, only 13 (6%) had heard of any rules governing the acceptance of gifts from MMI, although 86 (40%) were aware that doctors and industry interact. Only 15 (7%) reported feeling prepared to communicate with MMI staff during training. Eighty-six (40%) had already participated in MMI-related events such as free medicine samples, gifts, meals, and presentations.'] },
            { id: 'results-training', text: ['Only year of training was substantially related to MMI-related awareness and exposure. Awareness was more prevalent among interns/housemen (51.6%) than medical students (35.9%) — a statistically significant difference (p = 0.03). Prior exposure was also more prevalent among interns/housemen (62.9%) than undergraduates (30.1%), p < 0.001.'] }
          ]
        },
        {
          heading: 'Results — Acceptability and disclosure',
          paragraphs: [
            { id: 'results-gender', marginNote: 'results-gender', text: [
              'Approximately 43% of respondents chose less than US$200 as an acceptable value of gifts from MMI to physicians. 43% preferred a public online database as the method of ',
              { term: 'disclosure', text: 'disclosure' },
              '. Among independent variables, only gender showed significant association with acceptability (p = 0.01), with women more accepting of these interactions — a reversal of findings from prior US and European literature (Wazana 2000; Pham-Kanter 2012).'
            ] },
            { id: 'results-samples', text: ['84% considered free samples from MMI an excellent way to learn about new products. 78% deemed industry funding of educational programmes and fellowships satisfactory. Only 21% agreed that physicians should not receive gifts from MMI. Approximately 30% considered personal use of free drug samples acceptable — a practice explicitly prohibited by the MMA code.'] }
          ]
        },
        {
          heading: 'Discussion — The gap between awareness and ethics',
          paragraphs: [
            { id: 'discussion-gap', text: ['There was a consistent disparity between students’ knowledge of physician–industry interactions and their acknowledgement of the ethical issues raised by those interactions. Despite awareness of the relationship, the majority of students did not recognise the relationship as carrying an ethical stake. Prior literature (Steinman et al. 2001; Keim et al. 1993; Austad et al. 2011 systematic review) has documented the same disjunction in residents and trainees elsewhere; the present data extend the observation to the Malaysian undergraduate population.'] },
            { id: 'discussion-curriculum', marginNote: 'discussion-curriculum', text: [
              'The ',
              { term: 'hidden curriculum', text: 'hidden curriculum' },
              ' — what students see practised on the wards — appears to be teaching acceptance faster than formal ethics instruction is teaching skepticism. Educational interventions specifically designed for this gap (Farah & Bilszta 2022; Wofford & Ohl 2005) have demonstrated improvement in students’ ability to resist pharmaceutical marketing. The recommendation here is to make such training part of the core curriculum rather than an optional adjunct.'
            ] }
          ]
        }
      ]
    },

    governance: {
      intro: 'ResearchPlay’s governance layer isn’t written by the authors. It’s written by the reader, for their institution. The four lenses below are reusable. The content is specific to this paper.',
      cards: [
        {
          id: 'mmi-reps-on-wards',
          title: 'Should our medical school restrict MMI access to students on clinical rotations?',
          context: 'Your curriculum committee is asked whether pharmaceutical representatives should continue to be allowed on wards and in clinic sessions where medical students are present, and whether chaperoned teaching sessions should replace informal rep visits.',
          lenses: [
            { lens: 'Institutional policy', body: 'A blanket ban is defensible but hard to operationalise in affiliated private clinics where students rotate. A graduated policy — reps allowed only in faculty-chaperoned teaching sessions with a published agenda — preserves the educational value the study’s respondents believe they gain from samples and talks, while making the interaction visible and accountable.' },
            { lens: 'Regulatory', body: 'The MMA 2019 Code already prohibits pecuniary inducements that may compromise judgment, but enforcement at the medical-school level sits with individual institutions. A formal policy with documented sanctions is the minimum step needed to move from norm to rule. The Malaysian Medical Council could be asked to issue institutional guidance parallel to the physician code.' },
            { lens: 'Ethics', body: 'Students cannot opt out of the hidden curriculum. If the consultant accepts samples, the student learns that samples are acceptable — regardless of what the formal ethics module teaches. The ethical case for chaperoning is not to protect students from reps; it is to protect the signal value of what faculty model.' },
            { lens: 'Equity', body: 'MMI sponsorship disproportionately funds educational activities in resource-constrained settings, including parts of Malaysian clinical training. A restriction without a replacement funding stream may widen the gap between well-resourced and community-affiliated teaching sites. Any policy change should name its budget offset.' }
          ],
          prompt: 'If a curriculum committee restricts MMI access and the institution cannot backfill the sponsored CPD programmes the reps used to fund, who pays, and how does that decision get made transparently?'
        },
        {
          id: 'open-payments-malaysia',
          title: 'Should Malaysia create a public Open Payments-style registry?',
          context: 'A Ministry of Health working group is considering whether to mandate public disclosure of financial relationships between Malaysian physicians and the medical manufacturing industry — modelled on the US Physician Payments Sunshine Act and Open Payments database.',
          lenses: [
            { lens: 'Institutional policy', body: 'The student preference (43% chose a public online database) is a data point in favour, but institutional readiness is the bottleneck. A phased approach — institution-level aggregated disclosure first, individual physician-level disclosure second — gives hospitals and MMA time to build reporting infrastructure before individual clinicians face a new compliance burden.' },
            { lens: 'Regulatory', body: 'A registry would require new statutory authority (MMA alone cannot compel industry reporting) plus an enforcement agency equivalent to the US Centers for Medicare and Medicaid Services. Counsel should map the minimum legislative footprint, and the Personal Data Protection Act implications for publishing physician-identified payment records.' },
            { lens: 'Ethics', body: 'Disclosure shifts the ethical centre of gravity from the individual physician to the institution. Published evidence (Licurse et al. 2010 systematic review) associates disclosure with lower rates of brand-name prescribing. But disclosure is not absolution — it does not resolve the underlying conflict, it only makes it visible to patients who have the literacy and time to check.' },
            { lens: 'Equity', body: 'A registry that only patients with English literacy and internet access can use will disclose to some and not others. If Malaysia proceeds, the registry should be multilingual (BM, English, Mandarin, Tamil), SMS-accessible, and actively integrated into clinical decision points rather than sitting as a passive website.' }
          ],
          prompt: 'If an Open Payments-style registry is built in Malaysia, and a patient chooses a different specialist because of what they read there, is that the registry working as intended — or is that an unpriced consequence we haven’t thought through?'
        }
      ]
    }
  },
```

### 2.2 — Paste this HAIRA object second (comma-separated, no trailing comma on the last one)

```js
  {
    id: 'haira-maturity',
    title: 'Healthcare AI Governance Readiness Assessment',
    subtitle: 'A five-level maturity model for AI governance, built from 29 frameworks',
    authors: 'Hussein R, Zink A, Ramadan B, Howard FM, Hightower M, Shah S, Beaulieu-Jones BK',
    journal: 'npj Digital Medicine 2026;9:236',
    doi: '10.1038/s41746-026-02418-7',
    tagline: 'A systematic review of 29 AI governance frameworks found that the comprehensive ones assume academic-medical-centre resources most hospitals don’t have. HAIRA answers with a five-level maturity model and one blunt rule: the weakest domain decides your level.',

    comic: {
      panels: [
        { title: 'The frameworks, the funnel, the gap', caption: '2,351 articles screened. 260 after filtering. 29 included. Every comprehensive AI governance framework assumes an academic medical centre. Most hospitals aren’t one.', svg: 'funnel' },
        { title: 'Seven domains, one picture', caption: 'Organisational structure. Problem formulation. External evaluation. Algorithm development. Model evaluation. Deployment and integration. Monitoring and maintenance. HAIRA says you need a floor in each of them, not a ceiling in one.', svg: 'wheel' },
        { title: 'Five levels, one ladder', caption: 'Level 1 Initial/Ad Hoc. Level 2 Defined. Level 3 Established. Level 4 Advanced. Level 5 Leading. Each rung is a bundle of resource, process, and decision-rights — not just a score.', svg: 'ladder' },
        { title: 'The weakest link decides', caption: 'The minimum-domain rule: your HAIRA level is the highest level for which every domain meets that level’s floor. One weak domain caps the whole system. It is the single most useful constraint in the paper.', svg: 'chain' },
        { title: 'Radiology at 4, hospital at 2', caption: 'HAIRA can be scored at the health-system level or the service-line level. A sophisticated radiology AI programme sitting inside a Level-2 hospital is a real pattern. The paper names it and does not pretend the hospital is Level 4.', svg: 'compare' },
        { title: 'The governance body', caption: 'A multidisciplinary AI oversight committee starts as clinical + IT at Level 2 and becomes executive-level with subcommittees by Level 4. Chief AI Officer roles are emerging. The committee is the scaffolding every other domain hangs off.', svg: 'committee' },
        { title: 'No trial data, yet', caption: 'HAIRA is a derivation, not an evaluation. The authors are upfront: governance frameworks in this literature are almost entirely conceptual. They call for electronic, rapid RCTs of governance interventions. None yet exists.', svg: 'null' },
        { title: 'Built for smaller systems', caption: 'SALIENT and OPTICA are comprehensive but expensive. HAIRA’s point is to let a community hospital credibly claim Level 2, know exactly what Level 3 would require, and not pretend to operate at Level 4 because a vendor said so.', svg: 'scales' }
      ]
    },

    slides: [
      { kind: 'title', eyebrow: 'Slide 1 of 10', title: 'Governance frameworks are not one-size. They shouldn’t pretend to be.', body: 'Every hospital deploys AI under different constraints. HAIRA (Hussein et al. 2026, npj Digital Medicine) is a five-level maturity model that asks not what you aspire to, but what your organisation can credibly operate today — across seven governance domains, all at once.' },
      { kind: 'text', eyebrow: 'Slide 2 of 10 — The problem', title: 'Existing frameworks assume resources most hospitals don’t have', body: 'Published comprehensive frameworks (SALIENT, OPTICA, HEAAL, the NIST AI RMF) are rigorous, but assume in-house data science teams, AI ethics committees, and enterprise data warehouses. Community and regional systems — which is most of the world — cannot adopt them unchanged. The result: governance either gets skipped, or gets performed without the scaffolding to make it real.' },
      { kind: 'text', eyebrow: 'Slide 3 of 10 — The method', title: 'Systematic review of 29 frameworks published 2019–2024', body: 'PRISMA 2020 flow: 2,351 articles identified, 2,110 after deduplication, 260 after journal filtering, 29 included (27 peer-reviewed, 2 sector-shaping grey literature — CHAI and NIST — appraised with AACODS). Two reviewers independently coded recommendations. Conducted on PubMed/Medline, search run April 13 2025.' },
      {
        kind: 'chart', eyebrow: 'Slide 4 of 10 — What the 29 frameworks covered', title: 'Most work concentrated on three domains, least on two',
        body: 'Across the included frameworks, problem formulation, algorithm development, and monitoring received the most recommendation coverage. External algorithm evaluation and organisational structure received the least — a gap HAIRA is designed to fill.',
        chart: { kind: 'bars', unit: 'frameworks', max: 29, bars: [
          { label: 'Monitoring and maintenance', value: 24, color: '#1E3A5F' },
          { label: 'Problem formulation', value: 22, color: '#1E3A5F' },
          { label: 'Algorithm development', value: 21, color: '#1E3A5F' },
          { label: 'Model evaluation', value: 18, color: '#C26A3D' },
          { label: 'Deployment and integration', value: 17, color: '#C26A3D' },
          { label: 'External algorithm evaluation', value: 11, color: '#c62828' },
          { label: 'Organisational structure', value: 9, color: '#c62828' }
        ] }
      },
      { kind: 'text', eyebrow: 'Slide 5 of 10 — The seven domains', title: 'HAIRA’s axes', body: 'Organisational structure. Problem formulation. External algorithm evaluation. Algorithm development. Model evaluation. Deployment and integration. Monitoring and maintenance. These are derived inductively from the review. Every HAIRA level has a benchmark for each.' },
      { kind: 'headline', eyebrow: 'Slide 6 of 10 — The rule that matters', title: 'The minimum-domain rule: the weakest link caps the whole system', body: 'Your HAIRA level is the highest level for which every domain meets that level’s floor. This is the paper’s most useful contribution, and the hardest thing for a hospital to accept. One weak domain caps the overall level, even if everything else is advanced.' },
      {
        kind: 'cohortChart', eyebrow: 'Slide 7 of 10 — What each level looks like', title: 'The five HAIRA levels, by characteristic',
        body: 'Each level is a bundle: organisational maturity + process discipline + evaluation capability + who decides. Below, three toggles show the same five levels through different cuts: required expertise, governance mechanism, and evaluation approach.',
        cohorts: {
          'By required expertise': { note: 'Expertise floor for each HAIRA level', bars: [
            { label: 'L1 — basic IT + vendor support', value: 1, color: '#9e9e9e' },
            { label: 'L2 — dedicated IT + clinical informatics', value: 2, color: '#455a64' },
            { label: 'L3 — data science team + EDW', value: 3, color: '#1E3A5F' },
            { label: 'L4 — AI research teams + ethics committee', value: 4, color: '#C26A3D' },
            { label: 'L5 — world-class AI research + institute', value: 5, color: '#2e7d32' }
          ], max: 5 },
          'By governance body': { note: 'What the AI oversight structure looks like at each level', bars: [
            { label: 'L1 — no formal structure', value: 1, color: '#9e9e9e' },
            { label: 'L2 — basic IT + clinical committee', value: 2, color: '#455a64' },
            { label: 'L3 — multidisciplinary committee', value: 3, color: '#1E3A5F' },
            { label: 'L4 — exec-level AI officer + subcommittees', value: 4, color: '#C26A3D' },
            { label: 'L5 — centre of excellence, industry standard-setter', value: 5, color: '#2e7d32' }
          ], max: 5 },
          'By evaluation approach': { note: 'How each level handles model evaluation', bars: [
            { label: 'L1 — accept vendor claims', value: 1, color: '#9e9e9e' },
            { label: 'L2 — documented vendor selection criteria', value: 2, color: '#455a64' },
            { label: 'L3 — internal validation + bias testing', value: 3, color: '#1E3A5F' },
            { label: 'L4 — prospective real-world validation', value: 4, color: '#C26A3D' },
            { label: 'L5 — multi-centre studies, standards-setting', value: 5, color: '#2e7d32' }
          ], max: 5 }
        }, max: 5
      },
      { kind: 'text', eyebrow: 'Slide 8 of 10 — Service-line vs system', title: 'Radiology can be Level 4 inside a Level 2 hospital', body: 'HAIRA can be scored at the system level or the service-line level. The authors expect heterogeneity — a well-resourced department inside a resource-constrained system is a real pattern. The service-line score does not promote the system score. This is an honest, operationally useful feature.' },
      { kind: 'text', eyebrow: 'Slide 9 of 10 — What HAIRA is not', title: 'A derivation, not an evaluation', body: 'HAIRA is not empirically validated yet. Governance frameworks in this literature are almost entirely conceptual — Hussein et al. explicitly flag this as a critical gap and call for rapid, electronic RCTs of governance interventions. No such trial has yet been published. The honest reading is that HAIRA is a well-constructed hypothesis, not a proven intervention.' },
      { kind: 'headline', eyebrow: 'Slide 10 of 10 — The point', title: 'Pretending to be Level 4 because your vendor says so is worse than being Level 2', body: 'HAIRA’s quiet contribution is permission. It lets a Malaysian community hospital credibly say: we operate at Level 2, this is what Level 3 would require of us, and this is what we should not claim to do yet. That clarity is more valuable than a better algorithm.' }
    ],

    paper: {
      glossary: {
        'HAIRA': 'Healthcare AI Governance Readiness Assessment. A five-level (L1–L5) maturity model introduced in this paper, with benchmarks across seven governance domains, scorable at the health-system or service-line level.',
        'maturity model': 'A staged framework for assessing organisational capability, where each level represents a bundle of people, process, and infrastructure rather than a single score. Earlier examples in healthcare IT include the HIMSS EMR Adoption Model.',
        'minimum-domain rule': 'HAIRA’s scoring rule: overall level equals the highest level for which every one of the seven domains meets that level’s minimum standard. One weak domain caps the whole score. No additive averaging is permitted.',
        'PRISMA 2020': 'The Preferred Reporting Items for Systematic Reviews and Meta-Analyses, 2020 revision. The reporting standard for systematic reviews, including a standardised flow diagram of identification, screening, and inclusion.',
        'AACODS': 'Authority, Accuracy, Coverage, Objectivity, Date, Significance. The checklist used to appraise grey literature (here, CHAI and NIST) when peer-review-based quality tools are not applicable.',
        'grey literature': 'Material not published through traditional peer-reviewed journals — reports, standards documents, regulatory guidance.',
        'SALIENT': 'A published AI implementation framework focused on detailed, stage-specific guidance for the AI lifecycle. Comprehensive but resource-intensive to implement in full.',
        'OPTICA': 'Another framework identified in this review as among the most comprehensive — touching every phase of the AI lifecycle. Cited as an example of a tool that assumes advanced organisational resources.',
        'NIST AI RMF': 'The US National Institute of Standards and Technology’s AI Risk Management Framework. Structured around four functions: govern, map, measure, manage. Included as grey literature in this review.',
        'FDA SaMD': 'Food and Drug Administration’s regulatory category for Software as a Medical Device, including AI/ML-based clinical decision tools.',
        'EU AI Act': 'European Union regulation creating tiered obligations for AI systems based on risk, with specific provisions for high-risk medical AI including bias mitigation and data quality requirements.',
        'Chief AI Officer': 'An emerging executive-level role responsible for AI strategy and governance coordination. HAIRA Level 4 assumes this role exists or an equivalent.',
        'service-line': 'A subunit of a hospital — e.g., radiology, cardiology — that may have its own resources, AI exposure, and governance maturity distinct from the overall system.',
        'weakest-link rule': 'Plain-English name for the minimum-domain rule. Same mechanism: the lowest-scoring domain determines the overall score.',
        'Algorithm Change Protocol': 'An FDA concept for continuously-updating AI/ML medical devices: the device submits, in advance, a defined plan for how it will retrain and be re-evaluated, rather than re-seeking approval after each update.'
      },
      marginNotes: {
        'abstract-scope': 'What this sentence actually claims: HAIRA is derived from a systematic review of 35 frameworks (29 peer-reviewed + 2 grey literature in the final synthesis). It is not a trial, has no implementation data, and is offered as a structured hypothesis for the field to test.',
        'results-coverage': 'What this sentence actually claims: organisational structure (9/29) and external algorithm evaluation (11/29) are the most neglected domains in the published literature. HAIRA is deliberately built to force attention onto them via the minimum-domain rule.',
        'discussion-no-rcts': 'What this sentence actually claims: the field has no RCT evidence that any AI governance framework produces better outcomes than ad-hoc governance. That includes HAIRA itself. The authors are transparent about this and explicitly call for rapid, electronically-conducted trials of governance interventions.'
      },
      sections: [
        {
          heading: 'Abstract',
          paragraphs: [
            { id: 'abstract-setup', text: ['Artificial Intelligence (AI) deployment in healthcare is accelerating, yet governance frameworks remain fragmented and often assume extensive resources. Through a systematic review of 35 frameworks for AI implementation in healthcare (published 2019–2024), we identified seven critical domains of healthcare AI governance.'] },
            { id: 'abstract-scope', marginNote: 'abstract-scope', text: [
              'While existing frameworks provide valuable guidance, the resource requirements create barriers for smaller healthcare organisations. To address this gap, we organised key findings from the review to create the ',
              { term: 'HAIRA', text: 'Healthcare AI Governance Readiness Assessment (HAIRA)' },
              ', a five-level ',
              { term: 'maturity model', text: 'maturity model' },
              ' that provides actionable governance pathways based on organisational resources.'
            ] },
            { id: 'abstract-levels', text: [
              'HAIRA spans from Level 1 (Initial/Ad Hoc) to Level 5 (Leading), with specific benchmarks across all seven governance domains. Placement uses a ',
              { term: 'minimum-domain rule', text: 'minimum-domain rule' },
              ' — the overall level is capped by the weakest domain. This tiered approach enables healthcare organisations to assess their current AI governance capabilities and establish appropriate advancement targets, including adaptive governance strategies for systems of varying resource levels.'
            ] }
          ]
        },
        {
          heading: 'Methods — systematic review',
          paragraphs: [
            { id: 'methods-search', text: [
              'We followed ',
              { term: 'PRISMA 2020', text: 'PRISMA 2020' },
              ' guidelines. PubMed/Medline was searched in English for 2019–2024 publications using: ("Artificial Intelligence" [MeSH] OR "AI") AND ("Delivery of Health Care" [MeSH]) AND (framework OR governance OR checklist OR guideline). Search run April 13, 2025. Two peer-reviewed frameworks not captured by indexing (FURM and OPTICA) were added manually, and two ',
              { term: 'grey literature', text: 'grey literature' },
              ' sources (CHAI and NIST) were included after appraisal with ',
              { term: 'AACODS', text: 'AACODS' },
              '.'
            ] },
            { id: 'methods-flow', text: ['Flow: 2,351 articles identified → 2,110 after deduplication → 260 after journal-scope filtering → 29 included in the final synthesis (comprising peer-reviewed frameworks plus the two manually included and the two grey-literature additions).'] }
          ]
        },
        {
          heading: 'Results — seven domains, uneven coverage',
          paragraphs: [
            { id: 'results-domains', text: ['Inductive coding produced seven governance domains: (1) organisational structure; (2) problem formulation; (3) external algorithm evaluation; (4) algorithm development and model training; (5) model evaluation; (6) deployment and integration; (7) monitoring and maintenance.'] },
            { id: 'results-coverage', marginNote: 'results-coverage', text: [
              'Coverage across the 29 included frameworks was uneven. Monitoring, problem formulation, and algorithm development were the most frequently addressed. Organisational structure and external algorithm evaluation were the least — a pattern that directly motivates HAIRA’s ',
              { term: 'weakest-link rule', text: 'weakest-link rule' },
              ', which refuses to let strong coverage in a popular domain substitute for weakness in a neglected one.'
            ] }
          ]
        },
        {
          heading: 'HAIRA — the maturity model',
          paragraphs: [
            { id: 'haira-levels', text: ['HAIRA has five levels. Level 1 (Initial/Ad Hoc): reactive, vendor-dependent, no formal governance body. Level 2 (Defined): documented processes, basic IT + clinical oversight committee, structured vendor selection. Level 3 (Established): multidisciplinary committee, internal validation including bias testing, enterprise data warehouse, dedicated AI deployment staff. Level 4 (Advanced): executive-level AI officer, ethics committee, prospective real-world validation, advanced computing infrastructure. Level 5 (Leading): centre of excellence, setting industry evaluation standards, pioneering novel applications.'] },
            { id: 'haira-rule', text: [
              'Scoring uses the ',
              { term: 'minimum-domain rule', text: 'minimum-domain rule' },
              ': overall level equals the highest level for which every domain meets that level’s floor. HAIRA may be applied at the system or the ',
              { term: 'service-line', text: 'service-line' },
              ' level; heterogeneity is expected and named (e.g., a Level 4 radiology programme inside a Level 2 hospital). Service-line maturity does not promote system maturity.'
            ] }
          ]
        },
        {
          heading: 'Discussion — what HAIRA is, and isn’t',
          paragraphs: [
            { id: 'discussion-gap', text: [
              'Comprehensive frameworks exist (SALIENT, OPTICA, HEAAL, the ',
              { term: 'NIST AI RMF', text: 'NIST AI RMF' },
              ') but assume in-house data science, AI ethics committees, and research partnerships. Most community and regional health systems do not have these. HAIRA is explicitly designed to let such systems credibly assess current state, identify the specific domain gap that is capping their overall level, and plan advancement without pretending to operate at a level their resources cannot sustain.'
            ] },
            { id: 'discussion-no-rcts', marginNote: 'discussion-no-rcts', text: ['A significant limitation, named by the authors: the empirical evidence base for AI governance frameworks in healthcare is almost entirely absent. No published RCT has evaluated whether any framework — HAIRA included — produces better patient outcomes, safer deployments, or earlier detection of model drift than ad-hoc practice. The authors call for rapid, electronically-conducted trials of governance interventions. Until those exist, HAIRA is a structured, defensible hypothesis, not a proven intervention.'] },
            { id: 'discussion-role', text: [
              'Two emerging trends complement HAIRA. First, the ',
              { term: 'Chief AI Officer', text: 'Chief AI Officer' },
              ' role is spreading, mirroring the earlier emergence of CMIOs. HAIRA Level 4 assumes this role or equivalent authority exists. Second, regulatory scaffolding — the ',
              { term: 'FDA SaMD', text: 'FDA SaMD' },
              ' framework, the ',
              { term: 'EU AI Act', text: 'EU AI Act' },
              ', and ',
              { term: 'Algorithm Change Protocol', text: 'Algorithm Change Protocols' },
              ' for continuously-updating tools — is beginning to set the minimum floor from outside the organisation, even for Level 1 systems.'
            ] }
          ]
        }
      ]
    },

    governance: {
      intro: 'HAIRA is itself a governance framework, so this governance layer asks the harder meta-question: how should a specific institution — not a Stanford or a Mass General, but a state hospital in Selangor or a district hospital in Sabah — actually apply HAIRA.',
      cards: [
        {
          id: 'haira-for-malaysian-moh',
          title: 'Should the Malaysian Ministry of Health adopt HAIRA as a national AI governance maturity benchmark?',
          context: 'A MOH AI working group is deciding whether to adopt HAIRA as the formal maturity benchmark for public hospitals deploying AI, replacing the current ad-hoc vendor-by-vendor approval process.',
          lenses: [
            { lens: 'Institutional policy', body: 'Adopting HAIRA nationally gives every hospital the same vocabulary and the same minimum-domain rule. The risk is premature uniformity — HAIRA’s Level 3 floor includes an enterprise data warehouse and a dedicated data science team, infrastructure most state hospitals do not yet have. A staged adoption (Level 1–2 as mandatory, Level 3+ as aspirational with MOH funding) would protect against a policy that all public hospitals would immediately fail.' },
            { lens: 'Regulatory', body: 'HAIRA is descriptive, not regulatory. Adopting it would require pairing with statutory force — MOH Circular or amendment to the Medical Device Authority (MDA) rules — and a defined reporting cadence. The EU AI Act and FDA SaMD pathway offer regulatory floors HAIRA does not replicate; Malaysia would need to decide whether HAIRA supplements or is supplemented by an MDA-led medical-device route.' },
            { lens: 'Ethics', body: 'HAIRA’s weakest-link rule is ethically useful: it stops a hospital from claiming governance maturity because one flashy radiology AI works well while monitoring across the hospital is absent. It also introduces a risk: a hospital judged "Level 1" may be publicly pressured to claim higher levels than it can sustain. Self-assessment with no audit creates incentive for inflation. The honest path is external auditing, which is itself a Level 3+ capability.' },
            { lens: 'Equity', body: 'Malaysia’s public healthcare system is geographically uneven — Klang Valley teaching hospitals cluster at Level 3+, rural state hospitals operate at Level 1. A national HAIRA policy that mandates Level 3 deployment standards effectively restricts AI to well-resourced sites, which is the opposite of the digital-health equity case. If HAIRA is adopted, it must be paired with targeted capacity-building investment — not used as a gatekeeper.' }
          ],
          prompt: 'If MOH adopts HAIRA and a rural state hospital self-assesses at Level 1 but is under pressure to adopt a sepsis-prediction AI marketed by a Klang Valley vendor, what is the right decision: block deployment (equity cost), allow with conditions (governance risk), or fund Level 2 uplift first (timeline cost)?'
        },
        {
          id: 'service-line-vs-system',
          title: 'When a service line is ahead of the hospital, which level do we publish?',
          context: 'A 600-bed Malaysian tertiary hospital has a mature radiology AI programme (HAIRA Level 4 equivalent). The rest of the hospital has no AI governance body. A journal asks the hospital to self-report its HAIRA level for a case study.',
          lenses: [
            { lens: 'Institutional policy', body: 'HAIRA explicitly permits service-line scoring, and explicitly says service-line maturity does not promote system maturity. Policy-wise the answer is clean: report both. Report radiology at Level 4 and the system at Level 1 or 2. The temptation is to report the flattering number, but doing so violates the weakest-link rule HAIRA is built on.' },
            { lens: 'Regulatory', body: 'If HAIRA is used in regulatory filings (e.g., MDA submission, EU AI Act conformity assessment), a single-number self-report is actively misleading. Any regulatory use of HAIRA should require the domain-by-domain breakdown, not just the final level.' },
            { lens: 'Ethics', body: 'Publishing a higher number than the weakest-link rule supports is a form of institutional dishonesty — the same kind HAIRA’s rule was designed to prevent at the domain level. It creates false confidence for downstream users.' },
            { lens: 'Equity', body: 'Service-line scoring has an equity dimension: well-resourced departments pull ahead while primary-care-adjacent service lines lag. A hospital that publishes only its best service-line score creates an illusion of maturity that obscures where AI governance is actually weakest — which is typically where the patients are most vulnerable.' }
          ],
          prompt: 'If the hospital publishes "Radiology L4, system L1" honestly, and loses a vendor tender to a hospital reporting "L4" using the radiology score alone, is HAIRA still working as intended — or has honest reporting become a competitive disadvantage?'
        },
        {
          id: 'haira-without-rct-evidence',
          title: 'Should a regulator mandate a framework whose effectiveness has no RCT evidence?',
          context: 'A health technology assessment (HTA) body is asked whether HAIRA should be a required element in AI procurement. HAIRA is a conceptual framework; no RCT has demonstrated that it improves patient outcomes or reduces AI-related harm compared to ad-hoc governance.',
          lenses: [
            { lens: 'Institutional policy', body: 'Mandating an unvalidated framework is not unusual in healthcare — clinical guidelines are often based on expert consensus before definitive trial evidence. The mitigation is to mandate the structure without asserting it improves outcomes, and to pair the mandate with a prospective evaluation built in from day one.' },
            { lens: 'Regulatory', body: 'Precedent exists: FDA’s Good Machine Learning Practice is also conceptual. The defensible regulatory move is conditional adoption — HAIRA is required, and the regulator commits to sponsoring a pragmatic cluster-randomised trial across adopting institutions within a defined window.' },
            { lens: 'Ethics', body: 'Mandating an unvalidated governance framework is lower-risk than mandating an unvalidated clinical treatment — no direct patient harm from the framework itself. The ethical risk is opportunity cost: if HAIRA consumes governance resources that would otherwise go to specific high-impact controls, and HAIRA turns out not to improve outcomes, the cost is paid in displaced effort.' },
            { lens: 'Equity', body: 'The equity risk is sharpest in low-resource settings where governance capacity is the binding constraint. The equitable path is tiered compliance — full HAIRA structured assessment in well-resourced sites, simplified "Level 1 and 2 minimum" self-attestation in small sites, paired with capacity funding.' }
          ],
          prompt: 'If a regulator mandates HAIRA today and the RCT in 2029 shows it has no measurable effect on AI-related patient harm, what was the right decision in 2026 — and who is accountable for the capacity redirected into a framework that did not work?'
        }
      ]
    }
  }
```

---

## Part 3 — Commit, push, verify

```bash
git checkout claude/research-paper-app-BM2lF
git pull --ff-only origin claude/research-paper-app-BM2lF

# ... make the edits described in Parts 1 and 2 ...

git add src/data/papers.js src/reader/ComicPanel.jsx
# (or src/components/ComicPanel.jsx if that's the actual path)

git commit -m "Add two papers to ResearchPlay: MMI (Kaur 2024) and HAIRA (Hussein 2026)

Paper 1 — mmi-perceptions
- Kaur A, Singh S, Singh H. Natl Med J India 2024;37(1):46–9
- 8 comic panels, 10 slides (incl. 3-cohort toggle), 10 glossary terms,
  3 margin notes, 4 sections, 2 governance cards (Malaysia-specific)
- Six new ComicPanel SVGs: samples, rulebook, stat, compare, database, classroom

Paper 2 — haira-maturity
- Hussein et al. npj Digital Medicine 2026;9:236
- 8 comic panels, 10 slides (incl. 3-cohort toggle across expertise / body / eval),
  15 glossary terms, 3 margin notes, 5 sections, 3 governance cards
- Five new ComicPanel SVGs: funnel, wheel, ladder, chain, committee
- Reuses compare from Paper 1
- Governance layer contextualised for Malaysian MOH adoption"

git push origin claude/research-paper-app-BM2lF
```

**Local verification** — run the dev server and walk through both papers before considering this shipped.

```bash
npm install
npm run dev
# Open the Vite URL it prints (usually http://localhost:5173)
```

Check each paper:

- **MMI card** appears in the library with subtitle and authors. Open it.
  - Comic: 8 panels render, no red `ART.alert` fallback on any of them.
  - Slides: 10 slides. Slide 7 (`cohortChart`) has three toggles — *By training stage*, *By prior exposure*, *By preferred disclosure*.
  - Paper: glossary tooltips fire on italic terms (*MMI*, *Cronbach's alpha*, *hidden curriculum*, etc.). Margin notes visible on paragraphs `abstract-gap`, `results-gender`, `discussion-curriculum`.
  - Governance: two cards, each with four lenses + a prompt.

- **HAIRA card** appears in the library. Open it.
  - Comic: 8 panels render, including the four new art keys (funnel, wheel, ladder, chain, committee).
  - Slides: 10 slides. Slide 4 is a bar chart (seven bars). Slide 7 (`cohortChart`) has three toggles — *By required expertise*, *By governance body*, *By evaluation approach*.
  - Paper: 15 glossary terms work. Margin notes on `abstract-scope`, `results-coverage`, `discussion-no-rcts`.
  - Governance: three cards.

- **No console errors, no PropType warnings.**

If Netlify auto-deploys from this branch, refresh the preview URL and spot-check both papers on the live deploy.

---

## Rollback (if something goes sideways)

```bash
git revert HEAD
git push origin claude/research-paper-app-BM2lF
```

One commit, two papers — one revert takes both out cleanly.
