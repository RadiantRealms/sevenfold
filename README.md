# Sevenfold

Built with Next.js, Auth0, and Material UI, this web application enables organizations to efficiently manage their member information and track financial transactions. The idea for this project emerged from a partnership with New Mount Zion Missionary Baptist Church of Seminola, based in Hialeah, Florida. The live application can be found at https://sevenfold.app. Users must be a member of an organizaation to access the application, so by default, any new registrant is placed into the **sandbox** organization.

## Features

- Authentication with Auth0
- Create and manage contacts
- Create and manage transactions
  - Categorize a transaction as a donation or expense
  - Associate a transaction with a contact
- Create and manage groups (TODO)
- Integrate with Plaid to automate transaction retrieval (TODO)

## Getting Started

Before running this project, you will need to have the following installed:

- Node.js (v18.17 or later)
- npm (v10 or later)

### Auth0 Configuration

Create a Regular Web Application in the [Auth0 Dashboard](https://manage.auth0.com/#/applications). Next, configure the following URLs for your application under the "Application URIs" section of the "Settings" page:

- Allowed Callback URLs: http://localhost:3000/api/auth/callback
- Allowed Logout URLs: http://localhost:3000/

Take note of the Client ID, Client Secret, and Domain values under the "Basic Information" section. You'll need these values in the next step.

### Installation

1. Clone this repository to your local machine:

```bash
git clone git@github.com:glwjr/sevenfold.git
```

2. Change directory into the project:

```bash
cd sevenfold
```

3. Install the dependencies:

```bash
npm install
```

4. Create a PostgreSQL database and add a .env file in the root directory with the following environment variables:

```bash
AUTH0_BASE_URL="http://localhost:3000"
AUTH0_CLIENT_ID="<AUTH0-CLIENT-ID>"
AUTH0_CLIENT_SECRET="<AUTH0-CLIENT-SECRET>"
AUTH0_ISSUER_BASE_URL="<AUTH0-ISSUER-BASE-URL>"
AUTH0_SECRET="<AUTH0-SECRET>"
POSTGRES_PRISMA_URL="<POSTGRES-DATABASE-URL>"
POSTGRES_URL_NON_POOLING="<POSTGRES-DATABASE-NON-POOLING-URL>"
```

You can execute the following command to generate an appropriate string for the `AUTH0_SECRET` value:

```bash
node -e "console.log(crypto.randomBytes(32).toString('hex'))"
```

6. Start the development server:

```bash
npm run dev
```

7. Open a web browser and navigate to http://localhost:3000 to view the application.
