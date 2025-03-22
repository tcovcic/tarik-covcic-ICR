
import { useState, useEffect } from "react";
import { products } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from "@/components/ui/command";

// Define material and purpose options
const materials = [
  { value: "memorijski-đon", label: "Obuća s memorijskim đonom" },
  { value: "goretex", label: "GORE-TEX" },
  { value: "vodootporna", label: "Vodootporna obuća" },
  { value: "zračni-đon", label: "Obuća sa zračnim đonom" },
  { value: "koža", label: "Koža" },
  { value: "mesh", label: "Mesh" },
];

const purposes = [
  { value: "trčanje", label: "Trčanje" },
  { value: "planinarenje", label: "Planinarenje" },
  { value: "nogomet", label: "Nogomet" },
  { value: "košarka", label: "Košarka" },
  { value: "tenis", label: "Tenis" },
  { value: "fitness", label: "Fitness" },
  { value: "svakodnevno", label: "Svakodnevno" },
];

const Products = () => {
  const [brandFilter, setBrandFilter] = useState("Svi");
  const [materialFilter, setMaterialFilter] = useState("");
  const [purposeFilter, setPurposeFilter] = useState("");
  const [activeFilter, setActiveFilter] = useState("Svi"); // "Svi", "Materijal", "Namjena"
  const [materialOpen, setMaterialOpen] = useState(false);
  const [purposeOpen, setPurposeOpen] = useState(false);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get unique brands
  const brands = ["Svi", ...new Set(products.map(product => product.brand))];

  // Apply filters
  const getFilteredProducts = () => {
    let filtered = products;
    
    // Apply brand filter
    if (brandFilter !== "Svi") {
      filtered = filtered.filter(product => product.brand === brandFilter);
    }
    
    // Apply material filter
    if (materialFilter) {
      filtered = filtered.filter(product => product.material === materialFilter);
    }
    
    // Apply purpose filter
    if (purposeFilter) {
      filtered = filtered.filter(product => product.purpose === purposeFilter);
    }
    
    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  // Reset filters when changing main filter type
  const handleFilterTypeChange = (type: string) => {
    setActiveFilter(type);
    if (type === "Svi") {
      setMaterialFilter("");
      setPurposeFilter("");
    }
  };

  // Get selected material or purpose label
  const getSelectedMaterialLabel = () => {
    const selected = materials.find(item => item.value === materialFilter);
    return selected ? selected.label : "Materijal";
  };

  const getSelectedPurposeLabel = () => {
    const selected = purposes.find(item => item.value === purposeFilter);
    return selected ? selected.label : "Namjena";
  };

  return (
    <div className="min-h-screen pt-24 pb-12 animate-fade-up">
      <div className="sneaker-container">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="sneaker-title mb-2">Proizvodi</h1>
            <p className="text-gray-600">Lista svih proizvoda</p>
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            {brands.map(brand => (
              <button
                key={brand}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  brandFilter === brand
                    ? "bg-sneaker text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                onClick={() => setBrandFilter(brand)}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* Main category filter buttons */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {/* All button */}
          <Button 
            variant="outline"
            className={cn(
              "rounded-full", 
              activeFilter === "Svi" 
                ? "bg-[#8B0000] text-white hover:bg-[#8B0000]/90" 
                : "hover:bg-gray-100 hover:text-[#8B0000] border-gray-200"
            )}
            onClick={() => handleFilterTypeChange("Svi")}
          >
            Svi
          </Button>

          {/* Material dropdown */}
          <Popover open={materialOpen} onOpenChange={setMaterialOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className={cn(
                  "rounded-full flex items-center gap-1",
                  (activeFilter === "Materijal" || materialFilter) 
                    ? "bg-[#8B0000] text-white hover:bg-[#8B0000]/90" 
                    : "hover:bg-gray-100 hover:text-[#8B0000] border-gray-200"
                )}
                onClick={() => handleFilterTypeChange("Materijal")}
              >
                {getSelectedMaterialLabel()}
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0" align="start">
              <Command>
                <CommandInput placeholder="Pretraga..." />
                <CommandList>
                  <CommandEmpty>Nije pronađen materijal</CommandEmpty>
                  <CommandGroup>
                    {materials.map((material) => (
                      <CommandItem
                        key={material.value}
                        value={material.value}
                        onSelect={() => {
                          setMaterialFilter(
                            materialFilter === material.value ? "" : material.value
                          );
                          setMaterialOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            materialFilter === material.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {material.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {/* Purpose dropdown */}
          <Popover open={purposeOpen} onOpenChange={setPurposeOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className={cn(
                  "rounded-full flex items-center gap-1",
                  (activeFilter === "Namjena" || purposeFilter) 
                    ? "bg-[#8B0000] text-white hover:bg-[#8B0000]/90" 
                    : "hover:bg-gray-100 hover:text-[#8B0000] border-gray-200"
                )}
                onClick={() => handleFilterTypeChange("Namjena")}
              >
                {getSelectedPurposeLabel()}
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0" align="start">
              <Command>
                <CommandInput placeholder="Pretraga..." />
                <CommandList>
                  <CommandEmpty>Nije pronađena namjena</CommandEmpty>
                  <CommandGroup>
                    {purposes.map((purpose) => (
                      <CommandItem
                        key={purpose.value}
                        value={purpose.value}
                        onSelect={() => {
                          setPurposeFilter(
                            purposeFilter === purpose.value ? "" : purpose.value
                          );
                          setPurposeOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            purposeFilter === purpose.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {purpose.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium mb-2">Nema proizvoda</h3>
            <p className="text-gray-600">Nismo pronašli proizvode koji odgovaraju vašem filteru.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
