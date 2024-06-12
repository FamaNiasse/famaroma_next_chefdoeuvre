import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './productCard';

interface Product {
  id: string;
  nom_produit: string;
  image: string;
  description: string;
  prix: number;
  promo: boolean;
  category: { id: number; nom_categorie: string };
}

interface Category {
  id: number;
  nom_categorie: string;
  products: Product[];
}

export default function ProductList() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8081/products');
        const data = response.data;
        console.log('Fetched products:', data)
        if (data.status === "OK" && Array.isArray(data.data)) {
          const productsByCategory = data.data.reduce((acc: Category[], product: Product) => {
            const category = acc.find(c => c.id === product.category.id);
            if (category) {
              category.products.push(product);
            } else {
              acc.push({ id: product.category.id, nom_categorie: product.category.nom_categorie, products: [product] });
            }
            return acc;
          }, []);
          setCategories(productsByCategory);
        } else {
          console.error('API response is not an array or failed:', data);
          setCategories([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setCategories([]);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 text-center">Tous les produits</h2>
        {categories.length > 0 ? (
          categories.map(category => (
            <div key={category.id}>
              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">{category.nom_categorie}</h3>
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {category.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
}
