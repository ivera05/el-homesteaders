import { CategoryPageProps } from "@/app/types";
import { categoriesApi } from "@/app/api/categories";
import Link from "next/link";
import ProductGrid from "@/app/components/ProductGrid";

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const page = await searchParams;

  const currentPage = page?.page ? parseInt(page.page) : 1;

  const { items, category, meta } = await categoriesApi.getCategoryProducts(slug);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-serif text-stone-800 mb-12 capitalize">
        {category.name}
      </h1>

      <ProductGrid items={items} />

      {/* Simple Pagination Controls */}
      <div className="flex justify-center items-center gap-4 border-t border-stone-200 dark:border-stone-700 pt-8">
        {currentPage > 1 && (
          <Link
            href={`/category/${slug}?page=${currentPage - 1}`}
            className="px-4 py-2 bg-stone-800 text-white rounded hover:bg-stone-700 transition"
          >
            Previous
          </Link>
        )}

        <span className="text-stone-600 dark:text-stone-400 font-medium">
          Page {currentPage} of {meta.totalPages}
        </span>

        {currentPage < meta.totalPages && (
          <Link
            href={`/category/${slug}?page=${currentPage + 1}`}
            className="px-4 py-2 bg-stone-800 text-white rounded hover:bg-stone-700 transition"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
}
