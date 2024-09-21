import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ServiceSection from "./components/ServiceSection";
import FaqSection from "./components/FaqSection";
import ContactSection from "./components/ContactSection";

const App = () => {
  const location = useLocation();
  const userRole = location.state?.userRole || "user";

  return (
    <div>
      <Navbar />
      <HeroSection userRole={userRole} />
      <ServiceSection userRole={userRole} />
      <FaqSection userRole={userRole} />
      <ContactSection />
    </div>
  );
};

export default App;
