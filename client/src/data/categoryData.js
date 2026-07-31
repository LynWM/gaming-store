import {
  Gamepad2,
  Monitor,
  Laptop,
  Grid,
  Boxes,
  Wrench,
  Trophy
} from "lucide-react";

const ACCENTS = {
  consoles:      { hex: "#A855F7", from: "#3B1E63", via: "#20123A", rgb: "168,85,247" },
  games:         { hex: "#3B82F6", from: "#1E2F63", via: "#12193A", rgb: "59,130,246" },
  monitors:      { hex: "#06B6D4", from: "#0E4C58", via: "#0A2A32", rgb: "6,182,212" },
  laptops:       { hex: "#10B981", from: "#0F4C39", via: "#0A2C21", rgb: "16,185,129" },
  "board-games": { hex: "#F97316", from: "#5C3410", via: "#331C09", rgb: "249,115,22" },
  accessories:   { hex: "#EF4444", from: "#5C1919", via: "#330D0D", rgb: "239,68,68" },
  services:      { hex: "#EAB308", from: "#544210", via: "#302509", rgb: "234,179,8" },
  tournaments:   { hex: "#EC4899", from: "#5C1B3D", via: "#331022", rgb: "236,72,153" }
};

const CTA_LABELS = {
  services: "Book Now",
  tournaments: "Sign Up Now"
};

export const categoryMeta = {
  consoles: {
    title: "Consoles",
    description: "Next-gen hardware, ready to play out of the box",
    icon: Gamepad2,
    accent: ACCENTS.consoles,
    ctaLabel: CTA_LABELS.consoles || "Add to Cart"
  },
  games: {
    title: "Games",
    description: "New releases and cult classics across every platform",
    icon: Gamepad2,
    accent: ACCENTS.games,
    ctaLabel: CTA_LABELS.games || "Add to Cart"
  },
  monitors: {
    title: "Monitors",
    description: "4K, ultra-wide, and high-refresh displays for every setup",
    icon: Monitor,
    accent: ACCENTS.monitors,
    ctaLabel: CTA_LABELS.monitors || "Add to Cart"
  },
  laptops: {
    title: "Laptops",
    description: "Portable rigs built for frame rates, not compromises",
    icon: Laptop,
    accent: ACCENTS.laptops,
    ctaLabel: CTA_LABELS.laptops || "Add to Cart"
  },
  "board-games": {
    title: "Board Games",
    description: "Tabletop classics and modern strategy favorites",
    icon: Grid,
    accent: ACCENTS["board-games"],
    ctaLabel: CTA_LABELS["board-games"] || "Add to Cart"
  },
  accessories: {
    title: "Accessories",
    description: "Controllers, peripherals, and everything in between",
    icon: Boxes,
    accent: ACCENTS.accessories,
    ctaLabel: CTA_LABELS.accessories || "Add to Cart"
  },
  services: {
    title: "Services",
    description: "Repairs, builds, and tune-ups from certified techs",
    icon: Wrench,
    accent: ACCENTS.services,
    ctaLabel: CTA_LABELS.services || "Add to Cart"
  },
  tournaments: {
    title: "Tournaments",
    description: "Compete for cash prizes and climb the leaderboard",
    icon: Trophy,
    accent: ACCENTS.tournaments,
    ctaLabel: CTA_LABELS.tournaments || "Add to Cart"
  }
};