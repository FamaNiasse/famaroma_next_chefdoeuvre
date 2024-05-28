import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return ( 
        <>

        <header className="bg-fuchsia-800 h-24 flex items-center">
<div className="flex-none w-15">
<Image
      src="/assets/logos/logo_removebg.png"
      width={100}
      height={100}
      alt="Logo_famaroma"
    />
</div>

    <h1 className="font-serif text-center text-white text-6xl flex-auto w-64">Fam@roma</h1>

<div className="flex justify-between gap-8">    
    <Image
      src="/assets/icons/icon_heart_vert.png"
      width={100}
      height={100}
      alt="Logo_famaroma"
    />

<Image
      src="/assets/icons/icon_user_vert.png"
      width={100}
      height={100}
      alt="Logo_famaroma"
    />

<Image
      src="/assets/icons/icon_cart_vert.png"
      width={100}
      height={100}
      alt="Logo_famaroma"
    /></div>
        </header>

        <div className="bg-transparent flex justify-between p-5"> 
        <Link href="#">Les Produits</Link>
        <Link href="#">Vos Besoins</Link>
        <Link href="#">Conseils & Astuces</Link>
        <Link href="#">DIY</Link>
        <Link href="#">Pharmacies Partenaires</Link>
        </div>
     </>   
)
  }