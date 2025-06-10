'use client';

import React, { useState, useEffect, use } from 'react';
import { ArrowLeft, Share2, Heart } from 'lucide-react';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import axios from 'axios';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Define the DonationData interface
interface DonationData {
  id: string;
  image: string;
  imageVersion: string;
  category: string;
  title: string;
  subTitle: string;
  description: string;
  raised: string;
  percentFunded: number;
  badgeText?: string;
  goal?: string;
}
interface DonationRecord {
  donor: string;
  amount: number;
  receipt: string;
  currency: string;
}

// Calculate percentage helper function
const calculatePercentage = (current: number, target: number) => {
  if (target === 0) return 0;
  return Math.min(Math.round((current / target) * 100), 100);
};

export default function DonationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap the params Promise using React.use()
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;

  const [donation, setDonation] = useState<DonationData | null>(null);
  const [donationRecords, setDonationRecords] = useState<DonationRecord[]>([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDonationDetails = async () => {
      try {
        // Use absolute URL to avoid issues with relative path
        const response = await axios.get(`http://localhost:3000/api/pub/funding-projects/${id}`);

        let donationData = null;

        if (response.data && typeof response.data === 'object') {
          const item = response.data.data;
          donationData = {
            id: item._id || item.id || id,
            image: item.image || '',
            imageVersion: item.imageVersion || '',
            category: item.category || 'Uncategorized',
            title: item.title || 'Untitled Donation',
            subTitle: item.subTitle || 'No subtitle available',
            description: item.description || 'No description available',
            raised: `$${item.currentFunding || 0}`,
            percentFunded: calculatePercentage(item.currentFunding || 0, item.targetFunding || 1),
            badgeText: item.statusLabel || 'ACTIVE',
            goal: `$${item.targetFunding || 0}`,
          };
        }

        if (donationData) {
          setDonation(donationData);
          setTimeout(() => setProgress(donationData.percentFunded), 500);
        } else {
          setError('Could not find donation details');
        }

        const donorsResponse = await axios.get(`http://localhost:3000/api/admin/funding-projects/donations/${id}`);

        if (donorsResponse.data && Array.isArray(donorsResponse.data.data)) {
          setDonationRecords(donorsResponse.data.data);
        } else {
          setDonationRecords([]);
        }
      } catch (err) {
        console.error('Error fetching donation details:', err);
        setError('Failed to load donation details');
      } finally {
        setLoading(false);
      }
    };

    fetchDonationDetails();
  }, [id]);

  if (loading) {
    return (
      <section className="w-full py-10 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-xl animate-pulse">Loading...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !donation) {
    return (
      <section className="w-full py-10 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-6">
            <Link href="/donation" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to donations
            </Link>
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="text-xl text-red-500">{error || 'Donation not found'}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-10 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-6">
          <Link href="/donation" className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to donations
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Image and Details */}
          <div className="lg:col-span-2">
            <div className="relative mb-6">
              <CldImage
                width={800}
                height={200}
                className="h-auto"
                src={`catmoggy-website/${donation.image}`}
                alt="Banner Image"
                sizes="100vw"
                version={donation.imageVersion}
                priority
              />
              {donation.badgeText && (
                <div className="absolute top-4 left-4 bg-slate-200 px-3 py-1 rounded-md text-sm font-bold">
                  {donation.badgeText}
                </div>
              )}
            </div>

            <Tabs defaultValue="about" className="w-full">
              <TabsList className="w-full mb-6">
                <TabsTrigger value="about" className="flex-1">
                  About
                </TabsTrigger>
                <TabsTrigger value="donors" className="flex-1">
                  Donors
                </TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">About this project</h2>
                  <p className="text-gray-700 leading-relaxed">{donation.description}</p>
                </div>

                {/* <div>
                  <h3 className="text-xl font-bold mb-3">Features</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Feature 1: Lorem ipsum dolor sit amet</li>
                    <li>Feature 2: Consectetur adipiscing elit</li>
                    <li>Feature 3: Nullam auctor, nisl eget ultricies</li>
                    <li>Feature 4: Tincidunt, nisl nisl aliquam nisl</li>
                  </ul>
                </div> */}
              </TabsContent>

              <TabsContent value="donors" className="space-y-6">
                {donationRecords.length === 0 ? (
                  <p className="text-gray-700">No donations yet. Be the first to support!</p>
                ) : (
                  donationRecords.map((record, index) => (
                    <div key={index} className="border-b pb-6">
                      <div className="flex items-center mb-2">
                        <div className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center mr-3">
                          <span className="font-bold">{record.donor.charAt(0).toUpperCase()}</span>
                        </div>
                        <div>
                          <h4 className="font-bold">{record.donor}</h4>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold mb-1">
                        Donated: {record.currency}
                        {record.amount.toFixed(2)}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Transaction: {record.receipt.substring(0, 8)}...
                        {record.receipt.substring(record.receipt.length - 4)}
                      </p>
                    </div>
                  ))
                )}
              </TabsContent>

              {/* <TabsContent value="donors" className="space-y-6">
                <div className="space-y-6">
                  <div className="border-b pb-6">
                    <div className="flex items-center mb-2">
                      <div className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center mr-3">
                        <span className="font-bold">A</span>
                      </div>
                      <div>
                        <h4 className="font-bold">Admin</h4>
                        <p className="text-sm text-gray-500">2 days ago</p>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      Project Update #3: Production Started!
                    </h3>
                    <p className="text-gray-700">
                      We&apos;re excited to announce that production has
                      officially started! Thank you to all our supporters for
                      making this possible.
                    </p>
                  </div>

                  <div className="border-b pb-6">
                    <div className="flex items-center mb-2">
                      <div className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center mr-3">
                        <span className="font-bold">A</span>
                      </div>
                      <div>
                        <h4 className="font-bold">Admin</h4>
                        <p className="text-sm text-gray-500">1 week ago</p>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      Project Update #2: Design Finalized
                    </h3>
                    <p className="text-gray-700">
                      We&apos;ve finalized the design and are ready to move to
                      production. Check out the latest renders attached to this
                      update!
                    </p>
                  </div>
                </div>
              </TabsContent> */}
            </Tabs>
          </div>

          {/* Right Column - Donation Info */}
          <div className="lg:col-span-1">
            <div className="border border-gray-200 rounded-lg p-6 sticky top-6">
              <h1 className="text-2xl font-bold mb-2">{donation.title}</h1>
              <p className="text-gray-600 mb-6">{donation.subTitle}</p>

              <div className="mb-4">
                <Progress value={progress} className="h-2" />
              </div>

              <div className="flex justify-between items-center mb-6">
                <div className="text-2xl font-bold">{donation.raised}</div>
                <div className="text-sm text-gray-600">{donation.goal && <span>of {donation.goal}</span>}</div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="text-sm text-gray-600">{donation.percentFunded}% funded</div>
                <div className="text-sm text-gray-600">30 days left</div>
              </div>

              <div className="space-y-4">
                <Button className="w-full text-lg py-6">Donate Now</Button>

                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Heart className="h-4 w-4 mr-2" />
                    Favorite
                  </Button>
                  <Button className="flex-1">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              <div className="h-px w-full bg-gray-200 my-6"></div>

              {/* <div>
                <h3 className="font-bold mb-4">Donation Tiers</h3>

                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-400 cursor-pointer transition-colors">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-bold">Basic Supporter</h4>
                      <span className="font-bold">$25</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Get a thank you email and your name on our supporters page.
                    </p>
                    <p className="text-xs text-gray-500">Estimated delivery: December 2025</p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-400 cursor-pointer transition-colors">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-bold">Early Bird Special</h4>
                      <span className="font-bold">$99</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Get the product at a special early bird price - 20% off retail!
                    </p>
                    <p className="text-xs text-gray-500">Estimated delivery: December 2025</p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-400 cursor-pointer transition-colors">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-bold">Premium Package</h4>
                      <span className="font-bold">$250</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Get the product plus exclusive accessories and priority shipping.
                    </p>
                    <p className="text-xs text-gray-500">Estimated delivery: November 2025</p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
