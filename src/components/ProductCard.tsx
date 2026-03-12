import React from "react";

type ProductProps = {
  name: string;
  image: string;
  category: string;
  description: string;
  rating: string;
  link: string;
  badge?: string;
};

const ProductCard: React.FC<ProductProps> = ({
  name, image, category, description, rating, link, badge
}) => {
  return (
    <div className="product-card" data-cat={category.toLowerCase()}>
      <div className="product-img-wrap">
        {badge && <span className="badge">{badge}</span>}
        <img src={image} alt={name} loading="lazy" className="product-img" />
      </div>
      <div className="product-body">
        <span className="product-cat">{category}</span>
        <h3 className="product-name">{name}</h3>
        <p className="product-desc">{description}</p>
      </div>
      <div className="product-footer">
        <span className="rating">★ {rating}</span>
        <a href={link} target="_blank" rel="noopener sponsored" className="amazon-btn">
          View on Amazon
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ProductCard;