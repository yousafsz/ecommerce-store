"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Category } from "@/types";
import * as React from "react";
import Categories from "./categories";
interface MainNavProps {
  data: Category[];
}
const MainNav: React.FC<MainNavProps> = ({ data }) => {
  const pathname = usePathname();

  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  const more = [
    { href: `/`, label: "Home", active: pathname === `/` },
    {
      href: `/contactus`,
      label: "Contact Us",
      active: pathname === `/contactus`,
    },
    { href: `/aboutus`, label: "About Us", active: pathname === `/aboutus` },
  ];

  return (
    <nav className="mx-auto w-max flex items-center sm:space-x-4 lg:space-x-6 font-sans text-sm lg:text-lg font-semibold">
      <Link href={"/"} className="hidden md:block">
        Home
      </Link>
      <Link href={"/contactus"} className="hidden sm:block pl-4">
        Contact Us
      </Link>
      <Link href={"/aboutus"} className="hidden sm:block pl-4">
        About Us
      </Link>
      <Categories routes={routes} title={"Category"} />
      <div className="sm:hidden">
        <Categories routes={more} title={"More"} />
      </div>
    </nav>
  );
};

export default MainNav;
