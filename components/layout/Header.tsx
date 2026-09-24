"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSession, signOut } from "next-auth/react";

export const announcements = [
  "100% Natural Diamonds - SGL Certified",
  "Free Shipping All Over Nepal",
  "BIS Hallmarked Gold | SGL Certified Diamonds",
];

import {
  Menu,
  Search,
  User,
  ShoppingCart,
  Heart,
  ChevronDown,
  LayoutDashboard,
  Package,
  LogOut,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { NotificationBell } from "@/components/layout/NotificationBell";
import { Logo } from "@/components/layout/Logo";
import { formatPrice } from "@/lib/format";

const NAV_LINKS = [
  { id: "home", href: "/", label: "Home" },
  { id: "jewellery", href: "/jewellery", label: "Jewellery" },
  { id: "about", href: "/about", label: "About Us" },
  { id: "contact", href: "/contact", label: "Contact" },
];

type ProductSuggestion = {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string | null;
};

function SearchBox({
  value,
  onChange,
  onSubmit,
  onNavigate,
}: {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onNavigate?: () => void;
}) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([]);
  const term = value.trim();

  useEffect(() => {
    if (!term) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const timeout = setTimeout(() => {
      fetch(`/api/products?search=${encodeURIComponent(term)}&pageSize=6`)
        .then((res) => res.json())
        .then((data) => setSuggestions(data.success ? data.data : []))
        .catch(() => setSuggestions([]))
        .finally(() => setLoading(false));
    }, 300);

    return () => clearTimeout(timeout);
  }, [term]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function goToProduct(slug: string) {
    setOpen(false);
    onNavigate?.();
    router.push(`/product/${slug}`);
  }

  const showDropdown = open && term.length > 0;

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Search Input */}
      <div className="flex items-stretch overflow-hidden rounded-lg border border-[#D5BBB3] bg-white focus-within:border-[#783F35] focus-within:ring-1 focus-within:ring-[#783F35]">
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder="Search jewellery..."
          autoComplete="off"
          className="w-full min-w-0 border-0 bg-transparent px-4 py-2 text-sm text-[#2F211D] outline-none placeholder:text-[#9A8D86]"
        />

        <button
          type="submit"
          aria-label="Search"
          className="flex shrink-0 items-center justify-center bg-primary-500 px-4 text-white transition-colors hover:bg-primary-600"
        >
          <Search className="h-4.5 w-4.5" strokeWidth={2} />
        </button>
      </div>

      {/* Search Suggestions */}
      {showDropdown && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1.5 max-h-96 overflow-y-auto rounded-xl border border-[#E8DDD2] bg-white py-1 shadow-xl">
          {loading ? (
            <p className="px-4 py-3 text-sm text-[#8A7C75]">Searching...</p>
          ) : suggestions.length === 0 ? (
            <p className="px-4 py-3 text-sm text-[#8A7C75]">
              No products found
            </p>
          ) : (
            <>
              {suggestions.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => goToProduct(p.slug)}
                  className="flex w-full items-center gap-3 px-3 py-2 text-left transition-colors hover:bg-[#FBF6EE]"
                >
                  <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-[#F7EFEC]">
                    {p.image && (
                      <Image
                        src={p.image}
                        alt=""
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    )}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-[#2F211D]">
                      {p.name}
                    </span>

                    <span className="block text-xs font-medium text-primary-600">
                      {formatPrice(p.price)}
                    </span>
                  </span>
                </button>
              ))}

              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setOpen(false);
                  onSubmit();
                }}
                className="mt-1 block w-full border-t border-[#E8DDD2] px-3 py-2 text-left text-sm font-medium text-primary-600 transition-colors hover:bg-[#FBF6EE]"
              >
                {`See all results for "${term}"`}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const { data: session, status } = useSession();
  const { totalCount } = useCart();
  const { totalCount: wishlistCount } = useWishlist();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");

  function handleSearch(e?: React.FormEvent) {
    e?.preventDefault();

    router.push(
      search ? `/jewellery?search=${encodeURIComponent(search)}` : "/jewellery",
    );

    setMobileOpen(false);
  }

  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncementIndex(
        (prevIndex) => (prevIndex + 1) % announcements.length,
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Announcement Bar */}
      <div className="relative h-8 overflow-hidden bg-primary-500 py-2 text-center text-xs font-medium tracking-wide text-white">
        {announcements.map((announcement, index) => (
          <div
            key={index}
            className={`absolute w-full transition-all duration-500 ease-in-out ${
              index === currentAnnouncementIndex
                ? "translate-y-0 transform opacity-100"
                : "-translate-y-full transform opacity-0"
            }`}
          >
            {announcement}
          </div>
        ))}
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 border-b border-[#E8DDD2] bg-[#FBF6EE]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="me-5 shrink-0">
            <Logo iconSize={100} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 text-sm font-medium text-[#4F403B] lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-primary-600"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Search */}
          <form
            onSubmit={handleSearch}
            className="ml-auto hidden max-w-2xl flex-1 items-center md:flex"
          >
            <SearchBox
              value={search}
              onChange={setSearch}
              onSubmit={handleSearch}
            />
          </form>

          {/* Actions */}
          <div className="ml-auto flex items-center gap-1 md:ml-0">
            {status === "authenticated" && <NotificationBell />}

            {/* Account */}
            {status === "authenticated" ? (
              <div className="group relative">
                <button className="flex items-center gap-1.5 rounded-full p-2 text-sm font-medium text-[#4F403B] transition-colors hover:bg-[#F3E9C8] lg:border lg:border-[#E8DDD2] lg:p-1.5 lg:pl-1.5 lg:pr-3 lg:hover:border-[#D5BBB3] lg:hover:bg-[#FBF6EE]">
                  {session.user?.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={session.user.image}
                      alt=""
                      className="h-6 w-6 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                      <User className="h-3.5 w-3.5" strokeWidth={2} />
                    </span>
                  )}

                  <span className="hidden lg:inline">
                    {session.user?.name?.split(" ")[0]}
                  </span>

                  <ChevronDown
                    className="hidden h-3.5 w-3.5 text-[#8A7C75] lg:block"
                    strokeWidth={2}
                  />
                </button>

                {/* Account Dropdown */}
                <div className="invisible absolute right-0 z-50 mt-1 w-48 rounded-xl border border-[#E8DDD2] bg-white py-1 shadow-xl opacity-0 transition-opacity group-hover:visible group-hover:opacity-100">
                  <Link
                    href="/account"
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-[#4F403B] transition-colors hover:bg-[#FBF6EE]"
                  >
                    <User
                      className="h-4 w-4 text-primary-500"
                      strokeWidth={1.8}
                    />
                    My Account
                  </Link>

                  <Link
                    href="/account/orders"
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-[#4F403B] transition-colors hover:bg-[#FBF6EE]"
                  >
                    <Package
                      className="h-4 w-4 text-primary-500"
                      strokeWidth={1.8}
                    />
                    My Orders
                  </Link>

                  {session.user?.role === "ADMIN" && (
                    <Link
                      href="/admin"
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-[#4F403B] transition-colors hover:bg-[#FBF6EE]"
                    >
                      <LayoutDashboard
                        className="h-4 w-4 text-primary-500"
                        strokeWidth={1.8}
                      />
                      Admin Dashboard
                    </Link>
                  )}

                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex w-full items-center gap-2.5 px-4 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" strokeWidth={1.8} />
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden rounded-lg px-3 py-2 text-sm font-medium text-[#4F403B] transition-colors hover:bg-[#F3E9C8] lg:block"
              >
                Login
              </Link>
            )}

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative rounded-full p-2 text-[#5F504A] transition-colors hover:bg-[#F3E9C8] hover:text-primary-600"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" strokeWidth={1.75} />

              {wishlistCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-secondary-500 text-[10px] font-bold text-white">
                  {wishlistCount > 9 ? "9+" : wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative rounded-full p-2 text-[#5F504A] transition-colors hover:bg-[#F3E9C8] hover:text-primary-600"
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5" strokeWidth={1.75} />

              {totalCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-secondary-500 text-[10px] font-bold text-white">
                  {totalCount > 9 ? "9+" : totalCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu */}
            <button
              className="rounded-lg p-2 text-[#5F504A] transition-colors hover:bg-[#F3E9C8] hover:text-primary-600 lg:hidden"
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((o) => !o)}
            >
              <Menu className="h-6 w-6" strokeWidth={1.8} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="border-t border-[#E8DDD2] bg-[#FBF6EE] px-4 py-3 lg:hidden">
            <form onSubmit={handleSearch} className="mb-3 flex md:hidden">
              <SearchBox
                value={search}
                onChange={setSearch}
                onSubmit={handleSearch}
                onNavigate={() => setMobileOpen(false)}
              />
            </form>

            <nav className="flex flex-col gap-1 text-sm font-medium text-[#4F403B]">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-2 py-2 transition-colors hover:bg-[#F3E9C8] hover:text-primary-600"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {status !== "authenticated" && (
                <Link
                  href="/login"
                  className="rounded-lg px-2 py-2 transition-colors hover:bg-[#F3E9C8] hover:text-primary-600"
                  onClick={() => setMobileOpen(false)}
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
