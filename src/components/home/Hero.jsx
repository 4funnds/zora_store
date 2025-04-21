import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative overflow-hidden h-[500px] md:h-[600px] lg:h-[700px]">
      {/* Background Image with optimized loading */}
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1545320062-58012686fe41?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center z-0"
      >
        {/* Blurred low-res placeholder */}
        {/* <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1545320062-58012686fe41?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center blur-sm"></div> */}
      </div>
      
      {/* Color Overlay using the tertiary color with opacity */}
      <div className="absolute inset-0 bg-beige/50 bg-opacity-80 md:bg-beige/35 bg-opacity-75 z-1"></div>
      
      {/* Content Container */}
      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-[sora] mb-6 text-deep-blue"
          >
            Elevate Your Style with Zora
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl mb-8 text-deep-blue"
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
              className="inline-block bg-rich-teal/50 hover:bg-opacity-90 text-deep-blue font-[montserrat] font-medium px-8 py-3 rounded-md transition-all transform hover:scale-105 shadow-lg"
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