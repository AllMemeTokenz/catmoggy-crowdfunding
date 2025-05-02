"use client";

import { useState, useEffect } from "react";
import axios from "axios";
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
import { toast } from "react-hot-toast";

type Donation = {
  _id?: string;
  id?: string;
  title?: string;
  category?: string;
  currentFunding?: number;
  targetFunding?: number;
  // properti lain sesuai kebutuhan
};

export default function DonationsDashboard() {
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get("/api/funding-projects");
        const data = response.data.data || response.data;
        setDonations(data);
      } catch (error) {
        console.error("Failed to fetch donations:", error);
      }
    };

    fetchDonations();
  }, []);

  // const handleDelete = async (id: string) => {
  //   try {
  //     await axios.patch(`/api/funding-projects/delete/${id}`);
  //     setDonations((prev) =>
  //       prev.filter((donation) => (donation._id || donation.id) !== id)
  //     );
  //     toast.success("Data Donasi Berhasil Dihapus!");
  //   } catch (error) {
  //     console.error("Failed to delete donation:", error);
  //     toast.error("Data Donasi Gagal Dihapus! Silakan coba lagi.");
  //   }
  // };
  const handleDelete = async (id: string) => {
    try {
      await axios.patch(`/api/funding-projects/delete/${id}`);
      setDonations((prev) =>
        prev.filter((donation) => (donation._id || donation.id) !== id)
      );
      toast.success("Data Donasi Berhasil Dihapus!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error response:", error.response);
      } else {
        console.error(error);
      }
      toast.error("Data Donasi Gagal Dihapus! Silakan coba lagi.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Donations Management</h1>
        <Link href="/dashboardzzz/donations/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add New Donation
          </Button>
        </Link>
      </div>

      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Raised</TableHead>
              <TableHead>Goal</TableHead>
              <TableHead className="w-[110px]">Funded (%)</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {donations.map((donation) => (
              <TableRow key={donation._id || donation.id}>
                <TableCell className="font-medium">
                  {(donation._id || donation.id)?.slice(0, 8)}
                </TableCell>
                <TableCell>{donation.title || "Untitled"}</TableCell>
                <TableCell>{donation.category || "Uncategorized"}</TableCell>
                <TableCell>${donation.currentFunding || 0}</TableCell>
                <TableCell>${donation.targetFunding || 0}</TableCell>
                <TableCell>
                  {donation.targetFunding
                    ? Math.min(
                        Math.round(
                          ((donation.currentFunding || 0) /
                            donation.targetFunding) *
                            100
                        ),
                        100
                      )
                    : 0}
                  %
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/dashboardzzz/donations/edit/${
                        donation._id || donation.id
                      }`}
                    >
                      <Button size="sm" className="bg-amber-500">
                        Edit
                      </Button>
                    </Link>
                    <Button
                      id={donation._id || donation.id}
                      size="sm"
                      className="bg-red-500"
                      onClick={(event) => {
                        const id = event.currentTarget.id;
                        if (id) {
                          handleDelete(id);
                        }
                      }}
                    >
                      Delete
                    </Button>
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
