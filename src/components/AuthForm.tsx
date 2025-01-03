import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { ProfileType } from '../lib/types/profile';

interface AuthFormProps {
  mode: 'login' | 'register';
  profileType?: ProfileType;
}

export default function AuthForm({ mode, profileType }: AuthFormProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate('/dashboard');
      } else {
        const { data: { user }, error } = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (error) throw error;
        
        if (user && profileType) {
          // Créer le profil initial avec le type sélectionné
          const { error: profileError } = await supabase
            .from('profiles')
            .insert([
              {
                id: user.id,
                profile_type: profileType,
                first_name: '',
                last_name: '',
                city: '',
                postal_code: '',
                registration_number: '',
              }
            ]);
            
          if (profileError) throw profileError;
        }

        toast.success('Compte créé avec succès ! Vous pouvez maintenant vous connecter.');
        navigate('/login');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading || (mode === 'register' && !profileType)}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {loading ? 'Chargement...' : mode === 'login' ? 'Se connecter' : "S'inscrire"}
      </button>
    </form>
  );
}