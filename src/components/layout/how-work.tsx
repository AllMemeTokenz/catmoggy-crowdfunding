import type React from "react";
import { Wallet, Cat, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface StepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Step = ({ title, description, icon }: StepProps) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="bg-blue-500 text-black rounded-full w-16 h-16 flex items-center justify-center mb-4 border border-black shadow-[4px_4px_0_#000000] transition-all ease-linear duration-100 py-3">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-zinc-700">{description}</p>
    </div>
  );
};

export function HowItWorksSection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2">How It Works</h2>
        <p className="text-center text-gray-600 mb-10">
          Simple steps to help cats through Web3
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <Step
            number={1}
            title="Connect Your Wallet"
            description="Connect your Web3 wallet to our platform securely and easily."
            icon={<Wallet className="h-6 w-6" />}
          />

          <Step
            number={2}
            title="Choose a Project"
            description="Browse and select cat rescue projects that resonate with you."
            icon={<Cat className="h-6 w-6" />}
          />

          <Step
            number={3}
            title="Make a Difference"
            description="Donate crypto to directly fund cat rescue and rehabilitation efforts."
            icon={<Heart className="h-6 w-6" />}
          />
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/contact" className="block w-fit">
            <Button className="w-full cursor-pointer">
              Start Helping Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
