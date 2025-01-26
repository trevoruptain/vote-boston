import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";

export default function Map({ address }: { address: string }) {
  const handleGetDirections = () => {
    const encodedAddress = encodeURIComponent(address);
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`,
      "_blank"
    );
  };

  return (
    <div className="relative w-full h-64 bg-gray-200 rounded-md overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg text-gray-600">Map of {address}</span>
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <MapPin className="h-8 w-8 text-red-500" />
      </div>
      <div className="absolute bottom-4 right-4">
        <Button onClick={handleGetDirections}>
          <Navigation className="mr-2 h-4 w-4" />
          Get Directions
        </Button>
      </div>
    </div>
  );
}
