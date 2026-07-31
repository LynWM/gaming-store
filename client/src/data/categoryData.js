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

const CTA_LABELS = {
  services: "Book Now",
  tournaments: "Sign Up Now"
};

const TAGLINES = {
  consoles: "Next-gen hardware ready to play out of the box",
  games: "Critically acclaimed and fan-favorite gameplay",
  monitors: "Sharp, fast displays built for competitive edge",
  laptops: "Portable power tuned for high frame rates",
  "board-games": "Tabletop strategy and family game night favorite",
  accessories: "Peripherals built to level up every session",
  services: "Certified technician support done right",
  tournaments: "Competitive bracket with real prize money"
};

const DETAIL_TEMPLATES = {
  consoles: (name) => [
    `The ${name} is built for players who want zero compromises — fast load times, silent operation, and a design that looks as good under the TV as it performs on screen.`,
    `Under the hood you get a custom high-speed SSD, hardware-accelerated ray tracing, and support for the latest generation of physical and digital titles, so your library is future-proofed for years to come.`,
    `Every unit ships with a 12-month manufacturer warranty and is backed by our in-house repair service, so you're covered even if something goes wrong down the line.`
  ],
  games: (name) => [
    `${name} delivers a fully realized world with a gripping story, refined combat systems, and hours of side content for players who like to explore every corner of a map.`,
    `Expect regular post-launch patches and downloadable content drops, plus cross-save support so you can pick up right where you left off on a different platform.`,
    `Digital and physical copies both include a redeemable code for exclusive in-game cosmetics available only through NEXPLAY.`
  ],
  monitors: (name) => [
    `The ${name} pairs a color-accurate panel with a high refresh rate, giving you crisp motion clarity whether you're fragging in a shooter or editing 4K footage.`,
    `Slim bezels and a fully adjustable stand (tilt, swivel, height) make it easy to build a clean multi-monitor battlestation, while built-in speakers and USB passthrough cut down on cable clutter.`,
    `Backed by a 3-year manufacturer warranty covering dead pixels and backlight bleed.`
  ],
  laptops: (name) => [
    `The ${name} packs desktop-class performance into a chassis engineered for heat dissipation, so you get sustained frame rates even during marathon sessions.`,
    `A high refresh-rate display, per-key RGB keyboard, and fast NVMe storage round out a machine that's just as capable for streaming and content creation as it is for gaming.`,
    `Comes with a 1-year international warranty and a free first-service diagnostic through our repair partners.`
  ],
  "board-games": (name) => [
    `${name} is a tabletop favorite that rewards strategic thinking and table talk in equal measure — easy enough to teach in ten minutes, deep enough to replay for years.`,
    `The box includes premium components — thick tiles, linen-finish cards, and painted miniatures where applicable — so it looks as great on the shelf as it plays on the table.`,
    `Rules are printed in English and include a quick-reference guide for new players.`
  ],
  accessories: (name) => [
    `The ${name} is designed to disappear into your setup — low input lag, a comfortable ergonomic build, and firmware that just works out of the box.`,
    `Expect multi-platform compatibility (PC, PlayStation, Xbox, and Switch where applicable), a braided cable or long-lasting battery, and companion software for remapping buttons and lighting.`,
    `Covered by a 12-month warranty against manufacturing defects.`
  ],
  services: (name) => [
    `${name} is carried out by certified in-house technicians using genuine replacement parts, so you get a manufacturer-grade result without the manufacturer wait times.`,
    `Most bookings are completed within 24–48 hours of drop-off, and every job includes a full diagnostic report plus a 90-day service guarantee.`,
    `Pickup and drop-off can be arranged within Nairobi for an additional fee — ask our support team when you book.`
  ],
  tournaments: (name) => [
    `${name} is an open bracket event for players of all skill levels, run on verified servers with anti-cheat monitoring and live admin support throughout.`,
    `Entrants get a scheduled match time, access to a private Discord for coordination, and a spot on the public leaderboard as the bracket progresses.`,
    `Prize pool payouts are processed within 7 working days of the grand final via M-Pesa or bank transfer.`
  ]
};

