"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { ListItem } from ".";

function PathFilterItem({ item }: { item: ListItem }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = pathname === item.path;
  const DynamicTag = active ? "p" : Link;

  return (
    <li className="mt-2 flex text-black dark:text-white">
      <DynamicTag
        href={item.path || ""}
        className={clsx("w-full text-sm underline-offset-4 hover:underline", {
          "underline": active,
        })}
      >
        {item.title}
      </DynamicTag>
    </li>
  );
}

export function FilterItem({ item }: { item: ListItem }) {
  return item.path ? <PathFilterItem item={item} /> : null;
}
