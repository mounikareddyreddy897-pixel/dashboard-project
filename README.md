# Board Dashboard

A responsive Board admin dashboard built with Next.js, React and plain CSS. It includes a sign-in screen, Google OAuth integration through NextAuth, summary cards, interactive Recharts visualizations, and a team directory fetched from JSONPlaceholder with Axios.

## Requirements
- Node.js 18.17 or later
- npm

## Run locally
1. Extract the ZIP file.
2. Open the `board-dashboard` folder in VS Code.
3. Open Terminal > New Terminal.
4. Run:

   ```bash
   npm install
   npm run dev
   ```

5. Open http://localhost:3000 in your browser.
6. On the sign-in page, enter any email and password to use the local demo sign-in. This is only a front-end preview, not real credential authentication.

## Enable Google sign-in
1. Create an OAuth 2.0 Client ID in Google Cloud Console.
2. Add `http://localhost:3000/api/auth/callback/google` as an authorized redirect URI.
3. Copy `.env.example` to `.env.local` and add your Google Client ID, Client Secret, and a long random `NEXTAUTH_SECRET`.
4. Restart the development server. The Google button will use NextAuth Google OAuth.

## Project structure

```text
board-dashboard/
├── components/
├── pages/
│   ├── api/auth/[...nextauth].js
│   ├── dashboard.js
│   ├── index.js
│   └── _app.js
├── styles/globals.css
├── .env.example
├── package.json
└── README.md
```

## Notes
- The dashboard charts use local dummy data and are interactive (hover for values).
- The team directory loads sample users from `https://jsonplaceholder.typicode.com/users` using Axios.
- The local demo sign-in stores an email in browser localStorage for preview only. Use Google OAuth for actual identity authentication; do not use the demo form as production authentication.
- Styling uses custom CSS only; no CSS framework is included.
