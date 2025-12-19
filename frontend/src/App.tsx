import { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { AdminDashboard } from './components/AdminDashboard';
import { GuestDashboard } from './components/GuestDashboard';
import { BookingsScreen } from './components/BookingsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { HotelManagement } from './components/HotelManagement';
import { SearchHotels } from './components/SearchHotels';

export type UserRole = 'admin' | 'hotel_manager' | 'receptionist' | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentScreen, setCurrentScreen] = useState<string>('login');

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setCurrentScreen('dashboard');
    }
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setCurrentScreen('login');
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen);
  };

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {currentScreen === 'dashboard' && (
        currentUser.role === 'admin' || currentUser.role === 'hotel_manager' ? (
          <AdminDashboard 
            user={currentUser} 
            onLogout={handleLogout}
            onNavigate={handleNavigate}
          />
        ) : (
          <GuestDashboard 
            user={currentUser} 
            onLogout={handleLogout}
            onNavigate={handleNavigate}
          />
        )
      )}
      {currentScreen === 'bookings' && (
        <BookingsScreen 
          user={currentUser} 
          onLogout={handleLogout}
          onNavigate={handleNavigate}
        />
      )}
      {currentScreen === 'profile' && (
        <ProfileScreen 
          user={currentUser} 
          onLogout={handleLogout}
          onNavigate={handleNavigate}
        />
      )}
      {currentScreen === 'hotels' && (
        <HotelManagement 
          user={currentUser} 
          onLogout={handleLogout}
          onNavigate={handleNavigate}
        />
      )}
      {currentScreen === 'search' && (
        <SearchHotels 
          user={currentUser} 
          onLogout={handleLogout}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}
