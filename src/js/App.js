import PropTypes from 'prop-types';
import React, { Component, lazy, Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import './App.scss';
import Logout from './components/auth/logout/Logout';
import BurgerBuilder from './components/burgerbuilder/BurgerBuilder';
import Footer from './components/footer/Footer';
import SideDrawer from './components/header/sidedrawer/SideDrawer';
import Toolbar from './components/header/toolbar/Toolbar';
import Spinner from './components/ui/spinner/Spinner';
import { Context } from './provider/Provider';

const Auth = lazy(() => import('./components/auth/Auth'));
const Checkout = lazy(() => import('./components/checkout/Checkout'));
const Orders = lazy(() => import('./components/orders/Orders'));
const ErrorHandler = lazy(() =>
  import('./components/errorhandler/ErrorHandler')
);
class App extends Component {
  state = { showSideDrawer: false };
  componentDidMount() {
    this.props.context.authCheckState();
  }
  componentDidUpdate = (prevProps) => {
    const { context } = this.props;
    if (prevProps.context.state.token !== null) {
      return context.state.token;
    }
  };
  sideDrawerToggleHandler = () => {
    const prevState = this.state.showSideDrawer;
    this.setState({ showSideDrawer: !prevState });
  };
  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };
  render() {
    const { showSideDrawer } = this.state;
    return (
      <React.Fragment>
        <Toolbar
          drawerToggleClicked={this.sideDrawerToggleHandler}
          getToken={this.componentDidUpdate(this.props)}
        />
        <main className="app__wrapper">
          <SideDrawer
            open={showSideDrawer}
            closed={this.sideDrawerCloseHandler}
          />
          <Suspense fallback={<Spinner />}>
            <Switch>
              <Route
                path="/"
                exact
                render={(props) => <BurgerBuilder {...props} />}
              />
              <Route path="/auth" render={(props) => <Auth {...props} />} />
              <Route
                path="/checkout"
                render={(props) => <Checkout {...props} />}
              />
              <Route path="/orders">
                <Context.Consumer>
                  {(context) => (
                    <Orders
                      token={context.state.token}
                      userId={context.state.userId}
                    />
                  )}
                </Context.Consumer>
              </Route>
              <Route path="/logout">
                <Context.Consumer>
                  {(context) => <Logout clickedLogOut={context.authLogOut} />}
                </Context.Consumer>
              </Route>
              <Route render={(props) => <ErrorHandler {...props} />} />
            </Switch>
          </Suspense>
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

App.propTypes = {
  context: PropTypes.object.isRequired,
};

export default withRouter(
  React.forwardRef((props, ref) => (
    <Context.Consumer>
      {(context) => <App {...props} context={context} />}
    </Context.Consumer>
  ))
);
