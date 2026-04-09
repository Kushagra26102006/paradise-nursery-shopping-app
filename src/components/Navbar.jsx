import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingCart, Leaf } from 'lucide-react';
import './Navbar.css'; // create specific css or use main

const Navbar = () => {
  const cartItems = useSelector(state => state.cart.items);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="brand-link">
          <div className="brand-logo">
            <Leaf className="leaf-icon" />
            <div>
              <h3>Paradise Nursery</h3>
              <p>Where Green Meets Serenity</p>
            </div>
          </div>
        </Link>
      </div>
      
      <div className="navbar-links">
        <Link to="/plants" className="nav-link">Plants</Link>
        <Link to="/cart" className="nav-link cart-link">
          <ShoppingCart size={28} />
          {totalQuantity > 0 && <span className="cart-badge">{totalQuantity}</span>}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
