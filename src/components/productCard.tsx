import { AddButton } from "./addButton";

export default function ProductCard() {
    return (
        <div className="bg-gray-100 p-4 rounded shadow-md text-center">
            <img src="/assets/images/produits/citron.jpg" alt="Citron" className="w-full" />
            <AddButton/>
            <p className="mt-2">Vertues du citron en huiles essentielles</p>
            <p className="font-bold">25,90 €</p>
        </div>
  );
}