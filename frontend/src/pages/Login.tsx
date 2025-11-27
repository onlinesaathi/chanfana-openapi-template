
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Mail, Lock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        toast({
          title: "Login successful",
          description: "You've been logged in to your account",
        });
        navigate("/");
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Please check your credentials and try again",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An error occurred during login",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <div className="bg-flipkart-blue md:min-h-screen md:w-2/5 p-8 flex flex-col justify-between">
        <div className="text-white">
          <h2 className="text-2xl font-bold">Login</h2>
          <p className="mt-2 text-sm md:text-base opacity-80">
            Get access to your Orders, Wishlist and Recommendations
          </p>
        </div>
        <img 
          src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png" 
          alt="Login illustration" 
          className="hidden md:block w-3/4 mx-auto"
        />
      </div>

      <div className="flex-1 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-flipkart-blue hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="text-sm text-gray-500">
              By continuing, you agree to Flipkart's{" "}
              <a href="#" className="text-flipkart-blue hover:underline">
                Terms of Use
              </a>{" "}
              and{" "}
              <a href="#" className="text-flipkart-blue hover:underline">
                Privacy Policy
              </a>
              .
            </div>

            <Button 
              type="submit" 
              className="w-full bg-flipkart-blue hover:bg-flipkart-blue/90"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>

            <div className="text-center">
              <span className="text-gray-600">New to Flipkart?</span>{" "}
              <Link 
                to="/register" 
                className="text-flipkart-blue hover:underline inline-flex items-center"
              >
                Create an account
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
