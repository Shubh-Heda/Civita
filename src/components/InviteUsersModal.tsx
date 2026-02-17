import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { X, Search, UserPlus, Check, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface User {
  id: string;
  user_id: string;
  name: string;
  avatar_url?: string;
}

interface InviteUsersModalProps {
  roomId: string;
  currentUserId: string;
  onClose: () => void;
}

export function InviteUsersModal({ roomId, currentUserId, onClose }: InviteUsersModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [inviting, setInviting] = useState(false);

  useEffect(() => {
    loadAvailableUsers();
  }, [roomId]);

  const loadAvailableUsers = async () => {
    setLoading(true);
    try {
      // Get all users except current user and existing members
      const { data: existingMembers } = await supabase
        .from('chat_room_members')
        .select('user_id')
        .eq('room_id', roomId);

      const excludedUserIds = [
        currentUserId,
        ...(existingMembers?.map(m => m.user_id) || []),
      ];

      // Get all authenticated users from profiles
      const { data: users, error } = await supabase
        .from('profiles')
        .select('id, user_id, name, avatar_url')
        .limit(50);

      if (error) throw error;

      // Filter out excluded users
      const filteredUsers = (users || []).filter(
        u => !excludedUserIds.includes(u.user_id)
      );

      setAvailableUsers(filteredUsers);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserSelection = (userId: string) => {
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(userId)) {
      newSelected.delete(userId);
    } else {
      newSelected.add(userId);
    }
    setSelectedUsers(newSelected);
  };

  const sendInvitations = async () => {
    if (selectedUsers.size === 0) return;

    setInviting(true);
    try {
      const invitations = Array.from(selectedUsers).map((userId) => ({
        room_id: roomId,
        inviter_id: currentUserId,
        invitee_id: userId,
        status: 'pending',
      }));

      const { error } = await supabase
        .from('chat_invitations')
        .insert(invitations);

      if (error) throw error;

      // Also add them directly as members (auto-accept for now)
      const members = Array.from(selectedUsers).map((userId) => ({
        room_id: roomId,
        user_id: userId,
        role: 'member',
      }));

      const { error: memberError } = await supabase
        .from('chat_room_members')
        .insert(members);

      if (memberError) throw memberError;

      alert(`✅ Invited ${selectedUsers.size} user${selectedUsers.size > 1 ? 's' : ''}!`);
      onClose();
    } catch (error: any) {
      console.error('Error sending invitations:', error);
      alert('Failed to send invitations: ' + error.message);
    } finally {
      setInviting(false);
    }
  };

  const filteredUsers = availableUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-slate-900">Invite Users to Group</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Search users by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          {selectedUsers.size > 0 && (
            <p className="text-sm text-cyan-600 font-medium mt-2">
              {selectedUsers.size} user{selectedUsers.size > 1 ? 's' : ''} selected
            </p>
          )}
        </div>

        {/* User List */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-cyan-500 animate-spin mb-3" />
              <p className="text-slate-500">Loading users...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <UserPlus className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">No users available to invite</p>
              <p className="text-sm text-slate-400 mt-1">All users are already members</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredUsers.map((user) => {
                const isSelected = selectedUsers.has(user.user_id);
                return (
                  <button
                    key={user.id}
                    onClick={() => toggleUserSelection(user.user_id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                      isSelected
                        ? 'bg-cyan-50 border-cyan-500 shadow-sm'
                        : 'hover:bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {user.avatar_url ? (
                      <img
                        src={user.avatar_url}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="flex-1 text-left">
                      <p className="font-medium text-slate-900">{user.name}</p>
                      <p className="text-xs text-slate-500">Click to select</p>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={sendInvitations}
            disabled={selectedUsers.size === 0 || inviting}
            className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
          >
            {inviting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4 mr-2" />
                Invite ({selectedUsers.size})
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
