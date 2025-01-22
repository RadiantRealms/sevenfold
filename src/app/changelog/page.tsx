import { Heading, Subheading } from "@/components/catalyst/heading";
import { Text } from "@/components/catalyst/text";

export default async function ChangelogPage() {
  return (
    <main>
      <div className="flex w-full flex-wrap items-end justify-between gap-4 border-b border-zinc-950/10 pb-6 dark:border-white/10">
        <Heading>Changelog</Heading>
      </div>
      <Subheading className="pt-4 underline">v0.2.0 - 01/20/2025: </Subheading>
      <div className="flex w-full flex-col mt-2 gap-4">
        <div>
          <Text>
            <span className="underline">
              Material UI to Tailwind Migration:
            </span>{" "}
            We migrated to Tailwind for flexibility, performance, and developer
            experience.
          </Text>
        </div>
        <div>
          <Text>
            <span className="underline">
              Changed "Transactions" to "Donations":
            </span>{" "}
            We felt this was a more simple and straightforward way to manage
            this portion of your finances. We are exploring the potential of
            integrating with banking institutions to pull your transactions and
            balances to have everything in one place.
          </Text>
        </div>
        <div>
          <Text>
            <span className="underline">
              Organized "People" into "Households":
            </span>{" "}
            Rather than being tracked in singular, seemingly unrelated "groups",
            members can now be associated with "households" that can have a
            primary contact. The Groups module will be released in a future
            version of Sevenfold.
          </Text>
        </div>
        <div>
          <Text>
            <span className="underline">Search Function:</span> Users can now
            search the member database to find profiles and donation reports.
          </Text>
        </div>
        <div>
          <Text>
            <span className="underline">Auth Provider Updates:</span> We
            separated our auth provider tenants to provide respective
            development and production environments/settings.
          </Text>
        </div>
      </div>
    </main>
  );
}
