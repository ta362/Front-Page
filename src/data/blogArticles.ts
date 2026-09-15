export interface BlogArticle {
  id: string;
  title: string;
  category: 'Formatting' | 'Academic Rules' | 'Printing' | 'TCEA Special';
  readTime: string;
  date: string;
  author: string;
  summary: string;
  content: string;
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'academic-cover-page-formatting-guide',
    title: 'Complete Academic Cover Page Formatting Guide for Indian Universities & Colleges',
    category: 'Formatting',
    readTime: '6 min read',
    date: 'September 14, 2026',
    author: 'Academic Advisory Board',
    summary: 'Learn the official formatting standards for college cover pages including typography, logo placement, margin alignment, and department details required by MAKAUT, TBSE, Tripura University, and Maulana Abul Kalam Azad University.',
    content: `
# Complete Academic Cover Page Formatting Guide for Indian Universities & Colleges

A cover page is the very first impression of your academic submission. Whether you are submitting a daily assignment, a semester lab copy, a minor project report, or a final-year B.Tech thesis, following a standardized academic format is essential for maintaining professional presentation and earning top grades.

---

## 1. Core Elements of a Standard Academic Cover Page

Every university and technical institute in India requires specific mandatory details on the front cover page:

### A. Institution Branding (Header)
* **College / University Name**: Written in bold, uppercase, centered display typography (e.g., *TIMES NEW ROMAN*, size 20–24 pt).
* **Official Academic Emblem / Logo**: Centered immediately below the institution name. The emblem must maintain its original aspect ratio and clear contrast against the white background.
* **Department & Faculty Name**: E.g., *Department of Electronics & Communication Engineering*.

### B. Title & Submission Categorization
* **Submission Type Tag**: Clear label indicating whether it is an *Assignment*, *Lab Copy*, *Project Report*, *Term Paper*, or *Thesis*.
* **Course Title & Subject Code**: Official university course name and course code (e.g., *Microwave & Fiber Optic Communication Lab*, Code: *PC EC 605*).
* **Assignment / Experiment Number**: For sequential lab submissions or numbered assignments (e.g., *Assignment No. 1* or *Lab Experiment No. 04*).

### C. Submission Hierarchy (Submitted To & Submitted By)
* **Submitted To (Faculty / Evaluator)**:
  * Full Name of Faculty Member with prefix (Prof. / Dr. / Mr. / Ms.)
  * Academic Designation (e.g., *Assistant Professor*, *Head of Department*, *Associate Professor*)
  * Department & Institute Affiliation
* **Submitted By (Student Details)**:
  * Full Official Name of the Student (in CAPITAL letters)
  * University Registration Number (Reg. No.)
  * Class Roll Number & Student ID
  * Semester & Branch / Specialization
  * Academic Session (e.g., *2024–2027* or *2026–2027*)

---

## 2. Typography & Alignment Rules

1. **Font Pairings**:
   * **Times New Roman**: The global standard for formal academic papers, engineering lab copies, and thesis manuscripts.
   * **EB Garamond**: Preferred for humanities, research papers, and classical reports.
   * **Cinzel**: Elegant for decorative titles and university header crests.
2. **Page Dimensions**: Standard A4 size (**210 mm × 297 mm**) with equal 15mm–20mm margins on all four sides.
3. **Color Scheme**: Clean monochrome (black text on white paper) or subtle dark navy/slate accents. High-contrast elements ensure clear legibility when printed on laser printers.

---

## 3. Common Errors That Lead to Grade Deductions

* **Handwritten or Cropped Logos**: Always use clean SVG or high-resolution PNG logos with white or transparent backgrounds.
* **Incorrect Course Codes**: Verify the course code from your syllabus syllabus copy before printing.
* **Spelling Mistakes in Faculty Names**: Always double-check faculty designations and honorifics.
* **Missing Registration Numbers**: University evaluators categorize answer scripts and cover pages strictly by Registration Number and Roll Number.

---

## Conclusion

Using an automated generator ensures that margins, typography, logo alignment, and line spacing comply 100% with university submission guidelines.
    `
  },
  {
    id: 'tcea-engineering-lab-report-guidelines',
    title: 'Techno College of Engineering Agartala (TCEA) Lab Report & Assignment Guidelines',
    category: 'TCEA Special',
    readTime: '5 min read',
    date: 'September 12, 2026',
    author: 'Tanmoy Das (ECE Dept, TCEA)',
    summary: 'A specialized guide for TCEA students detailing the exact cover page requirements, department presets, faculty honorifics, and printing steps for B.Tech & Diploma lab copies.',
    content: `
# Techno College of Engineering Agartala (TCEA) Lab Report & Assignment Guidelines

Techno College of Engineering Agartala (TCEA), affiliated with Tripura University (A Central University) and approved by AICTE, follows strict academic submission policies for engineering assignments, laboratory practical notebooks, and semester project evaluations.

---

## 1. TCEA Official Emblem & Red Crest Usage

* The official **TCEA Red Star Emblem** features the signature red star crest with academic torch motifs and clear college lettering.
* On all formal A4 cover pages, the emblem must be placed cleanly below the course title or at the center header without distortion.
* High-resolution SVG rendering guarantees crisp vector output when printed on standard 75–80 GSM A4 paper.

---

## 2. Department-wise Presets at TCEA

TCEA covers multiple B.Tech and Diploma streams:
* **Department of Electronics & Communication Engineering (ECE)**
* **Department of Computer Science & Engineering (CSE)**
* **Department of Electrical Engineering (EE)**
* **Department of Civil Engineering (CE)**
* **Department of Mechanical Engineering (ME)**
* **Department of Basic Science & Humanities (BSH)**

When filling out your cover page, select your exact department preset to automatically configure official faculty names, designations, and department titles.

---

## 3. Required Student Credentials for TCEA Submissions

* **Student Full Name**: Must match the official college ID card.
* **University Roll Number**: E.g., *2467030082*.
* **University Registration Number**: E.g., *003732*.
* **Semester & Session**: Specify exact branch and semester (e.g., *B.Tech 6th Semester, Session 2026–2027*).

---

## 4. How to Generate & Print Your TCEA Cover Page

1. Select **Submission Type** (e.g., *Assignment 1*, *Lab Copy*, *Project Report*).
2. Choose **Techno College of Engineering Agartala** from the quick college search.
3. Pick your **Department Preset** to auto-fill course codes and teacher details.
4. Preview the real-time A4 canvas.
5. Click **Download PDF** or **Print A4** to generate a 300 DPI print-ready document.
    `
  },
  {
    id: 'differences-assignment-lab-copy-thesis-covers',
    title: 'Differences Between Assignment, Lab Copy, Project Report & Thesis Cover Pages',
    category: 'Academic Rules',
    readTime: '4 min read',
    date: 'September 10, 2026',
    author: 'Editorial Team',
    summary: 'Understand how the layout, border styles, and terminology change depending on whether you are submitting a daily assignment, a semester lab practical copy, or a final thesis.',
    content: `
# Differences Between Assignment, Lab Copy, Project Report & Thesis Cover Pages

While all academic cover pages share common metadata like student name and university, the structural emphasis changes depending on the submission type.

---

## 1. Assignment Cover Pages
* **Key Focus**: Subject name, Course Code, Assignment Number (e.g., *Assignment 1* or *Assignment 2*), and Date of Submission.
* **Border Style**: Minimalist single border or borderless clean layout.
* **Frequency**: Submitted weekly or bi-weekly.

---

## 2. Laboratory Practical Copy (Lab Copy)
* **Key Focus**: Laboratory Subject Title (e.g., *VLSI Design & Communication Lab*), Course Code, Name of the Lab In-charge / Instructor, and Practical Batch number.
* **Border Style**: Double border or academic double frame.
* **Frequency**: Submitted at the end of each experiment or end of semester evaluation.

---

## 3. Minor / Major Project Reports
* **Key Focus**: Full Project Title, Guide / Supervisor Name & Designation, Co-guide details (if any), Group Member names (if team submission), and Academic Year.
* **Border Style**: Formal Academic Crest border or Ornate Double Frame.
* **Documentation**: Bound volume or spiral-bound printout.

---

## 4. Thesis & Dissertation
* **Key Focus**: Full Thesis Title in bold display, Degree for which thesis is submitted (e.g., *Submitted in Partial Fulfillment of the Requirements for the Degree of Bachelor of Technology*), Supervisor Name, Department Seal, and Submission Month & Year.
* **Border Style**: Strict formal double border. No decorative cliparts.
    `
  },
  {
    id: 'a4-print-settings-and-paper-standards',
    title: 'A4 Print Settings, DPI, Margins & Paper Standard Guide',
    category: 'Printing',
    readTime: '5 min read',
    date: 'September 08, 2026',
    author: 'Print Engineering Team',
    summary: 'Ensure 100% pixel-perfect physical prints with zero unwanted margins, proper 300 DPI resolution, and correct browser print settings for chrome, edge, and mobile browsers.',
    content: `
# A4 Print Settings, DPI, Margins & Paper Standard Guide

Printing a cover page cleanly on physical paper requires adjusting your browser print modal to prevent scaling issues, cut-off borders, or header/footer URLs printed on paper edges.

---

## 1. Standard A4 Physical Dimensions
* **Width**: 210 mm (8.27 inches)
* **Height**: 297 mm (11.69 inches)
* **Aspect Ratio**: 1 : 1.414 (√2)
* **Resolution for 300 DPI High-Quality Printing**: 2480 px × 3508 px.

---

## 2. Essential Browser Print Dialog Settings

When you click **Print A4** or open the PDF in your browser print dialog:
1. **Destination**: Select your Color Laser/Inkjet Printer or *Save as PDF*.
2. **Paper Size**: Choose **A4** (Do NOT choose US Letter or Legal).
3. **Margins**: Set to **None** or **Custom (0mm)**. Setting margins to default might shrink the document.
4. **Scale**: Choose **100%** or **Actual Size** (Do NOT select "Fit to printable area").
5. **Headers and Footers**: Uncheck / Disable "Headers and footers" to remove printed URLs, page numbers, or dates at the top and bottom edges.
6. **Background Graphics**: Enable / Check **Background graphics** so vector colors, watermarks, and borders render completely.

---

## 3. Recommended Paper Thickness (GSM)

* **Daily Assignments**: 70–75 GSM Standard Copy Paper.
* **Lab Practical Copies**: 75–80 GSM Bright White Paper.
* **Project Reports & Thesis**: 90–100 GSM Premium Bond Paper or Glossy Cardstock.
    `
  }
];
