
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import CartItem from "@/components/CartItem";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const { items, clearCart, totalItems, totalPrice, totalDiscount } = useCart();

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-12 animate-fade-up">
      <div className="sneaker-container">
        <h1 className="sneaker-title mb-2">Korpa</h1>
        <p className="text-gray-600 mb-6">{totalItems} proizvoda</p>

        {items.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart items */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-lg font-medium">Proizvodi u korpi</h2>
                  <button
                    className="text-gray-500 hover:text-red-500 flex items-center transition-colors text-sm"
                    onClick={clearCart}
                  >
                    <Trash2 size={16} className="mr-1" />
                    Isprazni korpu
                  </button>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {items.map(item => (
                    <div key={item.id} className="p-4">
                      <CartItem item={item} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:w-80">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-lg font-medium mb-4">Cijena narudžbe</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ukupno</span>
                    <span className="font-medium">{totalPrice.toFixed(2)} KM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dostava</span>
                    <span className="font-medium">0,00 KM</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Ostvareni popust</span>
                    <span>-{totalDiscount.toFixed(2)} KM (30%)</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-bold">
                      <span>Ukupno za platiti</span>
                      <span>{(totalPrice - totalDiscount).toFixed(2)} KM</span>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full bg-sneaker hover:bg-sneaker-light">
                  <span>Nastavite s plaćanjem</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <div className="text-center mt-4">
                  <Link to="/proizvodi" className="text-sneaker hover:underline text-sm flex items-center justify-center">
                    <ShoppingBag size={14} className="mr-1" />
                    Nastavi kupovinu
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <ShoppingBag size={32} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-medium mb-2">Vaša korpa je prazna</h2>
            <p className="text-gray-600 mb-6">Dodajte proizvode u korpu da biste mogli nastaviti.</p>
            <Button className="bg-sneaker hover:bg-sneaker-light" asChild>
              <Link to="/proizvodi">
                Pregledaj proizvode
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
