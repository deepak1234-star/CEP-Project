# ♻️ WasteIQ - AI-Powered Smart Waste Classification & Environmental Management System

> **Student / Creator:** Deepak Patel (`pateldeepak9987@gmail.com`)  
> **Live Project URL:** [https://wasteiq.vercel.app](https://wasteiq.vercel.app)  
> **Source Code (GitHub):** [https://github.com/deepak1234-star/CEP-Project.git](https://github.com/deepak1234-star/CEP-Project.git)  
> **Technology Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Google Gemini AI (Multimodal Vision & ToolLoopAgent), Vercel AI SDK, Clerk Authentication, MongoDB & Mongoose.

---

## 📌 1. Project Ka Parichay (Introduction)

**WasteIQ** ek production-grade, AI-powered Full-Stack web application hai jo municipal waste segregation (kachra alag-alag karna) aur sustainability ko automate karta hai. 

Aamtaur par log recyclable plastic, cardboard, organic food waste, aur hazardous e-waste (jaise batteries) ko ek hi dustbin mein daal dete hain, jisse landfills pollute hote hain aur recycling plants mein aag lagne ka khatra hota hai. 

**WasteIQ iska complete digital solution provide karta hai:**
- User apne phone camera ya webcam se kisi bhi waste item ki photo leta hai ya text type karta hai.
- **Google Gemini Multimodal AI** us item ka material, category, decomposition time aur exact municipal bin color (Green, Blue, Yellow, Red, Purple) identify karta hai.
- User ko har scan par **+50 EcoPoints** milte hain aur unka saved CO₂ calculate hoke **Clerk Cloud & MongoDB** mein permanently store ho jata hai.
- Project mein ek executive **Super Admin Mission Control** hai jahan pure platform ki activity real-time monitor ki ja sakti hai.

---

## 🛠️ 2. Tech Stack & Architecture (Humne Kya-Kya Use Kiya)

| Layer | Technology | Kyun Use Kiya? (Teacher Ko Reason Batane Ke Liye) |
|---|---|---|
| **Framework** | **Next.js 14 (App Router)** | Full-stack React framework jo Server-Side Rendering (SSR), Server Components aur API route handlers ek hi codebase mein provide karta hai. |
| **Language** | **TypeScript 5** | Strict type safety aur runtime errors ko prevent karne ke liye. |
| **Styling** | **Tailwind CSS + Lucide Icons** | Modern glassmorphism dark-theme UI, responsive grid system, aur intuitive icons. |
| **Artificial Intelligence** | **Google Gemini Multimodal Vision API** | Photo aur image se material, resin code, aur category identify karne ke liye high-speed LLM. |
| **AI Agent Runtime** | **Vercel AI SDK (`ai` & `@ai-sdk/google`)** | `ToolLoopAgent` banaya jo natural language samajhkar automatically carbon impact aur hazardous waste guide ke tools execute karta hai. |
| **Authentication** | **Clerk Auth (`@clerk/nextjs`)** | Google One-Click OAuth, session security, secure middleware, aur user metadata management. |
| **Database** | **MongoDB Atlas + Mongoose** | Document-based scalable database jo scans aur users ka audit log store karta hai. Global serverless connection caching use ki taaki Vercel lambda par connections exhaust na hon. |
| **Deployment** | **Vercel Cloud** | Edge network, automatic CI/CD deployment, custom domain routing (`https://wasteiq.vercel.app`). |

---

## 🚀 3. Core Modules & Step-by-Step Working (Kaise Kaam Karta Hai)

### 📸 Module 1: AI Camera Waste Scanner (`/wasteiq` ya `/ecosort`)
1. **Image Capture:** User live camera stream se frame capture karta hai ya photo upload karta hai.
2. **API Call (`POST /api/classify`):** Image ko base64 format mein server route par bheja jata hai.
3. **Gemini Vision Classification:** Google Gemini API image ko scan karke JSON output return karta hai:
   - `itemName`: e.g., "PET Plastic Soda Bottle"
   - `category`: Plastic | Paper | Metal | Glass | Organic | E-Waste | Hazardous
   - `binColor`: Blue (Dry Recyclables), Green (Compost), Yellow (Plastics), Red (Hazardous/E-Waste)
   - `confidence`: Confidence score (85% - 99%)
   - `preparationAction`: e.g., "Empty liquids, rinse thoroughly and crush flat"
   - `co2SavedPerKg`: e.g., "0.8 kg CO₂"
   - `dos` & `donts`: Common mistakes se bachne ke points.

---

### 🤖 Module 2: Autonomous WasteIQ AI Agent (Floating Chat Bot)
1. Built with **Vercel AI SDK `ToolLoopAgent`** powered by **Google Gemini**.
2. Isme 2 autonomous tools hain jo agent zarurat padne par khud call karta hai:
   - **`calculateCarbonImpact`**: Agar user bole "Calculate CO2 for 15 plastic bottles", toh agent tool call karke exact CO₂, water (liters) aur electricity (kWh) calculate karke deta hai.
   - **`getSpecializedDisposalGuide`**: Lithium batteries, swollen phones, CFL mercury bulbs ke liye hazardous drop-off centers aur safety precautions batata hai.

---

### 👤 Module 3: Authenticated User Profile & Dashboard (`/dashboard`)
1. **Google OAuth via Clerk:** One-click secure login.
2. **Cloud Metrics:**
   - **Total Scans:** Kitne items classify kiye.
   - **EcoPoints:** Har verified scan par 50 points, har agent chat par 15 points.
   - **CO₂ Avoided (kg):** Total carbon emission jo landfill se divert hui.
   - **Eco Levels:** Beginner 🐣 (0-99 pts) ➡️ Eco Enthusiast 🌱 (100+) ➡️ Master Recycler 🌿 (250+) ➡️ Zero-Waste Hero 🛡️ (500+) ➡️ Planet Guardian 🌍 (1000+).
3. **Real-time Activity Feed:** User ki previous scan history timeline card format mein display hoti hai.

---

### 🛡️ Module 4: Protected Super Admin Mission Control (`/admin/dashboard`)
1. **3-Layer Security Access Guard (`lib/adminAuth.ts`):**
   - Check karta hai ki logged-in user Deepak Patel hai ya nahi (`ADMIN_CLERK_USER_ID=user_3LSNrspqCrduvJyGYxKxuC3n3Vg` aur `ADMIN_EMAIL=pateldeepak9987@gmail.com`).
   - Non-admin users ko red **"Access Denied ❌"** protection screen dikhti hai.
2. **Executive Overview Cards:** Total Registered Users, Total AI Scans, Total CO₂ Saved, Total EcoPoints Awarded.
3. **Material & Bin Visual Breakdown:** Dynamic progress bars jo dikhate hain ki kitne percent Plastic, Paper, Metal, Glass ya Organic waste scan hua.
4. **Interactive Audit Table (`ActivityTable.tsx`):**
   - Search filter (Item name, User email, ID).
   - Category aur Bin color dropdown filters.
   - **Export to CSV** aur **Export to JSON** report buttons.
   - Inspection modal har record ki details dekhne ke liye.

---

### 🎮 Module 5: Educational Tools
- **Resin Code Identification (#1 to #7):** PETE, HDPE, PVC, LDPE, PP, PS, OTHER ke chemical properties aur recycling feasibility.
- **Smart Municipal Bin Guide:** World standard color-coded bins (Green, Blue, Yellow, Red, Purple) ka rules guide.
- **EcoQuiz:** Interactive recycling trivia quiz with instant score and answer explanations.

---

## 💡 4. Technical Challenges & Hamare Smart Solutions (Examiner Ko Impress Karne Wale Points)

### Challenge 1: Local Storage Data Discrepancy
- **Problem:** User ke scans browser ke `localStorage` mein store ho rahe the, jisse phone badalne ya login karne par Dashboard par 0 scans dikh rahe the.
- **Solution:** Humne pure codebase se `localStorage` ko 100% delete kar diya aur **Dual-Store Architecture** lagaya. Ab har scan directly **Clerk User Metadata** aur **MongoDB** mein cloud-sync hota hai.

### Challenge 2: Next.js Serverless Database Pooling
- **Problem:** Vercel par har request ek naye serverless function (lambda) par chalti hai. Agar normal `mongoose.connect()` use karein toh hazaron connections open hoke MongoDB crash ho sakta hai.
- **Solution:** Humne `lib/db/mongodb.ts` mein `global.mongooseCache` pattern lagaya jo existing connection ko reuse karta hai aur zero connection leaks ensure karta hai.

### Challenge 3: Fail-Safe Resilience (Zero Downtime)
- **Problem:** Agar MongoDB Atlas network down ho ya credentials add na hon toh kya admin dashboard crash ho jayega?
- **Solution:** Nahi! Hamara system dual-store fallback use karta hai — agar MongoDB offline ho, toh system bina ruke directly Clerk Backend API (`clerkClient.users.getUserList()`) se data fetch karke dashboard chalu rakhta hai.

---

## 🎤 5. Viva / Teacher Ke Expected Questions Aur Unke Best Answers

### Q1: "Aapne plain React ke bajay Next.js 14 App Router kyun chuna?"
> **Answer:** "Sir, plain React Client-Side Rendered (CSR) hota hai jisme API keys browser mein expose hone ka khatra hota hai aur SEO weak hota hai. Next.js 14 App Router mein Server Components aur API Route Handlers server par run hote hain, jisse Google Gemini API key aur Clerk Secret Key browser mein kabhi leak nahi hoti, aur initial page load bohot fast hota hai."

### Q2: "Waste classification ke liye AI kaise kaam kar raha hai?"
> **Answer:** "Sir, hum Google Gemini Multimodal Vision model use kar rahe hain. Jab user camera se frame capture karta hai, image base64 format mein `/api/classify` route par jaati hai. Wahan Gemini multimodal neural network image ke pixels, shape, packaging text aur texture ko analyze karta hai aur structured JSON format mein item name, category, bin color aur recycling instructions return karta hai."

### Q3: "Admin Dashboard ko unauthorized users se kaise protect kiya hai?"
> **Answer:** "Sir, humne `lib/adminAuth.ts` mein server-side guard banaya hai jo Next.js request headers se Clerk session verify karta hai. Server check karta hai ki user ka Clerk ID `user_3LSNrspqCrduvJyGYxKxuC3n3Vg` aur email `pateldeepak9987@gmail.com` match karta hai ya nahi. Agar koi unauthorized user URL access karega toh server page render hi nahi karega aur turant access deny kar dega."

### Q4: "Clerk aur MongoDB dono kyun use kiya?"
> **Answer:** "Sir, Clerk authentication, OAuth 2.0 session security, aur per-user active metadata manage karta hai. Jabki MongoDB cross-platform data analytics, aggregation pipelines (jaise total CO2 sum, category distribution), aur long-term audit logs ke liye high-performance NoSQL database provide karta hai."

---

## 📂 6. File Structure Reference

```text
├── app/
│   ├── admin/dashboard/page.tsx    # Protected Super Admin Dashboard
│   ├── api/
│   │   ├── activity/route.ts       # Database Scan Logger & Admin Fetch
│   │   ├── admin/metrics/route.ts  # Admin Overview Analytics Aggregator
│   │   ├── agent/chat/route.ts     # Vercel AI SDK Chat Endpoint
│   │   ├── classify/route.ts       # Google Gemini Vision Classifier
│   │   └── user/sync/route.ts      # Clerk Cloud Metadata Sync Endpoint
│   ├── dashboard/page.tsx          # Authenticated User Profile & Impact Feed
│   ├── ecosort/page.tsx            # Scanner & Educational Hub (Alias)
│   ├── wasteiq/page.tsx            # Official WasteIQ Scanner Route
│   ├── layout.tsx                  # Global Root Layout with Clerk Provider
│   └── page.tsx                    # Landing Homepage
├── components/
│   ├── Navbar.tsx                  # Responsive Navigation with Admin Pill
│   ├── EcoSortAgentChat.tsx        # Floating WasteIQ AI Assistant
│   ├── admin/                      # Admin UI (Metric Cards, Activity Table, Distribution)
│   ├── dashboard/                  # User Profile, Avatar Picker, Activity Timeline
│   └── ecosort/                    # Camera Scanner, Analysis Card, Resin Guide, Quiz
├── lib/
│   ├── adminAuth.ts                # Server Admin Clearance Guard
│   ├── clerkActivity.ts            # Clerk Metadata Management Service
│   ├── ai/ecoSortAgent.ts          # Vercel AI SDK ToolLoopAgent Logic
│   └── db/
│       ├── mongodb.ts              # Cached Serverless Mongoose Connection
│       ├── activityService.ts      # Business Logic for Scans & Analytics
│       └── models/
│           ├── ScanActivity.ts     # Scan Record Mongoose Schema
│           └── UserProfile.ts      # User Aggregates Mongoose Schema
└── package.json                    # Project dependencies & scripts
```

---

## 🏆 Conclusion
WasteIQ ek complete modern AI-SaaS project hai jo real-world problem (Municipal Waste Mismanagement) ko cutting-edge technologies (Generative AI Vision, Next.js Serverless, Clerk OAuth, Cloud Database) ke sath solve karta hai.
