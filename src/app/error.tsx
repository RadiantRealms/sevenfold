"use client";

import { Button } from "@/components/catalyst/button";
import { Heading } from "@/components/catalyst/heading";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <main>
      <div className="flex flex-col gap-2 p-4">
        <Heading>An error has occured</Heading>
        <div>
          <Button href="/">Return to dashboard</Button>
        </div>
      </div>
    </main>
  );
}
