import React, { useState } from 'react';

interface QuantityPickerProps {
  onChange: (quantity: number) => void;
}

const QuantityPicker: React.FC<QuantityPickerProps> = ({ onChange }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(prev => {
      const newQuantity = prev + 1;
      onChange(newQuantity);
      return newQuantity;
    });
  };

  const handleDecrement = () => {
    setQuantity(prev => {
      const newQuantity = prev > 1 ? prev - 1 : 1;
      onChange(newQuantity);
      return newQuantity;
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <button 
        onClick={handleDecrement}
        className="px-2 py-1 bg-gray-200 rounded"
      >
        -
      </button>
      <span>{quantity}</span>
      <button 
        onClick={handleIncrement}
        className="px-2 py-1 bg-gray-200 rounded"
      >
        +
      </button>
    </div>
  );
};

export default QuantityPicker;
