import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const FlightList = () => {
  const PlaneIcon = getIcon('Plane');
  const ClockIcon = getIcon('Clock');
  const CalendarIcon = getIcon('Calendar');
  const FilterIcon = getIcon('Filter');
  const WalletIcon = getIcon('Wallet');
  const ArrowRightIcon = getIcon('ArrowRight');

  // Sample flight data
  const flights = [
    {
      id: 1,
      airline: "Air India",
      logo: "https://images.unsplash.com/photo-1532299033004-d7702dba6bf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      from: "Delhi (DEL)",
      to: "Mumbai (BOM)",
      departureTime: "08:15 AM",
      arrivalTime: "10:25 AM",
      duration: "2h 10m",
      price: 4850,
      date: "2023-11-25",
      direct: true
    },
    {
      id: 2,
      airline: "IndiGo",
      logo: "https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      from: "Bengaluru (BLR)",
      to: "Hyderabad (HYD)",
      departureTime: "09:30 AM",
      arrivalTime: "10:45 AM",
      duration: "1h 15m",
      price: 3200,
      date: "2023-11-26",
      direct: true
    },
    {
      id: 3,
      airline: "Vistara",
      logo: "https://images.unsplash.com/photo-1579519772836-2732e2efb095?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      from: "Mumbai (BOM)",
      to: "Goa (GOI)",
      departureTime: "11:45 AM",
      arrivalTime: "01:05 PM",
      duration: "1h 20m",
      price: 5100,
      date: "2023-11-25",
      direct: true
    },
    {
      id: 4,
      airline: "SpiceJet",
      logo: "https://images.unsplash.com/photo-1533628635777-112b2239b1c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      from: "Chennai (MAA)",
      to: "Kolkata (CCU)",
      departureTime: "02:30 PM",
      arrivalTime: "05:00 PM",
      duration: "2h 30m",
      price: 6200,
      date: "2023-11-27",
      direct: true
    },
    {
      id: 5,
      airline: "Air Asia",
      logo: "https://images.unsplash.com/photo-1540339832862-84a66a3e5885?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      from: "Delhi (DEL)",
      to: "Jaipur (JAI)",
      departureTime: "04:15 PM",
      arrivalTime: "05:30 PM",
      duration: "1h 15m",
      price: 2750,
      date: "2023-11-28",
      direct: true
    },
    {
      id: 6,
      airline: "GoAir",
      logo: "https://images.unsplash.com/photo-1542550371427-311e1b0427cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      from: "Ahmedabad (AMD)",
      to: "Pune (PNQ)",
      departureTime: "07:00 AM",
      arrivalTime: "08:45 AM",
      duration: "1h 45m",
      price: 3900,
      date: "2023-11-26",
      direct: true
    }
  ];

  // Find min and max prices from flight data
  const minDataPrice = Math.min(...flights.map(flight => flight.price));
  const maxDataPrice = Math.max(...flights.map(flight => flight.price));
  
  // State for price filter
  const [minPrice, setMinPrice] = useState(minDataPrice);
  const [maxPrice, setMaxPrice] = useState(maxDataPrice);
  
  // Filtered flights
  const [filteredFlights, setFilteredFlights] = useState(flights);
  const [showFilters, setShowFilters] = useState(false);

  // Format currency in Rupees
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Filter flights when price range changes
  useEffect(() => {
    const filtered = flights.filter(
      flight => flight.price >= minPrice && flight.price <= maxPrice
    );
    setFilteredFlights(filtered);
  }, [minPrice, maxPrice, flights]);

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Available Flights</h3>
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
      
      <div className="space-y-4">
        {filteredFlights.length > 0 ? filteredFlights.map((flight, index) => (
          <motion.div
            key={flight.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="card hover:shadow-lg p-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-surface-100 dark:bg-surface-700 flex items-center justify-center overflow-hidden">
                  <PlaneIcon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">{flight.airline}</div>
                  <div className="text-sm text-surface-500"><CalendarIcon className="inline-block w-3 h-3 mr-1" />{flight.date}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="text-right"><strong>{flight.departureTime}</strong><div className="text-xs text-surface-500">{flight.from}</div></div>
                <div className="flex flex-col items-center px-2">
                  <div className="text-xs text-surface-500">{flight.duration}</div>
                  <ArrowRightIcon className="w-5 h-5 text-primary my-1" />
                  <div className="text-xs text-surface-500">{flight.direct ? 'Direct' : '1 Stop'}</div>
                </div>
                <div><strong>{flight.arrivalTime}</strong><div className="text-xs text-surface-500">{flight.to}</div></div>
              </div>
              
              <div className="text-right">
                <div className="font-bold text-xl text-primary">{formatCurrency(flight.price)}</div>
                <button className="btn btn-primary text-sm mt-2">Book Now</button>
              </div>
            </div>
          </motion.div>
        )) : (
          <div className="text-center py-12">
            <div className="text-surface-500 mb-2">
              No flights found in the selected price range.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightList;