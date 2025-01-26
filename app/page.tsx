"use client";

import { useState } from "react";
import AddressInput from "./components/AddressInput";
import Logo from "./components/Logo";
import Map from "./components/Map";
import VotingSquad from "./components/VotingSquad";

export default function Home() {
  const [selectedAddress, setSelectedAddress] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <Logo />
        </div>
      </header>
      <main className="flex-grow flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8 py-12">
            <h1 className="text-4xl font-extrabold text-gray-900">
              Find Your Polling Location
            </h1>
            <p className="text-xl text-gray-600">
              Enter your address to discover your nearest polling location and
              create your Voting Squad!
            </p>
            <AddressInput onAddressSelect={setSelectedAddress} />
            {selectedAddress && (
              <div className="space-y-8 mt-8">
                <Map address={selectedAddress} />
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4">
                    Your Nearest Polling Location:
                  </h2>
                  <p className="text-gray-700">Boston City Hall</p>
                  <p className="text-gray-700">
                    1 City Hall Square, Boston, MA 02201
                  </p>
                  <p className="text-gray-700">
                    Open from 7:00 AM to 8:00 PM on Election Day
                  </p>
                </div>
                <VotingSquad />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
