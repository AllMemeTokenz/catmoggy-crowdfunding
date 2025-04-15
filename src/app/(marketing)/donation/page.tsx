import DonationCard from "@/components/layout/donation-card";
import { featuredDonations } from "@/app/data/site-data";

// app/donation/page.tsx
export default function DonationPage() {
  return (
    <div className="min-h-full">
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Featured Donations</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDonations.map((donation) => (
              <DonationCard key={donation.id} {...donation} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
