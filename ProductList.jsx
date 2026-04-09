import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";
import { Link } from "react-router-dom";

const plants = [
  { id: 1, name: "Aloe Vera", price: 10, category: "Indoor" },
  { id: 2, name: "Snake Plant", price: 15, category: "Indoor" },
  { id: 3, name: "Peace Lily", price: 20, category: "Indoor" },
  { id: 4, name: "Fern", price: 12, category: "Indoor" },
  { id: 5, name: "Palm", price: 18, category: "Indoor" },
  { id: 6, name: "Spider Plant", price: 14, category: "Indoor" },

  { id: 7, name: "Rose", price: 10, category: "Outdoor" },
  { id: 8, name: "Tulip", price: 12, category: "Outdoor" },
  { id: 9, name: "Sunflower", price: 8, category: "Outdoor" },
  { id: 10, name: "Daisy", price: 9, category: "Outdoor" },
  { id: 11, name: "Hibiscus", price: 11, category: "Outdoor" },
  { id: 12, name: "Marigold", price: 7, category: "Outdoor" },

  { id: 13, name: "Cactus", price: 5, category: "Succulent" },
  { id: 14, name: "Jade Plant", price: 6, category: "Succulent" },
  { id: 15, name: "Echeveria", price: 7, category: "Succulent" },
  { id: 16, name: "Agave", price: 9, category: "Succulent" },
  { id: 17, name: "Haworthia", price: 8, category: "Succulent" },
  { id: 18, name: "Sedum", price: 6, category: "Succulent" }
];

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const isAdded = (id) => cartItems.some(item => item.id === id);

  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/cart">Cart ({cartItems.length})</Link>
      </nav>

      {["Indoor", "Outdoor", "Succulent"].map(category => (
        <div key={category}>
          <h2>{category} Plants</h2>
          {plants.filter(p => p.category === category).map(p => (
            <div key={p.id}>
              <h4>{p.name}</h4>
              <p>${p.price}</p>
              <button 
                onClick={() => dispatch(addItem(p))}
                disabled={isAdded(p.id)}
              >
                {isAdded(p.id) ? "Added" : "Add to Cart"}
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProductList;