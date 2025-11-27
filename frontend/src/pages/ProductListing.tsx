
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import FilterSidebar from "@/components/FilterSidebar";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Product } from "@/components/DealsSection";
import { ChevronDown, ChevronUp, Filter, SlidersHorizontal } from "lucide-react";

// Mock data for different categories
const categoryProductsMap: Record<string, Product[]> = {
  electronics: [
    {
      id: 101,
      title: "Apple MacBook Air M1 Chip",
      image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=500&h=500&q=80",
      price: 89990,
      originalPrice: 99900,
      discount: 10,
      rating: 4.8,
      ratingCount: 3245,
      badge: "Bestseller",
    },
    {
      id: 102,
      title: "Dell XPS 13 Ultra Thin Laptop",
      image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=500&h=500&q=80",
      price: 119990,
      originalPrice: 129900,
      discount: 8,
      rating: 4.6,
      ratingCount: 1245,
    },
    {
      id: 103,
      title: "Sony WH-1000XM4 Noise Cancelling Headphones",
      image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=500&h=500&q=80",
      price: 24990,
      originalPrice: 29990,
      discount: 17,
      rating: 4.7,
      ratingCount: 8521,
    },
    {
      id: 104,
      title: "Samsung Galaxy S22 Ultra",
      image: "https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?auto=format&fit=crop&w=500&h=500&q=80",
      price: 99999,
      originalPrice: 109999,
      discount: 9,
      rating: 4.5,
      ratingCount: 6254,
    },
    {
      id: 105,
      title: "Apple iPad Pro 11-inch",
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=500&h=500&q=80",
      price: 71900,
      originalPrice: 79900,
      discount: 10,
      rating: 4.9,
      ratingCount: 2104,
    },
    {
      id: 106,
      title: "LG 55-inch OLED 4K Smart TV",
      image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=500&h=500&q=80",
      price: 129990,
      originalPrice: 149990,
      discount: 13,
      rating: 4.4,
      ratingCount: 1876,
    },
  ],
  fashion: [
    {
      id: 201,
      title: "Men's Cotton Casual Shirt",
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=500&h=500&q=80",
      price: 899,
      originalPrice: 1499,
      discount: 40,
      rating: 4.2,
      ratingCount: 3452,
    },
    {
      id: 202,
      title: "Women's Designer Dress",
      image: "https://images.unsplash.com/photo-1534126511673-b6899657816a?auto=format&fit=crop&w=500&h=500&q=80",
      price: 1299,
      originalPrice: 1999,
      discount: 35,
      rating: 4.5,
      ratingCount: 1876,
    },
    {
      id: 203,
      title: "Unisex Running Shoes",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&h=500&q=80",
      price: 2999,
      originalPrice: 4499,
      discount: 33,
      rating: 4.7,
      ratingCount: 6532,
    },
    {
      id: 204,
      title: "Leather Formal Shoes",
      image: "https://images.unsplash.com/photo-1531310197839-ccf54634509e?auto=format&fit=crop&w=500&h=500&q=80",
      price: 1999,
      originalPrice: 2999,
      discount: 33,
      rating: 4.3,
      ratingCount: 1234,
    },
    {
      id: 205,
      title: "Designer Sunglasses",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=500&h=500&q=80",
      price: 2499,
      originalPrice: 3999,
      discount: 38,
      rating: 4.4,
      ratingCount: 876,
    },
    {
      id: 206,
      title: "Women's Handbag",
      image: "https://images.unsplash.com/photo-1592876569760-90a87a10096b?auto=format&fit=crop&w=500&h=500&q=80",
      price: 1799,
      originalPrice: 2499,
      discount: 28,
      rating: 4.6,
      ratingCount: 2398,
    },
  ],
  mobiles: [
    {
      id: 301,
      title: "Apple iPhone 14 Pro Max",
      image: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=500&h=500&q=80",
      price: 129900,
      originalPrice: 139900,
      discount: 7,
      rating: 4.9,
      ratingCount: 4563,
      badge: "Premium",
    },
    {
      id: 302,
      title: "Samsung Galaxy S23 Ultra",
      image: "https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?auto=format&fit=crop&w=500&h=500&q=80",
      price: 99999,
      originalPrice: 109999,
      discount: 9,
      rating: 4.7,
      ratingCount: 3245,
    },
    {
      id: 303,
      title: "Google Pixel 7 Pro",
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&h=500&q=80",
      price: 69999,
      originalPrice: 79999,
      discount: 13,
      rating: 4.6,
      ratingCount: 1876,
    },
    {
      id: 304,
      title: "OnePlus 11 5G",
      image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=500&h=500&q=80",
      price: 56999,
      originalPrice: 59999,
      discount: 5,
      rating: 4.5,
      ratingCount: 2134,
    },
    {
      id: 305,
      title: "Xiaomi 13 Pro",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&h=500&q=80",
      price: 49999,
      originalPrice: 59999,
      discount: 17,
      rating: 4.3,
      ratingCount: 3456,
    },
  ],
  // Add more categories as needed
};

