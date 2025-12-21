import { useState } from 'react';
import { X, Upload, Camera, User, Mail, MapPin, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';

interface UserProfile {
  name: string;
  bio: string;
  interests: string[];
  location: string;
  joinDate: string;
}

interface EditProfileProps {
  onClose: () => void;
  currentProfile: UserProfile;
  onProfileUpdate: (profile: UserProfile) => void;
}

const availableInterests = [
  'Football', 'Cricket', 'Basketball', 'Badminton', 'Tennis',
  'Weekend Player', 'Competitive', 'Casual', 'Team Captain',
  'Coach', 'Beginner Friendly', 'Early Morning', 'Evening Games'
];

export function EditProfile({ onClose, currentProfile, onProfileUpdate }: EditProfileProps) {
  const [name, setName] = useState(currentProfile.name);
  const [bio, setBio] = useState(currentProfile.bio);
  const [location, setLocation] = useState(currentProfile.location);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(currentProfile.interests);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const updatedProfile: UserProfile = {
      name,
      bio,
      interests: selectedInterests,
      location,
      joinDate: currentProfile.joinDate,
    };
    
    onProfileUpdate(updatedProfile);
    
    toast.success('Profile updated successfully! 🎉', {
      description: 'Your changes have been saved and are now visible.',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto my-8">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 z-10 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="mb-1">Edit Your Profile</h2>
              <p className="text-slate-600">Update your information and preferences</p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Profile Picture */}
          <div>
            <label className="block text-sm mb-3">Profile Picture</label>
            <div className="flex items-center gap-6">
              <div className="relative">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-emerald-400 rounded-full flex items-center justify-center text-white shadow-lg">
                    <span className="text-2xl">
                      {name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <label className="absolute bottom-0 right-0 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-cyan-600 transition-colors shadow-md">
                  <Camera className="w-4 h-4 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <div>
                <p className="text-sm text-slate-700 mb-1">Upload a profile picture</p>
                <p className="text-xs text-slate-500">
                  JPG, PNG or GIF. Max size 5MB
                </p>
                <label className="inline-block mt-2">
                  <Button variant="outline" size="sm" className="gap-2 cursor-pointer" asChild>
                    <span>
                      <Upload className="w-4 h-4" />
                      Choose File
                    </span>
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm mb-2">Full Name *</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="pl-10"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm mb-2">Location</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, State"
                className="pl-10"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm mb-2">Bio</label>
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself and your sports journey..."
              rows={4}
              maxLength={300}
              className="resize-none"
            />
            <p className="text-xs text-slate-500 mt-1">
              {bio.length}/300 characters
            </p>
          </div>

          {/* Interests & Tags */}
          <div>
            <label className="block text-sm mb-3">
              Interests & Playing Style
            </label>
            <p className="text-xs text-slate-600 mb-3">
              Select tags that describe your sports interests and playing preferences
            </p>
            <div className="flex flex-wrap gap-2">
              {availableInterests.map(interest => (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-all border-2 ${
                    selectedInterests.includes(interest)
                      ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white border-transparent'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
            {selectedInterests.length > 0 && (
              <div className="mt-3 p-3 bg-cyan-50 rounded-lg">
                <p className="text-sm text-cyan-700">
                  {selectedInterests.length} tag{selectedInterests.length > 1 ? 's' : ''} selected
                </p>
              </div>
            )}
          </div>

          {/* Member Since */}
          <div>
            <label className="block text-sm mb-2">Member Since</label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                value={currentProfile.joinDate}
                disabled
                className="pl-10 bg-slate-50"
              />
            </div>
          </div>

          {/* Emotional Safety Note */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                ✨
              </div>
              <div>
                <h3 className="text-purple-900 mb-1">Your Profile, Your Story</h3>
                <p className="text-sm text-purple-700">
                  We believe in authentic connections. Share what feels comfortable and represents 
                  the real you. Your profile helps others understand how to best connect with you!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t p-6 rounded-b-2xl">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!name.trim()}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}