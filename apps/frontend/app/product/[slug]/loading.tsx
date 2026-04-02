export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 animate-pulse">
      <div className="h-10 w-48 bg-slate-200 rounded mb-10" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="aspect-square bg-slate-200 rounded-xl" />
            <div className="h-4 w-3/4 bg-slate-200 rounded" />
            <div className="h-4 w-1/4 bg-slate-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
