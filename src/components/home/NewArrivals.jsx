import { Link } from 'react-router-dom';
import ProductCard from '../products/ProductCard';
import { motion } from 'framer-motion';

const NewArrivals = ({ products }) => {
  const newProducts = products.filter(product => product.isNew);

  return (
    <section className="py-12 bg-beige/50 bg-opacity-80 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: false }}
            className="text-2xl md:text-3xl font-bold font-[sora] text-deep-blue"
          >
            New Arrivals
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: false }}
          >
            <Link
              to="/products?new=true"
              className="text-deep-blue font-[montserrat] hover:text-opacity-80 hover:text-warm-terracotta font-medium flex items-center"
            >
              View all
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </motion.div>
        </div>

        {newProducts.length === 0 ? (
          <p className="text-center text-deep-blue font-[montserrat] font-semibold py-8">
            No new arrivals at the moment. Check back soon!
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newProducts.slice(0, 4).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: index * 0.15 }}
                viewport={{ once: false }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewArrivals;