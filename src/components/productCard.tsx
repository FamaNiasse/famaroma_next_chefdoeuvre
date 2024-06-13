import React from 'react';
import { AddButton } from './addButton';
import Link from 'next/link';

interface Product {
  id: string;
  nom_produit: string;
  image: string;
  description: string;
  prix: number;
  promo: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handleAddToCart = () => {
    // Logique pour ajouter le produit au panier
    console.log(`Added product with ID: ${product.id} to cart`);
  };

  return (
    <section className="my-8">
      <div className="flex justify-around">
        <div className="bg-gray-100 p-4 rounded shadow-md">
          <img src={product.image} alt={product.nom_produit} className="w-full" />
          <Link href={`/products/${product.id}`}>
            <button className="mt-2 bg-fuchsia-800 text-white py-2 px-4 rounded">
              Je découvre
            </button>
          </Link>
          <p className="mt-2">{product.description}</p>
          <p className="font-bold">{product.prix} €</p>
          <AddButton onClick={handleAddToCart} />
        </div>
      </div>
    </section>
  );
};

export default ProductCard;

