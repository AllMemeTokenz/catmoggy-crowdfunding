// import { Button } from "@/components/ui/button";
// import { ArrowRight, CircleCheck } from "lucide-react";
// import Image from "next/image";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import Link from "next/link";

// export default function Home() {
//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <section className="w-full py-12 md:py-24">
//         <div className="mx-auto grid max-w-7xl gap-8 px-4 md:px-6 md:grid-cols-2 md:gap-12">
//           {/* Left Column - Text Content */}
//           <div className="flex flex-col justify-center space-y-6">
//             <Badge>
//               <CircleCheck />
//               <span className="font-semibold">
//                 First Platform Crowdfunding Cats in the World on Web3
//               </span>
//             </Badge>
//             <h1 className="text-4xl font-extrabold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
//               Every Paw Deserves{" "}
//               <span className="text-blue-500">Love & Care</span>
//             </h1>

//             <p className="max-w-[600px] text-lg text-zinc-700 md:text-xl">
//               Join our mission to rescue, rehabilitate, and rehome cats in need.
//               Your support makes a difference in their lives.
//             </p>

//             <div className="flex flex-col gap-4 sm:flex-row">
//               <Button>
//                 <Link href="/donation">Donate Now</Link>
//               </Button>

//               <Button>
//                 <Link href="/about" className="flex">
//                   Learn More
//                   <ArrowRight className="ml-2 h-5 w-5" />
//                 </Link>
//               </Button>
//             </div>

//             <div className="flex items-center gap-4 pt-4">
//               <div className="flex -space-x-4">
//                 {[
//                   { name: "Tom", image: "/placeholder.svg?height=50&width=50" },
//                   {
//                     name: "Lucy",
//                     image: "/placeholder.svg?height=50&width=50",
//                   },
//                   { name: "Max", image: "/placeholder.svg?height=50&width=50" },
//                   {
//                     name: "Bella",
//                     image: "/placeholder.svg?height=50&width=50",
//                   },
//                 ].map((person, i) => (
//                   <Avatar
//                     key={i}
//                     className="h-12 w-12 border-black bg-blue-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
//                   >
//                     <AvatarImage
//                       src={person.image || "/placeholder.svg"}
//                       alt={person.name}
//                     />
//                     <AvatarFallback className="bg-blue-500 text-black font-bold">
//                       {person.name.substring(0, 2).toUpperCase()}
//                     </AvatarFallback>
//                   </Avatar>
//                 ))}
//               </div>
//               <p className="text-sm font-medium">
//                 <span className="font-bold">500+</span> cats rescued this year
//               </p>
//             </div>
//           </div>

//           {/* Right Column - Image */}
//           <div className="flex items-center justify-center p-4">
//             <div className="relative w-full max-w-[400px] aspect-square overflow-visible">
//               <div className="absolute -right-1.5 sm:-right-2 md:-right-3 -bottom-1.5 sm:-bottom-2 md:-bottom-3 h-full w-full rounded-xl sm:rounded-2xl md:rounded-3xl border-2 sm:border-3 border-black bg-blue-400"></div>
//               <div className="relative h-full w-full overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl border-2 sm:border-3 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
//                 <div className="relative h-full w-full">
//                   <Image
//                     src="/love-cat.png"
//                     alt="Cute cat"
//                     fill
//                     sizes="(max-width: 768px) 100vw, 400px"
//                     className="object-cover bg-blue-50"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="w-full  py-12 md:py-24">
//         <div></div>
//         <div className="w-full mx-auto max-w-7xl px-4 md:px-6 ">
//           <Accordion type="single" collapsible className="max-w-2xl">
//             <AccordionItem value="item-1">
//               <AccordionTrigger>Is it accessible?</AccordionTrigger>
//               <AccordionContent>
//                 Yes. It adheres to the WAI-ARIA design pattern.
//               </AccordionContent>
//             </AccordionItem>
//           </Accordion>
//         </div>
//       </section>
//     </div>
//   );
// }

import HeroSection from "@/components/layout/hero-section";
import FaqSection from "@/components/layout/faq-section";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* FAQ Section */}
      <FaqSection />
    </div>
  );
}
