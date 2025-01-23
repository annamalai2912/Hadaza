import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Scissors, Droplet, Crown, 
  Feather, Camera, Star 
} from 'lucide-react';

const servicesData = [
  {
    category: 'Hair Services',
    icon: Scissors,
    color: '#224C3B',
    services: [
      {
        name: 'Haircuts',
        items: [
          { name: 'Little Miss Princess', price: '₹800', duration: '30 mins' },
          { name: 'Creative Cut', price: '₹2,200', duration: '45 mins' },
          { name: 'Cut and Finish', price: '₹1,500', duration: '60 mins' },
          { name: 'Fringes', price: '₹700', duration: '15 mins' }
        ]
      },
      {
        name: 'Hair Wash & Styling',
        items: [
          { name: 'Loreal Hair Wash', price: '₹600', duration: '30 mins' },
          { name: 'Kerastase Hair Wash', price: '₹900', duration: '45 mins' },
          { name: 'Wash & Blow Dry (Loreal)', price: '₹800', duration: '45 mins' },
          { name: 'Wash & Blow Dry (Kerastase)', price: '₹1,200', duration: '60 mins' }
        ]
      },
      {
        name: 'Hair Treatments',
        items: [
          { name: 'Olaplex Treatment', price: '₹3,000', duration: '90 mins' },
          { name: 'Keratin Treatment', price: '₹9,000', duration: '2-3 hours' },
          { name: 'Smoothening', price: '₹4,500', duration: '2 hours' },
          { name: 'Hair Botox', price: '₹10,000', duration: '2 hours' }
        ]
      },
      {
        name: 'Color Services',
        items: [
          { name: 'Root Touch Up', price: '₹2,200', duration: '60 mins' },
          { name: 'Global Color', price: '₹4,000', duration: '90 mins' },
          { name: 'Partial Highlights', price: '₹3,000', duration: '75 mins' },
          { name: 'Global Highlights', price: '₹5,000', duration: '120 mins' }
        ]
      }
    ]
  },
  {
    category: 'Skin & Beauty',
    icon: Droplet,
    color: '#E8B49E',
    services: [
      {
        name: 'Cleanup Services',
        items: [
          { name: 'Simple Rejuvenating', price: '₹800', duration: '30 mins' },
          { name: 'Hydrating Cleanup', price: '₹900', duration: '45 mins' },
          { name: 'Insta Glow Cleanup', price: '₹1,800', duration: '60 mins' }
        ]
      },
      {
        name: 'Facial Treatments',
        items: [
          { name: 'Hydra Facial', price: '₹1,900', duration: '60 mins' },
          { name: 'Skin Lightening Facial', price: '₹2,000', duration: '75 mins' },
          { name: 'Regenerating Facial', price: '₹2,500', duration: '90 mins' },
          { name: 'Age Revival Facial', price: '₹3,000', duration: '90 mins' },
          { name: 'Bridal Brightening Facial', price: '₹6,500', duration: '120 mins' }
        ]
      },
      {
        name: 'Body Treatments',
        items: [
          { name: 'Classic Body Polishing', price: '₹6,000', duration: '60 mins' },
          { name: 'Signature Body Polishing', price: '₹8,000', duration: '90 mins' },
          { name: 'Classic Scrub & Steam', price: '₹3,000', duration: '45 mins' }
        ]
      },
      {
        name: 'Massage Services',
        items: [
          { name: 'Head Massage', price: '₹1,700', duration: '30 mins' },
          { name: 'Neck & Shoulder Massage', price: '₹800', duration: '30 mins' },
          { name: 'Body Massage', price: '₹3,000', duration: '60 mins' }
        ]
      }
    ]
  },
  {
    category: 'Bridal & Special Packages',
    icon: Crown,
    color: '#B76E79',
    services: [
      {
        name: 'Bridal Packages',
        items: [
          { name: 'Bride Package', price: '₹15,000', duration: '4-5 hours' },
          { name: 'Wedding Set Go Package', price: '₹25,000', duration: '6-7 hours' },
          { name: 'Can Knot Wait Package', price: '₹30,000', duration: 'Full Day' }
        ]
      },
      {
        name: 'Maternity Packages',
        items: [
          { name: 'Mom-to-Be Glow Package', price: '₹3,000', duration: '90 mins' },
          { name: 'Mom to be Serenity Package', price: '₹6,000', duration: '2 hours' },
          { name: 'Baby Moon Bliss Package', price: '₹9,000', duration: '2.5 hours' }
        ]
      },
      {
        name: 'New Mama Packages',
        items: [
          { name: 'Rejuvenation Package', price: '₹8,000', duration: '2 hours' },
          { name: 'Post-baby Bliss Package', price: '₹12,000', duration: '3 hours' },
          { name: 'Mom Glow Package', price: '₹5,000', duration: '1.5 hours' }
        ]
      }
    ]
  },
  {
    category: 'Additional Services',
    icon: Star,
    color: '#4A5568',
    services: [
      {
        name: 'Makeup Services',
        items: [
          { name: 'Trail Makeup', price: '₹3,000', duration: '60 mins' },
          { name: 'Party Makeup', price: '₹6,000', duration: '90 mins' },
          { name: 'Royal Bash Makeup', price: '₹25,000', duration: '3 hours' },
          { name: 'Kids Makeover', price: '₹3,000', duration: '45 mins' }
        ]
      },
      {
        name: 'Grooming Services',
        items: [
          { name: 'Eyebrow Threading', price: '₹90', duration: '15 mins' },
          { name: 'Upper Lip Threading', price: '₹70', duration: '10 mins' },
          { name: 'Full Face Waxing', price: '₹2,400', duration: '45 mins' },
          { name: 'Full Body Waxing', price: '₹5,500', duration: '90 mins' }
        ]
      },
      {
        name: 'Specialty Services',
        items: [
          { name: 'Eyelash Extensions', price: '₹5,000', duration: '90 mins' },
          { name: 'Russian Lashes', price: '₹7,000', duration: '120 mins' },
          { name: 'Saree Draping', price: '₹1,000', duration: '30 mins' }
        ]
      }
    ]
  }
];

