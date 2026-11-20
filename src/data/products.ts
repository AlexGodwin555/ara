import heroEditorialImg from '../assets/images/hero_lagos_editorial_1794647238643.jpg';
import obsidianAgbadaImg from '../assets/images/product_obsidian_agbada_1794647239147.jpg';
import alabasterKaftanImg from '../assets/images/product_alabaster_kaftan_1794647238502.jpg';
import adireTrenchImg from '../assets/images/product_adire_trench_1794647239169.jpg';
import asoOkeWorkJacketImg from '../assets/images/product_asooke_workjacket_1794647239819.jpg';
import lagosKnitPoloImg from '../assets/images/product_lagos_knit_polo_1794647241325.jpg';
import cargoTrouserImg from '../assets/images/product_cargo_trouser_1794647241390.jpg';
import leatherToteImg from '../assets/images/product_leather_tote_1794647242368.jpg';
import brassCuffImg from '../assets/images/product_brass_cuff_1794647242603.jpg';
import wovenMuleImg from '../assets/images/product_woven_mule_1794647241435.jpg';
import atelierLoomImg from '../assets/images/atelier_loom_craft_1794647243397.jpg';
import type { Product } from '../types/catalog';

export const BRAND_MEDIA = {
  heroEditorial: heroEditorialImg,
  atelierLoom: atelierLoomImg,
};

export const PRODUCTS: Product[] = [
  {
    id: 'eko-obsidian-agbada',
    sku: 'ARA-TM-001',
    name: 'Eko Obsidian Aso-Oke Agbada',
    category: 'Trad-Modern',
    fabricOrigin: 'Hand-Loomed Aso-Oke & Wool',
    priceNaira: 385000,
    description:
      'Architectural three-piece tailored Agbada cut in breathable Italian wool-linen with tonal geometric Aso-Oke chest embroidery hand-loomed in Iseyin.',
    craftNote: '48 hours of hand-guided loom weaving and Lagos atelier finishing.',
    fitNote: 'Relaxed ceremonial drape over a structured buba and tapered sokoto.',
    image: obsidianAgbadaImg,
    imageAlt: 'Eko Obsidian Aso-Oke Agbada tailored three-piece suit in charcoal black',
    colors: [
      { name: 'Obsidian Black', hex: '#181817' },
      { name: 'Deep Indigo', hex: '#1F2F46' },
      { name: 'Warm Sand', hex: '#C8B8A2' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tag: 'Atelier Signature',
  },
  {
    id: 'ikoyi-alabaster-kaftan',
    sku: 'ARA-TM-002',
    name: 'Ikoyi Architectural Linen Kaftan',
    category: 'Trad-Modern',
    fabricOrigin: 'Heavyweight Irish & Nigerian Linen',
    priceNaira: 225000,
    description:
      'Bone-white contemporary tunic kaftan featuring a sculpted mandarin collar, concealed placket, and tonal Yoruba geometric threadwork along the neckline.',
    craftNote: 'Tonal chain-stitch embroidery completed in our Victoria Island studio.',
    fitNote: 'Fluid boxy tunic silhouette paired with crisp straight-leg trousers.',
    image: alabasterKaftanImg,
    imageAlt: 'Ikoyi Architectural Linen Kaftan set in bone white with tonal embroidery',
    colors: [
      { name: 'Warm Alabaster', hex: '#EFECE6' },
      { name: 'Slate Charcoal', hex: '#3A3A38' },
      { name: 'Bronze Olive', hex: '#635B49' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'abeokuta-adire-trench',
    sku: 'ARA-TM-003',
    name: 'Abeokuta Indigo Adire Trench',
    category: 'Trad-Modern',
    fabricOrigin: 'Cassava-Resist Silk-Cotton',
    priceNaira: 295000,
    description:
      'Full-length belted trench coat constructed from naturally fermented indigo Adire silk-cotton panels, uniting classic tailoring with cassava-resist artistry.',
    craftNote: 'Individually hand-painted with cassava starch paste in Abeokuta.',
    fitNote: 'Tailored shoulder with a generous storm flap and adjustable tie belt.',
    image: adireTrenchImg,
    imageAlt: 'Abeokuta Indigo Adire Trench coat in deep indigo patterned silk-cotton',
    colors: [
      { name: 'Fermented Indigo', hex: '#1C2E4A' },
      { name: 'Obsidian Wash', hex: '#232325' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    tag: 'Limited Dye Run',
  },
  {
    id: 'vi-asooke-workjacket',
    sku: 'ARA-SW-004',
    name: 'VI Cropped Aso-Oke Work Jacket',
    category: 'Streetwear',
    fabricOrigin: 'Organic Cotton Twill & Aso-Oke',
    priceNaira: 165000,
    description:
      'Heavyweight 440gsm Nigerian cotton twill workwear jacket with a cropped boxy cut, horn buttons, and an inlaid multi-thread Aso-Oke breast pocket.',
    craftNote: 'Enzyme-washed for a lived-in drape with reinforced flat-felled seams.',
    fitNote: 'Cropped boxy fit designed to layer cleanly over tees or knitwear.',
    image: asoOkeWorkJacketImg,
    imageAlt: 'VI Cropped Aso-Oke Work Jacket in slate charcoal with woven chest pocket',
    colors: [
      { name: 'Charcoal Slate', hex: '#434340' },
      { name: 'Raw Ecru', hex: '#E3DDD2' },
      { name: 'Obsidian', hex: '#161615' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'oniru-ribbed-knit-polo',
    sku: 'ARA-SW-005',
    name: 'Oniru Heavyweight Ribbed Polo',
    category: 'Streetwear',
    fabricOrigin: 'Combed Nigerian Cotton Knit',
    priceNaira: 138000,
    description:
      'Substantial 5-gauge ribbed knit polo in roasted espresso with an engineered geometric jacquard collar inspired by Lagos brutalist concrete facades.',
    craftNote: 'Knitted from long-staple West African cotton for breathability.',
    fitNote: 'Dropped shoulder, relaxed drape, ribbed cuffs and hem.',
    image: lagosKnitPoloImg,
    imageAlt: 'Oniru Heavyweight Ribbed Polo in deep espresso brown with woven collar',
    colors: [
      { name: 'Roasted Espresso', hex: '#382B24' },
      { name: 'Bone Chalk', hex: '#EBE7DF' },
      { name: 'Midnight Navy', hex: '#1B2538' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'lekki-pleated-cargo',
    sku: 'ARA-SW-006',
    name: 'Lekki Wide-Leg Pleated Cargo',
    category: 'Streetwear',
    fabricOrigin: 'Japanese-Milled Cotton Gabardine',
    priceNaira: 152000,
    description:
      'Architectural double-pleated wide-leg trouser combining tailored trouser construction with concealed bellows utility pockets and crisp leg volume.',
    craftNote: 'Finished with internal waist tabs and custom brushed brass clasps.',
    fitNote: 'High-to-mid rise with a full-length, fluid wide-leg fall.',
    image: cargoTrouserImg,
    imageAlt: 'Lekki Wide-Leg Pleated Cargo trousers in warm sand gabardine',
    colors: [
      { name: 'Harmattan Sand', hex: '#C6B79E' },
      { name: 'Obsidian', hex: '#171716' },
      { name: 'Ash Olive', hex: '#5C5B4E' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'zaria-architectural-tote',
    sku: 'ARA-AC-007',
    name: 'Zaria Sculptural Leather Tote',
    category: 'Accessories',
    fabricOrigin: 'Vegetable-Tanned Kano Leather',
    priceNaira: 265000,
    description:
      'Structured everyday architectural tote crafted from full-grain Kano leather, anchored by a solid sand-cast brass clasp and detachable hand-loomed Aso-Oke strap.',
    craftNote: 'Hand-burnished edges and suede-lined interior with 14-inch laptop sleeve.',
    fitNote: 'Dimensions: 34cm W × 27cm H × 14cm D. Fits daily essentials & tablet.',
    image: leatherToteImg,
    imageAlt: 'Zaria Sculptural Leather Tote in black leather with brass clasp and Aso-Oke strap',
    colors: [
      { name: 'Obsidian Leather', hex: '#161616' },
      { name: 'Saddle Cognac', hex: '#7A4B2A' },
    ],
    sizes: ['One Size'],
    tag: 'Small Batch',
  },
  {
    id: 'benin-hammered-cuff',
    sku: 'ARA-AC-008',
    name: 'Igun Hammered Bronze Cuff',
    category: 'Accessories',
    fabricOrigin: 'Recycled Cast Brass & Bronze',
    priceNaira: 95000,
    description:
      'Hand-forged open statement cuff echoing historic Benin bronze casting traditions, individually hammered for an organic light-catching patina.',
    craftNote: 'Individually hand-forged and sealed against tarnish by heritage smiths.',
    fitNote: 'Slightly malleable open cuff; fits wrist circumferences 15cm–20cm.',
    image: brassCuffImg,
    imageAlt: 'Igun Hammered Bronze Cuff bracelet resting on pale travertine stone',
    colors: [
      { name: 'Burnished Brass', hex: '#9A7437' },
      { name: 'Aged Pewter', hex: '#686764' },
    ],
    sizes: ['One Size'],
  },
  {
    id: 'marina-asooke-mule',
    sku: 'ARA-AC-009',
    name: 'Marina Leather & Aso-Oke Mule',
    category: 'Accessories',
    fabricOrigin: 'Calfskin & Indigo Aso-Oke',
    priceNaira: 145000,
    description:
      'Minimalist square-toe slip-on leather mule inlaid with a hand-loomed indigo and ecru Aso-Oke vamp panel over a stacked leather sole.',
    craftNote: 'Blake-stitched leather outsole crafted in Lagos for resoling longevity.',
    fitNote: 'True to European sizing. Take your regular dress shoe size.',
    image: wovenMuleImg,
    imageAlt: 'Marina Leather and Aso-Oke Mule sandals on travertine block',
    colors: [
      { name: 'Obsidian / Indigo', hex: '#1B2230' },
      { name: 'Espresso / Sand', hex: '#4D382B' },
    ],
    sizes: ['EU 39', 'EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44'],
  },
];
