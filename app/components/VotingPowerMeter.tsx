"use client";

import { useEffect, useState } from "react";

export default function VotingPowerMeter() {
  const [power, setPower] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPower((prevPower) => {
        const newPower = prevPower + Math.random() * 5;
        return newPower > 100 ? 100 : newPower;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-md">
      <h3 className="text-lg font-semibold mb-2">Voting Power in Your Area</h3>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-blue-600 h-4 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${power}%` }}
        ></div>
      </div>
      <p className="mt-2 text-sm text-gray-600">
        {power.toFixed(1)}% of eligible voters in your area are registered.
        Let&apos;s make it 100%!
      </p>
    </div>
  );
}
