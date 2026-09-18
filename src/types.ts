export type SubmissionType = 
  | 'Assignment'
  | 'Lab Copy'
  | 'Project Report'
  | 'Thesis / Dissertation'
  | 'Term Paper'
  | 'Practical Notebook'
  | 'Case Study';

export type BorderStyle = 
  | 'none' 
  | 'classic-double' 
  | 'simple-single' 
  | 'ornate-corners' 
  | 'minimal' 
  | 'academic-crest'
  | 'thick-thin-frame'
  | 'triple-line'
  | 'corner-box'
  | 'top-bottom-bars'
  | 'dashed-formal';

export type LayoutMode = 
  | 'stacked' 
  | 'side-by-side' 
  | 'modern-cards' 
  | 'left-aligned' 
  | 'right-aligned' 
  | 'compact-grid';

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
  studentDepartment?: string;
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
  layoutMode?: LayoutMode;
  fontSizeScale?: 'medium' | 'large' | 'extra-large';
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
  studentDepartment?: string;
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

export interface DownloadNotificationItem {
  id: string;
  title: string;
  fileName: string;
  format: 'PDF' | 'JPG' | 'PNG' | 'PRINT';
  fileSize?: string;
  timestamp: number;
  status: 'processing' | 'completed' | 'failed';
  read: boolean;
  dataUrl?: string;
}

