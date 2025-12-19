import { useState } from 'react';
import { Hotel, Lock, Mail } from 'lucide-react';
import type { User, UserRole } from '../App';

interface LoginProps {
  onLogin: (user: User) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('guest');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock users for demo
  const mockUsers = {
    'admin@hotel.com': { id: '1', name: 'Admin User', role: 'admin' as UserRole },
    'manager@hotel.com': { id: '2', name: 'Hotel Manager', role: 'hotel_manager' as UserRole },
    'receptionist@hotel.com': { id: '3', name: 'Receptionist', role: 'receptionist' as UserRole },
    'guest@hotel.com': { id: '4', name: 'John Guest', role: 'guest' as UserRole },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        const mockUser = mockUsers[email as keyof typeof mockUsers];
        if (mockUser && password === 'password') {
          onLogin({
            id: mockUser.id,
            name: mockUser.name,
            email: email,
            role: mockUser.role,
          });
        } else {
          setError('Invalid email or password');
        }
      } else {
        setError('Please fill in all fields');
      }
      setIsLoading(false);
    }, 500);
  };

  const quickLogin = (role: UserRole) => {
    const userEmails = {
      admin: 'admin@hotel.com',
      hotel_manager: 'manager@hotel.com',
      receptionist: 'receptionist@hotel.com',
      guest: 'guest@hotel.com',
    };
    
    const email = userEmails[role];
    const mockUser = mockUsers[email as keyof typeof mockUsers];
    
    onLogin({
      id: mockUser.id,
      name: mockUser.name,
      email: email,
      role: mockUser.role,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #416AE8 0%, #7403BD 100%)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#416AE8' }}>
            <Hotel className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-gray-900 mb-2">Hotel Booking System</h1>
          <p className="text-gray-600">Sign in to manage your bookings</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#416AE8] focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#416AE8] focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-lg text-white transition-all disabled:opacity-50"
            style={{ backgroundColor: '#416AE8' }}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white text-gray-500">Quick Login (Demo)</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              onClick={() => quickLogin('admin')}
              className="py-2 px-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Admin
            </button>
            <button
              onClick={() => quickLogin('hotel_manager')}
              className="py-2 px-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Manager
            </button>
            <button
              onClick={() => quickLogin('receptionist')}
              className="py-2 px-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Receptionist
            </button>
            <button
              onClick={() => quickLogin('guest')}
              className="py-2 px-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Guest
            </button>
          </div>

          <p className="mt-4 text-center text-gray-600">
            Demo: Use any email above with password: <strong>password</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
