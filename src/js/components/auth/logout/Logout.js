import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';

const Logout = ({ clickedLogOut }) => {
  clickedLogOut();
  return <Redirect to="/" />;
};

Logout.propTypes = {
  clickedLogOut: PropTypes.func.isRequired,
};

export default Logout;
