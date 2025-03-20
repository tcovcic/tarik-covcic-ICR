
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto p-6">
        <h1 className="sneaker-title mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Stranica nije pronađena</p>
        <p className="text-gray-500 mb-8">
          Stranica koju ste tražili ne postoji ili je premještena.
        </p>
        <Button className="bg-sneaker hover:bg-sneaker-light" asChild>
          <Link to="/">
            Povratak na početnu
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
