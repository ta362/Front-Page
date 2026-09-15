export interface FacultyMember {
  name: string;
  designation: string;
  qualification?: string;
}

export interface DepartmentFacultyGroup {
  departmentName: string;
  shortCode: string;
  aliases: string[];
  faculties: FacultyMember[];
}

export const DEPARTMENT_FACULTY_LIST: DepartmentFacultyGroup[] = [
  {
    departmentName: 'Department of Electronics & Communication Engineering',
    shortCode: 'ECE',
    aliases: [
      'ece',
      'electronics',
      'electronics and communication',
      'electronics & communication',
      'electronics and communication engineering',
      'electronics & communication engineering',
      'dept of ece',
      'department of ece',
      'department of electronics and communication engineering',
      'department of electronics & communication engineering',
    ],
    faculties: [
      {
        name: 'Mr. Dipjyoti Deb',
        designation: 'Assistant Professor & Head of Department',
        qualification: 'B.Tech, M.Tech.',
      },
      {
        name: 'Dr. Priyansha Bhowmik',
        designation: 'Associate Professor',
        qualification: 'B.Tech, M.Tech, Ph.D.',
      },
      {
        name: 'Ms. Susmita Majumder',
        designation: 'Assistant Professor',
        qualification: 'B.Tech, M.Tech, PhD(pursuing)',
      },
      {
        name: 'Mrs. Tandra Sutradhar',
        designation: 'Assistant Professor',
        qualification: 'BE, MTech.',
      },
      {
        name: 'Mr. Malay Ghata',
        designation: 'Assistant Professor',
        qualification: 'B.Tech, M.Tech.',
      },
      {
        name: 'Ms. Kaberi Saha',
        designation: 'Assistant Professor',
        qualification: 'B.Tech, M.Tech.',
      },
      {
        name: 'Mr. Sudip Deb',
        designation: 'Lecturer',
        qualification: 'B.Tech, M.Tech.',
      },
      {
        name: 'Mr. Udayan Chakraborty',
        designation: 'Assistant Professor',
        qualification: 'B.Tech, M.Tech.',
      },
      {
        name: 'Mr. Nitish Sinha',
        designation: 'Visiting Faculty',
        qualification: 'B.Tech, M.Tech.',
      },
      {
        name: 'Dr. Srikanta Das',
        designation: 'Visiting Faculty',
        qualification: 'BE, M.Tech.',
      },
      {
        name: 'Dr. Abhijit Das',
        designation: 'Visiting Faculty',
        qualification: 'B.Tech, M.Tech.',
      },
    ],
  },
  {
    departmentName: 'Department of Mechanical Engineering',
    shortCode: 'ME',
    aliases: [
      'me',
      'mech',
      'mechanical',
      'mechanical engineering',
      'dept of me',
      'dept of mech',
      'dept of mechanical',
      'department of me',
      'department of mech',
      'department of mechanical',
      'department of mechanical engineering',
    ],
    faculties: [
      {
        name: 'Dr. Pulak Sen',
        designation: 'Associate Professor & Head of the Department',
        qualification: 'B.E, M.Tech, PhD.',
      },
      {
        name: 'Dr. Shirsendu Das',
        designation: 'Associate Professor',
        qualification: 'B.E, M.Tech, PhD.',
      },
      {
        name: 'Mr. Nirupam Nath Choudhury',
        designation: 'Assistant Professor',
        qualification: 'M.Tech.',
      },
      {
        name: 'Mr. Panna Goswami',
        designation: 'Assistant Professor',
        qualification: 'B.Tech, M.Tech.',
      },
      {
        name: 'Mrs. Moutushee Debnath',
        designation: 'Assistant Professor',
        qualification: 'B.Tech, M.Tech.',
      },
      {
        name: 'Mr. Ujjal Das',
        designation: 'Assistant Professor',
        qualification: 'B.Tech, M.Tech.',
      },
      {
        name: 'Mr. Anupam Sarkar',
        designation: 'Assistant Professor',
        qualification: 'B.Tech, M.Tech.',
      },
      {
        name: 'Dr. Rahul Kanti Nath',
        designation: 'Assistant Professor',
        qualification: 'B.Tech, M.Tech, Ph.D.',
      },
      {
        name: 'Mr. Sourav Hossain',
        designation: 'Lecturer',
        qualification: 'B.Tech.',
      },
      {
        name: 'Ms. Soma Debnath',
        designation: 'Lecturer',
        qualification: 'B.Tech.',
      },
      {
        name: 'Mr. Joydeep Debnath',
        designation: 'Lecturer',
        qualification: 'B.Tech.',
      },
      {
        name: 'Mr. Diptanil Dey',
        designation: 'Visiting Faculty',
        qualification: 'B.Tech.',
      },
    ],
  },
  {
    departmentName: 'Department of Electrical Engineering',
    shortCode: 'EE',
    aliases: [
      'ee',
      'elec',
      'electrical',
      'electrical engineering',
      'dept of ee',
      'dept of electrical',
      'department of ee',
      'department of electrical',
      'department of electrical engineering',
    ],
    faculties: [
      {
        name: 'Mr. Santanu Bhattacharjee',
        designation: 'Assistant Professor & Head of Department',
        qualification: 'B.Tech, M.Tech.',
      },
      {
        name: 'Dr. Debika Debnath',
        designation: 'Associate Professor',
        qualification: 'B.Tech, M.Tech, PhD.',
      },
      {
        name: 'Mr. Siddhartha Sankar Deb',
        designation: 'Assistant Professor',
        qualification: 'B.E, M.Tech.',
      },
      {
        name: 'Ms. Anindita Deb',
        designation: 'Assistant Professor',
        qualification: 'B.Tech, M.Tech.',
      },
      {
        name: 'Mrs. Susmita Paul',
        designation: 'Assistant Professor',
        qualification: 'B.Tech, M.Tech.',
      },
      {
        name: 'Mr. Partha Pratim Chakraborty',
        designation: 'Assistant Professor',
        qualification: 'B.Tech, M.Tech.',
      },
      {
        name: 'Mr. Animesh Roy',
        designation: 'Assistant Professor',
        qualification: 'B.Tech, M.Tech.',
      },
      {
        name: 'Mr. Tushar Kanti Das',
        designation: 'Assistant Professor',
        qualification: 'B.E, M.Tech.',
      },
      {
        name: 'Mr. Sudipta Biswas',
        designation: 'Visiting Faculty',
        qualification: 'B.Tech.',
      },
      {
        name: 'Dr. Pragnaleena Debroy',
        designation: 'Visiting Faculty',
        qualification: 'B.Tech, M.Tech, Ph.D.',
      },
      {
        name: 'Ms. Swagata Datta',
        designation: 'Visiting Faculty',
        qualification: 'B.Tech, M.Tech.',
      },
      {
        name: 'Mr. Nishankar Debnath',
        designation: 'Visiting Faculty',
        qualification: 'B.Tech, M.Tech.',
      },
    ],
  },
  {
    departmentName: 'Department of Computer Science & Engineering',
    shortCode: 'CSE',
    aliases: [
      'cse',
      'cs',
      'computer',
      'computer science',
      'computer science & engineering',
      'computer science and engineering',
      'dept of cse',
      'dept of computer science',
      'department of cse',
      'department of computer science',
      'department of computer science and engineering',
      'department of computer science & engineering',
    ],
    faculties: [
      {
        name: 'Mrs. Purbani Kar',
        designation: 'Assistant Professor & Head of Department (CSE)',
        qualification: 'B.E, M.Tech.',
      },
      {
        name: 'Dr. Partha Pratim Deb',
        designation: 'Associate Professor',
        qualification: 'B.Tech, M.Tech, PhD.',
      },
      {
        name: 'Dr. Tutan Nama',
        designation: 'Associate Professor',
        qualification: 'B.E, M.Tech, PhD.',
      },
      {
        name: 'Dr. Arpita Banik',
        designation: 'Associate Professor',
        qualification: 'B.E, M.Tech, PhD.',
      },
      {
        name: 'Dr. Barnali Chowdhury',
        designation: 'Associate Professor',
        qualification: 'B.E, M.Tech, PhD.',
      },
      {
        name: 'Dr. Joy Lal Sarkar',
        designation: 'Associate Professor',
        qualification: 'B.Sc(Physics), MCA, M.Tech, PhD, PostDoc',
      },
      {
        name: 'Mr. Sankha Subhra Debnath',
        designation: 'Assistant Professor',
        qualification: 'B.Tech, M.Tech.',
      },
      {
        name: 'Mr. Kankan Saha',
        designation: 'Assistant Professor',
        qualification: 'B.Tech, M.Tech.',
      },
      {
        name: 'Mrs. Sarmistha Das',
        designation: 'Assistant Professor',
        qualification: 'B.Tech, M.Tech.',
      },
      {
        name: 'Ms. Nabanita Shil',
        designation: 'Assistant Professor',
        qualification: 'B.Tech, M.Tech.',
      },
      {
        name: 'Mr. Biswaraj Roy',
        designation: 'Assistant Professor',
        qualification: 'B.Tech, M.Tech.',
      },
      {
        name: 'Mr. Jayanta Das',
        designation: 'Assistant Professor',
        qualification: 'B.Tech, M.Tech.',
      },
      {
        name: 'Mrs. Rajna Saha',
        designation: 'Assistant Professor',
        qualification: 'B.E, M.Tech.',
      },
      {
        name: 'Mrs. Shriya Chakraborty',
        designation: 'Assistant Professor',
        qualification: 'B.Tech, M.Tech.',
      },
      {
        name: 'Ms. Sourabarna Roy',
        designation: 'Assistant Professor',
        qualification: 'B.Tech, M.Tech.',
      },
      {
        name: 'Mr. Sourav Deb',
        designation: 'Lecturer',
        qualification: 'B.Tech.',
      },
      {
        name: 'Mr. Prasenjit Das',
        designation: 'Lecturer',
        qualification: 'B.Tech.',
      },
      {
        name: 'Mr. Rahul Karmakar',
        designation: 'Lecturer',
        qualification: 'B.Tech.',
      },
      {
        name: 'Mr. Bishal Debnath',
        designation: 'Lecturer',
        qualification: 'B.Tech.',
      },
      {
        name: 'Ms. Ankita Bhattacharjee',
        designation: 'Visiting Faculty',
        qualification: 'B.Tech.',
      },
    ],
  },
  {
    departmentName: 'Department of Civil Engineering',
    shortCode: 'CE',
    aliases: [
      'ce',
      'civil',
      'civil-engineering',
      'civil engineering',
      'dept of ce',
      'dept of civil',
      'dept of civil engineering',
      'department of ce',
      'department of civil',
      'department of civil engineering',
    ],
    faculties: [
      {
        name: 'Dr. Avik Paul',
        designation: 'Associate Professor & Head of the Department',
        qualification: 'B.Tech, M.Tech, Ph.D.',
      },
      {
        name: 'Dr. Arpan Laskar',
        designation: 'Associate Professor, IQAC coordinator',
        qualification: 'B.E, M.Tech, Ph.D.',
      },
      {
        name: 'Dr. Rupali Roy',
        designation: 'Associate Professor',
        qualification: 'B.Tech, M.Tech, Ph.D.',
      },
      {
        name: 'Dr. Mithun Ghosh',
        designation: 'Associate Professor',
        qualification: 'BE, M.Tech., Ph.D.',
      },
      {
        name: 'Mr. Suman Paul',
        designation: 'Assistant Professor',
        qualification: 'BE, M.Tech.',
      },
      {
        name: 'Mr. Deep Chakraborty',
        designation: 'Assistant Professor',
        qualification: 'B.E, M.Tech.',
      },
      {
        name: 'Mrs. Srila Dey',
        designation: 'Assistant Professor',
        qualification: 'BE, M.Tech.',
      },
      {
        name: 'Mr. Rahul Ghosh',
        designation: 'Assistant Professor',
        qualification: 'B.Tech, M.Tech.',
      },
      {
        name: 'Dr. Bibek Saha',
        designation: 'Assistant Professor',
        qualification: 'B.Tech, M.Tech, PhD.',
      },
      {
        name: 'Dr. Akash Datta',
        designation: 'Assistant Professor',
        qualification: 'B.Tech, M.Tech, PhD.',
      },
      {
        name: 'Mr. Diptanu Shil',
        designation: 'Lecturer',
        qualification: 'B.Tech.',
      },
    ],
  },
  {
    departmentName: 'Department of Basic Science & Humanities',
    shortCode: 'BSH',
    aliases: [
      'bsh',
      'bs&h',
      'bsh & humanities',
      'basic science',
      'basic sciences',
      'humanities',
      'basic-science-and-humanities',
      'basic science and humanities',
      'basic science & humanities',
      'dept of bsh',
      'dept of basic science and humanities',
      'dept of basic science & humanities',
      'department of bsh',
      'department of basic science and humanities',
      'department of basic science & humanities',
    ],
    faculties: [
      {
        name: 'Dr. Dibyendu Dey',
        designation: 'Assistant Professor & Head of the Department',
        qualification: 'B.Sc, M.Sc, PhD.',
      },
      {
        name: 'Dr. Priyanka Majumder',
        designation: 'Associate Professor',
        qualification: 'B.Sc, M.Sc, PhD.',
      },
      {
        name: 'Dr. Sekhar Chakraborty',
        designation: 'Associate Professor',
        qualification: 'B.Sc, M.Sc, PhD.',
      },
      {
        name: 'Dr. Arnab Paul',
        designation: 'Associate Professor',
        qualification: 'B.Sc, M.Sc, PhD.',
      },
      {
        name: 'Dr. Susmita Paul',
        designation: 'Assistant Professor',
        qualification: 'B.Sc, M.Sc, PhD.',
      },
      {
        name: 'Dr. Mitu Saha',
        designation: 'Assistant Professor',
        qualification: 'B.Sc, M.Sc, PhD.',
      },
      {
        name: 'Mrs. Puspanjali Debnath',
        designation: 'Assistant Professor',
        qualification: 'BBA, MBA.',
      },
      {
        name: 'Mr. Sayan Saha',
        designation: 'Assistant Professor',
        qualification: 'BA, MA.',
      },
      {
        name: 'Mrs. Nabanita Mitra',
        designation: 'Assistant Professor',
        qualification: 'B.A, M.A.',
      },
      {
        name: 'Ms. Tanushree Naha',
        designation: 'Assistant Professor',
        qualification: 'B.Com, MBA.',
      },
      {
        name: 'Dr. Sanjit Debnath',
        designation: 'Assistant Professor',
        qualification: 'B.Sc, M.Sc, PhD.',
      },
      {
        name: 'Dr. Barnali Das',
        designation: 'Lecturer',
        qualification: 'B.Sc, M.Sc, PhD.',
      },
      {
        name: 'Eka Majumder',
        designation: 'Technical Assistant',
      },
    ],
  },
  {
    departmentName: 'Department of Electronics & Computer Science Engineering',
    shortCode: 'ECSE',
    aliases: [
      'ecse',
      'electronics & computer science',
      'electronics and computer science',
      'electronics & computer science engineering',
      'electronics and computer science engineering',
      'dept of ecse',
      'department of ecse',
      'department of electronics and computer science engineering',
      'department of electronics & computer science engineering',
    ],
    faculties: [
      {
        name: 'Faculty Member',
        designation: 'Assistant Professor & Head of Department',
        qualification: 'B.Tech, M.Tech, Ph.D.',
      },
      {
        name: 'Faculty Member',
        designation: 'Assistant Professor',
        qualification: 'B.Tech, M.Tech.',
      },
    ],
  },
  {
    departmentName: 'Department of Artificial Intelligence & Data Science',
    shortCode: 'AIDS',
    aliases: [
      'aids',
      'ai & ds',
      'ai and ds',
      'artificial intelligence',
      'data science',
      'artificial intelligence and data science',
      'artificial intelligence & data science',
      'dept of aids',
      'dept of ai & ds',
      'department of aids',
      'department of ai & ds',
      'department of artificial intelligence & data science',
      'department of artificial intelligence and data science',
    ],
    faculties: [
      {
        name: 'Faculty Member',
        designation: 'Assistant Professor & Head of Department',
        qualification: 'B.Tech, M.Tech, Ph.D.',
      },
      {
        name: 'Faculty Member',
        designation: 'Assistant Professor',
        qualification: 'B.Tech, M.Tech.',
      },
    ],
  },
];

