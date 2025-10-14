import { useState, useEffect, useCallback, useRef } from "react";
import { Photo } from "@/types/photo";
import { PhotoCard } from "@/components/PhotoCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { PhotoSkeleton } from "@/components/PhotoSkeleton";
import { useToast } from "@/hooks/use-toast";
import { Camera } from "lucide-react";

const PHOTOS_PER_PAGE = 30;

const Photos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const fetchPhotos = useCallback(async (pageNum: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${pageNum}&limit=${PHOTOS_PER_PAGE}`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch photos");
      }

      const data: Photo[] = await response.json();
      
      if (data.length === 0) {
        setHasMore(false);
        return;
      }

      setPhotos((prev) => [...prev, ...data]);
      setInitialLoad(false);
    } catch (error) {
      console.error("Error fetching photos:", error);
      toast({
        title: "Error",
        description: "Failed to load photos. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchPhotos(page);
  }, [page, fetchPhotos]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loading]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-lg border-b shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
              <Camera className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Picsum Gallery</h1>
              <p className="text-sm text-muted-foreground">Beautiful photos from Lorem Picsum</p>
            </div>
          </div>
        </div>
      </header>

      {/* Photo Grid */}
      <main className="container mx-auto px-4 py-8">
        {initialLoad ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 15 }).map((_, index) => (
              <PhotoSkeleton key={index} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {photos.map((photo) => (
                <PhotoCard key={photo.id} photo={photo} />
              ))}
            </div>

            {/* Loading indicator */}
            <div ref={observerTarget} className="mt-8">
              {loading && <LoadingSpinner />}
              {!hasMore && photos.length > 0 && (
                <p className="text-center text-muted-foreground py-8">
                  You've reached the end! 🎉
                </p>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Photos;
