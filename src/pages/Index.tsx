
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get featured products (first 3)
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="min-h-screen pt-24 pb-12 animate-fade-up">
      {/* Hero Section */}
      <section className="sneaker-container mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="sneaker-title mb-6">Dobrodošli u Sneaker Zone</h1>
          <p className="text-lg text-gray-700 mb-8">
            Najbolja destinacija za premium sportsku obuću. Pronađite svoj savršeni par tenisica za sport, rekreaciju ili svakodnevno nošenje.
          </p>
          <Button 
            className="bg-sneaker hover:bg-sneaker-light text-white px-6 py-3 rounded-md text-lg"
            asChild
          >
            <Link to="/proizvodi">
              Pogledaj proizvode
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="sneaker-container mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="sneaker-subtitle">Istaknuti proizvodi</h2>
          <Link 
            to="/proizvodi" 
            className="text-sneaker hover:underline flex items-center"
          >
            Svi proizvodi <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-50 py-16">
        <div className="sneaker-container">
          <h2 className="sneaker-subtitle text-center mb-12">Zašto izabrati nas?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-sneaker/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sneaker" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Kvalitetni proizvodi</h3>
              <p className="text-gray-600">Samo originalni brendovi i najbolji kvalitet.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-sneaker/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sneaker" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Brza dostava</h3>
              <p className="text-gray-600">Isporuka u najkraćem mogućem roku.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-sneaker/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sneaker" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Sigurno plaćanje</h3>
              <p className="text-gray-600">Više načina plaćanja i zaštićene transakcije.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
