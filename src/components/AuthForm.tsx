import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { ProfileType } from '../lib/types/profile';
import SpecialtySelect from './registration/SpecialitySelect';

interface AuthFormProps {
  mode: 'login' | 'register';
  profileType?: ProfileType;
}

interface ValidationErrors {
  email?: string;
  password?: string;
}

export default function AuthForm({ mode, profileType }: AuthFormProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{12,}$/;
    return passwordRegex.test(password);
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: ValidationErrors = {};
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    if (mode === 'register') {
      // Validation stricte pour l'inscription
      if (!validateEmail(email)) {
        newErrors.email = "Format d'email invalide";
      }

      if (!validatePassword(password)) {
        newErrors.password = "Le mot de passe doit contenir au moins 12 caractères, une majuscule, un chiffre et un caractère spécial";
      }
    } else {
      // Validation basique pour le login
      if (!email) {
        newErrors.email = "L'email est requis";
      }
      if (!password) {
        newErrors.password = "Le mot de passe est requis";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
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

          // Ajouter les spécialités sélectionnées
          const { error: specialtiesError } = await supabase
          .from('doctor_specialties')
          .insert(selectedSpecialties.map(specialtyId => ({
            doctor_id: user.id,
            specialty_id: specialtyId,
          })));

        if (specialtiesError) throw specialtiesError;
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
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
      </div>

      {mode === 'register' && (
        <SpecialtySelect
          selectedSpecialties={selectedSpecialties}
          onChange={setSelectedSpecialties}
        />
      )}

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