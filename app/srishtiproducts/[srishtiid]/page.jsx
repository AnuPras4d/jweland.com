// app/srishtiproducts/[srishtiid]/page.jsx
import db from '@/lib/db';
import ProductDetailSrishti from '@/app/srishti/components/ProductDetailSrishti';

export async function generateStaticParams() {
  const [rows] = await db.query('SELECT id FROM srishti');
  return rows.map(row => ({ srishtiid: row.id.toString() }));
}

export default async function ProductDetailSrishtiPage({ params }) {
  const [rows] = await db.query('SELECT * FROM srishti WHERE id = ?', [params.srishtiid]);
  const srishti = rows[0];

  if (!srishti) {
    return <div className="text-center text-red-500 mt-10">Product not found</div>;
  }

  // ✅ Filter only available image fields
  const images = [srishti.image1, srishti.image2, srishti.image3].filter(Boolean);

  // ✅ Safely parse sizes JSON from DB
  let sizes = [];
  try {
    if (srishti.sizes) {
      sizes = JSON.parse(srishti.sizes);
      if (!Array.isArray(sizes)) sizes = [];
    }
  } catch (err) {
    console.error('❌ Failed to parse sizes JSON:', err.message);
  }

  return <ProductDetailSrishti srishti={{ ...srishti, sizes }} images={images} />;
}
