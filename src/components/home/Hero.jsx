import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative overflow-hidden h-[500px] md:h-[600px]">
      {/* Background Image with proper contrast */}
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')] 
        bg-cover bg-center z-0"
      ></div>
      
      {/* Color Overlay using the secondary color (#2A324B) with opacity */}
      <div className="absolute inset-0 bg-[#2A324B] bg-opacity-80 z-1"></div>
      
      {/* Content Container */}
      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-sora mb-6 text-white"
          >
            Elevate Your Style with Zora
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl mb-8 text-white"
          >
            Discover our latest collection of Indonesian-inspired fashion for the modern entrepreneur.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              to="/products"
              className="inline-block bg-[#F27D42] hover:bg-opacity-90 text-white font-medium px-8 py-3 rounded-md transition-all transform hover:scale-105"
            >
              Shop Now
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;