import React from "react";

const Cart = (props) => {
  const {
    cartItems,
    addToCard,
    removeFromCart,
    calculateTotalPrice,
    deliveryValue,
    discountValue,
  } = props;
  const itemsPrice = cartItems
    .reduce((a, c) => a + c.price * c.quantity, 0)
    .toFixed(2);

  return (
    <aside className="block col-1">
      <h2>Cart Items</h2>
      <div>
        {cartItems.length === 0 && <div>Cart Is Emty</div>}
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="items-container">
              <div className="item-wrapper">{item.name}</div>
              <div className="item-wrapper">
                <button onClick={() => addToCard(item)} className="add">
                  +
                </button>
                <button onClick={() => removeFromCart(item)} className="remove">
                  -
                </button>
              </div>

              <div className="item-wrapper">
                {item.quantity} x ${item.price}
              </div>
            </div>
          ))}</div>
        {cartItems.length !== 0 && (
          <>
            <hr></hr>
            <div className="row">
              <div className="col-2">Items Price</div>
              <div className="col-1 text-right">${itemsPrice}</div>
            </div>
            <div className="row">
              <div className="col-2">delivery Cost</div>
              <div className="col-1 text-right">${deliveryValue}</div>
            </div>
            <div className="row">
              <div className="col-2">Discount</div>
              <div className="col-1 text-right">${discountValue}</div>
            </div>
            <div className="row">
              <div className="col-2">
                <strong>Total Price</strong>
              </div>
              <div className="col-1 text-right">
                <strong>${calculateTotalPrice()}</strong>
              </div>
            </div>
            <hr />
            <div className="row Checkout">
              <button>Checkout</button>
            </div>
          </>
        )}
      </div>
    </aside>
  );
};

export default Cart;
