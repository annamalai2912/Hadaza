import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import { motion } from 'framer-motion';
import { Parallax } from 'react-scroll-parallax';

const Gallery = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [globeEffect, setGlobeEffect] = useState({ x: 0, y: 0 });

  const images = [
    {
      url: '1-2.png',
      orientation: 'portrait',
    },
    {
      url: '1-1.png',
      client: 'Sarah Parker',
      orientation: 'portrait',
    },
    {
      url: '3.jpeg',
      client: 'Lisa Anderson',
      orientation: 'landscape',
    },
    {
      url: '3.png',
      client: 'Lisa Anderson',
      orientation: 'portrait',
    },
    {
      url: '5.jpeg',
      client: 'Lisa Anderson',
      orientation: 'landscape',
    },
    {
      url: '2-1.png',
      client: 'Lisa Anderson',
      orientation: 'landscape',
    },
    {
      url: '52.png',
      client: 'Lisa Anderson',
      orientation: 'landscape',
    },
    {
      url: '4-2.png',
      client: 'Lisa Anderson',
      orientation: 'landscape',
    },
    {
      url: '32.png',
      client: 'Lisa Anderson',
      orientation: 'portrait',
    },

    {
      url: '2.png',
      client: 'Lisa Anderson',
      orientation: 'portrait',
    },
    {
      url: 'port-img-223.jpeg',
      client: 'Lisa Anderson',
      orientation: 'portrait',
    },
    {
      url: 'port-img-226.jpeg',
      client: 'Lisa Anderson',
      orientation: 'portrait',
    },
    // Add more images here
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      setCursorPosition({ x, y });
      setGlobeEffect({
        x: (x - window.innerWidth / 2) * 0.02,
        y: (y - window.innerHeight / 2) * 0.02,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <section id="gallery" className="py-24 bg-gray-50 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-10 pointer-events-none"
        style={{ transform: `translate(${globeEffect.x}px, ${globeEffect.y}px)` }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-serif font-bold text-primary mb-4">
            Our Transformations
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Witness the magic of our expert stylists through these stunning transformations.
          </p>
        </motion.div>

        {/* Masonry Layout */}
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex gap-4"
          columnClassName="masonry-column"
        >
          {images.map((image, index) => (
            <Parallax speed={5} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="cursor-pointer group"
                style={{
                  transform: `translateX(${(cursorPosition.x - window.innerWidth / 2) * 0.05}px) translateY(${
                    (cursorPosition.y - window.innerHeight / 2) * 0.05
                  }px)`,
                  transition: 'transform 0.1s ease-out',
                }}
              >
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.title || 'Gallery Image'}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 right-4 text-white text-lg font-semibold">
                      {image.client || 'Untitled'}
                    </div>
                  </div>
                </div>
              </motion.div>
            </Parallax>
          ))}
        </Masonry>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <button className="bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary transition-colors">
            Load More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
