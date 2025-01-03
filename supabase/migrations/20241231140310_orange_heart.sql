/*
  # Correction des politiques RLS pour la table profiles

  1. Sécurité
    - Ajout d'une politique pour permettre l'insertion de profil par l'utilisateur authentifié
    - Ajout d'une politique pour permettre la mise à jour du profil par son propriétaire
*/

-- Suppression des anciennes politiques pour les recréer proprement
DROP POLICY IF EXISTS "Les profils sont visibles par tous les utilisateurs authentifiés" ON profiles;
DROP POLICY IF EXISTS "Les utilisateurs peuvent modifier leur propre profil" ON profiles;

-- Création des nouvelles politiques
CREATE POLICY "Lecture des profils par utilisateurs authentifiés"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Création de son propre profil"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Modification de son propre profil"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);