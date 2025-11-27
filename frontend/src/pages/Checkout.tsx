
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, CreditCard, Truck, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const Checkout = () => {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Form fields
  const [address, setAddress] = useState({
    fullName: user?.name || "",
    phone: "",
    streetAddress: "",
    city: "",
    state: "",
    pincode: "",
  });
  
  // Card details
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    nameOnCard: "",
    expiry: "",
    cvv: "",
  });
  
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }
  
  if (items.length === 0) {
    navigate("/cart");
    return null;
  }
  
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (
      !address.fullName ||
      !address.phone ||
      !address.streetAddress ||
      !address.city ||
      !address.state ||
      !address.pincode
    ) {
      toast({
        variant: "destructive",
        title: "Please fill all address fields",
        description: "All address fields are required to place an order",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Create server-side Razorpay order (backend will use secret keys)
      const createResp: any = await (await import("@/services/api")).apiClient.payments.razorpay.createOrder({ amount: totalPrice });
      const order = createResp.order;
      if (!order) throw new Error("Failed to create order");

      // Load Razorpay checkout script if not present
      if (!(window as any).Razorpay) {
        await new Promise<void>((resolve, reject) => {
          const s = document.createElement("script");
          s.src = "https://checkout.razorpay.com/v1/checkout.js";
          s.async = true;
          s.onload = () => resolve();
          s.onerror = () => reject(new Error("Failed to load Razorpay SDK"));
          document.head.appendChild(s);
        });
      }

      const options: any = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount, // amount in paise
        currency: order.currency,
        name: "GenZmart",
        description: `Order ${order.receipt || order.id}`,
        order_id: order.id,
        handler: async (response: any) => {
          try {
            // Verify payment on server
            const verifyResp: any = await (await import("@/services/api")).apiClient.payments.razorpay.verify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyResp.verified) {
              clearCart();
              navigate("/order-complete");
            } else {
              toast({ variant: "destructive", title: "Payment verification failed" });
            }
          } catch (err: any) {
            toast({ variant: "destructive", title: "Payment verification error", description: err.message });
          }
        },
        prefill: {
          name: address.fullName,
          email: (user && (user as any).email) || "",
          contact: address.phone,
        },
        theme: { color: "#2563eb" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      toast({ variant: "destructive", title: "Payment error", description: err.message });
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-xl md:text-2xl font-semibold text-genzmart-text-primary mb-6">
          Checkout
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column - Address & Payment */}
          <div className="md:col-span-2">
            <form onSubmit={handlePlaceOrder}>
              {/* Shipping Address Section */}
              <div className="bg-white rounded shadow-sm p-6 mb-6">
                <div className="flex items-center mb-4">
                  <MapPin className="mr-2 text-genzmart-blue" size={20} />
                  <h2 className="text-lg font-medium">Shipping Address</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={address.fullName}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={address.phone}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="streetAddress">Street Address</Label>
                    <Textarea
                      id="streetAddress"
                      name="streetAddress"
                      value={address.streetAddress}
                      onChange={handleAddressChange}
                      rows={2}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={address.city}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      name="state"
                      value={address.state}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="pincode">PIN Code</Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      value={address.pincode}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                </div>
              </div>
              
              {/* Payment Section */}
              <div className="bg-white rounded shadow-sm p-6 mb-6">
                <div className="flex items-center mb-4">
                  <CreditCard className="mr-2 text-genzmart-blue" size={20} />
                  <h2 className="text-lg font-medium">Payment Method</h2>
                </div>
                
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="mb-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card">Credit/Debit Card</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod">Cash on Delivery</Label>
                  </div>
                </RadioGroup>
                
                {paymentMethod === "card" && (
                  <div className="border p-4 rounded mt-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="XXXX XXXX XXXX XXXX"
                          value={cardDetails.cardNumber}
                          onChange={handleCardDetailsChange}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="nameOnCard">Name on Card</Label>
                        <Input
                          id="nameOnCard"
                          name="nameOnCard"
                          value={cardDetails.nameOnCard}
                          onChange={handleCardDetailsChange}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date (MM/YY)</Label>
                          <Input
                            id="expiry"
                            name="expiry"
                            placeholder="MM/YY"
                            value={cardDetails.expiry}
                            onChange={handleCardDetailsChange}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            placeholder="XXX"
                            type="password"
                            maxLength={3}
                            value={cardDetails.cvv}
                            onChange={handleCardDetailsChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Place Order Button (Mobile only) */}
              <div className="md:hidden">
                <Button 
                  type="submit" 
                  className="w-full bg-genzmart-blue hover:bg-genzmart-blue/90"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>
              </div>
            </form>
          </div>
          
          {/* Right column - Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded shadow-sm p-6 sticky top-20">
              <h2 className="text-lg font-medium text-flipkart-text-primary mb-4 pb-2 border-b">
                Order Summary
              </h2>
              
              {/* Items Overview */}
              <div className="max-h-60 overflow-y-auto mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center py-2 border-b last:border-0">
                    <div className="w-10 h-10 rounded bg-gray-100 flex-shrink-0 mr-3">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm line-clamp-1">{item.title}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Price Breakdown */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                    <span>Delivery</span>
                    <span className="text-genzmart-green">FREE</span>
                  </div>
                
                <div className="border-t mt-3 pt-3 font-medium">
                  <div className="flex justify-between text-base">
                    <span>Total</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              {/* Delivery Info */}
                  <div className="mt-4 bg-gray-50 p-3 rounded text-sm">
                <div className="flex items-start">
                  <Truck className="text-genzmart-blue mr-2 mt-0.5" size={18} />
                  <div>
                    <p className="font-medium">Estimated Delivery</p>
                    <p className="text-gray-600">
                      {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", { 
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long'
                      })}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Place Order Button (Desktop) */}
              <div className="hidden md:block mt-6">
                <Button 
                  type="button" 
                  className="w-full bg-flipkart-blue hover:bg-flipkart-blue/90"
                  disabled={isProcessing}
                  onClick={handlePlaceOrder}
                >
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
