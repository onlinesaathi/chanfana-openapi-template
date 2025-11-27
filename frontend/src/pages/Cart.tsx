
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Please login",
        description: "You need to be logged in to checkout",
      });
      navigate("/login");
      return;
    }
    
    if (items.length === 0) {
      toast({
        variant: "destructive",
        title: "Empty cart",
        description: "Add items to your cart before checkout",
      });
      return;
    }
    
    setIsProcessing(true);
    // Simulate checkout processing
    setTimeout(() => {
      setIsProcessing(false);
      navigate("/checkout");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-xl md:text-2xl font-semibold text-flipkart-text-primary mb-4">
          Shopping Cart {totalItems > 0 ? `(${totalItems} ${totalItems === 1 ? 'item' : 'items'})` : ''}
        </h1>
        
        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="md:col-span-2">
              <div className="bg-white rounded shadow-sm">
                {items.map((item) => (
                  <div key={item.id} className="p-4 border-b last:border-0">
                    <div className="flex flex-col sm:flex-row items-start">
                      {/* Product Image */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mr-4 mb-4 sm:mb-0">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      
                      {/* Product Info */}
                      <div className="flex-grow">
                        <h3 className="text-sm text-flipkart-text-primary font-medium">
                          {item.title}
                        </h3>
                        
                        <div className="flex items-center my-2">
                          <span className="font-medium text-flipkart-text-primary mr-2">
                            ₹{item.price.toLocaleString()}
                          </span>
                          {item.originalPrice && (
                            <span className="text-flipkart-text-secondary text-xs line-through mr-2">
                              ₹{item.originalPrice.toLocaleString()}
                            </span>
                          )}
                          {item.discount && (
                            <span className="text-flipkart-green text-xs">
                              {item.discount}% off
                            </span>
                          )}
                        </div>
                        
                        {/* Quantity Control */}
                        <div className="flex items-center mt-2">
                          <div className="flex items-center border rounded">
                            <button 
                              className="p-1 hover:bg-gray-100"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              aria-label="Decrease quantity"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-3 py-1 min-w-[40px] text-center">
                              {item.quantity}
                            </span>
                            <button 
                              className="p-1 hover:bg-gray-100"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          
                          <button 
                            className="ml-4 text-red-500 hover:text-red-700 flex items-center text-sm"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 size={16} className="mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                      
                      {/* Item Total */}
                      <div className="mt-3 sm:mt-0 sm:ml-4 font-medium text-right">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="md:col-span-1">
              <div className="bg-white rounded shadow-sm p-4 sticky top-20">
                <h2 className="text-lg font-medium text-flipkart-text-primary mb-4 pb-2 border-b">
                  Order Summary
                </h2>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span className="text-flipkart-green">FREE</span>
                  </div>
                  
                  <div className="border-t mt-3 pt-3 font-medium">
                    <div className="flex justify-between text-base">
                      <span>Total</span>
                      <span>₹{totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-6 bg-flipkart-blue hover:bg-flipkart-blue/90"
                  onClick={handleCheckout}
                  disabled={isProcessing || items.length === 0}
                >
                  {isProcessing ? "Processing..." : "Proceed to Checkout"}
                </Button>
                
                <div className="mt-4 text-center">
                  <Link 
                    to="/" 
                    className="text-flipkart-blue hover:underline text-sm"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded shadow-sm p-8 text-center">
            <ShoppingBag className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h2 className="text-xl font-medium text-flipkart-text-primary mb-2">
              Your cart is empty
            </h2>
            <p className="text-flipkart-text-secondary max-w-md mx-auto mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button 
              className="bg-flipkart-blue hover:bg-flipkart-blue/90"
              asChild
            >
              <Link to="/">Start Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
