import { useState } from 'react';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { Plus, Search, Edit, Trash2, Eye, MapPin, Star, DollarSign, Bed } from 'lucide-react';
import type { User } from '../App';

interface HotelManagementProps {
  user: User;
  onLogout: () => void;
  onNavigate: (screen: string) => void;
}

interface Room {
  id: string;
  type: string;
  price: number;
  available: number;
  total: number;
}

interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  rooms: Room[];
  amenities: string[];
  description: string;
  image: string;
}

export function HotelManagement({ user, onLogout, onNavigate }: HotelManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [showAddHotel, setShowAddHotel] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [hotelToDelete, setHotelToDelete] = useState<string | null>(null);

  const [hotels, setHotels] = useState<Hotel[]>([
    {
      id: '1',
      name: 'Grand Plaza Hotel',
      location: 'New York, NY',
      rating: 4.5,
      rooms: [
        { id: 'r1', type: 'Standard Room', price: 150, available: 8, total: 20 },
        { id: 'r2', type: 'Deluxe Suite', price: 299, available: 3, total: 10 },
        { id: 'r3', type: 'Presidential Suite', price: 599, available: 1, total: 2 },
      ],
      amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Spa'],
      description: 'Luxury hotel in the heart of Manhattan',
      image: 'hotel-1',
    },
    {
      id: '2',
      name: 'Ocean View Resort',
      location: 'Miami, FL',
      rating: 4.8,
      rooms: [
        { id: 'r4', type: 'Ocean View Room', price: 200, available: 12, total: 30 },
        { id: 'r5', type: 'Beach Front Suite', price: 350, available: 5, total: 15 },
      ],
      amenities: ['WiFi', 'Beach Access', 'Pool', 'Restaurant', 'Bar'],
      description: 'Beachfront paradise with stunning ocean views',
      image: 'hotel-2',
    },
    {
      id: '3',
      name: 'Mountain Lodge',
      location: 'Aspen, CO',
      rating: 4.3,
      rooms: [
        { id: 'r6', type: 'Standard Room', price: 120, available: 15, total: 40 },
        { id: 'r7', type: 'Mountain View Suite', price: 250, available: 6, total: 20 },
      ],
      amenities: ['WiFi', 'Ski Access', 'Fireplace', 'Restaurant'],
      description: 'Cozy mountain retreat with ski-in/ski-out access',
      image: 'hotel-3',
    },
  ]);

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteHotel = (hotelId: string) => {
    setHotelToDelete(hotelId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (hotelToDelete) {
      setHotels(hotels.filter((h) => h.id !== hotelToDelete));
      setShowDeleteConfirm(false);
      setHotelToDelete(null);
      setSelectedHotel(null);
    }
  };

  const getTotalRooms = (hotel: Hotel) => {
    return hotel.rooms.reduce((sum, room) => sum + room.total, 0);
  };

  const getAvailableRooms = (hotel: Hotel) => {
    return hotel.rooms.reduce((sum, room) => sum + room.available, 0);
  };

  const getOccupancyRate = (hotel: Hotel) => {
    const total = getTotalRooms(hotel);
    const available = getAvailableRooms(hotel);
    return Math.round(((total - available) / total) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} onNavigate={onNavigate} currentScreen="hotels" />
      <Navigation currentScreen="hotels" onNavigate={onNavigate} userRole={user.role} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-gray-900 mb-2">Hotel Management</h2>
            <p className="text-gray-600">Manage hotels, rooms, and pricing</p>
          </div>
          <button
            onClick={() => setShowAddHotel(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white"
            style={{ backgroundColor: '#416AE8' }}
          >
            <Plus className="w-4 h-4" />
            Add Hotel
          </button>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search hotels by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#416AE8] focus:border-transparent"
            />
          </div>
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredHotels.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-gray-900 mb-2">{hotel.name}</h3>
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {hotel.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-current text-yellow-400" />
                        {hotel.rating}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{hotel.description}</p>

                {/* Room Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-gray-500 mb-1">Total Rooms</p>
                    <div className="text-gray-900">{getTotalRooms(hotel)}</div>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Available</p>
                    <div className="text-green-600">{getAvailableRooms(hotel)}</div>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Occupancy</p>
                    <div className="text-gray-900">{getOccupancyRate(hotel)}%</div>
                  </div>
                </div>

                {/* Room Types */}
                <div className="mb-4">
                  <h4 className="text-gray-700 mb-2">Room Types</h4>
                  <div className="space-y-2">
                    {hotel.rooms.map((room) => (
                      <div key={room.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center gap-2">
                          <Bed className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-900">{room.type}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-gray-600">{room.available}/{room.total} available</span>
                          <span className="text-[#416AE8]">${room.price}/night</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-4">
                  <h4 className="text-gray-700 mb-2">Amenities</h4>
                  <div className="flex flex-wrap gap-2">
                    {hotel.amenities.map((amenity, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-[#416AE8] rounded text-sm"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedHotel(hotel)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  <button
                    onClick={() => alert('Edit hotel functionality')}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteHotel(hotel.id)}
                    className="px-4 py-2 border border-red-300 rounded-lg hover:bg-red-50 text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredHotels.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <Search className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">No hotels found</p>
          </div>
        )}
      </main>

      {/* Hotel Details Modal */}
      {selectedHotel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-gray-900">Hotel Details</h3>
              <button
                onClick={() => setSelectedHotel(null)}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-gray-900 mb-2">{selectedHotel.name}</h2>
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {selectedHotel.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current text-yellow-400" />
                    {selectedHotel.rating} / 5.0
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-gray-900 mb-2">Description</h4>
                <p className="text-gray-600">{selectedHotel.description}</p>
              </div>

              <div className="mb-6">
                <h4 className="text-gray-900 mb-3">Room Details & Pricing</h4>
                <div className="space-y-3">
                  {selectedHotel.rooms.map((room) => (
                    <div key={room.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="text-gray-900">{room.type}</h5>
                        <div className="text-[#416AE8]">${room.price}/night</div>
                      </div>
                      <div className="flex items-center gap-6 text-gray-600">
                        <span>Total Rooms: {room.total}</span>
                        <span className="text-green-600">Available: {room.available}</span>
                        <span>Occupied: {room.total - room.available}</span>
                      </div>
                      <div className="mt-2">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#416AE8]"
                            style={{ width: `${((room.total - room.available) / room.total) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className="mt-2 flex gap-2">
                        <button
                          onClick={() => alert('Edit room pricing functionality')}
                          className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
                        >
                          <DollarSign className="w-4 h-4 inline mr-1" />
                          Edit Pricing
                        </button>
                        <button
                          onClick={() => alert('Update availability functionality')}
                          className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
                        >
                          Update Availability
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-gray-900 mb-3">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedHotel.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-[#416AE8] rounded"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => alert('Edit hotel functionality')}
                  className="flex-1 px-4 py-2 rounded-lg text-white"
                  style={{ backgroundColor: '#416AE8' }}
                >
                  Edit Hotel
                </button>
                <button
                  onClick={() => {
                    handleDeleteHotel(selectedHotel.id);
                  }}
                  className="px-4 py-2 border border-red-300 rounded-lg hover:bg-red-50 text-red-600"
                >
                  Delete Hotel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Hotel Modal */}
      {showAddHotel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-gray-900">Add New Hotel</h3>
              <button
                onClick={() => setShowAddHotel(false)}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                This feature allows you to add new hotels to the system. In a full implementation,
                this would include forms for hotel details, room configurations, amenities, and pricing.
              </p>
              <button
                onClick={() => {
                  alert('Add hotel form functionality would go here');
                  setShowAddHotel(false);
                }}
                className="w-full px-4 py-2 rounded-lg text-white"
                style={{ backgroundColor: '#416AE8' }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-gray-900 mb-2">Delete Hotel</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this hotel? This action cannot be undone and will remove all associated room data.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setHotelToDelete(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete Hotel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
