// "use client";

// import { useState, useEffect } from "react";
// import { Search } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// // Define the interface directly here to avoid circular dependencies
// interface DonationCardData {
//   id: string;
//   imageUrl: string;
//   category: string;
//   title: string;
//   description: string;
//   raised: string;
//   percentFunded: number;
//   badgeText?: string;
// }

// interface DonationFilterProps {
//   donations: DonationCardData[];
//   onFilterChange: (filteredDonations: DonationCardData[]) => void;
// }

// export default function DonationFilter({
//   donations,
//   onFilterChange,
// }: DonationFilterProps) {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("all");
//   const [percentFilter, setPercentFilter] = useState("percentage");
//   const [raisedFilter, setRaisedFilter] = useState("raised");

//   // Extract unique categories for the filter dropdown
//   const categories = Array.from(
//     new Set(
//       donations
//         .filter((donation) => donation && donation.category)
//         .map((donation) => donation.category)
//     )
//   );

//   // Create percentage funded range options
//   const percentRanges = [
//     { label: "Percentage", value: "percentage" },
//     { label: "Under 25%", value: "0-25" },
//     { label: "25% - 50%", value: "25-50" },
//     { label: "50% - 75%", value: "50-75" },
//     { label: "Over 75%", value: "75+" },
//   ];

//   // Create raised amount range options
//   const raisedRanges = [
//     { label: "Raised", value: "raised" },
//     { label: "Under $10", value: "0-10" },
//     { label: "10 - 50", value: "10-50" },
//     { label: "50 - 100", value: "50-100" },
//     { label: "Over $100", value: "100+" },
//   ];

//   // Filter donations based on search term and filters
//   useEffect(() => {
//     // Add a safety check for donations
//     if (!Array.isArray(donations) || donations.length === 0) {
//       onFilterChange([]);
//       return;
//     }

//     const filteredDonations = donations.filter((donation) => {
//       // Skip invalid donation objects
//       if (!donation) return false;

//       // Filter by search term (name/title)
//       const title = donation.title || "";
//       const description = donation.description || "";

//       const matchesSearch =
//         title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         description.toLowerCase().includes(searchTerm.toLowerCase());

//       // Filter by category
//       const category = donation.category || "";
//       const matchesCategory =
//         categoryFilter === "all" ? true : category === categoryFilter;

//       // Filter by percentage funded
//       let matchesPercent = true;
//       if (percentFilter && percentFilter !== "percentage") {
//         const percentValue = donation.percentFunded || 0;
//         if (percentFilter === "0-25") {
//           matchesPercent = percentValue < 25;
//         } else if (percentFilter === "25-50") {
//           matchesPercent = percentValue >= 25 && percentValue < 50;
//         } else if (percentFilter === "50-75") {
//           matchesPercent = percentValue >= 50 && percentValue < 75;
//         } else if (percentFilter === "75+") {
//           matchesPercent = percentValue >= 75;
//         }
//       }

//       // Filter by raised amount
//       let matchesRaised = true;
//       if (raisedFilter && raisedFilter !== "raised") {
//         const raised = donation.raised || "$0";
//         const raisedValue = Number.parseFloat(
//           raised.replace(/[^0-9.]/g, "") || "0"
//         );
//         if (raisedFilter === "0-10") {
//           matchesRaised = raisedValue < 10;
//         } else if (raisedFilter === "10-50") {
//           matchesRaised = raisedValue >= 10 && raisedValue < 50;
//         } else if (raisedFilter === "50-100") {
//           matchesRaised = raisedValue >= 50 && raisedValue < 100;
//         } else if (raisedFilter === "100+") {
//           matchesRaised = raisedValue >= 100;
//         }
//       }

//       return (
//         matchesSearch && matchesCategory && matchesPercent && matchesRaised
//       );
//     });

//     onFilterChange(filteredDonations);
//   }, [
//     searchTerm,
//     categoryFilter,
//     percentFilter,
//     raisedFilter,
//     donations,
//     onFilterChange,
//   ]);

