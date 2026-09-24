import Image from "next/image";
import { ProductCard } from "@/components/product/ProductCard";

export default function Bestsellers({ products }) {
  return (
    <section className="w-full border-t border-[#E8DDD2] bg-[#FBF6EE] py-16">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-2 font-serif text-3xl italic text-[#783F35]">
          Our Bestsellers
        </h2>

        <p className="mb-10 text-[#6F625D]">
          NOSEPIN Customers Love These Jewellery! You Will Love Them Too.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Main feature image */}
          <div className="relative hidden overflow-hidden rounded-sm border border-[#E8DDD2] lg:col-span-1 lg:block">
            <Image
              src="/images/bestseller-jewellery.jpg"
              alt="NOSEPIN Jewellery"
              fill
              sizes="25vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Products */}
          {products.map((product) => (
            <div key={product.id} className="text-left">
              <ProductCard
                product={product}
                className="border border-[#E8DDD2] bg-white transition-all duration-300 hover:border-[#BA8B30] hover:shadow-md"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
