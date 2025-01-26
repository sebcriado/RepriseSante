import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, UserCheck, MapPin } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Connectons les médecins pour une meilleure continuité des soins
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          La plateforme qui met en relation les médecins partant à la retraite
          avec leurs futurs remplaçants
        </p>
        <Link
          to="/register"
          className="inline-block px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Commencer maintenant
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8 py-12">
        <div className="text-center p-6">
          <UserPlus className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Inscription Simple</h3>
          <p className="text-gray-600">
            Créez votre profil en quelques minutes et rejoignez notre communauté
            médicale
          </p>
        </div>
        <div className="text-center p-6">
          <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Recherche Géolocalisée</h3>
          <p className="text-gray-600">
            Trouvez facilement des opportunités dans votre région
          </p>
        </div>
        <div className="text-center p-6">
          <UserCheck className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Mise en Relation</h3>
          <p className="text-gray-600">
            Connectez-vous directement avec des médecins partageant vos
            objectifs
          </p>
        </div>
      </div>
    </div>
  );
}
