import React from 'react';

function Cart({ cart, removeFromCart, emptyCart, toggleCart }) {
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
          <div className="cart-items">
            {cart.map((item) => (
              <div key={`${item.id}_${item.size || 'default'}`} className="cart-item">
                <span>{item.name}</span>
                {item.size && <span>Size: {item.size}</span>}
                <span>Quantity: {item.quantity}</span>
                <span>Price: ${(item.price * item.quantity).toFixed(2)}</span>
                <button onClick={() => removeFromCart(item.id, item.size)}>Remove</button>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <span>Total: ${totalPrice}</span>
          </div>
          <div className="cart-actions">
            <button onClick={emptyCart} className="empty-cart-btn">Empty Cart</button>
            <button onClick={toggleCart} className="close-cart-btn">Close</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;