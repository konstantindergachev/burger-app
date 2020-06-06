import PropTypes from 'prop-types';
import React from 'react';
import Burger from '../../burgerbuilder/burger/Burger';
import Button from '../../ui/button/Button';

const Summary = ({ pathname, checkoutCancelled, checkoutContinued }) => {
  return (
    <div className="checkout__summary">
      <Burger hideBurger={pathname} />
      <Button
        btnType={`danger ${pathname === '/checkout/contact-data' && 'cancel'}`}
        title="отмена"
        clickCancel={checkoutCancelled}
      />
      <Button
        btnType={`success ${pathname === '/checkout/contact-data' && 'hide'}`}
        title="продолжить"
        clickSuccess={checkoutContinued}
      />
    </div>
  );
};

Summary.propTypes = {
  pathname: PropTypes.string.isRequired,
  checkoutCancelled: PropTypes.func.isRequired,
  checkoutContinued: PropTypes.func.isRequired,
};

export default Summary;
