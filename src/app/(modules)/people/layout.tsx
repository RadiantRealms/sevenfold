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
        <Heading>People</Heading>
      </div>
      <Navbar className="pb-12">
        <NavbarSection>
          <NavbarItem href="/people" current={pathname.endsWith("/people")}>
            Overview
          </NavbarItem>
          <NavbarItem
            href="/people/households"
            current={pathname.startsWith("/people/households")}
          >
            Households
          </NavbarItem>
          <NavbarItem
            href="/people/directory"
            current={pathname.startsWith("/people/directory")}
          >
            Directory
          </NavbarItem>
        </NavbarSection>
      </Navbar>
      {children}
    </div>
  );
}
