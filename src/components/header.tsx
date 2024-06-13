import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <header className="bg-fuchsia-800 h-24 flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
        <Link href="/">
          <Image
            src="/assets/logos/logo_removebg.png"
            width={100}
            height={100}
            alt="Logo_famaroma"
          />
          </Link>
        </div>
        <h1 className="font-serif text-white text-6xl">Fam@roma</h1>

        <div className="flex space-x-8">
        <Link href="#">
          <Image
            src="/assets/icons/icon_heart_vert.png"
            width={50}
            height={50}
            alt="Heart Icon"
          />
          </Link>
          <Link href="/login">
          <Image
            src="/assets/icons/icon_user_vert.png"
            width={50}
            height={50}
            alt="User Icon"
          />
          </Link>
          <Image
            src="/assets/icons/icon_cart_vert.png"
            width={50}
            height={50}
            alt="Cart Icon"
          />
        </div>
      </header>
      <nav className="bg-white py-2">
        <ul className="flex justify-around space-x-8 text-black">
          <li><Link href="/products"><span className="hover:underline">Les Produits</span></Link></li>
          <li><Link href="/needs"><span className="hover:underline">Vos Besoins</span></Link></li>
          <li><Link href="/conseils"><span className="hover:underline">Conseils & Astuces</span></Link></li>
          <li><Link href="/diy"><span className="hover:underline">DIY</span></Link></li>
          <li><Link href="/partenaires"><span className="hover:underline">Pharmacies Partenaires</span></Link></li>
        </ul>
      </nav>
    </>
  );
}
