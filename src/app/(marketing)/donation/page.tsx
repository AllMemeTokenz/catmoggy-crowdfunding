"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import DonationCard from "@/components/layout/donation-card";
import DonationFilter from "@/components/layout/donation-filter";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DonationCardData, ApiDonationItem } from "@/types/types"; // impor tipe

const calculatePercentage = (current: number, target: number) => {
  if (target === 0) return 0;
  return Math.min(Math.round((current / target) * 100), 100);
};

export default function DonationPage() {
  const [donations, setDonations] = useState<DonationCardData[]>([]);
  const [filteredDonations, setFilteredDonations] = useState<
    DonationCardData[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get("/api/pub/funding-projects");

        let donationsArray: ApiDonationItem[] = [];

        if (Array.isArray(response.data)) {
          donationsArray = response.data;
        } else if (response.data && typeof response.data === "object") {
          const possibleArrayProps = [
            "data",
            "items",
            "results",
            "donations",
            "projects",
            "fundingProjects",
          ];

          for (const prop of possibleArrayProps) {
            if (Array.isArray(response.data[prop])) {
              donationsArray = response.data[prop];
              break;
            }
          }

          if (
            donationsArray.length === 0 &&
            Object.keys(response.data).length > 0
          ) {
            donationsArray = Object.values(response.data);
          }
        }

        if (!Array.isArray(donationsArray)) {
          throw new Error("Could not extract donation data from API response");
        }

        const donationsData: DonationCardData[] = donationsArray.map(
          (item) => ({
            id: item._id || item.id || "",
            imageUrl: item.imageUrl || "",
            category: item.category || "",
            title: item.title || "",
            description: item.description || "",
            raised: `$${item.currentFunding ?? 0}`,
            percentFunded: calculatePercentage(
              item.currentFunding ?? 0,
              item.targetFunding ?? 0
            ),
            badgeText: item.statusLabel || "",
          })
        );

        setDonations(donationsData);
        setFilteredDonations(donationsData);
      } catch (err) {
        console.error("Error fetching donations:", err);
        setError(
          "Failed to load donations. Please check the console for details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  return (
    <section className="w-full py-10 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Donation</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl font-bold mt-6 mb-8">Featured Donations</h1>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-pulse text-xl">Loading donations...</div>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">
            <p className="text-lg">{error}</p>
          </div>
        ) : (
          <>
            <DonationFilter
              donations={donations}
              onFilterChange={setFilteredDonations}
            />

            {filteredDonations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredDonations.map((donation) => (
                  <DonationCard key={donation.id} {...donation} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">
                  No donations match your search criteria.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
