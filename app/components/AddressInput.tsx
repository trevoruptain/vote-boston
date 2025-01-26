"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

const simulatedAddresses = [
  "123 Main St, Boston, MA 02108",
  "456 Beacon St, Boston, MA 02115",
  "789 Boylston St, Boston, MA 02116",
];

export default function AddressInput({
  onAddressSelect,
}: {
  onAddressSelect: (address: string) => void;
}) {
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddress(value);
    if (value.length > 2) {
      setSuggestions(
        simulatedAddresses.filter((addr) =>
          addr.toLowerCase().includes(value.toLowerCase())
        )
      );
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
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleAddressSelect(suggestion)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
