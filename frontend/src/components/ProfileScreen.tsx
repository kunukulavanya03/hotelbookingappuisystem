import { useState } from 'react';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { User as UserIcon, Mail, Phone, MapPin, Calendar, Save, Edit2 } from 'lucide-react';
import type { User } from '../App';

interface ProfileScreenProps {
  user: User;
  onLogout: () => void;
  onNavigate: (screen: string) => void;
}

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  dateJoined: string;
}

export function ProfileScreen({ user, onLogout, onNavigate }: ProfileScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [profileData, setProfileData] = useState<ProfileData>({
    name: user.name,
    email: user.email,
    phone: '+1 (555) 123-4567',
    address: '123 Main Street',
    city: 'New York, NY 10001',
    country: 'United States',
    dateJoined: '2024-01-15',
  });

  const [editedData, setEditedData] = useState<ProfileData>(profileData);

  const handleSave = () => {
    setProfileData(editedData);
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleCancel = () => {
    setEditedData(profileData);
    setIsEditing(false);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return '#7403BD';
      case 'hotel_manager': return '#416AE8';
      case 'receptionist': return '#7AF5B8';
      default: return '#6B7280';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} onNavigate={onNavigate} currentScreen="profile" />
      <Navigation currentScreen="profile" onNavigate={onNavigate} userRole={user.role} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-gray-900 mb-2">My Profile</h2>
            <p className="text-gray-600">Manage your account information</p>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white"
              style={{ backgroundColor: '#416AE8' }}
            >
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </button>
          )}
        </div>

        {showSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center justify-between">
            <span>Profile updated successfully!</span>
            <button onClick={() => setShowSuccess(false)}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}

        {/* Profile Header Card */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            <div className="flex items-center gap-6">
              <div 
                className="w-24 h-24 rounded-full flex items-center justify-center"
                style={{ backgroundColor: getRoleBadgeColor(user.role) }}
              >
                <UserIcon className="w-12 h-12 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 mb-2">{profileData.name}</h3>
                <p className="text-gray-600 mb-2">{profileData.email}</p>
                <span 
                  className="inline-block px-3 py-1 rounded-full text-white capitalize"
                  style={{ backgroundColor: getRoleBadgeColor(user.role) }}
                >
                  {user.role.replace('_', ' ')}
                </span>
              </div>
              <div className="text-right">
                <p className="text-gray-500">Member since</p>
                <p className="text-gray-900">{formatDate(profileData.dateJoined)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-gray-900">Personal Information</h3>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <UserIcon className="w-4 h-4" />
                    Full Name
                  </div>
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData.name}
                    onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#416AE8] focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.name}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </div>
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editedData.email}
                    onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#416AE8] focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.email}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </div>
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedData.phone}
                    onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#416AE8] focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Member Since
                  </div>
                </label>
                <p className="text-gray-900">{formatDate(profileData.dateJoined)}</p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Street Address
                  </div>
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData.address}
                    onChange={(e) => setEditedData({ ...editedData, address: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#416AE8] focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.address}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">City</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData.city}
                    onChange={(e) => setEditedData({ ...editedData, city: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#416AE8] focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.city}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Country</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData.country}
                    onChange={(e) => setEditedData({ ...editedData, country: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#416AE8] focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.country}</p>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="mt-6 pt-6 border-t border-gray-200 flex gap-3 justify-end">
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 rounded-lg text-white flex items-center gap-2"
                  style={{ backgroundColor: '#416AE8' }}
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Account Settings */}
        <div className="mt-6 bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-gray-900">Account Settings</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <button
                onClick={() => alert('Change password functionality')}
                className="w-full p-4 border border-gray-200 rounded-lg hover:border-[#416AE8] hover:bg-blue-50 transition-all text-left"
              >
                <div className="text-gray-900 mb-1">Change Password</div>
                <p className="text-gray-500">Update your account password</p>
              </button>

              <button
                onClick={() => alert('Email preferences functionality')}
                className="w-full p-4 border border-gray-200 rounded-lg hover:border-[#416AE8] hover:bg-blue-50 transition-all text-left"
              >
                <div className="text-gray-900 mb-1">Email Preferences</div>
                <p className="text-gray-500">Manage email notifications</p>
              </button>

              <button
                onClick={() => alert('Privacy settings functionality')}
                className="w-full p-4 border border-gray-200 rounded-lg hover:border-[#416AE8] hover:bg-blue-50 transition-all text-left"
              >
                <div className="text-gray-900 mb-1">Privacy Settings</div>
                <p className="text-gray-500">Control your data and privacy</p>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
