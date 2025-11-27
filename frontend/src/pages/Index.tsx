
import Header from "@/components/Header";
import CategoryBar from "@/components/CategoryBar";
import Banner from "@/components/Banner";
import DealsSection from "@/components/DealsSection";
import Footer from "@/components/Footer";

const productData = {
  deals: [
    {
      id: 1,
      title: "Apple iPhone 13 (128GB) - Midnight",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=500&h=500&q=80",
      price: 59999,
      originalPrice: 69900,
      discount: 14,
      rating: 4.7,
      ratingCount: 12387,
      badge: "Trending",
    },
    {
      id: 2,
      title: "Samsung Galaxy S22 Ultra 5G (Burgundy, 12GB, 256GB Storage)",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=500&h=500&q=80",
      price: 109999,
      originalPrice: 131999,
      discount: 17,
      rating: 4.5,
      ratingCount: 3254,
    },
    {
      id: 3,
      title: "Apple 2022 MacBook Air Laptop with M2 chip",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&h=500&q=80",
      price: 119990,
      originalPrice: 129900,
      discount: 8,
      rating: 4.8,
      ratingCount: 876,
      badge: "Sale",
    },
    {
      id: 4,
      title: "Sony WH-1000XM4 Industry Leading Wireless Noise Cancelling Headphones",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=500&h=500&q=80",
      price: 24990,
      originalPrice: 29990,
      discount: 17,
      rating: 4.6,
      ratingCount: 4532,
    },
    {
      id: 5,
      title: "OnePlus 10 Pro 5G (Emerald Forest, 12GB RAM, 256GB Storage)",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=500&h=500&q=80",
      price: 66999,
      originalPrice: 71999,
      discount: 7,
      rating: 4.4,
      ratingCount: 2897,
    },
  ],
  topOffers: [
    {
      id: 6,
      title: "boAt Airdopes 141 Bluetooth Truly Wireless in Ear Earbuds",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=500&h=500&q=80",
      price: 1299,
      originalPrice: 4490,
      discount: 71,
      rating: 4.1,
      ratingCount: 87335,
      badge: "Best Seller",
    },
    {
      id: 7,
      title: "Lenovo IdeaPad Slim 3 Intel Core i5 11th Gen",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&h=500&q=80",
      price: 54990,
      originalPrice: 82990,
      discount: 34,
      rating: 4.2,
      ratingCount: 1254,
    },
    {
      id: 8,
      title: "Samsung 108 cm (43 inches) Crystal 4K Series Ultra HD Smart LED TV",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=500&h=500&q=80",
      price: 33990,
      originalPrice: 52900,
      discount: 36,
      rating: 4.3,
      ratingCount: 6754,
    },
    {
      id: 9,
      title: "OPPO F21 Pro 5G (Rainbow Spectrum, 8GB RAM, 128 Storage)",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=500&h=500&q=80",
      price: 26999,
      originalPrice: 29999,
      discount: 10,
      rating: 4.0,
      ratingCount: 3489,
    },
    {
      id: 10,
      title: "Canon EOS 1500D 24.1 Digital SLR Camera with EF S18-55",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=500&h=500&q=80",
      price: 39990,
      originalPrice: 45995,
      discount: 13,
      rating: 4.5,
      ratingCount: 2167,
    },
  ],
};

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <CategoryBar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-3">
        <Banner />
        <DealsSection
          title="Deals of the Day"
          viewAllLink="#"
          products={productData.deals}
        />
        <DealsSection
          title="Top Offers"
          viewAllLink="#"
          products={productData.topOffers}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
