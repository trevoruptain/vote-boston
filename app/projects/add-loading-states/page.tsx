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

export default function AddLoadingStates() {
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
            Add Loading States
          </CardTitle>
          <CardDescription className="text-md">
            <strong>Problem:</strong> When the user first enters an address, the
            page &quot;flashes&quot; for a moment when the address input
            disappears and the map has not loaded yet.
            <br />
            <strong>Solution:</strong> While the map is loading, display a
            loading state that is the same size as the map.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Instructions</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                Open <code>app/page.tsx</code>. Recognize that after an address
                is selected, we change the page layout but it takes a moment for
                the map to load.
              </li>
              <li>
                Copy the entire content of the file and paste it into your
                generative AI chatbot.
              </li>
              <li>
                Ask your AI to update the code so that while the map is loading,
                a loading state is shown. You can use the existing{" "}
                <code>Skeleton</code> component if you like.
              </li>
              <li>
                The AI will probably not get it right the first time.
                That&apos;s okay. Follow our prompt engineering best practices
                and keep asking the AI to update the code until it works as
                expected.
              </li>
              <li>
                You many need to manually add a second loading state for the
                polling location info box.
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
                    When the map is loading, show a loading state that is the
                    same size as the map. Use the the shadcn skeleton component
                    to create the loading state.
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
