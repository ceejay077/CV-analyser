import React, { useState } from 'react';
import Header from './components/Header';
import UploadSection from './components/UploadSection';
import Results from './components/Results';
import Footer from './components/Footer';
import HowItWorks from './pages/HowItWorks';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import './App.css';

const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY;

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
  "quick_wins": ["<quick win 1>", "<quick win 2>", "<quick win 3>"],
  "highlight_phrases": ["<exact phrase from resume that needs improvement 1>", "<phrase 2>", "<phrase 3>", "<phrase 4>", "<phrase 5>"]
}`;

function App() {
  const [state, setState] = useState('idle');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [resumeImage, setResumeImage] = useState(null);
  const [page, setPage] = useState('home'); // home | how | privacy | terms

  const analyzeResume = async ({ text, imageBase64, mimeType }) => {
    if (!text && !imageBase64) { setError('Please provide resume content before analyzing.'); return; }
    if (text && text.trim().length < 50) { setError('Please provide more resume content (at least 50 characters).'); return; }
    setError('');
    setState('loading');
    setResumeText(text || '');
    setResumeImage(imageBase64 ? { base64: imageBase64, mimeType } : null);

    try {
      let userContent;
      if (imageBase64) {
        userContent = [
          { type: 'image_url', image_url: { url: `data:${mimeType};base64,${imageBase64}` } },
          { type: 'text', text: 'This is a resume image. ' + PROMPT }
        ];
      } else {
        userContent = `Analyze this resume:\n\n${text.substring(0, 5000)}\n\n${PROMPT}`;
      }

      const model = imageBase64 ? 'meta-llama/llama-4-scout-17b-16e-instruct' : 'llama-3.3-70b-versatile';
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
        body: JSON.stringify({ model, messages: [{ role: 'user', content: userContent }], temperature: 0.3, max_tokens: 1200 })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || 'API error');
      let raw = data.choices?.[0]?.message?.content || '';
      raw = raw.replace(/```json|```/g, '').trim();
      const result = JSON.parse(raw);
      setResults(result);
      setState('results');
    } catch (err) {
      setState('idle');
      setError('Analysis failed: ' + err.message + '. Please try again.');
    }
  };

  const reset = () => { setState('idle'); setResults(null); setError(''); setResumeText(''); setResumeImage(null); };

  const navigate = (p) => { setPage(p); window.scrollTo(0, 0); };

  if (page === 'how') return <><Header onNavigate={navigate} /><HowItWorks /><Footer onNavigate={navigate} /></>;
  if (page === 'privacy') return <><Header onNavigate={navigate} /><PrivacyPolicy /><Footer onNavigate={navigate} /></>;
  if (page === 'terms') return <><Header onNavigate={navigate} /><TermsConditions /><Footer onNavigate={navigate} /></>;

  return (
    <div className="app-wrapper">
      <Header onNavigate={navigate} />
      <main className="main-content">
        <div className="ad-slot" style={{ height: 90, marginBottom: '2rem' }}>Advertisement — Google AdSense (728x90)</div>
        {state === 'idle' && <UploadSection onAnalyze={analyzeResume} error={error} onNavigate={navigate} />}
        {state === 'loading' && <LoadingState />}
        {state === 'results' && results && (
          <Results data={results} onReset={reset} resumeText={resumeText} resumeImage={resumeImage} />
        )}
        <div className="ad-slot" style={{ height: 250, marginTop: '2rem' }}>Advertisement — Google AdSense (300x250)</div>
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
}

function LoadingState() {
  return (
    <div className="loading-wrapper">
      <div className="loading-ring"><div></div><div></div><div></div><div></div></div>
      <p className="loading-title">Analyzing your resume...</p>
      <p className="loading-sub">Groq AI is reviewing your content</p>
    </div>
  );
}

export default App;
