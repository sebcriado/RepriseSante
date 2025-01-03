import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { searchClosestReplacementDoctors } from "../lib/api/search";
import ReplacementDoctorCard from "../components/search/ReplacementDoctorCard";
import { ReplacementProfile } from "../lib/types/profile";
import { supabase } from "../lib/supabase";

export default function Dashboard() {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState<ReplacementProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      if (!user) return;
      try {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("city")
          .eq("id", user.id)
          .single();

        if (error) throw error;

        const data = await searchClosestReplacementDoctors(profile.city);
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900">Tableau de bord</h2>
      <p className="mt-2 text-gray-600">
        Voici les médecins remplaçants les plus proches de votre ville :
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {doctors.map((doctor) => (
          <ReplacementDoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
}
