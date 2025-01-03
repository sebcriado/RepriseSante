import React from 'react';
import { ReplacementProfile } from '../../lib/types/profile';
import BaseProfileForm from './BaseProfileForm';

interface ReplacementProfileFormProps {
  initialData?: Partial<ReplacementProfile>;
  onSuccess?: () => void;
}

export default function ReplacementProfileForm({ initialData, onSuccess }: ReplacementProfileFormProps) {
  return (
    <BaseProfileForm
      initialData={{ ...initialData, profile_type: 'replacement' }}
      onSuccess={onSuccess}
      additionalFields={({ formData, handleChange }) => (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="availability_start" className="block text-sm font-medium text-gray-700">
                Disponible à partir du
              </label>
              <input
                type="date"
                id="availability_start"
                name="availability_start"
                value={formData.availability_start || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="availability_end" className="block text-sm font-medium text-gray-700">
                Jusqu'au
              </label>
              <input
                type="date"
                id="availability_end"
                name="availability_end"
                value={formData.availability_end || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="experience_years" className="block text-sm font-medium text-gray-700">
              Années d'expérience
            </label>
            <input
              type="number"
              id="experience_years"
              name="experience_years"
              value={formData.experience_years || ''}
              onChange={handleChange}
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </>
      )}
    />
  );
}