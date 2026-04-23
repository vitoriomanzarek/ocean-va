import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import NavbarVA from './components/NavbarVA'
import App from './App'
import Footer from './components/Footer'
import Schema from './components/Schema'
import ProtectedRoute from './components/ProtectedRoute'

// Pages - General
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import Careers from './pages/Careers'
import Blogs from './pages/Blogs'
import FAQsPage from './pages/FAQsPage'
import PricingPage from './pages/PricingPage'

// Pages - Services
import InsuranceCostumerService from './pages/services/InsuranceCostumerService'
import VirtualAdminAssistant from './pages/services/VirtualAdminAssistant'
import CustomerServiceVA from './pages/services/CustomerServiceVA'
import MarketingVA from './pages/services/MarketingVA'
import VirtualTransactionCoordinator from './pages/services/VirtualTransactionCoordinator'
import SDRVA from './pages/services/SDRVA'
import VirtualAssistantServices from './pages/services/VirtualAssistantServices'
import VirtualReceptionist from './pages/services/VirtualReceptionist'

// Pages - Industries
import InsuranceVirtualAssistant from './pages/industries/InsuranceVirtualAssistant'
import SmallBusinessVA from './pages/industries/SmallBusinessVA'
import EcommerceVA from './pages/industries/EcommerceVA'
import FinanceVA from './pages/industries/FinanceVA'
import PropertyManagementVA from './pages/industries/PropertyManagementVA'
import MedicalVA from './pages/industries/MedicalVA'
import HRVA from './pages/industries/HRVA'
import TechVA from './pages/industries/TechVA'
import MortgageVA from './pages/industries/MortgageVA'
import MortgageVAv2 from './pages/industries/MortgageVAv2'
import RealEstateVA from './pages/industries/RealEstateVA'

// Pages - VA Profiles
import OurVAsPage from './pages/OurVAsPage'
import OurCurrentVAs from './pages/OurVAs/OurCurrentVAs'
import AbigailProfile from './pages/AbigailProfile'
import AdrianProfile from './pages/AdrianProfile'
import AlejandroProfile from './pages/AlejandroProfile'
import DafneProfile from './pages/DafneProfile'
import IvanProfile from './pages/IvanProfile'
import JoanaProfile from './pages/JoanaProfile'
import KarenProfile from './pages/KarenProfile'
import MariaPaulaProfile from './pages/MariaPaulaProfile'
import MoisesProfile from './pages/MoisesProfile'
import AntonioProfile from './pages/AntonioProfile'
import CherryMaeProfile from './pages/CherryMaeProfile'
import EmmanuelProfile from './pages/EmmanuelProfile'
import FrancisProfile from './pages/FrancisProfile'
import GeraldinProfile from './pages/GeraldinProfile'
import JanetProfile from './pages/JanetProfile'
import JayAlvinProfile from './pages/JayAlvinProfile'
import JeromeProfile from './pages/JeromeProfile'
import JimmyProfile from './pages/JimmyProfile'
import JoelProfile from './pages/JoelProfile'
import JojiMarieProfile from './pages/JojiMarieProfile'
import LauriceProfile from './pages/LauriceProfile'
import LorenzProfile from './pages/LorenzProfile'
import MaVenusProfile from './pages/MaVenusProfile'
import MichelleProfile from './pages/MichelleProfile'
import RaydonProfile from './pages/RaydonProfile'
import RonaMaeProfile from './pages/RonaMaeProfile'
import GizelleProfile from './pages/GizelleProfile'
import JasmineProfile from './pages/JasmineProfile'
import JillNicoleProfile from './pages/JillNicoleProfile'
import KarlProfile from './pages/KarlProfile'
import PavelProfile from './pages/PavelProfile'
import AnaProfile from './pages/AnaProfile'
import AnaVictoriaProfile from './pages/AnaVictoriaProfile'
import BalbinaProfile from './pages/BalbinaProfile'
import BrandonLProfile from './pages/BrandonLProfile'
import CarolinaProfile from './pages/CarolinaProfile'
import ChristineProfile from './pages/ChristineProfile'
import DawnProfile from './pages/DawnProfile'
import DayanaProfile from './pages/DayanaProfile'
import EllenRoseProfile from './pages/EllenRoseProfile'
import FernandaProfile from './pages/FernandaProfile'
import GonzaloProfile from './pages/GonzaloProfile'
import GuillermoProfile from './pages/GuillermoProfile'
import IsraelProfile from './pages/IsraelProfile'
import JaniceProfile from './pages/JaniceProfile'
import JavierProfile from './pages/JavierProfile'
import KevinProfile from './pages/KevinProfile'
import LoisProfile from './pages/LoisProfile'
import MariaDProfile from './pages/MariaDProfile'
import MariaFernandaProfile from './pages/MariaFernandaProfile'
import MelissaProfile from './pages/MelissaProfile'
import PatriciaProfile from './pages/PatriciaProfile'
import RafaelProfile from './pages/RafaelProfile'
import RainierProfile from './pages/RainierProfile'
import RejeanMaeProfile from './pages/RejeanMaeProfile'
import RochelleProfile from './pages/RochelleProfile'
import SandraProfile from './pages/SandraProfile'
import XimenaGProfile from './pages/XimenaGProfile'
import GabrielaRodriguezProfile from './pages/GabrielaRodriguezProfile'

