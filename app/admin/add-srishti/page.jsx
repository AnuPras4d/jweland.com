// app/admin/add-srishti/page.jsx
'use client';

import ProductFormSrishti from "@/app/srishti/components/ProductFormSrishti";


export default function AddSrishtiPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Srishti Product</h1>
      <ProductFormSrishti />
    </div>
  );
}
