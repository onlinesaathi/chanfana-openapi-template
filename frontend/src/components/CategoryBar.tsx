
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  { id: 1, name: "Top Offers", icon: "🔥", slug: "offers" },
  { id: 2, name: "Mobiles & Tablets", icon: "📱", slug: "mobiles" },
  { id: 3, name: "Electronics", icon: "💻", slug: "electronics" },
  { id: 4, name: "TVs & Appliances", icon: "📺", slug: "appliances" },
  { id: 5, name: "Fashion", icon: "👕", slug: "fashion" },
  { id: 6, name: "Beauty", icon: "✨", slug: "beauty" },
  { id: 7, name: "Home & Kitchen", icon: "🏠", slug: "home" },
  { id: 8, name: "Furniture", icon: "🪑", slug: "furniture" },
  { id: 9, name: "Flights", icon: "✈️", slug: "flights" },
  { id: 10, name: "Grocery", icon: "🛒", slug: "grocery" },
  { id: 11, name: "Toys", icon: "🧸", slug: "toys" },
  { id: 12, name: "Books", icon: "📚", slug: "books" },
];

const CategoryBar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const container = document.getElementById("category-container");
    if (container) {
      setContainerWidth(container.clientWidth);
      setMaxScroll(container.scrollWidth - container.clientWidth);
      setShowControls(container.scrollWidth > container.clientWidth);

      const handleResize = () => {
        setContainerWidth(container.clientWidth);
        setMaxScroll(container.scrollWidth - container.clientWidth);
        setShowControls(container.scrollWidth > container.clientWidth);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const scrollLeft = () => {
    const container = document.getElementById("category-container");
    if (container) {
      const newPosition = Math.max(scrollPosition - containerWidth, 0);
      container.scrollTo({ left: newPosition, behavior: "smooth" });
      setScrollPosition(newPosition);
    }
  };

  const scrollRight = () => {
    const container = document.getElementById("category-container");
    if (container) {
      const newPosition = Math.min(scrollPosition + containerWidth, maxScroll);
      container.scrollTo({ left: newPosition, behavior: "smooth" });
      setScrollPosition(newPosition);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollPosition(e.currentTarget.scrollLeft);
  };

  return (
    <div className="relative bg-white shadow-sm">
      {showControls && scrollPosition > 0 && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md z-10 p-1"
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      <div
        id="category-container"
        className="flex overflow-x-auto scrollbar-hide py-3 px-4 scroll-smooth"
        onScroll={handleScroll}
      >
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.slug}`}
            className="flex flex-col items-center min-w-[80px] px-2 text-flipkart-text-primary transition-transform hover:scale-105"
          >
            <span className="text-2xl mb-1">{category.icon}</span>
            <span className="text-xs text-center font-medium">{category.name}</span>
          </Link>
        ))}
      </div>

      {showControls && scrollPosition < maxScroll && (
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md z-10 p-1"
          aria-label="Scroll right"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
};

export default CategoryBar;
