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
            <Link to={`/products/${item.id}`} className="text-sm font-[montserrat] font-medium text-deep-blue hover:text-warm-terracotta">
              {item.name}
            </Link> 
            <p className="text-xs text-deep-blue font-[montserrat] mt-1">Size: {item.selectedSize}</p>
          </div>
          <p className="text-sm font-semibold font-[montserrat] text-deep-blue">
            IDR {(item.price * item.quantity).toLocaleString()}
          </p>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center border border-deep-blue rounded-md">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="px-3 py-1 text-deep-blue hover:bg-medium-beige hover:text-warm-terracotta rounded-md"
            >
              -
            </button>
            <span className="px-3 py-1 border-r border-l text-center">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="px-3 py-1 text-deep-blue hover:bg-medium-beige hover:text-warm-terracotta rounded-md"
            >
              +
            </button>
          </div>
          
          <Button 
            variant="text" 
            onClick={() => onRemove(item.id, item.selectedSize)}
            className="text-red-500 hover:text-red-600 font-[sora] font-bold"
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;