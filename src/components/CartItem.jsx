import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeItem, incrementQuantity, decrementQuantity } from '../CartSlice';

const CartItem = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="cart-container">
      <h2 className="cart-header">Total Cart Amount: ${calculateTotalAmount().toFixed(2)}</h2>
      <h3 className="cart-subheader">Total Items: {calculateTotalItems()}</h3>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <Link to="/plants">
            <button className="continue-shopping-btn">Continue Shopping</button>
          </Link>
        </div>
      ) : (
        <div className="cart-items-wrapper">
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-thumbnail" />
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                  
                  <div className="cart-controls">
                    <button className="qty-btn" onClick={() => handleDecrement(item.id)}>-</button>
                    <span className="qty-display">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => handleIncrement(item.id)}>+</button>
                  </div>
                  
                  <p className="cart-item-subtotal">Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                  <button className="remove-btn" onClick={() => handleRemove(item.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-actions">
             <Link to="/plants">
               <button className="continue-shopping-btn">Continue Shopping</button>
             </Link>
             <button className="checkout-btn" onClick={() => alert('Checkout Functionality not yet implemented')}>Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;
