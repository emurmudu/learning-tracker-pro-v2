# Learning Tracker Pro

A professional full-stack learning tracker built with:

- React + Vite
- Tailwind CSS
- Firebase Authentication
- Express.js
- MongoDB + Mongoose
- Recharts
- React Router

## Features

- Email/password login and registration
- Google login
- Firebase authentication with protected API routes
- MongoDB cloud persistence
- Daily learning records
- Tomorrow planning
- Edit/delete learning records
- Edit/delete plans
- Calendar view
- Monthly reports
- Advanced dashboard
- Weekly/monthly learning charts
- Learning streak
- Subject statistics
- Dark mode
- Responsive UI

## Architecture

React frontend
  -> Firebase Authentication
  -> Express API with Firebase Admin token verification
  -> MongoDB

## 1. Firebase setup

Create a Firebase project at https://console.firebase.google.com

Enable:

- Authentication > Sign-in method > Email/Password
- Authentication > Sign-in method > Google

Create a Web App and copy its configuration into:

`client/.env`

Example:

VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_URL=http://localhost:5000/api

## 2. Firebase Admin setup

In Firebase Console:

Project settings > Service accounts > Generate new private key

Save the downloaded JSON as:

`server/serviceAccountKey.json`

Do NOT commit this file.

## 3. MongoDB setup

Create a MongoDB Atlas database and put the connection string in:

`server/.env`

Example:

PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/learning_tracker
CLIENT_URL=http://localhost:5173

## 4. Install

Open two terminals.

### Server

cd server
npm install
npm run dev

### Client

cd client
npm install
npm run dev

Then open:

http://localhost:5173

## Security

- Firebase handles authentication.
- The backend verifies Firebase ID tokens.
- MongoDB records are scoped to the authenticated Firebase UID.
- Never expose serviceAccountKey.json to the browser.
