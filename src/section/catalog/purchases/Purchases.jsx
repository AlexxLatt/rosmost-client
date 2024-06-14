import React, { Component } from 'react';
import './Purchases.scss';
import axios from 'axios';
import container from "../../../icons/container.png";
import cargoShip from "../../../icons/cargoShip.png";
import transportation from "../../../icons/transportation.png";
import checkMark from "../../../icons/checkMark.png";

class Purchases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchases: [],
      isLoading: true,
      error: null,
      isPurchasesOpen: true,
      isMoreDetailed: false
      
    };
  }

  togglePurchases = () => {
    this.setState(prevState => ({
      isPurchasesOpen: !prevState.isPurchasesOpen
    }));
    
    document.body.style.overflow = !this.state.isPurchasesOpen ? 'hidden' : '';
  };



 
  componentDidMount() {
    this.fetchPurchases();
  }

  toggleMoreDetailed = () => {
    this.setState(prevState => ({
        isMoreDetailed: !prevState.isMoreDetailed
      }));
      
      document.body.style.overflow = !this.state.isMoreDetailed ? 'hidden' : '';
  }

  fetchPurchases = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log("Token not found in localStorage");
        return;
      }

      const response = await axios.get('http://localhost:3000/products/purchased', {
        headers: {
          Authorization: `Token ${token}`
        }
      });

      if (response.status === 200 || response.status === 201) {
        const purchases = response.data.products.map(product => ({
          ...product,
          hasReview: !!product.review // Проверяем наличие отзыва
        }));
        this.setState({
          purchases: purchases,
          isLoading: false,
        });
      } else {
        console.log('Unexpected status code:', response.status);
        this.setState({ isLoading: false, error: 'Failed to load purchases' });
      }
    } catch (error) {
      console.log('Error:', error);
      this.setState({ isLoading: false, error: 'Failed to load purchases' });
    }
  };

  render() {
    const { purchases, isLoading, error, isPurchasesOpen, isMoreDetailed,  review } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <>
        {isPurchasesOpen && (
          <div className="purchases">
            <div className="purchases__window">
              <button onClick={this.togglePurchases} className="purchases__window__close">×</button>
              <h1 className="purchases__window__title">Ваши покупки</h1>
              <div className="purchases__window__list">
                {purchases.map((purchase, index) => (
                  <div key={index} className="purchases__window__list__item">
                    <img src="" alt="упс..." className="purchases__window__list__item__img" />
                    <h2 className="purchases__window__list__item__title">{purchase.title}</h2>
                    <h2 className="purchases__window__list__item__title">{purchase.country}</h2>
                    <p className="purchases__window__list__item__description">{purchase.description}</p>
                    <p className="purchases__window__list__item__cost">Price: {purchase.cost}$</p>
                    <button onClick={() => this.toggleMoreDetailed(purchase.id)} className="purchases__window__list__item__btn">Подробнее</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {isMoreDetailed && (
          <div className="moreDetailed">
            <div className="moreDetailed__window">
              <button onClick={this.toggleMoreDetailed} className="moreDetailed__window__close">×</button>
              <div className="moreDetailed__window__title">Заказ №12312312412</div>
              <div className="moreDetailed__window__wrapper">
                <div className="moreDetailed__window__wrapper__deliveryWrapper">
                  <div className="moreDetailed__window__wrapper__deliveryWrapper__item">
                    <img src={container} alt="упс..." className="moreDetailed__window__wrapper__deliveryWrapper__item__img" />
                    <div className="moreDetailed__window__wrapper__deliveryWrapper__item__title"></div>
                  </div>
                  <div className="moreDetailed__window__wrapper__deliveryWrapper__itemSeparator">.....</div>
                  <div className="moreDetailed__window__wrapper__deliveryWrapper__item">
                    <img src={cargoShip} alt="упс..." className="moreDetailed__window__wrapper__deliveryWrapper__item__img" />
                    <div className="moreDetailed__window__wrapper__deliveryWrapper__item__title"></div>
                  </div>
                  <div className="moreDetailed__window__wrapper__deliveryWrapper__itemSeparator">.....</div>
                  <div className="moreDetailed__window__wrapper__deliveryWrapper__item">
                    <img src={transportation} alt="упс..." className="moreDetailed__window__wrapper__wrapper__deliveryWrapper__item__img" />
                    <div className="moreDetailed__window__wrapper__deliveryWrapper__item__title"></div>
                  </div>
                  <div className="moreDetailed__window__wrapper__deliveryWrapper__itemSeparator">.....</div>
                  <div className="moreDetailed__window__wrapper__deliveryWrapper__item">
                    <img src={checkMark} alt="упс..." className="moreDetailed__window__wrapper__deliveryWrapper__item__img" />
                    <div className="moreDetailed__window__wrapper__deliveryWrapper__item__title"></div>
                  </div>
                </div>
                <div className="moreDetailed__window__wrapper__status">Статус: Подготавлием груз к перевозке</div>
                <div className="moreDetailed__window__wrapper__code">Трекинг код: 11as11241sf124</div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Purchases;
