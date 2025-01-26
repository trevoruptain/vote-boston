"use client";

import { Input } from "@/components/ui/input";
import { Loader } from "@googlemaps/js-api-loader";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const loader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  libraries: ["places"],
});

export default function AddressInput({
  onAddressSelect,
}: {
  onAddressSelect: (address: string) => void;
}) {
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [loading, setLoading] = useState(false);
  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    loader
      .load()
      .then(() => {
        if (!autocompleteService.current && window.google) {
          autocompleteService.current =
            new window.google.maps.places.AutocompleteService();
        }
      })
      .catch((e) => {
        console.error("Error loading Google Maps: ", e);
      });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddress(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (value.length > 2 && autocompleteService.current) {
      setLoading(true);
      debounceTimeout.current = setTimeout(() => {
        autocompleteService.current!.getPlacePredictions(
          {
            input: value,
            types: ["address"],
            componentRestrictions: { country: "us" },
          },
          (predictions, status) => {
            setLoading(false);
            if (
              status === window.google.maps.places.PlacesServiceStatus.OK &&
              predictions
            ) {
              setSuggestions(predictions);
            } else {
              setSuggestions([]);
            }
          }
        );
      }, 300);
    } else {
      setSuggestions([]);
    }
  };

  const handleAddressSelect = (selectedAddress: string) => {
    setAddress(selectedAddress);
    setSuggestions([]);
    onAddressSelect(selectedAddress);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <Input
          type="text"
          value={address}
          onChange={handleInputChange}
          placeholder="Enter your address"
          className="pl-10"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
      {loading && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {[...Array(3)].map((_, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded"></div>
            </li>
          ))}
        </ul>
      )}
      {!loading && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              onClick={() => handleAddressSelect(suggestion.description)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {suggestion.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
