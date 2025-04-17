import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';

const NotFound = () => {
  return (
    <>
    <SEO title='Page Not Found' />
    <div className="min-h-screen flex items-center justify-center bg-beige/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-9xl font-bold text-deep-blue font-[sora]">404</h1>
          <h2 className="mt-6 text-3xl font-bold font-[montserrat] text-deep-blue">Page not found</h2>
          <p className="mt-2 text-deep-blue">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-block bg-rich-teal/75 hover:bg-opacity-90 hover:bg-rich-teal/25 hover:scale-97 text-deep-blue font-medium font-[montserrat] px-6 py-3 rounded-md transition-all"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default NotFound;