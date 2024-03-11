import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductList from './ProductList';
import Cart from './cart';
import Header from './Header';
import './App.css';

const rainbowOrder = {
  Red: 1,
  Orange: 2,
  Yellow: 3,
  Green: 4,
  Blue: 5,
  Black: 8,
  Gray: 9,
};

const ProductsPage = () => {
  const [inventory, setInventory] = useState([]);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortType, setSortType] = useState('');
  const [isCartVisible, setIsCartVisible] = useState(false);

  const toggleCart = () => setIsCartVisible(!isCartVisible);

  useEffect(() => {
    fetch('inventory.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setInventory(data))
      .catch(error => console.error("Failed to load inventory", error));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  const [selectedSizes, setSelectedSizes] = useState({});

  const addToCart = (productWithSize) => {
    setCart((prev) => {
      // Check for the product with same ID and size
      const exist = prev.find((item) => item.id === productWithSize.id && item.size === productWithSize.size);
      if (exist) {
        // Increment quantity
        return prev.map((item) =>
          item.id === productWithSize.id && item.size === productWithSize.size ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Add new item with size
        return [...prev, { ...productWithSize, quantity: 1 }];
      }
    });
  };
  
  const removeFromCart = (productId, size) => {
    setCart((prevCart) => {
      // Check if the product exists and reduce its quantity or remove it
      return prevCart.reduce((acc, item) => {
        if (item.id === productId && (!size || item.size === size)) {
          if (item.quantity > 1) {
            acc.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, []);
    });
  };

  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortType(event.target.value);
  };

  const sortInventory = (inv, type) => {
    switch (type) {
      case 'priceLowHigh':
        return [...inv].sort((a, b) => a.price - b.price);
      case 'priceHighLow':
        return [...inv].sort((a, b) => b.price - a.price);
      case 'colorRainbow':
        return [...inv].sort((a, b) => rainbowOrder[a.color] - rainbowOrder[b.color]);
      default:
        return inv;
    }
  };

  const emptyCart = () => {
    setCart([]);
  };

  const handleSizeChange = (productId, size) => {
    // Handle size change logic here
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

const handleAddToCart = (product) => {
  // Check if the product category requires a size selection
  const requiresSize = ['sweaters', 'shirts'].includes(product.category);

  // If it doesn't require a size or if a size has been selected, proceed to add to cart
  if (!requiresSize || selectedSizes[product.id]) {
    addToCart({
      ...product,
      // Add the size to the product only if it's required and selected
      ...(requiresSize && { size: selectedSizes[product.id] })
    });
  } else if (requiresSize && !selectedSizes[product.id]) {
    // If a size is required but not selected, alert the user
    alert('Please select a size');
  }
};

  
  const filteredInventory = categoryFilter === 'all'
    ? inventory
    : inventory.filter((item) => item.category === categoryFilter);

  const sortedInventory = sortInventory(filteredInventory, sortType);

  return (
    <>
      <Header />
      <div className="products-header">
        <div className="header-controls">
          <div className="filter-sort-section">
            <span>Filter:</span>
            <select onChange={handleCategoryChange} value={categoryFilter} className="select-filter">
            <option value="all">All</option>
            <option value="sweaters">Sweaters</option>
            <option value="hats">Hats</option>
            <option value="socks">Socks</option>
            <option value="shirts">Shirts</option>
            </select>
            <span>Sort:</span>
            <select onChange={handleSortChange} value={sortType} className="select-sort">
            <option value="">Default</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
            <option value="colorRainbow">Color: Rainbow Order</option>
            </select>
          </div>
          <button onClick={toggleCart} className="button cart-button">
            Cart ({cart.length})
          </button>
        </div>
      </div>
      {isCartVisible && (
        <>
          <div className="overlay" onClick={toggleCart}></div>
          <div className={`cart-popup ${isCartVisible ? 'visible' : ''}`}>
            <Cart cart={cart} className="button empty-cart-btn" removeFromCart={removeFromCart} emptyCart={emptyCart} />
            <button onClick={toggleCart} className="close-cart-btn">Close</button>
          </div>
        </>
      )}
<ProductList 
  addToCart={handleAddToCart} // Now passing the correct function
  inventory={sortedInventory}
  selectedSizes={selectedSizes}
  handleSizeChange={handleSizeChange}
/>
    </>
  );
};

export default ProductsPage;