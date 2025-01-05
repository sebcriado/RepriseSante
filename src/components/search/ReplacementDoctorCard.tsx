import React, { useState } from "react";
import { ReplacementProfile } from "../../lib/types/profile";

interface ReplacementDoctorCardProps {
  doctor: ReplacementProfile;
}

export default function ReplacementDoctorCard({
  doctor,
}: ReplacementDoctorCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleContactClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <img
        src={"https://picsum.photos/200"}
        alt={`${doctor.first_name} ${doctor.last_name}`}
        className="w-24 h-24 rounded-full mx-auto"
      />
      <div className="text-center mt-4">
        <h3 className="text-lg font-bold">{`${doctor.first_name} ${doctor.last_name}`}</h3>
        <p className="text-gray-600">{doctor.city}</p>
        <button
          onClick={handleContactClick}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Contacter
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Paiement requis</h2>
            <p className="mb-4">
              Vous devez payer 5€ pour contacter cette personne.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCloseModal}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Fermer
              </button>
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Payer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
