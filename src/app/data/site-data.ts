import { FaXTwitter } from "react-icons/fa6";
import { RiTelegram2Fill } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

// Supporters data
export const supportersData = [
  { name: "Tom", image: "/placeholder.svg?height=50&width=50" },
  { name: "Lucy", image: "/placeholder.svg?height=50&width=50" },
  { name: "Max", image: "/placeholder.svg?height=50&width=50" },
  { name: "Bella", image: "/placeholder.svg?height=50&width=50" },
];

// FAQ data
export const faqData = [
  {
    id: "item-1",
    question: "What is $CATMOGGY?",
    answer:
      "$CATMOGGY is a meme token with a mission. It’s designed to support stray and abandoned Moggy cats by turning every transaction into real-world help through donations.",
  },
  {
    id: "item-2",
    question: "How does $CATMOGGY help stray cats?",
    answer:
      "A portion of every $CATMOGGY transaction goes directly to organizations that provide food, medical care, and shelter for cats in need.",
  },
  {
    id: "item-3",
    question: "Do I need to be a crypto expert to join?",
    answer:
      "Not at all! $CATMOGGY is for everyone. Whether you’re new to crypto or a seasoned holder, we’ve got easy-to-follow guides to get you started.",
  },
  {
    id: "item-4",
    question: "Where can I buy and store $CATMOGGY?",
    answer:
      "You can get $CATMOGGY on selected crypto exchanges and store it safely in any compatible digital wallet. Stay tuned to our official channels for the latest updates.",
  },
];

export const linkSocial = [
  {
    name: "x",
    logo: FaXTwitter,
    url: "https://x.com/CatmoggyX",
  },
  {
    name: "telegram",
    logo: RiTelegram2Fill,
    url: "https://t.me/catsmoggy",
  },
  {
    name: "facebook",
    logo: FaFacebookF,
    url: "https://www.facebook.com/profile.php?id=61575023983437",
  },
  {
    name: "instagram",
    logo: FaInstagram,
    url: "https://www.instagram.com/catmoggy.x/",
  },
];

//
export interface DonationCardData {
  id: string;
  imageUrl: string;
  category: string;
  title: string;
  description: string;
  raised: string;
  goal: string;
  percentFunded: number;
  badgeText?: string;
}

export const featuredDonations: DonationCardData[] = [
  {
    id: "1",
    imageUrl:
      "https://res.cloudinary.com/deeyw3apd/image/upload/v1744702858/3821464_upkm6p.jpg",
    category: "PHONES & ACCESSORIES",
    title: "Oukitel WP100 Titan: 33,000mAh Rugged Phone",
    description:
      "World's First 33,000mAh Rugged Smartphone with Built-In Projector",
    raised: "$7,841,506",
    goal: "$901 USD",
    percentFunded: 10078,
    badgeText: "GOGOPICK",
  },
  {
    id: "2",
    imageUrl:
      "https://res.cloudinary.com/deeyw3apd/image/upload/v1744702859/3723181_jxbmn8.jpg",
    category: "EDUCATION & SCHOOLS",
    title: "New Classroom Building for Rural School",
    description:
      "Help us build a new classroom for children in rural areas to access quality education",
    raised: "$75,000",
    goal: "$100,000",
    percentFunded: 75,
    badgeText: "FEATURED",
  },
  {
    id: "3",
    imageUrl:
      "https://res.cloudinary.com/deeyw3apd/image/upload/v1744702860/3744557_awdqfh.jpg",
    category: "HEALTHCARE",
    title: "Medical Supplies for Community Clinic",
    description:
      "Providing essential medical supplies to underserved communities",
    raised: "$12,350",
    goal: "$20,000",
    percentFunded: 62,
    badgeText: "URGENT",
  },
];

export const getDonationById = (id: string): DonationCardData | undefined => {
  return featuredDonations.find((donation) => donation.id === id);
};
