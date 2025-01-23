import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Calendar from 'react-calendar';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import { Clock, Calendar as CalendarIcon, User, Sparkles } from 'lucide-react';
import Modal from 'react-modal';
import 'react-calendar/dist/Calendar.css';

Modal.setAppElement('#root'); // Accessibility requirement for react-modal

const Booking = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [service, setService] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { width, height } = useWindowSize();

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
    '05:00 PM', '06:00 PM', '07:00 PM'
  ];

  const services = [
    { id: 'haircut', name: 'Luxury Haircut', duration: '1h', price: '₹2,999' },
    { id: 'facial', name: 'Premium Facial', duration: '1.5h', price: '₹3,999' },
    { id: 'massage', name: 'Relaxation Massage', duration: '1h', price: '₹4,999' },
    { id: 'bridal', name: 'Bridal Package', duration: '4h', price: '₹24,999' }
  ];

  const handleBooking = () => {
    if (!service || !time) {
      alert('Please select a service and time before confirming!');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowConfetti(true);
      setModalIsOpen(false);
      setTimeout(() => setShowConfetti(false), 5000);
    }, 3000); // Simulate API call
  };

  const openModal = () => {
    if (!service || !time) {
      alert('Please select a service and time before proceeding!');
    } else {
      setModalIsOpen(true);
    }
  };

  return (
    <section id="booking" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <AnimatePresence>
        {showConfetti && <Confetti width={width} height={height} recycle={false} />}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-serif font-bold text-primary mb-4">
            Book Your Appointment
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Transform your look with our expert stylists. Choose your preferred service,
            date, and time.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-serif font-bold text-primary mb-6 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-secondary" />
                Select Service
              </h3>
              <div className="grid gap-4">
                {services.map((svc) => (
                  <motion.div
                    key={svc.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                      service === svc.id
                        ? 'border-secondary bg-secondary/10'
                        : 'border-gray-200 hover:border-secondary/50'
                    }`}
                    onClick={() => setService(svc.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-primary">{svc.name}</h4>
                        <p className="text-sm text-gray-600">Duration: {svc.duration}</p>
                      </div>
                      <p className="text-lg font-bold text-secondary">{svc.price}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-serif font-bold text-primary mb-6 flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2 text-secondary" />
                Select Date & Time
              </h3>
              <Calendar
                onChange={setDate}
                value={date}
                className="w-full rounded-lg border-none shadow-none"
                minDate={new Date()}
              />
              <div className="mt-8">
                <h4 className="font-medium text-primary mb-4 flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-secondary" />
                  Available Time Slots
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {timeSlots.map((slot) => (
                    <motion.button
                      key={slot}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-2 text-sm rounded-lg transition-colors ${
                        time === slot
                          ? 'bg-secondary text-white'
                          : 'bg-gray-100 hover:bg-secondary/20'
                      }`}
                      onClick={() => setTime(slot)}
                    >
                      {slot}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-4 rounded-xl font-medium transition-colors ${
                service && time
                  ? 'bg-primary text-white hover:bg-secondary'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
              onClick={openModal}
            >
              Confirm Booking
            </motion.button>
          </motion.div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="bg-white p-8 rounded-xl shadow-lg max-w-lg mx-auto"
        overlayClassName="fixed inset-0 bg-black/30 flex items-center justify-center"
      >
        <h3 className="text-2xl font-bold text-primary mb-4">Confirm Booking</h3>
        <p className="text-gray-600 mb-6">
          You're booking a <strong>{services.find((svc) => svc.id === service)?.name}</strong> on{' '}
          <strong>{date.toDateString()}</strong> at <strong>{time}</strong>.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 rounded-lg bg-primary text-white font-medium"
          onClick={handleBooking}
        >
          {loading ? 'Booking...' : 'Confirm'}
        </motion.button>
      </Modal>
    </section>
  );
};

export default Booking;
