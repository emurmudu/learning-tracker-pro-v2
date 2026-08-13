# Setup Checklist

## Firebase
- [ ] Create Firebase project
- [ ] Enable Email/Password authentication
- [ ] Enable Google authentication
- [ ] Create Web App
- [ ] Copy Firebase config into client/.env
- [ ] Generate Firebase Admin service account
- [ ] Save serviceAccountKey.json in server/

## MongoDB
- [ ] Create MongoDB Atlas cluster
- [ ] Create database user
- [ ] Allow your development IP
- [ ] Copy MongoDB URI into server/.env

## Run
- [ ] `cd server && npm install && npm run dev`
- [ ] `cd client && npm install && npm run dev`
- [ ] Open http://localhost:5173

## Production
- [ ] Deploy React client
- [ ] Deploy Express server
- [ ] Change VITE_API_URL to production API URL
- [ ] Set server environment variables
- [ ] Add production domain to Firebase authorized domains
- [ ] Restrict MongoDB network access
