"use client";

import { useState, useEffect, use } from "react";
import { ArrowLeft, Share2, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { featuredDonations, type DonationCardData } from "@/app/data/site-data";

export default function DonationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Unwrap the params Promise using React.use()
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;

  const [donation, setDonation] = useState<DonationCardData | null>(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the donation with the matching ID
    const foundDonation = featuredDonations.find((d) => d.id === id);

    if (foundDonation) {
      setDonation(foundDonation);
      setTimeout(() => setProgress(foundDonation.percentFunded), 500);
    }

    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <section className="w-full py-10 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-xl">Loading...</div>
          </div>
        </div>
      </section>
    );
  }

  if (!donation) {
    return (
      <section className="w-full py-10 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-xl">Donation not found</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-10 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-6">
          <Link
            href="/donation"
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to donations
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Image and Details */}
          <div className="lg:col-span-2">
            <div className="relative mb-6">
              <Image
                src={donation.imageUrl || "/placeholder.svg"}
                alt={donation.title}
                width={800}
                height={500}
                className="w-full rounded-lg object-cover max-h-[500px]"
              />
              {donation.badgeText && (
                <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-md text-sm font-bold">
                  {donation.badgeText}
                </div>
              )}
            </div>

            <Tabs defaultValue="about" className="w-full">
              <TabsList className="w-full mb-6">
                <TabsTrigger value="about" className="flex-1">
                  About
                </TabsTrigger>
                <TabsTrigger value="updates" className="flex-1">
                  Updates
                </TabsTrigger>
                <TabsTrigger value="comments" className="flex-1">
                  Comments
                </TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    About this project
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {donation.description}
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam auctor, nisl eget ultricies tincidunt, nisl nisl
                    aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam
                    auctor, nisl eget ultricies tincidunt, nisl nisl aliquam
                    nisl, eget ultricies nisl nisl eget nisl.
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    Nullam auctor, nisl eget ultricies tincidunt, nisl nisl
                    aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam
                    auctor, nisl eget ultricies tincidunt, nisl nisl aliquam
                    nisl, eget ultricies nisl nisl eget nisl.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3">Features</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Feature 1: Lorem ipsum dolor sit amet</li>
                    <li>Feature 2: Consectetur adipiscing elit</li>
                    <li>Feature 3: Nullam auctor, nisl eget ultricies</li>
                    <li>Feature 4: Tincidunt, nisl nisl aliquam nisl</li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="updates" className="space-y-6">
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
              </TabsContent>

              <TabsContent value="comments" className="space-y-6">
                <div className="space-y-6">
                  <div className="border-b pb-6">
                    <div className="flex items-center mb-2">
                      <div className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center mr-3">
                        <span className="font-bold">J</span>
                      </div>
                      <div>
                        <h4 className="font-bold">John Doe</h4>
                        <p className="text-sm text-gray-500">3 days ago</p>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      This looks amazing! I can&apos;t wait to receive mine.
                      When do you expect shipping to start?
                    </p>
                  </div>

                  <div className="border-b pb-6">
                    <div className="flex items-center mb-2">
                      <div className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center mr-3">
                        <span className="font-bold">S</span>
                      </div>
                      <div>
                        <h4 className="font-bold">Sarah Smith</h4>
                        <p className="text-sm text-gray-500">1 week ago</p>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      Just backed this project! The features look incredible,
                      especially the battery life.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Donation Info */}
          <div className="lg:col-span-1">
            <div className="border border-gray-200 rounded-lg p-6 sticky top-6">
              <h1 className="text-2xl font-bold mb-2">{donation.title}</h1>
              <p className="text-gray-600 mb-6">{donation.description}</p>

              <div className="mb-4">
                <Progress value={progress} className="h-2" />
              </div>

              <div className="flex justify-between items-center mb-6">
                <div className="text-2xl font-bold">{donation.raised}</div>
                <div className="text-sm text-gray-600">
                  {donation.goal && <span>of {donation.goal}</span>}
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="text-sm text-gray-600">
                  {donation.percentFunded}% funded
                </div>
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

              <div>
                <h3 className="font-bold mb-4">Donation Tiers</h3>

                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-400 cursor-pointer transition-colors">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-bold">Basic Supporter</h4>
                      <span className="font-bold">$25</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Get a thank you email and your name on our supporters
                      page.
                    </p>
                    <p className="text-xs text-gray-500">
                      Estimated delivery: December 2025
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-400 cursor-pointer transition-colors">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-bold">Early Bird Special</h4>
                      <span className="font-bold">$99</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Get the product at a special early bird price - 20% off
                      retail!
                    </p>
                    <p className="text-xs text-gray-500">
                      Estimated delivery: December 2025
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-400 cursor-pointer transition-colors">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-bold">Premium Package</h4>
                      <span className="font-bold">$250</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Get the product plus exclusive accessories and priority
                      shipping.
                    </p>
                    <p className="text-xs text-gray-500">
                      Estimated delivery: November 2025
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
