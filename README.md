# Sevenfold: An Organization Management App

Sevenfold is a web application built with Next.js, Auth0, and Material UI to help organizations manage member information and track financial transactions. This project was inspired by a partnership with New Mount Zion Missionary Baptist Church of Seminola, based in Hialeah, Florida.

## Features:

- Secure Login with Auth0
- Manage Members (Create, Edit, View)
- Track Transactions (Donations & Expenses)
- Group Management (Coming Soon)
- Plaid Integration for Automated Transaction Retrieval (Planned)

## Prerequisites:

- Node.js (v18.17 or later)
- npm (v10 or later)

## Setup:

### Configure Auth0:

- Create a Regular Web Application in the Auth0 Dashboard: https://manage.auth0.com/#/applications
- Set up Callback and Logout URLs in the application settings:
  - Allowed Callback URLs: `http://localhost:3000/api/auth/callback`
  - Allowed Logout URLs: `http://localhost:3000/`
- Record your Client ID, Client Secret, and Domain from the "Basic Information" section.

### Clone & Install:

- Clone the repository: `git clone git@github.com:glwjr/sevenfold.git`
- Navigate to the project directory: `cd sevenfold`
- Install dependencies: `npm install`

### Set Database & Environment Variables:

- Create a PostgreSQL database.
- Create a `.env` file in the root directory with the following variables (replace placeholders):

```bash
AUTH0_BASE_URL=http://localhost:3000
AUTH0_CLIENT_ID=<your-auth0-client-id>
AUTH0_CLIENT_SECRET=<your-auth0-client-secret>
AUTH0_ISSUER_BASE_URL=<your-auth0-issuer-base-url>
AUTH0_SECRET=<generate-a-secure-secret>
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

- New user registrations are placed in the "sandbox" organization by default.
- Group management and Plaid integration are planned features.

**Sources:**

1. https://github.com/auth0/nextjs-auth0
