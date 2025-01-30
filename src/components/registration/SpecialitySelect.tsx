import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Select from "react-select";

interface SpecialtySelectProps {
  selectedSpecialties: string[];
  onChange: (specialties: string[]) => void;
}

interface SpecialtyOption {
  value: string;
  label: string;
}

export default function SpecialtySelect({
  selectedSpecialties,
  onChange,
}: SpecialtySelectProps) {
  const [specialties, setSpecialties] = useState<SpecialtyOption[]>([]);

  useEffect(() => {
    const fetchSpecialties = async () => {
      const { data, error } = await supabase.from("specialties").select("*");
      if (error) {
        console.error("Error fetching specialties:", error);
      } else {
        const formattedData = data.map((specialty) => ({
          value: specialty.id,
          label: specialty.name,
        }));
        setSpecialties(formattedData);
      }
    };

    fetchSpecialties();
  }, []);

  const selectedOptions = specialties.filter((specialty) =>
    selectedSpecialties.includes(specialty.value)
  );

  return (
    <div>
      <label
        htmlFor="specialties"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Spécialités
      </label>
      <Select
        id="specialties"
        name="specialties"
        isMulti
        value={selectedOptions}
        onChange={(newValue) => {
          onChange((newValue as SpecialtyOption[]).map((option) => option.value));
        }}
        options={specialties}
        className="basic-multi-select"
        classNamePrefix="select"
        placeholder="Sélectionnez vos spécialités"
        noOptionsMessage={() => "Aucune spécialité disponible"}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: '#2563eb', // blue-600
            primary25: '#dbeafe', // blue-100
          },
        })}
      />
    </div>
  );
}
