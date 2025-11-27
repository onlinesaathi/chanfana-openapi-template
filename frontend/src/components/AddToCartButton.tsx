
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Product } from "./DealsSection";

interface AddToCartButtonProps {
  product: Product;
  variant?: "default" | "outline" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const AddToCartButton = ({ 
  product, 
  variant = "default",
  size = "default",
  className = "",
}: AddToCartButtonProps) => {
  const { addToCart } = useCart();

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
      }}
    >
      <ShoppingCart className="h-4 w-4 mr-2" />
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;
