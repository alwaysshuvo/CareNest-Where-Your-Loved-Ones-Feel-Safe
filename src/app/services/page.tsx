"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { services } from "@/data/services";

const ITEMS_PER_PAGE = 10;
const categories = [
  { label: "All Services", value: "all" },
  { label: "Baby Care", value: "baby" },
  { label: "Elderly Care", value: "elderly" },
  { label: "Sick Care", value: "sick" },
];

export default function ServicesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageFromUrl = Number(searchParams.get("page")) || 1;

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(pageFromUrl);

  useEffect(() => {
    setCurrentPage(pageFromUrl);
  }, [pageFromUrl]);

  /* 🔍 SEARCH + CATEGORY FILTER */
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchSearch = service.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        category === "all" || service.category === category;

      return matchSearch && matchCategory;
    });
  }, [search, category]);

  /* 📄 PAGINATION */
  const totalPages = Math.ceil(
    filteredServices.length / ITEMS_PER_PAGE
  );

  const paginatedServices = filteredServices.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const changePage = (page: number) => {
    setCurrentPage(page);
    router.push(`/services?page=${page}`, { scroll: false });
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">
            Our Care Services
          </h1>
          <p className="mt-2 text-gray-600">
            Trusted care solutions for every family need
          </p>
        </div>

        {/* SEARCH + FILTER */}
        <div className="mb-8 flex flex-col gap-5">
          {/* Search */}
          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              changePage(1);
            }}
            className="w-full rounded-xl border px-5 py-3 text-sm focus:outline-none focus:border-purple-500"
          />

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => {
                  setCategory(cat.value);
                  changePage(1);
                }}
                className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                  category === cat.value
                    ? "bg-purple-600 text-white"
                    : "bg-white border hover:bg-purple-50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* RESULT INFO */}
        <div className="mb-8 flex justify-between items-center rounded-lg bg-purple-50 px-5 py-3 text-sm">
          <p className="text-purple-700 font-medium">
            Found {filteredServices.length} services
          </p>
          <p className="text-gray-600">
            Page {currentPage} of {totalPages}
          </p>
        </div>

        {/* SERVICES GRID */}
        {paginatedServices.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {paginatedServices.map((service) => (
              <div
                key={service.id}
                className="group bg-white rounded-2xl overflow-hidden shadow hover:shadow-2xl transition"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-purple-600 px-3 py-1 text-xs text-white">
                    {service.category.toUpperCase()}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col h-full">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {service.shortDesc}
                  </p>

                  <p className="mt-3 text-purple-600 font-semibold">
                    ৳{service.price} / day
                  </p>

                  <Link
                    href={`/services/${service.id}?page=${currentPage}`}
                    className="mt-5 inline-flex items-center justify-center rounded-lg border border-purple-600 px-4 py-2 text-sm font-medium text-purple-600 transition group-hover:bg-purple-600 group-hover:text-white"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-gray-500">
            No services found
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="mt-14 flex justify-center gap-2 flex-wrap">
            {Array.from({ length: totalPages }).map((_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  onClick={() => changePage(page)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    currentPage === page
                      ? "bg-purple-600 text-white"
                      : "bg-white border hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
