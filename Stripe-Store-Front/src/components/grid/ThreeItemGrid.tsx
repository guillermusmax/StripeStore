import { GridTileImage } from "@/components/grid/GridTileImage";
import { products } from "@/components/data";
import Link from "next/link";

function ThreeItemGridItem({
  item,
  size,
  priority
}: {
  item: (typeof products)[0];
  size: 'full' | 'half';
  priority?: boolean;
}) {
  return (
    <div
      className={size === 'full' ? 'md:col-span-4 md:row-span-2' : 'md:col-span-2 md:row-span-1'}
    >
      <Link
        className="relative block aspect-square h-full w-full"
        href={`/product/${item.id}`}
        prefetch={true}
      >
        <GridTileImage
          src={item.image}
          width={500}
          height={500}
          sizes={
            size === 'full' ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'
          }
          priority={priority}
          alt={item.name}
          label={{
            position: size === 'full' ? 'center' : 'bottom',
            title: item.name,
            amount: item.price,
            currencyCode: "USD"
          }}
        />
      </Link>
    </div>
  );
}

export function ThreeItemGrid() {
  if (products.length < 3) return null; // Asegurar que hay productos suficientes

  const [firstProduct, secondProduct, thirdProduct] = products;

  return (
    <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]">
      <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
      <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
      <ThreeItemGridItem size="half" item={thirdProduct} />
    </section>
  );
}
