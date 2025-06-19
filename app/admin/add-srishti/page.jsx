// app/admin/add-srishti/page.jsx
'use client';

import ProductFormSrishti from "@/app/srishti/components/ProductFormSrishti";


export default function AddSrishtiPage() {
  return (
    <div className="pt-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Srishti Product</h1>
      <ProductFormSrishti />
    </div>
  );
}
