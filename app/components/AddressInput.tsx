"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface AddressInputProps {
  isLoaded: boolean;
  onAddressSelect: (address: string) => void;
}

export default function AddressInput({
  isLoaded,
  onAddressSelect,
}: AddressInputProps) {
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [loading, setLoading] = useState(false);

  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  // Reference to track the time of the last API call (in milliseconds)
  const lastRequestTime = useRef<number>(0);

  // Initialize AutocompleteService when the script is loaded
  useEffect(() => {
    if (isLoaded && !autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
  }, [isLoaded]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddress(value);

    // Clear any previous debounce timer
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (!autocompleteService.current || !window.google) {
      // If the service isn't ready yet, just return
      return;
    }

    if (value.length > 2) {
      setLoading(true);
      // Debounce the API call by 300ms
      debounceTimeout.current = setTimeout(() => {
        const now = Date.now();
        // If less than 1 second has passed since the last API call, cancel this one.
        if (now - lastRequestTime.current < 1000) {
          setLoading(false);
          return;
        }
        // Update the last request time and call the API
        lastRequestTime.current = now;
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
              className="px-4 py-2 cursor-default hover:bg-gray-50 animate-pulse"
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
