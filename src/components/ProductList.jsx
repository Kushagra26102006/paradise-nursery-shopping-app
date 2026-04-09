import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../CartSlice';
import { plantsData } from '../plantsData';

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const isItemInCart = (plantId) => {
    return cartItems.some(item => item.id === plantId);
  };

  return (
    <div className="product-list-container">
      {plantsData.map((categoryGroup, index) => (
        <div key={index} className="category-section">
          <h2 className="category-title">{categoryGroup.category} Plants</h2>
          <hr className="category-divider" />
          <div className="plants-grid">
            {categoryGroup.plants.map((plant) => (
              <div key={plant.id} className="plant-card">
                <div className="image-container">
                  <img src={plant.image} alt={plant.name} className="plant-image" />
                </div>
                <div className="plant-info">
                  <h3 className="plant-name">{plant.name}</h3>
                  <p className="plant-description">{plant.description}</p>
                  <p className="plant-price">${plant.price.toFixed(2)}</p>
                  <button 
                    className={`add-to-cart-btn ${isItemInCart(plant.id) ? 'added' : ''}`}
                    onClick={() => handleAddToCart(plant)}
                    disabled={isItemInCart(plant.id)}
                  >
                    {isItemInCart(plant.id) ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
