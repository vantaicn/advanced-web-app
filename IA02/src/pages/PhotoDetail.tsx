import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Photo } from "@/types/photo";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Download, User, Image as ImageIcon } from "lucide-react";

const PhotoDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPhotoDetail = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await fetch(`https://picsum.photos/id/${id}/info`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch photo details");
        }

        const data: Photo = await response.json();
        setPhoto(data);
      } catch (error) {
        console.error("Error fetching photo details:", error);
        toast({
          title: "Error",
          description: "Failed to load photo details. Please try again.",
          variant: "destructive",
        });
        navigate("/photos");
      } finally {
        setLoading(false);
      }
    };

    fetchPhotoDetail();
  }, [id, navigate, toast]);

  const handleDownload = () => {
    if (photo) {
      window.open(photo.download_url, "_blank");
      toast({
        title: "Download started",
        description: "Your photo is being downloaded.",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-lg border-b shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <Skeleton className="h-10 w-32" />
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            <Skeleton className="w-full aspect-video rounded-lg mb-6" />
            <Skeleton className="h-8 w-64 mb-4" />
            <Skeleton className="h-6 w-48" />
          </div>
        </main>
      </div>
    );
  }

  if (!photo) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-lg border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link to="/photos">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Gallery
            </Button>
          </Link>
        </div>
      </header>

      {/* Photo Detail */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <Card className="overflow-hidden shadow-card-hover border-0">
            <div className="relative">
              <img
                src={`https://picsum.photos/id/${photo.id}/1200/800`}
                alt={`Photo by ${photo.author}`}
                className="w-full h-auto"
              />
            </div>
          </Card>

          <div className="mt-8 space-y-6">
            {/* Photo Info */}
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                    <ImageIcon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">Stunning Landscape</h1>
                    <p className="text-muted-foreground">A beautiful moment captured in time</p>
                  </div>
                </div>

                <Card className="p-4 bg-secondary/50">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Photographer</span>
                  </div>
                  <p className="text-lg font-semibold">{photo.author}</p>
                </Card>

                <Card className="p-4 bg-secondary/50">
                  <h3 className="font-semibold mb-2">About this photo</h3>
                  <p className="text-muted-foreground">
                    This stunning photograph captures the essence of natural beauty. 
                    Shot with precision and an artistic eye, it showcases the photographer's 
                    talent for finding extraordinary moments in everyday scenes.
                  </p>
                  <div className="mt-4 pt-4 border-t flex gap-6 text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium">Dimensions:</span> {photo.width} × {photo.height}
                    </div>
                    <div>
                      <span className="font-medium">Photo ID:</span> {photo.id}
                    </div>
                  </div>
                </Card>
              </div>

              <div>
                <Button onClick={handleDownload} className="gap-2 gradient-primary border-0">
                  <Download className="w-4 h-4" />
                  Download Photo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PhotoDetail;
