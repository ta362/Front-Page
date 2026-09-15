export interface FaqItem {
  question: string;
  answer: string;
  category: 'General' | 'Formatting' | 'Export & Printing' | 'TCEA & Colleges';
}

export const FAQ_DATA: FaqItem[] = [
  {
    question: 'Is this Cover Page Generator completely free to use?',
    answer: 'Yes! The Assignment & Lab Copy Cover Page Generator is 100% free to use for all students, school pupils, and college scholars. There are no paywalls, subscriptions, or hidden charges.',
    category: 'General'
  },
  {
    question: 'How do I export my cover page as a PDF or high-resolution image?',
    answer: 'Once you fill in your details in the editor, click "Generate Preview" or view the live A4 preview panel. You can then click "Export JPG", "Export PNG", "Export PDF", or "Print" to download a 300 DPI high-definition document ready for submission.',
    category: 'Export & Printing'
  },
  {
    question: 'Which college and department presets are available?',
    answer: 'We feature instant presets for Techno College of Engineering Agartala (TCEA) including ECE, CSE, EE, CE, ME, and BSH departments with auto-filled faculty names and course codes. You can also type any custom University, Institute, or School name freely in the text box.',
    category: 'TCEA & Colleges'
  },
  {
    question: 'How do I add sequential numbers like "Assignment 1" or "Lab Copy 2"?',
    answer: 'Use the sleek [- 1 +] stepper control located right next to the "Submission Type" field. Clicking "+" automatically increments the submission number (e.g. Assignment 1, Assignment 2), and clicking "-" decrements or resets it.',
    category: 'Formatting'
  },
  {
    question: 'What font styles are supported for university compliance?',
    answer: 'You can choose between classical academic typography standards: Times New Roman (recommended for B.Tech, Diploma, and Science lab copies), EB Garamond (classic literature and thesis style), and Cinzel (formal decorative style).',
    category: 'Formatting'
  },
  {
    question: 'Are my personal details stored on any external server?',
    answer: 'No. All entered information (student name, roll number, college name, teacher designation) is strictly processed locally on your own browser and saved in browser LocalStorage. No private student credentials are ever sent to remote servers.',
    category: 'General'
  },
  {
    question: 'What are the correct printer settings for printing on A4 paper?',
    answer: 'Set Paper Size to A4, Margins to None (or 0mm), Scale to 100% (Actual Size), enable "Background Graphics", and disable "Headers and Footers" to prevent browser URLs from appearing on paper edges.',
    category: 'Export & Printing'
  },
  {
    question: 'Can I upload my own custom college logo?',
    answer: 'Yes! In Section 1 under Logo Selection, click "Upload Custom Logo" to upload any PNG, JPG, or SVG image file from your device. You can also adjust the logo size with the live slider.',
    category: 'Formatting'
  },
  {
    question: 'Is this web application installable on Android and iOS devices?',
    answer: 'Yes! This app is a fully compliant Progressive Web App (PWA). You can click "Install App" in the navigation bar to install it as a lightweight native app on your Android smartphone or tablet.',
    category: 'General'
  },
  {
    question: 'Who developed this platform?',
    answer: 'This platform was designed and developed by Tanmoy Das, student of the Electronics & Communication Engineering (ECE) Department (Batch 2024-27) at Techno College of Engineering Agartala.',
    category: 'General'
  }
];
