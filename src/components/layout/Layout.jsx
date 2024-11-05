import PropTypes from 'prop-types';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Responsive margin that adjusts based on screen size */}
      <div className="ml-0 md:ml-16 lg:ml-[400px] transition-all duration-300"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <main className="flex flex-col text-left w-full">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;