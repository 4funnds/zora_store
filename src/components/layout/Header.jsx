import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, ShoppingBagIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import CartIcon from '../common/CartIcon';
import MiniCart from '../cart/MiniCart';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'New Arrivals', path: '/products?new=true' },
    { name: 'Collections', path: '/collections' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-beige shadow-md py-2' : 'bg-beige/90 backdrop-blur-none py-4'}`}>
      <div className="container mx-auto px-4 py-auto">
        <div className="flex justify-between items-center">
          {/* Mobile menu button */}
          <button
            className="md:hidden text-deep-blue"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label= "Toggle menu"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>

          {/* Logo */}
          <Link to="/" className="text-2xl font-[sora] font-bold text-deep-blue">
            ZORA
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-[montserrat] font-semibold transition-colors hover:text-warm-terracotta ${
                    isActive ? 'text-warm-terracotta' : 'text-deep-blue'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Cart and Search */}
          <div className="flex items-center space-x-4">
            <button className="text-deep-blue hover:text-warm-terracotta">
              <MagnifyingGlassIcon className='h-5 w-5' />
            </button>
            <button
              className="relative text-deep-blue hover:text-warm-terracotta"
              onClick={() => setIsCartOpen(!isCartOpen)}
              aria-label='Shopping cart'
            >
              <CartIcon />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? 'bg-custom-yellow text-deep-blue'
                        : 'text-deep-blue hover:bg-warm-terracotta'
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Mini Cart */}
      <MiniCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};

export default Header;