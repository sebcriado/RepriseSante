import React from "react";
import { ReplacementProfile } from "../../lib/types/profile";

interface ReplacementDoctorCardProps {
  doctor: ReplacementProfile;
}

export default function ReplacementDoctorCard({
  doctor,
}: ReplacementDoctorCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <img
        src={`https://source.unsplash.com/random/100x100?face&sig=${doctor.id}`}
        alt={`${doctor.first_name} ${doctor.last_name}`}
        className="w-24 h-24 rounded-full mx-auto"
      />
      <div className="text-center mt-4">
        <h3 className="text-lg font-bold">{`${doctor.first_name} ${doctor.last_name}`}</h3>
        <p className="text-gray-600">{doctor.city}</p>
      </div>
    </div>
  );
}
