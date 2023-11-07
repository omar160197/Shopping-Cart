import React from 'react';
import Header from '../components/Header';
import Main from '../components/Main';
import Cart from '../components/Cart';
import data from '../data/data.json';
import { useState } from 'react';

const Dashboard = () => {
  const { products } = data;
  const [cartItems, setCartItems] = useState([]);
  const [discountValue, setdiscountValue] = useState(0);
  const [deliveryValue, setdeliveryValue] = useState(0);



  const addToCard = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, quantity: exist.quantity + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };//addToCard

  const applySpecialOfferDiscount = (product, quantity) => {
    if (product.code === 'R01' && quantity >= 2) {
      const price = product.price;
      const discount = (price * 0.5);
      setdiscountValue(discount);
      return discount;
    }else if(product.code === 'R01' && quantity >= 1){
      setdiscountValue(0);
    }
    return 0;
  };//applySpecialOfferDiscount

  const removeFromCart = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, quantity: exist.quantity - 1 } : x
        )
      );
      applySpecialOfferDiscount(product,exist.quantity)
    }
  };//removeFromCart

  const calculateDeliveryCostReduction = (total) => {
    let deliveryCost = 0;
    if (total < 50) {
      deliveryCost = 4.95;
    } else if (total < 90) {
      deliveryCost = 2.95;
    }
    setdeliveryValue(deliveryCost);
    return deliveryCost;
  };//calculateDeliveryCostReduction




  const calculateTotalPrice = () => {
    let total = 0;

    for (const item of cartItems) {
      const itemTotal = item.price * item.quantity;
      const specialOfferDiscount = applySpecialOfferDiscount(item, item.quantity);
      total += itemTotal - specialOfferDiscount;
    }
    const deliveryCost = calculateDeliveryCostReduction(total);
    total += deliveryCost;

    return total.toFixed(3);
  };//calculateTotalPrice


  return (
    <div className="App">
      <Header countCartItems={cartItems.length}></Header>
      <div className="row">
        <Main addToCard={addToCard} products={products}></Main>
        <Cart
          addToCard={addToCard}
          removeFromCart={removeFromCart}
          cartItems={cartItems}
          calculateTotalPrice={calculateTotalPrice}
          discountValue={discountValue}
          deliveryValue={deliveryValue}
        ></Cart>
      </div>
    </div>
  );
};

export default Dashboard;