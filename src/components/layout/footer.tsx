import { linkSocial } from "@/app/data/site-data";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="border-t-3 border-black p-5 space-y-10">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center gap-3 mt-6">
          {linkSocial.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit our ${link.name} page`}
            >
              <Button size="icon">
                <link.logo size={18} />
              </Button>
            </a>
          ))}
        </div>
      </div>
      <p className="text-center text-black pb-5 max-sm:text-xs font-bold">
        Copyright © {year} CatMoggy. All rights reserved.
      </p>
    </div>
  );
}
