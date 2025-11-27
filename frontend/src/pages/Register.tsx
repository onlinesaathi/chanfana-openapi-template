
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, Lock, User, Phone } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate register API call
    setTimeout(() => {
      setIsLoading(false);
      // Mock successful registration
      if (name && email && phone && password) {
        toast({
          title: "Registration successful",
          description: "Your account has been created successfully",
        });
        navigate("/login");
      } else {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: "Please fill all the required fields",
        });
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <div className="bg-flipkart-blue md:min-h-screen md:w-2/5 p-8 flex flex-col justify-between">
        <div className="text-white">
          <h2 className="text-2xl font-bold">Signup</h2>
          <p className="mt-2 text-sm md:text-base opacity-80">
            Sign up with your mobile number or email to get started
          </p>
        </div>
        <img 
          src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png" 
          alt="Signup illustration" 
          className="hidden md:block w-3/4 mx-auto"
        />
      </div>

      <div className="flex-1 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

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
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
              <p className="text-xs text-gray-500">
                Your password must be at least 8 characters long
              </p>
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
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>

            <div className="text-center">
              <span className="text-gray-600">Already have an account?</span>{" "}
              <Link 
                to="/login" 
                className="text-flipkart-blue hover:underline inline-flex items-center"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Login instead
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
