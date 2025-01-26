"use client";

import { Badge } from "@/components/ui/badge";
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
  const [showHint, setShowHint] = useState(false);

  return (
    <div className="flex flex-col flex-grow overflow-y-auto justify-center">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-6 w-6" />
            Get the most useful directions based on distance
          </CardTitle>
          <CardDescription>
            Right now, our Get Directions link can only link to walking
            directions. When the distance to the polling booth is greater than 1
            mile, we should link to public transit directions instead.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Tools Used</h3>
            <div className="flex gap-2">
              <Badge>ChatGPT</Badge>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Instructions</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                Open the <code>Map.tsx</code> file in your project.
              </li>
              <li>
                Locate the <code>handleGetDirections</code> function.
              </li>
              <li>
                Modify the function to check the distance between the user's
                location and the polling location.
              </li>
              <li>
                If the distance is greater than 1 mile, use 'transit' as the
                travel mode; otherwise, use 'walking'.
              </li>
              <li>Update the button text to reflect the chosen travel mode.</li>
              <li>
                Use ChatGPT to help you implement these changes by providing it
                with the current <code>Map.tsx</code> content and explaining the
                desired outcome.
              </li>
            </ol>
          </div>

          <div>
            <Button
              onClick={() => setShowHint(!showHint)}
              variant="outline"
              className="w-full"
            >
              {showHint ? (
                <EyeOff className="mr-2 h-4 w-4" />
              ) : (
                <Eye className="mr-2 h-4 w-4" />
              )}
              {showHint ? "Hide Hint" : "Show Hint"}
            </Button>

            {showHint && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Hint: ChatGPT Prompt</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    "I need to modify the `handleGetDirections` function in my
                    `Map.tsx` file to choose between walking and transit
                    directions based on the distance to the polling location. If
                    the distance is greater than 1 mile, it should use transit
                    directions; otherwise, it should use walking directions. The
                    button text should also update accordingly. Can you help me
                    implement this change? Here's the current content of
                    `Map.tsx`: [paste the entire content of Map.tsx here]"
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
