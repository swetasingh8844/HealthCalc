import React, { useState } from "react";
import ProductCard from "../components/ProductCard";

const products = [
  {
    name: "Speed Skipping Rope",
    category: "Cardio",
    image: "/images/rope.jpg",
    description: "Adjustable skipping rope for fat burning workouts.",
    rating: "4.0 / 5",
    link: "https://amzn.to/40YJchJ",
    // badge: "Best Seller",
  },
  {
    name: "Resistance Band Set",
    category: "Strength",
    image: "/images/resistance.jpeg",
    description: "5 level resistance bands for full body workouts.",
    rating: "4.1 / 5",
    link: "https://amzn.to/4ryoFvt",
    // badge: "Popular",
  },
  {
    name: "Resistance Band Set",
    category: "Strength",
    image: "/images/resistance1.jpg",
    description: "5 level resistance bands for full body workouts.",
    rating: "4.5 / 5",
    link: "https://amzn.to/4rwQS5V",
    // badge: "Popular",
  },
  {
    name: "Yoga Mat",
    category: "Yoga",
    image: "/images/mat.jpg",
    description: "Non-slip yoga mat for home workouts.",
    rating: "4.1 / 5",
    link: "https://amzn.to/47EHc1O",
  },
  {
    name: "Foam Roller",
    category: "Yoga",
    image: "/images/roller2.jpeg",
    description: "Foam Roller for Back, Neck & Knee Pain Relief.",
    rating: "4.0 / 5",
    link: "https://amzn.to/4bIhoUU",
  },
  {
    name: "Foam Roller",
    category: "Yoga",
    image: "/images/roller1.jpeg",
    description: "Foam Roller Multicolour For Deep Tissue Massage",
    rating: "5 / 5",
    link: "https://amzn.to/4bquPHY",
  },
   {
    name: "Water bottle",
    category: "Tracking",
    image: "/images/bottle.jpg",
    description: "24 Hours Hot and Cold Water Bottle",
    rating: "",
    link: "https://amzn.to/417Gczy",
    // badge: "Best Seller",
  },

  {
    name: "Water bottle",
    category: "Tracking",
    image: "/images/bottle1.jpg",
    description: "Stainless Steel Water Bottle.",
    rating:"",
    link: "https://amzn.to/4lsTUq7",
    // badge: "Best Seller",
  },
];

const categories = ["All", "Cardio", "Strength", "Yoga", "Tracking"];

const ShopPage = () => {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? products
      : products.filter((p) => p.category === active);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .shop-root {
          font-family: 'DM Sans', sans-serif;
          background: bg-white dark:bg-gray-800;
          min-height: 100vh;
          padding-bottom: 4rem;
          color: #f0ede6;
        }

        .shop-hero {
          padding: 3rem 2rem 2rem;
          border-bottom: 1px solid #222;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .shop-hero h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3rem, 8vw, 6rem);
          line-height: 0.9;
          letter-spacing: 0.02em;
          color: #f0ede6;
        }

        .shop-hero h1 span { color: #d4e84a; }

        .hero-sub {
          font-size: 13px;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-weight: 300;
          max-width: 200px;
          text-align: right;
        }

        .filter-row {
          display: flex;
          gap: 8px;
          padding: 1.5rem 2rem;
          overflow-x: auto;
        }

        .filter-btn {
          border: 1px solid #333;
          background: transparent;
          color: #888;
          padding: 6px 16px;
          border-radius: 2px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s;
        }

        .filter-btn.active,
        .filter-btn:hover {
          background: #d4e84a;
          color: #0a0a0a;
          border-color: #d4e84a;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1px;
          background: #1a1a1a;
          border-top: 1px solid #1a1a1a;
          border-left: 1px solid #1a1a1a;
          margin: 0 2rem;
        }

        .product-card {
          background: #0a0a0a;
          overflow: hidden;
          cursor: pointer;
          transition: background 0.2s;
        }

        .product-card:hover { background: #111; }

        .product-img-wrap {
          aspect-ratio: 4 / 3;
          overflow: hidden;
          background: #141414;
          position: relative;
        }

        .product-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
          filter: grayscale(20%);
        }

        .product-card:hover .product-img {
          transform: scale(1.04);
          filter: grayscale(0%);
        }

        .badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #d4e84a;
          color: #0a0a0a;
          font-size: 10px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          padding: 4px 10px;
          z-index: 2;
          font-family: 'DM Sans', sans-serif;
        }

        .product-body {
          padding: 1.25rem 1.25rem 0.75rem;
          border-top: 1px solid #1a1a1a;
        }

        .product-cat {
          display: block;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: #555;
          font-weight: 400;
          margin-bottom: 6px;
        }

        .product-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.6rem;
          letter-spacing: 0.04em;
          color: #f0ede6;
          line-height: 1;
          margin-bottom: 8px;
        }

        .product-desc {
          font-size: 13px;
          color: #666;
          line-height: 1.6;
          font-weight: 300;
        }

        .product-footer {
          padding: 1rem 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid #1a1a1a;
          margin-top: 0.75rem;
        }

        .rating {
          font-size: 12px;
          color: #d4e84a;
          font-weight: 500;
          letter-spacing: 0.05em;
        }

        .amazon-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #0a0a0a;
          background: #d4e84a;
          padding: 8px 16px;
          text-decoration: none;
          transition: background 0.15s;
        }

        .amazon-btn:hover { background: #c6da30; }

        .amazon-btn svg { transition: transform 0.2s; }
        .amazon-btn:hover svg { transform: translateX(3px); }
      `}</style>

      <div className="shop-root">
        <div className="shop-hero">
          <h1>Shop<br /><span>Gear</span></h1>
          <p className="hero-sub">Curated fitness equipment for every workout</p>
        </div>

        <div className="filter-row">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn${active === cat ? " active" : ""}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filtered.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ShopPage;