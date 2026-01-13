// components/AddToCartButton.tsx

import React, { useState, useEffect } from 'react';

//test
type AddButtonProps = {
  onClick?: () => void;
};

export function AddButton({ onClick }: AddButtonProps) {
  const [showMessage, setShowMessage] = useState(false);

  const handleAddToCart = () => {
    if (onClick) {
      onClick();
    }
    setShowMessage(true);
  };

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000); // Le message disparaît après 3 secondes
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  return (
    <div>
      <button
        onClick={handleAddToCart}
        className="hidden group-hover:block border-2 border-fuchsia-800 text-fuchsia-800 px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-white hover:text-fuchsia-800 active:bg-fuchsia-800 active:text-white"
      >
        AJOUTER AU PANIER
      </button>
      {showMessage && (
        <p className="border-fuchsia-800 mt-2">Ajouté au panier</p>
      )}
    </div>
  );
}
