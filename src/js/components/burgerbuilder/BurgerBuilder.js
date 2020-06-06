import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Context } from '../../provider/Provider';
import Backdrop from '../ui/backdrop/Backdrop';
import Modal from '../ui/modal/Modal';
import Spinner from '../ui/spinner/Spinner';
import BuildControls from './buildcontrols/BuildControls';
import Burger from './burger/Burger';
import './BurgerBuilder.scss';

class BurgerBuilder extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const { show, children } = this.props;

    return nextProps.show !== show || nextProps.children !== children;
  }
  modalContinue = (state) => {
    this.props.history.push('/checkout');
  };
  render() {
    return (
      <React.Fragment>
        <Context.Consumer>
          {(context) =>
            context.state.error ? (
              <p className="error__message">
                Ингредиенты не могут быть загружены!
              </p>
            ) : context.state.loading ? (
              <Spinner />
            ) : (
              <main className="main__container">
                <Burger totalPrice={context.state.totalPrice} />
                <BuildControls
                  totalPrice={context.state.totalPrice}
                  purchasable={context.state.purchasable}
                  ordered={() =>
                    context.purchaseHandler(
                      this.props.history,
                      context.state.ingredientsState
                    )}
                  auth={context.state.token}
                />
                <Modal
                  show={context.state.purchasing}
                  spinner={context.state.loading}
                  modalContinue={() => this.modalContinue(context.state)}
                />
                <Backdrop
                  show={context.state.purchasing}
                  clicked={context.modalClosed}
                />
              </main>
            )}
        </Context.Consumer>
      </React.Fragment>
    );
  }
}
BurgerBuilder.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.object,
  history: PropTypes.object.isRequired,
};
export default BurgerBuilder;
