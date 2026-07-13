type Product = {
  id: string;
  name: string;
  image_url: string;
  affiliate_link: string;
  price: string;
  brand: string;
  category: string;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div
      style={{
        width: 260,
        background: "#1f2937",
        borderRadius: 12,
        padding: 15,
        color: "white",
      }}
    >
      <img
        src={product.image_url}
        alt={product.name}
        style={{
          width: "100%",
          height: 240,
          objectFit: "cover",
          borderRadius: 10,
        }}
      />

      <h3>{product.name}</h3>

      <p>
        <b>Brand:</b> {product.brand}
      </p>

      <p>
        <b>Price:</b> ₹{product.price}
      </p>

      <a
        href={product.affiliate_link}
        target="_blank"
        style={{
          color: "#60a5fa",
          textDecoration: "none",
        }}
      >
        Buy Now →
      </a>
    </div>
  );
}