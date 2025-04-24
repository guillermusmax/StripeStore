"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/components/cart/cart-context";
import { ProductFilters } from "@/components/filters/ProductFilters";
import { SearchBar } from "@/components/search/SearchBar";
import { products } from "@/components/data";
import Link from "next/link";

type FilterState = {
  priceRange: [number, number];
  categories: string[];
  sortBy: string;
};

export default function ProductPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 1000],
    categories: [],
    sortBy: "featured",
  });
  const { addToCart } = useCart();

  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        selectedCategory === "Todos" || product.category === selectedCategory;
      const matchesPriceRange =
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1];
      const matchesCategories =
        filters.categories.length === 0 ||
        filters.categories.includes(product.category);
      return matchesCategory && matchesPriceRange && matchesCategories;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Barra de búsqueda móvil */}
      <div className="md:hidden mb-6">
        <SearchBar />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filtros */}
        <div className="w-full md:w-64">
          <ProductFilters onFilterChange={setFilters} />
        </div>

        {/* Contenido principal */}
        <div className="flex-1">
          {/* Filtros de categoría */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Categorías</h2>
            <div className="flex flex-wrap gap-4">
              {["Todos", "Electrónica", "Ropa", "Hogar"].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Grid de Productos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-200 hover:shadow-xl"
              >
                <Link href={`/product/${product.id}`}>
                  <div className="relative h-48">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>
                <div className="p-6">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${product.price}
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-md transition-all duration-200 transform hover:scale-105"
                    >
                      Agregar al Carrito
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mensaje si no hay productos */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 dark:text-gray-400">
                No hay productos disponibles con los filtros seleccionados.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}