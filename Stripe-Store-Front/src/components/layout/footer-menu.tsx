"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function FooterMenuItem({ title, path }: { title: string; path: string }) {
  const pathname = usePathname();
  const active = pathname === path;

  return (
    <li>
      <Link
        href={path}
        className={clsx(
          "block p-2 text-lg underline-offset-4 hover:text-black hover:underline md:inline-block md:text-sm",
          { "text-black font-bold": active }
        )}
      >
        {title}
      </Link>
    </li>
  );
}

export default function FooterMenu({ menu }: { menu: { title: string; path: string }[] }) {
  if (!menu.length) return null;
  return (
    <nav>
      <ul>
        {menu.map((item) => (
          <FooterMenuItem key={item.title} {...item} />
        ))}
      </ul>
    </nav>
  );
}
