import React from 'react';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const HotelList = () => {
  const StarIcon = getIcon('Star');
  const MapPinIcon = getIcon('MapPin');
  
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

  // Format currency in Rupees
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Popular Hotels</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel, index) => (
          <motion.div
            key={hotel.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="card overflow-hidden hover:shadow-lg"
          >
            <img src={hotel.image} alt={hotel.name} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h4 className="font-semibold text-lg">{hotel.name}</h4>
            <div className="flex items-center text-surface-600 dark:text-surface-300 mb-2"><MapPinIcon className="w-4 h-4 mr-1" /> {hotel.location}</div>
            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center text-amber-500"><StarIcon className="w-4 h-4 mr-1 fill-current" /> {hotel.rating}</div>
              <div className="font-semibold text-lg">{formatCurrency(hotel.price)}<span className="text-sm text-surface-500"> / night</span></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HotelList;