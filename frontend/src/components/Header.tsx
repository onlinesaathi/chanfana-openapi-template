
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const { totalItems } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-flipkart-blue text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2.5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-1">
            <div className="mr-1 md:mr-4">
              <Link to="/" className="flex flex-col items-center">
                <span className="font-bold text-xl">Flipkart</span>
                <span className="text-[10px] italic text-flipkart-yellow flex items-center">
                  Explore <span className="text-white mx-0.5">Plus</span> ✨
                </span>
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu size={20} />
            </button>
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 mx-4 max-w-3xl relative">
            <Input
              type="search"
              placeholder="Search for products, brands and more"
              className="bg-white text-black rounded-sm py-2 pl-4 pr-12 text-sm w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit" 
              className="absolute right-3 top-2.5 h-5 w-5 text-flipkart-blue"
            >
              <Search className="h-5 w-5" />
            </button>
            {searchQuery && (
              <button 
                type="button" 
                className="absolute right-10 top-2.5 h-5 w-5 text-flipkart-blue"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </form>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              <div className="relative group">
                <Button variant="ghost" className="text-white font-medium hover:bg-blue-600">
                  <User className="h-4 w-4 mr-2" />
                  {user?.name || "Account"}
                </Button>
                <div className="absolute right-0 w-48 bg-white text-flipkart-text-primary rounded shadow-lg py-2 mt-0.5 hidden group-hover:block z-50">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium">Hello, {user?.name}</p>
                    <p className="text-xs text-flipkart-text-secondary">{user?.email}</p>
                  </div>
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">My Orders</a>
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Wishlist</a>
                  <button 
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-500"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Button variant="ghost" className="text-white font-medium hover:bg-blue-600" asChild>
                <Link to="/login">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Link>
              </Button>
            )}
            <a href="#" className="font-medium hover:underline">Become a Seller</a>
            <div className="relative">
              <Button variant="ghost" className="text-white font-medium hover:bg-blue-600" asChild>
                <Link to="/cart">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart
                </Link>
              </Button>
              <span className="absolute -top-1 -right-1 bg-flipkart-yellow text-flipkart-blue text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            </div>
          </nav>
        </div>

        {/* Mobile search - shown only on mobile */}
        <form onSubmit={handleSearch} className="mt-2 md:hidden relative">
          <Input
            type="search"
            placeholder="Search for products, brands and more"
            className="bg-white text-black rounded-sm py-2 pl-4 pr-12 text-sm w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            type="submit" 
            className="absolute right-3 top-2.5 h-5 w-5 text-flipkart-blue"
          >
            <Search className="h-5 w-5" />
          </button>
          {searchQuery && (
            <button 
              type="button" 
              className="absolute right-10 top-2.5 h-5 w-5 text-flipkart-blue"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </form>

        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 bg-white text-flipkart-text-primary rounded shadow-md p-4 absolute left-0 right-0 z-50">
            <nav className="flex flex-col space-y-4">
              {isAuthenticated ? (
                <>
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium">Hello, {user?.name}</p>
                    <p className="text-xs text-flipkart-text-secondary">{user?.email}</p>
                  </div>
                  <a href="#" className="py-2 px-4 hover:bg-gray-100 rounded">My Orders</a>
                  <a href="#" className="py-2 px-4 hover:bg-gray-100 rounded">Wishlist</a>
                  <button 
                    onClick={logout}
                    className="text-left py-2 px-4 hover:bg-gray-100 rounded text-red-500"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="flex items-center py-2 px-4 hover:bg-gray-100 rounded">
                  <User className="h-4 w-4 mr-2 text-flipkart-blue" />
                  <span>Login</span>
                </Link>
              )}
              <a href="#" className="py-2 px-4 hover:bg-gray-100 rounded">Become a Seller</a>
              <Link to="/cart" className="flex items-center py-2 px-4 hover:bg-gray-100 rounded">
                <ShoppingCart className="h-4 w-4 mr-2 text-flipkart-blue" />
                <span>Cart</span>
                <span className="ml-2 bg-flipkart-blue text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
