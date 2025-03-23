import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      // For demo purposes, we'll just check if the email format is valid
      if (formData.email.includes('@') && formData.password.length >= 6) {
        toast({
          title: "Uspješna prijava",
          description: "Dobrodošli natrag!",
        });
        navigate("/profil");
      } else {
        toast({
          title: "Greška pri prijavi",
          description: "Neispravan email ili lozinka",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-24 pb-10 px-4">
      <div className="max-w-md mx-auto">
        <Card className="border-sneaker/20 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-serif text-center">Prijava</CardTitle>
            <CardDescription className="text-center">
              Unesite svoje podatke da biste pristupili svom profilu
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email adresa</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="email"
                    name="email"
                    type="email" 
                    placeholder="vas@email.com" 
                    className="pl-10"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Lozinka</Label>
                  <button type="button" className="text-xs text-sneaker hover:underline">
                    Zaboravili ste lozinku?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="password"
                    name="password" 
                    type="password" 
                    className="pl-10"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-sneaker hover:bg-sneaker-dark"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Prijava u toku...
                  </span>
                ) : (
                  "Prijava"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Nemate korisnički račun?{" "}
              <button className="text-sneaker hover:underline">
                Registrujte se
              </button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