const SPEC_BUILDERS = {
  consoles: (i) => ({
    Storage: `${[512, 825, 1000, 2000][i % 4]} GB SSD`,
    Resolution: i % 2 === 0 ? "4K @ 60–120fps" : "1440p @ 120fps",
    Connectivity: "Wi-Fi 6, Bluetooth 5.2, Gigabit LAN",
    "In the box": "Console, controller, HDMI 2.1 cable, power cable",
    Warranty: "12 months"
  }),
  games: (i) => ({
    Platform: ["PC, PS5, Xbox Series X|S", "PS5 exclusive", "PC, PS5", "PC, Xbox Series X|S"][i % 4],
    Genre: ["Action RPG", "Open World", "Adventure", "Shooter"][i % 4],
    Multiplayer: i % 2 === 0 ? "Online co-op & PvP" : "Single-player only",
    "Age Rating": ["PEGI 16", "PEGI 18", "PEGI 12"][i % 3],
    Format: i % 3 === 0 ? "Digital download" : "Physical disc + digital code"
  }),
  monitors: (i) => ({
    "Panel Type": ["IPS", "VA", "OLED", "TN"][i % 4],
    "Refresh Rate": `${[144, 165, 240, 360][i % 4]}Hz`,
    "Response Time": `${[1, 2, 4][i % 3]}ms GTG`,
    Ports: "2x HDMI 2.1, 1x DisplayPort 1.4, USB hub",
    Warranty: "3 years"
  }),
  laptops: (i) => ({
    CPU: ["Intel Core i7-14700HX", "Intel Core i9-14900HX", "AMD Ryzen 9 8945HS"][i % 3],
    GPU: ["RTX 4060 8GB", "RTX 4070 8GB", "RTX 4080 12GB", "RTX 4090 16GB"][i % 4],
    RAM: `${[16, 32][i % 2]}GB DDR5`,
    Storage: `${[512, 1000, 2000][i % 3]}GB NVMe SSD`,
    Display: `${["15.6\"", "16\"", "17.3\""][i % 3]} QHD 240Hz`
  }),
  "board-games": (i) => ({
    Players: ["2–4", "1–4", "2–6", "3–5"][i % 4],
    Playtime: `${[30, 45, 60, 90][i % 4]} minutes`,
    "Age Range": ["8+", "10+", "12+", "14+"][i % 4],
    Complexity: ["Light", "Medium", "Heavy"][i % 3],
    Publisher: "Officially licensed edition"
  }),
  accessories: (i) => ({
    Compatibility: "PC, PS5, Xbox Series X|S, Switch",
    Connection: i % 2 === 0 ? "2.4GHz wireless + Bluetooth" : "Wired USB-C",
    "Battery Life": i % 2 === 0 ? "Up to 20 hours" : "N/A (wired)",
    Weight: `${180 + i * 15}g`,
    Warranty: "12 months"
  }),
  services: (i) => ({
    Duration: `${[1, 2, 3][i % 3]}–${[2, 3, 5][i % 3]} business days`,
    Turnaround: i % 2 === 0 ? "Same-day available" : "Standard queue",
    Includes: "Full diagnostic report + service guarantee",
    Location: "In-store or Nairobi pickup/drop-off",
    Warranty: "90 days on parts and labor"
  }),
  tournaments: (i) => ({
    Format: ["Single elimination", "Double elimination", "Swiss rounds"][i % 3],
    "Entry Fee": i % 2 === 0 ? "Free" : "KSH 500 per squad",
    "Prize Pool": `KSH ${(20000 + i * 5000).toLocaleString()}`,
    Platform: "PC & console cross-play",
    Schedule: "Weekend brackets, times confirmed via Discord"
  })
};

function buildProducts(slug) {
  const list = names[slug];
  const accent = ACCENTS[slug];
  const ctaLabel = CTA_LABELS[slug] || "Add to Cart";
  return list.map((name, i) => {
    const base = 39 + i * 41 + (slug.length * 7);
    const price = Math.round(base * 1.3);
    const hasDiscount = i % 3 === 0;
    const tags = ["New", "Hot", "Sale", null, null];
    const id = `${slug}-${i + 1}`;
    return {
      id,
      name,
      price: hasDiscount ? Math.round(price * 0.8) : price,
      oldPrice: hasDiscount ? price : null,
      rating: Number((3.8 + ((i * 13) % 12) / 10).toFixed(1)),
      reviews: 20 + ((i * 37) % 480),
      tag: tags[i % tags.length],
      accent,
      ctaLabel,
      description: TAGLINES[slug],
      details: DETAIL_TEMPLATES[slug](name),
      specs: SPEC_BUILDERS[slug](i),
      detailPath: `/${slug}/${id}`
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
