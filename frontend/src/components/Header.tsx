import { useState, useRef, useEffect } from 'react';
import { Hotel, User as UserIcon, Settings, LogOut, ChevronDown } from 'lucide-react';
import type { User } from '../App';

interface HeaderProps {
  user: User;
  onLogout: () => void;
  onNavigate: (screen: string) => void;
  currentScreen: string;
}

export function Header({ user, onLogout, onNavigate, currentScreen }: HeaderProps) {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
    setShowProfileDropdown(false);
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    onLogout();
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return '#7403BD';
      case 'hotel_manager': return '#416AE8';
      case 'receptionist': return '#7AF5B8';
      default: return '#6B7280';
    }
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#416AE8' }}>
                <Hotel className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-gray-900">Hotel Booking</h1>
                <p className="text-gray-500">Management System</p>
              </div>
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="text-right">
                  <div className="text-gray-900">{user.name}</div>
                  <div className="text-gray-500 capitalize">{user.role.replace('_', ' ')}</div>
                </div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: getRoleBadgeColor(user.role) }}>
                  <UserIcon className="w-5 h-5 text-white" />
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showProfileDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <div className="text-gray-900">{user.name}</div>
                    <div className="text-gray-500">{user.email}</div>
                    <div className="mt-2">
                      <span 
                        className="inline-block px-2 py-1 rounded text-white text-sm capitalize"
                        style={{ backgroundColor: getRoleBadgeColor(user.role) }}
                      >
                        {user.role.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      onNavigate('profile');
                      setShowProfileDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors text-gray-700"
                  >
                    <UserIcon className="w-4 h-4" />
                    My Profile
                  </button>
                  
                  <button
                    onClick={() => {
                      onNavigate('profile');
                      setShowProfileDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors text-gray-700"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                  
                  <div className="border-t border-gray-200 my-2"></div>
                  
                  <button
                    onClick={handleLogoutClick}
                    className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-red-50 transition-colors text-red-600"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-gray-900 mb-2">Confirm Sign Out</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to sign out?</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
