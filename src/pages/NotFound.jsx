import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

function NotFound() {
  // Define icon components
  const HomeIcon = getIcon('Home');
  const MapIcon = getIcon('Map');
  
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-lg mx-auto text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8"
        >
          <MapIcon className="w-32 h-32 mx-auto text-surface-300 dark:text-surface-600" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl font-bold text-primary">404</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            You've Gone Off the Map!
          </h1>
          <p className="text-surface-600 dark:text-surface-300 mb-8">
            The destination you're looking for doesn't exist or has been moved to another location.
          </p>
          
          <Link to="/" className="btn btn-primary inline-flex items-center">
            <HomeIcon className="w-4 h-4 mr-2" />
            Return to Homepage
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default NotFound;