
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, compact = false }) => {
  const { addToCart } = useCart();
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : "");
  
  const handleAddToCart = () => {
    addToCart(product, 1, selectedSize);
  };

  return (
    <div 
      className={cn(
        "bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 card-hover",
        compact ? "h-full" : "h-full"
      )}
    >
      <div className={cn("relative", isImageLoading && "image-loading")}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover transition-opacity duration-300"
          style={{ opacity: isImageLoading ? 0.5 : 1 }}
          onLoad={() => setIsImageLoading(false)}
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-medium">{product.name}</h3>
        <p className="text-sneaker font-bold mt-1">{product.price.toFixed(2)} KM</p>
        
        {!compact && (
          <p className="text-gray-600 text-sm mt-2">{product.description}</p>
        )}
        
        {product.sizes && product.sizes.length > 0 && !compact && (
          <div className="mt-3">
            <p className="text-sm text-gray-600 mb-1">Veličina:</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={cn(
                    "w-10 h-8 text-sm border rounded-md transition-colors",
                    selectedSize === size
                      ? "bg-sneaker text-white border-sneaker"
                      : "bg-white text-gray-800 border-gray-300 hover:border-sneaker"
                  )}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <Button 
          className={cn(
            "w-full mt-4 bg-sneaker hover:bg-sneaker-light text-white flex items-center justify-center gap-2",
            compact ? "text-sm py-1" : ""
          )}
          onClick={handleAddToCart}
        >
          <ShoppingBag size={16} />
          Dodaj u korpu
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
