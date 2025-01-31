import React, { useState } from "react";
import { ReplacementProfile } from "../../lib/types/profile";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import { fetchProfile } from "../../lib/api/profiles";
import { User2 } from "lucide-react";

interface ReplacementDoctorCardProps {
  doctor: ReplacementProfile;
}

export default function ReplacementDoctorCard({
  doctor,
}: ReplacementDoctorCardProps) {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleContactClick = async () => {
    if (!user) return;

    try {
      const profile = await fetchProfile(user.id);

      // Vérifier si le profil est complet
      if (!profile || !isProfileComplete(profile)) {
        toast.error(
          "Vous devez compléter votre profil avant de pouvoir contacter un médecin"
        );
        return;
      }

      setIsModalOpen(true);
    } catch (error) {
      toast.error("Une erreur est survenue");
      console.error(error);
    }
  };

  // Fonction pour vérifier si le profil est complet
  const isProfileComplete = (profile: ReplacementProfile) => {
    const requiredFields = [
      "first_name",
      "last_name",
      "city",
      "postal_code",
      "registration_number",
      "phone",
      "about",
    ] as const;

    return requiredFields.every(
      (field) =>
        profile[field as keyof ReplacementProfile] &&
        profile[field as keyof ReplacementProfile] &&
        profile[field as keyof ReplacementProfile].toString().trim() !== ""
    );
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {doctor.avatar_url ? (
        <img
          src={doctor.avatar_url}
          alt={`${doctor.first_name} ${doctor.last_name}`}
          className="w-24 h-24 rounded-full mx-auto"
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto flex items-center justify-center">
          <User2 className="w-12 h-12 text-gray-500" />
        </div>
      )}
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
              Vous aller être redirigé vers le paiement pour contacter ce
              médecin. Voulez-vous continuer?
            </p>
            <hr />
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={handleCloseModal}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Annuler
              </button>
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Oui, continuer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
