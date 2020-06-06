import React, { Component } from 'react';
import URL from '../../../settings';
import data from '../../data/data';

//1. Create new context
const Context = React.createContext();

//2. Create new provider
class Provider extends Component {
  state = {
    header: data.header,
    controls: data.controls,
    ingredients:
      data.ingredients === null
        ? fetch(`${URL.dbURL}/ingredients.json`)
            .then((response) => {
              if (response.ok) return response.json();
              else return Promise.reject('Ошибка!');
            })
            .then((data) => {
              this.setState({
                ingredients: {
                  salad: data.salad,
                  bacon: data.bacon,
                  cheese: data.cheese,
                  meat: data.meat,
                },
                loading: false,
              });
            })
            .catch((err) => {
              this.setState({ error: true });
              console.error(`Ошибка получения ингредиентов: `, err);
            })
        : data.ingredients,
    ingredientsState: data.ingredientsState,
    ingredientPrices: data.ingredientPrices,
    orders: data.orders,
    ordersError: data.ordersError,
    orderForm: data.orderForm,
    basePrice: data.basePrice,
    totalPrice: data.totalPrice,
    purchasable: data.purchasable,
    purchasing: data.purchasing,
    purchased: data.purchased,
    loading: data.loading,
    error: data.error,
    formIsValid: data.formIsValid,
    auth: data.auth,
    authError: data.authError,
    isSignUp: data.isSignUp,
    token: data.token,
    userId: data.userId,
    footerSection: data.footerSection,
  };

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey]; //return ingredients
      })
      .reduce((currSum, elem) => {
        return currSum + elem;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  };
  checkValidity = (value, rules) => {
    let isValid = true;
    //if(!rules) return true; //fix error drobdown list (version 2)

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  };
  authSuccess = (token, userId) => {
    return { token, userId };
  };
  authError = (existError) => {
    this.setState({ authError: existError });
  };
  reloadAuthState = (ingredients, totalPrice, token, userId) => {
    this.setState({
      ingredients: ingredients,
      totalPrice: totalPrice,
      token: token,
      userId: userId,
    });
  };
  logOut = (ingredients, ingredientsState, basePrice) => {
    for (const key in ingredients) {
      if (ingredients[key] !== 0) ingredients[key] = 0;
    }
    this.setState({
      ingredients: ingredients,
      ingredientsState: false,
      totalPrice: basePrice,
      token: null,
      userId: null,
    });

    this.updatePurchaseState(ingredients);
  };
  autoLogOut = (expirationTime) => {
    const milliseconds = 1000;
    setTimeout(() => {
      console.time(`Time`);
      this.setState({
        token: null,
        userId: null,
      });
      console.timeEnd(`Time`);
    }, expirationTime * milliseconds);
  };
  render() {
    const updatedState = JSON.parse(JSON.stringify(this.state));
    return (
      <Context.Provider
        value={{
          state: updatedState,
          disabledInfo: { ...updatedState.ingredients },
          addIngredientHandler: (type, ingredientsState) => {
            const oldCount = updatedState.ingredients[type];
            const updatedCount = oldCount + 1;
            const updatedIngredients = { ...updatedState.ingredients };

            if (ingredientsState === false) ingredientsState = true;

            updatedIngredients[type] = updatedCount;
            const priceAddition = updatedState.ingredientPrices[type];
            const oldPrice = updatedState.totalPrice;
            const newPrice = oldPrice + priceAddition;

            this.setState({
              totalPrice: newPrice,
              ingredients: updatedIngredients,
              ingredientsState: ingredientsState,
            });
            this.updatePurchaseState(updatedIngredients);
          },
          removeIngredientHandler: (type, ingredientsState) => {
            const oldCount = updatedState.ingredients[type];
            if (oldCount <= 0) return;

            const updatedCount = oldCount - 1;
            const updatedIngredients = {
              ...updatedState.ingredients,
            };

            updatedIngredients[type] = updatedCount;
            const priceDeduction = updatedState.ingredientPrices[type];
            const oldPrice = updatedState.totalPrice;
            const newPrice = oldPrice - priceDeduction;

            if (newPrice === updatedState.basePrice)
              ingredientsState = !ingredientsState;

            this.setState({
              totalPrice: newPrice,
              ingredients: updatedIngredients,
              ingredientsState,
            });
            this.updatePurchaseState(updatedIngredients);
          },
          purchaseHandler: (history, ingredientsState) => {
            if (updatedState.token !== null) {
              this.setState({ purchasing: true });
            } else {
              history.push('/auth');
            }
          },
          modalClosed: () => {
            this.setState({ purchasing: false });
          },
          inputContactDataChangedHandler: (ev, inputIdentifier) => {
            const updatedOrderForm = updatedState.orderForm;
            const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };

            updatedFormElement.value = ev.target.value;
            updatedFormElement.valid = this.checkValidity(
              updatedFormElement.value,
              updatedFormElement.validation
            );
            updatedFormElement.touched = true;
            updatedOrderForm[inputIdentifier] = updatedFormElement;

            let updatedformIsValid = true;
            for (const inputIdentifier in updatedOrderForm) {
              updatedformIsValid =
                updatedOrderForm[inputIdentifier].valid && updatedformIsValid;
            }

            this.setState({
              orderForm: updatedOrderForm,
              formIsValid: updatedformIsValid,
            });
          },
          orderHandler: (ev, ingredients, price, history) => {
            ev.preventDefault();

            this.setState({ loading: true });
            let formData = {};
            for (const formElementIdentifier in updatedState.orderForm) {
              formData[formElementIdentifier] =
                updatedState.orderForm[formElementIdentifier].value;
            }
            const content = {
              ingredients: ingredients,
              price: Number.parseFloat(price.toFixed(2)),
              orderData: formData,
              userId: updatedState.userId,
            };
            localStorage.setItem(
              'content',
              `${content.ingredients}; ${content.price}`
            );
            fetch(`${URL.dbURL}/orders.json?auth=${updatedState.token}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(content),
            })
              .then((response) => {
                if (response.ok) return response.json();
                else return Promise.reject('somthing went wrong!');
              })
              .then((data) => {
                const disabletIngBtn = Object.entries(
                  updatedState.ingredients
                ).map(([ key, value ]) => (value === 0 ? 1 : 0));
                this.setState({
                  loading: false,
                  purchasing: false,
                });
                history.push('/');
              })
              .catch((err) => {
                this.setState({ loading: false });
                console.error(`Error: `, err);
              });
          },
          authSubmitHandler: (
            ev,
            email,
            password,
            isSignup,
            ingredientsState,
            history
          ) => {
            ev.preventDefault();
            this.setState({ loading: true });
            const authData = {
              email,
              password,
              returnSecureToken: true,
            };

            fetch(!isSignup ? URL.auth_URL : URL.verifyPassword, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(authData),
            })
              .then((response) => {
                if (response.ok) return response.json();
                else if (!response.ok) return response.json();
              })
              .then((data) => {
                if (data.error) return Promise.reject(data.error);

                localStorage.setItem('token', data.idToken);
                const milliseconds = 1000;
                const exporationDate = new Date(
                  new Date().getTime() + data.expiresIn * milliseconds
                );
                localStorage.setItem('expirationDate', exporationDate);
                localStorage.setItem('userId', data.localId);

                this.setState({
                  loading: false,
                  token: data.idToken,
                  userId: data.localId,
                });

                this.autoLogOut(Number(data.expiresIn));

                if (ingredientsState === true)
                  history.push('/checkout/contact-data');
                else if (ingredientsState === false) history.push('/');
              })
              .catch((err) => {
                this.setState({ loading: false });
                this.authError(err.errors[0].message);
              });
          },
          inputAuthDataChangedHandler: (ev, inputIdentifier) => {
            const updatedAuth = updatedState.auth;
            const updatedFormElement = { ...updatedAuth[inputIdentifier] };

            updatedFormElement.value = ev.target.value;
            updatedFormElement.valid = this.checkValidity(
              updatedFormElement.value,
              updatedFormElement.validation
            );
            updatedFormElement.touched = true;
            updatedAuth[inputIdentifier] = updatedFormElement;

            let updatedformIsValid = true;
            for (const inputIdentifier in updatedAuth) {
              updatedformIsValid =
                updatedAuth[inputIdentifier].valid && updatedformIsValid;
            }

            this.setState({
              auth: updatedAuth,
              formIsValid: updatedformIsValid,
            });
          },
          switchAuthModeHandler: () => {
            this.setState({ isSignUp: !updatedState.isSignUp });
          },
          authCheckState: () => {
            const token = localStorage.getItem('token');
            if (!token) {
              this.logOut(
                updatedState.ingredients,
                updatedState.ingredientsState,
                updatedState.basePrice
              );
            } else {
              const expirationDate = new Date(
                localStorage.getItem('expirationDate')
              );
              if (expirationDate > new Date()) {
                const userId = localStorage.getItem('userId');
                this.reloadAuthState(
                  updatedState.ingredients,
                  updatedState.totalPrice,
                  token,
                  userId
                );
              } else {
                const userId = localStorage.getItem('userId');
                this.authSuccess(token, userId);
                const milliseconds = 1000;
                this.autoLogOut(
                  (expirationDate.getTime() - new Date().getTime()) /
                    milliseconds
                );
              }
            }
          },
          authLogOut: () => {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('content');
            localStorage.removeItem('expirationDate');
            this.logOut(
              updatedState.ingredients,
              updatedState.ingredientsState,
              updatedState.basePrice
            );
          },
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export { Provider, Context };
