import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

const HotelDetail = ({ hotel, onBack }) => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(2);
  const [roomType, setRoomType] = useState('deluxe');

  // Icons
  const StarIcon = getIcon('Star');
  const MapPinIcon = getIcon('MapPin');
  const ChevronLeftIcon = getIcon('ChevronLeft');
  const WifiIcon = getIcon('Wifi');
  const UtensilsIcon = getIcon('Utensils');
  const CarIcon = getIcon('Car');
  const SwimmingIcon = getIcon('Swimming');
  const DumbbellIcon = getIcon('Dumbbell');
  const AirVentIcon = getIcon('AirVent');
  const TvIcon = getIcon('Tv');
  const CoffeeIcon = getIcon('Coffee');
  const BedDoubleIcon = getIcon('BedDouble');

  // Hotel details typically not included in list view
  const hotelDetails = {
    description: `Experience luxury and comfort at ${hotel.name}, located in the heart of ${hotel.location.split(',')[0]}. Our hotel offers stunning views, exceptional service, and world-class amenities to make your stay memorable.`,
    rooms: [
      { type: 'standard', name: 'Standard Room', price: hotel.price * 0.8, capacity: 2 },
      { type: 'deluxe', name: 'Deluxe Room', price: hotel.price, capacity: 2 },
      { type: 'suite', name: 'Executive Suite', price: hotel.price * 1.5, capacity: 4 },
    ],
    amenities: [
      { name: 'Free WiFi', icon: WifiIcon },
      { name: 'Restaurant', icon: UtensilsIcon },
      { name: 'Parking', icon: CarIcon },
      { name: 'Swimming Pool', icon: SwimmingIcon },
      { name: 'Fitness Center', icon: DumbbellIcon },
      { name: 'Air Conditioning', icon: AirVentIcon },
      { name: 'TV', icon: TvIcon },
      { name: 'Room Service', icon: CoffeeIcon },
    ],
    images: [
      hotel.image,
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    ]
  };

  // Format currency in Rupees
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleBooking = () => {
    if (!checkInDate || !checkOutDate) {
      toast.error('Please select check-in and check-out dates');
      return;
    }

    const selectedRoom = hotelDetails.rooms.find(room => room.type === roomType);
    
    toast.success(`Booking confirmed at ${hotel.name}!`, {
      description: `${selectedRoom.name} for ${guests} guests from ${checkInDate} to ${checkOutDate}`
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mt-2"
    >
      <button 
        onClick={onBack}
        className="mb-4 flex items-center text-primary hover:text-primary-dark transition-colors"
      >
        <ChevronLeftIcon className="w-5 h-5 mr-1" />
        Back to all hotels
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - 2/3 width on large screens */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Gallery */}
          <div className="grid grid-cols-3 gap-2 h-64 md:h-96">
            <div className="col-span-2 h-full">
              <div className="relative h-full">
                <img 
                  src={hotelDetails.images[0]} 
                  alt={hotel.name} 
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg"></div>
                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <h1 className="text-2xl font-bold text-white">{hotel.name}</h1>
                  <div className="flex items-center text-white/90 mb-1">
                    <MapPinIcon className="w-4 h-4 mr-1" /> {hotel.location}
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2 h-full">
              <div className="relative h-1/2">
                <img 
                  src={hotelDetails.images[1]} 
                  alt={`${hotel.name} room`} 
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
              </div>
              <div className="relative h-1/2">
                <img 
                  src={hotelDetails.images[2]} 
                  alt={`${hotel.name} amenities`} 
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>

          {/* Hotel Information */}
          <div className="card">
            <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{hotel.name}</h2>
                <h1 className="text-2xl font-bold">{hotel.name}</h1>
                <div className="flex items-center text-surface-600 dark:text-surface-300 mb-1">
                  <MapPinIcon className="w-4 h-4 mr-1" /> {hotel.location}
                </div>
                <div className="flex items-center text-amber-500">
                  <StarIcon className="w-5 h-5 mr-1 fill-current" />
                  <span className="font-medium">{hotel.rating}</span>
                  <span className="text-sm text-surface-500 ml-2">(124 reviews)</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{formatCurrency(hotel.price)}</div>
                <div className="text-sm text-surface-500">per night</div>
              </div>
            </div>
            
            <p className="text-surface-600 dark:text-surface-300 mb-6">
              {hotelDetails.description}
            </p>

            <h3 className="text-lg font-semibold mb-3">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {hotelDetails.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center">
                  <amenity.icon className="w-5 h-5 text-primary mr-2" />
                  <span>{amenity.name}</span>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-semibold mb-3">Rooms</h3>
            <div className="space-y-3">
              {hotelDetails.rooms.map((room, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded-lg border-surface-200 dark:border-surface-700">
                  <div className="flex items-center">
                    <BedDoubleIcon className="w-5 h-5 text-primary mr-2" />
                    <div>
                      <div className="font-medium">{room.name}</div>
                      <div className="text-sm text-surface-500">Up to {room.capacity} guests</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{formatCurrency(room.price)}</div>
                    <div className="text-sm text-surface-500">per night</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Sidebar - 1/3 width on large screens */}
        <div className="lg:col-span-1">
          <div className="card sticky top-4">
            <h3 className="text-lg font-semibold mb-4">Book Your Stay</h3>
            
            <div className="space-y-4">
              <div className="input-group">
                <label className="input-label">Check-in Date</label>
                <input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} className="w-full" />
              </div>
              
              <div className="input-group">
                <label className="input-label">Check-out Date</label>
                <input type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} className="w-full" />
              </div>
              
              <div className="input-group">
                <label className="input-label">Guests</label>
                <select value={guests} onChange={(e) => setGuests(e.target.value)} className="w-full">
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                </select>
              </div>
              
              <div className="input-group">
                <label className="input-label">Room Type</label>
                <select value={roomType} onChange={(e) => setRoomType(e.target.value)} className="w-full">
                  {hotelDetails.rooms.map(room => (
                    <option key={room.type} value={room.type}>{room.name} - {formatCurrency(room.price)}</option>
                  ))}
                </select>
              </div>
              
              <div className="pt-4">
                <button 
                  onClick={handleBooking}
                  className="btn btn-primary w-full"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HotelDetail;