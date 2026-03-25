import React from 'react';
import { ExternalLink, Download } from 'lucide-react';

interface ProductCardProps {
  name: string;
  category: string;
  image: string;
  description: string;
  rating: string;
  link: string;
  onExpand?: (product: any) => void;
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
  const { name, category, image, description, rating, link, onExpand } = props;
  return (
    <div className="product-card group" onClick={() => onExpand?.(props)}>
      <div className="product-img-wrap">
        <span className="badge">{category}</span>
        <img src={image} alt={name} className="product-img" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
           <span className="text-white text-xs font-bold uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">View Details</span>
        </div>
      </div>
      <div className="product-body">
        <span className="product-cat">{category}</span>
        <h2 className="product-name">{name}</h2>
        <p className="product-desc">{description}</p>
      </div>
      <div className="product-footer">
        <div className="flex flex-col gap-1">
          {rating && <span className="rating">{rating} Rating</span>}
          <a
            href={image}
            download={`${name.replace(/\s+/g, '-').toLowerCase()}-image`}
            className="download-btn"
          >
            <Download className="w-2.5 h-2.5" />
            Download Image
          </a>
        </div>
        <a href={link} target="_blank" rel="noopener noreferrer" className="amazon-btn">
          Buy Now
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
