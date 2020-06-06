import PropTypes from 'prop-types';
import React from 'react';
import { Context } from '../../../provider/Provider';
import Button from '../button/Button';
import './Modal.scss';
import SummaryList from './summarylist/SummaryList';

const MODALSHOW = 'modal__show';
const MODALHIDE = 'modal__hide';

const Modal = ({ show, modalContinue }) => {
  return (
    <div className={`modal ${show ? MODALSHOW : MODALHIDE}`}>
      <h3 className="modal__title">Ваш заказ</h3>
      <p className="modal__descr">
        Вкусный бутерброд со следующими ингредиентами:
      </p>

      <ul className="modal__list">
        <Context.Consumer>
          {(context) =>
            Object.entries(context.state.ingredients).map(([ key, value ]) => (
              <SummaryList
                key={key}
                name={
                  key === 'bacon' ? (
                    'бекон'
                  ) : key === 'cheese' ? (
                    'сыр'
                  ) : key === 'meat' ? (
                    'мясо'
                  ) : key === 'salad' ? (
                    'салат'
                  ) : null
                }
                value={value}
              />
            ))}
        </Context.Consumer>
      </ul>
      <Context.Consumer>
        {(context) => (
          <p>
            <strong>
              Итоговая стоимость: &#8372; {context.state.totalPrice.toFixed(2)}
            </strong>
          </p>
        )}
      </Context.Consumer>
      <p>Продолжить оформление заказа?</p>
      <Context.Consumer>
        {(context) => (
          <Button
            btnType="danger"
            title="отмена"
            clickCancel={context.modalClosed}
          />
        )}
      </Context.Consumer>
      <Button
        btnType="success"
        title="продолжить"
        clickSuccess={modalContinue}
      />
    </div>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  modalContinue: PropTypes.func.isRequired,
};

export default Modal;
