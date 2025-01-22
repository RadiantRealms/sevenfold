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

import { QueriedPerson } from "@/lib/types";

export function SearchTable({ people }: { people: QueriedPerson[] }) {
  return (
    <>
      <Table className="sm:[--gutter:theme(spacing.8)]">
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Household</TableHeader>
            <TableHeader>Phone Number</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader className="relative w-0">
              <span className="sr-only">Actions</span>
            </TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {people.map((person) => (
            <TableRow key={person.id}>
              <TableCell>
                <TextLink href={`/people/directory/${person.id}`}>
                  {person.fullName}
                </TextLink>
              </TableCell>
              <TableCell>
                {person.Household?.id ? (
                  <TextLink href={`/people/households/${person.Household?.id}`}>
                    {person.Household?.name}
                  </TextLink>
                ) : (
                  "N/A"
                )}
              </TableCell>
              <TableCell>{person.phone ? person.phone : "N/A"}</TableCell>
              <TableCell>{person.email ? person.email : "N/A"}</TableCell>
              <TableCell>
                <div className="-mx-3 -my-1.5 sm:-mx-2.5">
                  <Dropdown>
                    <DropdownButton plain aria-label="More options">
                      <EllipsisHorizontalIcon />
                    </DropdownButton>
                    <DropdownMenu anchor="bottom end">
                      <DropdownItem href={`/people/directory/${person.id}`}>
                        View Profile
                      </DropdownItem>
                      <DropdownItem
                        href={`/giving/reports/donors/${person.id}`}
                      >
                        View Donations
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {people.length === 0 && <Text className="mt-2">No people found</Text>}
    </>
  );
}
