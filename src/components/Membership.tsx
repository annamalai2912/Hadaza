import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { Crown, Gift, Shield, Star, Gem, Clock } from 'lucide-react';

const Membership = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const tiers = [
    {
      name: 'Silver',
      price: '4,999',
      duration: '3 months',
      icon: Star,
      features: [
        '10% off on all services',
        'Priority booking',
        'Complimentary hair spa',
        'Birthday special offers'
      ]
    },
    {
      name: 'Gold',
      price: '9,999',
      duration: '6 months',
      icon: Crown,
      features: [
        '20% off on all services',
        'VIP priority booking',
        'Monthly hair spa',
        'Quarterly facial',
        'Birthday month free service'
      ]
    },
    {
      name: 'Platinum',
      price: '19,999',
      duration: '12 months',
      icon: Gem,
      features: [
        '30% off on all services',
        'Exclusive VIP booking',
        'Unlimited hair spa',
        'Monthly facial',
        'Quarterly makeover',
        'Birthday month luxury package'
      ]
    }
  ];

  const benefits = [
    {
      icon: Gift,
      title: 'Exclusive Rewards',
      description: 'Earn points on every visit'
    },
    {
      icon: Shield,
      title: 'Premium Access',
      description: 'Priority booking & services'
    },
    {
      icon: Clock,
      title: 'Extended Hours',
      description: 'Special timing for members'
    }
  ];

  return (
    <section id="membership" className="py-24 bg-gradient-to-b from-accent/10 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-serif font-bold text-primary mb-4">
            Elite Membership Program
          </h2>
          <p className="text-primary/70 max-w-2xl mx-auto">
            Join our exclusive membership program and enjoy premium benefits
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="text-center p-8 bg-white rounded-xl shadow-lg border border-primary/10"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-accent/20 rounded-full flex items-center justify-center">
                <benefit.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-bold text-primary mb-2">
                {benefit.title}
              </h3>
              <p className="text-primary/70">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-8 rounded-xl shadow-lg relative overflow-hidden border border-primary/10"
            >
              {tier.name === 'Gold' && (
                <div className="absolute top-4 right-4 bg-accent text-primary px-3 py-1 rounded-full text-sm">
                  Popular
                </div>
              )}
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <tier.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-primary mb-2">
                {tier.name}
              </h3>
              <div className="flex items-baseline mb-6">
                <span className="text-3xl font-bold text-primary">₹</span>
                <span className="text-4xl font-bold text-primary">
                  {inView && <CountUp end={parseInt(tier.price.replace(',', ''))} duration={2} separator="," />}
                </span>
                <span className="text-primary/70 ml-2">/{tier.duration}</span>
              </div>
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center text-primary/80"
                  >
                    <Star className="w-4 h-4 text-accent mr-2" />
                    {feature}
                  </motion.li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-primary text-accent py-3 rounded-lg hover:bg-primary/90 transition-colors duration-300"
              >
                Choose {tier.name}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Membership;