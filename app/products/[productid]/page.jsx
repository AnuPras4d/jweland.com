import db from '@/lib/db';
import ProductDetailClient from '@/components/ProductDetailClient';

// Generate static paths for each product
export async function generateStaticParams() {
  const [rows] = await db.query('SELECT id FROM products');
  return rows.map(row => ({ productid: row.id.toString() }));
}

export default async function ProductDetail({ params }) {
  const productId = params?.productid;

  // Validate product ID
  if (!productId || isNaN(productId)) {
    return <div className="text-center text-red-500 mt-10">❌ Invalid product ID</div>;
  }

  try {
    // Fetch product by ID
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [productId]);
    const product = rows[0];

    if (!product) {
      return <div className="text-center text-red-500 mt-10">❌ Product not found</div>;
    }

    // Combine all images (filter out empty/null)
    const images = [product.thumbnail, product.image1, product.image2, product.image3].filter(Boolean);

    // Parse sizes safely
    let sizes = [];
    try {
      if (product.sizes) {
        const parsed = JSON.parse(product.sizes);
        if (Array.isArray(parsed)) {
          sizes = parsed;
        }
      }
    } catch (err) {
      console.error('❌ Failed to parse sizes JSON:', err.message);
    }

    return <ProductDetailClient product={{ ...product, sizes }} images={images} />;
  } catch (error) {
    console.error('❌ Database fetch error:', error.message);
    return <div className="text-center text-red-500 mt-10">❌ Error loading product</div>;
  }
}
