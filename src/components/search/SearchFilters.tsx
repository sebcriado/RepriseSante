import React from 'react';
import { ProfileType } from '../../lib/types/profile';

interface SearchFiltersProps {
  profileType: ProfileType;
  onFiltersChange: (filters: any) => void;
}

export default function SearchFilters({ profileType, onFiltersChange }: SearchFiltersProps) {
  const [filters, setFilters] = React.useState({
    city: '',
    postalCode: '',
    availabilityStart: '',
    availabilityEnd: '',
    patientCountMin: '',
    patientCountMax: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h3 className="font-medium text-gray-900 mb-4">Filtres de recherche</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            Ville
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={filters.city}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
            Code postal
          </label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={filters.postalCode}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {profileType === 'replacement' && (
          <>
            <div>
              <label htmlFor="availabilityStart" className="block text-sm font-medium text-gray-700">
                Disponible à partir du
              </label>
              <input
                type="date"
                id="availabilityStart"
                name="availabilityStart"
                value={filters.availabilityStart}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="availabilityEnd" className="block text-sm font-medium text-gray-700">
                Jusqu'au
              </label>
              <input
                type="date"
                id="availabilityEnd"
                name="availabilityEnd"
                value={filters.availabilityEnd}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </>
        )}

        {profileType === 'retiring' && (
          <>
            <div>
              <label htmlFor="patientCountMin" className="block text-sm font-medium text-gray-700">
                Nombre de patients minimum
              </label>
              <input
                type="number"
                id="patientCountMin"
                name="patientCountMin"
                value={filters.patientCountMin}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="patientCountMax" className="block text-sm font-medium text-gray-700">
                Nombre de patients maximum
              </label>
              <input
                type="number"
                id="patientCountMax"
                name="patientCountMax"
                value={filters.patientCountMax}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}