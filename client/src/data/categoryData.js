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
  consoles:     { hex: "#A855F7", from: "#3B1E63", via: "#20123A", rgb: "168,85,247" },
  games:        { hex: "#3B82F6", from: "#1E2F63", via: "#12193A", rgb: "59,130,246" },
  monitors:     { hex: "#06B6D4", from: "#0E4C58", via: "#0A2A32", rgb: "6,182,212" },
  laptops:      { hex: "#10B981", from: "#0F4C39", via: "#0A2C21", rgb: "16,185,129" },
  "board-games":{ hex: "#F97316", from: "#5C3410", via: "#331C09", rgb: "249,115,22" },
  accessories:  { hex: "#EF4444", from: "#5C1919", via: "#330D0D", rgb: "239,68,68" },
  services:     { hex: "#EAB308", from: "#544210", via: "#302509", rgb: "234,179,8" },
  tournaments:  { hex: "#EC4899", from: "#5C1B3D", via: "#331022", rgb: "236,72,153" }
};

const names = {
  consoles: ["PlayStation 5 Pro", "Xbox Series X", "Nintendo Switch 2", "PS5 Slim Digital", "Xbox Series S", "Steam Deck OLED", "ROG Ally X", "PS5 Spider-Man Bundle"],
  games: ["Elden Ring: Shadow", "Horizon Forbidden West", "Starfield", "God of War Ragnarök", "Baldur's Gate 3", "Spider-Man 2", "Zelda: Echoes", "Diablo IV"],
  monitors: ["27\" 4K IPS Monitor", "34\" Ultra-Wide QHD", "24\" 240Hz Esports", "32\" Curved VA", "27\" OLED Gaming", "49\" Super Ultra-Wide", "25\" 360Hz Competitive", "28\" 4K HDR600"],
  laptops: ["Razer Blade 16", "ASUS ROG Zephyrus", "Alienware m18", "Lenovo Legion Pro 7", "MSI Titan GT77", "ASUS TUF A15", "HP Omen 17", "Acer Predator Helios"],
  "board-games": ["Catan: Legacy", "Wingspan Deluxe", "Gloomhaven", "Ticket to Ride", "Terraforming Mars", "Root", "Azul", "Brass: Birmingham"],
  accessories: ["Pro Wireless Controller", "RGB Mechanical Keyboard", "8K HDMI Cable", "Elite Headset", "Ergo Gaming Chair", "4-Port Controller Charger", "Capture Card 4K60", "Wrist Rest Pad"],
  services: ["Console Deep Clean", "PC Build Consultation", "Controller Drift Repair", "GPU Thermal Repaste", "Custom PC Build", "Data Transfer Service", "Warranty Diagnostic", "Setup & Calibration"],
  tournaments: ["Valorant Open Qualifier", "Smash Ultimate Regional", "Rocket League 3v3", "FIFA Ultimate Cup", "CS2 Community Clash", "Apex Legends Trios", "Street Fighter 6 Showdown", "Fortnite Duos Cup"]
};

function buildProducts(slug) {
  const list = names[slug];
  const accent = ACCENTS[slug];
  return list.map((name, i) => {
    const base = 39 + i * 41 + (slug.length * 7);
    const price = Math.round(base * 1.3);
    const hasDiscount = i % 3 === 0;
    const tags = ["New", "Hot", "Sale", null, null];
    return {
      id: `${slug}-${i + 1}`,
      name,
      price: hasDiscount ? Math.round(price * 0.8) : price,
      oldPrice: hasDiscount ? price : null,
      rating: Number((3.8 + ((i * 13) % 12) / 10).toFixed(1)),
      reviews: 20 + ((i * 37) % 480),
      tag: tags[i % tags.length],
      accent
    };
  });
}

export const categories = {
  consoles: {
    title: "Consoles",
    description: "Next-gen hardware, ready to play out of the box",
    icon: Gamepad2,
    accent: ACCENTS.consoles,
    products: buildProducts("consoles")
  },
  games: {
    title: "Games",
    description: "New releases and cult classics across every platform",
    icon: Gamepad2,
    accent: ACCENTS.games,
    products: buildProducts("games")
  },
  monitors: {
    title: "Monitors",
    description: "4K, ultra-wide, and high-refresh displays for every setup",
    icon: Monitor,
    accent: ACCENTS.monitors,
    products: buildProducts("monitors")
  },
  laptops: {
    title: "Laptops",
    description: "Portable rigs built for frame rates, not compromises",
    icon: Laptop,
    accent: ACCENTS.laptops,
    products: buildProducts("laptops")
  },
  "board-games": {
    title: "Board Games",
    description: "Tabletop classics and modern strategy favorites",
    icon: Grid,
    accent: ACCENTS["board-games"],
    products: buildProducts("board-games")
  },
  accessories: {
    title: "Accessories",
    description: "Controllers, peripherals, and everything in between",
    icon: Boxes,
    accent: ACCENTS.accessories,
    products: buildProducts("accessories")
  },
  services: {
    title: "Services",
    description: "Repairs, builds, and tune-ups from certified techs",
    icon: Wrench,
    accent: ACCENTS.services,
    products: buildProducts("services")
  },
  tournaments: {
    title: "Tournaments",
    description: "Compete for cash prizes and climb the leaderboard",
    icon: Trophy,
    accent: ACCENTS.tournaments,
    products: buildProducts("tournaments")
  }
};
