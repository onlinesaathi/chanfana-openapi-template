
import { Star } from "lucide-react";
import { Product } from "./DealsSection";
import AddToCartButton from "./AddToCartButton";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { id, title, image, price, originalPrice, discount, rating, ratingCount, badge } = product;

  return (
    <Link to={`/product/${id}`} className="block group">
      <div className="flex flex-col h-full p-3 rounded transition-all hover:shadow-md">
        {/* Product Image */}
        <div className="relative pb-[100%] mb-3 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
          {badge && (
            <span className="absolute top-2 left-2 bg-flipkart-blue text-white text-xs py-1 px-2 rounded">
              {badge}
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col">
          {/* Title */}
          <h3 className="text-sm text-flipkart-text-primary font-medium mb-1 line-clamp-2 min-h-[40px]">
            {title}
          </h3>

          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex items-center bg-flipkart-green text-white text-xs py-0.5 px-1.5 rounded">
              <span>{rating}</span>
              <Star size={12} className="ml-0.5 fill-current" />
            </div>
            <span className="text-xs text-flipkart-text-secondary ml-2">({ratingCount})</span>
          </div>

          {/* Price */}
          <div className="mt-auto">
            <div className="flex items-center">
              <span className="font-medium text-flipkart-text-primary">₹{price.toLocaleString()}</span>
              {originalPrice && (
                <span className="text-flipkart-text-secondary text-xs line-through ml-2">
                  ₹{originalPrice.toLocaleString()}
                </span>
              )}
              {discount && (
                <span className="text-flipkart-green text-xs ml-2">{discount}% off</span>
              )}
            </div>
          </div>
          
          {/* Add to Cart Button */}
          <div className="mt-3">
            <AddToCartButton 
              product={product} 
              size="sm" 
              className="w-full bg-flipkart-blue hover:bg-flipkart-blue/90"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
