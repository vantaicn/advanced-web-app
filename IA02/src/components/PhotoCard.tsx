import { Link } from "react-router-dom";
import { Photo } from "@/types/photo";
import { Card } from "@/components/ui/card";

interface PhotoCardProps {
  photo: Photo;
}

export const PhotoCard = ({ photo }: PhotoCardProps) => {
  return (
    <Link to={`/photos/${photo.id}`}>
      <Card className="group overflow-hidden border-0 shadow-card hover:shadow-card-hover smooth-transition cursor-pointer">
        <div className="relative overflow-hidden aspect-square">
          <img
            src={`https://picsum.photos/id/${photo.id}/400/400`}
            alt={`Photo by ${photo.author}`}
            className="w-full h-full object-cover smooth-transition group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 gradient-overlay opacity-0 group-hover:opacity-100 smooth-transition">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-white font-medium text-sm truncate">{photo.author}</p>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
