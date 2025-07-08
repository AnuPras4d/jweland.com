// app/admin/add-product/page.jsx
'use client';
import ProductForm from '@/components/ProductForm';

export default function AddProductPage() {
  return (
    <div className="pt-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Jweland Product</h1>
      <ProductForm />
    </div>
  );
}