import React, { useState } from 'react';
import { Camera, Upload, Paintbrush, Check, X } from 'lucide-react';

interface AvatarOption {
  id: string;
  name: string;
  imageUrl: string;
}

const presetAvatars: AvatarOption[] = [
  {
    id: 'avatar1',
    name: 'Tech Specialist',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 'avatar2',
    name: 'AI Expert',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 'avatar3',
    name: 'Data Analyst',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200'
  }
];

interface AvatarCustomizerProps {
  onClose: () => void;
  onSelectAvatar: (avatarUrl: string) => void;
}

export function AvatarCustomizer({ onClose, onSelectAvatar }: AvatarCustomizerProps) {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'preset' | 'upload' | 'camera'>('preset');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (selectedAvatar) {
      onSelectAvatar(selectedAvatar);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 to-purple-900 rounded-3xl max-w-2xl w-full shadow-2xl border border-purple-500/20">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Customize Your Avatar
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-4 mb-6">
            {[
              { id: 'preset', icon: Paintbrush, label: 'Preset Avatars' },
              { id: 'upload', icon: Upload, label: 'Upload Photo' },
              { id: 'camera', icon: Camera, label: 'Take Photo' }
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  activeTab === id
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="mb-6">
            {activeTab === 'preset' && (
              <div className="grid grid-cols-3 gap-4">
                {presetAvatars.map((avatar) => (
                  <button
                    key={avatar.id}
                    onClick={() => setSelectedAvatar(avatar.imageUrl)}
                    className={`relative rounded-xl overflow-hidden aspect-square transition-all ${
                      selectedAvatar === avatar.imageUrl
                        ? 'ring-4 ring-purple-500 ring-offset-2 ring-offset-gray-900'
                        : 'hover:ring-2 hover:ring-purple-500/50'
                    }`}
                  >
                    <img
                      src={avatar.imageUrl}
                      alt={avatar.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                      <span className="text-sm text-white">{avatar.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {activeTab === 'upload' && (
              <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-purple-500/30 rounded-xl bg-white/5">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="avatar-upload"
                />
                <label
                  htmlFor="avatar-upload"
                  className="flex flex-col items-center cursor-pointer"
                >
                  <Upload className="w-12 h-12 text-purple-400 mb-2" />
                  <span className="text-gray-400">Click to upload or drag and drop</span>
                  <span className="text-sm text-gray-500">PNG, JPG up to 5MB</span>
                </label>
              </div>
            )}

            {activeTab === 'camera' && (
              <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-purple-500/30 rounded-xl bg-white/5">
                <Camera className="w-12 h-12 text-purple-400 mb-2" />
                <span className="text-gray-400">Click to take a photo</span>
                <button className="mt-4 px-6 py-2 bg-purple-600 rounded-xl text-white hover:bg-purple-500 transition-colors">
                  Open Camera
                </button>
              </div>
            )}
          </div>

          {/* Preview Area */}
          {selectedAvatar && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-300 mb-2">Preview</h3>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-purple-500">
                  <img
                    src={selectedAvatar}
                    alt="Selected avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-gray-400">
                    This is how your avatar will appear in conversations
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-xl border border-gray-600 text-gray-400 hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!selectedAvatar}
              className={`px-6 py-2 rounded-xl flex items-center gap-2 ${
                selectedAvatar
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Check className="w-4 h-4" />
              Save Avatar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}