// Default category if none is specified
const allProducts = Object.values(categoryProductsMap).flat();

const ProductListing = () => {
  const { category } = useParams<{ category: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortOption, setSortOption] = useState(searchParams.get("sort") || "popularity");

  // Get applied filters from URL params
  const minPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : 0;
  const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : 1000000;
  const minRating = searchParams.get("minRating") ? Number(searchParams.get("minRating")) : 0;

  // Get category products or all products if no category
  useEffect(() => {
    if (category && categoryProductsMap[category]) {
      setProducts(categoryProductsMap[category]);
    } else {
      setProducts(allProducts);
    }
  }, [category]);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];

    // Apply price filter
    result = result.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );

    // Apply rating filter
    if (minRating > 0) {
      result = result.filter((product) => product.rating >= minRating);
    }

    // Apply sorting
    if (sortOption === "price_asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price_desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "discount") {
      result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
    } else {
      // Default sort by popularity (rating * ratingCount)
      result.sort((a, b) => b.rating * b.ratingCount - a.rating * a.ratingCount);
    }

    setFilteredProducts(result);
  }, [products, minPrice, maxPrice, minRating, sortOption]);

  const handleSortChange = (value: string) => {
    setSortOption(value);
    searchParams.set("sort", value);
    setSearchParams(searchParams);
  };

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  // Format category name for display
  const getCategoryTitle = () => {
    if (!category) return "All Products";
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-flipkart-text-primary">
              {getCategoryTitle()}
            </h1>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden flex items-center"
                onClick={toggleMobileFilters}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {showMobileFilters ? (
                  <ChevronUp className="h-4 w-4 ml-2" />
                ) : (
                  <ChevronDown className="h-4 w-4 ml-2" />
                )}
              </Button>
              <div className="hidden lg:block">
                <select
                  className="bg-white border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-flipkart-blue"
                  value={sortOption}
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  <option value="popularity">Popularity</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="discount">Discount</option>
                </select>
              </div>
            </div>
          </div>

          <div className="lg:flex gap-4">
            {/* Mobile Filters (Collapsible) */}
            {showMobileFilters && (
              <div className="lg:hidden w-full mb-4 bg-white rounded shadow-sm p-4">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="font-medium text-flipkart-text-primary">Filters</h2>
                  <button
                    className="text-flipkart-blue text-sm"
                    onClick={() => {
                      setSearchParams(new URLSearchParams());
                      window.location.reload();
                    }}
                  >
                    Clear All
                  </button>
                </div>
                <FilterSidebar />
                <div className="mt-3">
                  <select
                    className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-flipkart-blue"
                    value={sortOption}
                    onChange={(e) => handleSortChange(e.target.value)}
                  >
                    <option value="popularity">Popularity</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="discount">Discount</option>
                  </select>
                </div>
              </div>
            )}

            {/* Desktop Filters (Sidebar) */}
            <div className="hidden lg:block w-1/4 min-w-[250px] bg-white rounded shadow-sm p-4 h-fit">
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-medium text-flipkart-text-primary">Filters</h2>
                <button
                  className="text-flipkart-blue text-sm"
                  onClick={() => {
                    setSearchParams(new URLSearchParams());
                    window.location.reload();
                  }}
                >
                  Clear All
                </button>
              </div>
              <FilterSidebar />
            </div>

            {/* Product Grid */}
            <div className="lg:w-3/4 bg-white rounded shadow-sm">
              <div className="p-4 border-b hidden lg:block">
                <p className="text-sm text-flipkart-text-secondary">
                  Showing {filteredProducts.length} products 
                  {category ? ` in ${getCategoryTitle()}` : ""}
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                ) : (
                  <div className="col-span-full py-8 text-center">
                    <SlidersHorizontal className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-flipkart-text-primary mb-2">
                      No products found
                    </h3>
                    <p className="text-flipkart-text-secondary">
                      Try changing your filter criteria
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductListing;
