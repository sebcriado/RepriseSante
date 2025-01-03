import React from 'react';
import { UserMinus, UserPlus } from 'lucide-react';

interface DoctorTypeSelectionProps {
  selectedType: 'retiring' | 'replacement' | null;
  onSelect: (type: 'retiring' | 'replacement') => void;
}

export default function DoctorTypeSelection({ selectedType, onSelect }: DoctorTypeSelectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <button
        type="button"
        onClick={() => onSelect('retiring')}
        className={`p-6 border rounded-lg text-left transition-colors ${
          selectedType === 'retiring'
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-200 hover:border-blue-300'
        }`}
      >
        <div className="flex items-center space-x-4">
          <UserMinus className="h-8 w-8 text-blue-600" />
          <div>
            <h3 className="font-medium text-gray-900">Médecin partant à la retraite</h3>
            <p className="text-sm text-gray-500">Je cherche un successeur pour ma patientèle</p>
          </div>
        </div>
      </button>

      <button
        type="button"
        onClick={() => onSelect('replacement')}
        className={`p-6 border rounded-lg text-left transition-colors ${
          selectedType === 'replacement'
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-200 hover:border-blue-300'
        }`}
      >
        <div className="flex items-center space-x-4">
          <UserPlus className="h-8 w-8 text-blue-600" />
          <div>
            <h3 className="font-medium text-gray-900">Médecin remplaçant</h3>
            <p className="text-sm text-gray-500">Je cherche une patientèle à reprendre</p>
          </div>
        </div>
      </button>
    </div>
  );
}