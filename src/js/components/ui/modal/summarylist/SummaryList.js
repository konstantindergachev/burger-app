import React from 'react';
import PropTypes from 'prop-types';

const SummaryList = ({ name, value }) => (
  <li className="modal__item">
    <span>
      {name}: {value}
    </span>
  </li>
);

SummaryList.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default SummaryList;
