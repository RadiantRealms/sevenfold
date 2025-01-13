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

import { Person } from "@/lib/types";

export function PeopleTable({ people }: { people: Person[] }) {
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
          {people.map((person) => (
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
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {people.length === 0 && (
        <Text className="mt-2">No people in directory</Text>
      )}
    </>
  );
}
