import React from 'react';
import logo from '../../../img/burger-logo.png';
import './Logo.scss';

const Logo = () => (
  <div className="logo">
    <img className="logo__img" src={logo} alt="Мой бутерброд" />
  </div>
);
export default Logo;
