import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { uploadProfileImage } from "../../lib/api/storage";
import toast from "react-hot-toast";
import { Upload } from "lucide-react";


interface ImageUploadProps {
    currentImageUrl?: string;
    onUploadSuccess: (url: string) => void;
}

export default function ImageUpload({ currentImageUrl, onUploadSuccess }: ImageUploadProps) {
    const { user } = useAuth();
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!user || !e.target.files?.[0]) return;

        const file = e.target.files[0];
        setUploading(true);

        try{
            const url = await uploadProfileImage(file, user.id);
            onUploadSuccess(url);
            toast.success("Image mise à jour");
        } catch (error) {
            console.error("Error uploading image:", error);
            toast.error("Une erreur est survenue");
        } finally {
            setUploading(false);
        }
    }

    return (
        <div className="relative group">
          <div className="w-24 h-24 rounded-full overflow-hidden mx-auto">
            {currentImageUrl ? (
              <img
                src={currentImageUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <Upload className="h-8 w-8 text-gray-400" />
              </div>
            )}
          </div>
    
          <label 
            htmlFor="profile-image"
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full"
          >
            <span className="text-white text-sm">Modifier</span>
          </label>
    
          <input
            id="profile-image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
    
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            </div>
          )}
        </div>
      );
}