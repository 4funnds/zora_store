import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitSuccess(true);
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto px-4 py-12 mt-8 bg-beige/50">
      <Helmet>
        <title>Contact Us | Zora Fashion</title>
        <meta name="description" content="Get in touch with Zora Fashion team for inquiries and collaborations" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold font-[sora] text-deep-blue mb-2 text-center">
          Contact Us
        </h1>
        <p className="text-deep-blue font-[montserrat] text-center mb-12">
          Have questions or want to collaborate? We'd love to hear from you.
        </p>

        {submitSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
          >
            <svg
              className="h-12 w-12 text-green-500 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h3 className="text-lg font-medium text-green-800 mb-2">
              Message Sent Successfully!
            </h3>
            <p className="text-green-600">
              Thank you for contacting us. We'll get back to you within 24 hours.
            </p>
            <button
              onClick={() => setSubmitSuccess(false)}
              className="mt-4 inline-block bg-green-500 hover:bg-green-600 text-beige px-4 py-2 rounded-md text-sm font-medium"
            >
              Send Another Message
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-xl font-bold font-[sora] text-deep-blue mb-4">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium font-[montserrat] text-deep-blue mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-deep-blue rounded-md focus:ring-rich-teal/75 focus:border-rich-teal/25 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium font-[montserrat] text-deep-blue mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-deep-blue rounded-md focus:ring-rich-teal/75 focus:border-rich-teal/25 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium font-[montserrat] text-deep-blue mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-deep-blue rounded-md focus:ring-rich-teal/75 focus:border-rich-teal/25 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-medium-beige hover:bg-opacity-90 hover:bg-warm-terracotta/50 text-deep-blue font-[montserrat] font-semibold py-3 px-6 rounded-md transition-all disabled:opacity-70"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
            <div>
              <h2 className="text-xl font-bold font-[sora] text-deep-blue mb-4">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold font-[montserrat] text-deep-blue mb-1">Email</h3>
                  <p className="text-deep-blue">marketing@zora.com</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold font-[montserrat] text-deep-blue mb-1">Phone</h3>
                  <p className="text-deep-blue">+62 21 1234 5678</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold font-[montserrat] text-deep-blue mb-1">Address</h3>
                  <p className="text-deep-blue">
                    Jl. Sudirman No. 123<br />
                    Jakarta Selatan 12190<br />
                    Indonesia
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold font-[montserrat] text-deep-blue mb-1">Business Hours</h3>
                  <p className="text-deep-blue">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Contact;