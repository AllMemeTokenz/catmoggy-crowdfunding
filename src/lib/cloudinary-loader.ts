"use client";

export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  const params = ["f_auto", "c_limit", `w_${width}`, `q_${quality || "auto"}`];

  // Check if the URL is already a Cloudinary URL
  if (src.includes("res.cloudinary.com")) {
    // For already formed Cloudinary URLs, we can return as is or modify if needed
    return src;
  }

  // For other images that need to be processed through Cloudinary
  return `https://res.cloudinary.com/deeyw3apd/image/upload/${params.join(
    ","
  )}/${src}`;
}
