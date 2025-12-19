import { useState, useEffect } from 'react';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { Users, Hotel, Calendar, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import type { User } from '../App';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
  onNavigate: (screen: string) => void;
}

interface DashboardStats {
  totalUsers: number;
  totalHotels: number;
  activeBookings: number;
  revenue: number;
  userChange: number;
  hotelChange: number;
  bookingChange: number;
  revenueChange: number;
}

interface RecentActivity {
  id: string;
  type: 'booking' | 'user' | 'hotel';
  message: string;
  timestamp: string;
}

export function AdminDashboard({ user, onLogout, onNavigate }: AdminDashboardProps) {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 1284,
    totalHotels: 156,
    activeBookings: 423,
    revenue: 125840,
    userChange: 12.5,
    hotelChange: 8.3,
    bookingChange: -3.2,
    revenueChange: 15.7,
  });

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'booking',
      message: 'New booking at Grand Plaza Hotel',
      timestamp: '5 minutes ago',
    },
    {
      id: '2',
      type: 'user',
      message: 'New user registered: Sarah Johnson',
      timestamp: '12 minutes ago',
    },
    {
      id: '3',
      type: 'hotel',
      message: 'Ocean View Resort updated pricing',
      timestamp: '1 hour ago',
    },
    {
      id: '4',
      type: 'booking',
      message: 'Booking cancelled at City Center Inn',
      timestamp: '2 hours ago',
    },
  ]);

  const StatCard = ({ 
    title, 
    value, 
    change, 
    icon: Icon, 
    color 
  }: { 
    title: string; 
    value: string | number; 
    change: number; 
    icon: any; 
    color: string;
  }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: color + '20' }}>
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
        <div className={`flex items-center gap-1 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>
      <h3 className="text-gray-500 mb-1">{title}</h3>
      <div className="text-gray-900">{value}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} onNavigate={onNavigate} currentScreen="dashboard" />
      <Navigation currentScreen="dashboard" onNavigate={onNavigate} userRole={user.role} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-gray-900 mb-2">Admin Dashboard</h2>
          <p className="text-gray-600">Welcome back, {user.name}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={stats.totalUsers.toLocaleString()}
            change={stats.userChange}
            icon={Users}
            color="#416AE8"
          />
          <StatCard
            title="Total Hotels"
            value={stats.totalHotels}
            change={stats.hotelChange}
            icon={Hotel}
            color="#7403BD"
          />
          <StatCard
            title="Active Bookings"
            value={stats.activeBookings}
            change={stats.bookingChange}
            icon={Calendar}
            color="#7AF5B8"
          />
          <StatCard
            title="Revenue"
            value={`$${(stats.revenue / 1000).toFixed(1)}k`}
            change={stats.revenueChange}
            icon={DollarSign}
            color="#416AE8"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-gray-900">Recent Activity</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div 
                      className="w-2 h-2 rounded-full mt-2"
                      style={{ 
                        backgroundColor: activity.type === 'booking' ? '#416AE8' : 
                                       activity.type === 'user' ? '#7AF5B8' : '#7403BD' 
                      }}
                    />
                    <div className="flex-1">
                      <p className="text-gray-900">{activity.message}</p>
                      <p className="text-gray-500">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-3">
                <button
                  onClick={() => onNavigate('hotels')}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-[#416AE8] hover:bg-blue-50 transition-all text-left"
                >
                  <Hotel className="w-5 h-5 mb-2" style={{ color: '#416AE8' }} />
                  <div className="text-gray-900">Manage Hotels</div>
                  <p className="text-gray-500">Add or update hotel listings</p>
                </button>
                
                <button
                  onClick={() => onNavigate('bookings')}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-[#416AE8] hover:bg-blue-50 transition-all text-left"
                >
                  <Calendar className="w-5 h-5 mb-2" style={{ color: '#7403BD' }} />
                  <div className="text-gray-900">View All Bookings</div>
                  <p className="text-gray-500">Manage and track bookings</p>
                </button>
                
                <button
                  onClick={() => alert('User management feature coming soon!')}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-[#416AE8] hover:bg-blue-50 transition-all text-left"
                >
                  <Users className="w-5 h-5 mb-2" style={{ color: '#7AF5B8' }} />
                  <div className="text-gray-900">User Management</div>
                  <p className="text-gray-500">Manage system users</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
