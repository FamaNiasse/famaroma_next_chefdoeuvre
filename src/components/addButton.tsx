// components/AddToCartButton.tsx

import React from 'react';

type AddButtonProps = {
  onClick?: () => void;
};

export function AddButton({ onClick }: AddButtonProps) {
  return (
    <button
      onClick={onClick}
      className="group-hover:block border-2 border-fuchsia-800 text-fuchsia-800 px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-white hover:text-fuchsia-800 active:bg-fuchsia-800 active:text-white"
    >
      AJOUTER AU PANIER
    </button>
  );
}
