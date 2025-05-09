import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

function Home() {
  const [activeTab, setActiveTab] = useState('flights');
  
  // Define icon components
  const PlaneIcon = getIcon('Plane');
  const HotelIcon = getIcon('Building2');
  const LandmarkIcon = getIcon('Landmark');
  const MapIcon = getIcon('Map');
  const CalendarIcon = getIcon('Calendar');
  const UsersIcon = getIcon('Users');
  const WalletIcon = getIcon('Wallet');
  const SearchIcon = getIcon('Search');
  
  const tabItems = [
    { id: 'flights', label: 'Flights', icon: PlaneIcon },
    { id: 'hotels', label: 'Hotels', icon: HotelIcon },
    { id: 'attractions', label: 'Attractions', icon: LandmarkIcon },
    { id: 'itineraries', label: 'Itineraries', icon: CalendarIcon }
  ];

  const featureItems = [
    {
      title: "Interactive Maps",
      description: "Explore destinations with detailed maps showing attractions, accommodations, and local highlights.",
      icon: MapIcon,
    },
    {
      title: "Budget Tracking",
      description: "Set travel budgets and track expenses across categories to keep your trip affordable.",
      icon: WalletIcon,
    },
    {
      title: "Trip Sharing",
      description: "Collaborate on trip planning with friends and family in real-time.",
      icon: UsersIcon,
    }
  ];

  const handleSearch = (query) => {
    toast.info(`Searching for ${activeTab}: "${query}"`);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <section className="mb-16">
        <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          >
            Plan Your Dream Journey
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-surface-600 dark:text-surface-300"
          >
            Search, plan, and organize your perfect trip with Voyageur's all-in-one travel platform
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="card max-w-4xl mx-auto"
        >
          <div className="flex overflow-x-auto scrollbar-hide gap-3 mb-6">
            {tabItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center px-4 py-2.5 rounded-lg whitespace-nowrap font-medium text-sm transition-all ${
                  activeTab === item.id
                    ? 'bg-primary text-white'
                    : 'bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600'
                }`}
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-surface-400" />
            </div>
            <input
              type="text"
              placeholder={`Search for ${activeTab}...`}
              className="w-full pl-10 rounded-lg"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch(e.target.value);
                }
              }}
            />
          </div>
        </motion.div>
      </section>

      <MainFeature />

      <section className="mt-16 md:mt-24">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">More Ways to Enhance Your Travel</h2>
          <p className="text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
            Voyageur offers powerful features to make every aspect of your journey smoother and more enjoyable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {featureItems.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card hover:shadow-lg transition-shadow"
            >
              <div className="inline-flex items-center justify-center p-3 mb-4 rounded-lg bg-primary/10 text-primary">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-surface-600 dark:text-surface-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;