//   return (
//     <div className="mb-8 space-y-4 w-full">
//       <div className="flex flex-col w-full gap-4">
//         <div className="w-full">
//           <div className="relative w-full">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//             <Input
//               type="text"
//               placeholder="Search by name..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 w-full"
//             />
//           </div>
//         </div>
//         <div className="flex flex-col sm:flex-row gap-2 w-full">
//           <Select value={categoryFilter} onValueChange={setCategoryFilter}>
//             <SelectTrigger className="w-full sm:w-[180px]">
//               <SelectValue placeholder="Filter by category" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Categories</SelectItem>
//               {categories.map((category) => (
//                 <SelectItem key={category} value={category}>
//                   {category}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>

//           <Select value={percentFilter} onValueChange={setPercentFilter}>
//             <SelectTrigger className="w-full sm:w-[180px]">
//               <SelectValue placeholder="Filter by % funded" />
//             </SelectTrigger>
//             <SelectContent>
//               {percentRanges.map((range) => (
//                 <SelectItem key={range.value} value={range.value}>
//                   {range.label}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>

//           <Select value={raisedFilter} onValueChange={setRaisedFilter}>
//             <SelectTrigger className="w-full sm:w-[180px]">
//               <SelectValue placeholder="Filter by raised" />
//             </SelectTrigger>
//             <SelectContent>
//               {raisedRanges.map((range) => (
//                 <SelectItem key={range.value} value={range.value}>
//                   {range.label}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//       </div>
//     </div>
//   );
// }

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
import { DonationCardData } from "@/types/types"; // impor tipe

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
  const [percentFilter, setPercentFilter] = useState("percentage");
  const [raisedFilter, setRaisedFilter] = useState("raised");

  const categories = Array.from(
    new Set(
      donations
        .filter((donation) => donation && donation.category)
        .map((donation) => donation.category)
    )
  );

  const percentRanges = [
    { label: "Percentage", value: "percentage" },
    { label: "Under 25%", value: "0-25" },
    { label: "25% - 50%", value: "25-50" },
    { label: "50% - 75%", value: "50-75" },
    { label: "Over 75%", value: "75+" },
  ];

  const raisedRanges = [
    { label: "Raised", value: "raised" },
    { label: "Under $10", value: "0-10" },
    { label: "10 - 50", value: "10-50" },
    { label: "50 - 100", value: "50-100" },
    { label: "Over $100", value: "100+" },
  ];

  useEffect(() => {
    if (!Array.isArray(donations) || donations.length === 0) {
      onFilterChange([]);
      return;
    }

    const filteredDonations = donations.filter((donation) => {
      if (!donation) return false;

      const title = donation.title || "";
      const description = donation.description || "";

      const matchesSearch =
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        description.toLowerCase().includes(searchTerm.toLowerCase());

      const category = donation.category || "";
      const matchesCategory =
        categoryFilter === "all" ? true : category === categoryFilter;

      let matchesPercent = true;
      if (percentFilter && percentFilter !== "percentage") {
        const percentValue = donation.percentFunded || 0;
        if (percentFilter === "0-25") {
          matchesPercent = percentValue < 25;
        } else if (percentFilter === "25-50") {
          matchesPercent = percentValue >= 25 && percentValue < 50;
        } else if (percentFilter === "50-75") {
          matchesPercent = percentValue >= 50 && percentValue < 75;
        } else if (percentFilter === "75+") {
          matchesPercent = percentValue >= 75;
        }
      }

      let matchesRaised = true;
      if (raisedFilter && raisedFilter !== "raised") {
        const raised = donation.raised || "$0";
        const raisedValue = Number.parseFloat(
          raised.replace(/[^0-9.]/g, "") || "0"
        );
        if (raisedFilter === "0-10") {
          matchesRaised = raisedValue < 10;
        } else if (raisedFilter === "10-50") {
          matchesRaised = raisedValue >= 10 && raisedValue < 50;
        } else if (raisedFilter === "50-100") {
          matchesRaised = raisedValue >= 50 && raisedValue < 100;
        } else if (raisedFilter === "100+") {
          matchesRaised = raisedValue >= 100;
        }
      }

      return (
        matchesSearch && matchesCategory && matchesPercent && matchesRaised
      );
    });

    onFilterChange(filteredDonations);
  }, [
    searchTerm,
    categoryFilter,
    percentFilter,
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
              {/* {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))} */}

              {categories.map((category) => (
                <SelectItem key={category || ""} value={category || ""}>
                  {category || "Unknown"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={percentFilter} onValueChange={setPercentFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by % funded" />
            </SelectTrigger>
            <SelectContent>
              {percentRanges.map((range) => (
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
