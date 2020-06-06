import PropTypes from 'prop-types';
import React from 'react';
import './Order.scss';

const Order = ({ ingredients, price }) => {
  const ingr = Object.entries(ingredients).map(([ name, value ]) => (
    <span key={name}>
      {name === 'bacon' ? (
        'бекон'
      ) : name === 'cheese' ? (
        'сыр'
      ) : name === 'meat' ? (
        'мясо'
      ) : name === 'salad' ? (
        'салат'
      ) : null}{' '}
      ({value})
    </span>
  ));
  return (
    <div className="order">
      <p>Ингредиенты: {ingr}</p>
      <p>
        Цена: <strong>{Number.parseFloat(price)} &#8372;</strong>
      </p>
    </div>
  );
};

Order.propTypes = {
  ingredients: PropTypes.object.isRequired,
  price: PropTypes.number.isRequired,
};

export default Order;
