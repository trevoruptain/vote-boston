"use client";

import { Button } from "@/components/ui/button";
import { DirectionsRenderer, GoogleMap, Marker } from "@react-google-maps/api";
import { Navigation } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { PollingLocation } from "../types/pollingLocation";

interface MapProps {
  isLoaded: boolean;
  userCoordinates: { lat: number; lng: number };
  pollingLocation: PollingLocation;
}

interface Coordinates {
  lat: number;
  lng: number;
}

export default function Map({
  isLoaded,
  userCoordinates,
  pollingLocation,
}: MapProps) {
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Define polling location coordinates from pollingLocation using useMemo
  const pollingCoords: Coordinates = useMemo(
    () => ({
      lat: pollingLocation.POINT_Y,
      lng: pollingLocation.POINT_X,
    }),
    [pollingLocation]
  );

  // Calculate and set directions once Maps is loaded
  useEffect(() => {
    if (!isLoaded) return;
    if (!window.google) return;

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: userCoordinates,
        destination: pollingCoords,
        travelMode: window.google.maps.TravelMode.WALKING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK && result) {
          setDirections(result);
        } else {
          console.error("Directions request failed due to " + status);
          setError("Unable to fetch directions.");
        }
      }
    );
  }, [isLoaded, userCoordinates, pollingCoords]);

  const handleGetDirections = () => {
    if (!userCoordinates) return;

    const origin = `${userCoordinates.lat},${userCoordinates.lng}`;
    const destination = `${pollingCoords.lat},${pollingCoords.lng}`;
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=walking`;

    window.open(url, "_blank");
  };

  if (!isLoaded) {
    return <div>Loading Map...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const mapContainerStyle = { width: "100%", height: "100%" };

  return (
    <div className="relative w-full h-96 rounded-md overflow-hidden shadow-lg">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={userCoordinates}
        zoom={14}
      >
        {/* Your custom markers (these have black text by default) */}
        <Marker position={userCoordinates} label="A" />
        <Marker position={pollingCoords} label="B" />

        {/* 
          DirectionsRenderer also adds a default A/B marker (white text),
          so we suppress those by passing options={{ suppressMarkers: true }}
        */}
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{ suppressMarkers: true }}
          />
        )}
      </GoogleMap>

      <div className="absolute bottom-4 left-4">
        <Button onClick={handleGetDirections}>
          <Navigation className="mr-2 h-4 w-4" />
          Get Walking Directions
        </Button>
      </div>
    </div>
  );
}
