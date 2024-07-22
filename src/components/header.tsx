import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="bg-fuchsia-800 h-24 flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <button onClick={toggleMenu} className="md:hidden text-white text-2xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
          <Link href="/">
            <Image
              src="/assets/logos/logo_removebg.png"
              width={100}
              height={100}
              alt="Logo_famaroma"
            />
          </Link>
        </div>
        <h1 className="font-serif text-white text-6xl hidden md:block">Fam@roma</h1>
        <div className="flex md:flex space-x-4 md:space-x-8">
          <Link href="#">
            <Image
              src="/assets/icons/icon_heart_vert.png"
              width={50}
              height={50}
              alt="Heart Icon"
              className="sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16"
            />
          </Link>
          <Link href="/login">
            <Image
              src="/assets/icons/icon_user_vert.png"
              width={50}
              height={50}
              alt="User Icon"
              className="sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16"
            />
          </Link>
          <Link href="/partenaires">
            <Image
              src="/assets/icons/icon_cart_vert.png"
              width={50}
              height={50}
              alt="Cart Icon"
              className="sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16"
            />
          </Link>
        </div>
      </header>
      <nav className={`bg-white py-2 ${isOpen ? "block" : "hidden"} md:block`}>
        <ul className="flex flex-col md:flex-row justify-around space-y-2 md:space-y-0 md:space-x-8 text-black">
          <li><Link href="/products" className="hover:underline">Les Produits</Link></li>
          <li><Link href="/needs" className="hover:underline">Vos Besoins</Link></li>
          <li><Link href="/partenaires" className="hover:underline">Pharmacies Partenaires</Link></li>
        </ul>
      </nav>
    </>
  );
}
