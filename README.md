# Sevenfold: An Church Management App

Sevenfold is a web application built with Next.js, Auth0, and Tailwind to help churches manage and track member and financial data. This project was inspired by a partnership with New Mount Zion Missionary Baptist Church of Seminola based in Hialeah, Florida.

## Features:

- Secure Login with Auth0
- Manage Members & Households
- Track Donations

## Prerequisites:

- Node.js (v18.17 or later)
- npm (v10 or later)

## Setup:

### Configure Auth0:

- Create a Regular Web Application in the Auth0 Dashboard: https://manage.auth0.com/#/applications
- Set up Callback and Logout URLs in the application settings:
  - Allowed Callback URLs: `http://localhost:3000/auth/callback`
  - Allowed Logout URLs: `http://localhost:3000/`
- Record your Client ID, Client Secret, and Domain from the "Basic Information" section.

### Clone & Install:

- Clone the repository: `git clone git@github.com:RadiantRealms/sevenfold.git`
- Navigate to the project directory: `cd sevenfold`
- Install dependencies: `npm install`

### Set Database & Environment Variables:

- Create a PostgreSQL database.
- Create a `.env` file in the root directory with the following variables (replace placeholders):

```bash
AUTH0_DOMAIN=<your-auth0-domain>
AUTH0_CLIENT_ID=<your-auth0-client-id>
AUTH0_CLIENT_SECRET=<your-auth0-client-secret>
AUTH0_SECRET=<generate-a-secure-secret>
APP_BASE_URL="http://localhost:3000"
NEXT_PUBLIC_API_BASE_URL="http://localhost:3000"
POSTGRES_PRISMA_URL=<your-postgres-database-url>
POSTGRES_URL_NON_POOLING=<your-postgres-non-pooling-url>
```

You can create a secret on the command line via this openssl command:

```bash
openssl rand -base64 32
```

### Start Development Server:

```bash
npm run dev
```

### Access the Application:

Open http://localhost:3000 in your web browser.

---

**Notes:**

- New user registrations are placed in the "Sandbox" organization by default.
- Bank integration is a planned feature.

**Sources:**

1. https://github.com/auth0/nextjs-auth0
