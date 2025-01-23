import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-xl"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b">
                <div className="flex items-center">
                  <ShoppingBag className="w-6 h-6 text-primary mr-2" />
                  <h2 className="text-xl font-serif font-bold text-primary">
                    Shopping Cart ({getTotalItems()})
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {items.length > 0 ? (
                <>
                  <div className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-6">
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg"
                        >
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                          )}
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{item.name}</h3>
                            <p className="text-secondary font-medium">₹{item.price}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              className="p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-secondary hover:text-white"
                            >
                              <Minus className="w-4 h-4" />
                            </motion.button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-secondary hover:text-white"
                            >
                              <Plus className="w-4 h-4" />
                            </motion.button>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onRemoveItem(item.id)}
                            className="p-2 text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="w-5 h-5" />
                          </motion.button>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 border-t bg-gray-50">
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">₹{getTotalPrice()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tax</span>
                        <span className="font-medium">₹{(getTotalPrice() * 0.18).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-primary">
                          ₹{(getTotalPrice() * 1.18).toFixed(2)}
                        </span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onCheckout}
                        className="w-full bg-primary text-white py-3 rounded-lg hover:bg-secondary transition-colors duration-300"
                      >
                        Proceed to Checkout
                      </motion.button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-6">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg mb-6">Your cart is empty</p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition-colors duration-300"
                  >
                    Continue Shopping
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Cart;