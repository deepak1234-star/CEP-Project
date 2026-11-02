# ♻️ WasteIQ — AI-Powered Waste Classification & Recycling System

WasteIQ is a web application and environmental recycling assistant built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Google Gemini Vision AI**, and **Clerk Authentication with Google OAuth**.

WasteIQ eliminates recycling confusion by analyzing photos of waste items in real time, accurately classifying them into 7 disposal categories, identifying plastic resin codes (#1–7), recommending municipal bin colors, calculating carbon offsets, and gamifying sustainability through quizzes and badges.

---

## 🚀 Key Features

### 🤖 1. Real-Time Gemini Vision AI Classification
- **Live Camera & Photo Upload**: Capture items directly from your webcam or mobile camera, or drag and drop photos.
- **Deep Multimodal Analysis**: Powered by Google Gemini Vision (`gemini-3.5-flash` / `gemini-3.8-flash`) returning item name, material category, confidence score, decomposition lifespan, CO₂ savings, and practical DOs & DONTs.
- **Extensive Offline Knowledge Base**: Comprehensive fallback database covering 18+ common waste types, plastic resin codes (#1–#7), e-waste, hazardous materials, and composite packaging.

### 🗑️ 2. Smart Municipal Bin Sorting (7 Categories)
- **🟢 Organic**: Food scraps, fruit peels, compostables, grease-soiled food boxes.
- **🔵 Paper**: Clean newspapers, office paper, cardboard boxes, envelopes.
- **🟡 Plastic**: Bottles, HDPE jugs, PP takeout containers, resin codes #1–#5.
- **⚙️ Metal**: Clean aluminum beverage cans, tin food containers, foil.
- **🟣 Glass**: Beverage bottles, food jars, glass containers.
- **🔴 E-Waste**: Smartphones, circuit boards, chargers, laptop cords, cables.
- **⚠️ Hazardous**: Lithium & alkaline batteries, fluorescent bulbs, medicines.

### 🔬 3. Resin Identification Code Guide (#1 – #7)
- Comprehensive interactive guide for PET (#1), HDPE (#2), PVC (#3), LDPE (#4), PP (#5), PS (#6), and OTHER (#7).
- Explains recyclability level, typical uses, melting properties, and sorting rules.

### 🏆 4. Gamified Eco-Quiz & Achievement Badges
- Interactive recycling quiz testing knowledge on greasy pizza boxes, battery drop-offs, and resin markings.
- Dynamic reward badges ("Eco Novice", "Recycling Champion", "Zero-Waste Hero") tracked to user achievements.

### 🔐 5. Google OAuth & Clerk Cloud Synchronization
- **One-Click Google Sign-In**: Powered by Clerk (`@clerk/nextjs`).
- **Protected User Dashboard**: `/dashboard` route protected by Next.js edge middleware.
- **Multi-Device Cloud Sync**: Scan history, sustainability stats, and custom avatar selections automatically synchronize to the user's Clerk profile across devices.

---

## 📁 Project Structure

```text
├── app/
│   ├── layout.tsx                      # Root layout wrapped with ClerkProvider
│   ├── page.tsx                        # Public landing page with category showcase
│   ├── wasteiq/
│   │   └── page.tsx                    # Main WasteIQ AI Scanner, Quiz, & History Hub
│   ├── dashboard/
│   │   └── page.tsx                    # Protected dashboard displaying profile & stats
│   ├── login/[[...login]]/             # Clerk Google OAuth Sign-In page
│   ├── signup/[[...signup]]/           # Clerk Sign-Up page
│   ├── api/
│   │   ├── classify/route.ts           # Gemini Vision AI & database classification API
│   │   └── user/sync/route.ts          # Clerk metadata profile & scan history sync API
│   └── globals.css                     # Tailwind CSS directives & custom themes
├── components/
│   ├── Navbar.tsx                      # Sticky navigation header with auth state
│   ├── dashboard/
│   │   ├── UserProfileCard.tsx         # User identity profile card
│   │   ├── EditProfileModal.tsx        # Profile editing modal with bio & completion meter
│   │   └── AvatarPickerModal.tsx       # Custom avatar selector
│   └── wasteiq/
│   │   ├── WasteScanner.tsx            # Camera stream & upload analysis interface
│   │   ├── AnalysisResultCard.tsx      # Comprehensive AI sorting result card
│   │   ├── SmartBinGuide.tsx           # 7-category bin classification guide
│   │   ├── ResinCodeGuide.tsx          # Plastics #1-7 resin guide
│   │   ├── EcoQuiz.tsx                 # Interactive environmental quiz
│   │   ├── EcoAchievements.tsx         # Badges and milestones
│   │   ├── EcoStats.tsx                # CO2 savings and item tally
│   │   └── ScanHistoryDrawer.tsx       # Saved scan drawer with filter & export
├── lib/
│   ├── wasteDatabase.ts                # Built-in item database and audio synthesizer
│   ├── userSync.ts                     # Multi-device cloud sync helpers
│   ├── userProfile.ts                  # Profile completion calculations
│   └── avatars.ts                      # Preset avatar catalogue
├── types/
│   ├── wasteiq.ts                      # WasteIQ TypeScript interfaces
│   └── profile.ts                      # User profile TypeScript interfaces
├── test_images/                        # Test images for visual verification
├── gemini_scanner.py                   # Standalone Python CLI Gemini Vision scanner
├── test_api.py                         # Automated test script for /api/classify
├── middleware.ts                       # Clerk edge middleware route guard
├── .env.example                        # Template for environment variables
├── .env.local                          # Private environment variables (never committed)
├── tailwind.config.ts                  # Tailwind configuration
└── tsconfig.json                       # TypeScript compiler configuration
```

---

## 🛠️ Getting Started

### 1. Prerequisites
- **Node.js**: `v18.17+` or `v20+`
- **npm** or **pnpm**
- **Python**: `v3.10+` (optional, for standalone CLI scanner scripts)

### 2. Environment Variables Setup
Create a `.env.local` file in the project root:

```env
# Clerk Authentication (from https://dashboard.clerk.com -> API Keys)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY=sk_test_YOUR_CLERK_SECRET_KEY

# Clerk Auth Routes
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Google Gemini Vision API Key (from https://aistudio.google.com/)
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

> [!IMPORTANT]
> Keep `CLERK_SECRET_KEY` and `GEMINI_API_KEY` private. Never commit `.env.local` to public version control.

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing & Verification

### Test Next.js Classification API
While `npm run dev` is running, execute the automated Python test script:
```bash
python test_api.py
```
This tests `POST /api/classify` with complex real-world sample images in `test_images/` and outputs the full AI classification, confidence score, preparation actions, and disposal metrics.

### Run Standalone Python Gemini Scanner
You can also scan any local image directly from the terminal without starting the web server:
```bash
python gemini_scanner.py test_images/ewaste.jpg
```

### Run TypeScript & Production Build Checks
```bash
# Verify TypeScript types
npx tsc --noEmit

# Compile production bundle
npm run build
```

---

## 🌐 Deployment (Vercel)

1. Push your repository to GitHub.
2. Link the repository in [Vercel](https://vercel.com).
3. Add the required Environment Variables in the Vercel project settings:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `NEXT_PUBLIC_CLERK_SIGN_IN_URL` = `/login`
   - `NEXT_PUBLIC_CLERK_SIGN_UP_URL` = `/signup`
   - `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` = `/dashboard`
   - `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` = `/dashboard`
   - `GEMINI_API_KEY`
4. Deploy! Your app is now live with real-time AI waste recognition and Google OAuth.
