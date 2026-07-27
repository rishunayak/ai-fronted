# AI Task Platform - Frontend

This is the frontend application for the AI Task Platform. It is built using modern web technologies to provide a fast, responsive, and intuitive dashboard for users to submit and monitor background AI tasks.

## 🚀 Tech Stack

- **Framework:** [React 18](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **Data Fetching:** [TanStack React Query](https://tanstack.com/query/latest)
- **HTTP Client:** Axios (configured with auto-refresh token rotation)
- **Forms:** React Hook Form

## 📁 Project Structure

```text
src/
├── api/          # Axios instance and API call definitions (auth, tasks)
├── components/   # Reusable UI components (buttons, layout, task cards)
├── context/      # React Context providers (AuthContext)
├── hooks/        # Custom React hooks (useAuth, useTasks)
├── pages/        # Main route pages (Dashboard, Login, Register, TaskDetail)
└── main.jsx      # Application entry point
```

## 🛠️ Setup & Installation

1. **Install dependencies:**
   Make sure you are in the `frontend` directory, then run:
   ```bash
   npm install
   ```

2. **Environment Variables:**
   The frontend automatically proxies API requests to `http://localhost:5000` via the `vite.config.js` configuration. No `.env` file is strictly required for local development unless you need to change this.

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000` (or `http://localhost:5173` depending on your Vite config).

## 🔐 Authentication Flow

This application uses a highly secure **Access + Refresh Token** strategy:
- The access token is stored securely in memory.
- The refresh token is stored in `localStorage`.
- When an API request fails with a `401 Unauthorized` error, the Axios interceptor (`src/api/axios.js`) automatically pauses the request, fetches a new access token using the refresh token, and retries the original request seamlessly.

## 📡 API Proxy

During local development, API requests starting with `/api` are automatically proxied to the backend server to avoid CORS issues. This is configured in `vite.config.js`:
```javascript
proxy: {
  "/api": {
    target: "http://localhost:5000",
    changeOrigin: true,
  },
}
```

## 📦 Building for Production

To create a production-ready build:
```bash
npm run build
```
The compiled static files will be placed in the `dist/` directory, which can be deployed to Vercel, Netlify, or any static hosting provider.
