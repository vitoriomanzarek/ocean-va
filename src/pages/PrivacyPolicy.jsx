import React from 'react'

export default function PrivacyPolicy() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-ocean-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-ocean-100 text-lg">Last updated: January 2025</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10 text-gray-700 leading-relaxed">

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p>Ocean Virtual Assistant Solutions ("Ocean VA", "we", "us", or "our") is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
              <p>We may collect the following types of information:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong>Personal Information:</strong> Name, email address, phone number, company name, and billing information provided when you contact us or sign up for services.</li>
                <li><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited, time spent, and referral sources.</li>
                <li><strong>Communications:</strong> Records of emails, calls, or messages you send to us.</li>
                <li><strong>Technical Data:</strong> IP address, browser type, device information, and cookies.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Provide, operate, and maintain our services</li>
                <li>Process transactions and send related information</li>
                <li>Respond to inquiries and provide customer support</li>
                <li>Send marketing and promotional communications (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Sharing Your Information</h2>
              <p>We do not sell, trade, or rent your personal information to third parties. We may share information with:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong>Service Providers:</strong> Trusted partners who assist in operating our website and delivering services (e.g., payment processors, email providers).</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and the rights of others.</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookies</h2>
              <p>We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie settings through your browser. Disabling cookies may affect some website functionality.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Security</h2>
              <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Retention</h2>
              <p>We retain your personal information for as long as necessary to provide our services and comply with legal obligations. When data is no longer needed, we securely delete or anonymize it.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Your Rights</h2>
              <p>Depending on your location, you may have the right to:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt out of marketing communications</li>
                <li>Data portability</li>
              </ul>
              <p className="mt-3">To exercise these rights, contact us at <a href="mailto:info@oceanvirtualassistant.com" className="text-ocean-600 hover:text-ocean-700">info@oceanvirtualassistant.com</a>.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Third-Party Links</h2>
              <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Children's Privacy</h2>
              <p>Our services are not directed to children under 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us immediately.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to This Policy</h2>
              <p>We may update this Privacy Policy periodically. We will notify you of significant changes by posting the new policy on our website with an updated date. Continued use of our services after changes constitutes acceptance.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
              <p>For questions or concerns about this Privacy Policy, please contact us:</p>
              <div className="mt-4 space-y-2">
                <p><strong>Ocean Virtual Assistant Solutions</strong></p>
                <p>789 SW Federal Highway, Suite 201</p>
                <p>Stuart, FL 34994</p>
                <p>Email: <a href="mailto:info@oceanvirtualassistant.com" className="text-ocean-600 hover:text-ocean-700">info@oceanvirtualassistant.com</a></p>
                <p>Phone: 772-247-0269</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
