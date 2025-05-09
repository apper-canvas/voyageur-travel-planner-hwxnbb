import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';
import HotelDetail from './HotelDetail';

const HotelList = () => {
  const StarIcon = getIcon('Star');
  const MapPinIcon = getIcon('MapPin');
  const FilterIcon = getIcon('Filter');
  const WalletIcon = getIcon('Wallet');
  
  // Sample hotel data
  const hotels = [
    {
      id: 1,
      name: "Taj Palace",
      location: "New Delhi, India",
      price: 12500,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "Leela Palace",
      location: "Bengaluru, India",
      price: 15000,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      name: "Oberoi Udaivilas",
      location: "Udaipur, India",
      price: 22000,
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      name: "ITC Grand Chola",
      location: "Chennai, India",
      price: 11500,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      name: "The Ritz-Carlton",
      location: "Mumbai, India",
      price: 18000,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      name: "JW Marriott",
      location: "Goa, India",
      price: 14500,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  // Find min and max prices from hotel data
  const minDataPrice = Math.min(...hotels.map(hotel => hotel.price));
  const maxDataPrice = Math.max(...hotels.map(hotel => hotel.price));
  
  // State for price filter
  const [minPrice, setMinPrice] = useState(minDataPrice);
  const [maxPrice, setMaxPrice] = useState(maxDataPrice);
  
  // Filtered hotels
  const [filteredHotels, setFilteredHotels] = useState(hotels);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Format currency in Rupees
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Filter hotels when price range changes
  useEffect(() => {
    const filtered = hotels.filter(
      hotel => hotel.price >= minPrice && hotel.price <= maxPrice
    );
    setFilteredHotels(filtered);
  }, [minPrice, maxPrice, hotels]);

  // Handle hotel selection
  const handleSelectHotel = (hotel) => {
    setSelectedHotel(hotel);
  };

  // Handle back button from detail view
  const handleBackToList = () => {
    setSelectedHotel(null);
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Popular Hotels</h3>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="btn btn-outline flex items-center gap-2 py-1.5"
        >
          <FilterIcon className="h-4 w-4" />
          Filters
        </button>
      </div>
      
      {selectedHotel ? (
        <HotelDetail hotel={selectedHotel} onBack={handleBackToList} />
      ) : (
        <>
          {showFilters && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="card mb-6"
            >
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <WalletIcon className="h-4 w-4 text-primary" />
                  <h4 className="font-medium">Price Range</h4>
                </div>
                
                <div className="mb-2 flex justify-between text-sm text-surface-600 dark:text-surface-300">
                  <span>{formatCurrency(minPrice)}</span>
                  <span>{formatCurrency(maxPrice)}</span>
                </div>
                
                <div className="px-2 py-4">
                  <div className="relative h-1 bg-surface-200 dark:bg-surface-700 rounded-full">
                    <div 
                      className="absolute h-1 bg-primary rounded-full"
                      style={{ 
                        left: `${((minPrice - minDataPrice) / (maxDataPrice - minDataPrice)) * 100}%`,
                        right: `${100 - ((maxPrice - minDataPrice) / (maxDataPrice - minDataPrice)) * 100}%`
                      }}
                    ></div>
                  </div>
                  
                  <input
                    type="range"
                    min={minDataPrice}
                    max={maxDataPrice}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full h-2 bg-transparent rounded-lg appearance-none cursor-pointer absolute -mt-1"
                  />
                </div>
              </div>
            </motion.div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHotels.length > 0 ? filteredHotels.map((hotel, index) => (
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card overflow-hidden hover:shadow-lg cursor-pointer transition-all"
                onClick={() => handleSelectHotel(hotel)}
              >
                <div className="relative mb-3">
                  <img src={hotel.image} alt={hotel.name} className="w-full h-48 object-cover rounded-t-lg" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent rounded-t-lg"></div>
                  <div className="absolute bottom-0 left-0 p-4 w-full">
                    <h4 className="font-bold text-lg text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">{hotel.name}</h4>
                    <div className="flex items-center text-white mb-1 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                      <MapPinIcon className="w-4 h-4 mr-1" /> {hotel.location}
                    </div>
                  </div>
                </div>
                
                <div className="px-4 pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center text-amber-500">
                      <StarIcon className="w-4 h-4 mr-1 fill-current" /> 
                      <span className="font-medium">{hotel.rating}</span>
                      <span className="text-xs text-surface-500 ml-1">(124 reviews)</span>
                    </div>
                    <div className="font-semibold text-lg">
                      {formatCurrency(hotel.price)}
                      <span className="text-sm text-surface-500"> / night</span>
                    </div>
                  </div>
                  
                  <p className="text-surface-600 dark:text-surface-400 text-sm mb-3">
                    Experience luxury and comfort at {hotel.name}, located in the heart of {hotel.location.split(',')[0]}.
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-surface-100 dark:bg-surface-700 px-2 py-1 rounded">Free WiFi</span>
                    <span className="text-xs bg-surface-100 dark:bg-surface-700 px-2 py-1 rounded">Restaurant</span>
                    <span className="text-xs bg-surface-100 dark:bg-surface-700 px-2 py-1 rounded">Swimming Pool</span>
                    <span className="text-xs bg-surface-100 dark:bg-surface-700 px-2 py-1 rounded">Room Service</span>
                    <span className="text-xs text-primary">+4 more</span>
                  </div>
                </div>
              </motion.div>
            )) : (
              <div className="col-span-full text-center py-12">
                <div className="text-surface-500 mb-2">
                  No hotels found in the selected price range.
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HotelList;