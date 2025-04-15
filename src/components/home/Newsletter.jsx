import { useState } from 'react';
import { motion } from 'framer-motion';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsSubscribed(true);
      setEmail('');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="bg-secondary text-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold font-sora mb-4">
            Join Our Newsletter
          </h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Get 10% off your first order and updates on new collections
          </p>
          
          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-primary hover:bg-opacity-90 text-white font-medium px-6 py-3 rounded-md whitespace-nowrap transition-colors disabled:opacity-70"
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          ) : (
            <div className="bg-primary bg-opacity-20 border border-primary rounded-md p-4 inline-block">
              <p>Thank you for subscribing!</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;