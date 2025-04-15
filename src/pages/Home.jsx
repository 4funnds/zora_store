import Hero from '../components/home/Hero';
import FeaturedCollections from '../components/home/FeaturedCollections';
import Newsletter from '../components/home/Newsletter';
import NewArrivals from '../components/home/NewArrivals';
import SEO from '../components/common/SEO';
import { getFeaturedProducts, getNewArrivals } from '../data/products';

const Home = () => {
  const featuredProducts = getFeaturedProducts();
  const newArrivals = getNewArrivals();

  return (
    <>
      <SEO 
        title="Zora Fashion | Indonesian Inspired Clothing"
        description="Discover premium Indonesian fashion"
      />
      <Hero />
      <FeaturedCollections products={featuredProducts} />
      <NewArrivals products={newArrivals} />
      <Newsletter />
    </>
  );
};

export default Home;