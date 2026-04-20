import React from 'react';
import './Page.css';

export default function TermsConditions() {
  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <h1 className="page-title">Terms & Conditions</h1>
        <p className="page-subtitle">Last updated: January 2025</p>
      </div>

      <div className="page-content prose">

        <section className="page-section">
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing or using CV Analyser ("the Service"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, please do not use the Service. These Terms apply to all visitors and users of the Service.</p>
        </section>

        <section className="page-section">
          <h2>2. Description of Service</h2>
          <p>CV Analyser is a free web-based tool that uses artificial intelligence to analyze resume content and provide feedback, scores, and suggestions for improvement. The Service is provided for informational and educational purposes only.</p>
          <p>The AI analysis is generated automatically and should be considered as general guidance, not as professional career counseling, recruitment advice, or a guarantee of employment outcomes.</p>
        </section>

        <section className="page-section">
          <h2>3. Use of the Service</h2>
          <h3>Permitted Use</h3>
          <p>You may use CV Analyser for personal, non-commercial purposes to analyze your own resume or resumes you are authorized to submit. You may use the feedback provided to improve your resume and job application materials.</p>

          <h3>Prohibited Use</h3>
          <p>You agree not to:</p>
          <ul>
            <li>Use the Service to submit resumes or personal information belonging to others without their explicit consent</li>
            <li>Attempt to reverse-engineer, copy, or replicate the Service</li>
            <li>Use automated scripts, bots, or crawlers to access the Service</li>
            <li>Upload malicious files or content intended to harm the Service or other users</li>
            <li>Use the Service for any unlawful purpose or in violation of any applicable laws</li>
            <li>Submit false, misleading, or fraudulent information</li>
            <li>Attempt to overload or disrupt the Service's infrastructure</li>
          </ul>
        </section>

        <section className="page-section">
          <h2>4. Intellectual Property</h2>
          <p>The CV Analyser website, including its design, code, branding, and content (excluding user-submitted resume content), is owned by CV Analyser and protected by applicable intellectual property laws.</p>
          <p>You retain full ownership of any resume content you submit. By submitting content, you grant us a limited, temporary license to process it solely for the purpose of providing the analysis service.</p>
        </section>

        <section className="page-section">
          <h2>5. Disclaimer of Warranties</h2>
          <p>The Service is provided "as is" and "as available" without any warranties of any kind, either express or implied. We do not warrant that:</p>
          <ul>
            <li>The Service will be uninterrupted, error-free, or secure</li>
            <li>The AI analysis will be accurate, complete, or suitable for your specific situation</li>
            <li>Using the Service will result in job interviews, offers, or employment</li>
            <li>The Service will meet your specific requirements or expectations</li>
          </ul>
          <p>AI-generated feedback is based on general best practices and may not apply to every industry, role, or specific employer's preferences.</p>
        </section>

        <section className="page-section">
          <h2>6. Limitation of Liability</h2>
          <p>To the fullest extent permitted by law, CV Analyser and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:</p>
          <ul>
            <li>Loss of employment opportunities or income</li>
            <li>Damages resulting from reliance on AI-generated feedback</li>
            <li>Any interruption or cessation of the Service</li>
            <li>Unauthorized access to or alteration of your submitted content</li>
          </ul>
          <p>Our total liability to you for any claims arising from use of the Service shall not exceed the amount you paid for the Service (which is zero, as the Service is free).</p>
        </section>

        <section className="page-section">
          <h2>7. Third-Party Services</h2>
          <p>CV Analyser uses third-party services including Groq API for AI processing and Google AdSense for advertising. Your use of the Service may be subject to the terms and privacy policies of these third parties. We are not responsible for the practices of these third-party services.</p>
        </section>

        <section className="page-section">
          <h2>8. Advertising</h2>
          <p>CV Analyser displays advertisements through Google AdSense. These advertisements help us keep the Service free for all users. By using the Service, you consent to the display of such advertisements. We are not responsible for the content of third-party advertisements.</p>
        </section>

        <section className="page-section">
          <h2>9. Availability and Modifications</h2>
          <p>We reserve the right to modify, suspend, or discontinue the Service (or any part of it) at any time, with or without notice. We may also update these Terms at any time. Continued use of the Service after changes to the Terms constitutes your acceptance of the new Terms.</p>
        </section>

        <section className="page-section">
          <h2>10. Privacy</h2>
          <p>Your use of the Service is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy to understand our data practices.</p>
        </section>

        <section className="page-section">
          <h2>11. Governing Law</h2>
          <p>These Terms shall be governed by and construed in accordance with applicable law. Any disputes arising from these Terms or use of the Service shall be resolved in the appropriate courts of jurisdiction.</p>
        </section>

        <section className="page-section">
          <h2>12. Contact</h2>
          <p>If you have any questions about these Terms and Conditions, please contact us at: <strong>legal@cvanalyser.com</strong></p>
        </section>

      </div>
    </div>
  );
}
