'use client';
import { useCart } from '@/context/CartContext';
import { ShoppingCart } from 'lucide-react';

export default function AddToCartButton({ product , style}) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      thumbnail: product.thumbnail,
      qty: 1,
    };
    addToCart(item);
    alert(`${product.name} added to cart`);
  };

  return (
    <button
      onClick={handleAdd}
      className={style}
    >
      <ShoppingCart size={18} />
      Add to Cart
    </button>
  );
}
