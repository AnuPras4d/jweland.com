import db from '@/lib/db';
import ProductDetailClient from '@/components/ProductDetailClient';
import { notFound } from 'next/navigation';

// ✅ Ensure top-level async function
export default async function ProductPage(context) {
  const params = await context.params; // ✅ Fix: Await the context.params
  const productId = params.productid;

  const numericId = Number(productId);
  if (!numericId || Number.isNaN(numericId)) {
    notFound();
  }

  try {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [numericId]);
    const product = rows[0];

    if (!product) notFound();

    const images = [
      product.thumbnail,
      product.image1,
      product.image2,
      product.image3,
    ].filter(Boolean);

    let sizes = [];
    try {
      if (product.sizes) {
        const parsed = JSON.parse(product.sizes);
        if (Array.isArray(parsed)) sizes = parsed;
      }
    } catch (err) {
      console.error('❌ Size parsing failed:', err.message);
    }

    return <ProductDetailClient product={{ ...product, sizes }} images={images} />;
  } catch (error) {
    console.error('❌ DB error:', error.message);
    notFound();
  }
}
