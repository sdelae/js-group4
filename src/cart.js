import React from 'react';

function Cart({ cart, removeFromCart, emptyCart }) {
  // This will calculate the total price and handle possible errors
  const totalPrice = cart.reduce((total, item) => {
    if (typeof item.price === 'number' && typeof item.quantity === 'number') {
      return total + item.price * item.quantity;
    } else {
      console.error('Invalid item in cart:', item);
      return total;
    }
  }, 0);

  // Format the total price with two decimal places
  const formattedTotalPrice = isNaN(totalPrice) ? '0.00' : totalPrice.toFixed(2);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={`${item.id}_${item.size || 'default'}`} className="cart-item">
              <span>{item.name}</span>
              {item.size && <span>Size: {item.size}</span>}
              <span>Quantity: {item.quantity}</span>
              <span>Price: ${(item.price * item.quantity).toFixed(2)}</span>
              <button onClick={() => removeFromCart(item.id, item.size)}>Remove</button>
            </div>
          ))}
          <div className="cart-total">
            {/* ... */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
