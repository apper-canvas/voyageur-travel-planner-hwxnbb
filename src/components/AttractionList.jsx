import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const AttractionList = () => {
  const StarIcon = getIcon('Star');
  const MapPinIcon = getIcon('MapPin');
  const FilterIcon = getIcon('Filter');
  const WalletIcon = getIcon('Wallet');
  const TagIcon = getIcon('Tag');
  
  // Sample attractions data
  const attractions = [
    {
      id: 1,
      name: "Taj Mahal",
      location: "Agra, India",
      price: 1500,
      rating: 4.9,
      category: "Historical",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "One of the seven wonders of the world, this ivory-white marble mausoleum is a must-visit."
    },
    {
      id: 2,
      name: "Jaipur City Palace",
      location: "Jaipur, India",
      price: 700,
      rating: 4.7,
      category: "Historical",
      image: "https://images.unsplash.com/photo-1599661046827-9a64bd038f97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "A stunning blend of Rajasthani and Mughal architecture in the Pink City."
    },
    {
      id: 3,
      name: "Goa Beaches",
      location: "Goa, India",
      price: 0,
      rating: 4.8,
      category: "Natural",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Pristine beaches with golden sands and clear blue waters perfect for relaxation."
    },
    {
      id: 4,
      name: "Varanasi Ghats",
      location: "Varanasi, India",
      price: 0,
      rating: 4.6,
      category: "Cultural",
      image: "https://images.unsplash.com/photo-1609938867677-239ebc6656e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Experience the spiritual essence of India at these ancient riverside steps."
    },
    {
      id: 5,
      name: "Mysore Palace",
      location: "Mysore, India",
      price: 400,
      rating: 4.7,
      category: "Historical",
      image: "https://images.unsplash.com/photo-1588416499018-d8c31e67a66b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "A magnificent royal residence known for its Indo-Saracenic style of architecture."
    },
    {
      id: 6,
      name: "Munnar Tea Gardens",
      location: "Kerala, India",
      price: 350,
      rating: 4.9,
      category: "Natural",
      image: "https://images.unsplash.com/photo-1544233726-9f1d0a5f2830?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Rolling hills covered with lush green tea plantations offering breathtaking views."
    }
  ];

  // Find min and max prices from attraction data
  const minDataPrice = Math.min(...attractions.map(attraction => attraction.price));
  const maxDataPrice = Math.max(...attractions.map(attraction => attraction.price));
  
  // State for filters
  const [maxPrice, setMaxPrice] = useState(maxDataPrice);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredAttractions, setFilteredAttractions] = useState(attractions);
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories
  const categories = ['All', ...new Set(attractions.map(attraction => attraction.category))];

  // Format currency in Rupees
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Filter attractions when filters change
  useEffect(() => {
    let filtered = attractions.filter(
      attraction => attraction.price <= maxPrice
    );
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(
        attraction => attraction.category === selectedCategory
      );
    }
    
    setFilteredAttractions(filtered);
  }, [maxPrice, selectedCategory, attractions]);

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Popular Attractions</h3>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="btn btn-outline flex items-center gap-2 py-1.5"
        >
          <FilterIcon className="h-4 w-4" />
          Filters
        </button>
      </div>
      
      {showFilters && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="card mb-6"
        >
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TagIcon className="h-4 w-4 text-primary" />
                <h4 className="font-medium">Category</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                      selectedCategory === category
                        ? 'bg-primary text-white'
                        : 'bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <WalletIcon className="h-4 w-4 text-primary" />
                <h4 className="font-medium">Maximum Price: {formatCurrency(maxPrice)}</h4>
              </div>
              <input
                type="range"
                min={minDataPrice}
                max={maxDataPrice}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-2 bg-surface-200 dark:bg-surface-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </motion.div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAttractions.length > 0 ? filteredAttractions.map((attraction, index) => (
          <motion.div
            key={attraction.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="card overflow-hidden hover:shadow-lg"
          >
            <img src={attraction.image} alt={attraction.name} className="w-full h-48 object-cover rounded-lg mb-4" />
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-semibold text-lg">{attraction.name}</h4>
              <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">{attraction.category}</span>
            </div>
            <div className="flex items-center text-surface-600 dark:text-surface-300 mb-2"><MapPinIcon className="w-4 h-4 mr-1" /> {attraction.location}</div>
            <p className="text-surface-600 dark:text-surface-300 text-sm mb-3 line-clamp-2">{attraction.description}</p>
            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center text-amber-500"><StarIcon className="w-4 h-4 mr-1 fill-current" /> {attraction.rating}</div>
              <div className="font-semibold">
                {attraction.price === 0 ? 'Free' : formatCurrency(attraction.price)}
                <span className="text-sm text-surface-500"> / person</span>
              </div>
            </div>
          </motion.div>
        )) : (
          <div className="col-span-full text-center py-12">
            <div className="text-surface-500 mb-2">
              No attractions found matching your filters.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttractionList;