// Product Images
import necklaceImg from '../assets/gold_necklace.png';
import ringImg from '../assets/diamond_ring.png';
import banglesImg from '../assets/gold_bangles.png';

const necklaceUrl = necklaceImg;
const ringUrl = ringImg;
const banglesUrl = banglesImg;
const earringsUrl = ringImg; // Reusing ring image as placeholder for earrings if needed, or keep remote
// Actually, let's keep remote for ones we don't have to ensure variety, or reuse.
// The user asked to use assets from folder. I will use what I have.
// Let's keep the other remote URLs for variety if they work, or just reuse.
// To be safe and follow instruction "assets folder se lo", I should try to minimize remote usage if possible, 
// but I only have 3 files.
// let's stick to the 3 local and keep others remote for now to avoid broken images if possible.
// Wait, the user said "user ek asets folder se lo photos". 
// I will use the 3 I have.

const earringsPlaceholder = "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop";
const braceletPlaceholder = "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop";
const setPlaceholder = "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=600&auto=format&fit=crop";
const braceletUrl = "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop"; // Reusing for now
const setUrl = "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=600&auto=format&fit=crop";

export const SKUS = [
    { id: 'sku_1', name: 'Gold Necklace 22k', unit: 'pc', price: 45000, category: 'Necklaces' },
    { id: 'sku_2', name: 'Diamond Ring 18k', unit: 'pc', price: 25000, category: 'Rings' },
    { id: 'sku_3', name: 'Silver Anklets', unit: 'pair', price: 2500, category: 'Anklets' },
    { id: 'sku_4', name: 'Gold Bangles Set', unit: 'set', price: 35000, category: 'Bangles' },
    { id: 'sku_5', name: 'Pearl Earrings', unit: 'pair', price: 1500, category: 'Earrings' },
    { id: 'sku_6', name: 'Platinum Band', unit: 'pc', price: 18000, category: 'Rings' },
    { id: 'sku_7', name: 'Nose Pin Gold', unit: 'pc', price: 800, category: 'Nose Pins' },
    { id: 'sku_8', name: 'Silver Bracelet', unit: 'pc', price: 1200, category: 'Bracelets' },
];

export const PACKS = [
    {
        id: '1',
        brand: 'SANDS ROYAL',
        name: 'Bridal Wedding Set - 22k Gold',
        category: 'sets',
        subcategory: 'Bridal Sets',
        mrp: 150000,
        price: 135000,
        unitPrice: 'N/A',
        rating: 5.0,
        tag: 'LUXURY',
        discount: '10% OFF',
        image: setUrl,
        description: 'A magnificent 22k gold bridal set including a heavy necklace, long haram, earrings, and maang tikka. Intricate temple craftsmanship.',
        contents: [
            { productId: 'p1', productName: 'Royal Temple Necklace', quantity: 1, variant: 'Standard' },
            { productId: 'p2', productName: 'Matching Jhumkas', quantity: 1, variant: 'Standard' }
        ]
    },
    {
        id: '2',
        brand: 'SANDS DAILY',
        name: 'Office Wear Combo - Silver',
        category: 'combos',
        subcategory: 'Office Wear',
        mrp: 5000,
        price: 3999,
        unitPrice: 'N/A',
        rating: 4.8,
        tag: 'BESTSELLER',
        discount: '20% OFF',
        image: earringsUrl,
        description: 'Elegant and minimal silver jewelry set perfect for daily office wear. Includes delicate studs and a thin chain pendant.',
        contents: [
            { productId: 'p5', productName: 'Sterling Silver Studs', quantity: 1, variant: 'Standard' },
            { productId: 'p8', productName: 'Minimal Pendant Chain', quantity: 1, variant: 'Standard' }
        ]
    }
];

export const PRODUCTS = [
    {
        id: 'p1',
        brand: 'SANDS TRADITIONAL',
        name: 'Royal Kundan Gold Necklace',
        category: 'necklaces',
        subcategory: 'Kundan',
        rating: 4.9,
        tag: 'PREMIUM',
        image: necklaceUrl,
        description: 'Exquisite handcrafted Kundan necklace set in 22k gold. Featuring semi-precious stones and pearl drops, this piece is a masterpiece of traditional artistry.',
        benefits: ['Hallmarked Gold', 'Authentic Kundan', 'Lifetime Polish Warranty'],
        specifications: [
            { label: 'Material', value: '22k Gold' },
            { label: 'Weight', value: '45g' },
            { label: 'Stone', value: 'Kundan & Pearls' }
        ],
        faqs: [
            { q: 'Is it hallmarked?', a: 'Yes, it comes with BIS Hallmark.' },
            { q: 'Does it include earrings?', a: 'Yes, matching earrings are included.' }
        ],
        variants: [
            { id: 'p1-v1', name: 'Standard', mrp: 160000, price: 145000, discount: '9%off', stock: 3, sold: 12 },
            { id: 'p1-v2', name: 'Heavy', mrp: 220000, price: 198000, discount: '10%off', stock: 1, sold: 4 }
        ]
    },
    {
        id: 'p2',
        brand: 'SANDS SOLITAIRE',
        name: 'Classic Diamond Solitaire Ring',
        category: 'rings',
        subcategory: 'Solitaire',
        rating: 4.8,
        tag: 'ENGAGEMENT',
        image: ringUrl,
        description: 'A timeless solitaire diamond ring set in 18k white gold. The perfect symbol of love and commitment.',
        benefits: ['Certified Diamond', '18k White Gold', 'Free Resizing'],
        specifications: [
            { label: 'Diamond', value: '0.50 ct, VVS1' },
            { label: 'Metal', value: '18k White Gold' },
            { label: 'Setting', value: 'Prong' }
        ],
        faqs: [
            { q: 'Is the diamond certified?', a: 'Yes, typically IGI or GIA certified.' }
        ],
        variants: [
            { id: 'p2-v1', name: 'Size 6', mrp: 65000, price: 58000, discount: '11%off', stock: 5, sold: 8 },
            { id: 'p2-v2', name: 'Size 7', mrp: 65000, price: 58000, discount: '11%off', stock: 8, sold: 15 },
            { id: 'p2-v3', name: 'Size 8', mrp: 65000, price: 58000, discount: '11%off', stock: 4, sold: 6 }
        ]
    },
    {
        id: 'p3',
        brand: 'SANDS HERITAGE',
        name: 'Antique Gold Temple Bangles',
        category: 'bangles',
        subcategory: 'Temple Jewellery',
        rating: 4.7,
        tag: 'WEDDING',
        image: banglesUrl,
        description: 'Stunning antique finish gold bangles featuring intricate carvings of goddesses and floral motifs. Perfect for weddings and traditional ceremonies.',
        benefits: ['Solid Gold', 'Antique Finish', 'Screw Open Mechanism'],
        specifications: [
            { label: 'Material', value: '22k Gold' },
            { label: 'Type', value: 'Kada' },
            { label: 'Size', value: '2.4, 2.6, 2.8' }
        ],
        faqs: [
            { q: 'Is the size adjustable?', a: 'No, but it has a screw opening for easy wear.' }
        ],
        variants: [
            { id: 'p3-v1', name: 'Size 2.4', mrp: 95000, price: 89000, discount: '6%off', stock: 6, sold: 20 },
            { id: 'p3-v2', name: 'Size 2.6', mrp: 98000, price: 92000, discount: '6%off', stock: 10, sold: 35 },
            { id: 'p3-v3', name: 'Size 2.8', mrp: 102000, price: 95000, discount: '7%off', stock: 4, sold: 10 }
        ]
    },
    {
        id: 'p4',
        brand: 'SANDS MODERN',
        name: 'Rose Gold Diamond Earrings',
        category: 'earrings',
        subcategory: 'Studs',
        rating: 4.9,
        tag: 'TRENDING',
        image: earringsUrl,
        description: 'Chic and contemporary rose gold studs embedded with sparkling diamonds. Perfect for modern women who love understated luxury.',
        benefits: ['Real Diamonds', '14k Rose Gold', 'Secure Back'],
        specifications: [
            { label: 'Diamond Weight', value: '0.25 ct total' },
            { label: 'Metal', value: '14k Rose Gold' }
        ],
        faqs: [
            { q: 'Are these suitable for daily wear?', a: 'Yes, absolutely.' }
        ],
        variants: [
            { id: 'p4-v1', name: 'Standard', mrp: 25000, price: 19999, discount: '20%off', stock: 15, sold: 50 }
        ]
    },
    {
        id: 'p5',
        brand: 'SANDS SILVER',
        name: 'Oxidized Silver Choker',
        category: 'necklaces',
        subcategory: 'Oxidized',
        rating: 4.6,
        tag: 'BOHO',
        image: braceletUrl, // Using placeholder
        description: 'Trendy oxidized silver choker necklace with tribal motifs. Adds a boho-chic vibe to any outfit, indian or western.',
        benefits: ['925 Sterling Silver', 'Adjustable Length', 'Skin Friendly'],
        specifications: [
            { label: 'Material', value: '925 Silver' },
            { label: 'Finish', value: 'Oxidized' }
        ],
        faqs: [],
        variants: [
            { id: 'p5-v1', name: 'Standard', mrp: 4500, price: 3200, discount: '29%off', stock: 25, sold: 100 }
        ]
    }
];

export const COUPONS = [
    {
        id: 'COUP-001',
        code: 'WELCOME500',
        type: 'flat',
        value: 500,
        minOrderValue: 5000,
        maxDiscount: null,
        validFrom: '2026-01-01',
        validUntil: '2026-12-31',
        usageLimit: 1000,
        usageCount: 0,
        perUserLimit: 1,
        applicableCategories: [],
        userEligibility: 'new',
        active: true,
        description: 'Flat ₹500 OFF on your first jewelry order above ₹5000!'
    },
    {
        id: 'COUP-002',
        code: 'GOLD1000',
        type: 'flat',
        value: 1000,
        minOrderValue: 20000,
        maxDiscount: null,
        validFrom: '2026-01-01',
        validUntil: '2026-12-31',
        usageLimit: 500,
        usageCount: 0,
        perUserLimit: 3,
        applicableCategories: [],
        userEligibility: 'all',
        active: true,
        description: 'Get ₹1000 OFF on gold purchase above ₹20000'
    },
    {
        id: 'COUP-003',
        code: 'DIAMOND5',
        type: 'percentage',
        value: 5,
        minOrderValue: 10000,
        maxDiscount: 5000,
        validFrom: '2026-01-01',
        validUntil: '2026-12-31',
        usageLimit: 300,
        usageCount: 0,
        perUserLimit: 2,
        applicableCategories: ['rings', 'earrings'],
        userEligibility: 'all',
        active: true,
        description: '5% OFF on Diamonds (Max ₹5000)'
    }
];
