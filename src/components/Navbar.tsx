import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Search, User, ShoppingBag, LogOut, Heart, Settings,
  Bell, CreditCard, HelpCircle, Award
} from 'lucide-react';

// Enhanced interfaces with more detailed typing
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  category?: string;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  membership?: 'basic' | 'premium' | 'vip';
  points?: number;
}

interface Notification {
  id: string;
  type: 'order' | 'promotion' | 'service' | 'account';
  message: string;
  timestamp: Date;
  read: boolean;
}

const Navbar: React.FC = () => {
  // Enhanced state management
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // More sophisticated state with initial data
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Hair Treatment Package',
      price: 2999,
      quantity: 1,
      image: '/hair-treatment.jpg',
      category: 'Hair Care'
    },
    {
      id: '2',
      name: 'Facial Package',
      price: 1999,
      quantity: 1,
      image: '/facial-package.jpg',
      category: 'Skin Care'
    }
  ]);

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'order',
      message: 'Your order #12345 is ready for pickup',
      timestamp: new Date(),
      read: false
    },
    {
      id: '2',
      type: 'promotion',
      message: 'New Year Special: 20% off all services!',
      timestamp: new Date(),
      read: false
    }
  ]);

  // Menu items with additional metadata
  const menuItems = useMemo(() => [
    {
      id: 'home',
      label: 'Home',
      description: 'Discover our latest offerings'
    },
    {
      id: 'services',
      label: 'Services',
      description: 'Explore our beauty treatments'
    },
    {
      id: 'about',
      label: 'About',
      description: 'Learn our story and mission'
    },
    {
      id: 'gallery',
      label: 'Gallery',
      description: 'See our transformative results'
    },
    {
      id: 'blog',
      label: 'Blog',
      description: 'Beauty tips and insights'
    },
    {
      id: 'contact',
      label: 'Contact',
      description: 'Get in touch with us'
    }
  ], []);

  // Enhanced scroll and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);

      const sections = menuItems.map(item => item.id);
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuItems]);

  // Advanced search functionality
  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement advanced search logic
    console.log('Searching for:', searchQuery);
    // Could dispatch to a search service or state management system
    setShowSearch(false);
    setSearchQuery('');
  }, [searchQuery]);

  // Simulate login with more robust user data
  const handleLogin = useCallback(() => {
    setIsLoggedIn(true);
    setUserProfile({
      id: 'user_123',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: '/user-avatar.jpg',
      membership: 'premium',
      points: 250
    });
  }, []);

  // Logout with additional cleanup
  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setUserProfile(null);
    setShowUserMenu(false);
    // Additional logout logic like clearing tokens, etc.
  }, []);

  // Enhanced cart management
  const updateCartItemQuantity = useCallback((itemId: string, newQuantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.max(0, newQuantity) }
          : item
      ).filter(item => item.quantity > 0)
    );
  }, []);

  // Utility functions with memoization
  const getTotalCartItems = useMemo(() =>
    cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  const getTotalPrice = useMemo(() =>
    cartItems.reduce((total, item) => total + (item.price * item.quantity), 0),
    [cartItems]
  );

  // Section scrolling with enhanced behavior
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  }, []);

  // Notification management
  const markNotificationAsRead = useCallback((notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-black/20 backdrop-blur-sm'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Replace the existing text with an image logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 cursor-pointer"
              onClick={() => scrollToSection('home')}
            >
              <img
                src="website-logo.png"  // Replace with your actual logo path
                alt="Hadaza Logo"
                className={`h-14 ${scrolled ? 'filter brightness-100' : 'filter brightness-0 invert'}`}
              />
            </motion.div>
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <motion.a
                  key={item.id}
                  whileHover={{ scale: 1.1 }}
                  className={`cursor-pointer transition-colors duration-300 ${activeSection === item.id
                      ? 'text-secondary font-medium'
                      : scrolled ? 'text-primary hover:text-secondary' : 'text-white hover:text-secondary'
                    }`}
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-6">
              {/* Notifications Dropdown */}
              <motion.div className="relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`transition-colors relative ${scrolled ? 'text-primary hover:text-secondary' : 'text-white hover:text-secondary'
                    }`}
                >
                  <Bell className="w-5 h-5" />
                  {notifications.some(n => !n.read) && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </motion.button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg"
                    >
                      <div className="p-4 border-b border-gray-100">
                        <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-auto">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                            onClick={() => markNotificationAsRead(notification.id)}
                          >
                            <p className="text-sm text-gray-900">{notification.message}</p>
                            <p className="text-xs text-gray-500">
                              {notification.timestamp.toLocaleString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => setShowSearch(!showSearch)}
                className={`transition-colors ${scrolled ? 'text-primary hover:text-secondary' : 'text-white hover:text-secondary'
                  }`}
              >
                <Search className="w-5 h-5" />
              </motion.button>

              <motion.div className="relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => isLoggedIn ? setShowUserMenu(!showUserMenu) : handleLogin()}
                  className={`transition-colors ${scrolled ? 'text-primary hover:text-secondary' : 'text-white hover:text-secondary'
                    }`}
                >
                  <User className="w-5 h-5" />
                </motion.button>

                <AnimatePresence>
                  {showUserMenu && isLoggedIn && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg"
                    >
                      <div className="p-4 border-b border-gray-100 flex items-center">
                        <img
                          src={userProfile?.avatar || '/default-avatar.jpg'}
                          alt="User Avatar"
                          className="w-12 h-12 rounded-full mr-4"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{userProfile?.name}</p>
                          <p className="text-xs text-gray-500">{userProfile?.email}</p>
                          {userProfile?.membership && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full mt-1 inline-block">
                              {userProfile.membership.toUpperCase()} Member
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="py-1">
                        {[
                          { icon: Settings, label: 'Account Settings' },
                          { icon: CreditCard, label: 'Billing' },
                          { icon: Award, label: 'Rewards' },
                          { icon: HelpCircle, label: 'Help' }
                        ].map((item, index) => (
                          <button
                            key={index}
                            className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center text-sm text-gray-700"
                          >
                            <item.icon className="w-4 h-4 mr-3" />
                            {item.label}
                          </button>
                        ))}
                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center border-t border-gray-100"
                        >
                          <LogOut className="w-4 h-4 mr-3" />
                          Sign out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Rest of the existing cart and booking button implementation */}
              <motion.div className="relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setShowCart(!showCart)}
                  className={`transition-colors relative ${scrolled ? 'text-primary hover:text-secondary' : 'text-white hover:text-secondary'
                    }`}
                >
                  <ShoppingBag className="w-5 h-5" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                      {getTotalCartItems}
                    </span>
                  )}
                </motion.button>

                <AnimatePresence>
                  {showCart && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg py-4"
                    >
                      <div className="px-4 py-2 border-b border-gray-100">
                        <h3 className="text-lg font-medium text-gray-900">Shopping Cart</h3>
                      </div>
                      {cartItems.length > 0 ? (
                        <>
                          <div className="max-h-96 overflow-auto">
                            {cartItems.map((item) => (
                              <div key={item.id} className="px-4 py-3 hover:bg-gray-50 flex items-center">
                                {item.image && (
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded-md mr-4"
                                  />
                                )}
                                <div className="flex-grow">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                                      <p className="text-sm text-gray-500">₹{item.price}</p>
                                      <p className="text-xs text-gray-400">{item.category}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <button
                                        onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                                        className="text-gray-500 hover:text-secondary"
                                      >
                                        -
                                      </button>
                                      <span className="text-sm text-gray-900">{item.quantity}</span>
                                      <button
                                        onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                                        className="text-gray-500 hover:text-secondary"
                                      >
                                        +
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="px-4 py-3 border-t border-gray-100">
                            <div className="flex justify-between items-center mb-4">
                              <span className="text-sm font-medium text-gray-900">Total</span>
                              <span className="text-lg font-bold text-primary">₹{getTotalPrice}</span>
                            </div>
                            <button
                              onClick={() => {
                                setShowCart(false);
                                scrollToSection('booking');
                              }}
                              className="w-full bg-primary text-white py-2 rounded-full hover:bg-secondary transition-colors duration-300"
                            >
                              Checkout
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="px-4 py-6 text-center text-gray-500">
                          Your cart is empty
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full transition-colors duration-300 ${scrolled
                    ? 'bg-primary text-white hover:bg-secondary'
                    : 'bg-white/20 text-white hover:bg-secondary'
                  }`}
                onClick={() => scrollToSection('booking')}
              >
                Book Now
              </motion.button>
            </div>

            <div className="md:hidden">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={scrolled ? 'text-primary p-2' : 'text-white p-2'}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-white shadow-lg p-4"
            >
              <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search services, products, or articles..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  autoFocus
                />
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />

            <motion.div
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              exit={{ x: -100 }}
              className="absolute top-0 left-0 bottom-0 w-64 bg-white shadow-xl"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-serif font-bold text-primary">Menu</h2>
                  <button onClick={() => setIsOpen(false)}>
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-4">
                  {menuItems.map((item) => (
                    <motion.a
                      key={item.id}
                      whileHover={{ x: 4 }}
                      className={`block transition-colors duration-300 ${activeSection === item.id
                          ? 'text-secondary font-medium'
                          : 'text-primary hover:text-secondary'
                        }`}
                      onClick={() => scrollToSection(item.id)}
                    >
                      {item.label}
                    </motion.a>
                  ))}

                  {isLoggedIn ? (
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex items-center mb-4">
                        <img
                          src={userProfile?.avatar || '/default-avatar.jpg'}
                          alt="User Avatar"
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{userProfile?.name}</p>
                          <p className="text-xs text-gray-500">{userProfile?.email}</p>
                        </div>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="text-red-600 hover:text-red-700 text-sm flex items-center"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign out
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleLogin}
                      className="text-primary hover:text-secondary text-sm flex items-center"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Sign in
                    </button>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-primary text-white py-2 rounded-full hover:bg-secondary transition-colors duration-300 mt-6"
                    onClick={() => {
                      scrollToSection('booking');
                      setIsOpen(false);
                    }}
                  >
                    Book Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;