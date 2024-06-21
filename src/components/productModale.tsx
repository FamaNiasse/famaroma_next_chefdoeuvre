import React, { useState, useEffect } from 'react';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: any) => void;
  product?: any;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, onSave, product }) => {
  const [nomProduit, setNomProduit] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState(0);
  const [promo, setPromo] = useState(false);

  useEffect(() => {
    if (product) {
      setNomProduit(product.nom_produit);
      setImage(product.image);
      setDescription(product.description);
      setPrix(product.prix);
      setPromo(product.promo);
    } else {
      setNomProduit('');
      setImage('');
      setDescription('');
      setPrix(0);
      setPromo(false);
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: product?.id, nom_produit: nomProduit, image, description, prix, promo });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">{product ? 'Edit Product' : 'Add Product'}</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nom du Produit</label>
            <input
              type="text"
              value={nomProduit}
              onChange={e => setNomProduit(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Image</label>
            <input
              type="text"
              value={image}
              onChange={e => setImage(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Prix</label>
            <input
              type="number"
              value={prix}
              onChange={e => setPrix(parseFloat(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Promo</label>
            <input
              type="checkbox"
              checked={promo}
              onChange={e => setPromo(e.target.checked)}
              className="mr-2"
            />
            En Promotion
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-fuchsia-600 text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
