import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef(null);
  const [currentBg, setCurrentBg] = useState(0);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const backgrounds = [
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&q=80'
  ];

  // Advanced parallax transformations
  const backgroundX = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const titleY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-100%"]);
  const subtitleY = useTransform(scrollYProgress, [0, 0.5], ["50%", "-50%"]);
  const buttonsY = useTransform(scrollYProgress, [0, 0.5], ["100%", "-100%"]);

  // Background sliding effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.div 
      ref={heroRef} 
      className="relative h-screen overflow-hidden"
    >
      {/* Sliding Background */}
      {backgrounds.map((bg, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${bg})`,
            opacity: index === currentBg ? 1 : 0,
            x: backgroundX,
            scale: 1.1,
            transition: 'opacity 1.5s ease-in-out'
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />

      {/* Parallax Content */}
      <motion.div className="relative h-full flex items-center justify-center">
        <div className="text-center max-w-4xl px-4">
          <motion.h1 
            style={{ y: titleY }}
            className="text-6xl md:text-8xl font-bold text-white mb-6 overflow-hidden"
            initial={{ 
              opacity: 0, 
              y: 100,
              rotateX: 90 
            }}
            animate={{ 
              opacity: 1, 
              y: 0,
              rotateX: 0 
            }}
            transition={{ 
              duration: 1, 
              type: "spring",
              stiffness: 50,
              delay: 0.3
            }}
          >
            Beautiful In & Out
          </motion.h1>

          <motion.p
            style={{ y: subtitleY }}
            className="text-2xl text-white/80 mb-10"
            initial={{ 
              opacity: 0, 
              y: 100,
              scale: 0.8 
            }}
            animate={{ 
              opacity: 1, 
              y: 0,
              scale: 1 
            }}
            transition={{ 
              duration: 1, 
              delay: 0.6,
              type: "spring",
              stiffness: 60
            }}
          >
            Experience luxury grooming and transform your look
          </motion.p>

          <motion.div 
            style={{ y: buttonsY }}
            className="flex justify-center space-x-4"
          >
            {['Book Now', 'Explore Services'].map((text, index) => (
              <motion.button
                key={text}
                onClick={() => scrollToSection(text.toLowerCase().replace(' ', ''))}
                className={`
                  ${index === 0 
                    ? 'bg-[#E8B49E] text-white' 
                    : 'border-2 border-white text-white hover:bg-white hover:text-[#224C3B]'
                  } 
                  px-8 py-3 rounded-full flex items-center space-x-2 group
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ 
                  opacity: 0, 
                  y: 100,
                  scale: 0.8 
                }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: 1 
                }}
                transition={{ 
                  duration: 1, 
                  delay: 0.9 + (index * 0.2),
                  type: "spring",
                  stiffness: 50
                }}
              >
                <span>{text}</span>
                {index === 0 && <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;