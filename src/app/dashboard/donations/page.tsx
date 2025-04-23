"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { featuredDonations } from "@/app/data/site-data";

export default function DonationsDashboard() {
  const [donations] = useState(featuredDonations);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Donations Management</h1>
        <Link href="/dashboard/donations/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add New Donation
          </Button>
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Raised</TableHead>
              <TableHead>Goal</TableHead>
              <TableHead className="w-[100px]">% Funded</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {donations.map((donation) => (
              <TableRow key={donation.id}>
                <TableCell className="font-medium">
                  {donation.id.slice(0, 8)}
                </TableCell>
                <TableCell>{donation.title}</TableCell>
                <TableCell>{donation.category}</TableCell>
                <TableCell>{donation.raised}</TableCell>
                <TableCell>{donation.goal}</TableCell>
                <TableCell>{donation.percentFunded}%</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/dashboard/donations/edit/${donation.id}`}>
                      <Button size="sm">Edit</Button>
                    </Link>
                    <Button size="sm">Delete</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
