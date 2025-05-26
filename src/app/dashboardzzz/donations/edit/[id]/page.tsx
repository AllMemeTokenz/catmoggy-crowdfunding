'use client';

import type React from 'react';
import { useState, useEffect, use, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CldImage } from 'next-cloudinary';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function EditDonation({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;

  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    subTitle: '',
    category: '',
    image: '',
    imageVersion: '',
    description: '',
    statusLabel: '',
    expiredDate: '',
    currency: '',
    targetFunding: '',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const updateFormData = new FormData();

  useEffect(() => {
    const fetchDonationById = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/admin/funding-projects/${id}`);
        const apiData = response.data.data || response.data;

        setFormData({
          title: apiData.title || '',
          subTitle: apiData.subTitle || '',
          category: apiData.category || '',
          image: apiData.image || '',
          imageVersion: apiData.imageVersion || '',
          description: apiData.description || '',
          statusLabel: apiData.statusLabel || '',
          expiredDate: apiData.expiredDate || '',
          currency: apiData.currency || '',
          targetFunding: apiData.targetFunding || '',
        });
      } catch (error) {
        console.error('Error fetching donation data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonationById();
  }, [id]);

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const HandleUploadBtnClick = () => {
    fileInputRef.current?.click();
  };

  const handleImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateLoading(true);
    try {
      for (const key in formData) {
        updateFormData.append(key, formData[key as keyof typeof formData] as never);
      }

      if (selectedFile) {
        updateFormData.append('file', selectedFile);
      }

      const res = await axios.patch(`/api/admin/funding-projects/${id}`, updateFormData);

      if (!res.data.changed) {
        toast.error(res.data.message || 'No changes detected.');
        return;
      }

      toast.success('Update Data Donasi Berhasil');
      setTimeout(() => {
        router.push('/dashboardzzz/donations');
      }, 2000);
    } catch (error) {
      console.error('Failed to update donation:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update donation');
    } finally {
      setUpdateLoading(false);
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
        <Link href="/dashboardzzz/donations" className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to donations
        </Link>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Edit Donation</h1>
        <Button onClick={() => setPreviewMode(!previewMode)}>{previewMode ? 'Edit Mode' : 'Preview Mode'}</Button>
      </div>

      {previewMode ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="w-full">
            <CardHeader className="relative">
              <div className="aspect-video rounded-t-lg overflow-hidden bg-gray-100 mb-2">
                {selectedFile ? (
                  <Image
                    src={URL.createObjectURL(selectedFile)}
                    alt="Banner Image"
                    width={400}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <CldImage
                    width={400}
                    height={200}
                    src={`catmoggy-website/${formData.image}`}
                    alt="Banner Image"
                    sizes="100vw"
                    version={formData.imageVersion}
                  />
                )}
              </div>

              {!formData.image && (
                <div className="aspect-video rounded-t-lg overflow-hidden bg-gray-100 mb-2 flex items-center justify-center">
                  <span className="text-gray-400">No Image Provided</span>
                </div>
              )}
              {formData.statusLabel && (
                <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-md text-sm font-bold">
                  {formData.statusLabel}
                </div>
              )}
              <CardTitle>{formData.title || 'Donation Title'}</CardTitle>
              <CardDescription>{formData.category || 'Category'}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">{formData.description || 'Donation description goes here'}</p>
              <div className="space-y-2">
                <Progress value={0} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span>{0}</span>
                  <span>raised of {formData.targetFunding}</span>
                </div>
                <div className="text-sm text-gray-500">{0}% funded</div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Donate Now</Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
          <fieldset disabled={updateLoading} style={{ opacity: updateLoading ? 0.5 : 1 }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-7">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">
                    Title <span className="text-red-500">*</span>
                  </Label>
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
                  <Label htmlFor="title">
                    Subtitle <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.subTitle}
                    onChange={handleChange}
                    placeholder="Enter donation title"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Enter category"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="imageUrl">Change Banner Image</Label>
                  {selectedFile ? (
                    <span className="text-sm text-gray-500">{selectedFile.name}</span>
                  ) : (
                    <span className="text-sm text-gray-500">No file chosen</span>
                  )}
                  <Button type="button" onClick={HandleUploadBtnClick} className="max-w-30">
                    {selectedFile ? 'Change Image' : 'Upload Image'}
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImgUpload}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="goal">
                    Status Label <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="goal"
                    name="goal"
                    value={formData.statusLabel}
                    onChange={handleChange}
                    placeholder="E.g., $10,000"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="expiredDate">
                    Expiry Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="expiredDate"
                    name="expiredDate"
                    type="date"
                    value={formData.expiredDate?.split('T')[0] || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="currency">
                    Currency <span className="text-red-500">*</span>
                  </Label>

                  <Select onValueChange={handleSelectChange('currency')} name="currency" value={formData.currency}>
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

            <div className="flex gap-4 mt-2">
              <Button type="submit" disabled={updateLoading}>
                {updateLoading ? 'loading...' : 'Update Donation'}
              </Button>
              <Button type="button" onClick={() => router.push('/dashboard/donations')}>
                Cancel
              </Button>
            </div>
          </fieldset>
        </form>
      )}
    </div>
  );
}
