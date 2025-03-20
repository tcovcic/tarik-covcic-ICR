
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { CartItem as CartItemType } from "@/types";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const [isEditing, setIsEditing] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b border-gray-100 animate-fade-in">
      <div className={cn("relative w-20 h-20 mr-4", isImageLoading && "image-loading")}>
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 object-cover rounded"
          style={{ opacity: isImageLoading ? 0.5 : 1 }}
          onLoad={() => setIsImageLoading(false)}
        />
      </div>
      
      <div className="flex-1">
        <h3 className="font-medium">{item.name}</h3>
        {item.size && <p className="text-sm text-gray-600 mt-1">{item.size} br.</p>}
        <p className="text-sneaker font-bold mt-1">{item.price.toFixed(2)} KM</p>
      </div>
      
      <div className="flex items-center mt-3 sm:mt-0">
        {isEditing ? (
          <div className="flex items-center border rounded-md overflow-hidden">
            <button 
              className="px-2 py-1 bg-gray-100 hover:bg-gray-200"
              onClick={() => handleQuantityChange(item.quantity - 1)}
            >
              <Minus size={16} />
            </button>
            <span className="px-3 py-1 text-center min-w-[40px]">{item.quantity}</span>
            <button 
              className="px-2 py-1 bg-gray-100 hover:bg-gray-200"
              onClick={() => handleQuantityChange(item.quantity + 1)}
            >
              <Plus size={16} />
            </button>
          </div>
        ) : (
          <span className="text-gray-600 mx-4">{item.quantity} kom</span>
        )}
        
        <div className="flex items-center ml-2">
          <button
            className="p-2 text-gray-500 hover:text-sneaker transition-colors"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Pencil size={16} />
          </button>
          <button
            className="p-2 text-gray-500 hover:text-red-500 transition-colors"
            onClick={() => removeFromCart(item.id)}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
