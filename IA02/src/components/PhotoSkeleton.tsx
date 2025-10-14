import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const PhotoSkeleton = () => {
  return (
    <Card className="overflow-hidden border-0 shadow-card">
      <Skeleton className="aspect-square w-full" />
    </Card>
  );
};
