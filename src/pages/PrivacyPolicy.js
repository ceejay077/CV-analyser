import React from 'react';
import './Page.css';

export default function PrivacyPolicy() {
  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <h1 className="page-title">Privacy Policy</h1>
        <p className="page-subtitle">Last updated: January 2025</p>
      </div>

      <div className="page-content prose">

        <section className="page-section">
          <h2>1. Introduction</h2>
          <p>Welcome to CV Analyser ("we", "our", or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and AI-powered resume analysis service.</p>
          <p>By using CV Analyser, you agree to the terms of this Privacy Policy. If you do not agree with the terms, please discontinue use of our service.</p>
        </section>

        <section className="page-section">
          <h2>2. Information We Collect</h2>
          <h3>Resume Content</h3>
          <p>When you use CV Analyser, you voluntarily submit resume content — either by uploading a file (PDF, Word, image, or text) or by pasting text directly. This content is processed solely for the purpose of providing you with an AI-generated analysis.</p>
          <p><strong>We do not store your resume content on our servers.</strong> Your resume text or image is transmitted directly to the Groq API for processing and is not saved, logged, or retained by CV Analyser after the analysis is complete.</p>

          <h3>Automatically Collected Data</h3>
          <p>Like most websites, we may automatically collect certain technical information when you visit, including:</p>
          <ul>
            <li>IP address (for security and fraud prevention)</li>
            <li>Browser type and version</li>
            <li>Pages visited and time spent on the site</li>
            <li>Referring website or source</li>
            <li>Device type (desktop, mobile, tablet)</li>
          </ul>
          <p>This data is collected through standard web analytics tools and is used solely to improve the service and understand usage patterns.</p>

          <h3>Cookies</h3>
          <p>We use cookies and similar tracking technologies to enhance your browsing experience. This includes cookies from Google AdSense for advertising purposes. You can control cookie settings through your browser preferences.</p>
        </section>

        <section className="page-section">
          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect for the following purposes:</p>
          <ul>
            <li>To provide and operate the resume analysis service</li>
            <li>To improve and optimize the website experience</li>
            <li>To display relevant advertisements via Google AdSense</li>
            <li>To monitor and analyze usage and trends</li>
            <li>To detect and prevent fraudulent or abusive use</li>
          </ul>
        </section>

        <section className="page-section">
          <h2>4. Third-Party Services</h2>
          <h3>Groq API</h3>
          <p>Resume content you submit is sent to Groq's API (groq.com) for AI-powered analysis. Groq processes this data according to their own privacy policy. We recommend reviewing <a href="https://groq.com/privacy-policy/" target="_blank" rel="noopener noreferrer">Groq's Privacy Policy</a> for details on how they handle data.</p>

          <h3>Google AdSense</h3>
          <p>We use Google AdSense to display advertisements. Google may use cookies to serve ads based on your prior visits to this website or other websites. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google's Ads Settings</a>.</p>

          <h3>Hosting & Analytics</h3>
          <p>Our website is hosted on Vercel. We may use analytics services to track website usage. These services may collect anonymized usage data in accordance with their respective privacy policies.</p>
        </section>

        <section className="page-section">
          <h2>5. Data Retention</h2>
          <p>We do not retain your resume content after analysis is complete. Technical logs (such as server access logs) may be retained for up to 30 days for security and debugging purposes, after which they are automatically deleted.</p>
        </section>

        <section className="page-section">
          <h2>6. Data Security</h2>
          <p>We take reasonable technical and organizational measures to protect your information. All data transmissions are encrypted using HTTPS/TLS. However, no method of internet transmission is 100% secure, and we cannot guarantee absolute security.</p>
        </section>

        <section className="page-section">
          <h2>7. Children's Privacy</h2>
          <p>CV Analyser is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us immediately.</p>
        </section>

        <section className="page-section">
          <h2>8. Your Rights</h2>
          <p>Depending on your location, you may have the following rights regarding your personal data:</p>
          <ul>
            <li>The right to access information we hold about you</li>
            <li>The right to request correction of inaccurate data</li>
            <li>The right to request deletion of your data</li>
            <li>The right to opt out of certain data processing</li>
          </ul>
          <p>Since we do not store resume content, most data deletion requests are automatically fulfilled. For other requests, please contact us.</p>
        </section>

        <section className="page-section">
          <h2>9. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify users of significant changes by updating the "Last updated" date at the top of this page. Continued use of the service after changes constitutes acceptance of the updated policy.</p>
        </section>

        <section className="page-section">
          <h2>10. Contact Us</h2>
          <p>If you have questions about this Privacy Policy or our data practices, please contact us at: <strong>privacy@cvanalyser.com</strong></p>
        </section>

      </div>
    </div>
  );
}
