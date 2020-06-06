import PropTypes from 'prop-types';
import React from 'react';
import './Button.scss';

const Button = ({
  btnType,
  disabled,
  clickSwitchAuthMode,
  clickCancel,
  clickSuccess,
  title,
}) => {
  return (
    <button
      className={`button ${btnType}`}
      disabled={disabled}
      onClick={
        clickSwitchAuthMode ? (
          clickSwitchAuthMode
        ) : clickCancel ? (
          clickCancel
        ) : (
          clickSuccess
        )
      }
    >
      {title}
    </button>
  );
};

Button.propTypes = {
  btnType: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  clickSwitchAuthMode: PropTypes.func,
  clickCancel: PropTypes.func,
  clickSuccess: PropTypes.func,
  title: PropTypes.string.isRequired,
};

export default Button;
