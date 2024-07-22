import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full bg-fuchsia-800 text-black p-6">
            <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div className="flex flex-col gap-4 md:gap-8 text-left md:text-left">
                    <h1 className="font-serif text-lg">Besoin d'un conseil ?</h1>
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        <div className="flex flex-col gap-2">
                            <Link href="#">A propos de Fam@roma</Link>
                            <Link href="#">Nos réseaux sociaux</Link>
                            <Link href="#">Vous ne voulez rien rater ?</Link>
                        </div>
                        <div className="flex flex-row md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 gap-5">
                            <Link href="#">
                                <Image
                                    src="/assets/icons/icon_instagram_green.png"
                                    width={40}
                                    height={40}
                                    alt="Instagram Icon"
                                />
                            </Link>
                            <Link href="#">
                                <Image
                                    src="/assets/icons/icon_messenger_green.png"
                                    width={40}
                                    height={40}
                                    alt="Messenger Icon"
                                />
                            </Link>
                            <Link href="#">
                                <Image
                                    src="/assets/icons/icon_snapchat_green.png"
                                    width={40}
                                    height={40}
                                    alt="Snapchat Icon"
                                />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 text-left md:text-left">
                    <h1 className="font-serif text-lg">Contactez-nous</h1>
                    <Link href="#">Via formulaire</Link>
                    <Link href="#">Par téléphone</Link>
                </div>
                <div className="flex flex-col items-center">
                    <div className="flex flex-col items-center gap-2 mb-4">
                        <h1 className="font-serif text-lg">Inscrivez-vous à notre newsletter</h1>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="e-mail"
                                className="px-2 py-1 rounded-l-md focus:outline-none"
                            />
                            <button className="bg-black text-white px-3 py-1 rounded-r-md">
                                s'inscrire
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 text-left md:text-left">
                    <h1 className="font-serif text-lg">FAQ</h1>
                    <Link href="#">SGV</Link>
                    <Link href="#">Mentions légales</Link>
                    <Link href="#">Protection des données</Link>
                    <Link href="#">Politique des cookies</Link>
                </div>
            </div>
        </footer>
    );
}
