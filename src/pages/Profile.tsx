import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { fetchProfile } from '../lib/api/profiles';
import { Profile as ProfileType } from '../lib/types/profile';
import { User2, Edit2 } from 'lucide-react';
import ProfileForm from '../components/ProfileForm';

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = React.useState<ProfileType | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [isEditing, setIsEditing] = React.useState(false);

  const loadProfile = async () => {
    if (!user) return;
    
    try {
      const data = await fetchProfile(user.id);
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadProfile();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="max-w-3xl mx-auto mt-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-6">Modifier le profil</h2>
          <ProfileForm 
            initialData={profile || undefined}
            onSuccess={() => {
              setIsEditing(false);
              loadProfile();
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gray-100 p-3 rounded-full">
                <User2 className="h-12 w-12 text-gray-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {profile?.first_name ? `${profile.first_name} ${profile.last_name}` : 'Profil incomplet'}
                </h1>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md"
            >
              <Edit2 className="h-4 w-4" />
              <span>Modifier</span>
            </button>
          </div>

          {profile ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Type de profil</h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {profile.profile_type === 'retiring' ? 'Médecin partant à la retraite' : 'Médecin remplaçant'}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Numéro RPPS</h3>
                  <p className="mt-1 text-sm text-gray-900">{profile.registration_number}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Localisation</h3>
                  <p className="mt-1 text-sm text-gray-900">{profile.city} ({profile.postal_code})</p>
                </div>

                {profile.phone && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Téléphone</h3>
                    <p className="mt-1 text-sm text-gray-900">{profile.phone}</p>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">À propos</h3>
                <p className="text-sm text-gray-900">
                  {profile.about || "Aucune description disponible"}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">Veuillez compléter votre profil en cliquant sur "Modifier"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}