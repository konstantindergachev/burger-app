import PropTypes from 'prop-types';
import React, { Component } from 'react';
import URL from '../../../../settings';
import data from '../../../data/data';
import Spinner from '../ui/spinner/Spinner';
import Order from './order/Order';
import './Orders.scss';

class Orders extends Component {
  state = {
    orders: data.orders,
    loading: !data.loading,
    ordersError: data.ordersError,
  };

  componentDidMount() {
    const { token, userId } = this.props;
    const queryParams = `${token}&orderBy="userId"&equalTo="${userId}"`;
    fetch(`${URL.dbURL}/orders.json?auth=${queryParams}`)
      .then((response) => {
        if (response.ok) return response.json();
        else if (!response.ok) return response.json();
      })
      .then((objData) => {
        if (objData.error) return Promise.reject(objData.error);
        const arrayData = Object.entries(objData);

        this.setState({ loading: false, orders: arrayData });
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.log(`Orders err: `, err);
        this.ordersError(err);
      });
  }
  ordersError = (existError) => {
    this.setState({ ordersError: existError });
  };

  render() {
    let orders = <Spinner />;
    if (!this.state.loading) {
      orders = this.state.orders.map((order) => (
        <Order
          key={order[0].substring(0)}
          ingredients={order[1].ingredients}
          price={order[1].price}
        />
      ));
    }
    if (this.state.ordersError) {
      orders = (
        <p className="orders__error">
          Страница перезагружена. Статистика отобразится вновь после посещения
          главной страницы. Благодарим за понимание.
        </p>
      );
    }

    return <div className="orders">{orders}</div>;
  }
}

Orders.propTypes = {
  token: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default Orders;
