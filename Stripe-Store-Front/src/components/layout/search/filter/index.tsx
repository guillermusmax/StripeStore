import { Suspense } from "react";
import FilterItemDropdown from "./droopdown";
import { FilterItem } from "./item";

export type ListItem = { title: string; path?: string; slug?: string };

function FilterItemList({ list }: { list: ListItem[] }) {
  return (
    <>
      {list.map((item: ListItem, i) => (
        <FilterItem key={i} item={item} />
      ))}
    </>
  );
}

export default function FilterList({ list, title }: { list: ListItem[]; title?: string }) {
  return (
    <nav>
      {title ? <h3 className="text-xs text-neutral-500">{title}</h3> : null}
      <ul className="hidden md:block">
        <Suspense fallback={null}>
          <FilterItemList list={list} />
        </Suspense>
      </ul>
      <ul className="md:hidden">
        <Suspense fallback={null}>
          <FilterItemDropdown list={list} />
        </Suspense>
      </ul>
    </nav>
  );
}
