"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

type SearchResult = {
  id: string;
  name: string;
  category: string;
  image: string;
};

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Simulación de resultados de búsqueda
  const mockResults: SearchResult[] = [
    {
      id: "1",
      name: "Smartphone XYZ",
      category: "Electrónica",
      image: "/products/phone.jpg",
    },
    {
      id: "2",
      name: "Laptop Pro",
      category: "Electrónica",
      image: "/products/laptop.jpg",
    },
    {
      id: "3",
      name: "Camisa Casual",
      category: "Ropa",
      image: "/products/shirt.jpg",
    },
  ];

  useEffect(() => {
    if (query.length > 2) {
      const filtered = mockResults.filter(
        (result) =>
          result.name.toLowerCase().includes(query.toLowerCase()) ||
          result.category.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResultClick = (result: SearchResult) => {
    router.push(`/product/${result.id}`);
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar productos..."
          className="w-full px-4 py-2 pl-10 pr-4 text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="py-2">
            {results.map((result) => (
              <button
                key={result.id}
                onClick={() => handleResultClick(result)}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-3"
              >
                <div className="relative w-10 h-10">
                  <img
                    src={result.image}
                    alt={result.name}
                    className="object-cover rounded"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {result.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {result.category}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}