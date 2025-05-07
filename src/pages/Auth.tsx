
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { Code, LogIn, User, Mail, Lock, Apple, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  
  // Redirect if user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would connect to an authentication service
    if (email && password) {
      login({ email }); // Use the login function from AuthContext
      toast({
        title: isLogin ? "Logged in successfully" : "Account created successfully",
        description: "Welcome to CloudStash"
      });
      navigate('/');
    } else {
      toast({
        title: "Authentication error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
    }
  };

  const handleGoogleAuth = () => {
    // In a real app, this would integrate with Google OAuth
    login({ email: 'user@example.com' });
    toast({
      title: "Signed in with Google",
      description: "Welcome to CloudStash"
    });
    navigate('/');
  };

  const handleAppleAuth = () => {
    // In a real app, this would integrate with Apple OAuth
    login({ email: 'user@example.com' });
    toast({
      title: "Signed in with Apple",
      description: "Welcome to CloudStash"
    });
    navigate('/');
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-background to-background/80">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-2">
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 opacity-75 blur"></div>
              <div className="relative bg-background rounded-full p-2">
                <Code className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div className="text-3xl font-mono font-bold tracking-tight">
              <span className="text-primary glow-text">Cloud</span>
              <span className="text-primary/80">Stash</span>
            </div>
          </div>
          <p className="text-muted-foreground mt-2 font-mono text-sm">
            Secure cloud storage for developers
          </p>
        </div>

        <Card className="border border-white/10 shadow-lg bg-black/40 backdrop-blur-xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-xl font-mono">
              {isLogin ? 'Sign in to your account' : 'Create a new account'}
            </CardTitle>
            <CardDescription className="font-mono text-xs">
              Choose your preferred sign in method
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <Button 
                variant="outline" 
                onClick={handleGoogleAuth}
                className="font-mono h-11"
              >
                <svg 
                  className="mr-2 h-4 w-4" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign in with Google
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleAppleAuth}
                className="font-mono h-11 bg-black text-white border-white/20 hover:bg-black/80"
              >
                <Apple className="mr-2 h-4 w-4" />
                Sign in with Apple
              </Button>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-2 text-muted-foreground font-mono">
                  Or continue with email
                </span>
              </div>
            </div>
            
            <form onSubmit={handleAuth} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 font-mono tech-input"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 font-mono tech-input"
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full font-mono">
                {isLogin ? <LogIn className="mr-2 h-4 w-4" /> : <User className="mr-2 h-4 w-4" />}
                {isLogin ? 'Sign In' : 'Sign Up'}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-center text-sm font-mono">
              {isLogin ? (
                <span>
                  Don't have an account?{' '}
                  <button
                    onClick={() => setIsLogin(false)}
                    className="text-primary hover:underline focus:outline-none"
                  >
                    Sign up
                  </button>
                </span>
              ) : (
                <span>
                  Already have an account?{' '}
                  <button
                    onClick={() => setIsLogin(true)}
                    className="text-primary hover:underline focus:outline-none"
                  >
                    Sign in
                  </button>
                </span>
              )}
            </div>
          </CardFooter>
        </Card>
        
        <div className="text-center mt-4">
          <p className="text-xs text-muted-foreground font-mono">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
