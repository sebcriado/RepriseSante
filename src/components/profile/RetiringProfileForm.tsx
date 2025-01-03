import React from 'react';
import { RetiringProfile } from '../../lib/types/profile';
import BaseProfileForm from './BaseProfileForm';

interface RetiringProfileFormProps {
  initialData?: Partial<RetiringProfile>;
  onSuccess?: () => void;
}

export default function RetiringProfileForm({ initialData, onSuccess }: RetiringProfileFormProps) {
  return (
    <BaseProfileForm
      initialData={{ ...initialData, profile_type: 'retiring' }}
      onSuccess={onSuccess}
      additionalFields={({ formData, handleChange }) => (
        <>
          <div>
            <label htmlFor="retirement_date" className="block text-sm font-medium text-gray-700">
              Date de départ en retraite
            </label>
            <input
              type="date"
              id="retirement_date"
              name="retirement_date"
              value={formData.retirement_date || ''}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="practice_details" className="block text-sm font-medium text-gray-700">
              Détails du cabinet
            </label>
            <textarea
              id="practice_details"
              name="practice_details"
              value={formData.practice_details || ''}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Description du cabinet, équipement, spécialités..."
            />
          </div>

          <div>
            <label htmlFor="patient_count" className="block text-sm font-medium text-gray-700">
              Nombre approximatif de patients
            </label>
            <input
              type="number"
              id="patient_count"
              name="patient_count"
              value={formData.patient_count || ''}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </>
      )}
    />
  );
}