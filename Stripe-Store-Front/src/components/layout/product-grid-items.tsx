import Link from "next/link";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export default function ProductGridItems({ products }: { products: Product[] }) {
  return (
    <>
      {products.map((product) => (
        <div key={product.id} className="p-4 border rounded-md">
          <Link href={`/product/${product.id}`} prefetch={true}>
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
          </Link>
        </div>
      ))}
    </>
  );
}
