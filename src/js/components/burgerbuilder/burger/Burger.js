import PropTypes from 'prop-types';
import React from 'react';
import { Context } from '../../../provider/Provider';
import './Burger.scss';
import BurgerIngredient from './burgerIngredient/BurgerIngredient';

const Burger = ({ hideBurger }) => {
  const selectIngredient = (
    <Context.Consumer>
      {(context) =>
        Object.keys(context.state.ingredients)
          .map((ingredType, ingredValue) =>
            [ ...Array(context.state.ingredients[ingredType]) ].map((_, i) => (
              <BurgerIngredient
                key={ingredType + i}
                type={ingredType}
                count={ingredValue}
              />
            ))
          )
          .reduce((arr, elem) => arr.concat(elem), []).length === 0 ? (
          <p>Пожалуйста начните добавлять ингредиенты!</p>
        ) : (
          Object.keys(
            context.state.ingredients
          ).map((ingredType, ingredValue) =>
            [ ...Array(context.state.ingredients[ingredType]) ].map((_, i) => (
              <BurgerIngredient
                key={ingredType + i}
                type={ingredType}
                count={ingredValue}
              />
            ))
          )
        )}
    </Context.Consumer>
  );
  return (
    <div
      className={`burger ${hideBurger === '/checkout/contact-data' && 'hide'}`}
    >
      <BurgerIngredient type="bread__top" />
      {selectIngredient}
      <BurgerIngredient type="bread__bottom" />
    </div>
  );
};

Burger.propTypes = {
  hideBurger: PropTypes.string,
};

export default Burger;
