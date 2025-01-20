import { Heading } from "@/components/catalyst/heading";
import { Text } from "@/components/catalyst/text";

export default async function ChangelogPage() {
  return (
    <main>
      <div className="flex w-full flex-wrap items-end justify-between gap-4 border-b border-zinc-950/10 pb-6 dark:border-white/10">
        <Heading>Changelog</Heading>
      </div>
      <Text className="pt-4">Please check back later.</Text>
    </main>
  );
}
