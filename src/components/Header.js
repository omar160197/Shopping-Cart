import React from 'react';

const Header = (props) => {
  const { countCartItems } = props;
  return (
    <header className="row header center">
      <div>
        <a href="#/">Plates Shopping Cart</a>
      </div>
      <div>
        <a href="#/cart">
          Cart{' '}
          {countCartItems ? (
            <button className="badge">{countCartItems}</button>
          ) : (
            ''
          )}
        </a>
      </div>
    </header>
  );
};

export default Header;
