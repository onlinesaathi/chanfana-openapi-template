
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle, Package, Truck, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const OrderComplete = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const orderId = `FL${Math.floor(Math.random() * 1000000000).toString().padStart(10, '0')}`;
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  
  if (!isAuthenticated) return null;
  
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded shadow-sm p-8">
          {/* Order Success Header */}
          <div className="text-center mb-8">
            <CheckCircle className="h-16 w-16 text-flipkart-green mx-auto mb-4" />
            <h1 className="text-2xl md:text-3xl font-bold text-flipkart-text-primary mb-2">
              Order Placed Successfully!
            </h1>
            <p className="text-flipkart-text-secondary">
              Thank you for your purchase. Your order has been confirmed.
            </p>
          </div>
          
          {/* Order Details Card */}
          <div className="border rounded p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between mb-4 pb-4 border-b">
              <div>
                <h2 className="text-lg font-medium">Order Details</h2>
                <p className="text-flipkart-text-secondary text-sm">
                  Order #: {orderId}
                </p>
              </div>
              <div className="mt-2 md:mt-0">
                <p className="text-flipkart-text-secondary text-sm">
                  Order Date: {new Date().toLocaleDateString("en-IN", { 
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
            
            {/* Tracking Timeline */}
            <div className="mb-6">
              <h3 className="font-medium mb-4">Order Tracking</h3>
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-3.5 top-1 h-full w-0.5 bg-gray-200"></div>
                
                {/* Order Placed */}
                <div className="flex items-start mb-6 relative z-10">
                  <div className="h-7 w-7 bg-flipkart-green rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium">Order Placed</h4>
                    <p className="text-sm text-flipkart-text-secondary">
                      Your order has been confirmed
                    </p>
                  </div>
                </div>
                
                {/* Processing */}
                <div className="flex items-start mb-6 relative z-10">
                  <div className="h-7 w-7 bg-gray-200 rounded-full flex items-center justify-center">
                    <Package className="h-4 w-4 text-gray-500" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium">Processing</h4>
                    <p className="text-sm text-flipkart-text-secondary">
                      Your order is being processed
                    </p>
                  </div>
                </div>
                
                {/* Shipping */}
                <div className="flex items-start relative z-10">
                  <div className="h-7 w-7 bg-gray-200 rounded-full flex items-center justify-center">
                    <Truck className="h-4 w-4 text-gray-500" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium">On the Way</h4>
                    <p className="text-sm text-flipkart-text-secondary">
                      Estimated delivery: {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", { 
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long'
                    })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Email Notification */}
            <div className="bg-gray-50 p-4 rounded-md text-sm">
              <p className="text-center text-flipkart-text-secondary">
                A confirmation email has been sent to your registered email address with all the order details.
              </p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Button 
              className="bg-flipkart-blue hover:bg-flipkart-blue/90"
              asChild
            >
              <Link to="/">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
            
            <Button 
              variant="outline"
              asChild
            >
              <Link to="#">
                View Order Status
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderComplete;
