import React from 'react'

export default function TermsAndConditions() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-ocean-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms &amp; Conditions</h1>
          <p className="text-ocean-100 text-lg">Last updated: January 2025</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-gray max-w-none">
          <div className="space-y-10 text-gray-700 leading-relaxed">

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p>By accessing and using the services provided by Ocean Virtual Assistant Solutions ("Ocean VA", "we", "us", or "our"), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Services</h2>
              <p>Ocean VA provides virtual assistant staffing and related services. Our virtual assistants are independent contractors who work remotely to support your business operations. The scope of services is defined in your individual service agreement.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Client Responsibilities</h2>
              <p>Clients are responsible for:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Providing clear and timely instructions to assigned virtual assistants</li>
                <li>Maintaining a respectful and professional work environment</li>
                <li>Protecting confidential business information shared with virtual assistants</li>
                <li>Timely payment of all invoices according to the agreed schedule</li>
                <li>Providing necessary tools, access, and training materials as agreed</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Payments and Billing</h2>
              <p>All payments are due as specified in your service agreement. Ocean VA reserves the right to suspend services for accounts with outstanding balances. Pricing is subject to change with 30 days written notice to existing clients.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Confidentiality</h2>
              <p>Ocean VA and its virtual assistants agree to maintain the confidentiality of all client information and business data. Clients agree not to solicit or directly hire Ocean VA virtual assistants outside of this agreement during the engagement and for 12 months following termination.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property</h2>
              <p>Work product created by Ocean VA virtual assistants on behalf of clients becomes the property of the client upon full payment. Ocean VA retains the right to use general methodologies and non-confidential processes for other clients.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
              <p>Ocean VA's liability is limited to the fees paid in the month in which any issue arose. We are not liable for indirect, incidental, or consequential damages. Clients are responsible for maintaining appropriate data backup and security measures.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Termination</h2>
              <p>Either party may terminate the service agreement with 30 days written notice. Ocean VA reserves the right to terminate immediately for violations of these terms, non-payment, or conduct that is harmful to our virtual assistants.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Dispute Resolution</h2>
              <p>Any disputes shall first be addressed through good-faith negotiation. If unresolved, disputes will be subject to binding arbitration in Stuart, Florida, under the rules of the American Arbitration Association. These terms are governed by the laws of the State of Florida.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to Terms</h2>
              <p>Ocean VA reserves the right to update these Terms and Conditions at any time. We will notify existing clients of material changes via email with 30 days notice. Continued use of our services after changes constitute acceptance of the new terms.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
              <p>For questions about these Terms and Conditions, please contact us:</p>
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
