import Image from "next/image";
import { ProductCard } from "@/components/product/ProductCard";

export default function Bestsellers({ products }) {
  return (
    <section className="w-full bg-[#faf7f5] py-16">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-2 font-serif text-3xl italic text-gray-700">
          Our Bestsellers
        </h2>

        <p className="mb-10 text-gray-500">
          NOSEPIN Customers Love These Jewellery! You Will Love Them Too.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Main feature image */}
          <div className="relative hidden overflow-hidden rounded-sm lg:col-span-1 lg:block">
            <Image
              src="/images/bestseller-jewellery.jpg"
              alt="NOSEPIN Jewellery"
              fill
              sizes="25vw"
              className="object-cover"
            />
          </div>

          {/* Products */}
          {products.map((product) => (
            <div key={product.id} className="text-left">
              <ProductCard
                product={product}
                className="border border-gray-100 bg-white transition-shadow hover:shadow-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
