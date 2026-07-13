type Outfit = {
  id: string;
  title: string;
  image_url: string;
  affiliate_link: string;
  category: string;
  brand: string;
};

export default function OutfitCard({ outfit }: { outfit: Outfit }) {
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
        src={outfit.image_url}
        alt={outfit.title}
        style={{
          width: "100%",
          height: 300,
          objectFit: "cover",
          borderRadius: 10,
        }}
      />

      <h3>{outfit.title}</h3>

      <p>
        <b>Brand:</b> {outfit.brand}
      </p>

      <p>
        <b>Category:</b> {outfit.category}
      </p>

      <a
        href={outfit.affiliate_link}
        target="_blank"
        style={{
          color: "#60a5fa",
          textDecoration: "none",
        }}
      >
        View Outfit →
      </a>
    </div>
  );
}