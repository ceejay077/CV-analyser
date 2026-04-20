import React, { useState } from 'react';
import Header from './components/Header';
import UploadSection from './components/UploadSection';
import Results from './components/Results';
import Footer from './components/Footer';
import './App.css';

const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

const PROMPT = `You are an expert resume reviewer and career coach. Analyze the resume and return a JSON object ONLY — no markdown, no backticks, no explanation. Just raw JSON.

Return ONLY this exact JSON structure:
{
  "overall_score": <number 0-100>,
  "verdict": "<one sentence overall verdict>",
  "ats_score": <number 0-100>,
  "impact_score": <number 0-100>,
  "sections": {
    "summary": <0-100>,
    "experience": <0-100>,
    "skills": <0-100>,
    "education": <0-100>,
    "formatting": <0-100>
  },
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "improvements": ["<improvement 1>", "<improvement 2>", "<improvement 3>", "<improvement 4>"],
  "keywords": ["<keyword1>", "<keyword2>", "<keyword3>", "<keyword4>", "<keyword5>", "<keyword6>"],
  "quick_wins": ["<quick win 1>", "<quick win 2>", "<quick win 3>"]
}`;

function App() {
  const [state, setState] = useState('idle');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const analyzeResume = async ({ text, imageBase64, mimeType }) => {
    if (!text && !imageBase64) {
      setError('Please provide resume content before analyzing.');
      return;
    }
    if (text && text.trim().length < 50) {
      setError('Please provide more resume content (at least 50 characters).');
      return;
    }
    setError('');
    setState('loading');

    try {
      let parts = [];

      if (imageBase64) {
        parts = [
          { inline_data: { mime_type: mimeType, data: imageBase64 } },
          { text: 'This is a resume image. ' + PROMPT }
        ];
      } else {
        parts = [{ text: `Analyze this resume:\n\n${text.substring(0, 5000)}\n\n${PROMPT}` }];
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts }],
            generationConfig: { temperature: 0.3, maxOutputTokens: 1024 }
          })
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || 'API error');

      let raw = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      raw = raw.replace(/```json|```/g, '').trim();
      const result = JSON.parse(raw);
      setResults(result);
      setState('results');
    } catch (err) {
      setState('idle');
      setError('Analysis failed: ' + err.message + '. Please try again.');
    }
  };

  const reset = () => {
    setState('idle');
    setResults(null);
    setError('');
  };

  return (
    <div className="app-wrapper">
      <Header />
      <main className="main-content">
        <div className="ad-slot" style={{ height: 90, marginBottom: '2rem' }}>
          Advertisement — Google AdSense (728x90)
        </div>
        {state === 'idle' && <UploadSection onAnalyze={analyzeResume} error={error} />}
        {state === 'loading' && <LoadingState />}
        {state === 'results' && results && <Results data={results} onReset={reset} />}
        <div className="ad-slot" style={{ height: 250, marginTop: '2rem' }}>
          Advertisement — Google AdSense (300x250)
        </div>
      </main>
      <Footer />
    </div>
  );
}

function LoadingState() {
  return (
    <div className="loading-wrapper">
      <div className="loading-ring">
        <div></div><div></div><div></div><div></div>
      </div>
      <p className="loading-title">Analyzing your resume...</p>
      <p className="loading-sub">Gemini AI is reviewing your content</p>
    </div>
  );
}

export default App;
