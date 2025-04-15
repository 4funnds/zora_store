import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <Helmet>
        <title>About Us | Zora Fashion</title>
        <meta name="description" content="Learn about Zora Fashion and our mission to bring Indonesian-inspired fashion to SMEs" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold font-sora text-secondary mb-8 text-center">
          Our Story
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <h2 className="text-2xl font-bold font-sora text-secondary mb-4">
              Indonesian Heritage, Modern Style
            </h2>
            <p className="text-gray-700 mb-4">
              Founded in 2015, Zora Fashion began with a simple mission: to bring the rich textile
              traditions of Indonesia to modern entrepreneurs. Our founder, Rina Wijaya, started
              with a small collection of batik pieces tailored for business professionals.
            </p>
            <p className="text-gray-700">
              Today, we've grown into a beloved brand serving small and medium enterprises across
              Southeast Asia, while staying true to our roots in quality craftsmanship and
              sustainable practices.
            </p>
          </div>
          <div className="bg-gray-100 rounded-lg overflow-hidden aspect-video">
            <img
              src="/images/about-hero.jpg"
              alt="Zora team working"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="bg-primary bg-opacity-10 rounded-xl p-8 md:p-12 mb-12">
          <h2 className="text-2xl font-bold font-sora text-secondary mb-6 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Quality Craftsmanship',
                description: 'Each piece is carefully crafted by skilled artisans using premium materials',
                icon: '✂️'
              },
              {
                title: 'Sustainable Practices',
                description: 'We prioritize eco-friendly materials and ethical production methods',
                icon: '🌱'
              },
              {
                title: 'Empowering SMEs',
                description: 'Designed for entrepreneurs who want to look professional and distinctive',
                icon: '💼'
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-sm text-center"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-lg font-bold font-sora text-secondary mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold font-sora text-secondary mb-4">
            Join Our Journey
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-6">
            We're constantly evolving and looking for partners who share our vision. Whether you're
            a customer, supplier, or potential collaborator, we'd love to hear from you.
          </p>
          <a
            href="/contact"
            className="inline-block bg-primary hover:bg-opacity-90 text-white font-medium px-6 py-3 rounded-md"
          >
            Get in Touch
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default About;