"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { DonationCardData } from "@/app/data/site-data";

interface DonationFilterProps {
  donations: DonationCardData[];
  onFilterChange: (filteredDonations: DonationCardData[]) => void;
}

export default function DonationFilter({
  donations,
  onFilterChange,
}: DonationFilterProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [goalFilter, setGoalFilter] = useState("any");
  const [raisedFilter, setRaisedFilter] = useState("any");

  // Extract unique categories for the filter dropdown
  const categories = Array.from(
    new Set(donations.map((donation) => donation.category))
  );

  // Create goal range options
  const goalRanges = [
    { label: "Any", value: "any" },
    { label: "Under $10,000", value: "0-10000" },
    { label: "10,000 - 50,000", value: "10000-50000" },
    { label: "50,000 - 100,000", value: "50000-100000" },
    { label: "Over $100,000", value: "100000+" },
  ];

  // Create raised amount range options
  const raisedRanges = [
    { label: "Any", value: "any" },
    { label: "Under $10,000", value: "0-10000" },
    { label: "10,000 - 50,000", value: "10000-50000" },
    { label: "50,000 - 100,000", value: "50000-100000" },
    { label: "Over $100,000", value: "100000+" },
  ];

  // Filter donations based on search term and filters
  useEffect(() => {
    const filteredDonations = donations.filter((donation) => {
      // Filter by search term (name/title)
      const matchesSearch = donation.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Filter by category
      const matchesCategory =
        categoryFilter === "all" ? true : donation.category === categoryFilter;

      // Filter by goal
      let matchesGoal = true;
      if (goalFilter && goalFilter !== "any") {
        const goalValue = Number.parseFloat(
          donation.goal?.replace(/[^0-9.]/g, "") || "0"
        );
        if (goalFilter === "0-10000") {
          matchesGoal = goalValue < 10000;
        } else if (goalFilter === "10000-50000") {
          matchesGoal = goalValue >= 10000 && goalValue < 50000;
        } else if (goalFilter === "50000-100000") {
          matchesGoal = goalValue >= 50000 && goalValue < 100000;
        } else if (goalFilter === "100000+") {
          matchesGoal = goalValue >= 100000;
        }
      }

      // Filter by raised amount
      let matchesRaised = true;
      if (raisedFilter && raisedFilter !== "any") {
        const raisedValue = Number.parseFloat(
          donation.raised.replace(/[^0-9.]/g, "") || "0"
        );
        if (raisedFilter === "0-10000") {
          matchesRaised = raisedValue < 10000;
        } else if (raisedFilter === "10000-50000") {
          matchesRaised = raisedValue >= 10000 && raisedValue < 50000;
        } else if (raisedFilter === "50000-100000") {
          matchesRaised = raisedValue >= 50000 && raisedValue < 100000;
        } else if (raisedFilter === "100000+") {
          matchesRaised = raisedValue >= 100000;
        }
      }

      return matchesSearch && matchesCategory && matchesGoal && matchesRaised;
    });

    onFilterChange(filteredDonations);
  }, [
    searchTerm,
    categoryFilter,
    goalFilter,
    raisedFilter,
    donations,
    onFilterChange,
  ]);

  return (
    <div className="mb-8 space-y-4 w-full">
      <div className="flex flex-col w-full gap-4">
        <div className="w-full">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={goalFilter} onValueChange={setGoalFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by goal" />
            </SelectTrigger>
            <SelectContent>
              {goalRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={raisedFilter} onValueChange={setRaisedFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by raised" />
            </SelectTrigger>
            <SelectContent>
              {raisedRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
