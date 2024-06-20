import React, { Component } from "react";
import axios from 'axios';
import productImg from '../../../img/placeholder.jpg';
import jcbIcon from '../../../icons/jcb.png';
import mirIcon from '../../../icons/mir.png';
import visaIcon from '../../../icons/visa.png';
import successIcon from '../../../icons/success.png';
import './Basket.scss';

class Basket extends Component {
  state = {
    products: [],
    totalCost: 0,
    isProductInBasket: true,
    isProfileWindow: false,
    isPurchaseWindow: false,
    isEndWindow: false,
    address: '',
    passportSeries: '',
    passportCode: '',
    firstName: '',
    secondName: '',
    patromicName: '',
    user: {},
    cardNumber: '',
    cardMonth: '',
    cardYear: '',
    cardCvc: '',
    errorProf: '',
    errors: {
      passportSeries: '',
      passportCode: '',
      cardNumber: '',
      cardMonth: '',
      cardYear: '',
      cardCvc: ''
    }
  };

  componentDidMount() {
    this.fetchAllData();
  }

  async fetchAllData() {
    await Promise.all([this.findAllProductsInBasket(), this.fetchCurrentUser()]);
  }

  async fetchCurrentUser() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log("Token not found in localStorage");
        return;
      }

      const response = await axios.get(`http://localhost:3000/user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200 || response.status === 201) {
        const user = response.data.user;
        this.setState({ 
          user, 
          address: user.address || '',
          passportSeries: user.passportSeries || '',
          passportCode: user.passportCode || ''
        });
      } else {
        console.log('Unexpected status code:', response.status);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }

  async updateUser() {
    try {
      const { address, passportSeries, passportCode, firstName, secondName, patromicName } = this.state;
      const token = localStorage.getItem('token');
      if (!token) {
        console.log("Token not found in localStorage");
        return;
      }
  
      const response = await axios.put('http://localhost:3000/userWithout', {
        user: {
          address,
          passportSeries,
          passportCode,
          firstName,
          secondName,
          patromicName,
        }
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      if (response.status === 200 || response.status === 201) {
        console.log('User updated successfully');
        this.setState({ 
          user: response.data.user,
          isProfileWindow: false 
        });
        this.togglePurchaseWindow();  // Switch to purchase window
      } else {
        console.log('Unexpected status code:', response.status);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }
  
  async buyProductsOnBasket() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log("Token not found in localStorage");
        return;
      }

      const response = await axios.post(`http://localhost:3000/basket/purchase`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200 || response.status === 201) {
        console.log(response.data.products);
        this.setState({ products: [], totalCost: 0 });
        this.toggleEndWindow();
      } else {
        console.log('Unexpected status code:', response.status);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }

  async deleteProductInBasket(id) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log("Token not found in localStorage");
        return;
      }

      const response = await axios.delete(`http://localhost:3000/basket/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200 || response.status === 201) {
        console.log('Deletion successful');
        this.findAllProductsInBasket();
      } else {
        console.log('Unexpected status code:', response.status);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }

  async findAllProductsInBasket() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log("Token not found in localStorage");
        return;
      }

      const response = await axios.get(`http://localhost:3000/products`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200 || response.status === 201) {
        const products = response.data.products.filter(product => !product.isPurchased);
        console.log('Products:', products);
        const totalCost = this.calculateTotalCost(products);
        this.setState({ products, totalCost });
      } else {
        console.log('Unexpected status code:', response.status);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }

  calculateTotalCost(products) {
    return products.reduce((total, product) => total + product.cost, 0);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    let errors = { ...this.state.errors };
  
    switch (name) { 
      case 'passportSeries':
        errors.passportSeries = value.length !== 6 || !/^\d{6}$/.test(value) ? 'Серия паспорта должна содержать 6 цифр' : '';
        break;
      case 'passportCode':
        errors.passportCode = value.length !== 4 || !/^\d{4}$/.test(value) ? 'Код подразделения должен содержать 4 цифры' : '';
        break;
      case 'cardNumber':
        errors.cardNumber = value.length !== 16 || !/^\d{16}$/.test(value) ? 'Номер карты должен содержать 16 цифр' : '';
        break;
        case 'cardMonth':
          errors.cardMonth = value.length !== 2 || !/^(0[1-9]|1[0-2])$/.test(value) ? 'Месяц должен быть от 01 до 12' : '';
          break;
      
      case 'cardYear':
        errors.cardYear = value.length !== 2 || !/^\d{2}$/.test(value) ? 'Год должен содержать 2 цифры' : '';
        break;
      case 'cardCvc':
        errors.cardCvc = value.length !== 3 || !/^\d{3}$/.test(value) ? 'CVC должен содержать 3 цифры' : '';
        break;
      default:
        break;
    }
  
    this.setState({ [name]: value, errors });
  };
  
  toggleProductInBasket = () => {
    this.setState((prevState) => ({
      isProductInBasket: !prevState.isProductInBasket
    }));
    document.body.style.overflow = !this.state.isProductInBasket ? 'hidden' : '';
  };

  toggleBuyInBasket = () => {
    const { address, passportSeries, passportCode } = this.state;
  
    if (!address || !passportSeries || !passportCode || this.hasErrors()) {
      this.setState({ isProfileWindow: true, isProductInBasket: false });
    } else {
      this.togglePurchaseWindow();
    }
  };
  
  hasErrors = () => {
    const { errors } = this.state;
    return Object.values(errors).some(error => error !== '');
  };
  
  handleSaveAndProceed = () => {
    const { errors, passportSeries, passportCode, address , firstName, secondName, patromicName, errorProf } = this.state;

    // Проверка наличия ошибок валидации
    if (errors.passportSeries || errors.passportCode ||
        passportSeries.length !== 6 || passportCode.length !== 4 || 
        !/^\d+$/.test(passportSeries) || !/^\d+$/.test(passportCode) || firstName.length == 0 || secondName.length == 0 || patromicName.length == 0 , address == 0) {
      console.error('Форма содержит ошибки. Проверьте введенные данные.');
      errorProf = "Введите все данные корректно";
      return;
    }
    this.updateUser();
  };

  togglePurchaseWindow = () => {
    this.setState((prevState) => ({
      isPurchaseWindow: !prevState.isPurchaseWindow
    }));
    document.body.style.overflow = !this.state.isPurchaseWindow ? 'hidden' : '';
  }

  toggleProfileWindow = () => {
    this.setState((prevState) => ({
      isProfileWindow: !prevState.isProfileWindow
    }));
    document.body.style.overflow = !this.state.isProfileWindow ? 'hidden' : '';
  }

  handleByeProduct = () => {
    const { errors, cardNumber, cardMonth, cardYear, cardCvc } = this.state;

    // Check for validation errors
    if (errors.cardNumber || errors.cardMonth || errors.cardYear || errors.cardCvc ||
      cardNumber.length !== 16 || cardMonth.length !== 2 || cardYear.length !== 2 || cardCvc.length !== 3) {
      console.error('Form contains errors. Please check your input.');
      return;
    }

    this.buyProductsOnBasket();
  }

  toggleEndWindow = () => {
    this.setState((prevState) => ({
      isEndWindow: !prevState.isEndWindow,
      isPurchaseWindow: false,
      isProductInBasket: false
    }));
    document.body.style.overflow = !this.state.isEndWindow ? 'hidden' : '';
  }

  render() {
    const { 
      products, totalCost, isProductInBasket, isProfileWindow, 
      address, passportSeries, passportCode, firstName, secondName, 
      patromicName, isPurchaseWindow, isEndWindow, 
      cardNumber, cardMonth, cardYear, cardCvc, errors 
    } = this.state;

    return (
      <>
        {isProductInBasket && (
          <div className="basket">
            <div className="basket__window">
              <div onClick={this.toggleProductInBasket} className="basket__window__close">×</div>
              <div className="basket__window__title">Корзина</div>
              <div className="basket__window__wrapper">
                {products.length > 0 ? (
                  products.map((product) => (
                    <div key={product.id} className="basket__window__wrapper__product">
                      <img src={product.img || productImg} alt="Product" className="basket__window__wrapper__product__img" />
                      <div className="basket__window__wrapper__product__title">{product.title}</div>
                      <div className="basket__window__wrapper__product__country">Страна: {product.country}</div>
                      <div className="basket__window__wrapper__product__cost">Цена: {product.cost}р</div>
                      <button className="basket__window__wrapper__product__deleteBtn" onClick={() => this.deleteProductInBasket(product.id)}>удалить</button>
                    </div>
                  ))
                ) : (
                  <div className="basket__window__wrapper__empty">В корзине нет товаров</div>
                )}
              </div>
              {products.length > 0 && (
                <>
                  <div className="basket__window__totalCost">Итого: {totalCost}р</div>
                  <div className="basket__window__buy" onClick={this.toggleBuyInBasket}>Купить</div>
                </>
              )}
            </div>
          </div>
        )}

        {isProfileWindow && (
          <div className="profile">
            <div className="profile__window">
              <div onClick={this.toggleProfileWindow} className="profile__window__close">×</div>
              <div className="profile__window__title">Заполните данные перед покупкой</div>
              <div className="profile__window__wrapper">
                <label htmlFor="firstName">Имя</label>
                <input
                  id="firstName"
                  name="firstName"
                  className="profile__window__wrapper__input"
                  value={firstName}
                  onChange={this.handleChange}
                />
                {errors.firstName && <div className="error">{errors.firstName}</div>}
                
                <label htmlFor="secondName">Фамилия</label>
                <input
                  id="secondName"
                  name="secondName"
                  className="profile__window__wrapper__input"
                  value={secondName}
                  onChange={this.handleChange}
                />
                {errors.secondName && <div className="error">{errors.secondName}</div>}
                
                <label htmlFor="patromicName">Отчество</label>
                <input
                  id="patromicName"
                  name="patromicName"
                  className="profile__window__wrapper__input"
                  value={patromicName}
                  onChange={this.handleChange}
                />
                {errors.patromicName && <div className="error">{errors.patromicName}</div>}
                
                <label htmlFor="address">Адрес</label>
                <input
                  id="address"
                  name="address"
                  className="profile__window__wrapper__input"
                  value={address}
                  onChange={this.handleChange}
                />
                {errors.address && <div className="error">{errors.address}</div>}
                
                <label htmlFor="passportSeries">Серия паспорта</label>
                <input
                  id="passportSeries"
                  name="passportSeries"
                  className="profile__window__wrapper__input"
                  value={passportSeries}
                  onChange={this.handleChange}
                />
                {errors.passportSeries && <div className="error">{errors.passportSeries}</div>}
                
                <label htmlFor="passportCode">Код подразделения</label>
                <input
                  id="passportCode"
                  name="passportCode"
                  className="profile__window__wrapper__input"
                  value={passportCode}
                  onChange={this.handleChange}
                />
                {errors.passportCode && <div className="error">{errors.passportCode}</div>}
                
                <div onClick={this.handleSaveAndProceed} className="profile__window__wrapper__btn">Сохранить и перейти к оплате</div>
              </div>
            </div>
          </div>
        )}

        {isPurchaseWindow && (
          <div className="purchase">
            <div className="purchase__window">
              <div onClick={this.togglePurchaseWindow} className="purchase__window__close">×</div>
              <div className="purchase__window__title">Введите данные</div>
              <div className="purchase__window__wrapper">
                <div className="purchase__window__wrapper__icons">
                  <img src={visaIcon} alt="Visa" className="purchase__window__wrapper__icons__icon" />
                  <img src={mirIcon} alt="Mir" className="purchase__window__wrapper__icons__icon" />
                  <img src={jcbIcon} alt="JCB" className="purchase__window__wrapper__icons__icon" />
                </div>

                <input 
                  type="text" 
                  className="purchase__window__wrapper__inputNomber" 
                  placeholder="Номер карты" 
                  name="cardNumber" 
                  value={cardNumber} 
                  onChange={this.handleChange} 
                />
                {errors.cardNumber && <div className="error-number">{errors.cardNumber}</div>}
                
                <label className="purchase__window__wrapper__labelDate" htmlFor="date">VALID THRU</label>
                <input 
                  type="text" 
                  id="date" 
                  className="purchase__window__wrapper__inputMounth" 
                  placeholder="MM" 
                  name="cardMonth" 
                  value={cardMonth} 
                  onChange={this.handleChange} 
                />
                {errors.cardMonth && <div className="error-month">{errors.cardMonth}</div>}
                
                <input 
                  type="text" 
                  className="purchase__window__wrapper__inputYear" 
                  placeholder="ГГ" 
                  name="cardYear" 
                  value={cardYear} 
                  onChange={this.handleChange} 
                />
                {errors.cardYear && <div className="error-year">{errors.cardYear}</div>}
                
                <label className="purchase__window__wrapper__labelCvc" htmlFor="cvc">Три цифры с обратной стороны карты</label>
                <input 
                  type="text" 
                  id="cvc" 
                  className="purchase__window__wrapper__inputCvc" 
                  placeholder="CVC" 
                  name="cardCvc" 
                  value={cardCvc} 
                  onChange={this.handleChange} 
                />
                {errors.cardCvc && <div className="error-cvc">{errors.cardCvc}</div>}
              </div>
              <div onClick={this.handleByeProduct} className="purchase__window__btn">Купить</div>
            </div>
          </div>
        )}
        
        {isEndWindow && (
          <div className="endWindow"> 
            <div className="endWindow__window">
              <div className="endWindow__window__wrapper">
                <img src={successIcon} alt="Success" className="endWindow__window__wrapper__icon" />
                <div className="endWindow__window__wrapper__title">Покупка прошла успешно</div>
                <button onClick={this.toggleEndWindow} className="endWindow__window__wrapper__btn">Ок</button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Basket;

