const data = {
  header: {
    navigation: 'Панель инструментов', //Toolbar
    logo: 'logo',
    backdrop: '...',
  },
  controls: [
    { label: 'Салат', type: 'salad' },
    { label: 'Бекон', type: 'bacon' },
    { label: 'Сыр', type: 'cheese' },
    { label: 'Мясо', type: 'meat' },
  ],
  ingredients: null,
  ingredientsState: false,
  ingredientPrices: {
    salad: 25,
    bacon: 40,
    cheese: 45,
    meat: 50,
  },
  orders: [],
  ordersError: null,
  orderForm: {
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Ваше Имя',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    street: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Улица',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    zipCode: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Почтовый индекс', //ZIP Code
      },
      value: '',
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
      },
      valid: false,
      touched: false,
    },
    country: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Страна',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Ваш E-mail',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [
          { value: 'fastest', displayValue: 'Быстрый' }, //Fastest
          { value: 'cheapest', displayValue: 'Недорогой' }, //Cheapest
        ],
      },
      value: 'fastest',
      validation: {}, //исправляем ошибку выподающего списка (вариант 1)
      valid: true,
    },
  },
  basePrice: 0,
  totalPrice: 0,
  purchasable: false,
  purchasing: false,
  purchased: false,
  error: false,
  formIsValid: false,
  auth: {
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Почтовый Адрес', //Mail Address
      },
      value: '',
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Пароль', //Password
      },
      value: '',
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  },
  isSignUp: false,
  loading: false,
  token: null,
  userId: null,
  authError: null,
  footerSection: {
    copyright: 'Copyright ',
    social: {
      '#github': 'https://github.com/konstantindergachev',
      '#facebook': 'https://www.facebook.com/profile.php?id=100003527152401',
    },
  },
};

export default data;
