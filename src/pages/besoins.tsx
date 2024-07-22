import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Product {
  id: number;
  nom_produit: string;
  image: string;
  description: string;
  prix: number;
  promo: boolean;
}

interface Needs {
  id: string;
  nom_besoin: string;
  pictogramme: string;
  products: Product[];
}

export default function Besoins() {
  const [needs, setNeeds] = useState<Needs[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNeeds = async () => {
      try {
        const response = await axios.get('http://localhost:8081/needs');
        const data = response.data;
        if (data.status === "OK" && Array.isArray(data.data)) {
          setNeeds(data.data);
        } else {
          console.error('API response is not an array or failed:', data);
          setNeeds([]);
        }
      } catch (error) {
        console.error('Error fetching needs:', error);
        setNeeds([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNeeds();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900">Besoins</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {needs.length > 0 ? (
            needs.map((need) => (
              <div key={need.id} className="bg-gray-100 p-4 rounded shadow-md">
                <Link href={`/needs/${need.id}`}>
                  <div className="cursor-pointer">
                    <img src={need.pictogramme} alt={need.nom_besoin} className="w-full h-32 object-cover"/>
                    <h3 className="mt-4 text-sm text-gray-700">{need.nom_besoin}</h3>
                  </div>
                </Link>
                <div className="mt-4">
                  <h4 className="text-sm font-bold text-gray-800">Produits associés :</h4>
                  <ul className="list-disc ml-6 mt-2">
                    {need.products.slice(0, 10).map((product) => (
                      <li key={product.id} className="mt-2">
                        <Link href={`/product/${product.id}`}>
                          <a className="text-blue-500 hover:underline">{product.nom_produit}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          ) : (
            <p>No needs available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
