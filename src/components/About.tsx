import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Scissors, 
  Diamond, 
  Crown, 
  Flower, 
  Heart, 
  Star, 
  Globe,
  Sparkles,
  Palette,
  Layers
} from 'lucide-react';

const About = () => {
  const [activeSection, setActiveSection] = useState('story');
  const [hoveredStat, setHoveredStat] = useState(null);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [-15, 15]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2]);

  const navItems = [
    { 
      id: 'story', 
      icon: Diamond, 
      title: 'Our Origin', 
      content: (
        <>
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-primary mb-4"
          >
            The Hadaza Legacy
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-primary/80"
          >
            Inspired by Queen Esther's transformative journey, we craft beauty that transcends 
            physical appearance. Our studio represents the art of revealing inner confidence 
            through meticulous grooming and personalized care.
          </motion.p>
        </>
      )
    },
    { 
      id: 'mission', 
      icon: Crown, 
      title: 'Our Mission', 
      content: (
        <>
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-primary mb-4"
          >
            Empowering Transformation
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-primary/80"
          >
            We don't just style - we empower. Our mission is to create a holistic beauty 
            experience that nurtures self-love, confidence, and personal expression through 
            expert grooming and compassionate service.
          </motion.p>
        </>
      )
    }
  ];

  const statsData = [
    { 
      icon: Scissors, 
      value: '10+', 
      label: 'Years of Expertise',
      details: [
        { icon: Palette, text: 'Advanced Styling Techniques' },
        { icon: Layers, text: 'Comprehensive Training' },
        { icon: Sparkles, text: 'Innovative Approach' }
      ]
    },
    { 
      icon: Star, 
      value: '50+', 
      label: 'International Awards',
      details: [
        { icon: Palette, text: 'Global Recognition' },
        { icon: Layers, text: 'Industry Leadership' },
        { icon: Sparkles, text: 'Cutting-Edge Innovations' }
      ]
    },
    { 
      icon: Heart, 
      value: '10k+', 
      label: 'Transformed Lives',
      details: [
        { icon: Palette, text: 'Personal Empowerment' },
        { icon: Layers, text: 'Confidence Building' },
        { icon: Sparkles, text: 'Holistic Transformation' }
      ]
    },
    { 
      icon: Globe, 
      value: '24/7', 
      label: 'Global Inspiration',
      details: [
        { icon: Palette, text: 'World-Class Standards' },
        { icon: Layers, text: 'Cultural Diversity' },
        { icon: Sparkles, text: 'Universal Beauty' }
      ]
    }
  ];

  return (
    <motion.section 
      ref={containerRef}
      className="min-h-screen relative overflow-hidden py-24 bg-accent/10"
    >
      <motion.div 
        style={{ translateY, rotateX, scale }}
        className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 relative z-10"
      >
        <div className="space-y-8">
          <div className="flex space-x-4 mb-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveSection(item.id)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-full 
                  transition-all duration-300 
                  ${activeSection === item.id 
                    ? 'bg-primary/20 text-primary' 
                    : 'bg-white text-primary/70 hover:bg-primary/10'}
                `}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.title}</span>
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-primary/10"
            >
              {navItems.find(item => item.id === activeSection)?.content}
            </motion.div>
          </AnimatePresence>

          <div className="grid grid-cols-2 gap-4">
            {statsData.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                onHoverStart={() => setHoveredStat(index)}
                onHoverEnd={() => setHoveredStat(null)}
                className="relative bg-white p-4 rounded-xl text-center overflow-hidden shadow-md border border-primary/10"
              >
                <div className="w-12 h-12 mx-auto mb-2 bg-accent/10 rounded-full flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="font-bold text-2xl text-primary">{stat.value}</div>
                <div className="text-sm text-primary/70">{stat.label}</div>
                
                <AnimatePresence>
                  {hoveredStat === index && (
                    <motion.div 
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      exit={{ y: '100%' }}
                      className="absolute inset-0 bg-primary text-accent p-3 flex flex-col justify-center"
                    >
                      {stat.details.map((detail, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-center mb-2 last:mb-0"
                        >
                          <detail.icon className="w-4 h-4 mr-2" />
                          <span className="text-sm">{detail.text}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative group"
        >
          <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-transform duration-500 border-4 border-primary/20">
            <motion.img 
              whileHover={{ scale: 1.1 }}
              src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80" 
              alt="Hadaza Studio" 
              className="w-full h-full object-cover"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute -bottom-10 -right-10 bg-white p-6 rounded-2xl shadow-xl max-w-xs border border-primary/10"
          >
            <blockquote className="italic text-primary text-lg mb-2">
              "Beauty is an expression of inner strength"
            </blockquote>
            <div className="flex items-center">
              <Flower className="w-6 h-6 text-accent mr-2" />
              <p className="text-sm text-primary/70">Sarah Johnson, Founder</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default About;