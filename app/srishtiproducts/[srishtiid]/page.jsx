// app/srishtiproducts/[srishtiid]/page.jsx
import db from '@/lib/db';
import ProductDetailSrishti from '@/app/srishti/components/ProductDetailSrishti';
import { notFound } from 'next/navigation';

// ✅ For static generation
export async function generateStaticParams() {
  const [rows] = await db.query('SELECT id FROM srishti');
  return rows.map(row => ({ srishtiid: row.id.toString() }));
}

export default async function ProductDetailSrishtiPage(context) {
  const params = await context.params; // ✅ Safely await context.params
  const srishtiid = params.srishtiid;

  const numericId = Number(srishtiid);
  if (!numericId || Number.isNaN(numericId)) {
    notFound();
  }

  try {
    const [rows] = await db.query('SELECT * FROM srishti WHERE id = ?', [numericId]);
    const srishti = rows[0];

    if (!srishti) notFound();

    const images = [srishti.image1, srishti.image2, srishti.image3].filter(Boolean);

    let sizes = [];
    try {
      if (srishti.sizes) {
        const parsed = JSON.parse(srishti.sizes);
        if (Array.isArray(parsed)) {
          sizes = parsed;
        }
      }
    } catch (err) {
      console.error('❌ Failed to parse sizes JSON:', err.message);
    }

    return <ProductDetailSrishti srishti={{ ...srishti, sizes }} images={images} />;
  } catch (err) {
    console.error('❌ DB error:', err.message);
    notFound();
  }
}
