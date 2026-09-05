import { CoverPageFormData } from '../types';

// Techno College of Engineering Agartala (TCEA) - Official Emblem Image
export const TCEA_LOGO_SVG = '/tcea_emblem.jpg';

export const DEFAULT_ACADEMIC_LOGO_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e3a8a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0f172a;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#fbbf24;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#d97706;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Outer Crest Shield -->
  <path d="M 100 15 C 150 15 175 35 175 80 C 175 140 100 185 100 185 C 100 185 25 140 25 80 C 25 35 50 15 100 15 Z" 
        fill="url(#grad1)" stroke="url(#gold)" stroke-width="5" />
        
  <!-- Inner Shield Border -->
  <path d="M 100 25 C 142 25 163 42 163 80 C 163 130 100 170 100 170 C 100 170 37 130 37 80 C 37 42 58 25 100 25 Z" 
        fill="none" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="3,3" opacity="0.6"/>

  <!-- Academic Book at base -->
  <path d="M 65 125 Q 100 115 100 135 Q 100 115 135 125 L 135 145 Q 100 135 100 150 Q 100 135 65 145 Z" 
        fill="#f8fafc" stroke="#d97706" stroke-width="2" />
        
  <!-- Academic Torch of Knowledge in center -->
  <path d="M 95 65 L 105 65 L 103 105 L 97 105 Z" fill="url(#gold)" />
  <path d="M 91 65 L 109 65 L 105 58 L 95 58 Z" fill="#d97706" />
  
  <!-- Torch Flame -->
  <path d="M 100 35 Q 112 48 100 58 Q 88 48 100 35 Z" fill="#ef4444" />
  <path d="M 100 42 Q 107 50 100 56 Q 93 50 100 42 Z" fill="#f59e0b" />

  <!-- Stars -->
  <polygon points="60,65 63,73 71,73 65,78 67,86 60,81 53,86 55,78 49,73 57,73" fill="url(#gold)" />
  <polygon points="140,65 143,73 151,73 145,78 147,86 140,81 133,86 135,78 129,73 137,73" fill="url(#gold)" />
</svg>
`)}`;

export const TECH_INSTITUTE_LOGO_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="techBlue" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0284c7;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0f172a;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#38bdf8;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0284c7;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Outer Cogwheel / Hexagon -->
  <circle cx="100" cy="100" r="80" fill="url(#techBlue)" stroke="#38bdf8" stroke-width="4" />
  <circle cx="100" cy="100" r="68" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="4,3" opacity="0.7" />

  <!-- Atomic Orbits & Science Symbol -->
  <ellipse cx="100" cy="100" rx="45" ry="16" fill="none" stroke="#38bdf8" stroke-width="2.5" transform="rotate(30 100 100)" />
  <ellipse cx="100" cy="100" rx="45" ry="16" fill="none" stroke="#38bdf8" stroke-width="2.5" transform="rotate(-30 100 100)" />
  <ellipse cx="100" cy="100" rx="45" ry="16" fill="none" stroke="#38bdf8" stroke-width="2.5" transform="rotate(90 100 100)" />
  
  <!-- Center Nucleus -->
  <circle cx="100" cy="100" r="10" fill="#f8fafc" stroke="#0284c7" stroke-width="2" />
  <circle cx="100" cy="100" r="4" fill="#38bdf8" />
  
  <!-- Electrons -->
  <circle cx="62" cy="78" r="3.5" fill="#f8fafc" />
  <circle cx="138" cy="122" r="3.5" fill="#f8fafc" />
  <circle cx="100" cy="55" r="3.5" fill="#f8fafc" />
</svg>
`)}`;

export const MEDICAL_INSTITUTE_LOGO_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="medGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#059669;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#064e3b;stop-opacity:1" />
    </linearGradient>
  </defs>

  <circle cx="100" cy="100" r="82" fill="url(#medGrad)" stroke="#34d399" stroke-width="4" />
  <circle cx="100" cy="100" r="70" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="4,3" opacity="0.6" />

  <!-- Caduceus / Rod of Asclepius & Red/Green Cross -->
  <rect x="86" y="55" width="28" height="90" rx="6" fill="#ffffff" />
  <rect x="55" y="86" width="90" height="28" rx="6" fill="#ffffff" />

  <path d="M 97 45 L 103 45 L 103 155 L 97 155 Z" fill="#047857" />
  <circle cx="100" cy="42" r="7" fill="#fbbf24" stroke="#047857" stroke-width="1.5" />
  
  <!-- Serpent winding -->
  <path d="M 100 60 C 118 70 118 85 100 95 C 82 105 82 120 100 130 C 112 136 112 145 100 150" 
        fill="none" stroke="#fbbf24" stroke-width="3.5" stroke-linecap="round" />
