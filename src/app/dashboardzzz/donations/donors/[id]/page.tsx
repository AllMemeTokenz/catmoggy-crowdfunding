"use client";

import type React from "react";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function EditDonation({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;

  const router = useRouter();

  const [formData, setFormData] = useState({
    id: "",
    imageUrl: "",
    category: "",
    title: "",
    description: "",
    raised: "",
    goal: "",
    percentFunded: 0,
    badgeText: "",
  });

  const [previewMode, setPreviewMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState("/placeholder.svg");

  // New state for donor form
  const [donorForm, setDonorForm] = useState({
    donor: "",
    amount: "",
    receipt: "",
    currency: "",
  });

  const [donorSubmitting, setDonorSubmitting] = useState(false);

  // New state for donor data table
  const [donors, setDonors] = useState<
    {
      donor: string;
      amount: number;
      receipt: string;
      currency: string;
      _id?: string;
    }[]
  >([]);

  const [donorsLoading, setDonorsLoading] = useState(true);

  useEffect(() => {
    const fetchDonationById = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/admin/funding-projects/${id}`
        );
        const apiData = response.data.data || response.data;

        setFormData({
          id: apiData._id || apiData.id || id,
          imageUrl: apiData.imageUrl || "",
          category: apiData.category || "",
          title: apiData.title || "",
          description: apiData.description || "",
          raised: `$${apiData.currentFunding || 0}`,
          goal: `$${apiData.targetFunding || 0}`,
          percentFunded: apiData.targetFunding
            ? Math.min(
                Math.round(
                  ((apiData.currentFunding || 0) / apiData.targetFunding) * 100
                ),
                100
              )
            : 0,
          badgeText: apiData.statusLabel || apiData.badgeText || "",
        });

        if (apiData.imageUrl) {
          setImgSrc(apiData.imageUrl);
        } else {
          setImgSrc("/placeholder.svg");
        }
      } catch (error) {
        console.error("Error fetching donation data:", error);
        setFormData({
          id: "",
          imageUrl: "",
          category: "",
          title: "",
          description: "",
          raised: "",
          goal: "",
          percentFunded: 0,
          badgeText: "",
        });
        setImgSrc("/placeholder.svg");
      } finally {
        setLoading(false);
      }
    };

    fetchDonationById();
  }, [id]);

  // Fetch donor data for the table
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        setDonorsLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/admin/funding-projects/donations/${id}`
        );
        // Assuming response.data is an array of donor objects
        setDonors(response.data || []);
      } catch (error) {
        console.error("Error fetching donors:", error);
        setDonors([]);
      } finally {
        setDonorsLoading(false);
      }
    };

    fetchDonors();
  }, [id]);

  const handleDonorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDonorForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDonorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDonorSubmitting(true);
    try {
      const payload = {
        donor: donorForm.donor,
        amount: Number(donorForm.amount),
        receipt: donorForm.receipt,
        currency: donorForm.currency,
      };

      await axios.post(
        `http://localhost:3000/api/admin/funding-projects/donations/${id}`,
        payload
      );
      toast.success("Donor data submitted successfully");
      // Reset donor form
      setDonorForm({
        donor: "",
        amount: "",
        receipt: "",
        currency: "",
      });
      // Refresh donor list after submission
      const refreshed = await axios.get(
        `http://localhost:3000/api/admin/funding-projects/donations/${id}`
      );
      setDonors(refreshed.data || []);
    } catch (error) {
      console.error("Failed to submit donor data:", error);
      toast.error("Failed to submit donor data");
    } finally {
      setDonorSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Toaster />
      <div className="mb-6">
        <Link
          href="/dashboardzzz/donations"
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to donations
        </Link>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Detail Donors</h1>
      </div>

      <div className="space-y-8 max-w-8xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title Funding Project</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                placeholder="Enter donation title"
                required
                disabled
              />
            </div>
          </div>
        </div>

        <hr className="my-8" />

        {/* Donor Data Table */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Donor List</h2>
          {donorsLoading ? (
            <p>Loading donors...</p>
          ) : donors.length === 0 ? (
            <p>No donors found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Donor</TableHead>
                  <TableHead>Receipt</TableHead>
                  <TableHead>Currency</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {donors.map((donor, index) => (
                  <TableRow key={donor._id || index}>
                    <TableCell className="font-base">{donor.donor}</TableCell>
                    <TableCell>{donor.receipt}</TableCell>
                    <TableCell>{donor.currency}</TableCell>
                    <TableCell className="text-right">{`${donor.amount.toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}`}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right">
                    {donors
                      .reduce((acc, curr) => acc + curr.amount, 0)
                      .toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          )}
        </div>

        <hr className="my-8" />

        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold mb-4">Add Donor</h2>
          <form onSubmit={handleDonorSubmit} className="space-y-6">
            <div>
              <Label htmlFor="donor">Donor Name</Label>
              <Input
                id="donor"
                name="donor"
                value={donorForm.donor}
                onChange={handleDonorChange}
                placeholder="Enter donor name"
                required
              />
            </div>

            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                min="0"
                value={donorForm.amount}
                onChange={handleDonorChange}
                placeholder="Enter donation amount"
                required
              />
            </div>

            <div>
              <Label htmlFor="receipt">Receipt</Label>
              <Input
                id="receipt"
                name="receipt"
                value={donorForm.receipt}
                onChange={handleDonorChange}
                placeholder="Enter receipt string"
                required
              />
            </div>

            <div>
              <Label htmlFor="currency">Currency</Label>
              <Input
                id="currency"
                name="currency"
                value={donorForm.currency}
                onChange={handleDonorChange}
                placeholder="Enter currency"
                required
              />
            </div>

            <div>
              <Button type="submit" disabled={donorSubmitting}>
                {donorSubmitting ? "Submitting..." : "Submit Donor"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
