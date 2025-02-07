"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, Navigation } from "lucide-react";
import { useState } from "react";

export default function GetTheMostUsefulDirectionsBasedOnDistance() {
  const [showPrompt, setShowPrompt] = useState(false);

  return (
    <div className="flex flex-col flex-grow overflow-y-auto justify-center">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-3xl">
            <Navigation className="h-6 w-6" />
            Get the Most Useful Directions Based on Distance
          </CardTitle>
          <CardDescription className="text-md">
            <strong>Problem:</strong> The current "Get Directions" link always
            uses walking directions—even when the polling location is more than
            1 mile away.
            <br />
            <strong>Solution:</strong> Update the code so that if the distance
            to the polling location is greater than 1 mile, the app uses transit
            directions and updates the button text accordingly.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Instructions</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                Open the file <code>app/components/Map.tsx</code>.
              </li>
              <li>
                Find the <code>handleGetDirections</code> function within that
                file. Understand that it constructs a URL for Google Maps
                directions using the user's coordinates as the origin and the
                polling location's coordinates as the destination. It then opens
                this URL in a new tab to provide walking directions.
              </li>
              <li>
                Copy the entire content of <code>Map.tsx</code> and paste it
                into your generative AI chatbot.
              </li>
              <li>
                Ask your AI (e.g. ChatGPT, Claude, or Gemini) to modify the code
                so that if the distance between the user's location and the
                polling location is greater than 1 mile, it uses transit
                directions; otherwise, it uses walking directions. Also, update
                the button text to reflect the chosen travel mode.
              </li>
              <li>
                Review the updated code from the AI and update your file
                accordingly.
              </li>
              <li>
                Test the updated code by opening the app and checking if the
                directions are correct. Our polling locations are scoped to
                Boston and we don't yet hide out of range addresses (we will fix
                this soon), so you can test this by entering an address that is
                far away from a polling location.
              </li>
            </ol>
          </div>
          <div>
            <Button
              onClick={() => setShowPrompt(!showPrompt)}
              variant="outline"
              className="w-full"
            >
              {showPrompt ? (
                <>
                  <EyeOff className="mr-2 h-4 w-4" /> Hide Prompt
                </>
              ) : (
                <>
                  <Eye className="mr-2 h-4 w-4" /> Show Prompt
                </>
              )}
            </Button>
            {showPrompt && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Sample Prompt</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Right now we only have walking directions. If the distance
                    between the user's location and the polling location is
                    greater than 1 mile, we should instead return transit
                    directions. Also, update the button text to reflect the
                    chosen travel mode.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