const ServiceModal = ({ service, onClose }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
    onClick={onClose}
  >
    <motion.div 
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      className="bg-white rounded-2xl max-w-2xl w-full p-8 relative"
      onClick={(e) => e.stopPropagation()}
    >
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
      >
        Close
      </button>
      <h2 className="text-3xl font-bold mb-6 text-[#224C3B]">{service.name}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-semibold text-lg">Price: {service.price}</p>
          <p className="text-gray-600">Duration: {service.duration}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">* All prices are subject to 18% GST</p>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const ServiceCategory = ({ category }) => {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-2xl shadow-xl p-6 transform transition-transform"
    >
      <div className="flex items-center mb-6">
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
          style={{ backgroundColor: category.color }}
        >
          <category.icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-2xl font-bold" style={{ color: category.color }}>
          {category.category}
        </h3>
      </div>
      {category.services.map((serviceGroup) => (
        <div key={serviceGroup.name} className="mb-4">
          <h4 className="text-xl font-semibold text-gray-700 mb-3">
            {serviceGroup.name}
          </h4>
          {serviceGroup.items.map((service) => (
            <div 
              key={service.name}
              onClick={() => setSelectedService(service)}
              className="flex justify-between items-center py-3 border-b last:border-b-0 hover:bg-gray-100 cursor-pointer"
            >
              <span>{service.name}</span>
              <span className="font-bold" style={{ color: category.color }}>
                {service.price}
              </span>
            </div>
          ))}
        </div>
      ))}
      <AnimatePresence>
        {selectedService && (
          <ServiceModal 
            service={selectedService} 
            onClose={() => setSelectedService(null)} 
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ServicesShowcase = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12 text-[#224C3B]"
        >
          Hadaza Grooming Studio Services
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((category) => (
            <ServiceCategory key={category.category} category={category} />
          ))}
        </div>
        <div className="text-center mt-12 text-sm text-gray-600">
          * All services include professional consultation
          * Customization available upon request
          * 18% GST applicable on all services
        </div>
      </div>
    </section>
  );
};

export default ServicesShowcase;