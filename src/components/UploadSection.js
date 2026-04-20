import React, { useState, useRef } from 'react';
import * as pdfjs from 'pdfjs-dist';
import * as mammoth from 'mammoth';
import './UploadSection.css';

// Set PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

const ACCEPTED = '.pdf,.doc,.docx,.png,.jpg,.jpeg,.txt';
const FILE_ICONS = {
  pdf: '📄',
  doc: '📝',
  docx: '📝',
  png: '🖼️',
  jpg: '🖼️',
  jpeg: '🖼️',
  txt: '📃',
};

export default function UploadSection({ onAnalyze, error }) {
  const [text, setText] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileIcon, setFileIcon] = useState('');
  const [dragging, setDragging] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [parseError, setParseError] = useState('');
  const [imageData, setImageData] = useState(null); // { base64, mimeType }
  const fileRef = useRef();

  const getExt = (name) => name.split('.').pop().toLowerCase();

  const handleFile = async (file) => {
    if (!file) return;
    const ext = getExt(file.name);
    setFileName(file.name);
    setFileIcon(FILE_ICONS[ext] || '📄');
    setParseError('');
    setImageData(null);
    setText('');
    setParsing(true);

    try {
      if (ext === 'txt') {
        const reader = new FileReader();
        reader.onload = (e) => { setText(e.target.result); setParsing(false); };
        reader.readAsText(file);

      } else if (ext === 'pdf') {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
        let fullText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          fullText += content.items.map(item => item.str).join(' ') + '\n';
        }
        setText(fullText.trim());
        setParsing(false);

      } else if (ext === 'doc' || ext === 'docx') {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        setText(result.value.trim());
        setParsing(false);

      } else if (['png', 'jpg', 'jpeg'].includes(ext)) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64 = e.target.result.split(',')[1];
          const mimeType = file.type || `image/${ext === 'jpg' ? 'jpeg' : ext}`;
          setImageData({ base64, mimeType });
          setParsing(false);
        };
        reader.readAsDataURL(file);

      } else {
        setParseError('Unsupported file type. Please use PDF, Word, PNG, JPEG, or TXT.');
        setParsing(false);
      }
    } catch (err) {
      setParseError('Could not read file: ' + err.message);
      setParsing(false);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleAnalyze = () => {
    if (imageData) {
      onAnalyze({ imageBase64: imageData.base64, mimeType: imageData.mimeType });
    } else {
      onAnalyze({ text });
    }
  };

  const canAnalyze = !parsing && (text.trim().length > 0 || imageData);

  return (
    <div className="upload-section">
      <div className="hero">
        <h1 className="hero-title">
          Get your resume <span className="accent-text">scored by AI</span> in seconds
        </h1>
        <p className="hero-sub">Free, instant analysis. No sign-up required. Powered by Google Gemini.</p>
      </div>

      <div className="input-card">
        {/* Supported formats badge row */}
        <div className="format-badges">
          {['PDF', 'Word', 'PNG', 'JPEG', 'TXT'].map(f => (
            <span className="format-badge" key={f}>{f}</span>
          ))}
        </div>

        <div
          className={`drop-zone ${dragging ? 'dragging' : ''} ${fileName ? 'has-file' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => fileRef.current.click()}
        >
          <div className="drop-icon">
            {parsing ? '⏳' : fileName ? fileIcon || '✓' : '↑'}
          </div>
          <p className="drop-label">
            {parsing
              ? 'Reading your file...'
              : fileName
              ? fileName
              : 'Drop your resume here or click to upload'}
          </p>
          <p className="drop-hint">
            {parsing ? 'Please wait' : 'PDF · Word · PNG · JPEG · TXT'}
          </p>
          <input
            ref={fileRef}
            type="file"
            accept={ACCEPTED}
            style={{ display: 'none' }}
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </div>

        {/* Image preview */}
        {imageData && (
          <div className="image-preview">
            <img
              src={`data:${imageData.mimeType};base64,${imageData.base64}`}
              alt="Resume preview"
            />
            <p className="image-note">Image ready — Gemini Vision will read this directly</p>
          </div>
        )}

        {parseError && <div className="error-box">{parseError}</div>}

        {/* Show extracted text only for non-image files */}
        {!imageData && (
          <>
            <div className="divider"><span>or paste your resume below</span></div>
            <textarea
              className="resume-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={"Paste your full resume text here...\n\nInclude: Contact info, Summary, Work Experience, Education, Skills, Certifications..."}
              rows={10}
            />
          </>
        )}

        {error && <div className="error-box">{error}</div>}

        <button className="analyze-btn" onClick={handleAnalyze} disabled={!canAnalyze}>
          {parsing ? 'Reading file...' : 'Analyze My Resume'}
          {!parsing && <span className="btn-arrow">→</span>}
        </button>

        <p className="privacy-note">Your resume is never stored. Analysis happens in real time.</p>
      </div>

      <div className="how-it-works" id="how">
        <h2 className="section-title">How it works</h2>
        <div className="steps-grid">
          {[
            { num: '01', title: 'Upload or paste', desc: 'PDF, Word, image, or plain text — all supported' },
            { num: '02', title: 'AI analysis', desc: 'Gemini AI reviews every section of your resume' },
            { num: '03', title: 'Get your score', desc: 'Receive a detailed score with actionable tips' },
          ].map(step => (
            <div className="step-card" key={step.num}>
              <div className="step-num">{step.num}</div>
              <div className="step-title">{step.title}</div>
              <div className="step-desc">{step.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="faq-section" id="faq">
        <h2 className="section-title">FAQ</h2>
        {[
          { q: 'Is this really free?', a: 'Yes, 100% free. No sign-up, no credit card, no limits.' },
          { q: 'Is my resume data safe?', a: 'Your resume is sent to Google Gemini for analysis and is never stored on our servers.' },
          { q: 'What file types are supported?', a: 'PDF, Word (.doc/.docx), PNG, JPEG, and TXT files are all supported.' },
          { q: 'How accurate is the AI analysis?', a: 'The analysis is powered by Google Gemini and follows industry best practices for resume writing.' },
        ].map((item, i) => (
          <div className="faq-item" key={i}>
            <div className="faq-q">{item.q}</div>
            <div className="faq-a">{item.a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
