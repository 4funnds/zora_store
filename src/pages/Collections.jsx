import SEO from '../components/common/SEO';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductCard from '../components/products/ProductCard';
import { products } from '../data/products';

const Collections = ({ products }) => {
  // Group products by collection (static data for demo)
  const collections = [
    {
      id: 'batik',
      name: 'Batik Collection',
      description: 'Modern and traditional batik designs',
      products: products.filter(p => 
        p.name.toLowerCase().includes('batik') || 
        p.category === 'Tops' || 
        p.category === 'Dresses'
      ).slice(0, 4)
    },
    {
      id: 'kebaya',
      name: 'Traditional Wear',
      description: 'Authentic Indonesian kebaya and sarongs',
      products: products.filter(p => 
        p.name.toLowerCase().includes('kebaya') || 
        p.category === 'Dresses'
      ).slice(0, 4)
    },
    {
      id: 'office',
      name: 'Office Collection',
      description: 'Professional looks with Indonesian textiles',
      products: products.filter(p => 
        p.name.toLowerCase().includes('office') || 
        p.category === 'Outerwear' || 
        p.category === 'Bottoms'
      ).slice(0, 4)
    },
    {
      id: 'accessories',
      name: 'Accessories',
      description: 'Complement your outfit with traditional accents',
      products: products.filter(p => 
        p.category === 'Accessories'
      ).slice(0, 4)
    }
  ];

  // if (!products || products.length === 0) {
  //   return (
  //       <>
  //       <SEO title='Collections'/>
  //     <div className="container mx-auto mt-8 px-4 py-12 text-center">
  //       <p className="text-medium-beige">No collections available at the moment.</p>
  //     </div>
  //     </>
  //   );
  // }

  return (
    <>
      <SEO title='Collections' description="Explore our curated collections of Indonesian-inspired fashion" />
    <div className="container mx-auto mt-8 px-4 py-12">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold font-[sora] text-deep-blue mb-2 text-center">
          Our Collections
        </h1>
        <p className="text-medium-beige font-[montserrat] font-semibold text-center mb-12">
          Curated selections for every occasion
        </p>

        <div className="space-y-16">
          {collections.map((collection) => (
            <section key={collection.id} className="border-b border-medium-beige pb-16 last:border-0">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold font-[sora] text-deep-blue">{collection.name}</h2>
                  <p className="text-medium-beige font-[montserrat] font-semibold">{collection.description}</p>
                </div>
                <Link
                  to={`/products?collection=${collection.id}`}
                  className="text-rich-teal hover:text-warm-terracotta hover:scale-97 font-medium flex items-center transition-all"
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
              </div>

              {collection.products.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {collection.products.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-medium-beige font-[montserrat] font-bold py-8">
                  No products in this collection yet. Check back soon!
                </p>
              )}
            </section>
          ))}
        </div>
      </motion.div>
    </div>
    </>
  );
};

export default Collections;