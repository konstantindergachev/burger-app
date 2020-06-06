import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Context } from '../../provider/Provider';
import './Checkout.scss';
import ContactData from './contactdata/ContactData';
import Summary from './summary/Summary';

class Checkout extends Component {
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const newIngredients = {};
    let price = 0;
    for (const param of query.entries()) {
      if (param[0] === 'price') {
        price = param[1];
      } else {
        newIngredients[param[0]] = Number(param[1]);
      }
    }
    this.setState({ ingredients: newIngredients, totalPrice: price });
  }
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };
  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    let summary = <Redirect to="/" />;
    summary = (
      <Context.Consumer>
        {(context) =>
          context.state.ingredients ? (
            <div
              className={`checkout__container ${this.props.location.pathname ===
              '/checkout'
                ? 'centered'
                : this.props.location.pathname === '/checkout/contact-data'
                  ? 'centered'
                  : null}`}
            >
              <h1
                className={
                  this.props.location.pathname === '/checkout/contact-data' ? (
                    'hide'
                  ) : null
                }
              >
                Мы надеемся Вам понравится!
              </h1>
              <Route
                path={`${this.props.match.path}/contact-data`}
                render={(props) => (
                  <ContactData
                    ingredients={context.state.ingredients}
                    price={context.state.totalPrice}
                    {...props}
                  />
                )}
              />
              <Summary
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler}
                pathname={this.props.location.pathname}
              />
            </div>
          ) : null}
      </Context.Consumer>
    );
    return summary;
  }
}

Checkout.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default React.forwardRef((props, ref) => (
  <Context.Consumer>
    {(context) => <Checkout {...props} context={context} />}
  </Context.Consumer>
));
