import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full bg-fuchsia-800 text-white p-6">
            <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-col gap-2 text-center md:text-left">
                    <h1 className="font-serif text-lg">Fam@roma</h1>
                    <Link href="#">Nos produits</Link>
                    <Link href="#">Qui sommes nous</Link>
                    <Link href="#">Nos partenaires</Link>
                </div>
                <div className="flex flex-col gap-2 text-center md:text-left">
                    <h1 className="font-serif text-lg">Contactez-nous</h1>
                    <Link href="#">Via formulaire</Link>
                    <Link href="#">Par téléphone</Link>
                </div>
                <div className="flex justify-center">
                    <Image
                        src="/assets/logos/logo_fond_vert.png"
                        width={100}
                        height={100}
                        alt="Logo_famaroma"
                        className="p-0"
                    />
                </div>
                <div className="flex flex-col gap-2 text-center md:text-left">
                    <h1 className="font-serif text-lg">Suivez nous sur les réseaux sociaux</h1>
                    <div className="flex justify-center space-x-4">
                        <Image
                            src="/assets/icons/icon_messenger_green.png"
                            width={40}
                            height={40}
                            alt="Messenger Icon"
                        />
                        <Image
                            src="/assets/icons/icon_instagram_green.png"
                            width={40}
                            height={40}
                            alt="Instagram Icon"
                        />
                        <Image
                            src="/assets/icons/icon_snapchat_green.png"
                            width={40}
                            height={40}
                            alt="Snapchat Icon"
                        />
                    </div>
                </div>
            </div>
        </footer>
    );
}
