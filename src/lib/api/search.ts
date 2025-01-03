import { supabase } from '../supabase';
import { Profile, RetiringProfile, ReplacementProfile } from '../types/profile';

interface SearchFilters {
  city?: string;
  postalCode?: string;
  availabilityStart?: string;
  availabilityEnd?: string;
  patientCountMin?: number;
  patientCountMax?: number;
}

export async function searchRetiringDoctors(filters: SearchFilters = {}) {
  let query = supabase
    .from('retiring_doctors')
    .select('*');

  if (filters.city) {
    query = query.ilike('city', `%${filters.city}%`);
  }

  if (filters.postalCode) {
    query = query.eq('postal_code', filters.postalCode);
  }

  if (filters.patientCountMin) {
    query = query.gte('patient_count', filters.patientCountMin);
  }

  if (filters.patientCountMax) {
    query = query.lte('patient_count', filters.patientCountMax);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as RetiringProfile[];
}

export async function searchReplacementDoctors(filters: SearchFilters = {}) {
  let query = supabase
    .from('replacement_doctors')
    .select('*');

  if (filters.city) {
    query = query.ilike('city', `%${filters.city}%`);
  }

  if (filters.postalCode) {
    query = query.eq('postal_code', filters.postalCode);
  }

  if (filters.availabilityStart) {
    query = query.gte('availability_start', filters.availabilityStart);
  }

  if (filters.availabilityEnd) {
    query = query.lte('availability_end', filters.availabilityEnd);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as ReplacementProfile[];
}