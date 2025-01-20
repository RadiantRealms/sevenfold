"use client";

import { usePathname } from "next/navigation";

import { Heading } from "@/components/catalyst/heading";
import {
  Navbar,
  NavbarItem,
  NavbarSection,
} from "@/components/catalyst/navbar";

export default function PeopleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="pb-6">
      <div className="flex w-full flex-wrap items-end justify-between gap-4 border-b border-zinc-950/10 pb-6 dark:border-white/10">
        <Heading>Giving</Heading>
      </div>
      <Navbar className="pb-12">
        <NavbarSection>
          <NavbarItem href="/giving" current={pathname.endsWith("/giving")}>
            Overview
          </NavbarItem>
          <NavbarItem
            href="/giving/donations"
            current={pathname.startsWith("/giving/donations")}
          >
            Donation List
          </NavbarItem>
          <NavbarItem
            href="/giving/donor-reports"
            current={pathname.startsWith("/giving/donor-reports")}
          >
            Donor Reports
          </NavbarItem>
        </NavbarSection>
      </Navbar>
      {children}
    </div>
  );
}
