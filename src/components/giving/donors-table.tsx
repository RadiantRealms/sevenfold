import { NumericFormat } from "react-number-format";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../catalyst/table";
import { Text, TextLink } from "../catalyst/text";

import { Donor } from "@/lib/types";
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from "../catalyst/dropdown";
import { EllipsisHorizontalIcon } from "@heroicons/react/16/solid";

export function DonorsTable({ donors }: { donors: Donor[] }) {
  return (
    <>
      <Table className="sm:[--gutter:theme(spacing.8)]">
        <TableHead>
          <TableRow>
            <TableHeader>Full Name</TableHeader>
            <TableHeader>Household</TableHeader>
            <TableHeader>Number of Donations</TableHeader>
            <TableHeader>Total (All Time)</TableHeader>
            <TableHeader className="relative w-0">
              <span className="sr-only">Actions</span>
            </TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {donors.map((donor) => (
            <TableRow key={donor.personId}>
              <TableCell>
                <TextLink href={`/people/directory/${donor.personId}`}>
                  {donor.fullName}
                </TextLink>
              </TableCell>
              <TableCell>
                {donor.household ? (
                  <TextLink href={`/people/households/${donor.household.id}`}>
                    {donor.household.name}
                  </TextLink>
                ) : (
                  "N/A"
                )}
              </TableCell>
              <TableCell>{donor.totalDonations}</TableCell>
              <TableCell>
                <NumericFormat
                  value={`${donor.totalAmount}`}
                  thousandsGroupStyle="thousand"
                  thousandSeparator=","
                  displayType="text"
                  decimalScale={2}
                  fixedDecimalScale
                  renderText={(value) => `$${value}`}
                />
              </TableCell>
              <TableCell>
                <div className="-mx-3 -my-1.5 sm:-mx-2.5">
                  <Dropdown>
                    <DropdownButton plain aria-label="More options">
                      <EllipsisHorizontalIcon />
                    </DropdownButton>
                    <DropdownMenu anchor="bottom end">
                      <DropdownItem
                        href={`/giving/reports/donors/${donor.personId}`}
                      >
                        View Donor Report
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {donors.length === 0 && (
        <Text className="mt-2">No donors in database</Text>
      )}
    </>
  );
}
