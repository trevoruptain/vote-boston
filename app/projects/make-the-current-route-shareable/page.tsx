"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, CircleOff } from "lucide-react";
import { useState } from "react";

export default function MakeTheCurrentRouteShareable() {
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
            Make the Current Route Shareable
          </CardTitle>
          <CardDescription className="text-md">
            <strong>Problem:</strong> Users can&apos;t share the current route
            with others.
            <br />
            <strong>Solution:</strong> Add a share button to the page that
            allows users to share the current route with others.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Instructions</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                Making this change will most likely require you to update
                multiple files.
              </li>
              <li>
                Once the user has selected an address, you can update the page
                URL to include the URL encoded address.
              </li>
              <li>
                When the page initializes, check if the URL includes an address
                and if so, automatically update the map to the selected address.
              </li>
              <li>
                Add a share button to the page that copies the current URL to
                the user&apos;s clipboard.
              </li>
            </ol>
          </div>
          <div>
            <Button
              onClick={() => setShowPrompt(!showPrompt)}
              variant="outline"
              className="w-full"
              disabled
            >
              <CircleOff className="mr-2 h-4 w-4" /> No prompt for this ticket -
              try it on your own!
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
