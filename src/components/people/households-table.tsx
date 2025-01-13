import { EllipsisHorizontalIcon } from "@heroicons/react/16/solid";

import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from "../catalyst/dropdown";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../catalyst/table";
import { Text, TextLink } from "../catalyst/text";

import { Household } from "@/lib/types";

export function HouseholdsTable({ households }: { households: Household[] }) {
  return (
    <>
      <Table className="sm:[--gutter:theme(spacing.8)]">
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Primary Contact</TableHeader>
            <TableHeader>Number of People</TableHeader>
            <TableHeader className="relative w-0">
              <span className="sr-only">Actions</span>
            </TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {households.map((household) => (
            <TableRow key={household.id}>
              <TableCell>{household.name}</TableCell>
              <TableCell>
                {household.primaryContact?.fullName ? (
                  <TextLink
                    href={`/people/directory/${household.primaryContactId}`}
                  >
                    {household.primaryContact?.fullName}
                  </TextLink>
                ) : (
                  "N/A"
                )}
              </TableCell>
              <TableCell>{household.people.length}</TableCell>
              <TableCell>
                <div className="-mx-3 -my-1.5 sm:-mx-2.5">
                  <Dropdown>
                    <DropdownButton plain aria-label="More options">
                      <EllipsisHorizontalIcon />
                    </DropdownButton>
                    <DropdownMenu anchor="bottom end">
                      <DropdownItem href={`/people/households/${household.id}`}>
                        View
                      </DropdownItem>
                      <DropdownItem
                        href={`/people/households/${household.id}/edit`}
                      >
                        Edit
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {households.length === 0 && (
        <Text className="mt-2">No households in database</Text>
      )}
    </>
  );
}
