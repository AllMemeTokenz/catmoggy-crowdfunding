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
import { Textarea } from "@/components/ui/textarea";
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

  useEffect(() => {
    const fetchDonationById = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/funding-projects/${id}`
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
        // Biarkan formData kosong agar user bisa isi manual
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "imageUrl" && value) {
      setImgSrc(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Persiapkan data yang akan dikirim, hapus simbol $ pada nilai uang
      const payload = {
        imageUrl: formData.imageUrl,
        category: formData.category,
        title: formData.title,
        description: formData.description,
        currentFunding: Number(formData.raised.replace(/[^0-9.-]+/g, "")),
        targetFunding: Number(formData.goal.replace(/[^0-9.-]+/g, "")),
        percentFunded: formData.percentFunded,
        badgeText: formData.badgeText,
      };

      await axios.patch(
        `http://localhost:3000/api/funding-projects/${id}`,
        payload
      );
      toast.success("Update Data Donasi Berhasil");
      router.push("/dashboardzzz/donations");
    } catch (error) {
      console.error("Failed to update donation:", error);
      toast.error("Update Data Donasi Gagal");
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
        <h1 className="text-3xl font-bold">Edit Donation</h1>
        <Button onClick={() => setPreviewMode(!previewMode)}>
          {previewMode ? "Edit Mode" : "Preview Mode"}
        </Button>
      </div>

      {previewMode ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="w-full">
            <CardHeader className="relative">
              {formData.imageUrl && (
                <div className="aspect-video rounded-t-lg overflow-hidden bg-gray-100 mb-2">
                  <Image
                    src={imgSrc || "/placeholder.svg"}
                    alt={formData.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover"
                    onError={() =>
                      setImgSrc("/placeholder.svg?height=200&width=400")
                    }
                  />
                </div>
              )}
              {!formData.imageUrl && (
                <div className="aspect-video rounded-t-lg overflow-hidden bg-gray-100 mb-2 flex items-center justify-center">
                  <span className="text-gray-400">No Image Provided</span>
                </div>
              )}
              {formData.badgeText && (
                <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-md text-sm font-bold">
                  {formData.badgeText}
                </div>
              )}
              <CardTitle>{formData.title || "Donation Title"}</CardTitle>
              <CardDescription>
                {formData.category || "Category"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                {formData.description || "Donation description goes here"}
              </p>
              <div className="space-y-2">
                <Progress value={formData.percentFunded} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span>{formData.raised}</span>
                  <span>raised of {formData.goal}</span>
                </div>
                <div className="text-sm text-gray-500">
                  {formData.percentFunded}% funded
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Donate Now</Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter donation title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Enter category"
                  required
                />
              </div>

              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                />
              </div>

              <div>
                <Label htmlFor="badgeText">Badge Text (Optional)</Label>
                <Input
                  id="badgeText"
                  name="badgeText"
                  value={formData.badgeText || ""}
                  onChange={handleChange}
                  placeholder="E.g., Featured, Urgent, etc."
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="raised">Raised Amount</Label>
                <Input
                  id="raised"
                  name="raised"
                  value={formData.raised}
                  onChange={handleChange}
                  placeholder="E.g., $1,000"
                  required
                />
              </div>

              <div>
                <Label htmlFor="goal">Goal Amount</Label>
                <Input
                  id="goal"
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  placeholder="E.g., $10,000"
                  required
                />
              </div>

              <div>
                <Label htmlFor="percentFunded">Percent Funded</Label>
                <Input
                  id="percentFunded"
                  name="percentFunded"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.percentFunded}
                  onChange={handleChange}
                  placeholder="E.g., 25"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter donation description"
              rows={5}
              required
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit">Update Donation</Button>
            <Button
              type="button"
              onClick={() => router.push("/dashboard/donations")}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
