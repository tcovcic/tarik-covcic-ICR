import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  CreditCard
} from "lucide-react";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  totalAmount: number;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  open,
  onOpenChange,
  totalAmount,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<"visa" | "mastercard" | "paypal" | "diners" | "amex">("visa");
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const handleShowPaymentForm = () => {
    setShowPaymentForm(true);
  };

  const handlePayment = () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    
    // Simulacija plaćanja
    setTimeout(() => {
      setIsProcessing(false);
      onOpenChange(false);
      setShowPaymentForm(false); // Reset the state for next time
      toast.success("Plaćanje uspješno obrađeno!", {
        description: `Narudžba u iznosu od ${totalAmount.toFixed(2)} KM je potvrđena.`,
      });
    }, 1500);
  };

  const validateForm = () => {
    if (!cardholderName) {
      toast.error("Molimo unesite ime i prezime");
      return false;
    }
    if (cardNumber.length < 16) {
      toast.error("Molimo unesite ispravan broj kartice");
      return false;
    }
    if (!expiryMonth || !expiryYear) {
      toast.error("Molimo unesite datum isteka kartice");
      return false;
    }
    if (cvv.length < 3) {
      toast.error("Molimo unesite ispravan CVV broj");
      return false;
    }
    return true;
  };

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
    return formatted.substring(0, 19);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const resetModal = () => {
    if (!isProcessing) {
      setShowPaymentForm(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      onOpenChange(isOpen);
      if (!isOpen) resetModal();
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-medium">
            {showPaymentForm ? "Metode plaćanja" : "Pregled narudžbe"}
          </DialogTitle>
        </DialogHeader>
        
        {!showPaymentForm ? (
          <div className="space-y-6 py-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Pregled cijene</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ukupno:</span>
                  <span className="font-medium">{(totalAmount * 1.3).toFixed(2)} KM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dostava:</span>
                  <span className="font-medium">0,00 KM</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Ostvareni popust:</span>
                  <span>-{(totalAmount * 0.3).toFixed(2)} KM (30%)</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-bold">
                    <span>Ukupno za platiti:</span>
                    <span className="text-xl text-sneaker">{totalAmount.toFixed(2)} KM</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-gray-500 text-center">
                Pritisnite dugme ispod za nastavak na plaćanje
              </p>
              <Button 
                onClick={handleShowPaymentForm} 
                className="w-full bg-sneaker hover:bg-sneaker-light"
              >
                Nastavi na plaćanje
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 pt-2">
            <div>
              <p className="text-lg font-medium">Unesite detalje plaćanja</p>
              <p className="text-sm text-gray-500">
                Nastavljanjem pristajete na{" "}
                <a href="#" className="text-blue-500 hover:underline">
                  uvjete korištenja
                </a>
              </p>
            </div>

            <div className="flex items-center justify-center space-x-3 py-2">
              <button
                onClick={() => setPaymentMethod("paypal")}
                className={`p-2 rounded-md border ${
                  paymentMethod === "paypal" ? "border-green-500 bg-green-50" : "border-gray-200"
                }`}
                title="PayPal"
              >
                <div className="w-12 h-8 flex items-center justify-center">
                  {paymentMethod === "paypal" && (
                    <CheckCircle2 className="absolute text-green-500 w-4 h-4 top-1 right-1" />
                  )}
                  <img src="/paypal-logo.png" alt="PayPal" className="w-10 h-6 object-contain" />
                </div>
              </button>
              <button
                onClick={() => setPaymentMethod("visa")}
                className={`p-2 rounded-md border ${
                  paymentMethod === "visa" ? "border-green-500 bg-green-50" : "border-gray-200"
                }`}
                title="Visa"
              >
                <div className="w-12 h-8 flex items-center justify-center">
                  {paymentMethod === "visa" && (
                    <CheckCircle2 className="absolute text-green-500 w-4 h-4 top-1 right-1" />
                  )}
                  <img src="/visa-logo.png" alt="Visa" className="w-10 h-6 object-contain" />
                </div>
              </button>
              <button
                onClick={() => setPaymentMethod("mastercard")}
                className={`p-2 rounded-md border ${
                  paymentMethod === "mastercard" ? "border-green-500 bg-green-50" : "border-gray-200"
                }`}
                title="Mastercard"
              >
                <div className="w-12 h-8 flex items-center justify-center">
                  {paymentMethod === "mastercard" && (
                    <CheckCircle2 className="absolute text-green-500 w-4 h-4 top-1 right-1" />
                  )}
                  <img src="/mastercard-logo.png" alt="Mastercard" className="w-10 h-6 object-contain" />
                </div>
              </button>
              <button
                onClick={() => setPaymentMethod("diners")}
                className={`p-2 rounded-md border ${
                  paymentMethod === "diners" ? "border-green-500 bg-green-50" : "border-gray-200"
                }`}
                title="Diners Club"
              >
                <div className="w-12 h-8 flex items-center justify-center">
                  {paymentMethod === "diners" && (
                    <CheckCircle2 className="absolute text-green-500 w-4 h-4 top-1 right-1" />
                  )}
                  <img src="/diners-logo.png" alt="Diners Club" className="w-10 h-6 object-contain" />
                </div>
              </button>
              <button
                onClick={() => setPaymentMethod("amex")}
                className={`p-2 rounded-md border ${
                  paymentMethod === "amex" ? "border-green-500 bg-green-50" : "border-gray-200"
                }`}
                title="American Express"
              >
                <div className="w-12 h-8 flex items-center justify-center">
                  {paymentMethod === "amex" && (
                    <CheckCircle2 className="absolute text-green-500 w-4 h-4 top-1 right-1" />
                  )}
                  <img src="/amex-logo.png" alt="American Express" className="w-10 h-6 object-contain" />
                </div>
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Ime i prezime</Label>
                <Input
                  id="fullName"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  placeholder="Mujo Mujić"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardNumber">Broj kartice</Label>
                <div className="relative">
                  <Input
                    id="cardNumber"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="**** **** **** 3947"
                    maxLength={19}
                  />
                  <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryMonth">Mjesec isteka</Label>
                  <Select value={expiryMonth} onValueChange={setExpiryMonth}>
                    <SelectTrigger id="expiryMonth">
                      <SelectValue placeholder="MM" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => {
                        const month = (i + 1).toString().padStart(2, "0");
                        return (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="expiryYear">Godina isteka</Label>
                  <Select value={expiryYear} onValueChange={setExpiryYear}>
                    <SelectTrigger id="expiryYear">
                      <SelectValue placeholder="YYYY" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => {
                        const year = (new Date().getFullYear() + i).toString();
                        return (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="cvv">CVV broj</Label>
                  <span className="text-xs text-gray-500">3 ili 4 cifre se nalaze u cvv polju</span>
                </div>
                <div className="relative">
                  <Input
                    id="cvv"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    placeholder="123"
                    maxLength={4}
                  />
                  <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Ukupno za platiti:</span>
                  <span className="text-xl font-bold text-sneaker">{totalAmount.toFixed(2)} KM</span>
                </div>
              </div>

              <Button
                className="w-full bg-sneaker hover:bg-sneaker-light"
                onClick={handlePayment}
                disabled={isProcessing}
              >
                {isProcessing ? "Obrađujem..." : "Plati"}
              </Button>

              <div className="flex items-center justify-center text-xs text-gray-500">
                <Lock className="h-3 w-3 mr-1" />
                <span>Sigurna i zaštićena transakcija</span>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
