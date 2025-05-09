import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

const ItineraryList = () => {
  const CalendarIcon = getIcon('Calendar');
  const MapPinIcon = getIcon('MapPin');
  const FilterIcon = getIcon('Filter');
  const WalletIcon = getIcon('Wallet');
  const ClockIcon = getIcon('Clock');
  const UsersIcon = getIcon('Users');
  
  // Sample itineraries data
  const itineraries = [
    {
      id: 1,
      title: "Golden Triangle Tour",
      destinations: ["Delhi", "Agra", "Jaipur"],
      duration: 7,
      price: 25000,
      image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Experience the rich history and culture of North India's most iconic cities.",
      highlights: [
        "Visit the Taj Mahal at sunrise",
        "Explore Jaipur's majestic forts",
        "Discover Delhi's blend of old and new",
        "Authentic local cuisine experiences",
        "Cultural performances and heritage walks"
      ]
    },
    {
      id: 2,
      title: "Kerala Backwaters Retreat",
      destinations: ["Kochi", "Alleppey", "Kumarakom"],
      duration: 5,
      price: 18500,
      image: "https://images.unsplash.com/photo-1602301413608-0a5bc3be2209?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Relax and rejuvenate on a houseboat journey through Kerala's serene backwaters.",
      highlights: [
        "Overnight stay on traditional houseboat",
        "Ayurvedic spa treatments",
        "Fresh seafood cuisine",
        "Visit to spice plantations",
        "Cultural Kathakali performances"
      ]
    },
    {
      id: 3,
      title: "Himalayan Adventure",
      destinations: ["Manali", "Leh", "Ladakh"],
      duration: 10,
      price: 35000,
      image: "https://images.unsplash.com/photo-1585116938581-f4b5847dd4f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "An epic journey through the breathtaking landscapes of the Himalayas.",
      highlights: [
        "Cross the famous Rohtang Pass",
        "Monastery visits in Ladakh",
        "Camping under the stars",
        "River rafting adventures",
        "Local Himalayan cuisine"
      ]
    },
    {
      id: 4,
      title: "Goa Beach Holiday",
      destinations: ["North Goa", "South Goa"],
      duration: 4,
      price: 12000,
      image: "https://images.unsplash.com/photo-1484821582734-6692f1df72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Sun, sand, and relaxation on India's most famous beaches.",
      highlights: [
        "Beach hopping",
        "Water sports and activities",
        "Vibrant nightlife"
      ]
    },
    {
      id: 5,
      title: "Rajasthan Heritage Tour",
      destinations: ["Udaipur", "Jodhpur", "Jaisalmer"],
      duration: 8,
      price: 28500,
      image: "https://images.unsplash.com/photo-1599661046289-e31897836f47?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Discover the royal heritage and desert landscapes of Rajasthan.",
      highlights: [
        "Lake Palace in Udaipur",
        "Blue City of Jodhpur",
        "Desert safari in Jaisalmer"
      ]
    },
    {
      id: 6,
      title: "Northeast Explorer",
      destinations: ["Gangtok", "Darjeeling", "Shillong"],
      duration: 9,
      price: 32000,
      image: "https://images.unsplash.com/photo-1518310952173-06788096c2a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Explore the less traveled paths of India's stunning northeastern states.",
      highlights: [
        "Tea plantations in Darjeeling",
        "Living root bridges in Meghalaya",
        "Himalayan views from Gangtok"
      ]
    }
  ];

  // Find min and max prices and durations
  const minDataPrice = Math.min(...itineraries.map(item => item.price));
  const maxDataPrice = Math.max(...itineraries.map(item => item.price));
  const minDuration = Math.min(...itineraries.map(item => item.duration));
  const maxDuration = Math.max(...itineraries.map(item => item.duration));
  
  // State for filters
  const [maxPrice, setMaxPrice] = useState(maxDataPrice);
  const [minDays, setMinDays] = useState(minDuration);
  const [maxDays, setMaxDays] = useState(maxDuration);
  const [filteredItineraries, setFilteredItineraries] = useState(itineraries);
  const [showFilters, setShowFilters] = useState(false);
  
  // States for itinerary modal
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Format currency in Rupees
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Filter itineraries when filters change
  useEffect(() => {
    const filtered = itineraries.filter(
      item => item.price <= maxPrice && 
             item.duration >= minDays && 
             item.duration <= maxDays
    );
    
    setFilteredItineraries(filtered);
  }, [maxPrice, minDays, maxDays, itineraries]);
  
  // Handle view itinerary button click
  const handleViewItinerary = (itinerary) => {
    setSelectedItinerary(itinerary);
    setShowModal(true);
    toast.info(`Opening ${itinerary.title} itinerary details`);
  };
  
  // Close the modal
  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setSelectedItinerary(null);
    }, 300); // Wait for animation to complete
  };
  
  // Generate day-by-day itinerary for example purposes
  const generateDayItinerary = (itinerary) => {
    return Array.from({ length: itinerary.duration }, (_, i) => ({
      day: i + 1,
      title: `Day ${i + 1}: ${itinerary.destinations[i % itinerary.destinations.length]}`,
      description: `Explore the beautiful sights of ${itinerary.destinations[i % itinerary.destinations.length]} with guided tours and authentic experiences.`
    }));
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Recommended Itineraries</h3>
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
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CalendarIcon className="h-4 w-4 text-primary" />
                <h4 className="font-medium">Duration: {minDays} - {maxDays} days</h4>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min={minDuration}
                  max={maxDays}
                  value={minDays}
                  onChange={(e) => setMinDays(Math.min(Number(e.target.value), maxDays))}
                  className="w-20 text-center"
                />
                <input
                  type="range"
                  min={minDuration}
                  max={maxDuration}
                  value={maxDays}
                  onChange={(e) => setMaxDays(Number(e.target.value))}
                  className="flex-1 h-2 bg-surface-200 dark:bg-surface-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredItineraries.length > 0 ? filteredItineraries.map((itinerary, index) => (
          <motion.div
            key={itinerary.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="card overflow-hidden hover:shadow-lg"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-2/5">
                <img src={itinerary.image} alt={itinerary.title} className="w-full h-48 md:h-full object-cover rounded-lg" />
              </div>
              <div className="md:w-3/5">
                <h4 className="font-semibold text-xl mb-2">{itinerary.title}</h4>
                <div className="flex items-center text-surface-600 dark:text-surface-300 mb-2">
                  <MapPinIcon className="w-4 h-4 mr-1" /> 
                  {itinerary.destinations.join(" • ")}
                </div>
                <p className="text-surface-600 dark:text-surface-300 text-sm mb-3">{itinerary.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {itinerary.highlights.map((highlight, i) => (
                    <span key={i} className="text-xs bg-surface-100 dark:bg-surface-700 px-2 py-1 rounded-full">
                      {highlight}
                    </span>
                  ))}
                </div>
                
                <div className="flex flex-wrap justify-between items-center mt-auto">
                  <div className="flex items-center text-surface-600 dark:text-surface-300 text-sm">
                    <ClockIcon className="w-4 h-4 mr-1" /> {itinerary.duration} days
                  </div>
                  <div className="font-bold text-lg text-primary">
                    {formatCurrency(itinerary.price)}
                    <span className="text-sm font-normal text-surface-500"> / person</span>
                  </div>
                </div>
                
                <button onClick={() => handleViewItinerary(itinerary)} className="btn btn-primary w-full mt-4">View Itinerary</button>
              </div>
            </div>
          </motion.div>
        )) : (
          <div className="col-span-full text-center py-12">
            <div className="text-surface-500 mb-2">
              No itineraries found matching your filters.
            </div>
          </div>
        )}
      
      {/* Itinerary Details Modal */}
      {showModal && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
            className="bg-white dark:bg-surface-800 rounded-xl max-w-4xl w-full max-h-[85vh] overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="overflow-y-auto max-h-[85vh]">
              <div className="flex flex-col">
                <div className="relative h-56 md:h-72">
                  <img 
                    src={selectedItinerary.image} 
                    alt={selectedItinerary?.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <h2 className="text-white text-2xl md:text-3xl font-bold">{selectedItinerary.title}</h2>
                    <div className="flex items-center text-white/90 mt-2">
                      <MapPinIcon className="w-4 h-4 mr-1" /> 
                      {selectedItinerary.destinations.join(" • ")}
                    </div>
                  </div>
                  <button 
                    onClick={closeModal}
                    className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg> 
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between flex-wrap gap-4 mb-6">
                    <div className="flex items-center">
                      <ClockIcon className="w-5 h-5 mr-2 text-primary" /> 
                      <span className="font-medium">{selectedItinerary.duration} days</span>
                    </div>
                    <div className="flex items-center">
                      <WalletIcon className="w-5 h-5 mr-2 text-primary" /> 
                      <span className="font-medium">{formatCurrency(selectedItinerary.price)} / person</span>
                    </div>
                    <div className="flex items-center">
                      <UsersIcon className="w-5 h-5 mr-2 text-primary" /> 
                      <span className="font-medium">Min. 2 travelers</span>
                    </div>
                  </div>
                  
                  <p className="mb-6">{selectedItinerary.description}</p>
                  
                  <h3 className="text-xl font-semibold mb-4">Trip Highlights</h3>
                  <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedItinerary.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-center">
                        <div className="rounded-full bg-primary/10 p-1 mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4">Day-by-Day Itinerary</h3>
                  <div className="space-y-4">
                    {generateDayItinerary(selectedItinerary).map((day) => (
                      <div key={day.day} className="border-l-2 border-primary pl-4 pb-2">
                        <h4 className="font-semibold text-lg">{day.title}</h4>
                        <p className="text-surface-600 dark:text-surface-300">{day.description}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 space-y-4">
                    <button onClick={closeModal} className="btn btn-outline w-full">Close</button>
                    <button onClick={() => {
                      toast.success("Itinerary booked successfully!");
                      setTimeout(closeModal, 500);
                    }} className="btn btn-primary w-full">Book This Itinerary</button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
      )}
    </div>
  );
};
export default ItineraryList;