import { useState } from 'react';
import { Link } from 'react-router-dom';
import OptimizedImage from '../common/OptimizedImage';
import Button from '../common/Button';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (newQuantity) => {
    const updatedQuantity = Math.max(1, newQuantity);
    setQuantity(updatedQuantity);
    onUpdateQuantity(item.id, item.selectedSize, updatedQuantity);
  };

  return (
    <div className="p-4 flex">
      <Link to={`/products/${item.id}`} className="flex-shrink-0 w-20 h-20">
        <OptimizedImage
          src={item.images[0]}
          alt={item.name}
          className="w-full h-full object-cover rounded-md"
        />
      </Link>
      
      <div className="ml-4 flex-grow">
        <div className="flex justify-between">
          <div>
            <Link to={`/products/${item.id}`} className="text-sm font-medium text-secondary hover:text-primary">
              {item.name}
            </Link>
            <p className="text-xs text-gray-500 mt-1">Size: {item.selectedSize}</p>
          </div>
          <p className="text-sm font-medium text-secondary">
            IDR {(item.price * item.quantity).toLocaleString()}
          </p>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
            >
              -
            </button>
            <span className="px-3 py-1 text-center">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
            >
              +
            </button>
          </div>
          
          <Button 
            variant="text" 
            onClick={() => onRemove(item.id, item.selectedSize)}
            className="text-red-500 hover:text-red-700"
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;