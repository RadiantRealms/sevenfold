import { Heading } from "@/components/catalyst/heading";
import { Button } from "@/components/catalyst/button";

export default function NotFound() {
  return (
    <main>
      <div className="flex flex-col gap-4">
        <Heading>Page not found</Heading>
        <div>
          <Button href="/">Return to Dashboard</Button>
        </div>
      </div>
    </main>
  );
}
