"use client";

import { useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useEffect, useState } from "react";

import AddressInput from "./components/AddressInput";
import { Footer } from "./components/Footer";
import Logo from "./components/Logo";
import Map from "./components/Map";
import ProjectListDropdown from "./components/ProjectListDropdown";
import { PollingLocation } from "./types/pollingLocation";
import { titleize } from "./utils/titleize";

const libraries = ["places", "drawing", "geometry", "visualization"] as (
  | "places"
  | "drawing"
  | "geometry"
  | "visualization"
)[];

export default function Home() {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [userCoordinates, setUserCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [pollingLocation, setPollingLocation] =
    useState<PollingLocation | null>(null);
  const [error, setError] = useState<string | null>(null);

  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!googleMapsApiKey) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold mb-4">Configuration Required</h2>
          <p className="text-gray-700 mb-4">
            Please create a <code>.env.local</code> file in the root of your
            project and add your Google Maps API key:
          </p>
          <pre className="bg-gray-100 p-4 rounded">
            NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_API_KEY_HERE
          </pre>
        </div>
      </div>
    );
  }

  // Load the Google Maps JavaScript API once at the parent level
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey,
    libraries,
  });

  // Function to geocode address
  const geocodeAddress = useCallback(async (address: string) => {
    if (!window.google) {
      throw new Error("Google Maps is not loaded yet.");
    }
    const geocoder = new window.google.maps.Geocoder();

    return new Promise<{ lat: number; lng: number }>((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK" && results && results[0]) {
          const location = results[0].geometry.location;
          resolve({ lat: location.lat(), lng: location.lng() });
        } else {
          console.error(
            "Geocode was not successful for the following reason: " + status
          );
          reject("Unable to geocode the provided address.");
        }
      });
    });
  }, []);

  // Function to fetch nearest polling location
  const fetchNearestPollingLocation = useCallback(
    async (userLat: number, userLng: number) => {
      try {
        const response = await fetch("/api/nearest-polling-location", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userLat, userLng }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch polling location.");
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        return data.nearestLocation as PollingLocation;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    []
  );

  // Handle selected address change
  useEffect(() => {
    if (!isLoaded || !selectedAddress) {
      setUserCoordinates(null);
      setPollingLocation(null);
      return;
    }

    // If Google Maps is loaded and we have a selected address...
    setError(null);
    geocodeAddress(selectedAddress)
      .then((coords) => {
        setUserCoordinates(coords);
        return fetchNearestPollingLocation(coords.lat, coords.lng);
      })
      .then((nearestLocation) => {
        setPollingLocation(nearestLocation);
      })
      .catch((err) => {
        setError(String(err));
      });
  }, [isLoaded, selectedAddress, geocodeAddress, fetchNearestPollingLocation]);

  if (loadError) {
    return <div>Error loading Google Maps: {String(loadError)}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Logo />
          <ProjectListDropdown />
        </div>
      </header>
      <main
        className={`flex flex-col flex-grow overflow-y-auto ${
          !selectedAddress ? "justify-start" : "justify-center"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8 py-12">
            <h1 className="text-4xl font-extrabold text-gray-900">
              Find Your Polling Location
            </h1>
            <p className="text-xl text-gray-600">
              Enter your address to discover your nearest polling location!
            </p>

            {/* Pass the isLoaded flag to AddressInput so it can use the google API for Autocomplete */}
            <AddressInput
              isLoaded={isLoaded}
              onAddressSelect={setSelectedAddress}
            />

            {error && <div className="text-red-500">{error}</div>}

            {selectedAddress && pollingLocation && userCoordinates && (
              <div className="space-y-8 mt-8">
                <Map
                  isLoaded={isLoaded}
                  userCoordinates={userCoordinates}
                  pollingLocation={pollingLocation}
                />

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4">
                    Your Nearest Polling Location:
                  </h2>
                  <p className="text-gray-700">
                    {titleize(pollingLocation.USER_Location2)}
                  </p>
                  <p className="text-gray-700">{pollingLocation.Match_addr}</p>
                  {pollingLocation.USER_HP_Entrance && (
                    <p className="text-gray-700">
                      <strong>Entrance:</strong>{" "}
                      {titleize(pollingLocation.USER_HP_Entrance)}
                    </p>
                  )}
                  <p className="text-gray-700 italic">
                    {titleize(pollingLocation.USER_Voting_Roo)}
                  </p>
                </div>

                {/* <VotingSquad /> */}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
