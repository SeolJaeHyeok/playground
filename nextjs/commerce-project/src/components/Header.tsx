import Image from "next/image";
import { SearchForm } from "./_/SearchForm";
import Link from "next/link";
import Logo from "/public/assets/logo.png";
import { getCategories } from "@/services/server-action";
import { CartButton } from "./_/CartButton";

import { SignOutButton } from "./_/SignOutButton";
import { createClient, getIsLogin } from "@/utils/supabase/server";

export const Header = async () => {
  const { data: categories } = await getCategories();
  const isLogin = await getIsLogin();

  return (
    <header className="relative m-auto max-w-screen-lg flex h-[60px] justify-between items-center">
      <div className="flex items-center gap-2">
        <Link href={"/"}>
          <Image height={40} src={Logo} alt="logo"></Image>
        </Link>
      </div>
      <div className="z-50 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <SearchForm categories={categories} />
      </div>
      <div className="flex gap-2 items-center">
        <CartButton isLogin={isLogin} />
        {isLogin ? (
          <SignOutButton />
        ) : (
          <Link
            className="h-9 flex text-white items-center py-1 px-4 rounded-md bg-blue-600"
            href={"/sign-in"}
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};
