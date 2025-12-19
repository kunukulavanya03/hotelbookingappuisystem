import { useState } from 'react';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { Calendar, MapPin, Clock, Search } from 'lucide-react';
import type { User } from '../App';

interface GuestDashboardProps {
  user: User;
  onLogout: () => void;
  onNavigate: (screen: string) => void;
}

interface UpcomingBooking {
  id: string;
  hotelName: string;
  location: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  status: 'confirmed' | 'pending';
}

export function GuestDashboard({ user, onLogout, onNavigate }: GuestDashboardProps) {
  const [upcomingBookings] = useState<UpcomingBooking[]>([
    {
      id: '1',
      hotelName: 'Grand Plaza Hotel',
      location: 'New York, NY',
      checkIn: '2025-12-24',
      checkOut: '2025-12-26',
      roomType: 'Deluxe Suite',
      status: 'confirmed',
    },
    {
      id: '2',
      hotelName: 'Ocean View Resort',
      location: 'Miami, FL',
      checkIn: '2026-01-15',
      checkOut: '2026-01-20',
      roomType: 'Ocean Front Room',
      status: 'confirmed',
    },
  ]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getDaysUntil = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} onNavigate={onNavigate} currentScreen="dashboard" />
      <Navigation currentScreen="dashboard" onNavigate={onNavigate} userRole={user.role} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-gray-900 mb-2">Welcome back, {user.name}!</h2>
          <p className="text-gray-600">Manage your bookings and discover new destinations</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => onNavigate('search')}
            className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-transparent hover:border-[#416AE8]"
          >
            <Search className="w-8 h-8 mb-3" style={{ color: '#416AE8' }} />
            <h3 className="text-gray-900 mb-2">Search Hotels</h3>
            <p className="text-gray-600">Find your perfect stay</p>
          </button>

          <button
            onClick={() => onNavigate('bookings')}
            className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-transparent hover:border-[#416AE8]"
          >
            <Calendar className="w-8 h-8 mb-3" style={{ color: '#7403BD' }} />
            <h3 className="text-gray-900 mb-2">My Bookings</h3>
            <p className="text-gray-600">View all reservations</p>
          </button>

          <button
            onClick={() => onNavigate('profile')}
            className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-transparent hover:border-[#416AE8]"
          >
            <Clock className="w-8 h-8 mb-3" style={{ color: '#7AF5B8' }} />
            <h3 className="text-gray-900 mb-2">Profile</h3>
            <p className="text-gray-600">Manage your account</p>
          </button>
        </div>

        {/* Upcoming Bookings */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-gray-900">Upcoming Bookings</h3>
            <button
              onClick={() => onNavigate('bookings')}
              className="text-[#416AE8] hover:underline"
            >
              View All
            </button>
          </div>
          
          <div className="p-6">
            {upcomingBookings.length > 0 ? (
              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <div key={booking.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#416AE8] transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-gray-900 mb-1">{booking.hotelName}</h4>
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{booking.location}</span>
                        </div>
                      </div>
                      <span
                        className="px-3 py-1 rounded-full text-white capitalize"
                        style={{ backgroundColor: booking.status === 'confirmed' ? '#7AF5B8' : '#FFA500' }}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-gray-500">Check-in</p>
                        <p className="text-gray-900">{formatDate(booking.checkIn)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Check-out</p>
                        <p className="text-gray-900">{formatDate(booking.checkOut)}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <div>
                        <p className="text-gray-500">Room Type</p>
                        <p className="text-gray-900">{booking.roomType}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-500">Days until check-in</p>
                        <p className="text-[#416AE8]">{getDaysUntil(booking.checkIn)} days</p>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => onNavigate('bookings')}
                        className="flex-1 px-4 py-2 rounded-lg text-white"
                        style={{ backgroundColor: '#416AE8' }}
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => alert('Modify booking functionality')}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Modify
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 mb-4">No upcoming bookings</p>
                <button
                  onClick={() => onNavigate('search')}
                  className="px-6 py-2 rounded-lg text-white"
                  style={{ backgroundColor: '#416AE8' }}
                >
                  Search Hotels
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
