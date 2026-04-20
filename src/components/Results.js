import React, { useState } from 'react';
import './Results.css';

function ScoreRing({ score, size = 120 }) {
  const r = 44;
  const circ = 2 * Math.PI * r;
  const fill = (score / 100) * circ;
  const color = score >= 75 ? '#6ee7b7' : score >= 50 ? '#fbbf24' : '#f87171';
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
      <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="8"
        strokeDasharray={`${fill} ${circ}`} strokeLinecap="round" transform="rotate(-90 50 50)"
        style={{ transition: 'stroke-dasharray 1.2s ease' }} />
      <text x="50" y="46" textAnchor="middle" fill={color} fontSize="20" fontFamily="Syne" fontWeight="700">{score}</text>
      <text x="50" y="60" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="DM Sans">/100</text>
    </svg>
  );
}

function MiniBar({ value, color }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 4, height: 5, marginTop: 8 }}>
      <div style={{ width: `${value}%`, height: 5, borderRadius: 4, background: color, transition: 'width 1s ease' }} />
    </div>
  );
}

function highlightText(text, phrases) {
  if (!phrases || phrases.length === 0) return <>{text}</>;
  const escaped = phrases.map(p => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`(${escaped.join('|')})`, 'gi');
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) => {
        const isHighlight = phrases.some(p => p.toLowerCase() === part.toLowerCase());
        return isHighlight
          ? <mark key={i} className="cv-highlight" title="Area to improve">{part}</mark>
          : <span key={i}>{part}</span>;
      })}
    </>
  );
}

function CVPreview({ resumeText, resumeImage, highlights }) {
  const [showFull, setShowFull] = useState(false);
  const displayText = showFull ? resumeText : resumeText.substring(0, 1500);
  const truncated = resumeText.length > 1500;

  return (
    <div className="card cv-preview-card">
      <div className="cv-preview-header">
        <h3 className="card-title" style={{ marginBottom: 0 }}>Your Resume</h3>
        <span className="cv-legend">
          <span className="legend-dot"></span> Areas to improve
        </span>
      </div>

      {resumeImage ? (
        <div className="cv-image-wrap">
          <img src={`data:${resumeImage.mimeType};base64,${resumeImage.base64}`} alt="Your resume" className="cv-image" />
          <div className="cv-image-note">
            💡 Highlighted improvements shown in the analysis below
          </div>
        </div>
      ) : (
        <div className="cv-text-body">
          <pre className="cv-text">
            {highlightText(displayText, highlights)}
            {truncated && !showFull && <span className="cv-fade"> ...</span>}
          </pre>
          {truncated && (
            <button className="cv-toggle" onClick={() => setShowFull(!showFull)}>
              {showFull ? '▲ Show less' : '▼ Show full resume'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function Results({ data, onReset, resumeText, resumeImage }) {
  const sections = [
    { key: 'summary', label: 'Summary', color: '#38bdf8' },
    { key: 'experience', label: 'Experience', color: '#6ee7b7' },
    { key: 'skills', label: 'Skills', color: '#a78bfa' },
    { key: 'education', label: 'Education', color: '#fbbf24' },
    { key: 'formatting', label: 'Formatting', color: '#fb7185' },
  ];

  return (
    <div className="results">
      {/* Score overview */}
      <div className="score-overview">
        <div className="score-main">
          <ScoreRing score={data.overall_score || 0} size={130} />
          <div className="score-meta">
            <div className="score-label">Overall Score</div>
            <div className="score-verdict">{data.verdict}</div>
          </div>
        </div>
        <div className="mini-scores">
          <div className="mini-score-card">
            <div className="mini-score-val" style={{ color: '#38bdf8' }}>{data.ats_score || 0}</div>
            <div className="mini-score-label">ATS Score</div>
          </div>
          <div className="mini-score-card">
            <div className="mini-score-val" style={{ color: '#a78bfa' }}>{data.impact_score || 0}</div>
            <div className="mini-score-label">Impact Score</div>
          </div>
        </div>
      </div>

      {/* CV Preview with highlights */}
      {(resumeText || resumeImage) && (
        <CVPreview
          resumeText={resumeText}
          resumeImage={resumeImage}
          highlights={data.highlight_phrases || []}
        />
      )}

      {/* Section breakdown */}
      <div className="card">
        <h3 className="card-title">Section breakdown</h3>
        <div className="sections-grid">
          {sections.map(sec => (
            <div className="sec-item" key={sec.key}>
              <div className="sec-top">
                <span className="sec-label">{sec.label}</span>
                <span className="sec-val" style={{ color: sec.color }}>{data.sections?.[sec.key] || 0}/100</span>
              </div>
              <MiniBar value={data.sections?.[sec.key] || 0} color={sec.color} />
            </div>
          ))}
        </div>
      </div>

      <div className="two-col">
        <div className="card">
          <h3 className="card-title">Strengths</h3>
          <ul className="tip-list">
            {(data.strengths || []).map((s, i) => (
              <li key={i} className="tip-item">
                <span className="tip-dot" style={{ background: '#6ee7b7' }}></span>{s}
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3 className="card-title">Areas to improve</h3>
          <ul className="tip-list">
            {(data.improvements || []).map((s, i) => (
              <li key={i} className="tip-item">
                <span className="tip-dot" style={{ background: '#fbbf24' }}></span>{s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">Quick wins</h3>
        <div className="quick-wins">
          {(data.quick_wins || []).map((w, i) => (
            <div className="quick-win-item" key={i}>
              <span className="qw-num">0{i + 1}</span><span>{w}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">Keywords to add</h3>
        <p className="card-sub">Add these to improve ATS compatibility</p>
        <div className="keywords">
          {(data.keywords || []).map((k, i) => (
            <span className="keyword" key={i}>{k}</span>
          ))}
        </div>
      </div>

      <button className="reset-btn" onClick={onReset}>← Analyze another resume</button>
    </div>
  );
}
