"use client";

import { Button } from "@/components/ui/button";
import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Navigation } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface MapProps {
  address: string;
}

interface Coordinates {
  lat: number;
  lng: number;
}

export default function Map({ address }: MapProps) {
  const [userCoordinates, setUserCoordinates] = useState<Coordinates | null>(
    null
  );
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Define polling location coordinates (Boston City Hall)
  const pollingLocation: Coordinates = {
    lat: 42.3581, // Approximate latitude
    lng: -71.0636, // Approximate longitude
  };

  // Load Google Maps JavaScript API
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });

  // Geocode the user's address to get coordinates
  const geocodeAddress = useCallback(() => {
    if (!address) return;

    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        const location = results[0].geometry.location;
        setUserCoordinates({ lat: location.lat(), lng: location.lng() });
      } else {
        console.error(
          "Geocode was not successful for the following reason: " + status
        );
        setError("Unable to geocode the provided address.");
      }
    });
  }, [address]);

  useEffect(() => {
    if (isLoaded) {
      geocodeAddress();
    }
  }, [isLoaded, geocodeAddress]);

  // Calculate and set directions
  useEffect(() => {
    if (userCoordinates && isLoaded) {
      const directionsService = new google.maps.DirectionsService();

      directionsService.route(
        {
          origin: userCoordinates,
          destination: pollingLocation,
          travelMode: google.maps.TravelMode.WALKING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            setDirections(result);
          } else {
            console.error("Directions request failed due to " + status);
            setError("Unable to fetch directions.");
          }
        }
      );
    }
  }, [userCoordinates, isLoaded]);

  const handleGetDirections = () => {
    if (!userCoordinates) return;

    const origin = encodeURIComponent(address);
    const destination = encodeURIComponent(
      "1 City Hall Square, Boston, MA 02201"
    );
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=walking`;

    window.open(url, "_blank");
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading Map...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="relative w-full h-96 rounded-md overflow-hidden shadow-lg">
      {userCoordinates && (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={userCoordinates}
          zoom={14}
        >
          {/* User's Marker */}
          <Marker position={userCoordinates} label="A" />

          {/* Polling Location Marker */}
          <Marker position={pollingLocation} label="B" />

          {/* Directions Renderer */}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      )}

      <div className="absolute bottom-4 left-4">
        <Button onClick={handleGetDirections}>
          <Navigation className="mr-2 h-4 w-4" />
          Get Walking Directions
        </Button>
      </div>
    </div>
  );
}
