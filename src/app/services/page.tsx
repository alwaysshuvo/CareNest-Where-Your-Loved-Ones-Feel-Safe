"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "@/data/services";

const ITEMS_PER_PAGE = 10;

const categories = [
  { label: "All Services", value: "all" },
  { label: "Baby Care", value: "baby" },
  { label: "Elderly Care", value: "elderly" },
  { label: "Sick Care", value: "sick" },
];

/* Skeleton */
function ServiceSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl bg-white shadow">
      <div className="h-44 bg-gray-200" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-1/3 mt-4" />
        <div className="h-9 bg-gray-200 rounded mt-4" />
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageFromUrl = Number(searchParams.get("page")) || 1;

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [loading, setLoading] = useState(true);

  /* Sync page */
  useEffect(() => {
    setCurrentPage(pageFromUrl);
  }, [pageFromUrl]);

  /* Fake loading (UX) */
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [search, category, currentPage]);

  /* Filter */
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

  /* Pagination */
  const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE);

  const paginatedServices = filteredServices.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const changePage = (page: number) => {
    setCurrentPage(page);
    router.push(`/services?page=${page}`, { scroll: false });
  };

  return (
    <section className="bg-gray-50 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-7xl px-6"
      >
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Our Care Services
          </h1>
          <p className="mt-2 text-gray-600">
            Trusted care solutions for every family need
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mb-8 space-y-5">
          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              changePage(1);
            }}
            className="w-full rounded-xl border px-5 py-3 text-sm focus:border-purple-500 focus:outline-none"
          />

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
                    : "border bg-white hover:bg-purple-50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="mb-8 flex items-center justify-between rounded-lg bg-purple-50 px-5 py-3 text-sm">
          <p className="font-medium text-purple-700">
            Found {filteredServices.length} services
          </p>
          <p className="text-gray-600">
            Page {currentPage} of {totalPages}
          </p>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ServiceSkeleton key={i} />
            ))}
          </div>
        ) : paginatedServices.length ? (
          <AnimatePresence>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {paginatedServices.map((service) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group overflow-hidden rounded-2xl bg-white shadow transition hover:shadow-2xl"
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-purple-600 px-3 py-1 text-xs text-white">
                      {service.category.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex h-full flex-col p-5">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {service.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                      {service.shortDesc}
                    </p>

                    <p className="mt-3 font-semibold text-purple-600">
                      ৳{service.price} / day
                    </p>

                    <Link
                      href={`/services/${service.id}?page=${currentPage}`}
                      className="mt-5 inline-flex items-center justify-center rounded-lg border border-purple-600 px-4 py-2 text-sm font-medium text-purple-600 transition hover:bg-purple-600 hover:text-white"
                    >
                      View Details
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        ) : (
          <div className="py-20 text-center text-gray-500">
            No services found
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-14 flex flex-wrap justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => changePage(page)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    currentPage === page
                      ? "bg-purple-600 text-white"
                      : "border bg-white hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>
        )}
      </motion.div>
    </section>
  );
}
