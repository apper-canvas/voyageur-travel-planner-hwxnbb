import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

function MainFeature() {
  // Define icon components
  const PlusIcon = getIcon('Plus');
  const MinusIcon = getIcon('Minus');
  const MapPinIcon = getIcon('MapPin');
  const CalendarIcon = getIcon('Calendar');
  const UsersIcon = getIcon('Users');
  const PlaneIcon = getIcon('Plane');
  const BuildingIcon = getIcon('Building');
  const CarIcon = getIcon('Car');
  const SearchIcon = getIcon('Search');
  const WalletIcon = getIcon('Wallet');
  
  // Trip planner state
  const [destination, setDestination] = useState('');
  const [source, setSource] = useState('');
  const [startDate, setStartDate] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [endDate, setEndDate] = useState('');
  const [travelers, setTravelers] = useState(2);
  const [budget, setBudget] = useState(2000);
  const [isPlanning, setIsPlanning] = useState(false);
  const [includeFlights, setIncludeFlights] = useState(true);
  const [includeHotels, setIncludeHotels] = useState(true);
  const [includeTransport, setIncludeTransport] = useState(false);
  const [errors, setErrors] = useState({});
  const [tripPlan, setTripPlan] = useState(null);
  
  // Current date for min date input
  const today = new Date().toISOString().split('T')[0];
  
  // Currency formatter
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Calculate end date min value based on start date
  useEffect(() => {
    if (startDate && (!endDate || new Date(endDate) <= new Date(startDate))) {
      // Set end date to the day after start date
      const nextDay = new Date(startDate);
      nextDay.setDate(nextDay.getDate() + 1);
      setEndDate(nextDay.toISOString().split('T')[0]);
    }
  }, [startDate, endDate]);

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!source.trim()) {
      newErrors.source = "Source is required";
    }
    
    if (!destination.trim()) {
      newErrors.destination = "Destination is required";
    }
    
    if (!startDate) {
      newErrors.startDate = "Start date is required";
    }
    
    if (!endDate) {
      newErrors.endDate = "End date is required";
    } else if (new Date(endDate) <= new Date(startDate)) {
      newErrors.endDate = "End date must be after start date";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Generate trip plan
  const generateTripPlan = () => {
    if (!validateForm()) return;
    
    setIsPlanning(true);
    
    // Simulate API call
    setTimeout(() => {
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);
      const tripDuration = Math.ceil((endDateObj - startDateObj) / (1000 * 60 * 60 * 24));
      
      const dailyBudget = Math.floor(budget / tripDuration);
      const accommodationTotal = includeHotels ? Math.floor(budget * 0.4) : 0;
      const flightsTotal = includeFlights ? Math.floor(budget * 0.3) : 0;
      const transportTotal = includeTransport ? Math.floor(budget * 0.15) : 0;
      const activitiesTotal = Math.floor(budget * 0.15);
      
      const newTripPlan = {
        destination,
        source,
        startDate: startDateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        endDate: endDateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        duration: tripDuration,
        travelers,
        budget: formatCurrency(budget),
        dailyBudget: formatCurrency(dailyBudget),
        breakdown: {
          accommodation: {
            amount: formatCurrency(accommodationTotal),
            percentage: includeHotels ? 40 : 0
          },
          flights: {
            amount: formatCurrency(flightsTotal),
            percentage: includeFlights ? 30 : 0
          },
          transport: {
            amount: formatCurrency(transportTotal),
            percentage: includeTransport ? 15 : 0
          },
          activities: {
            amount: formatCurrency(activitiesTotal),
            percentage: 15
          }
        }
      };
      
      setTripPlan(newTripPlan);
      setIsPlanning(false);
      toast.success("Trip plan generated successfully!");
    }, 1500);
  };

  // Reset the form
  const resetForm = () => {
    setDestination('');
    setSource('');
    setStartDate('');
    setEndDate('');
    setTravelers(2);
    setBudget(2000);
    setIncludeFlights(true);
    setIncludeHotels(true);
    setIncludeTransport(false);
    setErrors({});
    setTripPlan(null);
  };
  // Save the trip plan
  const savePlan = () => {
    if (!tripPlan) return;
    
    setIsSaving(true);
    
    try {
      // Generate a unique ID for the plan
      const planId = `trip-${Date.now()}`;
      
      // Add timestamp and ID to the plan
      const planToSave = {
        ...tripPlan,
        id: planId,
        savedAt: new Date().toISOString()
      };
      
      // Save to localStorage
      const savedPlans = JSON.parse(localStorage.getItem('savedTripPlans') || '[]');
      localStorage.setItem('savedTripPlans', JSON.stringify([...savedPlans, planToSave]));
      
      toast.success("Trip plan saved successfully!");
    } catch (error) {
      toast.error("Failed to save trip plan. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };


  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          Smart Trip Planner
        </h2>
        <p className="text-surface-600 dark:text-surface-300">
          Tell us about your trip, and we'll help you create a personalized travel plan with budget recommendations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 card"
        >
          <h3 className="text-xl font-semibold mb-6">Trip Details</h3>
          
          <div className="space-y-4">
            <div className="input-group">
              <label htmlFor="source" className="input-label">Source</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPinIcon className="h-4 w-4 text-surface-400" />
                </div>
                <input
                  id="source"
                  type="text"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="Your starting location"
                  className={`w-full pl-10 ${errors.source ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.source && <p className="input-error">{errors.source}</p>}
            </div>
            <div className="input-group">
              <label htmlFor="destination" className="input-label">Destination</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPinIcon className="h-4 w-4 text-surface-400" />
                </div>
                <input
                  id="destination"
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="City, country or region"
                  className={`w-full pl-10 ${errors.destination ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.destination && <p className="input-error">{errors.destination}</p>}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="input-group">
                <label htmlFor="startDate" className="input-label">Start Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarIcon className="h-4 w-4 text-surface-400" />
                  </div>
                  <input
                    id="startDate"
                    type="date"
                    value={startDate}
                    min={today}
                    onChange={(e) => setStartDate(e.target.value)}
                    className={`w-full pl-10 ${errors.startDate ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.startDate && <p className="input-error">{errors.startDate}</p>}
              </div>
              
              <div className="input-group">
                <label htmlFor="endDate" className="input-label">End Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarIcon className="h-4 w-4 text-surface-400" />
                  </div>
                  <input
                    id="endDate"
                    type="date"
                    value={endDate}
                    min={startDate || today}
                    onChange={(e) => setEndDate(e.target.value)}
                    className={`w-full pl-10 ${errors.endDate ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.endDate && <p className="input-error">{errors.endDate}</p>}
              </div>
            </div>
            
            <div className="input-group">
              <label htmlFor="travelers" className="input-label">Travelers</label>
              <div className="flex items-center">
                <button 
                  onClick={() => setTravelers(Math.max(1, travelers - 1))}
                  className="p-2 rounded-lg bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600"
                  aria-label="Decrease travelers"
                >
                  <MinusIcon className="h-4 w-4" />
                </button>
                <div className="flex-1 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <UsersIcon className="h-4 w-4 text-surface-500" />
                    <span className="font-medium">{travelers}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setTravelers(travelers + 1)}
                  className="p-2 rounded-lg bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600"
                  aria-label="Increase travelers"
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="input-group">
              <label htmlFor="budget" className="input-label flex justify-between">
                <span>Budget</span>
                <span className="text-primary font-medium">{formatCurrency(budget)}</span>
              </label>
              <input
                id="budget"
                type="range"
                min="500"
                max="10000"
                max="200000"
                step="1000"
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-2 bg-surface-200 dark:bg-surface-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-surface-500">
                <span>₹500</span>
                <span>₹2,00,000</span>
              </div>
            </div>
            
            <div className="mt-6">
              <p className="input-label mb-2">Include in Planning</p>
              <div className="flex flex-wrap gap-3">
                <label className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                  includeFlights 
                    ? 'bg-primary/10 text-primary' 
                    : 'bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400'
                }`}>
                  <input
                    type="checkbox"
                    checked={includeFlights}
                    onChange={() => setIncludeFlights(!includeFlights)}
                    className="sr-only"
                  />
                  <PlaneIcon className="h-4 w-4" />
                  <span className="text-sm font-medium">Flights</span>
                </label>
                
                <label className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                  includeHotels 
                    ? 'bg-primary/10 text-primary' 
                    : 'bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400'
                }`}>
                  <input
                    type="checkbox"
                    checked={includeHotels}
                    onChange={() => setIncludeHotels(!includeHotels)}
                    className="sr-only"
                  />
                  <BuildingIcon className="h-4 w-4" />
                  <span className="text-sm font-medium">Hotels</span>
                </label>
                
                <label className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                  includeTransport 
                    ? 'bg-primary/10 text-primary' 
                    : 'bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400'
                }`}>
                  <input
                    type="checkbox"
                    checked={includeTransport}
                    onChange={() => setIncludeTransport(!includeTransport)}
                    className="sr-only"
                  />
                  <CarIcon className="h-4 w-4" />
                  <span className="text-sm font-medium">Local Transport</span>
                </label>
              </div>
            </div>
            
            <div className="mt-6 flex gap-3">
              <button
                onClick={generateTripPlan}
                disabled={isPlanning}
                className="btn btn-primary flex-1 flex items-center justify-center gap-2"
              >
                {isPlanning ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Planning...
                  </>
                ) : (
                  <>
                    <SearchIcon className="h-4 w-4" />
                    Generate Plan
                  </>
                )}
              </button>
              
              {tripPlan && (
                <button
                  onClick={resetForm}
                  className="btn btn-outline"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-3"
        >
          {!tripPlan ? (
            <div className="card h-full flex flex-col items-center justify-center py-12 px-6 text-center">
              <img 
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&auto=format&fit=crop&q=80" 
                alt="Travel planning" 
                className="w-64 h-64 object-cover rounded-2xl mb-6"
              />
              <h3 className="text-xl font-semibold mb-2">Ready to Plan Your Next Adventure?</h3>
              <p className="text-surface-600 dark:text-surface-300 max-w-md">
                Fill in your trip details on the left to generate a personalized travel plan with budget recommendations.
              </p>
            </div>
          ) : (
            <div className="card">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold">{tripPlan.destination}</h3>
                  <p className="text-surface-500">
                  From: {tripPlan.source} • To: {tripPlan.destination} <br />
                  {tripPlan.startDate} - {tripPlan.endDate} • {tripPlan.duration} {tripPlan.duration === 1 ? 'day' : 'days'} • 
                  {tripPlan.travelers} {tripPlan.travelers === 1 ? 'traveler' : 'travelers'}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-sm text-surface-500">Total Budget</div>
                  <div className="text-2xl font-bold text-primary">{tripPlan.budget}</div>
                  <div className="text-sm text-surface-500">
                    ({tripPlan.dailyBudget}/day)
                  </div>
                </div>
              </div>
              
              <div className="border-t border-b border-surface-200 dark:border-surface-700 py-4 mb-6">
                <h4 className="flex items-center gap-2 text-lg font-semibold mb-4">
                  <WalletIcon className="h-5 w-5 text-primary" />
                  Budget Breakdown
                </h4>
                
                <div className="space-y-4">
                  {Object.entries(tripPlan.breakdown).map(([category, data]) => (
                    data.percentage > 0 && (
                      <div key={category}>
                        <div className="flex justify-between mb-1">
                          <div className="capitalize text-surface-700 dark:text-surface-300">
                            {category}
                          </div>
                          <div className="font-medium">{data.amount}</div>
                        </div>
                        <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2.5">
                          <div
                            className="bg-primary rounded-full h-2.5"
                            style={{ width: `${data.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="text-surface-600 dark:text-surface-300 text-sm">
                  This is an estimated budget based on your preferences. Actual costs may vary.
                </div>
                <button 
                  className="btn btn-accent"
                  onClick={savePlan}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                    </>
                  )}
                  Save Plan
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default MainFeature;