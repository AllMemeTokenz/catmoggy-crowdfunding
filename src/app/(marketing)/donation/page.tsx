import DonationCard from "@/components/layout/donation-card";
import { featuredDonations } from "@/app/data/site-data";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// app/donation/page.tsx
export default function DonationPage() {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDonations.map((donation) => (
            <DonationCard key={donation.id} {...donation} />
          ))}
        </div>
      </div>
    </section>
  );
}
