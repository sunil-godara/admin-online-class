# admin-online-class

Admin web panel for **Online Class Booking (Sanara Wellness)**. Admins use it to manage users, practitioners, studios, classes, modalities, legal content and site settings.

This is one of three apps:

| App | Role |
| --- | --- |
| `api-online-class` | Server, database, login, email, SMS, payments |
| `admin-online-class` (this repo) | Admin web panel |
| `user-practitioner-online-class` | End-user and practitioner web app |

## Status

About half of the planned admin features have no screen yet. The dashboard shows zeros. Booking, payment, refund, review, analytics, quiz, location and audit screens are missing. Several security faults must be fixed before launch. See [Known bugs](#known-bugs) and [Pending work](#pending-work).

## Tech stack

- Next.js pages router (version 14.0.3 is installed, but `package.json` says `latest`, so pin it), React 18
- MUI 5 and Emotion
- next-auth 4 (credentials login against the API), JWT session
- CKEditor 5 (a custom build kept in the `ckeditor5/` folder)
- Plain JavaScript. There is no TypeScript.
- Next.js 14 needs Node 18.17 or newer. No Node version is set in the project.

## Setup

1. Start the API first (see `api-online-class`). Run its migrations and seed so an admin account exists.
2. Install packages: `npm install`. This also installs the packages in `ckeditor5/`.
3. Create a `.env` file in this folder with the variables in the next section. There is no `.env.example`.
4. Start: `npm run dev`. It runs on port 3000 by default. If the user app also runs on your machine, use another port: `npm run dev -- -p 3001`.
5. Open `/admin/login` and sign in with the admin account created by the API seed.

Production: `npm run build` then `npm start`. The build also rebuilds CKEditor.

## Environment variables

Names only. Never commit values.

| Variable | Meaning |
| --- | --- |
| `API_URL` | Address of the API, with **no `/api` at the end**, for example `http://localhost:3002` |
| `NEXTAUTH_URL` | Public address of this app |
| `NEXTAUTH_SECRET` | Secret for the login cookie. Use a long random value. |
| `APP_URL` | Public address of this app, used by the log writer |

`next.config.js` copies these values into the build. After you change any of them, build again.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Builds CKEditor, then the app |
| `npm start` | Starts the built app (`next start`) |
| `npm run start:prod` | Build, then start |
| `npm run deploy` | Install, build CKEditor, build, start |
| `npm run lint` | ESLint with auto-fix |
| `npm run format` | Prettier |

The file `server.js` is a custom HTTPS server. No script uses it, and it needs a `cert/` folder that is not in the repo.

There are no tests. `jest.config.js` exists but Jest is not installed.

## Menu and screens

| Menu | Route | State |
| --- | --- | --- |
| Dashboard | `/admin/dashboard` | Stub. Tiles are fixed at 0 and the charts are empty. |
| Users | `/admin/user-management/list-user`, `view-user` | Partly works. Name/email search, activate/deactivate with a fixed reason, hard delete. No date filter. User detail shows 5 fields, no booking history. |
| Practitioners | `/admin/practitioner-management/list-practitioner`, `view-practitioner` | Partly works. Approve/reject, commission rate, activate, delete. No pending queue, reason or confirmation. |
| Studios | `/admin/studio-management/list-studio`, `view-studio` | Approval status only. No edit or delete. |
| Studio rooms | `/admin/studio-room-management/*` | Read only |
| Classes | `/admin/class-management/list-class`, `view-class` | List and approve/reject only. No edit, suspend, cancel, delete, filters or attendee list. |
| Modalities | `/admin/modalities-management/*` | Works (add, edit, view, status, delete) |
| Content and Policy | `/admin/content-management/*` | Partly works. CKEditor editor and publish switch. Version is fixed to `test`. |
| Site Settings | `/admin/site-setting/*` | Edit only. The email setting cannot be saved. |
| Top bar | `/admin/profile`, `/admin/account/change-password` | Work. The email field is ignored by the API. |
| Not in the menu | `/admin/login`, `forgot-password`, `reset-password/[token]` | Work, but see the reset bug below. |
| Not working | `/admin/email-template-management/*` | The 5 API routes it calls do not exist. Delete or rebuild. |

Menu entries for Payments, Reviews, Analytics, Geo and Quiz are commented out in `utils/constants/common-constants.js`.

## Project structure

```
pages/admin/          Screens, one folder per menu module
pages/api/            Server routes that forward calls to the API (proxies) and next-auth
components/           common, account, dashboard, detailPages, form, presentation
utils/api/            Functions that call the API
utils/constants/      Menu, rules, content constants
utils/withAuth.js     Page guard used in getServerSideProps
utils/helpers.js      Shared helpers, list paging
middleware.js         Route middleware (see bugs)
next.config.js        Build settings, env copied into the build
theme/                MUI theme
ckeditor5/            Custom CKEditor build with its own package.json
public/               Static assets
server.js             Unused custom HTTPS server
```

How a call flows: a page calls a function in `utils/api/`. Either it runs on the server in `getServerSideProps` and calls the API directly, or the browser calls a route in `pages/api/` which adds the login token and calls the API.

## Known bugs

Fix these first. IDs match the Final Audit Report.

| ID | Pri | Bug |
| --- | --- | --- |
| B2 | P0 | The reset screen sends only email and new password, with no token. The API also accepts that. |
| B11 | P0 | `pages/api/get-files.js` fetches any URL without a login (SSRF). `pages/api/system-logs.js` accepts writes without a login. Next.js 14.0.3 is old. `public/Redis-Insight-win-installer.exe` is a 104 MB file that does not belong here. `middleware.js` matches no admin page, and the app never checks that the user is an admin. |
| B12 | P0 | The API token is visible to browser scripts, and some pages send the whole user object to the browser. |
| B23 | P1 | Logout calls `POST /logout`, which does not exist, so the API token stays valid. The token check calls `/check-token-validity`, which does not exist, and fails open. "Keep me logged in" has no effect. The email setting cannot be saved. 15 proxy routes in `pages/api/` turn every API error into a generic 500. |
| | P1 | Lists load every row and filter in the browser. If the `ADMIN_PAGE_LIMIT` setting is missing, lists render empty. |
| | P1 | Errors from the API show as "No Records Found", so an expired login looks like an empty table. |
| | P2 | The app still holds code from another product (about 8,200 lines not reachable from any page, 2,525 lines of unused rules, an invoice PDF reader, and "Edutech" names on 5 pages). Many installed packages are not used. |
| | P2 | `utils/firebase.js` holds a hard-coded Firebase config and imports a package that is not installed. It is not committed to Git. |

## Pending work

Screens and data for: bookings (by user and by class), refunds and payments, practitioner payouts, reviews, analytics, quiz question manager, supported cities and time zones, banners and static pages, audit log. Also: class edit, suspend, cancel and delete; studio edit, suspend and delete; pending queue and reject reasons; a reason dialog for blocking users; date filter and booking history in user detail; server-side paging; a shared API client with login-expiry handling; real legal content versions; tests.

Many of these need new API routes first.

Recommendation: do not add a screen that stores SendGrid or Twilio keys. Keep them in the API's server settings.

## Related

The API address is set in `API_URL`. Run the API and the user app alongside this app. The password reset email link opens the user app, not this app.
