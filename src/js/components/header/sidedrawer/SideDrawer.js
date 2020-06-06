import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Logo from '../../logo/Logo';
import Backdrop from '../../ui/backdrop/Backdrop';
import NavigationItems from '../navigation/NavigationItems';
import './SideDrawer.scss';

const SideDrawer = ({ open, closed }) => {
  let attachedClasses = [ 'side__drawer', 'close' ];
  if (open) attachedClasses = [ 'side__drawer', 'open' ];
  return (
    <Fragment>
      <Backdrop show={open} clicked={closed} />
      <div className={attachedClasses.join(' ')} onClick={closed}>
        <div className="side__drawer-logo">
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Fragment>
  );
};

SideDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  closed: PropTypes.func.isRequired,
};

export default SideDrawer;
