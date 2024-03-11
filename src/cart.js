import React from 'react';

function Cart({ cart, removeFromCart, emptyCart }) {
  // Calculate the total price
  const totalPrice = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0).toFixed(2); // Ensure two decimal places

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={`${item.id}_${item.size || 'default'}`} className="cart-item">
              <span className="item-name">{item.name}</span>
              {item.size ? (
                <span className="item-size">{item.size}</span>
              ) : (
                <span className="item-size-empty">Size:</span> // This ensures the grid layout maintains its structure
              )}
              <span className="item-quantity">Quantity: {item.quantity}</span>
              <span className="item-price">Price: ${(item.price * item.quantity).toFixed(2)}</span>
              <button onClick={() => removeFromCart(item.id, item.size)} className="button remove-btn">
                Remove
              </button>
            </div>
          ))}
          <div className="cart-summary">
            <span className="total-price">Total: ${totalPrice}</span>
            <div className="cart-actions">
              <button onClick={emptyCart} className="button empty-cart-btn">
                Empty Cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
