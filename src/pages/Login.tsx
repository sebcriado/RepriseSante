import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Connexion</h2>
        <p className="mt-2 text-gray-600">
          Pas encore de compte ?{" "}
          <Link to="/register" className="text-blue-600 hover:text-blue-500">
            Inscrivez-vous
          </Link>
        </p>
      </div>

      <AuthForm mode="login" />
    </div>
  );
}
