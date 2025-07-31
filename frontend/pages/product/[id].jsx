import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCartStore } from "../../store/cart";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const addToCart = useCartStore((s) => s.addToCart);

  useEffect(() => { if (id) fetch(`http://localhost:4000/products/${id}`).then(r => r.json()).then(setProduct); }, [id]);

  if (!product) return <div>Chargement...</div>;

  return (
    <div className="p-8">
      <img src={product.image} alt={product.title} />
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <p>{product.description}</p>
      <p className="text-xl">{product.price}€</p>
      <button onClick={() => addToCart(product)} className="bg-blue-500 text-white p-2 rounded">Ajouter au panier</button>
    </div>
  );
}
