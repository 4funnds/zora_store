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
    <section className="bg-beige py-12 md:py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: false }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold font-[sora] text-deep-blue mb-4">
            Join Our Newsletter
          </h2>
          <p className="mb-6 max-w-2xl mx-auto font-[montserrat] text-deep-blue">
            Get 10% off your first order and updates on new collections
          </p>
          
          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-grow px-4 py-3 font-[montserrat] rounded-md text-deep-blue border border-rich-teal/50 focus:outline-none focus:ring focus:ring-rich-teal/50"
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-medium-beige hover:bg-opacity-90 hover:bg-rich-teal/25 hover:scale-103 text-deep-blue font-medium font-[montserrat] px-6 py-3 rounded-md beigespace-nowrap transition-all disabled:opacity-70"
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          ) : (
            <div className="bg-medium-beige bg-opacity-50 border-2 font-[montserrat] text-deep-blue border-warm-terracotta/25 rounded-md p-4 inline-block">
              <p>Thank you for subscribing!</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;