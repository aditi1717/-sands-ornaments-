import catRings from './cat_rings.png';
import catEarrings from './cat_earrings.png';
import catPendant from './cat_pendant.png';
import catBracelets from './cat_bracelets.png';
import catAnklets from './cat_anklets.png';
import trendingHeritage from './trending_heritage.png';
import trendingModern from './trending_modern.png';
import prodRingMain from './prod_ring_main.png';
import prodEarringsMain from './prod_earrings_main.png';
import spotlightMain from './spotlight_silver_main.png';
import spotlightHover from './spotlight_silver_hover.png';

export const categories = [
    {
        id: 1,
        name: "Rings",
        path: "rings",
        image: catRings,
        subcategories: [
            { name: "Solitaire", image: prodRingMain },
            { name: "Engagement", image: catRings },
            { name: "Silver Bands", image: catRings },
            { name: "Gemstone", image: spotlightMain }
        ]
    },
    {
        id: 2,
        name: "Earrings",
        path: "earrings",
        image: catEarrings,
        subcategories: [
            { name: "Jhumkas", image: trendingHeritage },
            { name: "Hoops", image: catEarrings },
            { name: "Drops", image: prodEarringsMain }
        ]
    },
    {
        id: 4,
        name: "Chain Pendant",
        path: "chain-pendant",
        image: catPendant,
        subcategories: [
            { name: "Minimal", image: catPendant },
            { name: "Layered", image: trendingModern }
        ]
    },
    {
        id: 7,
        name: "Bracelets",
        path: "bracelets",
        image: catBracelets,
        subcategories: [
            { name: "Cuffs", image: trendingModern },
            { name: "Charms", image: catBracelets },
            { name: "Bangles", image: catBracelets }
        ]
    },
    {
        id: 8,
        name: "Anklets",
        path: "anklets",
        image: catAnklets,
        subcategories: [
            { name: "Silver", image: catAnklets },
            { name: "Beaded", image: catAnklets }
        ]
    },
    {
        id: 9,
        name: "Toe Rings",
        path: "toe-rings",
        image: catAnklets,
        subcategories: [
            { name: "Plain", image: catAnklets },
            { name: "Stone", image: catAnklets }
        ]
    },
    {
        id: 3,
        name: "Studs",
        path: "studs",
        image: catEarrings,
        subcategories: [
            { name: "Silver Studs", image: catEarrings },
            { name: "Stone Studs", image: prodEarringsMain }
        ]
    },
    {
        id: 5,
        name: "Pendants",
        path: "pendants",
        image: trendingHeritage,
        subcategories: [
            { name: "Religious", image: spotlightMain },
            { name: "Modern", image: spotlightHover }
        ]
    },
    {
        id: 6,
        name: "Chains",
        path: "chains",
        image: trendingModern,
        subcategories: [
            { name: "Thick", image: trendingHeritage },
            { name: "Thin", image: catPendant }
        ]
    }
];

export const products = [
    {
        id: 1,
        name: "Sterling Silver Solitaire Ring",
        category: "Rings",
        price: 2499,
        originalPrice: 4999,
        image: prodRingMain,
        images: [
            prodRingMain,
            catRings,
            spotlightMain,
            spotlightHover,
            "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=800"
        ],
        rating: 4.5,
        reviews: 120,
        isNew: true
    },
    {
        id: 2,
        name: "Silver Hoop Earrings",
        category: "Earrings",
        price: 1899,
        originalPrice: 3500,
        image: catEarrings,
        rating: 4.8,
        reviews: 85,
        isNew: false
    },
    {
        id: 3,
        name: "Silver Layered Necklace",
        category: "Necklaces",
        price: 5999,
        originalPrice: 8999,
        image: trendingModern,
        rating: 4.2,
        reviews: 45,
        isNew: true
    },
    {
        id: 4,
        name: "Minimalist Silver Bracelet",
        category: "Bracelets",
        price: 3200,
        originalPrice: 4500,
        image: catBracelets,
        rating: 4.6,
        reviews: 200,
        isNew: false
    },
    {
        id: 5,
        name: "Antique Silver Anklet",
        category: "Anklets",
        price: 1500,
        originalPrice: 2200,
        image: catAnklets,
        rating: 4.3,
        reviews: 60,
        isNew: false
    },
    {
        id: 6,
        name: "Gemstone Pendant",
        category: "Pendants",
        price: 2100,
        originalPrice: 3000,
        image: spotlightMain,
        rating: 4.7,
        reviews: 95,
        isNew: true
    }
];

export const banners = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=1600",
        title: "Elegant Silver Collection",
        subtitle: "Up to 40% Off on New Arrivals"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=1600",
        title: "Timeless Rings",
        subtitle: "Discover the perfect symbol of love"
    }
];
