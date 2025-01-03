import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import DoctorTypeSelection from '../components/registration/DoctorTypeSelection';
import { ProfileType } from '../lib/types/profile';

export default function Register() {
  const [profileType, setProfileType] = useState<ProfileType | null>(null);

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Inscription</h2>
        <p className="mt-2 text-gray-600">
          Déjà inscrit ?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-500">
            Connectez-vous
          </Link>
        </p>
      </div>

      <DoctorTypeSelection selectedType={profileType} onSelect={setProfileType} />

      {profileType && (
        <AuthForm mode="register" profileType={profileType} />
      )}
    </div>
  );
}