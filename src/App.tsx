import React from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Gallery from './components/Gallery';
import Booking from './components/Booking';
import Membership from './components/Membership';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <ParallaxProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Hero />
        <About />
        <Services />
        
        <Gallery />
        <Booking />
        <Membership />
        <Blog />
        <Contact />
        <Footer />
      </div>
    </ParallaxProvider>
  );
}

export default App;