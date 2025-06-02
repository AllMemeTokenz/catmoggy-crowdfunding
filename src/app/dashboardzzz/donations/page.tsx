"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Loader, Plus, SearchX } from "lucide-react";
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
import formatNumber from "@/utils/formatNumber";

type Donation = {
  _id?: string;
  id?: string;
  title?: string;
  category?: string;
  currentFunding?: number;
  targetFunding?: number;
  currency?: string;
  // properti lain sesuai kebutuhan
};

export default function DonationsDashboard() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState('');

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/admin/funding-projects");
        setLoading(false);
        const data = response.data.data || response.data;
        setDonations(data);
      } catch (error) {
        console.error("Failed to fetch donations:", error);
        toast.error("Failed to fetch donations. Please try again later.");
      }
    };

    fetchDonations();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.patch(`/api/admin/funding-projects/delete/${id}`);
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

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Loader className="animate-spin h-5 w-5 text-gray-500 " />
        <p className="text-center text-gray-500 mt-2">Loading</p>
      </div>
    );

  return (
    <div className="space-y-6 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Donations Management</h1>
        <Link href="/dashboardzzz/donations/new" className="cursor-pointer">
          <Button className="cursor-pointer">
            <Plus className=" h-4 w-4" /> New Funding Project
          </Button>
        </Link>
      </div>

      {donations.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          {/* <Loader className="animate-spin h-5 w-5 text-gray-500 " /> */}
          <SearchX className="h-12 w-12 text-gray-500" />
          <p className="text-center text-gray-800 mt-2 font-semibold">
            No data found
          </p>
          <p className="text-center text-gray-500">
            Get started by creating a new funding project.
          </p>
        </div>
      ) : (
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">#</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Raised</TableHead>
                <TableHead>Goal</TableHead>
                <TableHead className="w-[110px]">Funded (%)</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donations.map((donation, index) => (
                <TableRow key={donation._id || donation.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{donation.title || "Untitled"}</TableCell>
                  <TableCell>{donation.category || "Uncategorized"}</TableCell>
                  <TableCell>{`${donation.currentFunding || 0} ${
                    donation.currency
                  }`}</TableCell>
                  <TableCell>{`${formatNumber(donation.targetFunding || 0)} ${
                    donation.currency
                  }`}</TableCell>
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
                        href={`/dashboardzzz/donations/donors/${
                          donation._id || donation.id
                        }`}
                      >
                        <Button size="sm" className="bg-zinc-100">
                          Detail Donors
                        </Button>
                      </Link>
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
      )}
    </div>
  );
}
