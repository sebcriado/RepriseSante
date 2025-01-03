export type ProfileType = 'retiring' | 'replacement';

interface BaseProfile {
  id: string;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  profile_type: ProfileType;
  city: string;
  postal_code: string;
  phone?: string;
  about?: string;
  registration_number: string;
  is_verified: boolean;
}

export interface RetiringProfile extends BaseProfile {
  profile_type: 'retiring';
  retirement_date?: string;
  practice_details?: string;
  patient_count?: number;
}

export interface ReplacementProfile extends BaseProfile {
  profile_type: 'replacement';
  availability_start?: string;
  availability_end?: string;
  preferred_regions?: string[];
  experience_years?: number;
}

export type Profile = RetiringProfile | ReplacementProfile;