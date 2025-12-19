import { useState } from 'react';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { Search, MapPin, Star, Users, Calendar, Bed, Wifi, Coffee, Dumbbell, UtensilsCrossed, Waves } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { User } from '../App';

interface SearchHotelsProps {
  user: User;
  onLogout: () => void;
  onNavigate: (screen: string) => void;
}

interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  pricePerNight: number;
  image: string;
  amenities: string[];
  availableRooms: number;
  description: string;
}

const amenityIcons: Record<string, any> = {
  'WiFi': Wifi,
  'Pool': Waves,
  'Gym': Dumbbell,
  'Restaurant': UtensilsCrossed,
  'Breakfast': Coffee,
  'Beach Access': Waves,
  'Spa': Coffee,
  'Bar': Coffee,
};

export function SearchHotels({ user, onLogout, onNavigate }: SearchHotelsProps) {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const [hotels] = useState<Hotel[]>([
    {
      id: '1',
      name: 'Grand Plaza Hotel',
      location: 'New York, NY',
      rating: 4.5,
      reviews: 328,
      pricePerNight: 299,
      image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGxvYmJ5fGVufDF8fHx8MTc2NjEzMTM1NXww&ixlib=rb-4.1.0&q=80&w=1080',
      amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Spa'],
      availableRooms: 12,
      description: 'Experience luxury in the heart of Manhattan with stunning city views.',
    },
    {
      id: '2',
      name: 'Ocean View Resort',
      location: 'Miami, FL',
      rating: 4.8,
      reviews: 512,
      pricePerNight: 350,
      image: 'https://images.unsplash.com/photo-1552873547-b88e7b2760e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHJlc29ydCUyMG9jZWFufGVufDF8fHx8MTc2NjEzODAxNXww&ixlib=rb-4.1.0&q=80&w=1080',
      amenities: ['WiFi', 'Beach Access', 'Pool', 'Restaurant', 'Bar'],
      availableRooms: 8,
      description: 'Beachfront paradise with pristine white sand and crystal-clear waters.',
    },
    {
      id: '3',
      name: 'Mountain Lodge',
      location: 'Aspen, CO',
      rating: 4.3,
      reviews: 201,
      pricePerNight: 250,
      image: 'https://images.unsplash.com/photo-1559373098-e5b9a9f79d7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxvZGdlJTIwaG90ZWx8ZW58MXx8fHwxNzY2MDUxMjY3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      amenities: ['WiFi', 'Gym', 'Restaurant', 'Spa'],
      availableRooms: 15,
      description: 'Cozy mountain retreat with ski-in/ski-out access and breathtaking views.',
    },
    {
      id: '4',
      name: 'City Center Inn',
      location: 'Chicago, IL',
      rating: 4.1,
      reviews: 156,
      pricePerNight: 180,
      image: 'https://images.unsplash.com/photo-1544546229-46cb6e8e94cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwaG90ZWwlMjByb29tfGVufDF8fHx8MTc2NjEzODAxNXww&ixlib=rb-4.1.0&q=80&w=1080',
      amenities: ['WiFi', 'Gym', 'Restaurant', 'Breakfast'],
      availableRooms: 20,
      description: 'Modern comfort in downtown Chicago, perfect for business and leisure.',
    },
  ]);

  const [searchResults, setSearchResults] = useState<Hotel[]>(hotels);

  const handleSearch = () => {
    let filtered = hotels;

    if (location) {
      filtered = filtered.filter((hotel) =>
        hotel.location.toLowerCase().includes(location.toLowerCase()) ||
        hotel.name.toLowerCase().includes(location.toLowerCase())
      );
    }

    setSearchResults(filtered);
  };

  const handleBookNow = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setShowBookingForm(true);
  };

  const handleConfirmBooking = () => {
    alert(`Booking confirmed for ${selectedHotel?.name}!\n\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nGuests: ${guests}\n\nTotal: $${calculateTotal()}`);
    setShowBookingForm(false);
    setSelectedHotel(null);
  };

  const calculateTotal = () => {
    if (!selectedHotel || !checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return selectedHotel.pricePerNight * nights;
  };

  const getNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} onNavigate={onNavigate} currentScreen="search" />
      <Navigation currentScreen="search" onNavigate={onNavigate} userRole={user.role} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-gray-900 mb-2">Search Hotels</h2>
          <p className="text-gray-600">Find your perfect stay from our curated selection</p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <label className="block text-gray-700 mb-2">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#416AE8] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Check-in</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#416AE8] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Check-out</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  min={checkIn || new Date().toISOString().split('T')[0]}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#416AE8] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Guests</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#416AE8] focus:border-transparent appearance-none"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={handleSearch}
            className="mt-4 w-full md:w-auto px-8 py-2 rounded-lg text-white flex items-center justify-center gap-2"
            style={{ backgroundColor: '#416AE8' }}
          >
            <Search className="w-4 h-4" />
            Search Hotels
          </button>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <h3 className="text-gray-900">{searchResults.length} Hotels Found</h3>
        </div>

        {/* Hotel Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {searchResults.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative h-48">
                <ImageWithFallback
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-lg">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current text-yellow-400" />
                    <span className="text-gray-900">{hotel.rating}</span>
                    <span className="text-gray-500">({hotel.reviews})</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-gray-900 mb-2">{hotel.name}</h3>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {hotel.location}
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{hotel.description}</p>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {hotel.amenities.map((amenity, index) => {
                    const Icon = amenityIcons[amenity] || Coffee;
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-gray-700"
                      >
                        <Icon className="w-3 h-3" />
                        <span className="text-sm">{amenity}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Availability */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Bed className="w-4 h-4" />
                    <span>{hotel.availableRooms} rooms available</span>
                  </div>
                  {hotel.availableRooms <= 5 && (
                    <span className="text-orange-600">Only {hotel.availableRooms} left!</span>
                  )}
                </div>

                {/* Price and Booking */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-gray-500">From</div>
                    <div className="text-gray-900">
                      ${hotel.pricePerNight}
                      <span className="text-gray-500">/night</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleBookNow(hotel)}
                    className="px-6 py-2 rounded-lg text-white"
                    style={{ backgroundColor: '#416AE8' }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {searchResults.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <Search className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-gray-900 mb-2">No hotels found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </main>

      {/* Booking Modal */}
      {showBookingForm && selectedHotel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-gray-900">Complete Your Booking</h3>
              <button
                onClick={() => {
                  setShowBookingForm(false);
                  setSelectedHotel(null);
                }}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              {/* Hotel Summary */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-gray-900 mb-2">{selectedHotel.name}</h4>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <MapPin className="w-4 h-4" />
                  {selectedHotel.location}
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-current text-yellow-400" />
                  <span className="text-gray-900">{selectedHotel.rating}</span>
                  <span className="text-gray-500">({selectedHotel.reviews} reviews)</span>
                </div>
              </div>

              {/* Booking Details */}
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Check-in</label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#416AE8] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Check-out</label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      min={checkIn || new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#416AE8] focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Number of Guests</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#416AE8] focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price Summary */}
              {checkIn && checkOut && (
                <div className="border-t border-gray-200 pt-6 mb-6">
                  <h4 className="text-gray-900 mb-4">Price Summary</h4>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-gray-600">
                      <span>${selectedHotel.pricePerNight} × {getNights()} nights</span>
                      <span>${selectedHotel.pricePerNight * getNights()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Service fee</span>
                      <span>$25</span>
                    </div>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-gray-200">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">${calculateTotal() + 25}</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowBookingForm(false);
                    setSelectedHotel(null);
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmBooking}
                  disabled={!checkIn || !checkOut}
                  className="flex-1 px-4 py-3 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#416AE8' }}
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
