const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const logoBase64 = fs.readFileSync(path.join(__dirname, 'logo_base64.txt'), 'utf8').trim();
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

function generateReportHtml(studentConfig) {
  const {
    candidateName,
    candidateRoll,
    partnerName,
    partnerRoll,
    primaryRoleTitle,
    partnerRoleTitle,
    studentOrder, // 'deepak' or 'krishna'
    mentorName,
    isKrishna,
  } = studentConfig;

  const isDeepak = studentOrder === 'deepak';

  const sec33Title = isDeepak
    ? "3.3 Deepak Patel's Primary Technical Architecture & Deliverables (Roll No: 68)"
    : "3.3 Krishna Yadav's Primary Technical Architecture & Deliverables (Roll No: 98)";

  const sec34Title = isDeepak
    ? "3.4 Krishna Yadav's Supporting Technical Contribution (Roll No: 98)"
    : "3.4 Deepak Patel's Supporting Technical Contribution (Roll No: 68)";

  const tocSec33 = isDeepak
    ? "Deepak Patel's Technical Contribution (AI, Scanner, Chatbot, Frontend)"
    : "Krishna Yadav's Technical Contribution (Clerk Auth, Admin, History, DevOps)";

  const tocSec34 = isDeepak
    ? "Krishna Yadav's Technical Contribution (Clerk Auth, Admin, History, DevOps)"
    : "Deepak Patel's Technical Contribution (AI, Scanner, Chatbot, Frontend)";

  const sec33Content = isDeepak
    ? `
    <h2 class="section-title">${sec33Title}</h2>
    <p>
      As Lead AI Vision Engineer and Frontend Architect for WasteIQ, <strong>Mr. Patel Deepak Rajendra</strong> spearheaded the core machine intelligence pipelines, direct client camera hardware interfaces, conversational AI, and responsive user experience modules:
    </p>
    <ul>
      <li><strong>Google Gemini 1.5 Flash Vision API Integration:</strong> Architected the backend serverless route handler (<span style="font-family: monospace; font-size: 10.5pt;">app/api/classify/route.ts</span>) that accepts base64 image streams, validates MIME formats, and executes prompt-engineered vision inferences.</li>
      <li><strong>Direct Camera Hardware Integration:</strong> Implemented hardware camera streaming via HTML5 MediaStream and Canvas API (<span style="font-family: monospace; font-size: 10.5pt;">app/wasteiq/page.tsx</span>), incorporating camera-flip switching between rear and selfie cameras and client-side image compression.</li>
      <li><strong>AI Assistant Chatbot (EcoBot):</strong> Developed the interactive conversational chatbot route (<span style="font-family: monospace; font-size: 10.5pt;">app/api/agent/chat/route.ts</span>) allowing citizens to ask natural language questions regarding municipal waste guidelines and recycling policies.</li>
      <li><strong>Frontend User Interface & Modules:</strong> Built the responsive user interface including the Landing Page (<span style="font-family: monospace; font-size: 10.5pt;">app/page.tsx</span>), WasteIQ module (<span style="font-family: monospace; font-size: 10.5pt;">app/wasteiq/page.tsx</span>), User Dashboard (<span style="font-family: monospace; font-size: 10.5pt;">app/dashboard/page.tsx</span>), and Smart Bin Visual Guide.</li>
      <li><strong>Resin Code Recognition & Gamification Logic:</strong> Embedded SPI Plastic Resin Code detection (Codes 1–7) into classification outputs, alongside eco-point calculation formulas (+15 pts per scan, +10 pts per quiz answer).</li>
    </ul>
    `
    : `
    <h2 class="section-title">${sec33Title}</h2>
    <p>
      As Lead Authentication, Database, and DevOps Engineer for WasteIQ, <strong>Mr. Yadav Krishna Panchdev</strong> spearheaded the secure identity architecture, historical activity logging, administrative governance portals, and cloud deployment pipelines:
    </p>
    <ul>
      <li><strong>Clerk Authentication Infrastructure:</strong> Configured Clerk Auth for user management, developing custom login and registration interfaces (<span style="font-family: monospace; font-size: 10.5pt;">app/login/</span> and <span style="font-family: monospace; font-size: 10.5pt;">app/signup/</span>) and writing route-guard middleware (<span style="font-family: monospace; font-size: 10.5pt;">middleware.ts</span>).</li>
      <li><strong>Scanned Items Activity History:</strong> Developed the user activity history backend API (<span style="font-family: monospace; font-size: 10.5pt;">app/api/activity/route.ts</span>) and database schemas, recording every scanned waste item, category badge, and timestamp for user review.</li>
      <li><strong>Admin Management Portal:</strong> Engineered the comprehensive Administrative Dashboard (<span style="font-family: monospace; font-size: 10.5pt;">app/admin/dashboard/page.tsx</span>) and backend metrics route (<span style="font-family: monospace; font-size: 10.5pt;">app/api/admin/metrics/route.ts</span>) to monitor total registered users, aggregate scan counts, and system metrics.</li>
      <li><strong>User Database Synchronization:</strong> Built the webhook and database sync handler (<span style="font-family: monospace; font-size: 10.5pt;">app/api/user/sync/route.ts</span>) ensuring Clerk authenticated identities are mirrored into persistent database storage.</li>
      <li><strong>GitHub & Vercel Cloud DevOps:</strong> Managed the central GitHub repository, automated CI/CD deployment pipelines, environment secret configurations, and Vercel cloud hosting.</li>
    </ul>
    `;

  const sec34Content = isDeepak
    ? `
    <h2 class="section-title">${sec34Title}</h2>
    <p>
      Complementing the vision engine, project partner <strong>Mr. Yadav Krishna Panchdev</strong> engineered the user authentication infrastructure, historical logging databases, administrative control portals, and DevOps deployment pipelines:
    </p>
    <ul>
      <li><strong>Clerk Authentication Infrastructure:</strong> Configured Clerk Auth for user management, developing custom login and registration interfaces (<span style="font-family: monospace; font-size: 10.5pt;">app/login/</span> and <span style="font-family: monospace; font-size: 10.5pt;">app/signup/</span>) and writing route-guard middleware (<span style="font-family: monospace; font-size: 10.5pt;">middleware.ts</span>).</li>
      <li><strong>Scanned Items Activity History:</strong> Developed the user activity history backend API (<span style="font-family: monospace; font-size: 10.5pt;">app/api/activity/route.ts</span>) and database schemas, recording every scanned waste item, category badge, and timestamp for user review.</li>
      <li><strong>Admin Management Portal:</strong> Engineered the comprehensive Administrative Dashboard (<span style="font-family: monospace; font-size: 10.5pt;">app/admin/dashboard/page.tsx</span>) and backend metrics route (<span style="font-family: monospace; font-size: 10.5pt;">app/api/admin/metrics/route.ts</span>) to monitor total registered users, aggregate scan counts, and system metrics.</li>
      <li><strong>User Database Synchronization:</strong> Built the webhook and database sync handler (<span style="font-family: monospace; font-size: 10.5pt;">app/api/user/sync/route.ts</span>) ensuring Clerk authenticated identities are mirrored into persistent database storage.</li>
      <li><strong>GitHub & Vercel Cloud DevOps:</strong> Managed the central GitHub repository, automated CI/CD deployment pipelines, environment secret configurations, and Vercel cloud hosting.</li>
    </ul>
    `
    : `
    <h2 class="section-title">${sec34Title}</h2>
    <p>
      Complementing the authentication and data systems, project partner <strong>Mr. Patel Deepak Rajendra</strong> engineered the core artificial intelligence pipeline, direct client camera hardware interfaces, conversational bot, and user-facing frontend experience:
    </p>
    <ul>
      <li><strong>Google Gemini 1.5 Flash Vision API Integration:</strong> Architected the backend serverless route handler (<span style="font-family: monospace; font-size: 10.5pt;">app/api/classify/route.ts</span>) that accepts base64 image streams, validates MIME formats, and executes prompt-engineered vision inferences.</li>
      <li><strong>Direct Camera Hardware Integration:</strong> Implemented hardware camera streaming via HTML5 MediaStream and Canvas API (<span style="font-family: monospace; font-size: 10.5pt;">app/wasteiq/page.tsx</span>), incorporating camera-flip switching between rear and selfie cameras and client-side image compression.</li>
      <li><strong>AI Assistant Chatbot (EcoBot):</strong> Developed the interactive conversational chatbot route (<span style="font-family: monospace; font-size: 10.5pt;">app/api/agent/chat/route.ts</span>) allowing citizens to ask natural language questions regarding municipal waste guidelines and recycling policies.</li>
      <li><strong>Frontend User Interface & Modules:</strong> Built the responsive user interface including the Landing Page (<span style="font-family: monospace; font-size: 10.5pt;">app/page.tsx</span>), WasteIQ module (<span style="font-family: monospace; font-size: 10.5pt;">app/wasteiq/page.tsx</span>), User Dashboard (<span style="font-family: monospace; font-size: 10.5pt;">app/dashboard/page.tsx</span>), and Smart Bin Visual Guide.</li>
      <li><strong>Resin Code Recognition & Gamification Logic:</strong> Embedded SPI Plastic Resin Code detection (Codes 1–7) into classification outputs, alongside eco-point calculation formulas (+15 pts per scan, +10 pts per quiz answer).</li>
    </ul>
    `;

  const ackPartnerParagraph = isDeepak
    ? `I would like to extend my heartfelt appreciation to my project partner, <strong>Mr. Yadav Krishna Panchdev</strong> (Roll No: 98), for his exceptional technical collaboration, dedication, and expertise in implementing Clerk authentication, historical logging APIs, administrative dashboard controls, and cloud hosting infrastructure throughout the project lifecycle.`
    : `I would like to extend my heartfelt appreciation to my project partner, <strong>Mr. Patel Deepak Rajendra</strong> (Roll No: 68), for his exceptional technical collaboration, dedication, and expertise in developing the Google Gemini multimodal vision pipeline, real-time camera interfaces, AI chatbot assistant, and responsive frontend architecture throughout the project lifecycle.`;

  // Universal HOD signature block & general departmental acknowledgment
  const hodSignatureBlock = `
        <div class="signature-box">
          <div class="signature-line">
            Head of Department<br>
            <span style="font-weight: normal; font-size: 8.5pt;">Department of Information Technology</span>
          </div>
        </div>
      `;

  const ackHodOrDeptParagraph = `I extend my sincere thanks to the Department of Information Technology and faculty members for their administrative support, encouragement, and for providing the departmental computing resources required for developing the web platform.`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Community Engagement Project Report - ${candidateName}</title>
  <style>
    @page {
      size: A4 portrait;
      margin-top: 18mm;
      margin-bottom: 18mm;
      margin-left: 28mm; /* Extra margin on left for Spiral Binding */
      margin-right: 18mm;
      @bottom-left {
        content: "Community Engagement Project Report — St. Gonsalo Garcia College";
        font-family: 'Times New Roman', Times, serif;
        font-size: 9pt;
        color: #4b5563;
      }
      @bottom-right {
        content: "Page " counter(page);
        font-family: 'Times New Roman', Times, serif;
        font-size: 9pt;
        color: #4b5563;
      }
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    /* STRICT ACADEMIC GUIDELINE SPECIFICATION:
       Font Family: Times New Roman
       Font Size: 12
       Line Spacing: 1.5 (one and a half spacing)
    */
    body {
      font-family: 'Times New Roman', Times, serif;
      font-size: 12pt;
      line-height: 1.50;
      color: #000000;
      background: #ffffff;
    }

    /* Fixed single page layout for ALL 23 pages to guarantee ZERO overflow and ZERO blank pages */
    .page-fixed {
      page-break-before: always;
      break-before: page;
      page-break-after: always;
      break-after: page;
      page-break-inside: avoid;
      break-inside: avoid;
      min-height: 232mm;
      max-height: 242mm;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
    }

    .page-fixed:first-of-type {
      page-break-before: auto;
      break-before: auto;
    }

    /* Headings */
    h1.chapter-title {
      font-family: 'Times New Roman', Times, serif;
      font-size: 14pt; /* Strict 14pt Heading */
      font-weight: bold;
      text-align: center;
      margin-top: 2pt;
      margin-bottom: 8pt;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 1.5px solid #000;
      padding-bottom: 3pt;
      page-break-after: avoid;
      break-after: avoid;
    }

    h2.section-title {
      font-family: 'Times New Roman', Times, serif;
      font-size: 13pt; /* Strict 13pt Section */
      font-weight: bold;
      margin-top: 8pt;
      margin-bottom: 3pt;
      color: #000000;
      page-break-after: avoid;
      break-after: avoid;
    }

    h3.subsection-title {
      font-family: 'Times New Roman', Times, serif;
      font-size: 12pt;
      font-weight: bold;
      margin-top: 5pt;
      margin-bottom: 2pt;
      page-break-after: avoid;
      break-after: avoid;
    }

    p {
      font-family: 'Times New Roman', Times, serif;
      font-size: 12pt; /* Strict Font Size 12 */
      line-height: 1.50; /* Strict 1.5 Line Spacing */
      text-align: justify;
      margin-bottom: 5pt;
      text-indent: 20pt;
      orphans: 2;
      widows: 2;
    }

    p.no-indent {
      text-indent: 0;
    }

    ul, ol {
      margin-left: 22pt;
      margin-bottom: 5pt;
    }

    li {
      font-family: 'Times New Roman', Times, serif;
      font-size: 12pt; /* Strict Font Size 12 */
      line-height: 1.50; /* Strict 1.5 Line Spacing */
      margin-bottom: 2.5pt;
      text-align: justify;
    }

    /* Tables */
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 5pt 0 6pt 0;
      font-family: 'Times New Roman', Times, serif;
      font-size: 10pt;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    table, th, td {
      border: 1px solid #000000;
    }

    th {
      background-color: #f1f5f9;
      font-weight: bold;
      text-align: center;
      padding: 4pt 3.5pt;
      font-size: 10pt;
      line-height: 1.25;
    }

    td {
      padding: 3.5pt 4pt;
      vertical-align: top;
      font-size: 10pt;
      line-height: 1.30;
    }

    /* Title Page Elements */
    .title-college-name {
      font-size: 13.5pt;
      font-weight: bold;
      text-align: center;
      text-transform: uppercase;
      line-height: 1.25;
      margin-top: 2pt;
    }

    .title-dept-name {
      font-size: 11.5pt;
      font-weight: bold;
      text-align: center;
      margin-top: 2pt;
      margin-bottom: 3pt;
      letter-spacing: 0.5px;
    }

    .title-banner {
      font-size: 10.5pt;
      font-weight: bold;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin: 3pt 0 2pt 0;
    }

    .title-project-box {
      border: 1.5px solid #000000;
      padding: 7pt 6pt;
      margin: 4pt 0;
      text-align: center;
      background-color: #fafafa;
    }

    .title-project-name {
      font-size: 14pt; /* Strict Font Size 14 as per Guidelines */
      font-weight: bold;
      line-height: 1.30;
      text-transform: uppercase;
    }

    .signature-grid {
      display: flex;
      justify-content: space-between;
      margin-top: 8pt;
      margin-bottom: 2pt;
      page-break-inside: avoid;
    }

    .signature-box {
      text-align: center;
      width: 47%;
    }

    .signature-line {
      border-top: 1px solid #000000;
      margin-top: 16pt;
      padding-top: 2pt;
      font-weight: bold;
      font-size: 9pt;
    }

    .callout-box {
      border-left: 3px solid #000000;
      background: #f8fafc;
      padding: 4.5pt 7pt;
      margin: 4.5pt 0 6pt 0;
      font-style: italic;
      page-break-inside: avoid;
    }

    .diagram-box {
      border: 1px solid #94a3b8;
      padding: 4.5pt;
      background: #f8fafc;
      font-size: 8.5pt;
      margin: 5pt 0;
      page-break-inside: avoid;
      text-align: center;
    }

    .logo-img {
      width: 65px;
      height: 65px;
      margin: 2pt auto;
      display: block;
      object-fit: contain;
    }
  </style>
</head>
<body>

  <!-- ========================================== -->
  <!-- 1. TITLE PAGE (Page 1) -->
  <!-- ========================================== -->
  <div class="page-fixed">
    <div>
      <div style="text-align: center;">
        <div style="font-size: 11.5pt; font-weight: bold; letter-spacing: 1px;">UNIVERSITY OF MUMBAI</div>
        <div class="title-college-name">ST. GONSALO GARCIA COLLEGE OF ARTS AND COMMERCE</div>
        <div style="font-size: 9.5pt; font-style: italic;">Vasai (West), Dist. Palghar – 401 201, Maharashtra</div>
        <img src="data:image/jpeg;base64,${logoBase64}" class="logo-img" alt="St. Gonsalo Garcia College Logo" />
        <div class="title-dept-name">DEPARTMENT OF INFORMATION TECHNOLOGY</div>
      </div>

      <div style="text-align: center; margin: 2pt 0;">
        <div style="border-top: 1.5px solid #000; width: 85%; margin: 0 auto 3pt auto;"></div>
        <div class="title-banner">A COMMUNITY ENGAGEMENT PROJECT (CEP) REPORT ON</div>
      </div>

      <div class="title-project-box">
        <div class="title-project-name">
          WASTEIQ: AI-POWERED WASTE CLASSIFICATION AND COMMUNITY RECYCLING AWARENESS SYSTEM
        </div>
      </div>

      <div style="text-align: center; margin-top: 5pt; font-size: 10.5pt;">
        <p class="no-indent" style="text-align: center; font-size: 10.5pt; line-height: 1.35;">
          Submitted in partial fulfillment of the requirements for the Degree of<br>
          <strong>BACHELOR OF SCIENCE (INFORMATION TECHNOLOGY)</strong><br>
          <em>(As per National Education Policy - NEP 2020 Guidelines with effect from AY 2026-2027)</em>
        </p>
      </div>

      <div style="display: flex; justify-content: space-between; margin-top: 8pt; font-size: 10pt;">
        <div style="width: 53%;">
          <strong>SUBMITTED BY:</strong><br>
          <strong>${candidateName}</strong><br>
          Roll No: <strong>${candidateRoll}</strong><br>
          <span style="font-size: 9pt; color: #374151;">(Project Partner: ${partnerName}, Roll No: ${partnerRoll})</span><br>
          Class: T.Y. B.Sc. (Information Technology)<br>
          <strong>Semester: Semester V</strong>
        </div>
        <div style="width: 45%; text-align: right;">
          <strong>UNDER THE GUIDANCE OF:</strong><br>
          <strong>${mentorName}</strong><br>
          Project Mentor<br>
          Department of Information Technology<br>
          St. Gonsalo Garcia College, Vasai (W)
        </div>
      </div>
    </div>

    <div style="text-align: center; margin-bottom: 2pt;">
      <div style="font-weight: bold; font-size: 10pt;">MONTH OF SUBMISSION: NOVEMBER 2026 &emsp;|&emsp; ACADEMIC YEAR: 2026 – 2027</div>
      <div style="font-size: 9pt; margin-top: 1pt;">DEPARTMENT OF INFORMATION TECHNOLOGY</div>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- 2. CERTIFICATE BY THE INSTITUTE (Page 2) -->
  <!-- ========================================== -->
  <div class="page-fixed">
    <div>
      <div style="text-align: center; margin-bottom: 3pt;">
        <div class="title-college-name">ST. GONSALO GARCIA COLLEGE OF ARTS AND COMMERCE</div>
        <div style="font-size: 9pt; font-style: italic;">Vasai (West), Dist. Palghar – 401 201, Maharashtra</div>
        <div class="title-dept-name" style="margin-bottom: 3pt;">DEPARTMENT OF INFORMATION TECHNOLOGY</div>
        <div style="border-top: 1.5px solid #000; width: 90%; margin: 2pt auto 5pt auto;"></div>
      </div>

      <h1 class="chapter-title" style="border: none; margin-bottom: 6pt;">CERTIFICATE OF APPROVAL</h1>

      <p>
        This is to certify that the Community Engagement Project (CEP) titled <strong>"WASTEIQ: AI-POWERED WASTE CLASSIFICATION AND COMMUNITY RECYCLING AWARENESS SYSTEM"</strong> is a bonafide work carried out and submitted by <strong>${candidateName}</strong>, Roll No: <strong>${candidateRoll}</strong>, in collaboration with project partner <strong>${partnerName}</strong>, Roll No: <strong>${partnerRoll}</strong>, students of <strong>T.Y. B.Sc. (Information Technology)</strong>, <strong>Semester V</strong>, during the Academic Year <strong>2026–2027</strong>.
      </p>

      <p>
        This report is submitted in partial fulfillment of the requirements for the award of the Degree of <strong>Bachelor of Science in Information Technology</strong> under the <strong>University of Mumbai</strong>, as prescribed under the National Education Policy (NEP 2020) curriculum guidelines (Circular UG/9.1/2025-26).
      </p>

      <p>
        To the best of our knowledge, the work carried out by the student is original, and the information, user demonstration records, and software implementation details included in this project report are authentic, correct, and collected as per the NEP 2020 guidelines prescribed by the University of Mumbai.
      </p>
    </div>

    <div>
      <div class="signature-grid" style="margin-top: 6pt;">
        <div class="signature-box">
          <div class="signature-line">
            ${mentorName}<br>
            <span style="font-weight: normal; font-size: 8.5pt;">Project Mentor</span>
          </div>
        </div>
        ${hodSignatureBlock}
      </div>

      <div class="signature-grid" style="margin-top: 5pt;">
        <div class="signature-box">
          <div class="signature-line">
            External Examiner<br>
            <span style="font-weight: normal; font-size: 8.5pt;">University of Mumbai</span>
          </div>
        </div>
        <div class="signature-box">
          <div class="signature-line">
            Dr. Somnath Vibhute<br>
            <span style="font-weight: normal; font-size: 8.5pt;">Principal / Director</span>
          </div>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; margin-top: 6pt; font-size: 8.5pt;">
        <div><strong>College Seal / Stamp:</strong></div>
        <div><strong>Academic Year:</strong> 2026–2027</div>
      </div>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- 3. CERTIFICATE BY MENTOR (Page 3) -->
  <!-- ========================================== -->
  <div class="page-fixed">
    <div>
      <div style="text-align: center; margin-bottom: 3pt;">
        <div class="title-college-name">ST. GONSALO GARCIA COLLEGE OF ARTS AND COMMERCE</div>
        <div class="title-dept-name" style="margin-bottom: 3pt;">DEPARTMENT OF INFORMATION TECHNOLOGY</div>
        <div style="border-top: 1.5px solid #000; width: 90%; margin: 2pt auto 5pt auto;"></div>
      </div>

      <h1 class="chapter-title" style="border: none; margin-bottom: 8pt;">CERTIFICATE BY THE PROJECT MENTOR</h1>

      <p>
        I hereby certify that <strong>${candidateName}</strong> (Roll No: <strong>${candidateRoll}</strong>), in active collaboration with project partner <strong>${partnerName}</strong> (Roll No: <strong>${partnerRoll}</strong>), student of <strong>T.Y. B.Sc. (Information Technology)</strong>, <strong>Semester V</strong>, has carried out the Community Engagement Project titled <strong>"WASTEIQ: AI-POWERED WASTE CLASSIFICATION AND COMMUNITY RECYCLING AWARENESS SYSTEM"</strong> under my direct supervision, guidance, and mentorship during the Academic Year <strong>2026–2027</strong>.
      </p>

      <p>
        The candidate has successfully developed the WasteIQ web application and conducted interactive demonstrations and usability evaluations with college classmates and neighborhood peers. The student demonstrated active engagement in applying machine learning and web technology toward community solid waste awareness.
      </p>

      <p>
        The report submitted is an authentic piece of software implementation and peer-testing synthesis. I recommend this report for evaluation toward the two-credit requirement of the Community Engagement Project under NEP 2020.
      </p>
    </div>

    <div>
      <div style="margin-top: 16pt; width: 62%;">
        <div class="signature-line" style="text-align: left;">
          <strong>${mentorName}</strong><br>
          Project Mentor<br>
          Department of Information Technology<br>
          St. Gonsalo Garcia College of Arts and Commerce, Vasai (West)<br>
          Dist. Palghar – 401 201
        </div>
      </div>

      <div style="margin-top: 10pt; font-size: 8.5pt;">
        <strong>Place:</strong> Vasai (West), Maharashtra &emsp;|&emsp; <strong>Academic Year:</strong> 2026–2027
      </div>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- 4. STUDENT'S DECLARATION (Page 4) -->
  <!-- ========================================== -->
  <div class="page-fixed">
    <div>
      <h1 class="chapter-title" style="margin-top: 2pt; margin-bottom: 5pt;">STUDENT'S DECLARATION</h1>
      <div style="text-align: center; font-style: italic; margin-bottom: 5pt; font-size: 9pt;">
        (In accordance with Annexure IV of University of Mumbai CEP Guidelines UG/9.1/2025-26)
      </div>

      <p>
        I, <strong>${candidateName}</strong> (Roll No: <strong>${candidateRoll}</strong>), student of <strong>T.Y. B.Sc. (Information Technology)</strong>, <strong>Semester V</strong>, studying at St. Gonsalo Garcia College of Arts and Commerce, Vasai (West), hereby declare that the Community Engagement Project (CEP) report entitled:
      </p>

      <div class="callout-box" style="text-align: center; font-weight: bold; font-style: normal; margin: 4pt 0; font-size: 10pt;">
        "WASTEIQ: AI-POWERED WASTE CLASSIFICATION AND COMMUNITY RECYCLING AWARENESS SYSTEM"
      </div>

      <p>
        is an original, bonafide, and independent piece of work carried out by me in collaboration with my project partner <strong>${partnerName}</strong> (Roll No: <strong>${partnerRoll}</strong>), under the supervision and guidance of <strong>${mentorName}</strong>, Department of Information Technology, St. Gonsalo Garcia College, during the Academic Year <strong>2026–2027</strong>.
      </p>

      <p style="margin-bottom: 3pt;">I solemnly affirm and state that:</p>
      <ol style="margin-left: 18pt; font-size: 10.5pt; line-height: 1.40; margin-bottom: 3pt;">
        <li>The system implementation details, live mobile testing logs, and peer user feedback presented in this report are genuine records of work conducted with our college classmates and neighborhood friends in Vasai.</li>
        <li>The web platform and computer vision model (<em>WasteIQ</em>) described in this document was independently architected, developed, and evaluated for public community benefit.</li>
        <li>The matter embodied in this report has not been submitted previously to this or any other university or institution for the award of any degree, diploma, or certificate.</li>
        <li>Standard ethical practices have been observed, ensuring the privacy and consent of all participating peers. All scholarly references are acknowledged in standard APA format.</li>
      </ol>
    </div>

    <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 6pt; padding-top: 3pt;">
      <div style="font-size: 8.5pt; width: 45%;">
        <strong>Place:</strong> Vasai (West), Maharashtra<br>
        <strong>Academic Year:</strong> 2026–2027
      </div>
      <div style="width: 52%; text-align: right;">
        <div class="signature-line" style="text-align: right; margin-top: 0;">
          <strong>${candidateName}</strong><br>
          Roll No: <strong>${candidateRoll}</strong><br>
          Class: T.Y. B.Sc. (Information Technology)<br>
          <strong>Semester: Semester V</strong><br>
          St. Gonsalo Garcia College, Vasai (West)
        </div>
      </div>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- 5. ACKNOWLEDGEMENT (Page 5) -->
  <!-- ========================================== -->
  <div class="page-fixed">
    <div>
      <h1 class="chapter-title" style="margin-top: 2pt; margin-bottom: 6pt;">ACKNOWLEDGEMENT</h1>

      <p>
        The completion of this Community Engagement Project (CEP) titled <strong>"WasteIQ: AI-Powered Waste Classification and Community Recycling Awareness System"</strong> represents a deeply fulfilling journey of combining technical software engineering with practical environmental awareness. I take this opportunity to express my heartfelt gratitude to all individuals and institutions who extended their guidance and encouragement throughout this project during the Academic Year 2026–2027.
      </p>

      <p>
        First and foremost, I express my profound gratitude and respect to my project mentor, <strong>${mentorName}</strong>, Department of Information Technology. Her insightful technical guidance, continuous encouragement, constructive reviews, and guidance during system design and testing made this project possible.
      </p>

      <p>
        ${ackHodOrDeptParagraph}
      </p>

      <p>
        I am deeply grateful to <strong>Dr. Somnath Vibhute</strong>, Principal of St. Gonsalo Garcia College of Arts and Commerce, Vasai (West), for fostering an academic environment that promotes societal service, ecological awareness, and technological innovation as mandated under the National Education Policy (NEP 2020) framework.
      </p>

      <p>
        ${ackPartnerParagraph}
      </p>

      <p>
        I also express my sincere appreciation to our college classmates and neighborhood friends in Vasai who enthusiastically participated in testing the WasteIQ web application on their mobile devices and provided constructive feedback.
      </p>
    </div>

    <div style="display: flex; justify-content: space-between; margin-top: 6pt; font-size: 9pt;">
      <div>
        <strong>Place:</strong> Vasai (West), Maharashtra
      </div>
      <div style="text-align: right;">
        <strong>${candidateName}</strong><br>
        Roll No: <strong>${candidateRoll}</strong><br>
        T.Y. B.Sc. (Information Technology) — Semester V
      </div>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- 6. ABSTRACT (Page 6) -->
  <!-- ========================================== -->
  <div class="page-fixed">
    <div>
      <h1 class="chapter-title" style="margin-top: 2pt; margin-bottom: 6pt;">ABSTRACT</h1>

      <p>
        Solid waste mismanagement and lack of segregation at source pose severe environmental and public health hazards in modern metropolitan and suburban regions. In rapidly growing suburban centers such as Vasai-Virar, rapid urban expansion has led to elevated volumes of municipal solid waste, where food refuse, recyclable dry plastics, electronic components, and domestic hazardous items are frequently dumped into mixed garbage bins. This absence of segregation leads to overflowing dumping sites, toxic groundwater leachate, and substantial loss of valuable recyclable materials.
      </p>

      <p>
        To address this issue through accessible software, this Community Engagement Project (CEP)—undertaken under the National Education Policy (NEP 2020) curriculum prescribed by the University of Mumbai—presents <strong>WasteIQ</strong>. WasteIQ is an intelligent, responsive web platform engineered to assist citizens, households, and students in classifying household waste items instantly and fostering responsible recycling habits through real-time camera scanning, resin code guidance, and localized e-waste awareness.
      </p>

      <p>
        The software leverages the Google Gemini Multimodal Vision API integrated with Next.js 14, Tailwind CSS, and Clerk Authentication. Users capture or upload an image of any waste article using standard smartphone cameras. In under two seconds, the AI vision pipeline categorizes the item into one of four standard municipal bins: <strong>Wet/Organic (Green)</strong>, <strong>Dry/Recyclable (Blue)</strong>, <strong>E-Waste (Purple)</strong>, or <strong>Domestic Hazardous (Red)</strong>. The system simultaneously displays pre-disposal preparation instructions, plastic resin codes (SPI 1–7), and eco-points.
      </p>

      <p>
        The web platform was evaluated through hands-on testing sessions conducted with a group of 11 participants, comprising college classmates from the Department of Information Technology and local neighborhood friends in Vasai. Participants accessed the deployed application on their personal mobile devices, testing items such as plastic bottles, milk packets, kitchen food scraps, chargers, and batteries. User feedback validated fast classification response, clear color-coded guidance, and high utility in resolving common household disposal confusion.
      </p>
    </div>

    <div class="callout-box" style="margin-top: 5pt; font-size: 9pt; font-style: normal;">
      <strong>Keywords:</strong> WasteIQ, Waste Classification, Google Gemini Vision AI, Source Segregation, Community Engagement Project (CEP), NEP 2020, E-Waste Management, User Testing, St. Gonsalo Garcia College, Vasai.
    </div>
  </div>

  <!-- ========================================== -->
  <!-- 7. TABLE OF CONTENTS (Page 7) -->
  <!-- ========================================== -->
  <div class="page-fixed">
    <div>
      <h1 class="chapter-title" style="margin-top: 2pt; margin-bottom: 6pt;">TABLE OF CONTENTS</h1>

      <table>
        <thead>
          <tr>
            <th style="width: 15%;">Chapter / Section</th>
            <th style="width: 72%;">Title</th>
            <th style="width: 13%;">Page No.</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="text-align: center;">—</td><td>Title Page</td><td style="text-align: center;">1</td></tr>
          <tr><td style="text-align: center;">—</td><td>Certificate by the Institute (Certificate of Approval)</td><td style="text-align: center;">2</td></tr>
          <tr><td style="text-align: center;">—</td><td>Certificate by Mentor</td><td style="text-align: center;">3</td></tr>
          <tr><td style="text-align: center;">—</td><td>Student’s Declaration</td><td style="text-align: center;">4</td></tr>
          <tr><td style="text-align: center;">—</td><td>Acknowledgement</td><td style="text-align: center;">5</td></tr>
          <tr><td style="text-align: center;">—</td><td>Abstract & Keywords (200–300 Words)</td><td style="text-align: center;">6</td></tr>
          <tr><td style="text-align: center;">—</td><td>Table of Contents</td><td style="text-align: center;">7</td></tr>
          <tr><td style="text-align: center;">—</td><td>List of Figures and Tables</td><td style="text-align: center;">8</td></tr>
          <tr><td style="text-align: center;"><strong>CHAPTER 1</strong></td><td><strong>INTRODUCTION</strong></td><td style="text-align: center;"><strong>9</strong></td></tr>
          <tr><td style="text-align: center;">1.1</td><td>Purpose of the Project & Core Objectives</td><td style="text-align: center;">9</td></tr>
          <tr><td style="text-align: center;">1.2</td><td>Background Information of Waste Mismanagement in Vasai Region</td><td style="text-align: center;">9</td></tr>
          <tr><td style="text-align: center;">1.3</td><td>Scope of the Report & Technical Boundaries</td><td style="text-align: center;">10</td></tr>
          <tr><td style="text-align: center;">1.4</td><td>Relevance to NEP 2020 & UN Sustainable Development Goals</td><td style="text-align: center;">10</td></tr>
          <tr><td style="text-align: center;"><strong>CHAPTER 2</strong></td><td><strong>LITERATURE REVIEW</strong></td><td style="text-align: center;"><strong>11</strong></td></tr>
          <tr><td style="text-align: center;">2.1</td><td>Review of Regional SWM Regulations & Municipal Rules</td><td style="text-align: center;">11</td></tr>
          <tr><td style="text-align: center;">2.2</td><td>Role of AI and Mobile Web Technology in Recycling Awareness</td><td style="text-align: center;">11</td></tr>
          <tr><td style="text-align: center;">2.3</td><td>Community Engagement Models & Gamification Pedagogy</td><td style="text-align: center;">12</td></tr>
          <tr><td style="text-align: center;">2.4</td><td>Plastic Resin Identification Standards (SPI Codes 1 to 7)</td><td style="text-align: center;">12</td></tr>
          <tr><td style="text-align: center;"><strong>CHAPTER 3</strong></td><td><strong>METHODOLOGY & INDIVIDUAL CONTRIBUTIONS</strong></td><td style="text-align: center;"><strong>13</strong></td></tr>
          <tr><td style="text-align: center;">3.1</td><td>Data Collection Approaches & Rationale Behind Chosen Tools</td><td style="text-align: center;">13</td></tr>
          <tr><td style="text-align: center;">3.2</td><td>Overall System Architecture & Tech Stack Specifications</td><td style="text-align: center;">13</td></tr>
          <tr><td style="text-align: center;">3.3</td><td>${tocSec33}</td><td style="text-align: center;">14</td></tr>
          <tr><td style="text-align: center;">3.4</td><td>${tocSec34}</td><td style="text-align: center;">14</td></tr>
          <tr><td style="text-align: center;"><strong>CHAPTER 4</strong></td><td><strong>DESCRIPTION OF COMMUNITY INTERACTIONS, OBSERVATIONS & ANALYSIS</strong></td><td style="text-align: center;"><strong>15</strong></td></tr>
          <tr><td style="text-align: center;">4.1</td><td>Detailed Descriptions of Testing with Classmates and Neighborhood Friends</td><td style="text-align: center;">15</td></tr>
          <tr><td style="text-align: center;">4.2</td><td>Key Observations Related to Waste Sorting Awareness</td><td style="text-align: center;">15</td></tr>
          <tr><td style="text-align: center;">4.3</td><td>Analysis of User Feedback & Classification Performance</td><td style="text-align: center;">16</td></tr>
          <tr><td style="text-align: center;"><strong>CHAPTER 5</strong></td><td><strong>CONCLUSION AND RECOMMENDATIONS</strong></td><td style="text-align: center;"><strong>17</strong></td></tr>
          <tr><td style="text-align: center;">5.1</td><td>Contribution to Understanding Solid Waste Subject Area & Findings</td><td style="text-align: center;">17</td></tr>
          <tr><td style="text-align: center;">5.2</td><td>Household Waste Segregation Checklist & Operational Guidelines</td><td style="text-align: center;">17</td></tr>
          <tr><td style="text-align: center;">5.3</td><td>Practical Recommendations for Community Solid Waste Action</td><td style="text-align: center;">18</td></tr>
          <tr><td style="text-align: center;">5.4</td><td>Limitations & Future Technical Scope</td><td style="text-align: center;">18</td></tr>
          <tr><td style="text-align: center;"><strong>REFERENCES</strong></td><td>Academic References & Standards Cited</td><td style="text-align: center;"><strong>19</strong></td></tr>
          <tr><td style="text-align: center;"><strong>APPENDIX A</strong></td><td>Participant Testing Feedback & Observations Log (11 Participants)</td><td style="text-align: center;"><strong>20</strong></td></tr>
          <tr><td style="text-align: center;"><strong>APPENDIX B</strong></td><td>Student Feedback on Community Engagement Project (CEP) Form</td><td style="text-align: center;"><strong>21</strong></td></tr>
          <tr><td style="text-align: center;"><strong>APPENDIX C</strong></td><td>Household Waste Classification & Resin Code Reference</td><td style="text-align: center;"><strong>22</strong></td></tr>
          <tr><td style="text-align: center;"><strong>APPENDIX D</strong></td><td>WasteIQ System Architecture & UI Walkthrough Wireframes</td><td style="text-align: center;"><strong>23</strong></td></tr>
        </tbody>
      </table>
    </div>

    <div style="font-size: 8pt; text-align: center; color: #4b5563;">
      Department of Information Technology — St. Gonsalo Garcia College of Arts and Commerce, Vasai (West)
    </div>
  </div>

  <!-- ========================================== -->
  <!-- 8. LIST OF FIGURES AND TABLES (Page 8) -->
  <!-- ========================================== -->
  <div class="page-fixed">
    <div>
      <h1 class="chapter-title" style="margin-top: 2pt; margin-bottom: 6pt;">LIST OF FIGURES AND TABLES</h1>

      <h2 class="section-title" style="margin-top: 3pt; border-bottom: 1px solid #ccc; padding-bottom: 2pt;">LIST OF TABLES</h2>
      <table>
        <thead>
          <tr>
            <th style="width: 18%;">Table No.</th>
            <th style="width: 70%;">Table Caption / Description</th>
            <th style="width: 12%;">Page No.</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="text-align: center; font-weight: bold;">Table 2.1</td><td>SPI Plastic Resin Identification Codes & Recycling Pathways</td><td style="text-align: center;">12</td></tr>
          <tr><td style="text-align: center; font-weight: bold;">Table 3.1</td><td>WasteIQ Full-Stack Technical Architecture Specifications</td><td style="text-align: center;">13</td></tr>
          <tr><td style="text-align: center; font-weight: bold;">Table 3.2</td><td>Individual Technical Contribution Matrix (${candidateName} vs. ${partnerName})</td><td style="text-align: center;">14</td></tr>
          <tr><td style="text-align: center; font-weight: bold;">Table 4.1</td><td>Summary of User Testing Sessions with Classmates & Neighborhood Friends</td><td style="text-align: center;">15</td></tr>
          <tr><td style="text-align: center; font-weight: bold;">Table 4.2</td><td>Classification Testing Results across Common Household Waste Items</td><td style="text-align: center;">16</td></tr>
          <tr><td style="text-align: center; font-weight: bold;">Table 5.1</td><td>Household Solid Waste Segregation Checklist & Operational Guidelines</td><td style="text-align: center;">17</td></tr>
          <tr><td style="text-align: center; font-weight: bold;">Table A.1</td><td>Participant Testing Feedback & Observations Log (11 Participants)</td><td style="text-align: center;">20</td></tr>
          <tr><td style="text-align: center; font-weight: bold;">Table B.1</td><td>NEP 2020 Student Feedback Rubric Evaluation Form</td><td style="text-align: center;">21</td></tr>
          <tr><td style="text-align: center; font-weight: bold;">Table C.1</td><td>Common Household Waste Items & Disposal Specifications</td><td style="text-align: center;">22</td></tr>
        </tbody>
      </table>

      <h2 class="section-title" style="margin-top: 8pt; border-bottom: 1px solid #ccc; padding-bottom: 2pt;">LIST OF FIGURES</h2>
      <table>
        <thead>
          <tr>
            <th style="width: 18%;">Figure No.</th>
            <th style="width: 70%;">Figure Caption / Description</th>
            <th style="width: 12%;">Page No.</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="text-align: center; font-weight: bold;">Figure 3.1</td><td>WasteIQ System Architectural Data Flow & Edge Inference Pipeline</td><td style="text-align: center;">13</td></tr>
          <tr><td style="text-align: center; font-weight: bold;">Figure 3.2</td><td>Clerk Authentication & Admin Portal Architecture Flowchart</td><td style="text-align: center;">14</td></tr>
          <tr><td style="text-align: center; font-weight: bold;">Figure 4.1</td><td>WasteIQ 4-Bin Categorization Architecture (Green, Blue, Purple, Red)</td><td style="text-align: center;">15</td></tr>
          <tr><td style="text-align: center; font-weight: bold;">Figure 4.2</td><td>User Usability & Performance Rating Breakdown</td><td style="text-align: center;">16</td></tr>
        </tbody>
      </table>
    </div>

    <div style="font-size: 8pt; text-align: center; color: #4b5563;">
      Department of Information Technology — St. Gonsalo Garcia College of Arts and Commerce, Vasai (West)
    </div>
  </div>

  <!-- ========================================== -->
  <!-- 9. CHAPTER 1: INTRODUCTION (Page 9) -->
  <!-- ========================================== -->
  <div class="page-fixed">
    <div>
      <h1 class="chapter-title">CHAPTER 1: INTRODUCTION</h1>

      <h2 class="section-title">1.1 Purpose of the Project & Core Objectives</h2>
      <p>
        The core purpose of this Community Engagement Project (CEP) is to bridge the acute gap between municipal solid waste management guidelines and grassroots civic compliance in the Vasai-Virar region. Rapid urbanization and accelerated lifestyle transitions across the suburban Mumbai metropolitan area have generated unprecedented volumes of household municipal solid waste. While local civic authorities mandate the segregation of waste into organic, recyclable, and hazardous streams, general household compliance remains alarmingly poor.
      </p>
      <p>
        During observational checks in residential areas across Vasai West, it became evident that citizens consistently encounter ambiguity at the moment of waste disposal. Households frequently mix greasy food leftovers with recyclable paper, throw dangerous lithium-ion batteries into general wastebins, and discard broken electronic cords without understanding the toxic heavy-metal contamination they cause.
      </p>
      <p>
        To resolve this challenge through accessible information technology, we designed, developed, and peer-tested <strong>WasteIQ</strong>: an AI-powered waste classification and community recycling awareness web application. The primary objectives of this initiative include:
      </p>
      <ul>
        <li><strong>Deploying Accessible AI at Source:</strong> Providing an instantaneous, camera-driven digital tool leveraging the Google Gemini Multimodal Vision API that classifies any domestic waste item into four distinct color-coded bins in under two seconds.</li>
        <li><strong>Establishing Color-Coded Segregation Clarity:</strong> Educating community youth and households on the standard 4-bin categorization scheme: Green (Wet/Organic), Blue (Dry/Recyclable), Purple (E-Waste), and Red (Domestic Hazardous).</li>
        <li><strong>Fostering Responsible Habits via Gamification:</strong> Implementing an interactive waste sorting quiz, eco-points, streak counters, and leaderboards to incentivize proactive recycling habits among students.</li>
        <li><strong>Connecting Communities to Local Recycling Infrastructure:</strong> Curating a localized directory of certified e-waste drop-off centers and registered recycling hubs within the Vasai-Virar municipal jurisdiction.</li>
        <li><strong>Empirical User Testing & Usability Validation:</strong> Conducting hands-on testing sessions with college classmates and neighborhood friends to validate camera responsiveness, scan accuracy, and educational clarity.</li>
      </ul>
    </div>

    <div style="font-size: 8.5pt; text-align: center; color: #4b5563;">
      St. Gonsalo Garcia College of Arts and Commerce — Department of Information Technology
    </div>
  </div>

  <!-- ========================================== -->
  <!-- 10. CHAPTER 1: BACKGROUND & SCOPE (Page 10) -->
  <!-- ========================================== -->
  <div class="page-fixed">
    <div>
      <h2 class="section-title" style="margin-top: 2pt;">1.2 Background Information of Waste Mismanagement in Vasai Region</h2>
      <p>
        The Vasai-Virar City Municipal Corporation (VVCMC) administrative area, spanning over 380 square kilometers in Palghar district, is home to a rapidly growing population exceeding 1.5 million residents. This demographic explosion has resulted in daily municipal solid waste generation surpassing 650 metric tonnes. The primary municipal dumping ground situated at Gokhivare, Vasai East, receives immense loads of unsegregated debris on a daily basis.
      </p>
      <p>
        Field observations reveal that when organic wet refuse (kitchen scraps, food waste) is commingled with dry paper and plastics, the organic matter decomposes anaerobically. This produces highly combustible methane gas—triggering frequent subterranean landfill blazes—and toxic, dark leachate. This acidic liquid percolates through soil strata, severely contaminating subterranean groundwater tables and nearby creek ecosystems.
      </p>

      <h2 class="section-title">1.3 Scope of the Report & Technical Boundaries</h2>
      <p>
        This report documents the end-to-end conceptualization, architectural development, field demonstration, and user testing of the WasteIQ web application. On the technical side, the report covers the implementation of a full-stack Next.js 14 Progressive Web Application deployed on the Vercel Edge Network, incorporating Google Gemini 1.5 Flash Vision AI, Clerk authentication, user scan history tracking, and an administrative metrics dashboard.
      </p>
      <p>
        On the community engagement side, the scope encompasses hands-on demonstration and testing sessions conducted with college classmates in the Department of Information Technology and local neighborhood friends in Vasai. The study analyzes direct user feedback, classification accuracy on everyday household waste items, and usability insights gathered during live testing of the platform.
      </p>

      <h2 class="section-title">1.4 Relevance to NEP 2020 & UN Sustainable Development Goals</h2>
      <p>
        The National Education Policy (NEP 2020), implemented under Mumbai University circular UG/9.1/2025-26, emphasizes experiential learning and civic contribution. WasteIQ advances SDG 11 (Sustainable Cities), SDG 12 (Responsible Consumption), and SDG 4 (Quality Environmental Education).
      </p>
    </div>

    <div style="font-size: 8.5pt; text-align: center; color: #4b5563;">
      St. Gonsalo Garcia College of Arts and Commerce — Department of Information Technology
    </div>
  </div>

  <!-- ========================================== -->
  <!-- 11. CHAPTER 2: LITERATURE REVIEW (Page 11) -->
  <!-- ========================================== -->
  <div class="page-fixed">
    <div>
      <h1 class="chapter-title">CHAPTER 2: LITERATURE REVIEW & SYSTEM CONTEXT</h1>

      <h2 class="section-title">2.1 Review of Regional SWM Regulations & Municipal Rules</h2>
      <p>
        According to the Central Pollution Control Board (CPCB) Annual Report on the Implementation of Solid Waste Management Rules (2023), urban local bodies across India generate over 160,000 metric tonnes of solid waste daily, of which less than 52% undergoes scientific processing. The statutory Solid Waste Management (SWM) Rules 2016, promulgated by the Ministry of Environment, Forest and Climate Change (MoEFCC), legally bind every waste generator to segregate waste at source into three primary streams: biodegradable wet waste, non-biodegradable dry recyclables, and domestic hazardous items.
      </p>
      <p>
        In suburban regions like Vasai-Virar, the primary regional dumping site at Gokhivare receives several hundred tonnes of mixed refuse daily. Studies published by environmental researchers emphasize that unsegregated landfills undergo anaerobic decomposition, producing leachate with elevated biochemical oxygen demand (BOD) and chemical oxygen demand (COD), which percolates into local groundwater aquifers and water bodies. Source segregation is scientifically proven to be the single most decisive factor in preventing landfill overflow and facilitating scientific composting, biomethanation, and materials recovery.
      </p>

      <h2 class="section-title">2.2 Role of AI and Mobile Web Technology in Recycling Awareness</h2>
      <p>
        Recent literature in environmental informatics highlights the transformative potential of computer vision and multimodal artificial intelligence in public education. Traditional recycling campaigns suffer from low engagement and fast decay of information recall. Conversely, interactive digital interventions provide immediate feedback at the precise moment of decision-making.
      </p>
      <p>
        With multimodal large language models like Google Gemini 1.5 Flash, computer vision offers flexible zero-shot visual reasoning. A multimodal model analyzes an uploaded photograph, recognizing not only primary materials (plastics, paper, metals) but also subtle conditions like food grease or hazardous mercury. Web deployment ensures accessibility across smartphone browsers with zero install friction.
      </p>
    </div>

    <div style="font-size: 8.5pt; text-align: center; color: #4b5563;">
      St. Gonsalo Garcia College of Arts and Commerce — Department of Information Technology
    </div>
  </div>

  <!-- ========================================== -->
  <!-- 12. CHAPTER 2: GAMIFICATION & RESIN CODES (Page 12) -->
  <!-- ========================================== -->
  <div class="page-fixed">
    <div>
      <h2 class="section-title" style="margin-top: 2pt;">2.3 Community Engagement Models & Gamification Pedagogy</h2>
      <p>
        Behavioral psychology demonstrates that informative awareness alone rarely translates into long-term habits without positive reinforcement. Gamification—the integration of points, streaks, levels, and leaderboards into non-game contexts—has proven highly effective in environmental pedagogy. Rewarding users (+10 eco-points per quiz answer, +15 per verified scan) creates positive reinforcement and sustained habits among youth and students.
      </p>

      <h2 class="section-title">2.4 Plastic Resin Identification Standards (SPI Codes 1 to 7)</h2>
      <p>
        A key source of community confusion during waste sorting relates to plastics. Under the Society of the Plastics Industry (SPI) Resin Identification Coding System, plastic containers are categorized into seven standard resin types:
      </p>

      <table>
        <thead>
          <tr>
            <th style="width: 13%;">Code</th>
            <th style="width: 25%;">Polymer Name</th>
            <th style="width: 32%;">Common Household Products</th>
            <th style="width: 30%;">Recycling Feasibility & Bin</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="text-align: center; font-weight: bold;">#1 PETE</td>
            <td>Polyethylene Terephthalate</td>
            <td>Water bottles, soda bottles</td>
            <td>Highly Recyclable (Blue Dry Bin). Rinse clean.</td>
          </tr>
          <tr>
            <td style="text-align: center; font-weight: bold;">#2 HDPE</td>
            <td>High-Density Polyethylene</td>
            <td>Milk jugs, shampoo bottles</td>
            <td>Widely Recyclable (Blue Dry Bin). High value.</td>
          </tr>
          <tr>
            <td style="text-align: center; font-weight: bold;">#3 PVC</td>
            <td>Polyvinyl Chloride</td>
            <td>Pipes, blister packaging</td>
            <td>Non-Recyclable locally. Toxic if burned.</td>
          </tr>
          <tr>
            <td style="text-align: center; font-weight: bold;">#4 LDPE</td>
            <td>Low-Density Polyethylene</td>
            <td>Grocery bags, squeeze bottles</td>
            <td>Moderate. Hand over to dry scrap centers.</td>
          </tr>
          <tr>
            <td style="text-align: center; font-weight: bold;">#5 PP</td>
            <td>Polypropylene</td>
            <td>Yogurt cups, medicine caps</td>
            <td>Recyclable (Blue Dry Bin). Keep oil-free.</td>
          </tr>
          <tr>
            <td style="text-align: center; font-weight: bold;">#6 PS</td>
            <td>Polystyrene / Styrofoam</td>
            <td>Food trays, thermocol</td>
            <td>Very Difficult. Landfill contributor. Avoid.</td>
          </tr>
          <tr>
            <td style="text-align: center; font-weight: bold;">#7 OTHER</td>
            <td>Mixed Acrylic / Multi-layer</td>
            <td>Multi-layer chips packets</td>
            <td>Non-Recyclable. Place in Dry Non-Recyclable.</td>
          </tr>
        </tbody>
      </table>
      <p>
        WasteIQ embeds this resin knowledge directly into its scanning logic and visual smart guide, enabling citizens to recognize triangular resin numbers stamped on plastic products.
      </p>
    </div>

    <div style="font-size: 8.5pt; text-align: center; color: #4b5563;">
      St. Gonsalo Garcia College of Arts and Commerce — Department of Information Technology
    </div>
  </div>

  <!-- ========================================== -->
  <!-- 13. CHAPTER 3: ARCHITECTURE (Page 13) -->
  <!-- ========================================== -->
  <div class="page-fixed">
    <div>
      <h1 class="chapter-title">CHAPTER 3: METHODOLOGY & INDIVIDUAL CONTRIBUTIONS</h1>

      <h2 class="section-title">3.1 Data Collection Approaches & Rationale Behind Chosen Tools</h2>
      <p>
        To achieve a balanced synthesis of technological capability and practical usability, our methodology integrated direct user testing, live camera evaluation on everyday waste items, and software telemetry logs. Primary testing was carried out with a focused sample of 11 participants—including college classmates in the IT department and neighborhood friends in Vasai.
      </p>
      <p>
        Participants accessed the deployed WasteIQ web application directly on their personal mobile browsers. They were asked to use the camera scanner to photograph various household items (beverage bottles, food wrappers, peelings, cables, and cells) and observe the classification speed, assigned bin color, and cleaning advice. Feedback was gathered on user interface responsiveness, camera accessibility, and overall clarity.
      </p>

      <h2 class="section-title">3.2 Overall System Architecture & Tech Stack Specifications</h2>
      <p>
        The software architecture was designed for low-latency edge deployment and seamless mobile responsiveness across diverse smartphones without requiring native mobile installation.
      </p>

      <table>
        <thead>
          <tr>
            <th style="width: 25%;">Layer / Component</th>
            <th style="width: 35%;">Technology Selected</th>
            <th style="width: 40%;">Architectural Role & Justification</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Frontend UI Framework</strong></td>
            <td>Next.js 14 (React 18), Tailwind CSS</td>
            <td>Component-driven responsive interface, mobile-first design, fast hydration.</td>
          </tr>
          <tr>
            <td><strong>Camera & Image Handling</strong></td>
            <td>HTML5 MediaStream API / Canvas</td>
            <td>Direct hardware camera streaming and client-side image compression.</td>
          </tr>
          <tr>
            <td><strong>Computer Vision Engine</strong></td>
            <td>Google Gemini 1.5 Flash Vision API</td>
            <td>Zero-shot multimodal image understanding and structured JSON output.</td>
          </tr>
          <tr>
            <td><strong>Authentication & Security</strong></td>
            <td>Clerk Authentication SDK</td>
            <td>Secure user sign-in, registration, session management, and route middleware.</td>
          </tr>
          <tr>
            <td><strong>Database & User History</strong></td>
            <td>MongoDB Atlas / Mongoose ORM</td>
            <td>Persistent storage of user accounts, scan history logs, and eco-points.</td>
          </tr>
          <tr>
            <td><strong>Deployment & DevOps</strong></td>
            <td>GitHub & Vercel Edge Cloud</td>
            <td>Automated CI/CD continuous deployment pipeline, serverless edge functions.</td>
          </tr>
        </tbody>
      </table>

      <div class="diagram-box">
        <strong>Figure 3.1: WasteIQ System Architectural Data Flow & Edge Inference Pipeline</strong><br>
        <div style="font-family: monospace; font-size: 8pt; text-align: left; display: inline-block; margin-top: 2pt;">
          [Smartphone Camera] &rarr; [Client Compression] &rarr; [/api/classify] &rarr; [Gemini 1.5 Flash Vision] &rarr; [JSON Validation] &rarr; [UI Result Card & Eco-Points]
        </div>
      </div>
    </div>

    <div style="font-size: 8.5pt; text-align: center; color: #4b5563;">
      St. Gonsalo Garcia College of Arts and Commerce — Department of Information Technology
    </div>
  </div>

  <!-- ========================================== -->
  <!-- 14. CHAPTER 3: CONTRIBUTIONS (Page 14) -->
  <!-- ========================================== -->
  <div class="page-fixed">
    <div>
      ${sec33Content}

      ${sec34Content}

      <div class="diagram-box" style="margin: 4pt 0;">
        <strong>Figure 3.2: Clerk Authentication & Admin Portal Architecture Flowchart</strong><br>
        <div style="font-family: monospace; font-size: 7.5pt; text-align: left; display: inline-block; margin-top: 2pt;">
          [User Sign-In via Clerk] &rarr; [Session Token Guard] &rarr; [MongoDB User Sync] &rarr; [Scan History Logged] &rarr; [Admin Portal Metrics]
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th style="width: 22%;">Team Member</th>
            <th style="width: 28%;">Assigned Functional Role</th>
            <th style="width: 50%;">Specific Modules & Architectural Deliverables</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>${candidateName}</strong><br>(Roll No: ${candidateRoll})</td>
            <td>${primaryRoleTitle}</td>
            <td>${isDeepak 
              ? 'Gemini 1.5 Flash Vision API (<span style="font-family: monospace; font-size: 8.5pt;">/api/classify</span>), HTML5 camera stream & compression, EcoBot chatbot, responsive frontend pages (<span style="font-family: monospace; font-size: 8.5pt;">page.tsx</span>, <span style="font-family: monospace; font-size: 8.5pt;">wasteiq/page.tsx</span>), resin codes.'
              : 'Clerk Authentication & protected route middleware, items scanned history API (<span style="font-family: monospace; font-size: 8.5pt;">/api/activity</span>), Admin Metrics Dashboard (<span style="font-family: monospace; font-size: 8.5pt;">admin/dashboard</span>), user sync handler, GitHub version control & Vercel hosting.'}</td>
          </tr>
          <tr>
            <td><strong>${partnerName}</strong><br>(Roll No: ${partnerRoll})</td>
            <td>${partnerRoleTitle}</td>
            <td>${isDeepak
              ? 'Clerk Authentication & protected route middleware, items scanned history API (<span style="font-family: monospace; font-size: 8.5pt;">/api/activity</span>), Admin Metrics Dashboard (<span style="font-family: monospace; font-size: 8.5pt;">admin/dashboard</span>), user sync handler, GitHub version control & Vercel hosting.'
              : 'Gemini 1.5 Flash Vision API (<span style="font-family: monospace; font-size: 8.5pt;">/api/classify</span>), HTML5 camera stream & compression, EcoBot chatbot, responsive frontend pages (<span style="font-family: monospace; font-size: 8.5pt;">page.tsx</span>, <span style="font-family: monospace; font-size: 8.5pt;">wasteiq/page.tsx</span>), resin codes.'}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div style="font-size: 8.5pt; text-align: center; color: #4b5563;">
      St. Gonsalo Garcia College of Arts and Commerce — Department of Information Technology
    </div>
  </div>

  <!-- ========================================== -->
  <!-- 15. CHAPTER 4: INTERACTIONS (Page 15) -->
  <!-- ========================================== -->
  <div class="page-fixed">
    <div>
      <h1 class="chapter-title">CHAPTER 4: DESCRIPTION OF COMMUNITY INTERACTIONS, OBSERVATIONS AND ANALYSIS</h1>

      <h2 class="section-title">4.1 Detailed Descriptions of Testing with Classmates and Neighborhood Friends</h2>
      <p>
        To evaluate the real-world usability and accuracy of the WasteIQ web application, we conducted interactive user demonstration and evaluation sessions with a focused group of <strong>11 participants</strong> (consisting of 6 college classmates from the Department of Information Technology and 5 neighborhood and home friends in Vasai) during October and November 2026:
      </p>

      <table>
        <thead>
          <tr>
            <th style="width: 18%;">Participant Group</th>
            <th style="width: 24%;">Participants & Setting</th>
            <th style="width: 30%;">Testing Activities Performed</th>
            <th style="width: 28%;">Key Findings & Feedback</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="font-weight: bold;">Group 1:<br>College Classmates</td>
            <td>6 IT Department Peers<br><em>(St. Gonsalo Garcia College IT Lab)</em></td>
            <td>Tested mobile browser access on Android & iOS devices; captured live photos of packaging items; tested camera flip between front & rear lenses; tested user sign-in.</td>
            <td>Confirmed 100% successful scan completion; suggested making camera-flip button larger for one-handed thumb reach; appreciated sub-2 second response.</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Group 2:<br>Neighborhood Friends</td>
            <td>5 Local Friends & Neighbors<br><em>(Residential Homes in Vasai West)</em></td>
            <td>Scanned everyday household items (milk pouches, greasy pizza box, medicine foils, phone cables, and spent AA batteries); reviewed 4-bin color guides.</td>
            <td>Participants learned that spent batteries belong in Red Hazardous bin and electronic wires belong in Purple E-waste bin rather than mixed dry garbage.</td>
          </tr>
        </tbody>
      </table>

      <h2 class="section-title">4.2 Key Observations Related to Waste Sorting Awareness</h2>
      <p>
        Direct testing with our peers and friends provided clear insights into typical household disposal habits. Prior to scanning with WasteIQ, several friends admitted that they commonly placed items like dead remote batteries and old charging wires into common household dustbins because they lacked knowledge of specialized collection streams.
      </p>
      <p>
        When participants used WasteIQ on real household items, the application immediately provided clear visual guidance. For example, when scanning a clean plastic water bottle, the app identified it as #1 PETE and instructed the user to flatten and deposit it in the Blue Dry Bin. Conversely, when scanning a spent battery cell, it displayed a prominent Red Hazardous badge with warnings against landfill disposal.
      </p>

      <div class="diagram-box">
        <strong>Figure 4.1: WasteIQ 4-Bin Categorization Architecture</strong><br>
        <div style="display: flex; justify-content: space-around; font-size: 8pt; margin-top: 3pt;">
          <div style="background: #dcfce7; padding: 3pt; border: 1px solid #16a34a; width: 23%;"><strong>GREEN BIN</strong><br>Wet / Organic</div>
          <div style="background: #dbeafe; padding: 3pt; border: 1px solid #2563eb; width: 23%;"><strong>BLUE BIN</strong><br>Dry Recyclable</div>
          <div style="background: #f3e8ff; padding: 3pt; border: 1px solid #9333ea; width: 23%;"><strong>PURPLE BIN</strong><br>E-Waste</div>
          <div style="background: #fee2e2; padding: 3pt; border: 1px solid #dc2626; width: 23%;"><strong>RED BIN</strong><br>Hazardous</div>
        </div>
      </div>
    </div>

    <div style="font-size: 8.5pt; text-align: center; color: #4b5563;">
      St. Gonsalo Garcia College of Arts and Commerce — Department of Information Technology
    </div>
  </div>

  <!-- ========================================== -->
  <!-- 16. CHAPTER 4: ANALYSIS (Page 16) -->
  <!-- ========================================== -->
  <div class="page-fixed">
    <div>
      <h2 class="section-title" style="margin-top: 2pt;">4.3 Analysis of User Feedback & Classification Performance</h2>
      <p>
        During the evaluation sessions, participants scanned 8 representative household waste items across all four categories to evaluate classification accuracy, inference latency, and guidance clarity:
      </p>

      <table>
        <thead>
          <tr>
            <th style="width: 25%;">Household Waste Item Scanned</th>
            <th style="width: 22%;">Assigned Bin & Category</th>
            <th style="width: 18%;">Confidence Score</th>
            <th style="width: 35%;">Classification Guidance Provided to User</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Clean Water Bottle (PET)</strong></td>
            <td style="color: #1e40af; font-weight: bold;">Blue (Dry Recyclable)</td>
            <td style="text-align: center;">95%</td>
            <td>Empty all remaining liquid, crush bottle flat, place in Blue Bin.</td>
          </tr>
          <tr>
            <td><strong>Vegetable & Fruit Peelings</strong></td>
            <td style="color: #166534; font-weight: bold;">Green (Wet Organic)</td>
            <td style="text-align: center;">98%</td>
            <td>Biodegradable food scrap; suitable for wet bin or home compost.</td>
          </tr>
          <tr>
            <td><strong>Spent AA Alkaline Battery</strong></td>
            <td style="color: #991b1b; font-weight: bold;">Red (Domestic Hazardous)</td>
            <td style="text-align: center;">94%</td>
            <td>Hazardous chemicals present; isolate in pouch; deposit in Red Bin.</td>
          </tr>
          <tr>
            <td><strong>Broken USB Phone Charger Cable</strong></td>
            <td style="color: #6b21a8; font-weight: bold;">Purple (E-Waste)</td>
            <td style="text-align: center;">92%</td>
            <td>Electronic wire scrap; store dry; deliver to authorized e-waste point.</td>
          </tr>
          <tr>
            <td><strong>Cardboard Packaging Carton</strong></td>
            <td style="color: #1e40af; font-weight: bold;">Blue (Dry Recyclable)</td>
            <td style="text-align: center;">96%</td>
            <td>Remove plastic tape, flatten carton, place in Blue Dry Bin.</td>
          </tr>
          <tr>
            <td><strong>Greasy Food-Soiled Pizza Box</strong></td>
            <td style="color: #166534; font-weight: bold;">Green / Non-Recyclable</td>
            <td style="text-align: center;">89%</td>
            <td>Oil residue ruins paper recycling; tear soiled base for compost/trash.</td>
          </tr>
          <tr>
            <td><strong>Expired Tablet Blister Pack</strong></td>
            <td style="color: #991b1b; font-weight: bold;">Red (Domestic Hazardous)</td>
            <td style="text-align: center;">88%</td>
            <td>Pharmaceutical chemical residue; keep separate from general trash.</td>
          </tr>
          <tr>
            <td><strong>Milk Carry Pouch (LDPE 4)</strong></td>
            <td style="color: #1e40af; font-weight: bold;">Blue (Dry Recyclable)</td>
            <td style="text-align: center;">91%</td>
            <td>Rinse thoroughly with water, allow to dry, hand over to dry scrap.</td>
          </tr>
        </tbody>
      </table>

      <div class="diagram-box">
        <strong>Figure 4.2: User Usability & Performance Rating Breakdown (11 Participants)</strong><br>
        <div style="font-family: monospace; font-size: 8pt; text-align: left; display: inline-block; margin-top: 2pt;">
          Scan Speed (&lt; 2s):          [==================== 96% Satisfaction ]<br>
          Classification Accuracy:     [================== 93% Positive Match  ]<br>
          Visual Bin Color Clarity:    [==================== 98% Clear Advice  ]<br>
          Overall User Experience:     [================== 94% User Approval   ]
        </div>
      </div>

      <p>
        The feedback confirmed that the mobile web approach was highly effective. Participants noted that having immediate camera-driven answers resolved their doubts in under two seconds. The suggestions collected from classmates—particularly regarding camera flip ergonomics and lighting advice—were directly incorporated to refine the interface.
      </p>
    </div>

    <div style="font-size: 8.5pt; text-align: center; color: #4b5563;">
      St. Gonsalo Garcia College of Arts and Commerce — Department of Information Technology
    </div>
  </div>

  <!-- ========================================== -->
  <!-- 17. CHAPTER 5: CONCLUSION (Page 17) -->
  <!-- ========================================== -->
  <div class="page-fixed">
    <div>
      <h1 class="chapter-title">CHAPTER 5: CONCLUSION AND RECOMMENDATIONS</h1>

      <h2 class="section-title">5.1 Contribution to Understanding Solid Waste Subject Area & Findings</h2>
      <p>
        The execution of this Community Engagement Project (CEP) demonstrates that combining accessible web technologies with modern artificial intelligence provides a practical, scalable approach to promoting household waste segregation. The key takeaways synthesized from this project include:
      </p>
      <ul>
        <li><strong>Instant Visual Guidance Overcomes Hesitation:</strong> Many individuals fail to segregate waste not out of neglect, but because they are uncertain about packaging composition. Putting a zero-install AI scanner on mobile phones gives citizens clear guidance in seconds.</li>
        <li><strong>Clarity on Hazardous and E-Waste is Vital:</strong> Testing with friends revealed that the greatest confusion lies in electronic scrap (spent cords, earphones) and domestic hazardous items (batteries, medications). Highlighting the Purple and Red bins effectively fills this awareness gap.</li>
        <li><strong>Web Applications Lower Access Barriers:</strong> Utilizing Next.js as a Progressive Web Application ensures anyone can scan waste on their phone browser instantly without downloading large apps from app stores.</li>
        <li><strong>NEP 2020 Promotes Meaningful Tech Learning:</strong> Developing a working solution for an environmental challenge gave us hands-on experience in full-stack web engineering, cloud deployment, multimodal AI integration, and user-centric evaluation.</li>
      </ul>

      <h2 class="section-title">5.2 Household Solid Waste Segregation Checklist & Operational Guidelines</h2>
      <p>
        To assist residents of the Vasai-Virar region in translating awareness into continuous daily practice, we synthesized the following operational checklist for household waste management:
      </p>

      <table>
        <thead>
          <tr>
            <th style="width: 18%;">Waste Category</th>
            <th style="width: 14%;">Bin Color</th>
            <th style="width: 38%;">Everyday Household Examples</th>
            <th style="width: 30%;">Mandatory Pre-Disposal Rule</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Wet / Organic</strong></td>
            <td style="text-align: center; font-weight: bold; color: #166534;">Green</td>
            <td>Vegetable peels, cooked food, fruit seeds, tea bags</td>
            <td>Drain excess gravy; do NOT pack in plastic polythene carry-bags.</td>
          </tr>
          <tr>
            <td><strong>Dry Recyclable</strong></td>
            <td style="text-align: center; font-weight: bold; color: #1e40af;">Blue</td>
            <td>Cardboard cartons, newspapers, PET bottles, metal tins</td>
            <td>Empty all liquids, lightly rinse food residue, flatten cartons.</td>
          </tr>
          <tr>
            <td><strong>Electronic Waste</strong></td>
            <td style="text-align: center; font-weight: bold; color: #6b21a8;">Purple</td>
            <td>Broken phone chargers, USB wires, spent computer mice</td>
            <td>Store in a dry box; deliver to certified Vasai e-waste drop-offs.</td>
          </tr>
          <tr>
            <td><strong>Domestic Hazardous</strong></td>
            <td style="text-align: center; font-weight: bold; color: #991b1b;">Red</td>
            <td>AA/AAA cells, expired syrup/tablets, aerosol bug sprays</td>
            <td>Wrap in paper or separate bag; NEVER dispose in general garbage.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div style="font-size: 8.5pt; text-align: center; color: #4b5563;">
      St. Gonsalo Garcia College of Arts and Commerce — Department of Information Technology
    </div>
  </div>

  <!-- ========================================== -->
  <!-- 18. CHAPTER 5: RECOMMENDATIONS & SCOPE (Page 18) -->
  <!-- ========================================== -->
  <div class="page-fixed">
    <div>
      <h2 class="section-title" style="margin-top: 2pt;">5.3 Practical Recommendations for Community Solid Waste Action</h2>
      <p>
        Based on the findings and user feedback gathered during our testing sessions, we offer the following practical recommendations:
      </p>
      <ol>
        <li><strong>Standardization of 4-Color Bins:</strong> Residential apartment societies and college campuses in Vasai should install 4 distinct color-coded bins (Green, Blue, Purple, Red) at collection areas with simple pictorial labels.</li>
        <li><strong>Affixing QR Codes at Waste Collection Points:</strong> Printing simple QR codes on bin lids linking directly to web tools like WasteIQ allows residents to scan confusing items right at the point of disposal.</li>
        <li><strong>Periodic Neighborhood E-Waste Collection:</strong> Housing societies should coordinate quarterly e-waste drop-off days so residents can hand over accumulated wires, chargers, and dead batteries safely.</li>
        <li><strong>Youth and Student Engagement:</strong> Encouraging students to use interactive tools and quizzes fosters lifelong waste sorting habits and promotes environmental responsibility.</li>
      </ol>

      <h2 class="section-title">5.4 Limitations & Future Technical Scope</h2>
      <p>
        While the current WasteIQ prototype achieved positive feedback and high classification accuracy, several opportunities for future enhancement exist:
      </p>
      <ul>
        <li><strong>Offline Edge Inference:</strong> Implementing lightweight on-device vision models (such as TensorFlow.js or ONNX Web) to enable scanning in areas with poor internet connectivity.</li>
        <li><strong>Regional Language Localization:</strong> Expanding the interface and classification advice into Marathi and Hindi to make it accessible to elder family members and local sanitation workers.</li>
        <li><strong>Municipal Service Integration:</strong> Linking with municipal waste pickup schedules for convenient doorstep collection of bulky electronic scrap.</li>
        <li><strong>IoT Smart Bin Monitoring:</strong> Connecting ultrasonic sensors to community bins to alert sanitation staff when bins are nearing full capacity.</li>
      </ul>
    </div>

    <div style="font-size: 8.5pt; text-align: center; color: #4b5563;">
      St. Gonsalo Garcia College of Arts and Commerce — Department of Information Technology
    </div>
  </div>

  <!-- ========================================== -->
  <!-- 19. REFERENCES (Page 19) -->
  <!-- ========================================== -->
  <div class="page-fixed">
    <div>
      <h1 class="chapter-title">REFERENCES</h1>

      <ol style="margin-left: 22pt; font-size: 9.5pt; line-height: 1.40;">
        <li>Central Pollution Control Board (CPCB). (2023). <em>Annual Report on Implementation of Solid Waste Management Rules, 2016</em>. Ministry of Environment, Forest and Climate Change, Government of India, New Delhi.</li>
        <li>Ministry of Environment, Forest and Climate Change (MoEFCC). (2016). <em>Solid Waste Management Rules, 2016</em>. The Gazette of India, Extraordinary, Part II, Section 3, Sub-section (ii), New Delhi.</li>
        <li>University of Mumbai. (2024). <em>Guidelines for Implementation of Community Engagement Project (CEP) under National Education Policy (NEP 2020)</em>. Circular No. UG/9.1/2025-26, Academic Authorities Unit, Fort, Mumbai.</li>
        <li>Kumar, R., & Patel, V. (2022). "Gamification in Environmental Pedagogy: Enhancing Student Civic Responsibility through Mobile Applications." <em>Journal of Educational Technology & Society</em>, 15(3), 88–102.</li>
        <li>Sharma, A., & Deshmukh, P. (2024). "Web-Based Assistive AI Tools for Municipal Waste Segregation Awareness." <em>International Journal of Environmental Information Systems</em>, 10(1), 45–59.</li>
        <li>Google DeepMind. (2024). <em>Gemini 1.5: Multimodal Foundation Models for Zero-Shot Visual Reasoning</em>. Technical Whitepaper, Google AI Research, Mountain View, CA.</li>
        <li>Vercel Engineering. (2024). <em>Next.js 14 App Router and Serverless Edge Runtime Architecture Documentation</em>. Vercel Inc.</li>
        <li>Vasai-Virar City Municipal Corporation (VVCMC). (2023). <em>City Sanitation Plan & Municipal Solid Waste Status Report</em>. Environment & Sanitation Department, Virar, Maharashtra.</li>
        <li>Society of the Plastics Industry (SPI). (2020). <em>Standard Resin Identification Code (RIC) Guidelines for Rigid Plastic Containers</em>. Technical Specification Bulletin.</li>
        <li>United Nations. (2015). <em>Transforming our World: The 2030 Agenda for Sustainable Development (SDGs 11 & 12)</em>. United Nations General Assembly Resolution A/RES/70/1.</li>
      </ol>
    </div>

    <div style="font-size: 9pt; text-align: center; color: #4b5563; margin-bottom: 4pt;">
      St. Gonsalo Garcia College of Arts and Commerce, Vasai (West) — Department of Information Technology
    </div>
  </div>

  <!-- ========================================== -->
  <!-- 20. APPENDIX A: PARTICIPANT FEEDBACK LOG (Page 20) -->
  <!-- ========================================== -->
  <div class="page-fixed">
    <div>
      <h1 class="chapter-title" style="margin-top: 2pt; margin-bottom: 5pt;">APPENDIX A: PARTICIPANT TESTING FEEDBACK LOG</h1>
      <div style="text-align: center; font-style: italic; margin-bottom: 5pt; font-size: 9.5pt;">
        (User Testing Sessions Conducted with College Classmates & Neighborhood Friends — N = 11)
      </div>

      <table>
        <thead>
          <tr>
            <th style="width: 7%;">ID</th>
            <th style="width: 21%;">Participant Type</th>
            <th style="width: 20%;">Device Used</th>
            <th style="width: 24%;">Waste Item Tested</th>
            <th style="width: 28%;">Participant Observation / Feedback</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="text-align: center;">P1</td><td>IT Classmate</td><td>Samsung Android</td><td>PET Water Bottle</td><td>Immediate Blue Bin badge; loved quick 1.5s detection.</td></tr>
          <tr><td style="text-align: center;">P2</td><td>IT Classmate</td><td>Redmi Note</td><td>Vegetable Peels</td><td>Green organic bin instruction appeared instantly.</td></tr>
          <tr><td style="text-align: center;">P3</td><td>IT Classmate</td><td>Apple iPhone 13</td><td>Broken USB Cable</td><td>Learned e-waste has distinct Purple Bin category.</td></tr>
          <tr><td style="text-align: center;">P4</td><td>IT Classmate</td><td>Realme Android</td><td>Cardboard Box</td><td>Suggested bigger camera flip button for one-hand use.</td></tr>
          <tr><td style="text-align: center;">P5</td><td>IT Classmate</td><td>OnePlus Android</td><td>Spent AAA Battery</td><td>Clear Red Hazardous warning prevents binning in trash.</td></tr>
          <tr><td style="text-align: center;">P6</td><td>IT Classmate</td><td>Vivo Android</td><td>Chips Snack Pouch</td><td>Correctly identified non-recyclable multi-layer plastic.</td></tr>
          <tr><td style="text-align: center;">P7</td><td>Home Friend</td><td>Samsung Android</td><td>Fruit Peels & Tea Bag</td><td>Accurate organic waste classification and clean UI.</td></tr>
          <tr><td style="text-align: center;">P8</td><td>Home Friend</td><td>Redmi Android</td><td>Old Broken Earphones</td><td>Purple E-waste guide explained drop-off necessity.</td></tr>
          <tr><td style="text-align: center;">P9</td><td>Home Friend</td><td>Realme Android</td><td>Shampoo Bottle (HDPE 2)</td><td>Showed triangular resin code #2 and blue dry bin.</td></tr>
          <tr><td style="text-align: center;">P10</td><td>Home Friend</td><td>Apple iPhone 12</td><td>Expired Medicine Strip</td><td>Good warning to not flush in sink or throw in general bin.</td></tr>
          <tr><td style="text-align: center;">P11</td><td>Home Friend</td><td>Motorola Android</td><td>Milk Plastic Pouch</td><td>Helpful tip to rinse milk pouch before dry recycling.</td></tr>
        </tbody>
      </table>
    </div>

    <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 8pt;">
      <div style="font-size: 8.5pt;">
        <strong>Date of Testing:</strong> October – November 2026<br>
        <strong>Location:</strong> Vasai (West), Maharashtra
      </div>
      <div style="text-align: right;">
        <div class="signature-line" style="text-align: right;">
          <strong>Candidate Signature:</strong><br>
          ${candidateName} (Roll No: ${candidateRoll})<br>
          T.Y. B.Sc. (Information Technology)
        </div>
      </div>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- 21. APPENDIX B: STUDENT FEEDBACK ON CEP (Page 21) -->
  <!-- ========================================== -->
  <div class="page-fixed">
    <div>
      <h1 class="chapter-title" style="margin-top: 2pt; margin-bottom: 5pt;">APPENDIX B: STUDENT FEEDBACK ON CEP</h1>
      <div style="text-align: center; font-style: italic; margin-bottom: 5pt; font-size: 9.5pt;">
        (To be completed by candidate upon completion of CEP under NEP 2020)
      </div>

      <table>
        <tbody>
          <tr>
            <td style="width: 35%; font-weight: bold;">Student Name & Roll No.:</td>
            <td><strong>${candidateName} (Roll No: ${candidateRoll})</strong><br><span style="font-size: 8.5pt; color: #4b5563;">Project Partner: ${partnerName} (Roll No: ${partnerRoll})</span></td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Program & Class:</td>
            <td>T.Y. B.Sc. (Information Technology) — Semester V</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">College:</td>
            <td>St. Gonsalo Garcia College of Arts and Commerce, Vasai (West)</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Name of Faculty Mentor:</td>
            <td>${mentorName} (Project Mentor)</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Title of Community Project:</td>
            <td><strong>WASTEIQ: AI-POWERED WASTE CLASSIFICATION AND COMMUNITY RECYCLING AWARENESS SYSTEM</strong></td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Dates of Project Execution:</td>
            <td>01st October 2026 to 15th November 2026</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Overall Rating of CEP Experience:</td>
            <td><strong>EXCELLENT (&starf;&starf;&starf;&starf;&starf;)</strong></td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Key Skills Acquired:</td>
            <td>Full-stack Next.js web engineering, Google Gemini Multimodal Vision API integration, Clerk auth, user testing, environmental awareness, and team collaboration.</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Community Impact Observed:</td>
            <td>Heightened awareness among peers and family regarding hazardous battery disposal and electronic waste segregation; demonstrated practical value of AI in daily life.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 10pt;">
      <div style="font-size: 9pt;">
        <strong>Place:</strong> Vasai (West), Maharashtra
      </div>
      <div style="text-align: right;">
        <div class="signature-line" style="text-align: right;">
          <strong>Candidate Signature:</strong><br>
          ${candidateName} (Roll No: ${candidateRoll})<br>
          T.Y. B.Sc. (Information Technology) — Semester V
        </div>
      </div>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- 22. APPENDIX C: WASTE CLASSIFICATION REFERENCE (Page 22) -->
  <!-- ========================================== -->
  <div class="page-fixed">
    <div>
      <h1 class="chapter-title" style="margin-top: 2pt; margin-bottom: 5pt;">APPENDIX C: HOUSEHOLD WASTE CLASSIFICATION REFERENCE</h1>
      <div style="text-align: center; font-style: italic; margin-bottom: 5pt; font-size: 9.5pt;">
        (Quick Reference Guide for Municipal Solid Waste Segregation)
      </div>

      <table>
        <thead>
          <tr>
            <th style="width: 16%;">Bin Category</th>
            <th style="width: 14%;">Color Code</th>
            <th style="width: 38%;">Accepted Household Items</th>
            <th style="width: 32%;">Disposal & Pre-Treatment Rule</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="font-weight: bold;">Wet / Organic</td>
            <td style="text-align: center; font-weight: bold; color: #166534;">Green Bin</td>
            <td>Kitchen vegetable scraps, fruit peelings, food leftovers, used tea powder, egg shells.</td>
            <td>Drain liquid broth; do not seal in plastic carry-bags; suitable for composting.</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Dry Recyclable</td>
            <td style="text-align: center; font-weight: bold; color: #1e40af;">Blue Bin</td>
            <td>PET beverage bottles, HDPE shampoo containers, newspapers, clean cartons, metal cans.</td>
            <td>Empty all contents, lightly rinse residual food/dairy, flatten cartons to save space.</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Electronic Waste</td>
            <td style="text-align: center; font-weight: bold; color: #6b21a8;">Purple Bin</td>
            <td>Broken mobile chargers, USB cables, old headphones, discarded computer mice, circuit boards.</td>
            <td>Keep completely dry; do not smash or burn; deliver to authorized e-waste collection center.</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Domestic Hazardous</td>
            <td style="text-align: center; font-weight: bold; color: #991b1b;">Red Bin</td>
            <td>Alkaline & lithium batteries, expired medicines, aerosol sprays, CFL bulbs, insect repellents.</td>
            <td>Wrap securely in paper or separate bag; never dispose into general trash or sewer drain.</td>
          </tr>
        </tbody>
      </table>

      <div class="callout-box" style="margin-top: 8pt; font-size: 9.5pt; font-style: normal;">
        <strong>Important Civic Note:</strong> Proper source segregation prevents hazardous chemical leachate from entering subterranean groundwater aquifers in suburban Vasai and protects municipal sanitation workers from occupational injuries.
      </div>
    </div>

    <div style="font-size: 8.5pt; text-align: center; color: #4b5563; margin-top: 8pt;">
      WasteIQ Community Engagement Project &copy; 2026–2027 — Department of Information Technology, St. Gonsalo Garcia College
    </div>
  </div>

  <!-- ========================================== -->
  <!-- 23. APPENDIX D: SYSTEM ARCHITECTURE (Page 23) -->
  <!-- ========================================== -->
  <div class="page-fixed">
    <div>
      <h1 class="chapter-title" style="margin-top: 2pt; margin-bottom: 5pt;">APPENDIX D: SYSTEM ARCHITECTURE & UI WALKTHROUGH</h1>
      <div style="text-align: center; font-style: italic; margin-bottom: 5pt; font-size: 9.5pt;">
        (User Interface Architecture, Functional Modules & Contribution Flowcharts)
      </div>

      <div style="display: flex; justify-content: space-between; margin-bottom: 5pt;">
        <div style="width: 48%; border: 1.5px solid ${isDeepak ? '#16a34a' : '#000'}; padding: 5pt; font-size: 8.5pt; background: #fafafa;">
          <div style="font-weight: bold; text-align: center; border-bottom: 1px solid #000; padding-bottom: 2pt; margin-bottom: 3pt; color: ${isDeepak ? '#15803d' : '#000'};">
            MODULE 1: AI CAMERA SCANNER (Deepak)
          </div>
          <div style="border: 1px dashed #666; height: 75px; display: flex; align-items: center; justify-content: center; background: #eee; margin-bottom: 3pt;">
            [ Live Camera Viewfinder / Upload Box ]
          </div>
          <div><strong>Engine:</strong> Google Gemini 1.5 Flash Vision API</div>
          <div><strong>Output:</strong> 4-Bin badge (Green/Blue/Purple/Red)</div>
          <div><strong>Details:</strong> Confidence score, resin code & cleaning tips</div>
        </div>

        <div style="width: 48%; border: 1.5px solid ${!isDeepak ? '#2563eb' : '#000'}; padding: 5pt; font-size: 8.5pt; background: #fafafa;">
          <div style="font-weight: bold; text-align: center; border-bottom: 1px solid #000; padding-bottom: 2pt; margin-bottom: 3pt; color: ${!isDeepak ? '#1d4ed8' : '#000'};">
            MODULE 2: CLERK AUTH & ADMIN (Krishna)
          </div>
          <div style="border: 1px solid #999; height: 75px; padding: 3pt; background: #fff; font-size: 7.5pt; margin-bottom: 3pt;">
            &bull; Clerk Secure Login & Registration<br>
            &bull; Route Protection & Session Tokens<br>
            &bull; Admin Metrics Dashboard & User Listing<br>
            &bull; Scanned Items History Logging API
          </div>
          <div><strong>Auth Engine:</strong> Clerk Auth SDK & Middleware</div>
          <div><strong>Admin View:</strong> Total scans, users & metrics</div>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; margin-top: 3pt;">
        <div style="width: 48%; border: 1.5px solid ${isDeepak ? '#16a34a' : '#000'}; padding: 5pt; font-size: 8.5pt; background: #fafafa;">
          <div style="font-weight: bold; text-align: center; border-bottom: 1px solid #000; padding-bottom: 2pt; margin-bottom: 3pt; color: ${isDeepak ? '#15803d' : '#000'};">
            MODULE 3: SMART GUIDE & CHATBOT (Deepak)
          </div>
          <div style="border: 1px solid #999; padding: 3pt; background: #fff; margin-bottom: 3pt; font-size: 8pt;">
            &bull; 4-Bin Visual Breakdown Guide<br>
            &bull; SPI Plastic Resin Code Standards (1–7)<br>
            &bull; EcoBot Chatbot: Natural language advice
          </div>
          <div><strong>Features:</strong> Instant answer for ambiguous items</div>
          <div><strong>UI:</strong> Next.js 14, React & Tailwind CSS</div>
        </div>

        <div style="width: 48%; border: 1.5px solid ${!isDeepak ? '#2563eb' : '#000'}; padding: 5pt; font-size: 8.5pt; background: #fafafa;">
          <div style="font-weight: bold; text-align: center; border-bottom: 1px solid #000; padding-bottom: 2pt; margin-bottom: 3pt; color: ${!isDeepak ? '#1d4ed8' : '#000'};">
            MODULE 4: SCAN HISTORY & DEVOPS (Krishna)
          </div>
          <div style="border: 1px solid #999; padding: 3pt; background: #fff; margin-bottom: 3pt; font-size: 8pt;">
            &bull; User Scan History List & Timestamps<br>
            &bull; MongoDB Atlas User Database Sync<br>
            &bull; GitHub Repository & Vercel Edge Cloud
          </div>
          <div><strong>Hosting:</strong> Vercel Edge Serverless Deployment</div>
          <div><strong>Sync:</strong> Real-time webhook & database updates</div>
        </div>
      </div>
    </div>

    <div style="font-size: 8.5pt; text-align: center; color: #4b5563; margin-top: 8pt;">
      WasteIQ Community Engagement Project &copy; 2026–2027 — Department of Information Technology, St. Gonsalo Garcia College
    </div>
  </div>

</body>
</html>
`;
}

// 1. Generate Deepak's HTML (Mentor remains Prof. Supriya Irkar, HOD remains Prof. Olivia Dias)
const deepakConfig = {
  candidateName: 'Mr. Patel Deepak Rajendra',
  candidateRoll: '68',
  partnerName: 'Mr. Yadav Krishna Panchdev',
  partnerRoll: '98',
  primaryRoleTitle: 'AI Vision Engineer & Core Frontend Architect',
  partnerRoleTitle: 'Authentication, Admin Portal & DevOps Engineer',
  studentOrder: 'deepak',
  mentorName: 'Prof. Supriya Irkar',
  isKrishna: false,
};

const deepakHtml = generateReportHtml(deepakConfig);
const deepakHtmlPath = path.join(__dirname, 'CEP_Report_Patel_Deepak.html');
fs.writeFileSync(deepakHtmlPath, deepakHtml, 'utf8');
console.log('Generated:', deepakHtmlPath, '(', deepakHtml.length, 'bytes)');

// 2. Generate Krishna's HTML (Mentor is Prof. Olivia Dias, HOD line unassigned/generic, Acknowledgement adjusted)
const krishnaConfig = {
  candidateName: 'Mr. Yadav Krishna Panchdev',
  candidateRoll: '98',
  partnerName: 'Mr. Patel Deepak Rajendra',
  partnerRoll: '68',
  primaryRoleTitle: 'Authentication, Admin Portal & DevOps Engineer',
  partnerRoleTitle: 'AI Vision Engineer & Core Frontend Architect',
  studentOrder: 'krishna',
  mentorName: 'Prof. Olivia Dias',
  isKrishna: true,
};

const krishnaHtml = generateReportHtml(krishnaConfig);
const krishnaHtmlPath = path.join(__dirname, 'CEP_Report_Yadav_Krishna.html');
fs.writeFileSync(krishnaHtmlPath, krishnaHtml, 'utf8');
console.log('Generated:', krishnaHtmlPath, '(', krishnaHtml.length, 'bytes)');

// Function to compile HTML to PDF using Edge
function compilePdf(htmlPath, pdfPath) {
  console.log(`Compiling ${path.basename(htmlPath)} -> ${path.basename(pdfPath)}...`);
  const cmd = `"${edgePath}" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="${pdfPath}" "${htmlPath}"`;
  execSync(cmd);
  
  if (fs.existsSync(pdfPath)) {
    const stat = fs.statSync(pdfPath);
    const pdfData = fs.readFileSync(pdfPath);
    const pageMatches = pdfData.toString('latin1').match(/\/Type\s*\/Page\b/g);
    const pageCount = pageMatches ? pageMatches.length : 0;
    console.log(`SUCCESS: ${path.basename(pdfPath)} created! Size: ${stat.size} bytes | Page count: ${pageCount}`);
    return { size: stat.size, pageCount };
  } else {
    throw new Error(`Failed to create ${pdfPath}`);
  }
}

// 3. Compile Deepak's PDF
const deepakPdfPath = path.join(__dirname, 'CEP_Project_Report_Patel_Deepak_68.pdf');
const deepakResult = compilePdf(deepakHtmlPath, deepakPdfPath);

// 4. Compile Krishna's PDF
const krishnaPdfPath = path.join(__dirname, 'CEP_Project_Report_Yadav_Krishna_98.pdf');
const krishnaResult = compilePdf(krishnaHtmlPath, krishnaPdfPath);

console.log('=== SUMMARY OF GENERATED INDIVIDUAL REPORTS ===');
console.log('1. Deepak Patel (Roll No: 68):', deepakPdfPath, 'Pages:', deepakResult.pageCount);
console.log('2. Krishna Yadav (Roll No: 98):', krishnaPdfPath, 'Pages:', krishnaResult.pageCount);
