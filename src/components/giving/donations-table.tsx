import dayjs from "dayjs";
import { NumericFormat } from "react-number-format";
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

import { Donation } from "@/lib/types";

export function DonationsTable({ donations }: { donations: Donation[] }) {
  return (
    <>
      <Table className="sm:[--gutter:theme(spacing.8)]">
        <TableHead>
          <TableRow>
            <TableHeader>Date</TableHeader>
            <TableHeader>Amount</TableHeader>
            <TableHeader>Fund</TableHeader>
            <TableHeader>Donor</TableHeader>
            <TableHeader>Logged By</TableHeader>
            <TableHeader className="relative w-0">
              <span className="sr-only">Actions</span>
            </TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {donations.map((donation) => (
            <TableRow key={donation.id}>
              <TableCell>
                {donation.date
                  ? dayjs(donation.date, "YYYY-MM-DD").format("MM/DD/YYYY")
                  : "N/A"}
              </TableCell>
              <TableCell>
                {donation.amount ? (
                  <NumericFormat
                    value={`${donation.amount}`}
                    thousandsGroupStyle="thousand"
                    thousandSeparator=","
                    displayType="text"
                    decimalScale={2}
                    fixedDecimalScale
                    renderText={(value) => `$${value}`}
                  />
                ) : (
                  "N/A"
                )}
              </TableCell>
              <TableCell>
                {donation.fund
                  ? donation.fund[0] + donation.fund.slice(1).toLowerCase()
                  : "N/A"}
              </TableCell>
              <TableCell>
                {donation.Person ? (
                  <TextLink href={`/people/directory/${donation.personId}`}>
                    {donation.Person.fullName}
                  </TextLink>
                ) : (
                  "N/A"
                )}
              </TableCell>
              <TableCell>
                {donation.loggedBy ? donation.loggedBy : "N/A"}
              </TableCell>
              <TableCell>
                <div className="-mx-3 -my-1.5 sm:-mx-2.5">
                  <Dropdown>
                    <DropdownButton plain aria-label="More options">
                      <EllipsisHorizontalIcon />
                    </DropdownButton>
                    <DropdownMenu anchor="bottom end">
                      <DropdownItem href={`/giving/donations/${donation.id}`}>
                        View
                      </DropdownItem>
                      <DropdownItem
                        href={`/giving/donations/${donation.id}/edit`}
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
      {donations.length === 0 && (
        <Text className="mt-2">No donations in database</Text>
      )}
    </>
  );
}
