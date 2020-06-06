import PropTypes from 'prop-types';
import React from 'react';
import { Context } from '../../../provider/Provider';
import Button from '../../ui/button/Button';
import Input from '../../ui/input/Input';
import Spinner from '../../ui/spinner/Spinner';
import './ContactData.scss';

const ContactData = ({ ingredients, price, history }) => {
  const formElements = (
    <Context.Consumer>
      {(context) => {
        const value = Object.entries(
          context.state.orderForm
        ).map(([ key, value ]) => (
          <Input
            key={key}
            elementType={value.elementType}
            elementConfig={value.elementConfig}
            value={value.value}
            invalid={!value.valid}
            shouldValidate={value.validation}
            touched={value.touched}
            changed={(ev) => context.inputContactDataChangedHandler(ev, key)}
          />
        ));
        return value;
      }}
    </Context.Consumer>
  );
  const submitButton = (
    <Context.Consumer>
      {(context) => (
        <Button
          btnType="success"
          title="заказ"
          disabled={!context.state.formIsValid}
        />
      )}
    </Context.Consumer>
  );
  const form = (
    <Context.Consumer>
      {(context) =>
        context.state.loading ? (
          <Spinner />
        ) : (
          <form
            className="contact__data-form"
            onSubmit={(ev) =>
              context.orderHandler(ev, ingredients, price, history)}
          >
            {formElements}
            {submitButton}
          </form>
        )}
    </Context.Consumer>
  );

  return (
    <div className="contact__data">
      <h4 className="contact__data-title">Введите свои контактные данные</h4>
      {form}
    </div>
  );
};

ContactData.propTypes = {
  ingredients: PropTypes.object.isRequired,
  price: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired,
};

export default ContactData;
