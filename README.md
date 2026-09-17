# Next.js & Clerk Authentication with Google OAuth 🔑

A production-ready web application built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Clerk (`@clerk/nextjs`)**, featuring **real Google OAuth 2.0 authentication**, protected routes, persistent sessions, and responsive UI.

---

## 🚀 Features

- 🔐 **Real Google OAuth 2.0**: Official Google account-selection/login flow via Clerk.
- 🛡️ **Route Protection**: `/dashboard` is protected using Clerk Edge Middleware. Unauthenticated visits automatically redirect to `/login`.
- 👤 **Authenticated Profile Display**: Shows user avatar, full name, primary email address, session state, and account details on the dashboard.
- 🔄 **Persistent Session**: Session remains active across page reloads and browser restarts using secure HTTP-only cookies.
- 🚪 **Sign Out**: Instant sign-out functionality clearing local & server session tokens.
- 📱 **Responsive UI**: Sleek, modern dark-mode interface built with Tailwind CSS.

---

## 🛠️ Step-by-Step Setup Guide

### 1. How to Create the Clerk Application
1. Go to [https://dashboard.clerk.com/](https://dashboard.clerk.com/) and log in or create a free account.
2. Click **Add application** (or **Create Application**).
3. Enter your **Application name** (e.g., `AuthGuard App`).
4. Select sign-in options: Ensure **Google** and **Email** are selected.
5. Click **Create Application**.

---

### 2. How to Enable Google as a Sign-In Provider in Clerk
1. In your Clerk Dashboard, navigate to **User & Authentication** → **Social Connections**.
2. Locate **Google** in the list.
3. Toggle the switch to **Enabled**.
4. *(Optional for production)*: By default, Clerk provides **Development credentials** for Google OAuth so you can test immediately without any custom Google Cloud Console setup. 
   - For Production: You can toggle "Use custom credentials" and paste your Google Cloud OAuth **Client ID** and **Client Secret** obtained from the [Google Cloud Console](https://console.cloud.google.com/).

---

### 3. Required Environment Variables
Create a `.env.local` file in the root directory of the project with the following variables:

```env
# Get these keys from https://dashboard.clerk.com -> API Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY=sk_test_YOUR_CLERK_SECRET_KEY

# Custom Clerk Auth Route Paths
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

> [!IMPORTANT]
> Never commit `.env.local` or secret keys to version control. Keep `CLERK_SECRET_KEY` strictly on the server.

---

### 4. How to Run the Website Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start the Development Server**:
   ```bash
   npm run dev
   ```

3. Open your browser and visit: [http://localhost:3000](http://localhost:3000)

---

### 5. How to Deploy to Vercel

1. Push your code to a GitHub, GitLab, or Bitbucket repository.
2. Go to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your project repository.
4. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (Your Clerk Publishable Key)
   - `CLERK_SECRET_KEY` (Your Clerk Secret Key)
   - `NEXT_PUBLIC_CLERK_SIGN_IN_URL` = `/login`
   - `NEXT_PUBLIC_CLERK_SIGN_UP_URL` = `/signup`
   - `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` = `/dashboard`
   - `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` = `/dashboard`
5. Click **Deploy**.

---

### 6. How to Configure the Production Domain

1. In your **Clerk Dashboard**, go to **Paths** and update your **Production Domain** to match your Vercel deployment domain (e.g. `https://your-app.vercel.app`).
2. Add your domain to **Allowed Origins** in Clerk settings if applicable.
3. If using custom Google OAuth credentials in production:
   - Go to [Google Cloud Console](https://console.cloud.google.com/).
   - Add your production callback URL (provided in Clerk's Google OAuth settings page) to **Authorized redirect URIs**.

---

### 7. How to Test the Complete Google Login Flow

1. Open your browser and navigate to `http://localhost:3000/login` (or your deployed URL).
2. Click the **"Continue with Google"** button.
3. Observe that Google redirects you to the official Google Account selection screen (`accounts.google.com`).
4. Choose your Google account and grant permission.
5. Google will redirect back through Clerk authentication, which will automatically bring you to `/dashboard`.
6. Verify on `/dashboard` that:
   - Your profile picture, full name, and email address are displayed.
   - Refresh the browser tab to verify session persistence.
   - Click **Sign Out** to verify session teardown and redirection back to `/login`.
7. Attempt to open `/dashboard` directly in an incognito window without logging in to verify that middleware redirects you immediately to `/login`.

---

## 📁 Project Structure

```text
├── app/
│   ├── layout.tsx            # Root layout wrapped in ClerkProvider
│   ├── page.tsx              # Public Landing page
│   ├── login/
│   │   └── [[...login]]/
│   │       └── page.tsx      # Login page with Clerk SignIn & Google OAuth
│   ├── signup/
│   │   └── [[...signup]]/
│   │       └── page.tsx      # Sign-up page with Clerk SignUp
│   ├── dashboard/
│   │   └── page.tsx          # Protected Dashboard displaying User Profile
│   └── globals.css           # Tailwind directives & theme styling
├── components/
│   └── Navbar.tsx            # Navigation bar with Auth controls
├── middleware.ts             # Clerk Middleware route protection (/dashboard)
├── .env.example              # Environment variables template
├── .env.local                # Local environment secrets
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Project dependencies
```