</svg>
`)}`;

export interface PresetItem {
  name: string;
  subtitle: string;
  icon: string;
  data: Partial<CoverPageFormData>;
}

export const SAMPLE_PRESETS: PresetItem[] = [
  {
    name: 'Techno College of Engineering Agartala (TCEA)',
    subtitle: 'Electronics & Communication Eng. Lab Format',
    icon: '🔴',
    data: {
      college: 'Techno College of Engineering Agartala',
      course: 'Microwave and Fiber Optic Communication Lab',
      courseCode: 'PC EC 605',
      submissionType: 'Lab Copy',
      teacher: 'Mr. Sudip Deb',
      designation: 'Assistant Professor',
      department: 'Department of Electronics & Communication Engineering',
      student: 'TANMOY DAS',
      studentId: '24304033011',
      roll: '2467030082',
      reg: '003732',
      semester: 'B.Tech. 6th Sem',
      session: '2026-27',
      logoUrl: TCEA_LOGO_SVG,
      logoSize: 155,
      borderStyle: 'classic-double',
      fontTheme: 'times',
      showWatermark: false,
    },
  },
  {
    name: 'Computer Science & Engineering Department',
    subtitle: 'Algorithms & Data Structures Assignment',
    icon: '💻',
    data: {
      college: 'Techno College of Engineering Agartala',
      course: 'Data Structures & Algorithms Laboratory',
      courseCode: 'PCC-CS301',
      submissionType: 'Assignment',
      teacher: 'Dr. Debabrata Roy, Ph.D.',
      designation: 'Associate Professor & HOD',
      department: 'Department of Computer Science & Engineering',
      student: 'TANMOY DAS',
      studentId: '24304033011',
      roll: '2467030082',
      reg: '003732',
      semester: 'B.Tech. 6th Sem',
      session: '2026-27',
      logoUrl: TCEA_LOGO_SVG,
      logoSize: 155,
      borderStyle: 'classic-double',
      fontTheme: 'times',
      showWatermark: false,
    },
  },
  {
    name: 'Electrical Engineering Department',
    subtitle: 'Power Systems & Control Lab Project',
    icon: '⚡',
    data: {
      college: 'Techno College of Engineering Agartala',
      course: 'Power Systems & Control Engineering',
      courseCode: 'EE-502',
      submissionType: 'Project Report',
      teacher: 'Prof. Subhash Chandra Saha',
      designation: 'Professor',
      department: 'Department of Electrical Engineering',
      student: 'TANMOY DAS',
      studentId: '24304033011',
      roll: '2467030082',
      reg: '003732',
      semester: 'B.Tech. 6th Sem',
      session: '2026-27',
      logoUrl: TCEA_LOGO_SVG,
      logoSize: 155,
      borderStyle: 'classic-double',
      fontTheme: 'times',
      showWatermark: false,
    },
  },
];

export const INITIAL_FORM_DATA: CoverPageFormData = {
  college: 'Techno College of Engineering Agartala',
  course: 'Microwave and Fiber Optic Communication Lab',
  courseCode: 'PC EC 605',
  submissionType: 'Assignment',
  teacher: 'Mr. Sudip Deb',
  designation: 'Assistant Professor',
  department: 'Department of Electronics & Communication Engineering',
  student: 'TANMOY DAS',
  studentId: '24304033011',
  roll: '2467030082',
  reg: '003732',
  semester: 'B.Tech. 6th Sem',
  session: '2026-27',
  date: new Date().toISOString().split('T')[0],
  logoUrl: TCEA_LOGO_SVG,
  logoSize: 155,
  borderStyle: 'classic-double',
  showWatermark: false,
  fontTheme: 'times',
  accentColor: '#dc2626',
  layoutMode: 'side-by-side',
};
