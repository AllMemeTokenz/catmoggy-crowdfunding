"use client";
import { Download } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function WhitepaperSection() {
  return (
    <section className="w-full py-10 md:py-24">
      <div className="w-full mx-auto max-w-7xl space-y-10 flex flex-col items-center justify-center px-6 md:px-16">
        <h1 className="font-bold text-[32px] lg:text-[36px] xl:text-[40px] text-black text-center">
          $CATMOGGY WHITEPAPER
        </h1>
        <h2 className="font-medium leading-7 text-lg xl:text-xl text-black mt-2 text-center">
          <span className="font-bold">CATMOGGY ($CATMOGGY) </span>: The most
          purrfect meme coin on Solana.
          <br />
          Discover our vision, mission, and roadmap for the future of CATSPLAY.
        </h2>
        <Link href="/whitepaper/whitepaper-catmoggy.pdf" className="flex">
          <Button className="cursor-pointer">
            Download Whitepaper
            <Download className="ml-2 h-5 w-5" />
          </Button>
        </Link>
        <h5>
          Learn about our technology, tokenomics, and the future of CatsPlay
        </h5>
      </div>
    </section>
  );
}
