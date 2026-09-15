export interface CourseMapping {
  title: string;
  code: string;
  department?: string;
  semester?: number | string;
  degree?: string;
  scheme?: string;
}

// Local Storage Key for User Imported Syllabus Items
const CUSTOM_SYLLABUS_KEY = 'tcea_custom_syllabus_courses';

export function getCustomSyllabusCourses(): CourseMapping[] {
  try {
    const saved = localStorage.getItem(CUSTOM_SYLLABUS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function saveCustomSyllabusCourses(courses: CourseMapping[]) {
  try {
    const existing = getCustomSyllabusCourses();
    const combined = [...courses, ...existing];
    // deduplicate by title and code
    const unique = combined.filter((c, i, self) =>
      i === self.findIndex((t) => t.title.toLowerCase() === c.title.toLowerCase() && t.code.toLowerCase() === c.code.toLowerCase())
    );
    localStorage.setItem(CUSTOM_SYLLABUS_KEY, JSON.stringify(unique));
  } catch (err) {
    console.error('Failed to save custom syllabus courses', err);
  }
}

export const TRIPURA_UNIVERSITY_COURSES: CourseMapping[] = [
  // ==========================================
  // ECE (Electronics & Communication Engineering) - Official Tripura University 2021 Curriculum (Sem 1 to Sem 8)
  // ==========================================
  // Semester 1 & 2 (1st Year Common Foundation)
  { title: 'Mathematics - I', code: 'BS 101', department: 'ECE', semester: 1, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Physics', code: 'BS 102', department: 'ECE', semester: 1, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Basic Electrical Engineering', code: 'ES 103', department: 'ECE', semester: 1, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Engineering Graphics and Design', code: 'ES 104', department: 'ECE', semester: 1, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Physics Laboratory', code: 'BS 105', department: 'ECE', semester: 1, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Engineering Graphics Practice', code: 'ES 106', department: 'ECE', semester: 1, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Basic Electrical Engineering Laboratory', code: 'ES 107', department: 'ECE', semester: 1, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Induction Program', code: 'MC 108', department: 'ECE', semester: 1, degree: 'B.Tech', scheme: '2021 Syllabus' },

  { title: 'English', code: 'HS 201', department: 'ECE', semester: 2, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Mathematics-II', code: 'BS 202', department: 'ECE', semester: 2, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Chemistry', code: 'BS 203', department: 'ECE', semester: 2, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Programming for Problem Solving', code: 'ES 204', department: 'ECE', semester: 2, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Manufacturing Practices', code: 'ES 205', department: 'ECE', semester: 2, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Language Laboratory', code: 'HS 206', department: 'ECE', semester: 2, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Chemistry Laboratory', code: 'BS 207', department: 'ECE', semester: 2, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Programming for Problem Solving Lab', code: 'ES 208', department: 'ECE', semester: 2, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Workshop on Manufacturing Practices', code: 'ES 209', department: 'ECE', semester: 2, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Environmental Science', code: 'MC 210', department: 'ECE', semester: 2, degree: 'B.Tech', scheme: '2021 Syllabus' },

  // Semester 3
  { title: 'Effective Technical Communication', code: 'HU 301', department: 'ECE', semester: 3, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Mathematics-III', code: 'BS 302', department: 'ECE', semester: 3, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Biology for Engineers', code: 'BS 303', department: 'ECE', semester: 3, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Engineering Mechanics', code: 'ES 304', department: 'ECE', semester: 3, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Electronic Devices', code: 'PC EC 305', department: 'ECE', semester: 3, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Electronic Devices', code: 'PCEC-305', department: 'ECE', semester: 3, degree: 'B.Tech', scheme: 'CBCS Variant' },
  { title: 'Digital Electronics', code: 'PC EC 306', department: 'ECE', semester: 3, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Digital Electronics', code: 'PCEC-306', department: 'ECE', semester: 3, degree: 'B.Tech', scheme: 'CBCS Variant' },
  { title: 'Electronic Devices Lab', code: 'PC EC 307', department: 'ECE', semester: 3, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Digital Electronics Lab', code: 'PC EC 308', department: 'ECE', semester: 3, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Python Programming Lab', code: 'PC EC 309', department: 'ECE', semester: 3, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Indian Constitution', code: 'MC 310', department: 'ECE', semester: 3, degree: 'B.Tech', scheme: '2021 Syllabus' },

  // Semester 4
  { title: 'Engineering Economics and Accountancy', code: 'HU 401', department: 'ECE', semester: 4, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Universal Human Values-II: Understanding Harmony', code: 'HU 402', department: 'ECE', semester: 4, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Analog Circuits', code: 'PC EC 403', department: 'ECE', semester: 4, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Analog Circuits', code: 'PCEC-403', department: 'ECE', semester: 4, degree: 'B.Tech', scheme: 'CBCS Variant' },
  { title: 'Microprocessor & Microcontrollers', code: 'PC EC 404', department: 'ECE', semester: 4, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Microprocessor & Microcontrollers', code: 'PCEC-404', department: 'ECE', semester: 4, degree: 'B.Tech', scheme: 'CBCS Variant' },
  { title: 'Electromagnetic Theory', code: 'PC EC 405', department: 'ECE', semester: 4, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Signals and Systems', code: 'PC EC 406', department: 'ECE', semester: 4, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Signals and Systems', code: 'PCEC-406', department: 'ECE', semester: 4, degree: 'B.Tech', scheme: 'CBCS Variant' },
  { title: 'Analog Circuits Lab', code: 'PC EC 407', department: 'ECE', semester: 4, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Microcontrollers Lab', code: 'PC EC 408', department: 'ECE', semester: 4, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Basic Simulation Laboratory', code: 'PC EC 409', department: 'ECE', semester: 4, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Essence of Indian Knowledge Tradition', code: 'MC 410', department: 'ECE', semester: 4, degree: 'B.Tech', scheme: '2021 Syllabus' },

  // Semester 5
  { title: 'Professional Practice, Law and Ethics', code: 'HU 501', department: 'ECE', semester: 5, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Digital System Design', code: 'PC EC 502', department: 'ECE', semester: 5, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Control System Engineering', code: 'PC EC 503', department: 'ECE', semester: 5, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Analog and Digital Communication', code: 'PC EC 504', department: 'ECE', semester: 5, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Embedded Systems and IOT', code: 'PCEC 505', department: 'ECE', semester: 5, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Embedded Systems and IOT', code: 'PC EC 505', department: 'ECE', semester: 5, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Network Theory', code: 'PC EC 506', department: 'ECE', semester: 5, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Digital System Design Lab', code: 'PC EC 507', department: 'ECE', semester: 5, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Control System Engineering Lab', code: 'PC EC 508', department: 'ECE', semester: 5, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Analog and Digital Communication Lab', code: 'PC EC 509', department: 'ECE', semester: 5, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Industry Internship - I', code: 'SI EC 510', department: 'ECE', semester: 5, degree: 'B.Tech', scheme: '2021 Syllabus' },

  // Semester 6
  { title: 'Microwave Engineering', code: 'PC EC 601', department: 'ECE', semester: 6, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Microwave Engineering', code: 'PCEC-601', department: 'ECE', semester: 6, degree: 'B.Tech', scheme: 'CBCS Variant' },
  { title: 'Fiber Optic Communication', code: 'PCEC 602', department: 'ECE', semester: 6, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Fiber Optic Communication', code: 'PC EC 602', department: 'ECE', semester: 6, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'VLSI', code: 'PC EC 603', department: 'ECE', semester: 6, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'VLSI Design', code: 'PCEC-603', department: 'ECE', semester: 6, degree: 'B.Tech', scheme: 'CBCS Variant' },
  { title: 'Digital Signal Processing', code: 'PC EC 604', department: 'ECE', semester: 6, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Digital Signal Processing', code: 'PCEC-604', department: 'ECE', semester: 6, degree: 'B.Tech', scheme: 'CBCS Variant' },
  { title: 'Digital Signal Processing', code: 'EC-604', department: 'ECE', semester: 6, degree: 'B.Tech', scheme: 'Old Format' },
  { title: 'Microwave and Fiber Optic Communication Lab', code: 'PC EC 605', department: 'ECE', semester: 6, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'VLSI Lab', code: 'PC EC 606', department: 'ECE', semester: 6, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Digital Signal Processing Lab', code: 'PC EC 607', department: 'ECE', semester: 6, degree: 'B.Tech', scheme: '2021 Syllabus' },

  // Program Elective-1 (Semester 6)
  { title: 'Electronic Measurement and Instrumentation', code: 'PE EC 608/1', department: 'ECE', semester: 6, degree: 'B.Tech', scheme: 'Program Elective-1' },
  { title: 'Electronic Measurement and Instrumentation', code: 'PEEC 608/1', department: 'ECE', semester: 6, degree: 'B.Tech', scheme: 'Program Elective-1' },
  { title: 'Power Electronics', code: 'PEEC-608/2', department: 'ECE', semester: 6, degree: 'B.Tech', scheme: 'Program Elective-1' },
  { title: 'Bio Medical Engineering', code: 'PEEC-608/3', department: 'ECE', semester: 6, degree: 'B.Tech', scheme: 'Program Elective-1' },
  { title: 'Bio-Medical Engineering', code: 'PE EC608/3', department: 'ECE', semester: 6, degree: 'B.Tech', scheme: 'Program Elective-1' },
  { title: 'Mini Project', code: 'PR EC 609', department: 'ECE', semester: 6, degree: 'B.Tech', scheme: 'Project-1' },

  // Semester 7
  // Program Elective-2 (Semester 7)
  { title: 'Wireless and Mobile Communication', code: 'PE EC 701/1', department: 'ECE', semester: 7, degree: 'B.Tech', scheme: 'Program Elective-2' },
  { title: 'Wireless and Mobile Communication', code: 'PEEC-701/1', department: 'ECE', semester: 7, degree: 'B.Tech', scheme: 'Program Elective-2' },
  { title: 'Image Processing', code: 'PE EC 701/2', department: 'ECE', semester: 7, degree: 'B.Tech', scheme: 'Program Elective-2' },
  { title: 'Computer Networking', code: 'PE EC 701/3', department: 'ECE', semester: 7, degree: 'B.Tech', scheme: 'Program Elective-2' },

  // Program Elective-3 (Semester 7)
  { title: 'Information Theory and Coding', code: 'PE EC 702/1', department: 'ECE', semester: 7, degree: 'B.Tech', scheme: 'Program Elective-3' },
  { title: 'Audio and Video Engineering', code: 'PEEC 702/2', department: 'ECE', semester: 7, degree: 'B.Tech', scheme: 'Program Elective-3' },
  { title: 'Artificial Neural Network', code: 'PEEC 702/3', department: 'ECE', semester: 7, degree: 'B.Tech', scheme: 'Program Elective-3' },

  { title: 'Open Elective-1', code: 'OE EC 703', department: 'ECE', semester: 7, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Open Elective-2', code: 'OE EC 704', department: 'ECE', semester: 7, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Project Work Intermediate', code: 'PR EC 705', department: 'ECE', semester: 7, degree: 'B.Tech', scheme: 'Project-2' },
  { title: 'Internship - II', code: 'SI EC 706', department: 'ECE', semester: 7, degree: 'B.Tech', scheme: 'Summer Internship-2' },
  { title: 'Seminar on Contemporary Engineering Topics - I', code: 'SE EC 707', department: 'ECE', semester: 7, degree: 'B.Tech', scheme: 'Seminar-1' },

  // Semester 8
  // Program Elective-4 (Semester 8)
  { title: 'Satellite and RADAR Engineering', code: 'PE EC 801/1', department: 'ECE', semester: 8, degree: 'B.Tech', scheme: 'Program Elective-4' },
  { title: 'Nano Electronics', code: 'PE EC 801/2', department: 'ECE', semester: 8, degree: 'B.Tech', scheme: 'Program Elective-4' },
  { title: 'Fuzzy Logic and Its Applications', code: 'PE EC 801/3', department: 'ECE', semester: 8, degree: 'B.Tech', scheme: 'Program Elective-4' },

  // Program Elective-5 (Semester 8)
  { title: 'Antenna and Wave Propagation', code: 'PE EC 802/1', department: 'ECE', semester: 8, degree: 'B.Tech', scheme: 'Program Elective-5' },
  { title: 'Advanced VLSI', code: 'PE EC 802/2', department: 'ECE', semester: 8, degree: 'B.Tech', scheme: 'Program Elective-5' },
  { title: 'Introduction to Artificial Intelligence', code: 'PE EC 802/3', department: 'ECE', semester: 8, degree: 'B.Tech', scheme: 'Program Elective-5' },

  { title: 'Open Elective-3', code: 'OE EC 803', department: 'ECE', semester: 8, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Open Elective-4', code: 'OE EC 804', department: 'ECE', semester: 8, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Project Work Final', code: 'PR EC 805', department: 'ECE', semester: 8, degree: 'B.Tech', scheme: 'Project-3' },
  { title: 'Seminar on Contemporary Engineering Topics - II', code: 'SE EC 806', department: 'ECE', semester: 8, degree: 'B.Tech', scheme: 'Seminar-2' },
  { title: 'SWAYAM Courses', code: 'SW EC 807', department: 'ECE', semester: 8, degree: 'B.Tech', scheme: 'Online Course' },

  // ==========================================
  // CSE (Computer Science & Engineering) - Official 2021 Curriculum
  // ==========================================
  // Semester 1 & 2 (1st Year Common Foundation)
  { title: 'Mathematics - I', code: 'BS 101', department: 'CSE', semester: 1, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Physics', code: 'BS 102', department: 'CSE', semester: 1, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Basic Electrical Engineering', code: 'ES 103', department: 'CSE', semester: 1, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Engineering Graphics and Design', code: 'ES 104', department: 'CSE', semester: 1, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Physics Laboratory', code: 'BS 105', department: 'CSE', semester: 1, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Engineering Graphics Practice', code: 'ES 106', department: 'CSE', semester: 1, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Basic Electrical Engineering Laboratory', code: 'ES 107', department: 'CSE', semester: 1, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Induction Program', code: 'MC 108', department: 'CSE', semester: 1, degree: 'B.Tech', scheme: '2021 Syllabus' },

  { title: 'English', code: 'HS 201', department: 'CSE', semester: 2, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Mathematics-II', code: 'BS 202', department: 'CSE', semester: 2, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Chemistry', code: 'BS 203', department: 'CSE', semester: 2, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Programming for Problem Solving', code: 'ES 204', department: 'CSE', semester: 2, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Manufacturing Practices', code: 'ES 205', department: 'CSE', semester: 2, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Language Laboratory', code: 'HS 206', department: 'CSE', semester: 2, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Chemistry Laboratory', code: 'BS 207', department: 'CSE', semester: 2, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Programming for Problem Solving Lab', code: 'ES 208', department: 'CSE', semester: 2, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Workshop on Manufacturing Practices', code: 'ES 209', department: 'CSE', semester: 2, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Environmental Engineering', code: 'MC 210', department: 'CSE', semester: 2, degree: 'B.Tech', scheme: '2021 Syllabus' },

  // Semester 3
  { title: 'Effective Technical Communication', code: 'HU 301', department: 'CSE', semester: 3, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Mathematics-III', code: 'BS 302', department: 'CSE', semester: 3, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Biology for Engineers', code: 'BS 303', department: 'CSE', semester: 3, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Engineering Mechanics', code: 'ES 304', department: 'CSE', semester: 3, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Digital Logic & Microprocessor', code: 'PC CS 305', department: 'CSE', semester: 3, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Digital Logic & Microprocessor', code: 'PC CS305', department: 'CSE', semester: 3, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Data Structure & Algorithm', code: 'PC CS 306', department: 'CSE', semester: 3, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Data Structure & Algorithm', code: 'PCC-CS301', department: 'CSE', semester: 3, degree: 'B.Tech', scheme: 'CBCS Variant' },
  { title: 'Java Programming Lab', code: 'PC CS 307', department: 'CSE', semester: 3, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Data Structure Lab', code: 'PC CS 308', department: 'CSE', semester: 3, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Digital Electronics & Microprocessor Lab', code: 'PC CS 309', department: 'CSE', semester: 3, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Indian Constitution', code: 'MC 310', department: 'CSE', semester: 3, degree: 'B.Tech', scheme: '2021 Syllabus' },

  // Semester 4
  { title: 'Engineering Economics and Accountancy', code: 'HU 401', department: 'CSE', semester: 4, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Universal Human Values-II: Understanding Harmony', code: 'HU 402', department: 'CSE', semester: 4, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Discrete Mathematics', code: 'PC CS 403', department: 'CSE', semester: 4, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Discrete Mathematics', code: 'PCCS403', department: 'CSE', semester: 4, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Computer Organization & Architecture', code: 'PC CS 404', department: 'CSE', semester: 4, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Computer Organization & Architecture', code: 'PCCS404', department: 'CSE', semester: 4, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Operating Systems', code: 'PC CS 405', department: 'CSE', semester: 4, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Operating Systems', code: 'PCCS405', department: 'CSE', semester: 4, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Object Oriented Programming', code: 'PC CS 406', department: 'CSE', semester: 4, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Object Oriented Programming', code: 'PCCS406', department: 'CSE', semester: 4, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'IT Workshop (Python/R)', code: 'PC CS 407', department: 'CSE', semester: 4, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'IT Workshop (Python/R)', code: 'PCCS407', department: 'CSE', semester: 4, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Operating System Lab', code: 'PC CS 408', department: 'CSE', semester: 4, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Operating System Lab', code: 'PCCS408', department: 'CSE', semester: 4, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Object Oriented Programming Lab', code: 'PC CS 409', department: 'CSE', semester: 4, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Object Oriented Programming Lab', code: 'PCCS409', department: 'CSE', semester: 4, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Essence of Indian Knowledge Tradition', code: 'MC 410', department: 'CSE', semester: 4, degree: 'B.Tech', scheme: '2021 Syllabus' },

  // Semester 5
  { title: 'Professional Practice, Law and Ethics', code: 'HU 601', department: 'CSE', semester: 5, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Professional Practice, Law and Ethics', code: 'HU 501', department: 'CSE', semester: 5, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Design and Analysis of Algorithm', code: 'PC CS 502', department: 'CSE', semester: 5, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Database Management Systems', code: 'PC CS 503', department: 'CSE', semester: 5, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Formal Language & Automata Theory', code: 'PC CS 504', department: 'CSE', semester: 5, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Artificial Intelligence', code: 'PC CS 505', department: 'CSE', semester: 5, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Computer Networks', code: 'PC CS 506', department: 'CSE', semester: 5, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Algorithm Lab', code: 'PC CS 507', department: 'CSE', semester: 5, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Database Management System Lab', code: 'PC CS 508', department: 'CSE', semester: 5, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Computer Hardware & Network Lab', code: 'PC CS 509', department: 'CSE', semester: 5, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Industry Internship - I', code: 'SI CS 510', department: 'CSE', semester: 5, degree: 'B.Tech', scheme: '2021 Syllabus' },

  // Semester 6
  { title: 'Digital Image Processing', code: 'PC CS 601', department: 'CSE', semester: 6, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Compiler Design', code: 'PC CS 602', department: 'CSE', semester: 6, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Cryptography and Network Security', code: 'PC CS 603', department: 'CSE', semester: 6, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Software Engineering', code: 'PC CS 604', department: 'CSE', semester: 6, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Software Engineering', code: 'PE CS 604', department: 'CSE', semester: 6, degree: 'B.Tech', scheme: 'Elective Variant' },
  { title: 'Advanced Java Lab', code: 'PC CS 605', department: 'CSE', semester: 6, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Web Technology Lab (PHP/ JavaScript)', code: 'PC CS 606', department: 'CSE', semester: 6, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Image Processing Lab', code: 'PC CS 607', department: 'CSE', semester: 6, degree: 'B.Tech', scheme: '2021 Syllabus' },

  // Program Elective-1 (Semester 6)
  { title: 'Advanced Computer Architecture', code: 'PE CS 608/1', department: 'CSE', semester: 6, degree: 'B.Tech', scheme: 'Program Elective-1' },
  { title: 'Data Mining', code: 'PE CS 608/2', department: 'CSE', semester: 6, degree: 'B.Tech', scheme: 'Program Elective-1' },
  { title: 'Web Technology', code: 'PE CS 608/3', department: 'CSE', semester: 6, degree: 'B.Tech', scheme: 'Program Elective-1' },
  { title: 'Mini Project', code: 'PR CS 609', department: 'CSE', semester: 6, degree: 'B.Tech', scheme: 'Project-1' },

  // Semester 7
  // Program Elective-2 (Semester 7)
  { title: 'Internet of Things', code: 'PE CS 701/1', department: 'CSE', semester: 7, degree: 'B.Tech', scheme: 'Program Elective-2' },
  { title: 'Kotlin Programming', code: 'PE CS 701/2', department: 'CSE', semester: 7, degree: 'B.Tech', scheme: 'Program Elective-2' },
  { title: 'Blockchain Technology', code: 'PE CS 701/3', department: 'CSE', semester: 7, degree: 'B.Tech', scheme: 'Program Elective-2' },

  // Program Elective-3 (Semester 7)
  { title: 'Soft Computing', code: 'PE CS 702/1', department: 'CSE', semester: 7, degree: 'B.Tech', scheme: 'Program Elective-3' },
  { title: 'Machine Learning', code: 'PE CS 702/2', department: 'CSE', semester: 7, degree: 'B.Tech', scheme: 'Program Elective-3' },
  { title: 'Cloud Computing', code: 'PE CS 702/3', department: 'CSE', semester: 7, degree: 'B.Tech', scheme: 'Program Elective-3' },

  { title: 'Open Elective-1', code: 'OE 703', department: 'CSE', semester: 7, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Open Elective-2', code: 'OE 704', department: 'CSE', semester: 7, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Project Work Intermediate', code: 'PR CS 705', department: 'CSE', semester: 7, degree: 'B.Tech', scheme: 'Project-2' },
  { title: 'Internship - II', code: 'SI CS-706', department: 'CSE', semester: 7, degree: 'B.Tech', scheme: 'Summer Internship-2' },
  { title: 'Seminar on Contemporary Engineering Topics - I', code: 'SE CS 707', department: 'CSE', semester: 7, degree: 'B.Tech', scheme: 'Seminar-1' },

  // Semester 8
  // Program Elective-4 (Semester 8)
  { title: 'Distributed Systems', code: 'PE CS 801/1', department: 'CSE', semester: 8, degree: 'B.Tech', scheme: 'Program Elective-4' },
  { title: 'Distributed Systems', code: 'PECS 801/1', department: 'CSE', semester: 8, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Mobile Computing', code: 'PE CS 801/2', department: 'CSE', semester: 8, degree: 'B.Tech', scheme: 'Program Elective-4' },
  { title: 'Mobile Computing', code: 'PECS 801/2', department: 'CSE', semester: 8, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Big Data Analytics', code: 'PE CS 801/3', department: 'CSE', semester: 8, degree: 'B.Tech', scheme: 'Program Elective-4' },
  { title: 'Big Data Analytics', code: 'PECS 801/3', department: 'CSE', semester: 8, degree: 'B.Tech', scheme: 'Variant' },

  // Program Elective-5 (Semester 8)
  { title: 'Pattern Recognition', code: 'PE CS 802/1', department: 'CSE', semester: 8, degree: 'B.Tech', scheme: 'Program Elective-5' },
  { title: 'Pattern Recognition', code: 'PECS 802/1', department: 'CSE', semester: 8, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Natural Language Processing', code: 'PE CS 802/2', department: 'CSE', semester: 8, degree: 'B.Tech', scheme: 'Program Elective-5' },
  { title: 'Natural Language Processing', code: 'PECS 802/2', department: 'CSE', semester: 8, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Android Operating System', code: 'PE CS 802/3', department: 'CSE', semester: 8, degree: 'B.Tech', scheme: 'Program Elective-5' },
  { title: 'Android Operating System', code: 'PECS 802/3', department: 'CSE', semester: 8, degree: 'B.Tech', scheme: 'Variant' },

  { title: 'Open Elective-3', code: 'OE 803', department: 'CSE', semester: 8, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Open Elective-4', code: 'OE 804', department: 'CSE', semester: 8, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Project Work Final', code: 'PR CS 805', department: 'CSE', semester: 8, degree: 'B.Tech', scheme: 'Project-3' },
  { title: 'Project Work Final', code: 'PRCS 805', department: 'CSE', semester: 8, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Seminar on Contemporary Engineering Topics - II', code: 'SE CS 806', department: 'CSE', semester: 8, degree: 'B.Tech', scheme: 'Seminar-2' },
  { title: 'Seminar on Contemporary Engineering Topics - II', code: 'SECS 806', department: 'CSE', semester: 8, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'SWAYAM Courses', code: 'SW CS 807', department: 'CSE', semester: 8, degree: 'B.Tech', scheme: 'Online Course' },
  { title: 'SWAYAM Courses', code: 'SWCS 807', department: 'CSE', semester: 8, degree: 'B.Tech', scheme: 'Variant' },

  // ==========================================
  // EE (Electrical Engineering) - Official Tripura University 2021 Curriculum
  // ==========================================
  // Semester 1 & 2 (1st Year Common Foundation)
  { title: 'Mathematics – I', code: 'BS 101', department: 'EE', semester: 1, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Physics', code: 'BS 102', department: 'EE', semester: 1, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Basic Electrical Engineering', code: 'ES 103', department: 'EE', semester: 1, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Engineering Graphics and Design', code: 'ES 104', department: 'EE', semester: 1, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Physics Laboratory', code: 'BS 105', department: 'EE', semester: 1, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Engineering Graphics Practice', code: 'ES 106', department: 'EE', semester: 1, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Basic Electrical Engineering Laboratory', code: 'ES 107', department: 'EE', semester: 1, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Induction Program', code: 'MC 108', department: 'EE', semester: 1, degree: 'B.Tech', scheme: '2021 Syllabus' },

  { title: 'English', code: 'HS 201', department: 'EE', semester: 2, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Mathematics-II', code: 'BS 202', department: 'EE', semester: 2, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Chemistry', code: 'BS 203', department: 'EE', semester: 2, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Programming for Problem Solving', code: 'ES 204', department: 'EE', semester: 2, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Manufacturing Practices', code: 'ES 205', department: 'EE', semester: 2, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Language Laboratory', code: 'HS 206', department: 'EE', semester: 2, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Chemistry Laboratory', code: 'BS 207', department: 'EE', semester: 2, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Programming for Problem Solving Lab', code: 'ES 208', department: 'EE', semester: 2, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Workshop on Manufacturing Practices', code: 'ES 209', department: 'EE', semester: 2, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Environmental Engineering', code: 'MC 210', department: 'EE', semester: 2, degree: 'B.Tech', scheme: '2021 Syllabus' },

  // Semester 3
  { title: 'Effective Technical Communication', code: 'HS 301', department: 'EE', semester: 3, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Mathematics-III', code: 'BS 302', department: 'EE', semester: 3, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Biology for Engineers', code: 'BS 303', department: 'EE', semester: 3, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Engineering Mechanics', code: 'ES 304', department: 'EE', semester: 3, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Electrical Circuits Analysis', code: 'PC EE 305', department: 'EE', semester: 3, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Electrical Circuits Analysis', code: 'PCEE-305', department: 'EE', semester: 3, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Analog Electronics', code: 'PC EE 306', department: 'EE', semester: 3, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Electrical Estimation & Design Practices', code: 'PC EE 307', department: 'EE', semester: 3, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Electrical Circuits Laboratory', code: 'PC EE 308', department: 'EE', semester: 3, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Electrical Circuits Laboratory', code: 'PC EE308', department: 'EE', semester: 3, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Analog Electronics Laboratory', code: 'PC EE 309', department: 'EE', semester: 3, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Indian Constitution', code: 'MC 310', department: 'EE', semester: 3, degree: 'B.Tech', scheme: '2021 Syllabus' },

  // Semester 4
  { title: 'Engineering Economics and Accountancy', code: 'HS 401', department: 'EE', semester: 4, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Universal Human Values-II: Understanding Harmony', code: 'HS 402', department: 'EE', semester: 4, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Electromagnetic Field Theory', code: 'PC EE 403', department: 'EE', semester: 4, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Electrical Machines-I', code: 'PC EE 404', department: 'EE', semester: 4, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Digital Electronics', code: 'PC EE 405', department: 'EE', semester: 4, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Digital Electronics', code: 'PCEE 405', department: 'EE', semester: 4, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Power Electronics', code: 'PC EE 406', department: 'EE', semester: 4, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Power Electronics', code: 'PCEE406', department: 'EE', semester: 4, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Electrical Machines Laboratory-I', code: 'PC EE 407', department: 'EE', semester: 4, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Power Electronics Laboratory', code: 'PC EE 408', department: 'EE', semester: 4, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Power Electronics Laboratory', code: 'PCEE408', department: 'EE', semester: 4, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Basic Electrical Measurements Laboratory Practices', code: 'PC EE 409', department: 'EE', semester: 4, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Basic Electrical Measurements Laboratory Practices', code: 'PC EE-409', department: 'EE', semester: 4, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Essence of Indian Knowledge Tradition', code: 'MC 410', department: 'EE', semester: 4, degree: 'B.Tech', scheme: '2021 Syllabus' },

  // Semester 5
  { title: 'Professional Practice, Law and Ethics', code: 'HS 501', department: 'EE', semester: 5, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Professional Practice, Law and Ethics', code: 'HS501', department: 'EE', semester: 5, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Electrical Machines-II', code: 'PC EE 502', department: 'EE', semester: 5, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Electrical Machines-II', code: 'PCEE 502', department: 'EE', semester: 5, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Power System-I', code: 'PC EE 503', department: 'EE', semester: 5, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Power System-I', code: 'PCEE 503', department: 'EE', semester: 5, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Microprocessors & Micro-controller', code: 'PC EE 504', department: 'EE', semester: 5, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Microprocessors & Micro-controller', code: 'PCEE 504', department: 'EE', semester: 5, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Industrial Measurements and Instrumentation Systems', code: 'PC EE 505', department: 'EE', semester: 5, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Industrial Measurements and Instrumentation Systems', code: 'PCEE-505', department: 'EE', semester: 5, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Control Systems', code: 'PC EE 506', department: 'EE', semester: 5, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Control Systems', code: 'PCEE 506', department: 'EE', semester: 5, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Electrical Machines Laboratory-II', code: 'PC EE 507', department: 'EE', semester: 5, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Industrial Measurements and Instrumentation Lab', code: 'PC EE 508', department: 'EE', semester: 5, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Industrial Measurements and Instrumentation Lab', code: 'PCEE-508', department: 'EE', semester: 5, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Microprocessors & Microcontroller Lab', code: 'PC EE 509', department: 'EE', semester: 5, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Industry Internship - I', code: 'SI EE 510', department: 'EE', semester: 5, degree: 'B.Tech', scheme: '2021 Syllabus' },

  // Semester 6
  { title: 'Power System-II', code: 'PC EE 601', department: 'EE', semester: 6, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Power System-II', code: 'PCEE 601', department: 'EE', semester: 6, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Electric Drives', code: 'PC EE 602', department: 'EE', semester: 6, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Electric Drives', code: 'PCEE602', department: 'EE', semester: 6, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Power System Protection & Switchgear', code: 'PC EE 603', department: 'EE', semester: 6, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Power System Protection & Switchgear', code: 'PC EE-603', department: 'EE', semester: 6, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Signals and Systems', code: 'PC EE 604', department: 'EE', semester: 6, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Electrical Engineering Simulation Laboratory', code: 'PC EE 605', department: 'EE', semester: 6, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Control Systems Laboratory', code: 'PC EE 606', department: 'EE', semester: 6, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Control Systems Laboratory', code: 'PCEE-606', department: 'EE', semester: 6, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Power System Laboratory', code: 'PC EE 607', department: 'EE', semester: 6, degree: 'B.Tech', scheme: '2021 Syllabus' },

  // Program Elective-1 (Semester 6)
  { title: 'Digital Signal Processing', code: 'PE EE 608/1', department: 'EE', semester: 6, degree: 'B.Tech', scheme: 'Program Elective-1' },
  { title: 'Digital Signal Processing', code: 'PEEE-608/1', department: 'EE', semester: 6, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Wind and Solar Energy', code: 'PE EE 608/2', department: 'EE', semester: 6, degree: 'B.Tech', scheme: 'Program Elective-1' },
  { title: 'Wind and Solar Energy', code: 'PEEE-608/2', department: 'EE', semester: 6, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'High Voltage Engineering', code: 'PE EE 608/3', department: 'EE', semester: 6, degree: 'B.Tech', scheme: 'Program Elective-1' },
  { title: 'High Voltage Engineering', code: 'PEEE-608/3', department: 'EE', semester: 6, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Mini Project', code: 'PR EE 609', department: 'EE', semester: 6, degree: 'B.Tech', scheme: 'Project-1' },

  // Semester 7
  // Program Elective-2 (Semester 7)
  { title: 'Advanced Electric Drives', code: 'PE EE 701/1', department: 'EE', semester: 7, degree: 'B.Tech', scheme: 'Program Elective-2' },
  { title: 'Advanced Electric Drives', code: 'PEEE 701/1', department: 'EE', semester: 7, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Advanced Electric Drives', code: 'PEEE701/1', department: 'EE', semester: 7, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Digital Control Systems', code: 'PE EE 701/2', department: 'EE', semester: 7, degree: 'B.Tech', scheme: 'Program Elective-2' },
  { title: 'Digital Control Systems', code: 'PEEE 701/2', department: 'EE', semester: 7, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Digital Control Systems', code: 'PEEE-701/2', department: 'EE', semester: 7, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Electromagnetic Waves', code: 'PE EE 701/3', department: 'EE', semester: 7, degree: 'B.Tech', scheme: 'Program Elective-2' },
  { title: 'Electromagnetic Waves', code: 'PEEE 701/3', department: 'EE', semester: 7, degree: 'B.Tech', scheme: 'Variant' },

  // Program Elective-3 (Semester 7)
  { title: 'Electrical Machine Design', code: 'PE EE 702/1', department: 'EE', semester: 7, degree: 'B.Tech', scheme: 'Program Elective-3' },
  { title: 'Electrical Machine Design', code: 'PEEE 702/1', department: 'EE', semester: 7, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Power Quality & FACTS', code: 'PE EE 702/2', department: 'EE', semester: 7, degree: 'B.Tech', scheme: 'Program Elective-3' },
  { title: 'Power Quality & FACTS', code: 'PEEE 702/2', department: 'EE', semester: 7, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Bio-Medical Instrumentation', code: 'PE EE 702/3', department: 'EE', semester: 7, degree: 'B.Tech', scheme: 'Program Elective-3' },
  { title: 'Bio-Medical Instrumentation', code: 'PEEE 702/3', department: 'EE', semester: 7, degree: 'B.Tech', scheme: 'Variant' },

  { title: 'Open Elective-1', code: 'OE EE 703', department: 'EE', semester: 7, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Open Elective-2', code: 'OE EE 704', department: 'EE', semester: 7, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Project Work Intermediate', code: 'PR EE 705', department: 'EE', semester: 7, degree: 'B.Tech', scheme: 'Project-2' },
  { title: 'Project Work Intermediate', code: 'PREE 705', department: 'EE', semester: 7, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Internship - II', code: 'SI EE-706', department: 'EE', semester: 7, degree: 'B.Tech', scheme: 'Summer Internship-2' },
  { title: 'Internship - II', code: 'SI EE 706', department: 'EE', semester: 7, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Seminar on Contemporary Engineering Topics - I', code: 'SE EE 707', department: 'EE', semester: 7, degree: 'B.Tech', scheme: 'Seminar-1' },
  { title: 'Seminar on Contemporary Engineering Topics - I', code: 'SEEE 707', department: 'EE', semester: 7, degree: 'B.Tech', scheme: 'Variant' },

  // Semester 8
  // Program Elective-4 (Semester 8)
  { title: 'Power System Dynamics & Control', code: 'PE EE 801/1', department: 'EE', semester: 8, degree: 'B.Tech', scheme: 'Program Elective-4' },
  { title: 'Power System Dynamics & Control', code: 'PEEE801/1', department: 'EE', semester: 8, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Power System Dynamics & Control', code: 'PEEE-801/1', department: 'EE', semester: 8, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Electrical and Hybrid Vehicles', code: 'PE EE 801/2', department: 'EE', semester: 8, degree: 'B.Tech', scheme: 'Program Elective-4' },
  { title: 'Electrical and Hybrid Vehicles', code: 'PEEE801/2', department: 'EE', semester: 8, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Electrical and Hybrid Vehicles', code: 'PEEE 801/2', department: 'EE', semester: 8, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Industrial Process Control', code: 'PE EE 801/3', department: 'EE', semester: 8, degree: 'B.Tech', scheme: 'Program Elective-4' },
  { title: 'Industrial Process Control', code: 'PEEE801/3', department: 'EE', semester: 8, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Industrial Process Control', code: 'PEEE 801/3', department: 'EE', semester: 8, degree: 'B.Tech', scheme: 'Variant' },

  // Program Elective-5 (Semester 8)
  { title: 'HVDC Transmission Systems', code: 'PE EE 802/1', department: 'EE', semester: 8, degree: 'B.Tech', scheme: 'Program Elective-5' },
  { title: 'HVDC Transmission Systems', code: 'PEEE 802/1', department: 'EE', semester: 8, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Electrical Energy Conservation and Auditing', code: 'PE EE 802/2', department: 'EE', semester: 8, degree: 'B.Tech', scheme: 'Program Elective-5' },
  { title: 'Electrical Energy Conservation and Auditing', code: 'PEEE 802/2', department: 'EE', semester: 8, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Line-Commutated and Active PWM Rectifiers', code: 'PE EE 802/3', department: 'EE', semester: 8, degree: 'B.Tech', scheme: 'Program Elective-5' },
  { title: 'Line-Commutated and Active PWM Rectifiers', code: 'PEEE 802/3', department: 'EE', semester: 8, degree: 'B.Tech', scheme: 'Variant' },

  { title: 'Open Elective-1', code: 'OE EE 803', department: 'EE', semester: 8, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Open Elective-1', code: 'OEEE 803', department: 'EE', semester: 8, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Open Elective-2', code: 'OE EE 804', department: 'EE', semester: 8, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Open Elective-2', code: 'OEEE 804', department: 'EE', semester: 8, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Project Work Final', code: 'PR EE 805', department: 'EE', semester: 8, degree: 'B.Tech', scheme: 'Project-3' },
  { title: 'Project Work Final', code: 'PREE 805', department: 'EE', semester: 8, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Seminar on Contemporary Engineering Topics - II', code: 'SE EE 806', department: 'EE', semester: 8, degree: 'B.Tech', scheme: 'Seminar-2' },
  { title: 'SWAYAM Courses', code: 'SW EE 807', department: 'EE', semester: 8, degree: 'B.Tech', scheme: 'Online Course' },

  // ==========================================
  // ECSE (Electrical & Computer Science Engineering) - Official 2021 Curriculum
  // ==========================================
  // Semester 1 & 2 (1st Year Common Foundation)
  { title: 'Mathematics - I', code: 'BS 101', department: 'ECSE', semester: 1, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Physics', code: 'BS 102', department: 'ECSE', semester: 1, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Basic Electrical Engineering', code: 'ES 103', department: 'ECSE', semester: 1, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Engineering Graphics and Design', code: 'ES 104', department: 'ECSE', semester: 1, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Physics Laboratory', code: 'BS 105', department: 'ECSE', semester: 1, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Engineering Graphics Practice', code: 'ES 106', department: 'ECSE', semester: 1, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Basic Electrical Engineering Laboratory', code: 'ES 107', department: 'ECSE', semester: 1, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Induction Program', code: 'MC 108', department: 'ECSE', semester: 1, degree: 'B.Tech', scheme: '2021 Syllabus' },

  { title: 'English', code: 'HS 201', department: 'ECSE', semester: 2, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Mathematics-II', code: 'BS 202', department: 'ECSE', semester: 2, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Chemistry', code: 'BS 203', department: 'ECSE', semester: 2, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Programming for Problem Solving', code: 'ES 204', department: 'ECSE', semester: 2, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Manufacturing Practices', code: 'ES 205', department: 'ECSE', semester: 2, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Language Laboratory', code: 'HS 206', department: 'ECSE', semester: 2, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Chemistry Laboratory', code: 'BS 207', department: 'ECSE', semester: 2, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Programming for Problem Solving Lab', code: 'ES 208', department: 'ECSE', semester: 2, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Workshop on Manufacturing Practices', code: 'ES 209', department: 'ECSE', semester: 2, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Environmental Engineering', code: 'MC 210', department: 'ECSE', semester: 2, degree: 'B.Tech', scheme: '2021 Syllabus' },

  // Semester 3
  { title: 'Effective Technical Communication', code: 'HS 301', department: 'ECSE', semester: 3, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Mathematics-III', code: 'BS 302', department: 'ECSE', semester: 3, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Biology for Engineers', code: 'BS 303', department: 'ECSE', semester: 3, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Engineering Mechanics', code: 'ES 304', department: 'ECSE', semester: 3, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Introduction to Electrical Engineering with Computer Science (ECS)', code: 'PC ES 305', department: 'ECSE', semester: 3, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Introduction to Electrical Engineering with Computer Science (ECS)', code: 'PE ES 305', department: 'ECSE', semester: 3, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Analog & Digital Electronics', code: 'PC ES 306', department: 'ECSE', semester: 3, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Analog & Digital Electronics', code: 'PE ES 306', department: 'ECSE', semester: 3, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Computer Organization & Architecture', code: 'PC ES 307', department: 'ECSE', semester: 3, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Electrical Engineering with Computer Science (ECS) Laboratory', code: 'PC ES 308', department: 'ECSE', semester: 3, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Electronics Laboratory', code: 'PC ES 309', department: 'ECSE', semester: 3, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Indian Constitution', code: 'MC 310', department: 'ECSE', semester: 3, degree: 'B.Tech', scheme: '2021 Syllabus' },

  // Semester 4
  { title: 'Engineering Economics and Accountancy', code: 'HS 401', department: 'ECSE', semester: 4, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Universal Human Values-II: Understanding Harmony', code: 'HS 402', department: 'ECSE', semester: 4, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Electrical Circuit Theory', code: 'PC ES 403', department: 'ECSE', semester: 4, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Electrical Machines', code: 'PC ES 404', department: 'ECSE', semester: 4, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Fields Theory', code: 'PC ES 405', department: 'ECSE', semester: 4, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Fields Theory', code: 'PE ES 405', department: 'ECSE', semester: 4, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Data Structure & Algorithms', code: 'PC ES 406', department: 'ECSE', semester: 4, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Electrical Circuit Theory Laboratory', code: 'PC ES 407', department: 'ECSE', semester: 4, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Electrical Machines Laboratory', code: 'PC ES 408', department: 'ECSE', semester: 4, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Data Structure & Algorithms Laboratory', code: 'PC ES 409', department: 'ECSE', semester: 4, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Essence of Indian Knowledge Tradition', code: 'MC 410', department: 'ECSE', semester: 4, degree: 'B.Tech', scheme: '2021 Syllabus' },

  // Semester 5
  { title: 'Professional Practice, Law and Ethics', code: 'HS 501', department: 'ECSE', semester: 5, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Professional Practice, Law and Ethics', code: 'HU 501', department: 'ECSE', semester: 5, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Electrical Measurement & Instrumentation', code: 'PC ES 502', department: 'ECSE', semester: 5, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Probability and Statistics', code: 'PC ES 503', department: 'ECSE', semester: 5, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Fundamentals of Microprocessor and Microcontroller', code: 'PC ES 504', department: 'ECSE', semester: 5, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Data Science', code: 'PC ES 505', department: 'ECSE', semester: 5, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Data Communication and Computer Networks', code: 'PC ES 506', department: 'ECSE', semester: 5, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Electrical Measurement & Instrumentation Laboratory', code: 'PC ES 507', department: 'ECSE', semester: 5, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Microprocessor and Microcontroller Lab', code: 'PC ES 508', department: 'ECSE', semester: 5, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Programming Lab', code: 'PC ES 509', department: 'ECSE', semester: 5, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Industry Internship - I', code: 'SI ES 510', department: 'ECSE', semester: 5, degree: 'B.Tech', scheme: '2021 Syllabus' },

  // Semester 6
  { title: 'Control System Engineering', code: 'PC ES 601', department: 'ECSE', semester: 6, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Control System Engineering', code: 'PC ES601', department: 'ECSE', semester: 6, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Electrical Power System', code: 'PC ES 602', department: 'ECSE', semester: 6, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Electrical Power System', code: 'PCES602', department: 'ECSE', semester: 6, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Industrial Electronics', code: 'PC ES 603', department: 'ECSE', semester: 6, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Industrial Electronics', code: 'PC ES603', department: 'ECSE', semester: 6, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Renewable and Sustainable Energy System', code: 'PC ES 604', department: 'ECSE', semester: 6, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Control System Engineering Laboratory', code: 'PC ES 605', department: 'ECSE', semester: 6, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Industrial Electronics Laboratory', code: 'PC ES 606', department: 'ECSE', semester: 6, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Power System Laboratory', code: 'PC ES 607', department: 'ECSE', semester: 6, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Power System Laboratory', code: 'PCES607', department: 'ECSE', semester: 6, degree: 'B.Tech', scheme: 'Variant' },

  // Program Elective-1 (Semester 6)
  { title: 'Sensor Technology', code: 'PE ES 608/1', department: 'ECSE', semester: 6, degree: 'B.Tech', scheme: 'Program Elective-1' },
  { title: 'Sensor Technology', code: 'PEES 608/1', department: 'ECSE', semester: 6, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Artificial Intelligence', code: 'PE ES 608/2', department: 'ECSE', semester: 6, degree: 'B.Tech', scheme: 'Program Elective-1' },
  { title: 'Artificial Intelligence', code: 'PEES 608/2', department: 'ECSE', semester: 6, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Digital Signal Processing', code: 'PE ES 608/3', department: 'ECSE', semester: 6, degree: 'B.Tech', scheme: 'Program Elective-1' },
  { title: 'Digital Signal Processing', code: 'PEES 608/3', department: 'ECSE', semester: 6, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Mini Project', code: 'PR ES 609', department: 'ECSE', semester: 6, degree: 'B.Tech', scheme: 'Project-1' },

  // Semester 7
  // Program Elective-2 (Semester 7)
  { title: 'Introduction to Smart Grid', code: 'PE ES 701/1', department: 'ECSE', semester: 7, degree: 'B.Tech', scheme: 'Program Elective-2' },
  { title: 'Electrical Distribution System Analysis', code: 'PE ES 701/2', department: 'ECSE', semester: 7, degree: 'B.Tech', scheme: 'Program Elective-2' },
  { title: 'Electrical Distribution System Analysis', code: 'PEES 701/2', department: 'ECSE', semester: 7, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'High Voltage Engineering', code: 'PE ES 701/3', department: 'ECSE', semester: 7, degree: 'B.Tech', scheme: 'Program Elective-2' },

  // Program Elective-3 (Semester 7)
  { title: 'Internet of Things (IoT)', code: 'PE ES 702/1', department: 'ECSE', semester: 7, degree: 'B.Tech', scheme: 'Program Elective-3' },
  { title: 'Robotics', code: 'PE ES 702/2', department: 'ECSE', semester: 7, degree: 'B.Tech', scheme: 'Program Elective-3' },
  { title: 'Block Chain', code: 'PE ES 702/3', department: 'ECSE', semester: 7, degree: 'B.Tech', scheme: 'Program Elective-3' },

  { title: 'Open Elective-1', code: 'OE ES 703', department: 'ECSE', semester: 7, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Open Elective-2', code: 'OE ES 704', department: 'ECSE', semester: 7, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Project Work Intermediate', code: 'PR ES 705', department: 'ECSE', semester: 7, degree: 'B.Tech', scheme: 'Project-2' },
  { title: 'Internship - II', code: 'SI ES 706', department: 'ECSE', semester: 7, degree: 'B.Tech', scheme: 'Summer Internship-2' },
  { title: 'Internship - II', code: 'SI ES-706', department: 'ECSE', semester: 7, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Seminar on Contemporary Engineering Topics - I', code: 'SE ES 707', department: 'ECSE', semester: 7, degree: 'B.Tech', scheme: 'Seminar-1' },

  // Semester 8
  // Program Elective-4 (Semester 8)
  { title: 'Smart Grid & IoT', code: 'PE ES 801/1', department: 'ECSE', semester: 8, degree: 'B.Tech', scheme: 'Program Elective-4' },
  { title: 'Introduction to Electric Vehicles', code: 'PE ES 801/2', department: 'ECSE', semester: 8, degree: 'B.Tech', scheme: 'Program Elective-4' },
  { title: 'Introduction to Electric Vehicles', code: 'PEES 801/2', department: 'ECSE', semester: 8, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Industrial Process Control', code: 'PE ES 801/3', department: 'ECSE', semester: 8, degree: 'B.Tech', scheme: 'Program Elective-4' },

  // Program Elective-5 (Semester 8)
  { title: 'Biomedical Instrumentation', code: 'PE ES 802/1', department: 'ECSE', semester: 8, degree: 'B.Tech', scheme: 'Program Elective-5' },
  { title: 'Biomedical Instrumentation', code: 'PEES 802/1', department: 'ECSE', semester: 8, degree: 'B.Tech', scheme: 'Variant' },
  { title: 'Quantum Computing', code: 'PE ES 802/2', department: 'ECSE', semester: 8, degree: 'B.Tech', scheme: 'Program Elective-5' },
  { title: 'Virtual Reality (VR)', code: 'PE ES 802/3', department: 'ECSE', semester: 8, degree: 'B.Tech', scheme: 'Program Elective-5' },

  { title: 'Open Elective-3', code: 'OE ES 803', department: 'ECSE', semester: 8, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Open Elective-4', code: 'OE ES 804', department: 'ECSE', semester: 8, degree: 'B.Tech', scheme: '2021 Syllabus' },
  { title: 'Project Work Final', code: 'PR ES 805', department: 'ECSE', semester: 8, degree: 'B.Tech', scheme: 'Project-3' },
  { title: 'Seminar on Contemporary Engineering Topics - II', code: 'SE ES 806', department: 'ECSE', semester: 8, degree: 'B.Tech', scheme: 'Seminar-2' },
  { title: 'SWAYAM Courses', code: 'SW ES 807', department: 'ECSE', semester: 8, degree: 'B.Tech', scheme: 'Online Course' },

  // ==========================================
  // CE (Civil Engineering)
  // ==========================================
  { title: 'Strength of Materials', code: 'PCC-CE301', department: 'CE', semester: 3, degree: 'B.Tech' },
  { title: 'Structural Analysis I', code: 'PCC-CE401', department: 'CE', semester: 4, degree: 'B.Tech' },
  { title: 'Design of RCC Structures', code: 'PCC-CE602', department: 'CE', semester: 6, degree: 'B.Tech' },

  // ==========================================
  // ME (Mechanical Engineering)
  // ==========================================
  { title: 'Engineering Thermodynamics', code: 'PCC-ME301', department: 'ME', semester: 3, degree: 'B.Tech' },
  { title: 'Kinematics & Dynamics of Machines', code: 'PCC-ME401', department: 'ME', semester: 4, degree: 'B.Tech' },

  // ==========================================
  // PROJECTS, SEMINARS, INTERNSHIPS & VIVA (All Depts)
  // ==========================================
  { title: 'Mini Project', code: 'PROJ-601', department: 'ECE', semester: 6, degree: 'B.Tech', scheme: 'CBCS' },
  { title: 'Mini Project', code: 'EC-606', department: 'ECE', semester: 6, degree: 'B.Tech', scheme: 'Old Format' },
  { title: 'Mini Project', code: 'PROJ-CS601', department: 'CSE', semester: 6, degree: 'B.Tech', scheme: 'CBCS' },
  { title: 'Mini Project', code: 'CS-606', department: 'CSE', semester: 6, degree: 'B.Tech', scheme: 'Old Format' },
  { title: 'Mini Project', code: 'PROJ-EE601', department: 'EE', semester: 6, degree: 'B.Tech' },
  { title: 'Mini Project', code: 'BCA-602', department: 'BCA', semester: 6, degree: 'BCA' },

  { title: 'Major Project Phase I', code: 'PROJ-701', department: 'ECE', semester: 7, degree: 'B.Tech', scheme: 'CBCS' },
  { title: 'Major Project Phase I', code: 'EC-705', department: 'ECE', semester: 7, degree: 'B.Tech', scheme: 'Old Format' },
  { title: 'Major Project Phase I', code: 'PROJ-CS701', department: 'CSE', semester: 7, degree: 'B.Tech' },
  { title: 'Major Project Phase II', code: 'PROJ-801', department: 'ECE', semester: 8, degree: 'B.Tech', scheme: 'CBCS' },
  { title: 'Major Project Phase II', code: 'EC-805', department: 'ECE', semester: 8, degree: 'B.Tech', scheme: 'Old Format' },
  { title: 'Major Project Phase II', code: 'PROJ-CS801', department: 'CSE', semester: 8, degree: 'B.Tech' },
  { title: 'Project Work / Dissertation', code: 'BCA-605', department: 'BCA', semester: 6, degree: 'BCA' },

  { title: 'Industrial Training', code: 'TRN-701', department: 'ECE', semester: 7, degree: 'B.Tech' },
  { title: 'Industrial Training', code: 'TRN-CS701', department: 'CSE', semester: 7, degree: 'B.Tech' },
  { title: 'Internship / Practical Training', code: 'INT-701', department: 'ECE', semester: 7, degree: 'B.Tech' },
  { title: 'Internship / Practical Training', code: 'INT-CS701', department: 'CSE', semester: 7, degree: 'B.Tech' },

  { title: 'Technical Seminar', code: 'SEM-701', department: 'ECE', semester: 7, degree: 'B.Tech' },
  { title: 'Technical Seminar', code: 'SEM-CS701', department: 'CSE', semester: 7, degree: 'B.Tech' },
  { title: 'Comprehensive Viva Voce', code: 'VIVA-801', department: 'ECE', semester: 8, degree: 'B.Tech' },
  { title: 'Comprehensive Viva Voce', code: 'VIVA-CS801', department: 'CSE', semester: 8, degree: 'B.Tech' },

  // ==========================================
  // BCA & B.Sc
  // ==========================================
  { title: 'Programming in C', code: 'BCA-101', department: 'BCA', semester: 1, degree: 'BCA' },
  { title: 'Database Management Systems', code: 'BCA-302', department: 'BCA', semester: 3, degree: 'BCA' },
  { title: 'Classical Mechanics & Properties of Matter', code: 'PHYS-101', department: 'Physics', semester: 1, degree: 'B.Sc' },

  // ==========================================
  // ECSE (Electronics & Computer Science Engineering)
  // ==========================================
  { title: 'Digital Electronics & Microprocessors', code: 'ECSE-301', department: 'ECSE', semester: 3, degree: 'B.Tech' },
  { title: 'Data Structures & Algorithms', code: 'ECSE-302', department: 'ECSE', semester: 3, degree: 'B.Tech' },
  { title: 'Signals & Systems', code: 'ECSE-401', department: 'ECSE', semester: 4, degree: 'B.Tech' },
  { title: 'Object Oriented Programming with C++', code: 'ECSE-402', department: 'ECSE', semester: 4, degree: 'B.Tech' },
  { title: 'Computer Architecture & Microcontrollers', code: 'ECSE-501', department: 'ECSE', semester: 5, degree: 'B.Tech' },
  { title: 'Operating Systems & System Programming', code: 'ECSE-502', department: 'ECSE', semester: 5, degree: 'B.Tech' },
  { title: 'VLSI Design & Embedded Systems', code: 'ECSE-601', department: 'ECSE', semester: 6, degree: 'B.Tech' },
  { title: 'Internet of Things (IoT) & Wireless Networks', code: 'ECSE-602', department: 'ECSE', semester: 6, degree: 'B.Tech' },

  // ==========================================
  // AIDS (Artificial Intelligence & Data Science)
  // ==========================================
  { title: 'Foundations of Artificial Intelligence', code: 'AIDS-301', department: 'AIDS', semester: 3, degree: 'B.Tech' },
  { title: 'Data Science & Statistical Modeling', code: 'AIDS-302', department: 'AIDS', semester: 3, degree: 'B.Tech' },
  { title: 'Python Programming & Data Analysis', code: 'AIDS-401', department: 'AIDS', semester: 4, degree: 'B.Tech' },
  { title: 'Machine Learning Algorithms', code: 'AIDS-501', department: 'AIDS', semester: 5, degree: 'B.Tech' },
  { title: 'Deep Learning & Neural Networks', code: 'AIDS-601', department: 'AIDS', semester: 6, degree: 'B.Tech' },
  { title: 'Natural Language Processing (NLP)', code: 'AIDS-602', department: 'AIDS', semester: 6, degree: 'B.Tech' },
  { title: 'Big Data Analytics & Cloud Computing', code: 'AIDS-701', department: 'AIDS', semester: 7, degree: 'B.Tech' }
];

/**
 * Get all courses combining built-in + user imported custom syllabus courses
 */
export function getAllCourseMappings(): CourseMapping[] {
  const custom = getCustomSyllabusCourses();
  return [...custom, ...TRIPURA_UNIVERSITY_COURSES];
}

/**
 * Finds matching courses by title (returns array of matching codes/schemes)
 */
export function lookupTripuraCourseVariants(courseTitle: string): CourseMapping[] {
  if (!courseTitle || !courseTitle.trim()) return [];
  const raw = courseTitle.trim().toLowerCase();
  const normalized = raw.replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ');

  if (!normalized) return [];
  const all = getAllCourseMappings();

  return all.filter((c) => {
    const cTitleNorm = c.title.toLowerCase().replace(/[^a-z0-9\s]/g, '');
    return (
      cTitleNorm === normalized ||
      cTitleNorm.includes(normalized) ||
      normalized.includes(cTitleNorm) ||
      (normalized.includes('digital signal') && cTitleNorm.includes('digital signal')) ||
      (normalized === 'dsp' && c.code.includes('604'))
    );
  });
}

/**
 * Single best lookup matching course
 */
export function lookupTripuraCourseCode(courseTitle: string): CourseMapping | null {
  const variants = lookupTripuraCourseVariants(courseTitle);
  return variants.length > 0 ? variants[0] : null;
}

/**
 * Filters courses for live search suggestions by department & semester with intelligent multi-word sentence matching
 */
export function searchTripuraCourses(query: string, filterDepartment?: string, filterSemester?: string | number): CourseMapping[] {
  const allCourses = getAllCourseMappings();

  const deptLower = filterDepartment?.trim().toLowerCase() || '';
  const semNum = filterSemester
    ? (typeof filterSemester === 'number' ? filterSemester : parseInt(String(filterSemester).replace(/\D/g, ''), 10))
    : NaN;

  if (!query || !query.trim()) {
    // Return default recommendations based on department and semester if set
    let list = allCourses;
    if (deptLower) {
      const deptFiltered = list.filter((c) => c.department && c.department.toLowerCase().includes(deptLower));
      if (deptFiltered.length > 0) list = deptFiltered;
    }
    if (!isNaN(semNum) && semNum > 0) {
      const semFiltered = list.filter((c) => c.semester === semNum);
      if (semFiltered.length > 0) list = semFiltered;
    }
    return list.slice(0, 12);
  }

  const rawQuery = query.trim().toLowerCase();
  // Normalize query: remove non-alphanumeric chars except spaces
  const cleanQuery = rawQuery.replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
  const queryWords = cleanQuery.split(' ').filter((w) => w.length > 0);

  // Score each course for relevance
  type ScoredCourse = { course: CourseMapping; score: number };
  const scoredList: ScoredCourse[] = [];

  for (const c of allCourses) {
    const titleLower = c.title.toLowerCase();
    const cleanTitle = titleLower.replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
    const codeLower = c.code.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanCodeQuery = cleanQuery.replace(/[^a-z0-9]/g, '');

    let score = 0;

    // 1. Exact title match
    if (cleanTitle === cleanQuery) {
      score += 200;
    }
    // 2. Title starts with query
    else if (cleanTitle.startsWith(cleanQuery)) {
      score += 150;
    }
    // 3. Exact substring match in title
    else if (cleanTitle.includes(cleanQuery)) {
      score += 100;
    }

    // 4. Code match
    if (cleanCodeQuery && codeLower.includes(cleanCodeQuery)) {
      score += 120;
    }

    // 5. Multi-word token matching (handles phrases/sentences like "java lab" matching "Java Programming Lab")
    if (queryWords.length > 0) {
      let matchedWordsCount = 0;
      for (const word of queryWords) {
        if (cleanTitle.includes(word) || codeLower.includes(word)) {
          matchedWordsCount++;
          // Give higher points for longer matching words
          score += 15 + Math.min(word.length * 3, 20);
        }
      }

      // Massive bonus if ALL query words are found in the course title
      if (matchedWordsCount === queryWords.length) {
        score += 80;
      }
    }

    // 6. Department / Semester preference bonus
    if (deptLower && c.department && c.department.toLowerCase().includes(deptLower)) {
      score += 25;
    }
    if (!isNaN(semNum) && semNum > 0 && c.semester === semNum) {
      score += 20;
    }

    if (score > 0) {
      scoredList.push({ course: c, score });
    }
  }

  // Sort by highest score first
  scoredList.sort((a, b) => b.score - a.score);

  // Deduplicate results with identical title and code
  const uniqueResults: CourseMapping[] = [];
  const seenKeys = new Set<string>();

  for (const item of scoredList) {
    const key = `${item.course.title.toLowerCase()}||${item.course.code.toLowerCase()}`;
    if (!seenKeys.has(key)) {
      seenKeys.add(key);
      uniqueResults.push(item.course);
    }
    if (uniqueResults.length >= 15) break;
  }

  return uniqueResults;
}

/**
 * Parser utility to extract course names and paper codes from pasted PDF text
 * Matches patterns like:
 * "Digital Signal Processing - EC-604"
 * "EC-604 : Digital Signal Processing"
 * "Course Code: PCEC-604 Subject: Digital Signal Processing"
 */
export function parseSyllabusText(text: string, department?: string, semester?: number | string): CourseMapping[] {
  if (!text || !text.trim()) return [];

  const results: CourseMapping[] = [];
  const lines = text.split(/\r?\n/);

  // RegEx patterns for paper codes
  const codeRegex = /\b([A-Z]{2,5}[-\s]?[0-9]{3}[L]?|[A-Z]{2,4}[-\s]?[0-9]{2,3})\b/i;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.length < 5) continue;

    const codeMatch = trimmed.match(codeRegex);
    if (codeMatch) {
      const code = codeMatch[1].toUpperCase();
      // clean title by removing code and special chars
      let title = trimmed.replace(codeMatch[0], '').replace(/^[:-–—\s]+|[:-–—\s]+$/g, '');
      title = title.replace(/\b(Course Code|Paper Code|Subject Name|Code|Subject|Lab)\b/gi, '').trim();

      if (title.length >= 3 && !title.toLowerCase().includes('page') && !title.toLowerCase().includes('syllabus')) {
        results.push({
          title: title,
          code: code,
          department: department || 'Imported PDF',
          semester: semester,
          scheme: 'Custom',
        });
      }
    }
  }

  return results;
}


