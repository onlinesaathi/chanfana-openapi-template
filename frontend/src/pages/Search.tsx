
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/components/DealsSection";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading search results
    setLoading(true);
    setTimeout(() => {
      // Mock search results based on query
      const mockProducts: Product[] = Array(8).fill(null).map((_, index) => ({
        id: index,
        title: `${query} Product ${index + 1} - Search Result`,
        image: `https://placehold.co/300x300/2874f0/FFFFFF?text=${query.charAt(0).toUpperCase()}`,
        price: Math.floor(Math.random() * 10000) + 999,
        originalPrice: Math.floor(Math.random() * 20000) + 1999,
        discount: Math.floor(Math.random() * 50) + 10,
        rating: (Math.random() * 3 + 2).toFixed(1) as unknown as number,
        ratingCount: Math.floor(Math.random() * 10000) + 100,
        ...(Math.random() > 0.5 && { badge: "Top Seller" })
      }));
      
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-100 py-4">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded shadow-sm mb-4 p-4">
          <h1 className="text-lg md:text-xl font-medium text-flipkart-text-primary">
            Search Results for "{query}"
          </h1>
        </div>

        {loading ? (
          <div className="bg-white rounded shadow-sm p-8 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-flipkart-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-flipkart-text-primary">Searching for "{query}"...</p>
            </div>
          </div>
        ) : products.length > 0 ? (
          <div className="bg-white rounded shadow-sm">
            <div className="p-4 border-b">
              <p className="text-sm text-flipkart-text-secondary">
                Showing {products.length} results for "{query}"
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded shadow-sm p-8 text-center">
            <Search className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h2 className="text-xl font-medium text-flipkart-text-primary mb-2">
              No results found for "{query}"
            </h2>
            <p className="text-flipkart-text-secondary max-w-md mx-auto">
              We couldn't find any matches for your search. Please try another search term or browse our categories.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
