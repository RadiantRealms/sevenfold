"use client";

import { useUser } from "@auth0/nextjs-auth0";

import { Heading } from "@/components/catalyst/heading";
import { Button } from "@/components/catalyst/button";
import { Text } from "@/components/catalyst/text";
import { LoadingProgress } from "@/components/common/loading-progress";

export default function SupportPage() {
  const { user, isLoading, error } = useUser();

  if (isLoading)
    return (
      <main>
        <LoadingProgress />
      </main>
    );

  if (error) throw new Error("An error has occured");

  return (
    <main>
      <div className="flex w-full flex-wrap items-end justify-between gap-4 border-b border-zinc-950/10 pb-6 dark:border-white/10">
        <Heading>Support</Heading>
      </div>
      <Text className="py-4">
        We're working on a knowledge base! In the meantime, use the "Request
        Support" button to get in touch.
      </Text>
      <Button
        href={`mailto:support@radiantrealms.one?subject=Support Request (${user?.org_id})`}
      >
        Request Support
      </Button>
    </main>
  );
}
