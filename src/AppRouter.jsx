import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './Home'
import InsurancePage from './App'
import VirtualAdminAssistant from './VirtualAdminAssistant'
import CustomerServiceVA from './CustomerServiceVA'
import MarketingVA from './MarketingVA'
import VirtualTransactionCoordinator from './VirtualTransactionCoordinator'
import SDRVA from './SDRVA'
import VirtualAssistantServices from './VirtualAssistantServices'
import SmallBusinessVA from './SmallBusinessVA'
import EcommerceVA from './EcommerceVA'
import FinanceVA from './FinanceVA'
import PropertyManagementVA from './PropertyManagementVA'
import MedicalVA from './MedicalVA'
import HRVA from './HRVA'
import TechVA from './TechVA'
import MortgageVA from './MortgageVA'
import PricingPage from './PricingPage'
import OurVAsPage from './pages/OurVAsPage'
import AboutUs from './AboutUs'
import ContactUs from './ContactUs'
import Careers from './Careers'
import Blogs from './Blogs'
import Schema from './components/Schema'
import Footer from './components/Footer'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Schema />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/insurance" element={<InsurancePage />} />
          
          {/* Services Routes */}
          <Route path="/services/virtual-administrative-assistant" element={<VirtualAdminAssistant />} />
          <Route path="/services/customer-service-virtual-assistant" element={<CustomerServiceVA />} />
          <Route path="/services/marketing-virtual-assistant" element={<MarketingVA />} />
          <Route path="/services/virtual-transaction-coordinator" element={<VirtualTransactionCoordinator />} />
          <Route path="/services/sdr-virtual-assistant" element={<SDRVA />} />
          <Route path="/services/virtual-assistant-services" element={<VirtualAssistantServices />} />
          
          {/* Industries Routes */}
          <Route path="/industries/small-business-virtual-assistant" element={<SmallBusinessVA />} />
          <Route path="/industries/ecommerce-virtual-assistant" element={<EcommerceVA />} />
          <Route path="/industries/finance-virtual-assistant" element={<FinanceVA />} />
          <Route path="/industries/property-management-virtual-assistant" element={<PropertyManagementVA />} />
          <Route path="/industries/medical-virtual-assistant" element={<MedicalVA />} />
          <Route path="/industries/hr-virtual-assistant" element={<HRVA />} />
          <Route path="/industries/tech-virtual-assistant" element={<TechVA />} />
          <Route path="/industries/mortgage-virtual-assistant" element={<MortgageVA />} />
          
          {/* Pricing Page */}
          <Route path="/pricing" element={<PricingPage />} />
          
          {/* Our VAs Page */}
          <Route path="/our-vas" element={<OurVAsPage />} />
          <Route path="/insurance-vas" element={<OurVAsPage type="insurance" />} />
          <Route path="/licensed-insurance-agents" element={<OurVAsPage type="licensed" />} />
          <Route path="/executive-admin-vas" element={<OurVAsPage type="executive" />} />
          
          {/* About Us Page */}
          <Route path="/about-us" element={<AboutUs />} />
          
          {/* Contact Us Page */}
          <Route path="/contact-us" element={<ContactUs />} />
          
          {/* Careers Page */}
          <Route path="/careers" element={<Careers />} />
          
          {/* Blogs Page */}
          <Route path="/blogs" element={<Blogs />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  )
}