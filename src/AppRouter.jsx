import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import NavbarVA from './components/NavbarVA'
import App from './App'
import AppDesignSystem from './AppDesignSystem'
import InsuranceVirtualAssistant from './InsuranceVirtualAssistant'
import InsuranceCostumerService from './InsuranceCostumerService'
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
import MortgageVAv2 from './MortgageVA-v2'
import VirtualReceptionist from './VirtualReceptionist'
import RealEstateVA from './RealEstateVA'
import PricingPage from './PricingPage'
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
import AboutUs from './AboutUs'
import ContactUs from './ContactUs'
import Careers from './Careers'
import Blogs from './Blogs'
import FAQsPage from './FAQsPage'
import Schema from './components/Schema'
import Footer from './components/Footer'
import IndustryTabsTest from './IndustryTabsTest'
import DesignSystemShowcase from '../webflow-components-design-system/DesignSystemShowcase'
import '../webflow-components-design-system/DesignSystemShowcase.css'
import HomepageDemo from './pages/HomepageDemo'
import VACreation from './pages/VACreation'
import VALogin from './pages/VALogin'
import ProtectedRoute from './components/ProtectedRoute'

function AppContent() {
  const location = useLocation()
  
  // Don't show navbar/footer on login or VA creation pages
  const hideNavbarFooter = location.pathname === '/va-creation' || location.pathname === '/va-login'
  
  // Use NavbarVA for VA-related pages
  const useVANavbar = !hideNavbarFooter && (location.pathname.includes('vas') || 
      location.pathname.includes('insurance-agents') ||
      location.pathname.includes('profile'))
  
  return (
    <>
      <Schema />
      {!hideNavbarFooter && (useVANavbar ? <NavbarVA /> : <Navbar />)}
      <main>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/home-design-system" element={<AppDesignSystem />} />
          <Route path="/insurance" element={<InsuranceVirtualAssistant />} />
          
          {/* Services Routes */}
          <Route path="/services/insurance-customer-service-representative" element={<InsuranceCostumerService />} />
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
          <Route path="/industries/mortgage-and-lending" element={<MortgageVAv2 />} />
          
          {/* Virtual Receptionist */}
          <Route path="/services/virtual-receptionist" element={<VirtualReceptionist />} />
          
          {/* Real Estate Virtual Assistant */}
          <Route path="/industries/real-estate-virtual-assistant" element={<RealEstateVA />} />
          
          {/* Pricing Page */}
          <Route path="/pricing" element={<PricingPage />} />
          
          {/* Our VAs Page */}
          <Route path="/ovas-current-vas" element={<OurCurrentVAs />} />
          <Route path="/our-vas" element={<OurVAsPage />} />
          <Route path="/insurance-vas" element={<OurVAsPage type="insurance" />} />
          <Route path="/executive-admin-vas" element={<OurVAsPage type="executive" />} />
          
          {/* VA Profile Pages */}
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
          
          {/* About Us Page */}
          <Route path="/about-us" element={<AboutUs />} />
          
          {/* Contact Us Page */}
          <Route path="/contact-us" element={<ContactUs />} />
          
          {/* Careers Page */}
          <Route path="/careers" element={<Careers />} />
          
          {/* Blogs Page */}
          <Route path="/blogs" element={<Blogs />} />
          
          {/* FAQs Page */}
          <Route path="/faq" element={<FAQsPage />} />
          
          {/* Test Page for Industry Tabs */}
          <Route path="/test-industry-tabs" element={<IndustryTabsTest />} />
          
          {/* Design System Showcase */}
          <Route path="/design-system" element={<DesignSystemShowcase />} />
          
          {/* Homepage Demo with Design System */}
          <Route path="/homepage-demo" element={<HomepageDemo />} />
          
          {/* VA Login */}
          <Route path="/va-login" element={<VALogin />} />
          
          {/* VA Creation Form (Protected) */}
          <Route 
            path="/va-creation" 
            element={
              <ProtectedRoute>
                <VACreation />
              </ProtectedRoute>
            } 
          />
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