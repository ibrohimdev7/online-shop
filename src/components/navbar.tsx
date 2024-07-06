import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="flex items-center px-4 md:px-12 py-2 justify-between fixed top-0 w-full z-50 shadow bg-white">
      <Link
        href={"/"}
        className="flex items-center gap-2 uppercase font-semibold"
      >
        HalalShop
      </Link>

      <div className="flex items-center space-x-2.5 text-sm">
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link href={"/"} className="mr-5 hover:text-blue-600">
            Home
          </Link>
          <Link href={"/products"} className="mr-5 hover:text-blue-600">
            All Products
          </Link>
        </nav>
        <Link href={"/shopping-card"}>
          <button className="button bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-transparent hover:text-blue-600">
            My bag
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
