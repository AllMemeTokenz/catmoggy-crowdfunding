"use client";

import { useState } from "react";
import DonationCard from "@/components/layout/donation-card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import DonationFilter from "@/components/layout/donation-filter";
import { featuredDonations, type DonationCardData } from "@/app/data/site-data";

// app/donation/page.tsx
export default function DonationPage() {
  const [filteredDonations, setFilteredDonations] =
    useState<DonationCardData[]>(featuredDonations);

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

        {/* Search and Filter Component */}
        <DonationFilter
          donations={featuredDonations}
          onFilterChange={setFilteredDonations}
        />

        {/* Donation Cards Grid */}
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
      </div>
    </section>
  );
}
