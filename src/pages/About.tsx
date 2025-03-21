
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-100 animate-fade-up">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 sm:px-6 lg:px-8">
          {/* Text content */}
          <div className="pt-8 lg:pt-16">
            <h1 className="text-4xl font-bold mb-6">Ko smo mi?</h1>
            <div className="space-y-4 text-gray-700">
              <p>
                Mi smo kompanija specijalizirana za proizvodnju i prodaju obuće 
                koja spaja inovativne materijale i vrhunski dizajn kako bismo 
                odgovorili na sve potrebe naših kupaca. Naša strast je stvaranje 
                obuće koja ne samo da izgleda sjajno, već i pruža funkcionalnost i 
                pouzdanost u svakodnevnim izazovima.
              </p>
              <p>
                Posebno se ponosimo našim izborom materijala. Naša obuća 
                izrađena je s naglaskom na vodootpornost i vodonepropusnost, 
                omogućujući vam bezbrižno kretanje kroz kišu, snijeg ili mokre 
                terene. Koristimo napredne membrane i premaze koji osiguravaju da 
                vaša stopala ostanu suha u svim uvjetima, dok istovremeno 
                omogućujemo prirodnu prozračnost kako bi vam bilo udobno 
                tijekom cijelog dana.
              </p>
              <p className="font-medium">
                Pridružite nam se u otkrivanju obuće koja čini razliku – svaki korak 
                vrijedi!
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-12">
              <Button 
                className="bg-[#8B0000] hover:bg-[#a00000] text-white px-6 py-5 text-base"
                asChild
              >
                <Link to="/proizvodi">
                  Pogledaj proizvode
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="bg-transparent border-gray-300 text-gray-700 hover:bg-gray-200 px-6 py-5 text-base"
                asChild
              >
                <Link to="/">
                  Napusti stranicu
                </Link>
              </Button>
            </div>
          </div>

          {/* Image section */}
          <div className="relative flex items-center justify-center pt-8 lg:pt-0">
            <div className="relative">
              <div className="absolute -top-16 -right-16 w-32 h-32 border border-gray-400 rounded-full"></div>
              <div className="absolute -bottom-16 -left-16 w-48 h-48 border border-gray-400 rounded-full"></div>
              <div className="absolute bottom-24 right-16 w-16 h-16 bg-gray-200 rounded-full"></div>
              
              <div className="relative z-10 overflow-hidden rounded-full w-[400px] h-[400px] border-4 border-white shadow-xl">
                <img 
                  src="/lovable-uploads/0af66b9b-a00e-4550-9fa3-88f52606bdd0.png" 
                  alt="Sportska obuća u vodi" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="absolute bottom-1/3 -right-8 w-16 border-t border-gray-400"></div>
            </div>
          </div>
        </div>

        {/* Wavy bottom shape */}
        <div className="relative h-32 mt-16">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0 w-full">
            <path fill="#ffffff" fillOpacity="1" d="M0,224L80,213.3C160,203,320,181,480,181.3C640,181,800,203,960,202.7C1120,203,1280,181,1360,170.7L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default About;
