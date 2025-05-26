'use client';

import type React from 'react';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function NewDonation() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const formData = new FormData();

  // For preview display
  const [previewData, setPreviewData] = useState({
    title: '',
    subTitle: '',
    statusLabel: '',
    category: '',
    expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    targetFunding: '',
    description: '',
    currency: 'catmoggy',
  });

  const [previewMode, setPreviewMode] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Update preview goal
    setPreviewData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setPreviewData((prev) => ({
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
      setImgSrc(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send data to the API endpoint
      for (const key in previewData) {
        formData.append(key, previewData[key as keyof typeof previewData] as never);
      }
      if (selectedFile) {
        formData.append('file', selectedFile);
      }

      const res = await axios.post('/api/admin/funding-projects', formData);
      console.log('Api res:', res);

      if (res.status !== 201) {
        throw new Error('Failed to create project, internal server error.');
      }

      toast.success('Funding project created successfully!');
      setTimeout(() => {
        router.push('/dashboardzzz/donations');
      }, 2000);
    } catch (error) {
      console.error('Error creating project:', error);

      let errorMessage = 'Failed to create project';
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.detail || error.response.data.error || errorMessage;
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const [imgSrc, setImgSrc] = useState('https://placehold.co/400x200.png?text=Banner+Image');

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <Link href="/dashboardzzz/donations" className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to donations
        </Link>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Add New Funding Project</h1>
        <Button
          onClick={() => {
            setPreviewMode(!previewMode);
          }}
        >
          {previewMode ? 'Edit Mode' : 'Preview Mode'}
        </Button>
      </div>

      {previewMode ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="w-full">
            <CardHeader className="relative">
              <div className="aspect-video rounded-t-lg overflow-hidden bg-gray-100 mb-2">
                <Image
                  src={imgSrc}
                  alt="Banner Image"
                  width={400}
                  height={200}
                  className="w-full h-full object-cover"
                  onError={() => setImgSrc('/placeholder.svg?height=200&width=400')}
                />
              </div>
              {previewData.statusLabel && (
                <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-md text-sm font-bold">
                  {previewData.statusLabel}
                </div>
              )}
              <CardTitle>{previewData.title || 'Project Title'}</CardTitle>
              <CardDescription>
                {previewData.category || 'Category'} • {previewData.subTitle || 'Subtitle'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">{previewData.description || 'Project description goes here'}</p>
              <div className="space-y-2">
                <Progress value={0} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span>{0}</span> {/* Raised amount*/}
                  <span> {`raised of ${previewData.targetFunding} ${previewData.currency}`}</span>
                </div>
                <div className="text-sm text-gray-500">0% funded</div>
                <div className="text-sm text-gray-500">
                  Expires: {new Date(previewData.expiredDate).toLocaleDateString()}
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
                  value={previewData.title}
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
                  value={previewData.subTitle}
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
                  value={previewData.category}
                  onChange={handleChange}
                  placeholder="Enter category"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="imageUrl">Banner Image *</Label>
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
                <Label htmlFor="statusLabel">Status Label *</Label>
                <Input
                  id="statusLabel"
                  name="statusLabel"
                  value={previewData.statusLabel}
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
                  value={previewData.expiredDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="currency">Currency *</Label>

                <Select onValueChange={handleSelectChange('currency')} name="currency" value={previewData.currency}>
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
                  value={previewData.targetFunding}
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
              value={previewData.description}
              onChange={handleChange}
              placeholder="Enter project description"
              rows={5}
              required
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Project'}
            </Button>
            <Button type="button" onClick={() => router.push('/dashboard/donations')} disabled={loading}>
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
