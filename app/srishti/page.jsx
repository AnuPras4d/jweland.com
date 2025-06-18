import HeroSectionSrishti from "@/app/srishti/components/HeroSectionSrishti";
import ProductListSrishti from "@/app/srishti/components/ProductListSrishti";
import { ShoppingCart } from 'lucide-react';

const Homesrishti = () => {
  return (
    <div className="relative">
      {/* Fixed bottom-right shopping cart */}
     

      <HeroSectionSrishti />
      <ProductListSrishti />
    </div>
  );
};

export default Homesrishti;
