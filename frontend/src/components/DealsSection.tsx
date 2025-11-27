
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";

interface DealsSectionProps {
  title: string;
  viewAllLink?: string;
  products: Product[];
}

export interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  ratingCount: number;
  badge?: string;
}

const DealsSection = ({ title, viewAllLink, products }: DealsSectionProps) => {
  return (
    <div className="bg-white rounded shadow-sm my-3">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold text-flipkart-text-primary">{title}</h2>
        {viewAllLink && (
          <Button variant="ghost" className="text-flipkart-blue" asChild>
            <a href={viewAllLink} className="flex items-center">
              View All
              <ChevronRight size={16} className="ml-1" />
            </a>
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default DealsSection;
