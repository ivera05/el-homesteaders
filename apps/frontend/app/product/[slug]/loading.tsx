export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left: Image Skeleton */}
        <div className="sticky top-24">
          <div className="aspect-square bg-slate-200 rounded-3xl overflow-hidden" />
        </div>

        {/* Right: Product Details Skeleton */}
        <div className="flex flex-col">
          <div className="h-10 w-3/4 bg-slate-200 rounded mb-3" />
          <div className="h-5 w-32 bg-slate-200 rounded mb-6" />

          <div className="h-9 w-40 bg-slate-200 rounded mb-8" />

          <div className="space-y-3 mb-10">
            <div className="h-4 w-full bg-slate-200 rounded" />
            <div className="h-4 w-full bg-slate-200 rounded" />
            <div className="h-4 w-5/6 bg-slate-200 rounded" />
          </div>

          <div className="h-14 w-full lg:w-2/3 bg-slate-200 rounded-2xl mb-10" />

          <div className="border-t border-slate-100 pt-6">
            <div className="h-7 w-56 bg-slate-200 rounded mb-6" />
            <div className="h-40 w-full bg-slate-200 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
