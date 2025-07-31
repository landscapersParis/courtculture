import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => { fetch("http://localhost:4000/products").then(r => r.json()).then(setProducts); }, []);

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map(p => (
        <div key={p._id} className="border p-4 rounded">
          <img src={p.image} alt={p.title} className="mb-2" />
          <h2 className="text-lg font-bold">{p.title}</h2>
          <p>{p.description}</p>
          <p className="text-xl font-semibold">{p.price}€</p>
          <Link href={`/product/${p._id}`} className="text-blue-500">Voir le produit</Link>
        </div>
      ))}
    </div>
  );
}
