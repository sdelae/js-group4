// ProductList.js
import React from 'react';

function ProductList({ addToCart, inventory, selectedSizes, handleSizeChange, handleAddToCart }) {
  return (
    <div className="products-container">
      {inventory.map((product) => (
        <div key={product.id} className="product">
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>${product.price.toFixed(2)}</p>
          <div className="product-actions">
            {product.category === 'sweaters' || product.category === 'shirts' ? (
              <>
                <select 
                  value={selectedSizes[product.id] || ''} 
                  onChange={(e) => handleSizeChange(product.id, e.target.value)}
                  className="dropdown size"
                >
                  <option value="">Select size</option>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </select>
                <button 
                  onClick={() => selectedSizes[product.id] 
                    ? addToCart({ ...product, size: selectedSizes[product.id] }) 
                    : alert('Please select a size')}
                >
                  Add to Cart
                </button>
              </>
            ) : (
              <button onClick={() => addToCart(product)}> 
                Add to Cart
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
