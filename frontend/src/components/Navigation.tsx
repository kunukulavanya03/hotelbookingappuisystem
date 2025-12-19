import { LayoutDashboard, Calendar, Hotel, Search, User } from 'lucide-react';
import type { UserRole } from '../App';

interface NavigationProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
  userRole: UserRole;
}

export function Navigation({ currentScreen, onNavigate, userRole }: NavigationProps) {
  const getNavItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'bookings', label: 'Bookings', icon: Calendar },
    ];

    if (userRole === 'admin' || userRole === 'hotel_manager') {
      baseItems.push({ id: 'hotels', label: 'Hotels', icon: Hotel });
    }

    if (userRole === 'guest' || userRole === 'receptionist') {
      baseItems.push({ id: 'search', label: 'Search Hotels', icon: Search });
    }

    baseItems.push({ id: 'profile', label: 'Profile', icon: User });

    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-1 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'border-[#416AE8] text-[#416AE8]'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
