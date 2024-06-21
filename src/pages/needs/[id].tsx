// pages/needs/[id].tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface Product {
  id: number;
  nom_produit: string;
  image: string;
  description: string;
  prix: number;
  promo: boolean;
}

const NeedsProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8081/needs/${id}`)
        .then(response => setProducts(response.data.data))
        .catch(error => console.error('Error fetching products:', error));
    }
  }, [id]);

  if (!products.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900">Produits pour le besoin</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="bg-gray-100 p-4 rounded shadow-md">
              <img src={product.image} alt={product.nom_produit} className="w-full h-32 object-cover"/>
              <h3 className="mt-4 text-sm text-gray-700">{product.nom_produit}</h3>
              <p className="mt-2 text-sm text-gray-600">{product.description}</p>
              <p className="mt-2 text-lg font-bold text-gray-900">{product.prix} €</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NeedsProductsPage;
