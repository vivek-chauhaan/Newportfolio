import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import AppRoutes from "./routes/AppRoutes.jsx";
import ParticleBackground from "./components/common/ParticleBackground.jsx";
import CursorGlow from "./components/common/CursorGlow.jsx";
import BackToTop from "./components/common/BackToTop.jsx";

function App() {
  const { pathname } = useLocation();

  // Initialise AOS once
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 70,
      anchorPlacement: "top-bottom",
      disable: () =>
        window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
  }, []);

  // Pick up newly rendered content after route changes / async data loads
  useEffect(() => {
    const t = setTimeout(() => AOS.refreshHard(), 350);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div className="relative min-h-screen font-body text-bg-dark dark:text-white overflow-x-hidden">
      <ParticleBackground />
      <CursorGlow />
      <AppRoutes />
      <BackToTop />
    </div>
  );
}

export default App;
