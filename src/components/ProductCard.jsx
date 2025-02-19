export default function ProductCard({ product }) {
  return (
    <div className="card">
      <img className="image" src={product.images[0]} alt={product.title} />
      <span className="title">{product.title}</span>
    </div>
  );
}
