import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Page Not Found | Zora Fashion</title>
      </Helmet>
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <h2 className="mt-6 text-3xl font-bold text-secondary">Page not found</h2>
          <p className="mt-2 text-gray-600">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-block bg-primary hover:bg-opacity-90 text-white font-medium px-6 py-3 rounded-md"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;