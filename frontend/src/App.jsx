 import { Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import ScrollToTop from "./components/ScrollToTop"; // ✅ ADDED

import Home from "./pages/Home";
import About from "./pages/About";
import RC from "./pages/RC";
import IISS from "./pages/IISS";
import FC from "./pages/FC";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <>
      <TopBar />
      <Navbar />

      {/* ✅ GLOBAL SCROLL-TO-TOP BUTTON */}
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/services/rc" element={<RC />} />
        <Route path="/services/iiss" element={<IISS />} />
        <Route path="/services/fc" element={<FC />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact-us" element={<Contact />} />
      </Routes>

      <Footer />
    </>
  );
}
