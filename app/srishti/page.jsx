import HeroSectionSrishti from "@/app/srishti/components/HeroSectionSrishti";
import ProductListSrishti from "@/app/srishti/components/ProductListSrishti";
import Header from "@/components/Header";

const Homesrishti = () => {
  return (
    <div className="relative">
      {/* Fixed bottom-right shopping cart */}
     
      <Header />
      <HeroSectionSrishti />
      <ProductListSrishti />
    </div>
  );
};

export default Homesrishti;
