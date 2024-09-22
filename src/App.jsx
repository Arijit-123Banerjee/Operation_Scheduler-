import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ServiceSection from "./components/ServiceSection";
import CarouselSection from "./components/CarouselSection";
import Footer from "./components/Footer";
import StarSection from "./components/StarSection";
import VideoSection from "./components/VideoSection";
const App = () => {
  const location = useLocation();
  const userRole = location.state?.userRole || "user";
  if (userRole == "admin") {
    location.pathname = "/admin";
  } else {
    location.pathname = "/user";
  }

  return (
    <div>
      <Navbar userRole={userRole} />
      <HeroSection userRole={userRole} />
      {userRole === "user" ? <CarouselSection /> : null}
      <ServiceSection userRole={userRole} />
      <StarSection userRole={userRole} />
      <VideoSection />
      <Footer />
    </div>
  );
};

export default App;
