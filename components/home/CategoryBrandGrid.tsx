import Link from "next/link";
import Image from "next/image";

export interface GridTile {
  id: number;
  name: string;
  slug: string;
  image: string | null;
}

interface CategoryBrandGridProps {
  title: string;
  items: GridTile[];
  hrefFor: (slug: string) => string;
}

export function CategoryBrandGrid({
  title,
  items,
  hrefFor,
}: CategoryBrandGridProps) {
  if (items.length === 0) return null;

  return (
    // <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
    //   <h2 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
    //   <div className="mt-6 grid grid-cols-2 border-l border-t border-gray-200 sm:grid-cols-4 lg:grid-cols-7">
    //     {items.map((item) => (
    //       <Link
    //         key={item.id}
    //         href={hrefFor(item.slug)}
    //         className="relative flex flex-col items-center gap-3 border-b border-r border-gray-200 bg-white px-4 py-6 text-center transition-all duration-200 hover:z-10 hover:scale-[1.03] hover:border hover:border-gray-200 hover:shadow-soft-lg"
    //       >
    //         <div className="relative h-20 w-20 shrink-0">
    //           {item.image ? (
    //             <Image src={item.image} alt={item.name} fill sizes="80px" className="object-contain" />
    //           ) : (
    //             <div className="flex h-full w-full items-center justify-center bg-gray-100 text-lg font-semibold text-gray-400">
    //               {item.name.charAt(0)}
    //             </div>
    //           )}
    //         </div>
    //         <span className="text-sm font-semibold text-primary-700">{item.name}</span>
    //       </Link>
    //     ))}
    //   </div>
    // </section>

    <section className="w-full border-t border-gray-100 bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-10 font-serif text-3xl italic text-gray-700">
          {title}
        </h2>

        <div className="mb-10 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {items.map((item) => (
            <Link
              href={hrefFor(item.slug)}
              key={item.id}
              className="group flex cursor-pointer flex-col items-center"
            >
              <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-sm border border-gray-100 bg-gray-50 shadow-sm transition-transform group-hover:shadow-md">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-4xl font-semibold text-gray-300">
                    {item.name.charAt(0)}
                  </div>
                )}
              </div>

              <h3 className="font-serif text-lg text-gray-700">{item.name}</h3>
            </Link>
          ))}
        </div>

        <p className="mb-8 text-sm text-gray-500">
          Shop by our top-selling categories, bought frequently by most
          customers
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/categories"
            className="bg-[#9d363d] px-8 py-3 text-xs font-medium uppercase tracking-widest text-white transition-colors hover:bg-[#852a30]"
          >
            Discover All Categories
          </Link>

          <Link
            href="/collections"
            className="border border-[#9d363d] bg-white px-8 py-3 text-xs font-medium uppercase tracking-widest text-[#9d363d] transition-colors hover:bg-gray-50"
          >
            Explore Collections
          </Link>
        </div>
      </div>
    </section>
  );
}
