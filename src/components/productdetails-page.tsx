// components/ProductDetailsPage.tsx

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface Need {
  id: string;
  nom_besoin: string;
  pictogramme: string;
}

interface Product {
  id: number;
  nom_produit: string;
  image: string;
  description: string;
  prix: number;
  promo: boolean;
  needs: Need[];
  category: {
    id: number;
    nom_categorie: string;
  };
}

const ProductDetailsPage: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8081/products/${id}`)
        .then(response => setProduct(response.data.data))
        .catch(error => console.error('Error fetching product details:', error));
    }
  }, [id]);

  const handleAddToCart = () => {
    console.log(`Added product with ID: ${product?.id} to cart`);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col items-center">
          <img src={product.image} alt={product.nom_produit} className="w-full h-auto rounded-lg shadow-md" />
          <div className="flex mt-4 space-x-4">
            {product.needs && product.needs.map((need) => (
              <span key={need.id} className="px-3 py-1 bg-fuchsia-100 text-fuchsia-800 rounded-full text-sm">
                {need.nom_besoin}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.nom_produit}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <div className="text-2xl font-bold text-gray-900 mb-4">{product.prix} €</div>
          <button
            onClick={handleAddToCart}
            className="bg-fuchsia-800 text-white py-2 px-4 rounded hover:bg-fuchsia-900 transition duration-200"
          >
            Pharmacies partenaires
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
