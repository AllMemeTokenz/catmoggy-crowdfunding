// "use client";

// import { useState, useEffect } from "react";
// import { BookmarkIcon } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { Progress } from "@/components/ui/progress";
// import { Button } from "@/components/ui/button";

// // Define the DonationCardData interface directly here
// interface DonationCardProps {
//   id: string;
//   imageUrl: string;
//   category: string;
//   title: string;
//   description: string;
//   raised: string;
//   percentFunded: number;
//   badgeText?: string;
// }

// export default function DonationCard({
//   id,
//   imageUrl,
//   category,
//   title,
//   description,
//   raised,
//   percentFunded,
//   badgeText = "GOGOPICK",
// }: DonationCardProps) {
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const timer = setTimeout(() => setProgress(percentFunded), 500);
//     return () => clearTimeout(timer);
//   }, [percentFunded]);

//   return (
//     <div className="max-w-sm rounded-lg overflow-hidden border border-gray-200 bg-white">
//       <div className="relative">
//         <Image
//           src={imageUrl || "/placeholder.svg"}
//           alt={title}
//           width={400}
//           height={250}
//           className="w-full h-48 object-cover"
//         />
//         {badgeText && (
//           <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-md text-xs font-bold">
//             {badgeText}
//           </div>
//         )}
//       </div>

//       <div className="p-4">
//         <div className="flex justify-between items-center mb-2">
//           <span className="text-xs font-semibold text-gray-600">
//             {category}
//           </span>
//           <Button size="icon" className="h-8 w-8">
//             <BookmarkIcon className="h-4 w-4" />
//           </Button>
//         </div>

//         <h2 className="text-xl font-bold mb-1">{title}</h2>
//         <p className="text-sm text-gray-600 mb-4">{description}</p>

//         <div className="mb-2">
//           <Progress value={progress} className="h-2" />
//         </div>

//         <div className="flex justify-between items-center mb-4">
//           <div className="text-lg font-bold">{raised}</div>
//           <div className="text-sm text-gray-600">{percentFunded}% funded</div>
//         </div>

//         <div className="pt-2 border-t border-gray-100">
//           <Link href={`/donation/${id}`} className="w-full">
//             <Button className="w-full">Donate Now</Button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { BookmarkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { DonationCardData } from "@/types/types"; // impor tipe dari file tipe

export default function DonationCard({
  id,
  imageUrl,
  category,
  title,
  description,
  raised,
  percentFunded,
  badgeText = "GOGOPICK",
}: DonationCardData) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(percentFunded), 500);
    return () => clearTimeout(timer);
  }, [percentFunded]);

  return (
    <div className="max-w-sm rounded-lg overflow-hidden border border-gray-200 bg-white">
      <div className="relative">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title || "Donation image"}
          width={400}
          height={250}
          className="w-full h-48 object-cover"
        />
        {badgeText && (
          <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-md text-xs font-bold">
            {badgeText}
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold text-gray-600">
            {category}
          </span>
          <Button size="icon" className="h-8 w-8">
            <BookmarkIcon className="h-4 w-4" />
          </Button>
        </div>

        <h2 className="text-xl font-bold mb-1">{title}</h2>
        <p className="text-sm text-gray-600 mb-4">{description}</p>

        <div className="mb-2">
          <Progress value={progress} className="h-2" />
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-bold">{raised}</div>
          <div className="text-sm text-gray-600">{percentFunded}% funded</div>
        </div>

        <div className="pt-2 border-t border-gray-100">
          <Link href={`/donation/${id}`} className="w-full">
            <Button className="w-full">Donate Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
