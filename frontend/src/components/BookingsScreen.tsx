import { useState } from 'react';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { Search, Filter, Calendar, MapPin, Eye, X, Edit, ChevronDown } from 'lucide-react';
import type { User } from '../App';

interface BookingsScreenProps {
  user: User;
  onLogout: () => void;
  onNavigate: (screen: string) => void;
}

type BookingStatus = 'active' | 'completed' | 'cancelled';

interface Booking {
  id: string;
  bookingNumber: string;
  hotelName: string;
  location: string;
  guestName: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  totalAmount: number;
  status: BookingStatus;
  guests: number;
}

export function BookingsScreen({ user, onLogout, onNavigate }: BookingsScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: '1',
      bookingNumber: 'BK-2025-001',
      hotelName: 'Grand Plaza Hotel',
      location: 'New York, NY',
      guestName: 'John Guest',
      roomType: 'Deluxe Suite',
      checkIn: '2025-12-24',
      checkOut: '2025-12-26',
      totalAmount: 599,
      status: 'active',
      guests: 2,
    },
    {
      id: '2',
      bookingNumber: 'BK-2025-002',
      hotelName: 'Ocean View Resort',
      location: 'Miami, FL',
      guestName: 'John Guest',
      roomType: 'Ocean Front Room',
      checkIn: '2026-01-15',
      checkOut: '2026-01-20',
      totalAmount: 1250,
      status: 'active',
      guests: 2,
    },
    {
      id: '3',
      bookingNumber: 'BK-2024-156',
      hotelName: 'Mountain Lodge',
      location: 'Aspen, CO',
      guestName: 'Sarah Johnson',
      roomType: 'Standard Room',
      checkIn: '2024-11-10',
      checkOut: '2024-11-15',
      totalAmount: 850,
      status: 'completed',
      guests: 4,
    },
    {
      id: '4',
      bookingNumber: 'BK-2024-198',
      hotelName: 'City Center Inn',
      location: 'Chicago, IL',
      guestName: 'Mike Wilson',
      roomType: 'Business Suite',
      checkIn: '2024-12-01',
      checkOut: '2024-12-03',
      totalAmount: 340,
      status: 'cancelled',
      guests: 1,
    },
  ]);

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.bookingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.hotelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.guestName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case 'active': return '#7AF5B8';
      case 'completed': return '#416AE8';
      case 'cancelled': return '#EF4444';
    }
  };

  const getStatusCount = (status: BookingStatus | 'all') => {
    if (status === 'all') return bookings.length;
    return bookings.filter((b) => b.status === status).length;
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookingToCancel(bookingId);
    setShowCancelConfirm(true);
  };

  const confirmCancelBooking = () => {
    if (bookingToCancel) {
      setBookings(bookings.map((b) =>
        b.id === bookingToCancel ? { ...b, status: 'cancelled' as BookingStatus } : b
      ));
      setShowCancelConfirm(false);
      setBookingToCancel(null);
      setSelectedBooking(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} onNavigate={onNavigate} currentScreen="bookings" />
      <Navigation currentScreen="bookings" onNavigate={onNavigate} userRole={user.role} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-gray-900 mb-2">Bookings Management</h2>
          <p className="text-gray-600">View and manage all hotel reservations</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by booking number, hotel, or guest name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#416AE8] focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Filter Dropdown */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="text-gray-900 mb-3">Status Filter</h4>
              <div className="flex flex-wrap gap-2">
                {(['all', 'active', 'completed', 'cancelled'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                      statusFilter === status
                        ? 'bg-[#416AE8] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {status} ({getStatusCount(status)})
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Status Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-gray-500 mb-1">Total Bookings</div>
            <div className="text-gray-900">{getStatusCount('all')}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-gray-500 mb-1">Active</div>
            <div className="text-gray-900">{getStatusCount('active')}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-gray-500 mb-1">Completed</div>
            <div className="text-gray-900">{getStatusCount('completed')}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-gray-500 mb-1">Cancelled</div>
            <div className="text-gray-900">{getStatusCount('cancelled')}</div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-700">Booking #</th>
                  <th className="px-6 py-3 text-left text-gray-700">Hotel</th>
                  <th className="px-6 py-3 text-left text-gray-700">Guest</th>
                  <th className="px-6 py-3 text-left text-gray-700">Check-in</th>
                  <th className="px-6 py-3 text-left text-gray-700">Check-out</th>
                  <th className="px-6 py-3 text-left text-gray-700">Amount</th>
                  <th className="px-6 py-3 text-left text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">{booking.bookingNumber}</td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">{booking.hotelName}</div>
                      <div className="text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {booking.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{booking.guestName}</td>
                    <td className="px-6 py-4 text-gray-900">{formatDate(booking.checkIn)}</td>
                    <td className="px-6 py-4 text-gray-900">{formatDate(booking.checkOut)}</td>
                    <td className="px-6 py-4 text-gray-900">${booking.totalAmount}</td>
                    <td className="px-6 py-4">
                      <span
                        className="px-3 py-1 rounded-full text-white capitalize"
                        style={{ backgroundColor: getStatusColor(booking.status) }}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="p-2 hover:bg-gray-100 rounded transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4 text-[#416AE8]" />
                        </button>
                        {booking.status === 'active' && (
                          <>
                            <button
                              onClick={() => alert('Modify booking functionality')}
                              className="p-2 hover:bg-gray-100 rounded transition-colors"
                              title="Modify"
                            >
                              <Edit className="w-4 h-4 text-gray-600" />
                            </button>
                            <button
                              onClick={() => handleCancelBooking(booking.id)}
                              className="p-2 hover:bg-gray-100 rounded transition-colors"
                              title="Cancel"
                            >
                              <X className="w-4 h-4 text-red-600" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredBookings.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">No bookings found</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-gray-900">Booking Details</h3>
              <button
                onClick={() => setSelectedBooking(null)}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-gray-500 mb-1">Booking Number</p>
                  <p className="text-gray-900">{selectedBooking.bookingNumber}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Status</p>
                  <span
                    className="inline-block px-3 py-1 rounded-full text-white capitalize"
                    style={{ backgroundColor: getStatusColor(selectedBooking.status) }}
                  >
                    {selectedBooking.status}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6 mb-6">
                <h4 className="text-gray-900 mb-4">Hotel Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 mb-1">Hotel Name</p>
                    <p className="text-gray-900">{selectedBooking.hotelName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Location</p>
                    <p className="text-gray-900">{selectedBooking.location}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Room Type</p>
                    <p className="text-gray-900">{selectedBooking.roomType}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Number of Guests</p>
                    <p className="text-gray-900">{selectedBooking.guests}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6 mb-6">
                <h4 className="text-gray-900 mb-4">Stay Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 mb-1">Check-in</p>
                    <p className="text-gray-900">{formatDate(selectedBooking.checkIn)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Check-out</p>
                    <p className="text-gray-900">{formatDate(selectedBooking.checkOut)}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6 mb-6">
                <h4 className="text-gray-900 mb-4">Guest Information</h4>
                <div>
                  <p className="text-gray-500 mb-1">Guest Name</p>
                  <p className="text-gray-900">{selectedBooking.guestName}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-gray-900">Total Amount</h4>
                  <div className="text-gray-900">${selectedBooking.totalAmount}</div>
                </div>

                <div className="flex gap-3">
                  {selectedBooking.status === 'active' && (
                    <>
                      <button
                        onClick={() => alert('Modify booking functionality')}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Modify Booking
                      </button>
                      <button
                        onClick={() => {
                          handleCancelBooking(selectedBooking.id);
                        }}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        Cancel Booking
                      </button>
                    </>
                  )}
                  {selectedBooking.status === 'completed' && (
                    <button
                      onClick={() => alert('Review functionality')}
                      className="flex-1 px-4 py-2 rounded-lg text-white"
                      style={{ backgroundColor: '#416AE8' }}
                    >
                      Write a Review
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-gray-900 mb-2">Cancel Booking</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel this booking? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowCancelConfirm(false);
                  setBookingToCancel(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Keep Booking
              </button>
              <button
                onClick={confirmCancelBooking}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Yes, Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
