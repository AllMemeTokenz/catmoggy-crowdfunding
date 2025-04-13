"use client";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

interface TokenCopySectionProps {
  tokenCA: string;
}

export default function TokenCopySection({
  tokenCA = "HDoAKhCoEuuHzjMB6Q8AgKJyg5uT9APpDnynXAJQdfVW",
}: TokenCopySectionProps) {
  const handleCopy = () => {
    navigator.clipboard
      .writeText(tokenCA)
      .then(() => {
        toast.success("Copied to clipboard");
      })
      .catch(() => {
        toast.error("Could not copy");
      });
  };

  return (
    <section className="w-full py-10 md:py-24">
      <div className="w-full mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex my-10 w-full flex-col items-center justify-center">
          <h2 className="text-4xl font-bold mb-2 text-center ">$CATMOGGY CA</h2>
          <h3 className="text-xl font-semibold mb-8 text-center">
            Hit the copy button so you won&apos;t get the address wrong!
          </h3>
          <div className="w-full max-w-3xl font-semibold flex flex-col sm:flex-row items-center justify-between text-center sm:space-x-5 space-y-3 sm:space-y-0 relative px-6 border border-black shadow-[4px_4px_0_#483f3b] transition-all ease-linear duration-100 py-3 rounded-sm bg-blue-50">
            <span className="break-all sm:break-normal">{tokenCA}</span>
            <Button onClick={handleCopy}>COPY</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
