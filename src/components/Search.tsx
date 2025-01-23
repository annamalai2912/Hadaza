import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, X, ArrowRight } from 'lucide-react';

interface SearchResult {
  id: string;
  type: 'service' | 'product' | 'blog';
  title: string;
  description: string;
  image?: string;
  price?: number;
}

interface SearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (result: SearchResult) => void;
}

const Search: React.FC<SearchProps> = ({ isOpen, onClose, onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  // Simulated search results
  const mockResults: SearchResult[] = [
    {
      id: '1',
      type: 'service',
      title: 'Luxury Hair Treatment',
      description: 'Premium hair care service with organic products',
      price: 2999,
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80'
    },
    {
      id: '2',
      type: 'product',
      title: 'Organic Hair Oil',
      description: 'Natural hair oil for healthy growth',
      price: 999,
      image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&q=80'
    },
    {
      id: '3',
      type: 'blog',
      title: 'Top 10 Hair Care Tips',
      description: 'Expert advice for maintaining healthy hair',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80'
    }
  ];

  useEffect(() => {
    if (query.length >= 2) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const filtered = mockResults.filter(
          result => 
            result.title.toLowerCase().includes(query.toLowerCase()) ||
            result.description.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
        setLoading(false);
      }, 500);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50"
        >
          <div className="container mx-auto px-4 pt-20">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden"
            >
              <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search services, products, or articles..."
                  className="w-full pl-12 pr-12 py-4 text-lg focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={onClose}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto">
                {loading ? (
                  <div className="p-8 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  </div>
                ) : results.length > 0 ? (
                  <div className="divide-y">
                    {results.map((result) => (
                      <motion.div
                        key={result.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-4 hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          onSelect(result);
                          onClose();
                        }}
                      >
                        <div className="flex items-center space-x-4">
                          {result.image && (
                            <img
                              src={result.image}
                              alt={result.title}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          )}
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                                result.type === 'service'
                                  ? 'bg-primary/10 text-primary'
                                  : result.type === 'product'
                                  ? 'bg-secondary/10 text-secondary'
                                  : 'bg-gray-100 text-gray-600'
                              }`}>
                                {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                              </span>
                              {result.price && (
                                <span className="text-lg font-bold text-primary">
                                  ₹{result.price}
                                </span>
                              )}
                            </div>
                            <h3 className="font-medium text-gray-900 mt-1">{result.title}</h3>
                            <p className="text-sm text-gray-500">{result.description}</p>
                          </div>
                          <ArrowRight className="w-5 h-5 text-gray-400" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : query.length >= 2 ? (
                  <div className="p-8 text-center text-gray-500">
                    No results found for "{query}"
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    Start typing to search...
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Search;