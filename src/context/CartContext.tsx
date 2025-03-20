
import React, { createContext, useState, useContext, useEffect } from "react";
import { CartItem, Product } from "@/types";
import { toast } from "sonner";

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, size?: string) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  totalDiscount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
      } catch (e) {
        console.error("Failed to parse cart from localStorage:", e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
    
    // Calculate totals
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const price = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Apply a 30% discount to the total price
    const discount = price * 0.3;
    
    setTotalItems(itemCount);
    setTotalPrice(price);
    setTotalDiscount(discount);
  }, [items]);

  const addToCart = (product: Product, quantity = 1, size?: string) => {
    setItems(prevItems => {
      // Check if the item with the same id and size is already in the cart
      const existingItemIndex = prevItems.findIndex(
        item => item.id === product.id && (!size || item.size === size)
      );

      let newItems;

      if (existingItemIndex > -1) {
        // If the item exists, update its quantity
        newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
      } else {
        // Otherwise, add a new item
        newItems = [
          ...prevItems,
          {
            ...product,
            quantity,
            size: size || product.sizes?.[0],
          },
        ];
      }

      toast(`${product.name} dodan u korpu`, {
        description: `Količina: ${quantity}`,
        position: "top-right",
      });

      return newItems;
    });
  };

  const removeFromCart = (id: number) => {
    setItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === id);
      if (itemToRemove) {
        toast(`${itemToRemove.name} uklonjen iz korpe`, {
          position: "top-right",
        });
      }
      return prevItems.filter(item => item.id !== id);
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast("Korpa je očišćena", {
      position: "top-right",
    });
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        totalDiscount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
