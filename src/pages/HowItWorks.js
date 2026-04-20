import React from 'react';
import './Page.css';

export default function HowItWorks() {
  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <h1 className="page-title">How CV Analyser Works</h1>
        <p className="page-subtitle">Free, instant, AI-powered resume feedback — no sign-up needed</p>
      </div>

      <div className="page-content">

        <section className="page-section">
          <h2>Step-by-step process</h2>
          <div className="steps-list">
            {[
              { num: '01', icon: '📤', title: 'Upload or paste your resume', desc: 'You can upload your resume as a PDF, Word document (.doc/.docx), image (PNG or JPEG), or plain text file. You can also simply paste your resume text directly into the text box. No account or sign-up is required.' },
              { num: '02', icon: '🔍', title: 'AI reads your content', desc: 'For text-based files (PDF, Word, TXT), our system extracts the text and sends it to the AI for analysis. For image files (PNG, JPEG), the AI uses vision capabilities to read the resume directly from the image — just like a human reviewer would.' },
              { num: '03', icon: '🤖', title: 'Groq AI analyzes your resume', desc: 'Your resume is analyzed by Llama 3.3 70B — one of the most advanced open-source AI models in the world, running on Groq\'s ultra-fast infrastructure. The AI evaluates your resume against industry best practices and ATS (Applicant Tracking System) standards.' },
              { num: '04', icon: '📊', title: 'You receive a detailed score', desc: 'Within seconds, you get a comprehensive analysis including an overall score out of 100, ATS compatibility score, impact score, section-by-section breakdown, key strengths, areas to improve, quick wins, and recommended keywords to add.' },
              { num: '05', icon: '🖊️', title: 'Highlighted areas in your resume', desc: 'Your uploaded resume is displayed with specific phrases and sections highlighted in yellow — these are the exact areas the AI identified as needing improvement, so you know precisely what to fix.' },
            ].map(s => (
              <div className="step-row" key={s.num}>
                <div className="step-left">
                  <div className="step-circle">{s.num}</div>
                  <div className="step-line"></div>
                </div>
                <div className="step-right">
                  <div className="step-icon">{s.icon}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="page-section">
          <h2>What we analyze</h2>
          <div className="feature-grid">
            {[
              { icon: '📝', title: 'Professional Summary', desc: 'Is your summary compelling, concise, and tailored to the role?' },
              { icon: '💼', title: 'Work Experience', desc: 'Are your achievements quantified? Do you use strong action verbs?' },
              { icon: '🛠️', title: 'Skills Section', desc: 'Are the right technical and soft skills listed for your target role?' },
              { icon: '🎓', title: 'Education', desc: 'Is your education section properly formatted and complete?' },
              { icon: '🤖', title: 'ATS Compatibility', desc: 'Will your resume pass through Applicant Tracking Systems?' },
              { icon: '🎯', title: 'Keywords', desc: 'Does your resume include the industry keywords recruiters search for?' },
              { icon: '📐', title: 'Formatting & Structure', desc: 'Is the layout clean, readable, and professionally structured?' },
              { icon: '⚡', title: 'Impact & Tone', desc: 'Does your language convey confidence, results, and impact?' },
            ].map(f => (
              <div className="feature-card" key={f.title}>
                <div className="feature-icon">{f.icon}</div>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="page-section">
          <h2>Supported file formats</h2>
          <div className="format-table">
            {[
              { fmt: 'PDF (.pdf)', how: 'Text extracted from all pages automatically', icon: '📄' },
              { fmt: 'Word (.docx)', how: 'Full text extracted including all sections', icon: '📝' },
              { fmt: 'Word (.doc)', how: 'Text extracted using document parser', icon: '📝' },
              { fmt: 'Image (.png)', how: 'AI reads the resume visually using vision model', icon: '🖼️' },
              { fmt: 'Image (.jpg/.jpeg)', how: 'AI reads the resume visually using vision model', icon: '🖼️' },
              { fmt: 'Plain text (.txt)', how: 'Read directly as text content', icon: '📃' },
              { fmt: 'Paste text', how: 'Copy and paste directly into the text box', icon: '✍️' },
            ].map(f => (
              <div className="format-row" key={f.fmt}>
                <span className="format-icon">{f.icon}</span>
                <span className="format-name">{f.fmt}</span>
                <span className="format-how">{f.how}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="page-section">
          <h2>Frequently asked questions</h2>
          <div className="faq-list">
            {[
              { q: 'Is CV Analyser really free?', a: 'Yes, completely free. No sign-up, no subscription, no credit card required. You can analyze as many resumes as you like.' },
              { q: 'How accurate is the AI analysis?', a: 'The analysis is powered by Llama 3.3 70B, one of the most capable AI models available. It follows industry best practices used by professional HR consultants and career coaches. However, it is an AI tool and should be used as a guide, not a guarantee.' },
              { q: 'Is my resume data private?', a: 'Your resume text is sent to Groq\'s API for analysis and is not stored on our servers. Please read our Privacy Policy for full details.' },
              { q: 'Can I use it for any industry?', a: 'Yes. The AI analyzes general resume quality, ATS compatibility, and writing best practices that apply across all industries — tech, finance, healthcare, marketing, and more.' },
              { q: 'What does ATS score mean?', a: 'ATS stands for Applicant Tracking System — the software most companies use to automatically filter resumes before a human sees them. A higher ATS score means your resume is more likely to pass these filters.' },
              { q: 'Why are some phrases highlighted in yellow?', a: 'The AI identifies specific phrases in your resume that are weak, vague, or could be improved. These are highlighted so you know exactly where to focus your editing.' },
            ].map((f, i) => (
              <div className="faq-block" key={i}>
                <h4>{f.q}</h4>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
