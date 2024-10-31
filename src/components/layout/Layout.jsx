import PropTypes from 'prop-types';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="ml-[400px]"> {/* Fixed margin for sidebar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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