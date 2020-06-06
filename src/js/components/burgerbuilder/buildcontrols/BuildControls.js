import PropTypes from 'prop-types';
import React from 'react';
import { Context } from '../../../provider/Provider';
import BuildControl from './buildcontrol/BuildControl';
import './BuildControls.scss';

const BuildControls = ({ totalPrice, purchasable, ordered, auth }) => {
  const buildControl = (
    <Context.Consumer>
      {(context) =>
        Object.entries(context.state.controls).map(([ key, value ]) => {
          return (
            <BuildControl
              key={key}
              ingredientAdded={() =>
                context.addIngredientHandler(
                  value.type,
                  context.state.ingredientsState
                )}
              ingredientRemoved={() =>
                context.removeIngredientHandler(
                  value.type,
                  context.state.ingredientsState
                )}
              type={value}
              disabled={context.disabledInfo[value.type] === 0 ? true : false}
              price={context.state.totalPrice}
            />
          );
        })}
    </Context.Consumer>
  );
  return (
    <div className="buildcontrols">
      <h4>
        Текущая цена: {totalPrice.toFixed(2)} <span>&#8372;</span>
      </h4>
      {buildControl}
      <button
        className="order__button"
        disabled={!purchasable}
        onClick={ordered}
      >
        {auth === null ? 'зарегистрироваться на заказ' : 'заказать сейчас'}
      </button>
    </div>
  );
};

BuildControls.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  purchasable: PropTypes.bool.isRequired,
  ordered: PropTypes.func.isRequired,
  auth: PropTypes.string,
};

export default BuildControls;
