
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (email) {
        setSent(true);
        toast({
          title: "Reset email sent",
          description: "Check your inbox for password reset instructions",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Failed to send email",
          description: "Please enter a valid email address",
        });
      }
    }, 1500);
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <div className="bg-flipkart-blue md:min-h-screen md:w-2/5 p-8 flex flex-col justify-between">
        <div className="text-white">
          <h2 className="text-2xl font-bold">Forgot Password</h2>
          <p className="mt-2 text-sm md:text-base opacity-80">
            Enter your email to receive password reset instructions
          </p>
        </div>
        <img 
          src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png" 
          alt="Forgot password illustration" 
          className="hidden md:block w-3/4 mx-auto"
        />
      </div>

      <div className="flex-1 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          {!sent ? (
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

              <Button 
                type="submit" 
                className="w-full bg-flipkart-blue hover:bg-flipkart-blue/90"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>

              <div className="text-center">
                <Link 
                  to="/login" 
                  className="text-flipkart-blue hover:underline inline-flex items-center"
                >
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Back to login
                </Link>
              </div>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="bg-green-50 text-green-600 p-4 rounded-md mb-4">
                <h3 className="font-medium text-lg">Email Sent!</h3>
                <p className="mt-1">
                  We've sent password reset instructions to:
                </p>
                <p className="font-medium mt-1">{email}</p>
              </div>
              <p className="text-gray-600">
                Please check your email inbox and follow the instructions to reset your password.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Didn't receive the email? Check your spam folder or request another reset link.
              </p>
              <div className="pt-4">
                <Button 
                  variant="outline" 
                  onClick={handleBackToLogin}
                  className="mx-auto"
                >
                  Back to Login
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
