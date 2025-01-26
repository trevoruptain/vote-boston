"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Share2 } from "lucide-react";
import { useState } from "react";

export default function FriendReferral() {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending an email
    setTimeout(() => {
      setIsSent(true);
      setEmail("");
    }, 1000);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Invite Friends to Vote</h3>
      <p className="mb-4 text-sm text-gray-600">
        Encourage your friends to participate in the democratic process. Send
        them an invitation to find their polling location!
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your friend's email"
          required
        />
        <Button type="submit" className="w-full">
          <Share2 className="mr-2 h-4 w-4" />
          Send Invitation
        </Button>
      </form>
      {isSent && (
        <p className="mt-4 text-sm text-green-600">
          Invitation sent successfully!
        </p>
      )}
    </div>
  );
}
