'use client';
import { useCart } from '@/context/CartContext';
import { ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AddToCartButton({ product, style }) {
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
    toast.success(`${product.name} added to cart`);
  };

  return (
    <button
      onClick={handleAdd}
      className={style}
    >
      <ShoppingCart size={18} className="mr-1" />
      Add to Cart
    </button>
  );
}
