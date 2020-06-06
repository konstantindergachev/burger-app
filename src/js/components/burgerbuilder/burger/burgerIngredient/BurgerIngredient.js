import PropTypes from 'prop-types';
import React from 'react';
import './BurgerIngredient.scss';

const BurgerIngredient = ({ type }) => {
  let ingredient = null;
  switch (type) {
    case 'bread__bottom':
      ingredient = <div className="bread__bottom" />;
      break;
    case 'bread__top':
      ingredient = (
        <div className="bread__top">
          <div className="seeds1" />
          <div className="seeds2" />
        </div>
      );
      break;
    case 'meat':
      ingredient = <div className="meat" />;
      break;
    case 'cheese':
      ingredient = <div className="cheese" />;
      break;
    case 'salad':
      ingredient = <div className="salad" />;
      break;
    case 'bacon':
      ingredient = <div className="bacon" />;
      break;
    default:
      ingredient = null;
      break;
  }
  return ingredient;
};

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired,
};

export default BurgerIngredient;
