'use client';
import { CldImage } from 'next-cloudinary';

export default function FeatureSection() {
  return (
    <div className="flex my-10 w-full flex-col items-center justify-center px-4 ">
      <div className="w-full max-w-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-xl overflow-hidden bg-blue-50">
        <div className="p-6">
          <div className=" flex items-center justify-center">
            <div className="relative w-full h-[250px] md:h-[300px] rounded-xl overflow-hidden">
              <div className="relative w-full h-full overflow-hidden">
                <CldImage
                  src="3744557_awdqfh"
                  alt="CatsPlay: The Purrfect Meme Coin"
                  fill
                  className="object-cover scale-[0.9]"
                  style={{ objectPosition: 'center' }}
                  priority
                />
              </div>
            </div>
          </div>

          <div className=" flex flex-col justify-center md:pl-8 mt-6 md:mt-0">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-black">
              $CATMOGGY : The Meme Coin with a Heart for Stray Cats{' '}
            </h3>
            <p
              className="text-sm md:text-lg mb-4 text-black text-justify
"
            >
              $CATMOGGY isn’t just another memecoin it’s a movement with purpose. Built on the spirit of compassion,
              CatMoggy is a fundraising-driven token created to help sick and abandoned Moggy cats through donations
              made directly via our coin.
            </p>
            <p
              className="text-sm md:text-lg text-black text-justify
"
            >
              Each transaction you make supports real world care, shelter, and medical aid for our furry friends in
              need. Join the mission, hold the coin, and make a difference one paw at a time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
