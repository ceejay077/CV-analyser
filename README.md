# CV Analyser — Free AI Resume Review

A free AI-powered resume analyzer built with React and Google Gemini.

## Features
- Upload PDF, Word (.doc/.docx), PNG, JPEG, or TXT — or paste text
- AI-powered scoring (Overall, ATS, Impact)
- Section-by-section breakdown
- Strengths & improvement tips
- Keywords to add for ATS
- AdSense-ready ad placements
- Mobile responsive

## Setup

### 1. Clone the repo
```bash
git clone https://github.com/ceejay077/CV-analyser.git
cd CV-analyser
```

### 2. Install dependencies
```bash
npm install
```

### 3. Add your Gemini API key
Create a `.env` file in the root:
```
REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
```
Get a free key at: https://aistudio.google.com

### 4. Run locally
```bash
npm start
```

## Deploy to Vercel (Free)

1. Push this code to GitHub
2. Go to https://vercel.com and sign in with GitHub
3. Click "New Project" → Import your repo
4. Add environment variable: `REACT_APP_GEMINI_API_KEY` = your key
5. Click Deploy

## Add Google AdSense
Replace the `.ad-slot` divs in `App.js` with your AdSense code after approval.

## Tech Stack
- React 18
- Google Gemini API (free tier)
- CSS Variables for theming
- Deployed on Vercel
