import {
    Gamepad2,
    Monitor,
    Laptop,
    Grid,
    Boxes,
    Wrench,
    Trophy
} from "lucide-react";

export const categories = {
    consoles: {
        title: "Consoles",
        icon: Gamepad2,
        description: "PS5, Xbox, Nintendo & more",
        accent: "#9333EA",

        products: [
            {
                id: 1,
                title: "PlayStation 5 Slim",
                image: "/images/ps5.png",
                price: 699,
                oldPrice: 799,
                badge: "HOT",
                rating: 5
            },

            {
                id: 2,
                title: "Xbox Series X",
                image: "/images/xbox.png",
                price: 650,
                oldPrice: 820,
                badge: "DEAL",
                rating: 5
            },

            {
                id: 3,
                title: "Nintendo Switch OLED",
                image: "/images/switch.png",
                price: 470,
                oldPrice: 520,
                badge: "SALE",
                rating: 4
            }
        ]
    },

    games: {
        title: "Games",
        icon: Gamepad2,
        description: "Latest AAA & Indie titles",
        accent: "#2563EB",
        products: []
    },

    monitors: {
        title: "Monitors",
        icon: Monitor,
        description: "4K, Ultra-wide & Gaming",
        accent: "#06B6D4",
        products: []
    },

    laptops: {
        title: "Laptops",
        icon: Laptop,
        description: "Gaming laptops",
        accent: "#10B981",
        products: []
    },

    "board-games": {
        title: "Board Games",
        icon: Grid,
        description: "Classic & Modern",
        accent: "#F97316",
        products: []
    },

    accessories: {
        title: "Accessories",
        icon: Boxes,
        description: "Controllers & Gear",
        accent: "#EF4444",
        products: []
    },

    services: {
        title: "Services",
        icon: Wrench,
        description: "Repairs & Support",
        accent: "#EAB308",
        products: []
    },

    tournaments: {
        title: "Tournaments",
        icon: Trophy,
        description: "Compete & Win",
        accent: "#EC4899",
        products: []
    }
};