/**
 * Finds matching department group by name or alias
 */
export function getFacultyGroupForDepartment(deptQuery: string): DepartmentFacultyGroup | undefined {
  if (!deptQuery || !deptQuery.trim()) return undefined;
  const raw = deptQuery.trim().toLowerCase();
  const clean = raw.replace(/[^a-z0-9]/g, ' ').replace(/\s+/g, ' ').trim();
  const words = clean.split(' ');

  // 1. Exact match on shortCode (e.g. 'me', 'ece')
  const codeMatch = DEPARTMENT_FACULTY_LIST.find(
    (g) => g.shortCode.toLowerCase() === raw || words.includes(g.shortCode.toLowerCase())
  );
  if (codeMatch) return codeMatch;

  // 2. Exact match on aliases
  const aliasMatch = DEPARTMENT_FACULTY_LIST.find((g) =>
    g.aliases.some((a) => a.toLowerCase() === raw || clean === a.toLowerCase())
  );
  if (aliasMatch) return aliasMatch;

  // 3. Partial or substring match in aliases or full department name
  return DEPARTMENT_FACULTY_LIST.find((group) => {
    const deptNorm = group.departmentName.toLowerCase();
    if (deptNorm.includes(raw) || raw.includes(deptNorm)) return true;
    return group.aliases.some((alias) => {
      const a = alias.toLowerCase();
      return clean.includes(a) || words.includes(a);
    });
  });
}
