/*
  # Schéma initial pour l'application de mise en relation médicale

  1. Tables
    - `profiles`
      - Stocke les informations des médecins
      - Lié à la table auth.users de Supabase
    - `specialties`
      - Liste des spécialités médicales
    - `doctor_specialties`
      - Table de liaison entre médecins et spécialités
    - `availability_posts`
      - Annonces de disponibilité/recherche

  2. Sécurité
    - RLS activé sur toutes les tables
    - Politiques pour lecture/écriture selon le rôle
*/

-- Création de l'enum pour le type de profil
CREATE TYPE profile_type AS ENUM ('retiring', 'replacement');

-- Table des profils
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  profile_type profile_type NOT NULL,
  city text NOT NULL,
  postal_code text NOT NULL,
  phone text,
  about text,
  registration_number text NOT NULL UNIQUE,
  is_verified boolean DEFAULT false
);

-- Table des spécialités
CREATE TABLE IF NOT EXISTS specialties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Table de liaison médecins-spécialités
CREATE TABLE IF NOT EXISTS doctor_specialties (
  doctor_id uuid REFERENCES profiles(id),
  specialty_id uuid REFERENCES specialties(id),
  PRIMARY KEY (doctor_id, specialty_id)
);

-- Table des annonces
CREATE TABLE IF NOT EXISTS availability_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  doctor_id uuid REFERENCES profiles(id),
  title text NOT NULL,
  description text NOT NULL,
  start_date date,
  end_date date,
  is_active boolean DEFAULT true
);

-- Activation RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE specialties ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_specialties ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability_posts ENABLE ROW LEVEL SECURITY;

-- Politiques RLS
CREATE POLICY "Les profils sont visibles par tous les utilisateurs authentifiés"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Les utilisateurs peuvent modifier leur propre profil"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Les spécialités sont visibles par tous"
  ON specialties FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Les liaisons médecins-spécialités sont visibles par tous"
  ON doctor_specialties FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Les médecins peuvent gérer leurs spécialités"
  ON doctor_specialties FOR ALL
  TO authenticated
  USING (doctor_id = auth.uid());

CREATE POLICY "Les annonces sont visibles par tous les utilisateurs authentifiés"
  ON availability_posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Les médecins peuvent gérer leurs annonces"
  ON availability_posts FOR ALL
  TO authenticated
  USING (doctor_id = auth.uid());

-- Insertion des spécialités de base
INSERT INTO specialties (name) VALUES
  ('Médecine générale'),
  ('Cardiologie'),
  ('Pédiatrie'),
  ('Dermatologie'),
  ('Psychiatrie')
ON CONFLICT (name) DO NOTHING;