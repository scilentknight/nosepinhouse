import {
  PromoProductCard,
  type PromoProduct,
} from "@/components/home/PromoProductCard";

interface PromoColumn {
  title: string;
  products: PromoProduct[];
}

const GRID_COLS: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
};

export function PromoProductColumns({ columns }: { columns: PromoColumn[] }) {
  const visible = columns.filter((c) => c.products.length > 0);
  if (visible.length === 0) return null;

  return (
    // <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
    //   <div className={`grid grid-cols-1 gap-8 ${GRID_COLS[visible.length]}`}>
    //     {visible.map((column) => (
    //       <div key={column.title}>
    //         <h2 className="text-sm font-bold uppercase tracking-wide text-gray-800">{column.title}</h2>
    //         <div className="mt-4 flex flex-col gap-3">
    //           {column.products.map((product) => (
    //             <PromoProductCard key={product.id} product={product} />
    //           ))}
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </section>

    <section className="w-full bg-[#faf7f5] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-gray-500">
            Discover More
          </p>

          <h2 className="font-serif text-3xl italic text-gray-800 sm:text-4xl">
            Shop Our Collections
          </h2>

          <div className="mx-auto mt-4 h-px w-16 bg-gray-300" />
        </div>

        {/* Product Columns */}
        <div
          className={`grid grid-cols-1 gap-10 md:gap-8 ${GRID_COLS[visible.length]}`}
        >
          {visible.map((column) => (
            <div
              key={column.title}
              className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6"
            >
              {/* Column Title */}
              <div className="mb-5 flex items-center justify-between border-b border-gray-100 pb-4">
                <h3 className="font-serif text-xl text-gray-800">
                  {column.title}
                </h3>

                <span className="text-xs uppercase tracking-wider text-gray-400">
                  {column.products.length} Items
                </span>
              </div>

              {/* Products */}
              <div className="flex flex-col divide-y divide-gray-100">
                {column.products.map((product) => (
                  <div
                    key={product.id}
                    className="py-4 first:pt-0 last:pb-0 transition-transform duration-200 hover:translate-x-1"
                  >
                    <PromoProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
