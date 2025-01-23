import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart, MessageCircle, Share2, Bookmark, ChevronRight, Search, X, Filter } from 'lucide-react';

const Blog = () => {
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const blogPosts = [
    {
      id: '1',
      title: 'Top 10 Hair Care Tips for Summer',
      excerpt: 'Protect your hair from the summer heat with these expert tips...',
      content: 'Full detailed article content about summer hair care...',
      image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80',
      category: 'Hair Care',
      date: 'Mar 15, 2024',
      readTime: '5 min read',
      likes: 245,
      comments: 18,
      tags: ['summer', 'hair', 'care']
    },
    {
      id: '2',
      title: 'The Ultimate Bridal Beauty Timeline',
      excerpt: 'Plan your perfect bridal look with our month-by-month guide...',
      content: 'Comprehensive guide to bridal beauty preparation...',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80',
      category: 'Bridal',
      date: 'Mar 12, 2024',
      readTime: '8 min read',
      likes: 189,
      comments: 24,
      tags: ['wedding', 'beauty', 'preparation']
    },
    {
      id: '3',
      title: 'Natural Skincare Secrets Revealed',
      excerpt: 'Discover ancient beauty secrets for radiant skin...',
      content: 'In-depth exploration of natural skincare techniques...',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80',
      category: 'Skincare',
      date: 'Mar 10, 2024',
      readTime: '6 min read',
      likes: 312,
      comments: 29,
      tags: ['skincare', 'natural', 'beauty']
    }
  ];

  const categories = [
    'All', 'Hair Care', 'Skincare', 'Makeup', 'Bridal', 'Wellness'
  ];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [selectedPost, setSelectedPost] = useState<any>(null);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => 
      (activeCategory === 'All' || post.category === activeCategory) &&
      (searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    ).sort((a, b) => {
      if (sortBy === 'latest') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return b.likes - a.likes;
    });
  }, [activeCategory, searchQuery, sortBy]);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    return filteredPosts.slice(startIndex, startIndex + postsPerPage);
  }, [filteredPosts, currentPage]);

  const handleSave = (postId: string) => {
    setSavedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handleLike = (postId: string) => {
    setLikedPosts(prev => 
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const openPostModal = (post: any) => {
    setSelectedPost(post);
  };

  const closePostModal = () => {
    setSelectedPost(null);
  };

  return (
    <section id="blog" className="py-24 bg-gradient-to-b from-white to-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-serif font-bold text-primary mb-4">
            Beauty & Wellness Blog
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the latest trends, tips, and expert advice in beauty and wellness
          </p>
        </motion.div>

        <div className="flex justify-between items-center mb-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex-grow mr-4 relative"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowFilters(!showFilters)}
            className="bg-secondary/10 p-2 rounded-full"
          >
            <Filter className="w-6 h-6 text-secondary" />
          </motion.button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gray-50 p-4 rounded-lg mb-8 overflow-hidden"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold mb-2">Sort By</h4>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setSortBy('latest')}
                      className={`px-4 py-2 rounded-full ${
                        sortBy === 'latest' 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      Latest
                    </button>
                    <button
                      onClick={() => setSortBy('popular')}
                      className={`px-4 py-2 rounded-full ${
                        sortBy === 'popular' 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      Most Popular
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-secondary/20'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden group"
              onClick={() => openPostModal(post)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-secondary/90 text-white px-3 py-1 rounded-full text-sm">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
                
                <h3 className="text-xl font-serif font-bold text-primary mb-3 group-hover:text-secondary transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(post.id);
                      }}
                      className="flex items-center space-x-1 text-gray-500 hover:text-secondary transition-colors"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          likedPosts.includes(post.id) ? 'fill-secondary text-secondary' : ''
                        }`}
                      />
                      <span>{likedPosts.includes(post.id) ? post.likes + 1 : post.likes}</span>
                    </button>
                    
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-secondary transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span>{post.comments}</span>
                    </button>
                    
                    <button className="text-gray-500 hover:text-secondary transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSave(post.id);
                    }}
                    className="text-gray-500 hover:text-secondary transition-colors"
                  >
                    <Bookmark
                      className={`w-5 h-5 ${
                        savedPosts.includes(post.id) ? 'fill-secondary text-secondary' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>
              
              <div className="px-6 pb-6">
                <motion.button
                  whileHover={{ x: 5 }}
                  className="flex items-center text-secondary font-medium hover:text-primary transition-colors"
                >
                  Read More
                  <ChevronRight className="w-4 h-4 ml-1" />
                </motion.button>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ 
            length: Math.ceil(filteredPosts.length / postsPerPage) 
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`w-10 h-10 rounded-full ${
                currentPage === index + 1 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <AnimatePresence>
          {selectedPost && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={closePostModal}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="relative">
                  <img 
                    src={selectedPost.image} 
                    alt={selectedPost.title} 
                    className="w-full h-64 object-cover"
                  />
                  <button 
                    onClick={closePostModal}
                    className="absolute top-4 right-4 bg-white/80 rounded-full p-2"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="p-8">
                  <h2 className="text-3xl font-serif font-bold mb-4">{selectedPost.title}</h2>
                    <div className="flex items-center text-gray-500 mb-6">
                        <span>{selectedPost.date}</span>
                        <span className="mx-2">•</span>
                        <span>{selectedPost.readTime}</span>
                    </div>
                    
                    <div className="prose max-w-none text-gray-700 leading-relaxed">
                        {selectedPost.content}
                    </div>
                    
                    <div className="mt-8 pt-6 border-t">
                        <h3 className="text-xl font-semibold mb-4">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {selectedPost.tags.map((tag) => (
                                <span 
                                    key={tag} 
                                    className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-8 pt-6 border-t">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => handleLike(selectedPost.id)}
                                className="flex items-center space-x-2 text-gray-600 hover:text-secondary"
                            >
                                <Heart 
                                    className={`w-6 h-6 ${
                                        likedPosts.includes(selectedPost.id) 
                                            ? 'fill-secondary text-secondary' 
                                            : ''
                                    }`} 
                                />
                                <span>{likedPosts.includes(selectedPost.id) ? selectedPost.likes + 1 : selectedPost.likes}</span>
                            </button>
                            
                            <button className="flex items-center space-x-2 text-gray-600 hover:text-secondary">
                                <MessageCircle className="w-6 h-6" />
                                <span>{selectedPost.comments}</span>
                            </button>
                            
                            <button className="text-gray-600 hover:text-secondary">
                                <Share2 className="w-6 h-6" />
                            </button>
                        </div>
                        
                        <button
                            onClick={() => handleSave(selectedPost.id)}
                            className="text-gray-600 hover:text-secondary"
                        >
                            <Bookmark
                                className={`w-6 h-6 ${
                                    savedPosts.includes(selectedPost.id) 
                                        ? 'fill-secondary text-secondary' 
                                        : ''
                                }`}
                            />
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )}
  </AnimatePresence>
<motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-white px-8 py-3 rounded-full hover:bg-secondary transition-colors duration-300"
          >
            View All Posts
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;