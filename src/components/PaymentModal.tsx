
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { CreditCard, Lock, CheckCircle2 } from "lucide-react";

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

  const handlePayment = () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    
    // Simulacija plaćanja
    setTimeout(() => {
      setIsProcessing(false);
      onOpenChange(false);
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
    // Remove non-digits and format with spaces every 4 digits
    const digits = value.replace(/\D/g, "");
    const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
    return formatted.substring(0, 19); // Limit to 16 digits + 3 spaces
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-medium">Metode plaćanja</DialogTitle>
        </DialogHeader>
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
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path d="M9.22,9.79a.5.5,0,0,0-.22.41v.41H7.14a.15.15,0,0,1-.14-.17L7.41,8.3A.5.5,0,0,1,7.9,8h1a1.29,1.29,0,0,1,1.33,1.22A1.26,1.26,0,0,1,9.22,9.79Z" fill="#253b80"></path>
                  <path d="M19.22,4H12.2a.5.5,0,0,0-.49.4l-1.45,9.19a.3.3,0,0,0,.3.34h2.33a.51.51,0,0,0,.5-.42l.4-2.54a.51.51,0,0,1,.5-.42h2.2a4.42,4.42,0,0,0,4.78-3.84A3.62,3.62,0,0,0,21,4.81,2.25,2.25,0,0,0,19.22,4Zm.47,3.77A2.63,2.63,0,0,1,17,9.92H15.43a.5.5,0,0,0-.5.42l-.4,2.54a.51.51,0,0,1-.5.42H11.7a.3.3,0,0,1-.3-.34L13.05,4.4A.5.5,0,0,1,13.54,4h7A1.32,1.32,0,0,1,21.91,5.6,2.59,2.59,0,0,1,19.69,7.73Z" fill="#253b80"></path>
                  <path d="M8.9,4H1.88a.5.5,0,0,0-.49.4L0,13.59a.3.3,0,0,0,.3.34H2.91L3.1,13l-.06,0a.3.3,0,0,1,.29-.38h.92a5.45,5.45,0,0,0,5.38-4.57l.91-4A.3.3,0,0,0,11.23,4,2.16,2.16,0,0,0,8.9,4Z" fill="#253b80"></path>
                </svg>
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
                <svg width="40" height="12" viewBox="0 0 40 12">
                  <path d="M17.14,1.3l-3.3,9.35H11.27L9.63,3.72a1.22,1.22,0,0,0-.67-.95A11.58,11.58,0,0,0,6.31,1.94l.08-.64h4.78a1.29,1.29,0,0,1,1.28,1.09l1.17,6.21L15.82,1.3Z" fill="#00579f"></path>
                  <path d="M26.43,7.33a4.78,4.78,0,0,0,.08-3A2.5,2.5,0,0,0,24.11,3,7.1,7.1,0,0,0,21,3.66L19.42,10.65h2.57l.54-2.82.61,0a2.32,2.32,0,0,1,1.53.34c.3.32.36.84.25,1.54l-.21.9h2.58l.23-1.06A3,3,0,0,0,26.43,7.33ZM23.46,6.44l.33-1.7a4.11,4.11,0,0,1,1,.12c.35.12.46.46.34,1s-.37.87-.85.94Z" fill="#00579f"></path>
                  <path d="M31,5.3c-1.59,0-2.75,1.16-3.1,2.81a3.16,3.16,0,0,0,.56,2.51,2.93,2.93,0,0,0,2.45,1c1.62,0,2.76-1.15,3.11-2.81a3.13,3.13,0,0,0-.56-2.5A3,3,0,0,0,31,5.3Zm.48,3c-.12.63-.47,1-.95,1s-.67-.41-.54-1,.45-1,1-1S31.61,8.27,31.49,8.31Z" fill="#00579f"></path>
                  <path d="M39.63,1.3h-2.3a1.75,1.75,0,0,0-1.05.92L33,10.65h2.57L36.14,9H39l.27,1.62h2.26Zm-2.74,5.9,1.08-3,1.31,2.9.09.13Z" fill="#00579f"></path>
                </svg>
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
                <svg width="30" height="24" viewBox="0 0 30 24">
                  <path d="M22,12a7.5,7.5,0,0,1-15,0,7.5,7.5,0,0,1,15,0Z" fill="#ff5f00"></path>
                  <path d="M14.5,4.5a7.5,7.5,0,0,0-7.5,7.5,7.5,7.5,0,0,0,7.5,7.5,7.5,7.5,0,0,0,0-15Z" fill="#eb001b"></path>
                  <path d="M14.5,4.5a7.5,7.5,0,0,1,7.5,7.5,7.5,7.5,0,0,1-7.5,7.5,7.5,7.5,0,0,1,0-15Z" fill="#f79e1b"></path>
                </svg>
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
                <svg width="30" height="24" viewBox="0 0 30 24">
                  <path d="M15,21a9,9,0,1,0,0-18,9,9,0,0,0,0,18Z" fill="#0079BE"></path>
                  <path d="M10.77,8.1V16a4.83,4.83,0,0,0,4.46-4A4.83,4.83,0,0,0,10.77,8.1Z" fill="#FFFFFF"></path>
                  <path d="M10.77,8.1a4.83,4.83,0,0,0,0,8,4.83,4.83,0,0,1,0-8Z" fill="#FFFFFF"></path>
                  <path d="M19.23,8.1V16a4.83,4.83,0,0,0,0-8Z" fill="#FFFFFF"></path>
                </svg>
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
                <svg width="30" height="24" viewBox="0 0 30 24">
                  <path d="M0,12.5V5.8A2.62,2.62,0,0,1,2.8,3H26.2A2.62,2.62,0,0,1,29,5.8V18.2A2.62,2.62,0,0,1,26.2,21H2.8A2.62,2.62,0,0,1,0,18.2Z" fill="#016fd0"></path>
                  <path d="M14.55,13.5h1.2l.45-1.05.45,1.05h5.25v-.75l.45.75H24v-3H22.5l-.45.75-.3-.75h-3.9v.6l-.3-.6h-3l-.45,1.05-.45-1.05h-1.8V15h1.65l.45-1.05.45,1.05h1.35Z" fill="#FFFFFF"></path>
                  <path d="M5.1,13.5H9v-3H5.1Z" fill="#FFFFFF"></path>
                </svg>
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
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
