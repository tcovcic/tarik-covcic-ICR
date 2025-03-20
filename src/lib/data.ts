
import { Product } from "@/types";

export const products: Product[] = [
  {
    id: 1,
    name: "Adidas Terrex Gore-Tex",
    price: 199.90,
    image: "/lovable-uploads/d7225aff-c7a7-473e-9981-70c0d4f5ddd5.png",
    description: "GORE-TEX tehnologija štiti od elemenata, a istovremeno omogućava tijelu da diše",
    brand: "Adidas",
    sizes: ["40", "41", "42", "43", "44", "45"],
    material: "goretex",
    purpose: "planinarenje"
  },
  {
    id: 2,
    name: "Adidas Terrex Tracerocker 2 GTX",
    price: 188.00,
    image: "/lovable-uploads/97e7a6ae-6f81-4abe-9d93-be62d05faad8.png",
    description: "GORE-TEX tehnologija štiti od elemenata, a istovremeno omogućava tijelu da diše",
    brand: "Adidas",
    sizes: ["39", "40", "41", "42", "43", "44"],
    material: "goretex",
    purpose: "planinarenje"
  },
  {
    id: 3,
    name: "Under Armour UA Infinite Elite",
    price: 227.40,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80",
    description: "Patike za trčanje nude HOVR+ jastučiće za energiju, komfor i dizajn pete za stabilnost",
    brand: "Under Armour",
    sizes: ["40", "41", "42", "43", "44", "45"],
    material: "zračni-đon",
    purpose: "trčanje"
  },
  {
    id: 4,
    name: "Under Armour UA Infinite Elite Black",
    price: 227.40,
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80",
    description: "Patike za trčanje nude HOVR+ jastučiće za energiju, komfor i dizajn pete za stabilnost",
    brand: "Under Armour",
    sizes: ["40", "41", "42", "43", "44", "45"],
    material: "zračni-đon",
    purpose: "trčanje"
  }
];
