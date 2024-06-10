import { AddButton } from "./addButton";

export default function ProductCard() {
    return (

        <section className="my-8">
          <div className="flex justify-around">
            <div className="bg-gray-100 p-4 rounded shadow-md">
              <img src="/assets/images/produits/promo_1.png" alt="Product 1" className="w-full"/>
              <button className="mt-2 bg-fuchsia-800 text-white py-2 px-4 rounded">Je découvre</button>
              <p className="mt-2">Silhouette affinée et meilleur confort</p>
              <p className="font-bold">20,90 €</p>
            </div>
          </div>
        </section>
       
  );
}