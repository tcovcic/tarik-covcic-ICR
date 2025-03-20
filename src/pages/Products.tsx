
import { useState, useEffect } from "react";
import { products } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

const Products = () => {
  const [filter, setFilter] = useState("Svi");

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get unique brands
  const brands = ["Svi", ...new Set(products.map(product => product.brand))];

  // Filter products based on selected brand
  const filteredProducts = filter === "Svi" 
    ? products 
    : products.filter(product => product.brand === filter);

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
                  filter === brand
                    ? "bg-sneaker text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                onClick={() => setFilter(brand)}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* Filter chips for Material and Purpose (as in the mockup) */}
        <div className="flex gap-2 mb-6">
          <button 
            className="px-4 py-2 rounded-full text-sm font-medium bg-sneaker text-white transition-colors"
          >
            Svi
          </button>
          <button 
            className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-800 transition-colors hover:bg-gray-200"
          >
            Materijal
          </button>
          <button 
            className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-800 transition-colors hover:bg-gray-200"
          >
            Namjena
          </button>
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
