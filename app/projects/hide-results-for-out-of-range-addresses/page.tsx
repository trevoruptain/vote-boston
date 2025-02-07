"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function HideResultsForOutOfRangeAddresses() {
  const [showPrompt, setShowPrompt] = useState(false);

  return (
    <div className="flex flex-col flex-grow overflow-y-auto justify-center items-center py-12">
      <Card className="w-full max-w-3xl mx-auto">
        <Button
          onClick={() => (window.location.href = "/")}
          variant="outline"
          className="self-start mb-4 flex items-center border-none shadow-none m-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home Page
        </Button>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-3xl">
            Hide Results for Out of Range Addresses
          </CardTitle>
          <CardDescription className="text-md">
            <strong>Problem:</strong> When a user&apos;s address is far from any
            polling location (e.g. more than 10 miles away), the app shows a
            generic error message (&quot;Error: Failed to fetch polling
            location.&quot;). This can be confusing.
            <br />
            <strong>Solution:</strong> Update the code so that if the computed
            distance is greater than 10 miles, no polling location is returned.
            Then, update the UI to display a friendly message that includes a
            link to the City of Boston&apos;s polling location information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Instructions</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                Open both <code>app/api/nearest-polling-location/route.ts</code>{" "}
                and <code>app/page.tsx</code>. The route is the backend API
                route that computes the distance between the user&apos;s address
                and the nearest polling location. The page is the frontend code
                that displays the map.
              </li>
              <li>
                Copy the entire content of both files and paste them together
                into your generative AI chatbot in a single prompt.
              </li>
              <li>
                Ask your AI to update the code so that if the computed distance
                is greater than 10 miles, no polling location is returned from
                the backend, and the UI displays a friendly message with a link
                to the City of Boston&apos;s polling location info. For example,
                the message could read: &quot;We couldn&apos;t find a nearby
                polling location. Please check the City of Boston&apos;s polling
                locations for more info.&quot;
              </li>
              <li>
                Review the updated code from the AI and update your files
                accordingly.
              </li>
              <li>
                Test the changes by entering an address that is far away to
                ensure the friendly message is shown.
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
                    Currently, if an address is far away from any polling
                    location, we still show the directions to the nearest
                    polling location. Please ensure that if the computed
                    distance is greater than 10 miles, no polling location is
                    returned. Instead, the UI should display a friendly message
                    such as &quot;We couldn&apos;t find a nearby polling
                    location. Please check the City of Boston&apos;s polling
                    locations for more info.&quot; with a link to:
                    https://www.boston.gov/departments/elections/city-boston-polling-locations
                    <br />
                    <br />
                    Return the full updated files.
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
