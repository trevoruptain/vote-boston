"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Award, Share2, Users } from "lucide-react";
import { useState } from "react";

export default function VotingSquad() {
  const [squadMembers, setSquadMembers] = useState<string[]>([]);
  const [newMember, setNewMember] = useState("");

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMember && !squadMembers.includes(newMember)) {
      setSquadMembers([...squadMembers, newMember]);
      setNewMember("");
    }
  };

  const handleShare = () => {
    const message = `Join my Voting Squad! Let's make our voices heard together. Find your polling location and commit to vote: ${window.location.href}`;
    if (navigator.share) {
      navigator
        .share({
          title: "Join my Voting Squad",
          text: message,
        })
        .catch(console.error);
    } else {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`,
        "_blank"
      );
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-4 flex items-center">
        <Users className="mr-2 h-6 w-6 text-blue-500" />
        Create Your Voting Squad
      </h3>
      <p className="mb-4 text-gray-600">
        Voting is more fun with friends! Add your squad members and commit to
        voting together.
      </p>
      <form onSubmit={handleAddMember} className="space-y-4 mb-6">
        <div className="flex space-x-2">
          <Input
            type="text"
            value={newMember}
            onChange={(e) => setNewMember(e.target.value)}
            placeholder="Enter friend's name"
            className="flex-grow"
          />
          <Button type="submit">Add</Button>
        </div>
      </form>
      {squadMembers.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold mb-2">Your Voting Squad:</h4>
          <ul className="list-disc pl-5 space-y-1">
            {squadMembers.map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Award className="h-8 w-8 text-yellow-500 mr-2" />
          <span className="text-lg font-semibold">
            Squad Size: {squadMembers.length}
          </span>
        </div>
        <Button onClick={handleShare}>
          <Share2 className="mr-2 h-4 w-4" />
          Share Your Squad
        </Button>
      </div>
    </div>
  );
}
