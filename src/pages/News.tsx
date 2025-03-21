
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Slider mock data
const newsSlides = [
  {
    id: 1,
    category: "Izbor obuće",
    title: "Nova kolekcija zimske vodonepropusne obuće, dizajnirana da vaša stopala ostanu suha i topla čak i u najhladnijim i najvlažnijim uvjetima.",
    image: "/lovable-uploads/12e2db8b-3706-4099-86ca-178ede173681.png"
  },
  {
    id: 2,
    category: "Tehnologija",
    title: "Inovativna GORE-TEX tehnologija sada u svim našim modelima za planinarenje, pružajući vrhunsku zaštitu od vode uz zadržavanje disanja materijala.",
    image: "/lovable-uploads/cbbae409-1d83-42d0-ae22-35633f03b5a7.png"
  },
  {
    id: 3,
    category: "Novo u ponudi",
    title: "Predstavljamo novu liniju ultralakih patika za trčanje s revolucionarnim sistemom amortizacije za maksimalnu udobnost.",
    image: "/lovable-uploads/cbbae409-1d83-42d0-ae22-35633f03b5a7.png"
  }
];

const News = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === newsSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? newsSlides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 animate-fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center py-6 border-b border-gray-200">
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            Nazad
          </Link>
          <h1 className="font-serif text-[#8B0000] text-3xl font-bold">
            SneakerZone
          </h1>
          <h2 className="text-2xl font-bold">
            Novosti
          </h2>
        </div>

        {/* News Slider */}
        <div className="mt-12 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <div className="order-2 lg:order-1">
              <div className="mb-6">
                <span className="text-gray-600 font-medium">
                  {newsSlides[currentSlide].category}
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold mt-4 leading-tight">
                  {newsSlides[currentSlide].title}
                </h2>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between mt-12">
                <div className="flex space-x-2">
                  <button 
                    onClick={prevSlide}
                    className="p-2 rounded-full border border-gray-300 hover:bg-gray-100"
                    aria-label="Prethodna vijest"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <button 
                    onClick={nextSlide}
                    className="p-2 rounded-full border border-gray-300 hover:bg-gray-100"
                    aria-label="Sljedeća vijest"
                  >
                    <ArrowRight size={20} />
                  </button>
                </div>

                <div className="flex space-x-2">
                  {newsSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full ${
                        currentSlide === index 
                          ? "bg-[#8B0000]" 
                          : "bg-gray-300"
                      }`}
                      aria-label={`Idi na vijest ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative z-10">
                <img
                  src={newsSlides[currentSlide].image}
                  alt="Novosti o proizvodima"
                  className="w-full h-auto object-contain max-h-[400px]"
                />
              </div>
              <div className="absolute top-0 right-0 text-[150px] font-bold text-gray-100 opacity-40 select-none">
                NYKE
                <br />
                AIR
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
