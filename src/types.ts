export type SubmissionType = 
  | 'Assignment'
  | 'Lab Copy'
  | 'Project Report'
  | 'Thesis / Dissertation'
  | 'Term Paper'
  | 'Practical Notebook'
  | 'Case Study';

export type BorderStyle = 'none' | 'classic-double' | 'simple-single' | 'ornate-corners' | 'minimal' | 'academic-crest';

export interface CoverPageFormData {
  college: string;
  course: string;
  courseCode: string;
  submissionType: SubmissionType | string;
  teacher: string;
  designation: string;
  department: string;
  student: string;
  studentId: string;
  roll: string;
  reg: string;
  semester: string;
  session: string;
  date: string; // YYYY-MM-DD
  logoUrl: string; // Base64 data URI or asset URL
  logoSize: number; // in pixels (e.g. 150-200)
  borderStyle: BorderStyle;
  showWatermark: boolean;
  fontTheme: 'times' | 'garamond' | 'cinzel';
  accentColor: string;
  layoutMode?: 'side-by-side' | 'stacked';
}

export interface ValidationErrors {
  college?: string;
  course?: string;
  courseCode?: string;
  submissionType?: string;
  teacher?: string;
  designation?: string;
  department?: string;
  student?: string;
  studentId?: string;
  roll?: string;
  reg?: string;
  semester?: string;
  session?: string;
  date?: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  text: string;
}
