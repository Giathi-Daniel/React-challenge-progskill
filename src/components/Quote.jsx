import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const CACHE_KEY = 'motivational_quote';
const API_ENDPOINTS = [
  'https://api.quotable.io/random',
  'https://zenquotes.io/api/today'
];

const getDailySeed = () => {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};

const Quote = () => {
  const [quote, setQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuote = async (retryCount = 0) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Randomize API endpoint selection with fallback
      const apiUrl = API_ENDPOINTS[Math.floor(Math.random() * API_ENDPOINTS.length)];
      const response = await axios.get(apiUrl);
      
      let parsedQuote;
      
      // Handle different API response structures
      if (apiUrl.includes('quotable')) {
        parsedQuote = {
          text: response.data.content,
          author: response.data.author,
          tags: response.data.tags
        };
      } else {
        parsedQuote = {
          text: response.data[0].q,
          author: response.data[0].a,
          tags: ['zen']
        };
      }

      localStorage.setItem(CACHE_KEY, JSON.stringify({
        ...parsedQuote,
        seed: getDailySeed(),
        timestamp: Date.now()
      }));
      
      setQuote(parsedQuote);
    } catch (err) {
      if (retryCount < 2) {
        await fetchQuote(retryCount + 1);
      } else {
        setError('Failed to fetch quote. Showing cached version.', err);
        const cached = JSON.parse(localStorage.getItem(CACHE_KEY));
        if (cached) setQuote(cached);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const cachedData = JSON.parse(localStorage.getItem(CACHE_KEY));
    const currentSeed = getDailySeed();
    
    if (!cachedData || cachedData.seed !== currentSeed) {
      fetchQuote();
    } else {
      setQuote(cachedData);
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4 animate-pulse"
          >
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mt-4"></div>
          </motion.div>
        ) : error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
          >
            {error}
          </motion.div>
        ) : (
          <motion.div
            key="quote"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100/50"
          >
            <div className="text-3xl leading-relaxed text-gray-800 font-serif italic">
              &quot;{quote.text}&quot;
            </div>
            
            <div className="mt-6 flex items-center justify-between">
              <div>
                <div className="text-lg font-medium text-gray-700">
                  {quote.author}
                </div>
                <div className="flex gap-2 mt-2">
                  {quote.tags?.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-blue-100/50 text-blue-800 text-sm rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={() => navigator.clipboard.writeText(`"${quote.text}" - ${quote.author}`)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Copy quote"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
                <a
                  href={`https://twitter.com/intent/tweet?text="${encodeURIComponent(quote.text)}" - ${encodeURIComponent(quote.author)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Share on Twitter"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Quote;