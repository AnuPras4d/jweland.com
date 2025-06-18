'use client';
import { useState } from 'react';

export default function ProductForm() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    thumbnail: null,
    image1: null,
    image2: null,
    image3: null,
  });

  const [sizes, setSizes] = useState([{ size: '', price: '' }]);
  const [selectedSize, setSelectedSize] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFile = (e) => setForm({ ...form, [e.target.name]: e.target.files[0] });

  const handleSizeChange = (index, field, value) => {
    const updated = [...sizes];
    updated[index][field] = value;
    setSizes(updated);
  };

  const addSizeField = () => setSizes([...sizes, { size: '', price: '' }]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmpty = Object.values(form).some(v => !v) || !selectedSize;
    if (isEmpty || sizes.some(s => !s.size || !s.price)) return alert('All fields are required');

    const selected = sizes.find(s => s.size === selectedSize);
    const price = selected?.price || '';
    const newsize = selected?.size || '';

    const fd = new FormData();
    for (let key in form) fd.append(key, form[key]);
    fd.append('price', price);
    fd.append('newsize', newsize);
    fd.append('sizes', JSON.stringify(sizes));

    const res = await fetch('/api/products', { method: 'POST', body: fd });
    const data = await res.json();

    if (res.ok) {
      setMessage('✅ Product added successfully!');
      setForm({ name: '', description: '', category: '', thumbnail: null, image1: null, image2: null, image3: null });
      setSizes([{ size: '', price: '' }]);
      setSelectedSize('');
    } else {
      alert(data.error || 'Something went wrong');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow"
      encType="multipart/form-data"
    >
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        className="col-span-full border p-3 rounded text-sm"
      />

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="col-span-full sm:col-span-1 border p-3 rounded text-sm"
      >
        <option value="">Select Category</option>
        <option value="ring">Ring</option>
        <option value="necklace">Necklace</option>
        <option value="bracelet">Bracelet</option>
        <option value="earrings">Earrings</option>
        <option value="pendant">Pendant</option>
      </select>

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="col-span-full border p-3 rounded text-sm min-h-[100px]"
      />

      {/* Size + Price Fields */}
      <div className="col-span-full">
        <label className="text-sm font-semibold mb-1 block">Add Sizes & Prices</label>
        {sizes.map((item, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Size"
              value={item.size}
              onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
              className="w-1/2 border p-2 rounded text-sm"
            />
            <input
              type="number"
              placeholder="Price"
              value={item.price}
              onChange={(e) => handleSizeChange(index, 'price', e.target.value)}
              className="w-1/2 border p-2 rounded text-sm"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addSizeField}
          className="text-sm text-blue-600 underline"
        >
          + Add another size
        </button>
      </div>

      {/* Size Selector */}
      <div className="col-span-full">
        <label className="text-sm font-semibold mb-1 block">Select Default Size</label>
        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          className="w-full border p-2 rounded text-sm"
        >
          <option value="">-- Choose Size --</option>
          {sizes.map((item, i) => (
            <option key={i} value={item.size}>
              {item.size} - ₹{item.price}
            </option>
          ))}
        </select>
      </div>

      {/* Image Uploads */}
      {['thumbnail', 'image1', 'image2', 'image3'].map((img, i) => (
        <div key={i} className="col-span-full sm:col-span-1">
          <label className="text-sm text-gray-600 mb-1 block">{img.charAt(0).toUpperCase() + img.slice(1)}</label>
          <input
            type="file"
            name={img}
            onChange={handleFile}
            className="w-full border p-2 rounded text-sm"
          />
        </div>
      ))}

      <div className="col-span-full">
        <button className="w-full bg-[#0a1d37] text-white py-2 rounded hover:bg-[#132b4d] transition text-sm">
          Add Product
        </button>
        {message && <p className="text-green-600 text-sm mt-2">{message}</p>}
      </div>
    </form>
  );
}
