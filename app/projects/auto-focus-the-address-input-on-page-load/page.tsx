"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function AutoFocusAddressInput() {
  const [showPrompt, setShowPrompt] = useState(false);

  return (
    <div className="flex flex-col flex-grow overflow-y-auto justify-center">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-3xl">
            Auto-focus the address input on page load
          </CardTitle>
          <CardDescription className="text-md">
            <strong>Problem:</strong> Currently, when the page loads, the user
            has to click on the input field with the placeholder &quot;Enter
            your address&quot; before they can start typing.
            <br />
            <strong>Solution:</strong> Automatically focus the input field when
            the page loads so the user can start typing right away.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Instructions</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                Open the file <code>app/components/AddressInput.tsx</code>.
              </li>
              <li>
                Find the input on line 95. It has the placeholder &quot;Enter
                your address&quot;.
              </li>
              <li>
                Copy the entire content of the file and paste it into your
                generative AI chatbot.
              </li>
              <li>
                Prompt your AI (e.g. ChatGPT, Claude, or Gemini) to update the
                code so that the input with placeholder &quot;Enter your
                address&quot; automatically receives focus when the page loads.
              </li>
              <li>
                Review the updated code from the AI and update your file
                accordingly.
              </li>
              <li>
                Once you save the file, refresh the page and test the new
                functionality.
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
                    The input with the placeholder &quot;Enter your
                    address&quot; should automatically get focus when the page
                    loads.
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
