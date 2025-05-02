"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";

export default function NewDonation() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    statusLabel: "Active",
    category: "",
    imageUrl: "",
    expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    targetFunding: 0,
    description: "",
    currency: "catmoggy",
  });

  // For preview display
  const [previewData, setPreviewData] = useState({
    raised: "$0",
    goal: "$0",
    percentFunded: 0,
    badgeText: "",
  });

  const [previewMode, setPreviewMode] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "targetFunding") {
      // Convert string to number for targetFunding
      setFormData((prev) => ({
        ...prev,
        [name]: Number.parseFloat(value) || 0,
      }));

      // Update preview goal
      setPreviewData((prev) => ({
        ...prev,
        goal: `$${value}`,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      // Update preview data for specific fields
      if (name === "statusLabel") {
        setPreviewData((prev) => ({
          ...prev,
          badgeText: value,
        }));
      }
    }
  };

  const handleCurrencyChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      currency: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send data to the API endpoint

      await axios.post("/api/funding-projects", formData);

      toast.success("Berhasil Membuat Donasi Baru");

      // Navigate back to the donations dashboard
      router.push("/dashboardzzz/donations");
    } catch (error) {
      console.error("Error creating project:", error);

      let errorMessage = "Failed to create project";
      if (axios.isAxiosError(error) && error.response) {
        errorMessage =
          error.response.data.detail ||
          error.response.data.error ||
          errorMessage;
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const [imgSrc, setImgSrc] = useState("/placeholder.svg?height=200&width=400");

  // Update image preview when URL changes
  const updateImagePreview = () => {
    if (formData.imageUrl) {
      setImgSrc(formData.imageUrl);
    } else {
      setImgSrc("/placeholder.svg?height=200&width=400");
    }
  };

  return (
    <div className="space-y-6">
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
        <h1 className="text-3xl font-bold">Add New Funding Project</h1>
        <Button
          onClick={() => {
            updateImagePreview();
            setPreviewMode(!previewMode);
          }}
        >
          {previewMode ? "Edit Mode" : "Preview Mode"}
        </Button>
      </div>

      {previewMode ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="w-full">
            <CardHeader className="relative">
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
              {formData.statusLabel && (
                <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-md text-sm font-bold">
                  {formData.statusLabel}
                </div>
              )}
              <CardTitle>{formData.title || "Project Title"}</CardTitle>
              <CardDescription>
                {formData.category || "Category"} •{" "}
                {formData.subTitle || "Subtitle"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                {formData.description || "Project description goes here"}
              </p>
              <div className="space-y-2">
                <Progress value={previewData.percentFunded} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span>{previewData.raised}</span>
                  <span>raised of ${formData.targetFunding}</span>
                </div>
                <div className="text-sm text-gray-500">
                  {previewData.percentFunded}% funded
                </div>
                <div className="text-sm text-gray-500">
                  Expires: {new Date(formData.expiredDate).toLocaleDateString()}
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
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter project title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="subTitle">Subtitle *</Label>
                <Input
                  id="subTitle"
                  name="subTitle"
                  value={formData.subTitle}
                  onChange={handleChange}
                  placeholder="Enter subtitle"
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
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
                <Label htmlFor="imageUrl">Image URL *</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="statusLabel">Status Label *</Label>
                <Input
                  id="statusLabel"
                  name="statusLabel"
                  value={formData.statusLabel}
                  onChange={handleChange}
                  placeholder="E.g., Active, Urgent, etc."
                  required
                />
              </div>

              <div>
                <Label htmlFor="expiredDate">Expiry Date *</Label>
                <Input
                  id="expiredDate"
                  name="expiredDate"
                  type="date"
                  value={formData.expiredDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="currency">Currency *</Label>

                <Select
                  value={formData.currency}
                  onValueChange={handleCurrencyChange}
                >
                  <SelectTrigger className="w-full bg-transparent">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Currency</SelectLabel>
                      <SelectItem value="catmoggy">Catmoggy</SelectItem>
                      <SelectItem value="sol">Sol</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-4">
                <Label htmlFor="targetFunding">Target Funding Amount *</Label>
                <Input
                  id="targetFunding"
                  name="targetFunding"
                  type="number"
                  min="1"
                  value={formData.targetFunding}
                  onChange={handleChange}
                  placeholder="E.g., 10000"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter project description"
              rows={5}
              required
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Project"}
            </Button>
            <Button
              type="button"
              onClick={() => router.push("/dashboard/donations")}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
