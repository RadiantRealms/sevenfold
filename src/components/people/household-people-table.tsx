"use client";

import dayjs from "dayjs";
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
import { Text } from "../catalyst/text";

import { Household } from "@/lib/types";

export function HouseholdPeopleTable({
  household,
  removePerson,
}: {
  household: Household;
  removePerson: (personId: string) => Promise<void>;
}) {
  return (
    <>
      <Table className="sm:[--gutter:theme(spacing.8)]">
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Phone</TableHeader>
            <TableHeader>Join Date</TableHeader>
            <TableHeader className="relative w-0">
              <span className="sr-only">Actions</span>
            </TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {household.people.map((person) => (
            <TableRow key={person.id}>
              <TableCell>{person.fullName}</TableCell>
              <TableCell>{person.email ? person.email : "N/A"}</TableCell>
              <TableCell>{person.phone ? person.phone : "N/A"}</TableCell>
              <TableCell>
                {person.joinDate
                  ? dayjs(person.joinDate, "YYYY-MM-DD").format("MMMM DD, YYYY")
                  : "N/A"}
              </TableCell>
              <TableCell>
                <div className="-mx-3 -my-1.5 sm:-mx-2.5">
                  <Dropdown>
                    <DropdownButton plain aria-label="More options">
                      <EllipsisHorizontalIcon />
                    </DropdownButton>
                    <DropdownMenu anchor="bottom end">
                      <DropdownItem href={`/people/directory/${person.id}`}>
                        View
                      </DropdownItem>
                      <DropdownItem
                        href={`/people/directory/${person.id}/edit`}
                      >
                        Edit
                      </DropdownItem>
                      {household.primaryContactId == person.id ? (
                        false
                      ) : (
                        <DropdownItem onClick={() => removePerson(person.id)}>
                          Remove
                        </DropdownItem>
                      )}
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {household.people.length === 0 && (
        <Text className="mt-2">No people in household</Text>
      )}
    </>
  );
}