// Dynamic VA Profile (CMS-driven)
import VADynamicProfile from './pages/VADynamicProfile'

// Pages - Utility
import VACreation from './pages/VACreation'
import VALogin from './pages/VALogin'
import HomepageDemo from './pages/HomepageDemo'
import IndustryTabsTest from './pages/IndustryTabsTest'
import AppDesignSystem from './pages/AppDesignSystem'
import DesignSystemShowcase from '../webflow-components-design-system/DesignSystemShowcase'
import '../webflow-components-design-system/DesignSystemShowcase.css'

// Legal Pages
import TermsAndConditions from './pages/TermsAndConditions'
import PrivacyPolicy from './pages/PrivacyPolicy'

function AppContent() {
  const location = useLocation()

  const hideNavbarFooter = location.pathname === '/va-creation' || location.pathname === '/va-login'

  const useVANavbar = !hideNavbarFooter && (
    location.pathname.includes('vas') ||
    location.pathname.includes('insurance-agents') ||
    location.pathname.includes('profile')
  )

  return (
    <>
      <Schema />
      {!hideNavbarFooter && (useVANavbar ? <NavbarVA /> : <Navbar />)}
      <main>
        <Routes>
          {/* Homepage */}
          <Route path="/" element={<App />} />

          {/* Services */}
          <Route path="/services/insurance-customer-service-representative" element={<InsuranceCostumerService />} />
          <Route path="/services/administrative-assistant" element={<VirtualAdminAssistant />} />
          <Route path="/services/customer-service-representative" element={<CustomerServiceVA />} />
          <Route path="/services/marketing-assistant" element={<MarketingVA />} />
          <Route path="/services/transaction-coordinator" element={<VirtualTransactionCoordinator />} />
          <Route path="/services/sales-development-inside-sales" element={<SDRVA />} />
          <Route path="/services/general-virtual-assistant" element={<VirtualAssistantServices />} />
          <Route path="/services/virtual-receptionist" element={<VirtualReceptionist />} />

          {/* Industries */}
          <Route path="/industries/insurance-virtual-assistant" element={<InsuranceVirtualAssistant />} />
          <Route path="/industries/real-estate-virtual-assistant" element={<RealEstateVA />} />
          <Route path="/industries/small-business" element={<SmallBusinessVA />} />
          <Route path="/industries/e-commerce" element={<EcommerceVA />} />
          <Route path="/industries/finance" element={<FinanceVA />} />
          <Route path="/industries/property-management" element={<PropertyManagementVA />} />
          <Route path="/industries/healthcare" element={<MedicalVA />} />
          <Route path="/industries/hr" element={<HRVA />} />
          <Route path="/industries/technology" element={<TechVA />} />
          <Route path="/industries/mortgage-and-lending" element={<MortgageVAv2 />} />

          {/* Pricing */}
          <Route path="/pricing" element={<PricingPage />} />

          {/* Our VAs */}
          <Route path="/ovas-current-vas" element={<OurCurrentVAs />} />
          <Route path="/our-vas" element={<OurVAsPage />} />
          <Route path="/ovas-executive-admin-virtual-assistant" element={<OurVAsPage type="executive" />} />
          <Route path="/ovas-property-management-assistants" element={<OurVAsPage type="property" />} />
          <Route path="/ovas-mortgage-processing-assistant" element={<OurVAsPage type="mortgage" />} />
          <Route path="/ovas-medical-assistant" element={<OurVAsPage type="medical" />} />

          {/* Dynamic VA Profiles (CMS-driven, canonical URL) */}
          <Route path="/virtual-assistants/:slug" element={<VADynamicProfile />} />

          {/* Legacy VA Profiles (kept for backwards-compat redirects) */}
          <Route path="/abigail-ocean-va-profile" element={<AbigailProfile />} />
          <Route path="/adrian-ocean-va-profile" element={<AdrianProfile />} />
          <Route path="/alejandro-ocean-va-profile" element={<AlejandroProfile />} />
          <Route path="/dafne-ocean-va-profile" element={<DafneProfile />} />
          <Route path="/ivan-ocean-va-profile" element={<IvanProfile />} />
          <Route path="/joana-ocean-va-profile" element={<JoanaProfile />} />
          <Route path="/karen-ocean-va-profile" element={<KarenProfile />} />
          <Route path="/maria-paula-ocean-va-profile" element={<MariaPaulaProfile />} />
          <Route path="/moises-ocean-va-profile" element={<MoisesProfile />} />
          <Route path="/antonio-ocean-va-profile" element={<AntonioProfile />} />
          <Route path="/cherry-mae-ocean-va-profile" element={<CherryMaeProfile />} />
          <Route path="/emmanuel-ocean-va-profile" element={<EmmanuelProfile />} />
          <Route path="/francis-ocean-va-profile" element={<FrancisProfile />} />
          <Route path="/geraldine-ocean-va-profile" element={<GeraldinProfile />} />
          <Route path="/janet-ocean-va-profile" element={<JanetProfile />} />
          <Route path="/jay-alvin-ocean-va-profile" element={<JayAlvinProfile />} />
          <Route path="/jerome-ocean-va-profile" element={<JeromeProfile />} />
          <Route path="/jimmy-ocean-va-profile" element={<JimmyProfile />} />
          <Route path="/joel-ocean-va-profile" element={<JoelProfile />} />
          <Route path="/joji-marie-ocean-va-profile" element={<JojiMarieProfile />} />
          <Route path="/laurice-ocean-va-profile" element={<LauriceProfile />} />
          <Route path="/lorenz-ocean-va-profile" element={<LorenzProfile />} />
          <Route path="/ma-venus-ocean-va-profile" element={<MaVenusProfile />} />
          <Route path="/michelle-ocean-va-profile" element={<MichelleProfile />} />
          <Route path="/raydon-ocean-va-profile" element={<RaydonProfile />} />
          <Route path="/rona-mae-ocean-va-profile" element={<RonaMaeProfile />} />
          <Route path="/gizelle-ocean-va-profile" element={<GizelleProfile />} />
          <Route path="/jasmine-ocean-va-profile" element={<JasmineProfile />} />
          <Route path="/jill-ocean-va-profile" element={<JillNicoleProfile />} />
          <Route path="/karl-ocean-va-profile" element={<KarlProfile />} />
          <Route path="/pavel-ocean-va-profile" element={<PavelProfile />} />
          <Route path="/ana-s-ocean-va-profile" element={<AnaProfile />} />
          <Route path="/ana-victoria-ocean-va-profile" element={<AnaVictoriaProfile />} />
          <Route path="/balbina-ocean-va-profile" element={<BalbinaProfile />} />
          <Route path="/brandon-l-ocean-va-profile" element={<BrandonLProfile />} />
          <Route path="/carolina-ocean-va-profile" element={<CarolinaProfile />} />
          <Route path="/christine-ocean-va-profile" element={<ChristineProfile />} />
          <Route path="/dawn-ocean-va-profile" element={<DawnProfile />} />
          <Route path="/dayana-ocean-va-profile" element={<DayanaProfile />} />
          <Route path="/ellen-rose-ocean-va-profile" element={<EllenRoseProfile />} />
          <Route path="/fernanda-ocean-va-profile" element={<FernandaProfile />} />
          <Route path="/gonzalo-ocean-va-profile" element={<GonzaloProfile />} />
          <Route path="/guillermo-ocean-va-profile" element={<GuillermoProfile />} />
          <Route path="/israel-ocean-va-profile" element={<IsraelProfile />} />
          <Route path="/janice-ocean-va-profile" element={<JaniceProfile />} />
          <Route path="/javier-ocean-va-profile" element={<JavierProfile />} />
          <Route path="/kevin-ocean-va-profile" element={<KevinProfile />} />
          <Route path="/lois-ocean-va-profile" element={<LoisProfile />} />
          <Route path="/maria-d-ocean-va-profile" element={<MariaDProfile />} />
          <Route path="/maria-ocean-va-profile" element={<MariaFernandaProfile />} />
          <Route path="/melissa-ocean-va-profile" element={<MelissaProfile />} />
          <Route path="/patricia-ocean-va-profile" element={<PatriciaProfile />} />
          <Route path="/rafael-ocean-va-profile" element={<RafaelProfile />} />
          <Route path="/rainier-ocean-va-profile" element={<RainierProfile />} />
          <Route path="/rejean-ocean-va-profile" element={<RejeanMaeProfile />} />
          <Route path="/rochelle-ocean-va-profile" element={<RochelleProfile />} />
          <Route path="/sandra-ocean-va-profile" element={<SandraProfile />} />
          <Route path="/ximena-g-ocean-va-profile" element={<XimenaGProfile />} />
          <Route path="/gabriela-rodriguez-ocean-va-profile" element={<GabrielaRodriguezProfile />} />

          {/* Main Pages */}
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/faq" element={<FAQsPage />} />

          {/* Legal Pages */}
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* Utility / Dev */}
          <Route path="/va-login" element={<VALogin />} />
          <Route path="/va-creation" element={<ProtectedRoute><VACreation /></ProtectedRoute>} />
          <Route path="/home-design-system" element={<AppDesignSystem />} />
          <Route path="/design-system" element={<DesignSystemShowcase />} />
          <Route path="/homepage-demo" element={<HomepageDemo />} />
          <Route path="/test-industry-tabs" element={<IndustryTabsTest />} />
        </Routes>
      </main>

      {!hideNavbarFooter && <Footer />}
    </>
  )
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
