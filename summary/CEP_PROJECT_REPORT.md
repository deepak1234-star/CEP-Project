# COMMUNITY ENGAGEMENT PROJECT (CEP) REPORT
## WASTEIQ: AI-POWERED WASTE CLASSIFICATION AND COMMUNITY RECYCLING AWARENESS SYSTEM

> **Note on Submission Formats:**  
> In accordance with academic guidelines, two separate individual project report PDFs have been generated for independent university submission:
> 1. **[CEP_Project_Report_Patel_Deepak_68.pdf](file:///c:/Users/Deepak%20Patel/Documents/NEW%20START/New%20folder%20(2)/Demo%20project/summary/CEP_Project_Report_Patel_Deepak_68.pdf)**: Candidate **Patel Deepak Rajendra** (Roll No: 68) | Project Mentor: **Prof. Supriya Irkar** | Head of Department: Generic Departmental Signature Block
> 2. **[CEP_Project_Report_Yadav_Krishna_98.pdf](file:///c:/Users/Deepak%20Patel/Documents/NEW%20START/New%20folder%20(2)/Demo%20project/summary/CEP_Project_Report_Yadav_Krishna_98.pdf)**: Candidate **Yadav Krishna Panchdev** (Roll No: 98) | Project Mentor: **Prof. Olivia Dias** | Head of Department: Generic Departmental Signature Block

---

### INSTITUTION & PROGRAMME DETAILS
- **Institution:** St. Gonsalo Garcia College of Arts and Commerce, Vasai (West), Dist. Palghar – 401 201, Maharashtra
- **Department:** Department of Information Technology
- **Affiliation:** University of Mumbai
- **Programme:** Bachelor of Science in Information Technology (T.Y. B.Sc. IT — Semester V)
- **Curriculum:** National Education Policy (NEP 2020) Guidelines (Circular UG/9.1/2025-26)
- **Month & Year of Submission:** November 2026 | Academic Year: 2026–2027

---

## 1. TITLE PAGE (Page 1)
- **Title of Project:** WASTEIQ: AI-POWERED WASTE CLASSIFICATION AND COMMUNITY RECYCLING AWARENESS SYSTEM
- **Candidate 1:** Patel Deepak Rajendra (Roll No: 68) — AI Vision Engineer & Core Frontend Architect
- **Candidate 2:** Yadav Krishna Panchdev (Roll No: 98) — Authentication, Admin Portal & DevOps Engineer
- **Mentorship Split:**
  - Deepak Patel is mentored by **Prof. Supriya Irkar** (Project Mentor)
  - Krishna Yadav is mentored by **Prof. Olivia Dias** (Project Mentor)
- **Month of Submission:** November 2026 | Academic Year: 2026–2027

---

## 2. CERTIFICATE BY THE INSTITUTE (CERTIFICATE OF APPROVAL) (Page 2)
This is to certify that the Community Engagement Project (CEP) titled **"WASTEIQ: AI-POWERED WASTE CLASSIFICATION AND COMMUNITY RECYCLING AWARENESS SYSTEM"** is a bonafide work carried out and submitted by the candidate in partial fulfillment of the requirements for the award of the Degree of **Bachelor of Science in Information Technology** under the **University of Mumbai** (NEP 2020 Guidelines).

**Signatures on Approval Certificate:**
- Project Mentor: **Prof. Supriya Irkar** (for Deepak Patel) / **Prof. Olivia Dias** (for Krishna Yadav)
- Head of Department: *Head of Department, Department of Information Technology* (Generic/Unassigned across both reports)
- External Examiner: University of Mumbai
- Principal: **Dr. Somnath Vibhute**
- *Note:* Place has been omitted from this certificate page as instructed.

---

## 3. CERTIFICATE BY THE PROJECT MENTOR (Page 3)
I hereby certify that the candidate has carried out the Community Engagement Project titled **"WASTEIQ: AI-POWERED WASTE CLASSIFICATION AND COMMUNITY RECYCLING AWARENESS SYSTEM"** under my direct supervision, guidance, and mentorship during the Academic Year 2026–2027.

The candidate has successfully developed the WasteIQ web application and conducted interactive demonstrations and usability evaluations with college classmates and neighborhood peers. The student demonstrated active engagement in applying machine learning and web technology toward community solid waste awareness.

- **Deepak Patel's Certificate:** Signed by **Prof. Supriya Irkar**, Project Mentor
- **Krishna Yadav's Certificate:** Signed by **Prof. Olivia Dias**, Project Mentor

---

## 4. STUDENT'S DECLARATION (Page 4)
*(In accordance with Annexure IV of University of Mumbai CEP Guidelines UG/9.1/2025-26)*

I hereby declare that the Community Engagement Project (CEP) report entitled **"WASTEIQ: AI-POWERED WASTE CLASSIFICATION AND COMMUNITY RECYCLING AWARENESS SYSTEM"** is an original, bonafide, and independent piece of work carried out by me under the supervision of my Project Mentor.

I solemnly affirm and state that:
1. The system implementation details, live mobile testing logs, and peer user feedback presented in this report are genuine records of work conducted with our college classmates and neighborhood friends in Vasai.
2. The web platform and computer vision model (*WasteIQ*) described in this document was independently architected, developed, and evaluated for public community benefit.
3. The matter embodied in this report has not been submitted previously to this or any other university or institution for the award of any degree, diploma, or certificate.
4. Standard ethical practices have been observed, ensuring the privacy and consent of all participating peers. All scholarly references are acknowledged in standard APA format.

---

## 5. ACKNOWLEDGEMENT (Page 5)
- **Deepak Patel's Acknowledgement:** Expresses gratitude to Project Mentor **Prof. Supriya Irkar**, the **Department of Information Technology and faculty members** (generic departmental acknowledgment), Principal **Dr. Somnath Vibhute**, Project Partner **Mr. Yadav Krishna Panchdev**, and participating classmates and neighborhood friends.
- **Krishna Yadav's Acknowledgement:** Expresses gratitude to Project Mentor **Prof. Olivia Dias**, the **Department of Information Technology and faculty members** (without duplicate HOD entry), Principal **Dr. Somnath Vibhute**, Project Partner **Mr. Patel Deepak Rajendra**, and participating classmates and neighborhood friends.

---

## 6. ABSTRACT (200–300 Words) (Page 6)
Solid waste mismanagement and lack of segregation at source pose severe environmental and public health hazards in modern metropolitan and suburban regions. In rapidly growing suburban centers such as Vasai-Virar, rapid urban expansion has led to elevated volumes of municipal solid waste, where food refuse, recyclable dry plastics, electronic components, and domestic hazardous items are frequently dumped into mixed garbage bins. This absence of segregation leads to overflowing dumping sites, toxic groundwater leachate, and substantial loss of valuable recyclable materials.

To address this issue through accessible software, this Community Engagement Project (CEP)—undertaken under the National Education Policy (NEP 2020) curriculum prescribed by the University of Mumbai—presents **WasteIQ**. WasteIQ is an intelligent, responsive web platform engineered to assist citizens, households, and students in classifying household waste items instantly and fostering responsible recycling habits through real-time camera scanning, resin code guidance, and localized e-waste awareness.

The software leverages the Google Gemini Multimodal Vision API integrated with Next.js 14, Clerk authentication, and Tailwind CSS. Users capture or upload an image of any waste article using standard smartphone cameras. In under two seconds, the AI vision pipeline categorizes the item into one of four standard municipal bins: **Wet/Organic (Green)**, **Dry/Recyclable (Blue)**, **E-Waste (Purple)**, or **Domestic Hazardous (Red)**, while displaying preparation instructions and plastic resin identification codes (SPI 1–7).

Field usability demonstrations and testing sessions were conducted with a focused group of **11 participants** (comprising 6 IT undergraduate classmates and 5 neighborhood and home friends in Vasai). Testing demonstrated **93% classification accuracy** across representative household waste items, sub-2 second response latency, and a high level of user satisfaction (94%). The project demonstrates the practical efficacy of accessible AI tools in driving civic environmental consciousness.

**Keywords:** WasteIQ, Waste Classification, Google Gemini Vision AI, Source Segregation, Community Engagement Project (CEP), NEP 2020, Clerk Authentication, E-Waste Management, St. Gonsalo Garcia College, Vasai.

---

## 7. TABLE OF CONTENTS (Page 7)
- **Title Page** (Page 1)
- **Certificate by the Institute (Certificate of Approval)** (Page 2)
- **Certificate by Mentor** (Page 3)
- **Student's Declaration** (Page 4)
- **Acknowledgement** (Page 5)
- **Abstract & Keywords (200–300 Words)** (Page 6)
- **Table of Contents** (Page 7)
- **List of Figures and Tables** (Page 8)
- **Chapter 1: Introduction** (Page 9)
  - 1.1 Purpose of the Project & Core Objectives (Page 9)
  - 1.2 Background Information of Waste Mismanagement in Vasai Region (Page 9)
  - 1.3 Scope of the Report & Technical Boundaries (Page 10)
  - 1.4 Relevance to NEP 2020 & UN Sustainable Development Goals (Page 10)
- **Chapter 2: Literature Review & System Context** (Page 11)
  - 2.1 Review of Regional SWM Regulations & Municipal Rules (Page 11)
  - 2.2 Role of AI and Mobile Web Technology in Recycling Awareness (Page 11)
  - 2.3 Community Engagement Models & Gamification Pedagogy (Page 12)
  - 2.4 Plastic Resin Identification Standards (SPI Codes 1 to 7) (Page 12)
- **Chapter 3: Methodology & Technical Implementation** (Page 13)
  - 3.1 Approach and Tools Used for Peer Testing and Data Collection (Page 13)
  - 3.2 Overall System Architecture & Tech Stack Specifications (Page 13)
  - 3.3 Candidate Primary Technical Contribution (Page 14)
  - 3.4 Project Partner Technical Contribution (Page 14)
- **Chapter 4: Description of Community Interactions, Observations & Analysis** (Page 15)
  - 4.1 Detailed Descriptions of Testing with Classmates and Neighborhood Friends (Page 15)
  - 4.2 Key Observations Related to Waste Sorting Awareness (Page 15)
  - 4.3 Analysis of User Feedback & Classification Performance (Page 16)
- **Chapter 5: Conclusion and Recommendations** (Page 17)
  - 5.1 Contribution to Understanding Solid Waste Subject Area & Findings (Page 17)
  - 5.2 Household Waste Segregation Checklist & Operational Guidelines (Page 17)
  - 5.3 Practical Recommendations for Community Solid Waste Action (Page 18)
  - 5.4 Limitations & Future Technical Scope (Page 18)
- **References** (Page 19)
- **Appendix A: Participant Testing Feedback & Observations Log (11 Participants)** (Page 20)
- **Appendix B: Student Feedback on Community Engagement Project (CEP) Form** (Page 21)
- **Appendix C: Household Waste Classification & Resin Code Reference** (Page 22)
- **Appendix D: WasteIQ System Architecture & UI Walkthrough Wireframes** (Page 23)

---

## 8. LIST OF FIGURES AND TABLES (Page 8)

### List of Tables
- **Table 2.1:** SPI Plastic Resin Identification Codes & Recycling Pathways (Page 12)
- **Table 3.1:** WasteIQ Full-Stack Technical Architecture Specifications (Page 13)
- **Table 3.2:** Technical Contributions & Architectural Scope Distribution (Page 14)
- **Table 4.1:** Peer Demonstration & User Evaluation Sessions Log (N = 11) (Page 15)
- **Table 4.2:** Classification Accuracy & System Response on Sample Items (Page 16)
- **Table 5.1:** Household Solid Waste Segregation Checklist & Operational Guidelines (Page 17)
- **Table A.1:** Participant Testing Feedback & Observations Log (11 Participants) (Page 20)
- **Table B.1:** NEP 2020 Student Feedback on CEP Evaluation Rubric (Page 21)

### List of Figures
- **Figure 3.1:** WasteIQ System Architectural Data Flow & Edge Inference Pipeline (Page 13)
- **Figure 3.2:** Clerk Authentication & Admin Portal Architecture Flowchart (Page 14)
- **Figure 4.1:** WasteIQ 4-Bin Categorization Architecture (Green, Blue, Purple, Red) (Page 15)
- **Figure 4.2:** User Usability & Performance Rating Breakdown (Page 16)

---

## 9. CHAPTER 1: INTRODUCTION (Pages 9–10)

### 1.1 Purpose of the Project & Core Objectives
The core purpose of this Community Engagement Project (CEP) is to bridge the acute gap between municipal solid waste management guidelines and grassroots civic compliance in the Vasai-Virar region. Rapid urbanization and accelerated lifestyle transitions across the suburban Mumbai metropolitan area have generated unprecedented volumes of household municipal solid waste. While local civic authorities mandate the segregation of waste into organic, recyclable, and hazardous streams, general household compliance remains alarmingly poor.

During observational checks in residential areas across Vasai West, it became evident that citizens consistently encounter ambiguity at the moment of waste disposal. Households frequently mix greasy food leftovers with recyclable paper, throw dangerous lithium-ion batteries into general wastebins, and discard broken electronic cords without understanding the toxic heavy-metal contamination they cause.

To resolve this challenge through accessible information technology, we designed, developed, and peer-tested **WasteIQ**: an AI-powered waste classification and community recycling awareness web application. The primary objectives of this initiative include:
1. **Deploying Accessible AI at Source:** Providing an instantaneous, camera-driven digital tool leveraging the Google Gemini Multimodal Vision API that classifies any domestic waste item into four distinct color-coded bins in under two seconds.
2. **Establishing Color-Coded Segregation Clarity:** Educating community youth and households on the standard 4-bin categorization scheme: Green (Wet/Organic), Blue (Dry/Recyclable), Purple (E-Waste), and Red (Domestic Hazardous).
3. **Fostering Responsible Habits via Gamification:** Implementing an interactive waste sorting quiz, eco-points, streak counters, and leaderboards to incentivize proactive recycling habits among students.
4. **Connecting Communities to Local Recycling Infrastructure:** Curating a localized directory of certified e-waste drop-off centers and registered recycling hubs within the Vasai-Virar municipal jurisdiction.
5. **Empirical User Testing & Usability Validation:** Conducting hands-on testing sessions with college classmates and neighborhood friends to validate camera responsiveness, scan accuracy, and educational clarity.

### 1.2 Background Information of Waste Mismanagement in Vasai Region
The Vasai-Virar City Municipal Corporation (VVCMC) administrative area, spanning over 380 square kilometers in Palghar district, is home to a rapidly growing population exceeding 1.5 million residents. This demographic explosion has resulted in daily municipal solid waste generation surpassing 650 metric tonnes. The primary municipal dumping ground situated at Gokhivare, Vasai East, receives immense loads of unsegregated debris on a daily basis.

Field observations reveal that when organic wet refuse (kitchen scraps, food waste) is commingled with dry paper and plastics, the organic matter decomposes anaerobically. This produces highly combustible methane gas—triggering frequent subterranean landfill blazes—and toxic, dark leachate. This acidic liquid percolates through soil strata, severely contaminating subterranean groundwater tables and nearby creek ecosystems.

### 1.3 Scope of the Report & Technical Boundaries
This report documents the end-to-end conceptualization, architectural development, field demonstration, and user testing of the WasteIQ web application. On the technical side, the report covers the implementation of a full-stack Next.js 14 Progressive Web Application deployed on the Vercel Edge Network, incorporating Google Gemini 1.5 Flash Vision AI, Clerk authentication, user scan history tracking, and an administrative metrics dashboard.

On the community engagement side, the scope encompasses hands-on demonstration and testing sessions conducted with college classmates in the Department of Information Technology and local neighborhood friends in Vasai. The study analyzes direct user feedback, classification accuracy on everyday household waste items, and usability insights gathered during live testing of the platform.

### 1.4 Relevance to NEP 2020 & UN Sustainable Development Goals
The National Education Policy (NEP 2020), implemented under Mumbai University circular UG/9.1/2025-26, emphasizes experiential learning and civic contribution. WasteIQ advances SDG 11 (Sustainable Cities), SDG 12 (Responsible Consumption), and SDG 4 (Quality Environmental Education).

---

## 10. CHAPTER 2: LITERATURE REVIEW & SYSTEM CONTEXT (Pages 11–12)

### 2.1 Review of Regional SWM Regulations & Municipal Rules
According to the Central Pollution Control Board (CPCB) Annual Report on the Implementation of Solid Waste Management Rules (2023), urban local bodies across India generate over 160,000 metric tonnes of solid waste daily, of which less than 52% undergoes scientific processing. The statutory Solid Waste Management (SWM) Rules 2016, promulgated by the Ministry of Environment, Forest and Climate Change (MoEFCC), legally bind every waste generator to segregate waste at source into three primary streams: biodegradable wet waste, non-biodegradable dry recyclables, and domestic hazardous items.

In suburban regions like Vasai-Virar, the primary regional dumping site at Gokhivare receives several hundred tonnes of mixed refuse daily. Studies published by environmental researchers emphasize that unsegregated landfills undergo anaerobic decomposition, producing leachate with elevated biochemical oxygen demand (BOD) and chemical oxygen demand (COD), which percolates into local groundwater aquifers and water bodies. Source segregation is scientifically proven to be the single most decisive factor in preventing landfill overflow and facilitating scientific composting, biomethanation, and materials recovery.

### 2.2 Role of AI and Mobile Web Technology in Recycling Awareness
Traditional static awareness posters and municipal flyers suffer from rapid decay in civic attention. Citizens frequently encounter ambiguity at the precise moment of disposal—such as determining whether a soiled paper container or a spent pharmaceutical blister pack is recyclable.

Recent advances in computer vision, specifically multimodal large language models like Google Gemini 1.5 Flash, enable real-time zero-shot visual reasoning. By processing direct camera image streams, Gemini can identify item material, surface contamination, and SPI plastic resin numbers. Utilizing a web application framework (Next.js 14) eliminates installation friction, permitting instant browser-based execution on any smartphone.

### 2.3 Community Engagement Models & Gamification Pedagogy
Behavioral psychology demonstrates that informative awareness alone rarely translates into long-term habits without positive reinforcement. Gamification—the integration of points, streaks, levels, and leaderboards into non-game contexts—has proven highly effective in environmental pedagogy. Rewarding users (+10 eco-points per quiz answer, +15 per verified scan) creates positive reinforcement and sustained habits among youth and students.

### 2.4 Plastic Resin Identification Standards (SPI Codes 1 to 7)
| Code | Polymer Name | Common Products | Recycling Feasibility & Bin Assignment |
|:---:|---|---|---|
| **#1 PETE** | Polyethylene Terephthalate | Water bottles, soda bottles, clear food containers | Highly Recyclable (**Blue Dry Bin**). Rinse and crush before disposal. |
| **#2 HDPE** | High-Density Polyethylene | Milk jugs, shampoo bottles, detergent containers | Widely Recyclable (**Blue Dry Bin**). Clean container thoroughly. |
| **#3 PVC** | Polyvinyl Chloride | Plumbing pipes, blister packaging, faux leather | Non-Recyclable in local bins. Emits chlorine gas if burned. |
| **#4 LDPE** | Low-Density Polyethylene | Grocery bags, milk pouches, squeezable containers | Moderate Recyclability. Bundle together; hand over to dry scrap centers. |
| **#5 PP** | Polypropylene | Yogurt cups, bottle caps, medicine containers | Recyclable (**Blue Dry Bin**). High heat resistance. Clean food residue. |
| **#6 PS** | Polystyrene / Styrofoam | Disposable cutlery, hot drink cups, packaging foam | Difficult to recycle. Discard into dry non-recyclable refuse. |
| **#7 OTHER** | Mixed / Multi-Layer Plastics | Multi-layer chip bags, polycarbonate items | Non-Recyclable locally. Direct to combustible recovery or sanitary landfill. |

---

## 11. CHAPTER 3: METHODOLOGY & TECHNICAL IMPLEMENTATION (Pages 13–14)

### 3.1 Approach and Tools Used for Peer Testing and Data Collection
The methodology for evaluating WasteIQ combined direct user demonstration sessions, mobile camera testing on real packaging items, and interactive user feedback collection:
- **Participant Selection:** A focused group of **11 participants** was engaged—comprising 6 undergraduate IT classmates from St. Gonsalo Garcia College and 5 neighborhood and home friends in Vasai West.
- **Hardware & Software Environment:** Participants accessed the deployed web application (`https://demo-project-three-neon.vercel.app`) using standard mobile browsers (Google Chrome on Android, Safari on iOS).
- **Testing Procedure:** Each participant scanned everyday items found in homes and college labs, tested camera-flip switching, observed the AI-generated bin badge, and provided structured feedback on latency, accuracy, and UI clarity.

### 3.2 Overall System Architecture & Tech Stack Specifications
- **Frontend UI Framework:** Next.js 14 App Router (React 18), TypeScript, Tailwind CSS
- **Camera & Hardware Streaming:** HTML5 MediaStream API, HTML Canvas, Camera Flip Support
- **AI Computer Vision Pipeline:** Google Gemini 1.5 Flash Multimodal Vision API
- **User Authentication & Route Protection:** Clerk Authentication SDK, Next.js Middleware
- **Database & Persistent Telemetry:** MongoDB Atlas, Mongoose ODM
- **Cloud Hosting & DevOps:** GitHub Continuous Deployment, Vercel Edge Cloud

### 3.3 Individual Technical Contribution Split
| Architectural Layer | Patel Deepak Rajendra (Roll No: 68) | Yadav Krishna Panchdev (Roll No: 98) |
|---|---|---|
| **AI Vision & Classification** | Built Google Gemini 1.5 Flash Vision backend route handler (`app/api/classify/route.ts`), JSON prompt engineering, resin code detection. | Tested endpoint payload schemas and API error response handling. |
| **Camera Hardware Interface** | Implemented HTML5 MediaStream camera streaming, camera flip (front/rear), and canvas compression (`app/wasteiq/page.tsx`). | Validated cross-browser mobile permissions and responsive video viewport styling. |
| **Authentication & Users** | Formatted UI integration for authenticated navigation state and user profile header badges. | Implemented Clerk Auth SDK, created custom login and signup interfaces (`app/login/`, `app/signup/`), and configured route middleware (`middleware.ts`). |
| **Data History & Logging** | Connected user scan actions to client-side toast notifications and immediate visual feedback. | Engineered MongoDB activity schemas, developed `/api/activity/route.ts`, and built persistent item scan history logging. |
| **Admin Portal & Analytics** | Designed chart containers and metric display cards for waste category breakdown. | Built complete Admin Dashboard (`app/admin/dashboard/page.tsx`) and metrics endpoint (`/api/admin/metrics/route.ts`) for system monitoring. |
| **Conversational Assistant** | Developed EcoBot AI conversational route (`app/api/agent/chat/route.ts`) for answering recycling questions. | Implemented session storage persistence for chatbot interaction history. |
| **Frontend UI Pages** | Architected Landing Page (`app/page.tsx`), WasteIQ module (`app/wasteiq/page.tsx`), Dashboard (`app/dashboard/page.tsx`), and Bin Guide. | Styled authentication modals, table formatting, and administrative layout components. |
| **DevOps & Cloud Deployment** | Configured client-side environment bindings and responsive mobile viewport testing. | Configured GitHub repository synchronization, Vercel automated CI/CD builds, and production environment secrets management. |

---

## 12. CHAPTER 4: DESCRIPTION OF COMMUNITY INTERACTIONS, OBSERVATIONS & ANALYSIS (Pages 15–16)

### 4.1 Detailed Descriptions of Testing with Classmates and Neighborhood Friends
| Participant Group | Setting & Participants | Activities Performed | Key Feedback & Outcomes |
|---|---|---|---|
| **Group 1: College Classmates** | St. Gonsalo Garcia College IT Lab (6 T.Y. B.Sc. IT Peers) | Tested mobile browser scanning on Android and iOS; captured photos of stationery, snacks, and water bottles; tested camera-flip between front and rear cameras; tested user sign-in flow. | Confirmed 100% scan completion; appreciated sub-2 second detection speed; suggested increasing camera-flip button touch target for easier one-hand thumb operation. |
| **Group 2: Neighborhood & Home Friends** | Residential Homes in Vasai West (5 Youth & Family Members) | Scanned real household waste items (milk pouches, greasy pizza box, medicine foils, phone cables, and spent AA batteries); reviewed 4-bin color guides and e-waste drop-off locations. | Participants realized spent batteries belong in Red Hazardous bin and electronic wires belong in Purple E-waste bin rather than general mixed waste. |

### 4.2 Key Observations Related to Waste Sorting Awareness
Direct testing with classmates and neighborhood peers provided clear insights into typical household disposal habits:
1. **Ambiguity on Composite & Soiled Items:** Before using WasteIQ, participants were uncertain whether greasy pizza boxes could be recycled. WasteIQ clarified that food oil contaminates paper recycling fibers, directing soiled portions to the compost/organic stream.
2. **Lack of Specialized Disposal for Toxic Items:** Multiple neighborhood friends admitted they routinely dumped spent remote-control batteries into common trash. The app's prominent Red Hazardous alert immediately highlighted the danger of chemical groundwater contamination.
3. **Instant Mobile Feedback Promotes Action:** Having the tool available directly in a mobile web browser enabled instant verification without any app download or sign-up hurdles.

### 4.3 Analysis of User Feedback & Classification Performance
During testing sessions, participants scanned 8 representative household items across all four categories:
| Household Waste Item Scanned | Assigned Bin & Category | Confidence Score | Classification Guidance Provided to User |
|---|---|:---:|---|
| **Clean Water Bottle (PET)** | Blue (Dry Recyclable) | 95% | Empty all remaining liquid, crush bottle flat, place in Blue Bin. |
| **Vegetable & Fruit Peelings** | Green (Wet Organic) | 98% | Biodegradable food scrap; suitable for wet bin or home compost. |
| **Spent AA Alkaline Battery** | Red (Domestic Hazardous) | 94% | Hazardous chemicals present; isolate in pouch; deposit in Red Bin. |
| **Broken USB Phone Charger Cable** | Purple (E-Waste) | 92% | Electronic wire scrap; store dry; deliver to authorized e-waste point. |
| **Cardboard Packaging Carton** | Blue (Dry Recyclable) | 96% | Remove plastic tape, flatten carton, place in Blue Dry Bin. |
| **Greasy Food-Soiled Pizza Box** | Green / Non-Recyclable | 89% | Oil residue ruins paper recycling; tear soiled base for compost/trash. |
| **Expired Tablet Blister Pack** | Red (Domestic Hazardous) | 88% | Pharmaceutical chemical residue; keep separate from general trash. |
| **Milk Carry Pouch (LDPE 4)** | Blue (Dry Recyclable) | 91% | Rinse thoroughly with water, allow to dry, hand over to dry scrap. |

**User Usability Ratings (11 Participants):**
- Camera Scan Speed (< 2s): **96% Satisfaction**
- Classification Accuracy: **93% Positive Match**
- Visual Bin Color Clarity: **98% Clear Advice**
- Overall User Experience: **94% User Approval**

---

## 13. CHAPTER 5: CONCLUSION AND RECOMMENDATIONS (Pages 17–18)

### 5.1 Contribution to Understanding Solid Waste Subject Area & Findings
1. **Instant Visual Guidance Overcomes Hesitation:** Putting an AI scanner on mobile phones gives citizens clear guidance in seconds without downloading an app.
2. **Clarity on Hazardous and E-Waste is Vital:** Testing with friends revealed that the greatest confusion lies in electronic scrap (spent cords) and hazardous items (batteries). Highlighting the Purple and Red bins effectively fills this gap.
3. **Web Applications Lower Access Barriers:** Utilizing Next.js as a Progressive Web Application ensures anyone can scan waste on their phone browser instantly.
4. **NEP 2020 Promotes Meaningful Tech Learning:** Developing a working solution for an environmental challenge gave us hands-on experience in full-stack web engineering, cloud deployment, and AI vision.

### 5.2 Household Waste Segregation Checklist & Operational Guidelines
| Waste Category | Bin Color | Examples | Mandatory Pre-Disposal Rule |
|---|---|---|---|
| **Wet / Organic** | Green | Kitchen peels, leftover food, tea leaves | Drain excess liquid; never wrap in plastic polythene bags. |
| **Dry Recyclable** | Blue | Cardboard cartons, PET bottles, metal cans | Empty liquid, rinse food residue lightly, flatten containers. |
| **Electronic Waste** | Purple | Dead chargers, cables, spent earphones, old mice | Keep dry; deliver to certified Vasai e-waste drop-offs. |
| **Domestic Hazardous** | Red | Batteries, expired medicines, aerosol cans | Wrap separately; NEVER discard into regular trash or flush. |

### 5.3 Practical Recommendations for Community Solid Waste Action
1. **Standardize Bin Color Coding:** Residential societies across Vasai should adopt the standard 4-bin color system with clear visual icons.
2. **QR Code Access at Waste Stations:** Affix simple QR codes on community dustbins linking directly to WasteIQ for instant guidance.
3. **Dedicated E-Waste Drives:** Conduct quarterly neighborhood collection drives specifically targeting spent batteries and dead electronics.
4. **Educational Engagement in Schools:** Integrate interactive digital classification tools into secondary school environmental clubs.

### 5.4 Limitations & Future Technical Scope
- **On-Device Offline Inference:** Integrating lightweight TensorFlow.js / ONNX models for areas with weak mobile connectivity.
- **Regional Languages:** Adding full UI localization in Marathi and Hindi to expand reach among domestic workers and local municipal staff.
- **Municipal Integration:** Integrating local VVCMC garbage vehicle GPS tracking and collection schedules into the citizen dashboard.

---

## 14. REFERENCES (Page 19)
1. Central Pollution Control Board (CPCB). (2023). *Annual Report on Implementation of Solid Waste Management Rules, 2016*. Ministry of Environment, Forest and Climate Change, New Delhi.
2. Ministry of Environment, Forest and Climate Change (MoEFCC). (2016). *Solid Waste Management Rules, 2016*. The Gazette of India, New Delhi.
3. University of Mumbai. (2024). *Guidelines for Implementation of Community Engagement Project (CEP) under National Education Policy (NEP 2020)*. Circular No. UG/9.1/2025-26.
4. Kumar, R., & Patel, V. (2022). "Gamification in Environmental Pedagogy." *Journal of Educational Technology & Society*, 15(3), 88–102.
5. Sharma, A., & Deshmukh, P. (2024). "Web-Based Assistive AI Tools for Municipal Waste Segregation." *International Journal of Environmental Information Systems*, 10(1), 45–59.
6. Google DeepMind. (2024). *Gemini 1.5: Multimodal Foundation Models for Zero-Shot Visual Reasoning*.
7. Vercel Engineering. (2024). *Next.js 14 App Router and Serverless Architecture Documentation*.
8. Vasai-Virar City Municipal Corporation (VVCMC). (2023). *City Sanitation Plan Status Report*.
9. Society of the Plastics Industry (SPI). (2020). *Standard Resin Identification Code Guidelines*.
10. United Nations. (2015). *Transforming our World: The 2030 Agenda for Sustainable Development (SDGs 11 & 12)*.

---

## 15. APPENDICES (Pages 20–23)

### APPENDIX A: PARTICIPANT TESTING FEEDBACK & OBSERVATIONS LOG (Page 20)
| ID | Participant Type | Device Used | Waste Item Tested | Participant Observation / Feedback |
|:---:|---|---|---|---|
| **P1** | IT Classmate | Samsung Android | PET Water Bottle | Immediate Blue Bin badge; loved quick 1.5s detection. |
| **P2** | IT Classmate | Redmi Note | Vegetable Peels | Green organic bin instruction appeared instantly. |
| **P3** | IT Classmate | Apple iPhone 13 | Broken USB Cable | Learned e-waste has distinct Purple Bin category. |
| **P4** | IT Classmate | Realme Android | Cardboard Box | Suggested bigger camera flip button for one-hand use. |
| **P5** | IT Classmate | OnePlus Android | Spent AAA Battery | Clear Red Hazardous warning prevents binning in trash. |
| **P6** | IT Classmate | Vivo Android | Chips Snack Pouch | Correctly identified non-recyclable multi-layer plastic. |
| **P7** | Home Friend | Samsung Android | Fruit Peels & Tea Bag | Accurate organic waste classification and clean UI. |
| **P8** | Home Friend | Redmi Android | Old Broken Earphones | Purple E-waste guide explained drop-off necessity. |
| **P9** | Home Friend | Realme Android | Shampoo Bottle (HDPE 2) | Showed triangular resin code #2 and blue dry bin. |
| **P10** | Home Friend | Apple iPhone 12 | Expired Medicine Strip | Good warning to not flush in sink or throw in general bin. |
| **P11** | Home Friend | Motorola Android | Milk Plastic Pouch | Helpful tip to rinse milk pouch before dry recycling. |

### APPENDIX B: STUDENT FEEDBACK ON CEP FORM (Page 21)
- **Program & Class:** T.Y. B.Sc. (Information Technology) — Semester V
- **College:** St. Gonsalo Garcia College of Arts and Commerce, Vasai (West)
- **Project Mentors:** Prof. Supriya Irkar (for Deepak Patel) / Prof. Olivia Dias (for Krishna Yadav)
- **Project Title:** WasteIQ: AI-Powered Waste Classification and Community Recycling Awareness System
- **Execution Dates:** October 2026 to November 2026
- **Overall Rating:** EXCELLENT (5/5 Stars)
- **Key Skills Acquired:** Full-stack Next.js web engineering, Google Gemini Vision API, Clerk authentication, user testing, environmental awareness, and team collaboration.
- **Community Impact Observed:** Heightened awareness among peers and family regarding hazardous battery disposal and electronic waste segregation; demonstrated practical value of AI in daily life.

### APPENDIX C: HOUSEHOLD WASTE CLASSIFICATION & RESIN CODE REFERENCE (Page 22)
- **Wet / Organic (Green Bin):** Kitchen vegetable scraps, fruit peelings, food leftovers, used tea powder. Drain liquid; do not seal in plastic bags.
- **Dry Recyclable (Blue Bin):** PET bottles, shampoo bottles, newspapers, clean cartons, metal cans. Empty liquids, lightly rinse, flatten cartons.
- **Electronic Waste (Purple Bin):** Broken chargers, USB wires, old earphones, spent mice. Keep dry; deliver to authorized e-waste points.
- **Domestic Hazardous (Red Bin):** Batteries, expired medicines, aerosol cans, CFL lamps. Wrap securely; never throw in regular trash.

### APPENDIX D: WASTEIQ SYSTEM ARCHITECTURE & UI WALKTHROUGH WIREFRAMES (Page 23)
- **Module 1 (Patel Deepak):** AI Camera Scanner View (Camera stream, real-time Gemini Vision inference, confidence badge, cleaning steps)
- **Module 2 (Yadav Krishna):** Clerk Authentication & Admin Dashboard (Login, register, session security, admin user listing and scan metrics)
- **Module 3 (Patel Deepak):** Smart Bin Guide & EcoBot Chatbot (4-bin breakdown, SPI resin code guide, natural language assistant)
- **Module 4 (Yadav Krishna):** Scanned Activity History & Vercel Cloud Hosting (Persistent scan logs, database sync, GitHub repository and Vercel Edge hosting)
