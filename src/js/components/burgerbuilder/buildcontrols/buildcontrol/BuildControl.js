import React from 'react';
import PropTypes from 'prop-types';
import './BuildControl.scss';

const BuildControl = ({
  type,
  ingredientRemoved,
  disabled,
  ingredientAdded,
}) => {
  return (
    <div className="buildcontrol">
      <div className="label">{type.label}</div>
      <button className="less" onClick={ingredientRemoved} disabled={disabled}>
        Меньше
      </button>
      <button className="more" onClick={ingredientAdded}>
        Больше
      </button>
    </div>
  );
};

BuildControl.propTypes = {
  type: PropTypes.object.isRequired,
  ingredientRemoved: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  ingredientAdded: PropTypes.func.isRequired,
};

export default BuildControl;
