import { useCartStore } from "../store/cart";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCartStore();

  const handleCheckout = async () => {
    const res = await fetch("http://localhost:4000/create-checkout-session", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart })
    });
    const { id } = await res.json();
    const stripe = await (await import("@stripe/stripe-js")).loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    stripe.redirectToCheckout({ sessionId: id });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Votre Panier</h1>
      {cart.length === 0 && <p>Panier vide</p>}
      {cart.map(item => (
        <div key={item._id} className="flex justify-between mb-2">
          <span>{item.title} x {item.quantity}</span>
          <span>{item.price * item.quantity}€</span>
          <button onClick={() => removeFromCart(item._id)} className="text-red-500">Supprimer</button>
        </div>
      ))}
      {cart.length > 0 && (
        <div className="mt-4">
          <button onClick={handleCheckout} className="bg-green-500 text-white px-4 py-2 rounded">Passer au paiement</button>
          <button onClick={clearCart} className="ml-2 text-gray-500">Vider le panier</button>
        </div>
      )}
    </div>
  );
}
