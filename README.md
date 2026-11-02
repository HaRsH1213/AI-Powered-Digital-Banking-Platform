# NovaBank — Digital Banking Platform

NovaBank is a full-stack digital banking project with separate React dashboards for customers and bank administrators, backed by an Express/MongoDB API. Customers can register, verify their email, manage accounts, review balances and transaction activity, and transfer money between accounts. Administrators can review customers and accounts, control account status, and add initial funds through a system funding account.

> This repository is a learning/prototype project. Do not use it to hold real funds or process real banking transactions.

## Features

- Customer registration with email OTP verification and OTP resend
- Secure sign-in, sign-out, session restoration, and role-based access control
- Create and view Savings or Current accounts, with Savings, Salary, or Emergency account categories
- Account numbers and branch IFSC details
- Per-account and combined account balances calculated from ledger entries
- Account-to-account transfers with idempotency-key handling and atomic MongoDB transactions
- Double-entry ledger records for completed transfers: one debit and one credit entry
- Transaction history with transfer status and counterparty details
- In-app notifications for account activity, including marking notifications as read
- Admin dashboard for customer review, account search/filtering, pagination, and account status management
- Admin initial-funding flow that credits an active customer account from the active system funding account
- Responsive dark interface built around the NovaBank navy and blue visual theme

## Transaction reliability

- Balances are derived from immutable ledger entries instead of being stored directly on an account.
- Each completed transfer writes matching debit and credit ledger entries inside a MongoDB transaction.
- Transfers and initial funding use an idempotency key. Retrying the same request with the same details returns the original transaction instead of creating a duplicate payment.
- Frozen and closed accounts cannot receive or send customer transfers. Admin initial funding is available only for active customer accounts.

## Technology

**Frontend:** React, Vite, React Router, Tailwind CSS, Axios, and Lucide icons

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, and Nodemailer (Gmail OAuth2)

## Repository layout

```text
backend/
  server.js
  src/
    config/       MongoDB connection
    controller/   Request handlers
    middlewares/  Authentication and request middleware
    models/       User, account, transaction, ledger, and notification models
    routes/       Express API routes
    services/     Email and notification services
    utils/        Shared backend utilities

frontend/
  src/
    components/   Customer and admin feature components
    context/      Shared authentication state
    pages/        Customer and admin dashboard pages
    services/     API calls
```

## Run locally

### Requirements

- Node.js and npm
- A MongoDB database (local or hosted)
- Gmail OAuth2 credentials if you want to test OTP and email notifications

### 1. Configure the backend

Create `backend/.env` with:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=use_a_long_random_secret
EMAIL_USER=your_gmail_address
CLIENT_ID=your_google_oauth_client_id
CLIENT_SECRET=your_google_oauth_client_secret
REFRESH_TOKEN=your_google_oauth_refresh_token
NODE_ENV=development
```

Keep this file private; it contains credentials. Email credentials are needed for registration verification and email notifications.

Install dependencies and start the API:

```bash
cd backend
npm install
npm start
```

The API listens on `http://localhost:3000`.

### 2. Start the frontend

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`). The frontend currently sends API requests to `http://localhost:3000/api` and expects the backend CORS origin to be `http://localhost:5173`.

## Customer API overview

All paths below are prefixed with `/api`. Authentication routes use the `auth` prefix; protected account, transaction, and notification routes require a signed-in customer session.

| Method | Path | Purpose |
|---|---|---|
| `POST` | `/auth/register` | Register and send an email verification OTP |
| `POST` | `/auth/verify-email` | Verify the OTP |
| `POST` | `/auth/resend-otp` | Send another verification OTP |
| `POST` | `/auth/login` | Sign in |
| `POST` | `/auth/logout` | Sign out |
| `GET` | `/auth/me` | Restore the current signed-in user |
| `POST` | `/accounts` | Create an account |
| `GET` | `/accounts` | List the signed-in customer’s accounts |
| `GET` | `/accounts/balance/:accountNumber` | Get one account’s balance |
| `GET` | `/accounts/totalBalance` | Get the combined account balance |
| `POST` | `/transaction` | Create an account-to-account transfer |
| `GET` | `/transaction` | List the signed-in customer’s transactions |
| `GET` | `/receiver/:accountNumber` | Look up a transfer recipient by account number |
| `GET` | `/notifications` | List notifications and unread count |
| `PATCH` | `/notifications/read-all` | Mark notifications as read |

For transfers, send an idempotency key with each transfer request. Reuse the same key when retrying that same transfer so a network retry does not create a duplicate payment; use a new key for a new transfer.

## Admin API overview

Admin routes require an authenticated user with the `systemUser` role. The initial-funding endpoint also requires that the admin has an active system account, which is used as the source account for the ledger debit.

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/admin/overview` | Load dashboard totals and recent transaction activity |
| `GET` | `/admin/customers` | Search, filter, and paginate customers |
| `GET` | `/admin/customers/:customerId` | View a customer's account details |
| `GET` | `/admin/accounts` | Search, filter, and paginate customer accounts |
| `PATCH` | `/admin/accounts/:accountId/status` | Freeze or reactivate an eligible account |
| `POST` | `/transaction/system/initial-funds` | Credit initial funds to an active customer account |

## Planned work

- ML-based credit-risk assessment for loan applications, using affordability and fraud-risk signals.
- Additional admin workflows for loan review and transaction-risk monitoring.

## Useful scripts

From `frontend/`:

```bash
npm run dev      # Start the Vite development server
npm run build    # Create a production frontend build
npm run lint     # Run ESLint
```

From `backend/`:

```bash
npm start        # Start the Express API
npm run dev      # Start with nodemon
```
