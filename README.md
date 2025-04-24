# ShopEase Pro

This project is a demo inventory and user management app built with React and Express.

## Deployment Guide

### 1. Security & Sensitive Data
- **Do NOT use plain text passwords in production.**
- The file `public/data/users.json` is included in `.gitignore` and should NOT be pushed to GitHub for real deployments.
- For production, use hashed passwords and backend authentication.

### 2. Netlify & Backend Hosting
- **Frontend**: Deploy the `src` (React) app to Netlify.
- **Backend**: Deploy `server.js` (Express API) to a service like Render, Railway, or Heroku.
- Update API URLs in the frontend to match your backend's deployed URL.

### 3. Local Development
- Run backend: `node server.js`
- Run frontend: `npm start`
- Users and products are stored in JSON files in `public/data/` (for demo/dev only).

### 4. Environment Variables
- If you use a remote backend, set the API base URL in your frontend code or with an `.env` file.

### 5. User Management
- To add users for demo, edit `public/data/users.json` (plain text passwords for demo only).

---

## ⚠️ SECURITY WARNING
**Never commit real user data, secrets, or plain text passwords to public repositories.**

---

## Contact
For help or deployment support, open an issue or contact the maintainer.
