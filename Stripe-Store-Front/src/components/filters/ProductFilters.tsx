"use client";

import { useState } from "react";

type FilterProps = {
  onFilterChange: (filters: FilterState) => void;
};

type FilterState = {
  priceRange: [number, number];
  categories: string[];
  sortBy: string;
};

export function ProductFilters({ onFilterChange }: FilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 1000],
    categories: [],
    sortBy: "featured",
  });

  const handlePriceChange = (min: number, max: number) => {
    const newFilters = { ...filters, priceRange: [min, max] };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    const newFilters = { ...filters, categories: newCategories };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (sortBy: string) => {
    const newFilters = { ...filters, sortBy };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
      {/* Precio */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Rango de Precio
        </h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="0"
              max="1000"
              value={filters.priceRange[0]}
              onChange={(e) =>
                handlePriceChange(Number(e.target.value), filters.priceRange[1])
              }
              className="w-full"
            />
            <input
              type="range"
              min="0"
              max="1000"
              value={filters.priceRange[1]}
              onChange={(e) =>
                handlePriceChange(filters.priceRange[0], Number(e.target.value))
              }
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Categorías */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Categorías
        </h3>
        <div className="space-y-2">
          {["Electrónica", "Ropa", "Hogar", "Deportes", "Libros", "Belleza"].map(
            (category) => (
              <label
                key={category}
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-300"
              >
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>{category}</span>
              </label>
            )
          )}
        </div>
      </div>

      {/* Ordenar por */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Ordenar por
        </h3>
        <select
          value={filters.sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="featured">Destacados</option>
          <option value="price-asc">Precio: Menor a Mayor</option>
          <option value="price-desc">Precio: Mayor a Menor</option>
          <option value="name-asc">Nombre: A-Z</option>
          <option value="name-desc">Nombre: Z-A</option>
        </select>
      </div>

      {/* Botón de limpiar filtros */}
      <button
        onClick={() => {
          const newFilters = {
            priceRange: [0, 1000],
            categories: [],
            sortBy: "featured",
          };
          setFilters(newFilters);
          onFilterChange(newFilters);
        }}
        className="w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      >
        Limpiar Filtros
      </button>
    </div>
  );
}