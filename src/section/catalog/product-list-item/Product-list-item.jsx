import React, { Component } from 'react';
import './Product-list-item.scss';
import productImg from '../../../img/placeholder.jpg';
import likeNoneActive from "../../../icons/likeNoneActive.png";
import success from "../../../icons/success.png";
import axios from 'axios';
import Basket from '../basket/Basket';

class ProductListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isProductOpen: false,
      isProductInBasket: false, 
      currentProduct: {},
      selectedRating: null,
      // reviews: [],
      basket: {},
      isBasketOpen: false,
      isAdmin: false
    };
  }

  componentDidMount() {
    const admin = localStorage.getItem('admin') === 'true';
    this.setState({ isAdmin: admin });
  }

  handleClick = () => {
    const { id } = this.props;
    this.toggleOpenProduct();
    this.findOneProduct(id);
  };

  toggleOpenProduct = () => {
    document.body.style.overflow = !this.state.isProductOpen ? 'hidden' : '';
    this.setState((prevState) => ({
      isProductOpen: !prevState.isProductOpen
    }));
  };

  toggleProductInBasket = () => {
    document.body.style.overflow = !this.state.isProductOpen ? 'hidden' : '';
    this.setState((prevState) => ({
      isProductInBasket: !prevState.isProductInBasket
    }));
  };

  findOneProduct = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3000/products/${id}`, {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      if (response.status === 200 || response.status === 201) {
        const { product } = response.data;
        // const { reviews } = response.data.product;
        // this.setState({ currentProduct: product, reviews: reviews });
        this.setState({ currentProduct: product });
      } else {
        console.log('Unexpected status code:', response.status);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  handleRatingSelect = (rating) => {
    this.setState({ selectedRating: rating });
  };

  // handleStateRating = (data) => {
  //   this.setState({ reviews: data });
  // };

  // likeReview = async (slug) => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     const response = await axios.post(`http://localhost:3000/reviews/${slug}/favorite`, {}, {
  //       headers: {
  //         Authorization: `Token ${token}`
  //       }
  //     });
  //     if (response.status === 200 || response.status === 201) {
  //       const updatedReview = response.data.review;
  //       this.setState((prevState) => ({
  //         reviews: prevState.reviews.map((review) =>
  //           review.slug === updatedReview.slug ? updatedReview : review
  //         )
  //       }));
  //     } else {
  //       console.log('Unexpected status code:', response.status);
  //     }
  //   } catch (error) {
  //     console.log('Error:', error);
  //   }
  // };

  fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/products');
      if (response.status === 200 || response.status === 201) {
        const products = response.data.products;
        // Обновите состояние вашего компонента с новым списком продуктов
        // this.setState({ products: products });
      } else {
        console.log('Unexpected status code:', response.status);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  addProductToBasket = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:3000/basket/${id}`, {}, {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      if (response.status === 200 || response.status === 201) {
        const basket = response.data.basket;
        console.log(basket);
        this.setState({ basket: basket });
        this.toggleOpenProduct();
        this.toggleProductInBasket();

        await this.findAllProductsInBasket();
      } else {
        console.log('Unexpected status code:', response.status);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:3000/products/${id}`, {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      if (response.status === 200 || response.status === 201) {
        console.log("Продукт удален");
        window.location.reload(); // Обновление страницы после успешного удаления продукта
        // обновите состояние или сделайте что-то еще после удаления продукта
      } else {
        console.log('Unexpected status code:', response.status);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  toggleBasket = () => {
    this.setState((prevState) => ({
      isBasketOpen: !prevState.isBasketOpen
    }));
  };

  handleBasket = () => {
    this.toggleBasket();
    this.toggleProductInBasket();
  };



  render() {
    const { isProductOpen, currentProduct, isProductInBasket, isBasketOpen, isAdmin } = this.state;
    const { img, title, country, cost, id } = this.props;

    return (
      <div className="productListItem">
        <div className="productListItem__wrapper">
          <img className="productListItem__wrapper__img" src={img || productImg} alt="упс..." />
          <div className="productListItem__wrapper__title">{title}</div>
          <div className="productListItem__wrapper__country">{country}</div>
          <div className="productListItem__wrapper__cost">{cost}р</div>
          {isAdmin ? (
            <button className="productListItem__wrapper__btnDelete" onClick={() => this.deleteProduct(id)}>
              Удалить
            </button>
          ) : (
            <button className="productListItem__wrapper__btn" onClick={this.handleClick}>
              Подробнее
            </button>
          )}
        </div>

        {isProductOpen && (
          <div className={`productMenuBackground`} onClick={this.toggleOpenProduct}>
            <div className="productMenu" onClick={(e) => e.stopPropagation()}>
              <div onClick={this.toggleOpenProduct} className="productMenu__close">
                ×
              </div>
              <div className="productMenu__textWrapper">
                <div className="productMenu__textWrapper__title">{currentProduct.title}</div>
                <div className="productMenu__textWrapper__tags">
                  Перевозка: {currentProduct.tags}
                </div>


                <div className="productMenu__textWrapper__cost">{currentProduct.cost}р</div>
                <button onClick={() => this.addProductToBasket(currentProduct.id)} className="productMenu__textWrapper__btn">
                  Добавить в корзину
                </button>
              </div>
              <div className="productMenu__imgWrapper">
                <img className="productMenu__imgWrapper__img" src={img || productImg} alt="упс..." />
              </div>
              <div className="productMenu__descr">{currentProduct.description}</div>
            </div>
          </div>
        )}
        {isProductInBasket && (
          <div className="noticeBasketInProduct">
            <div className="noticeBasketInProduct__window">
              <div onClick={this.toggleProductInBasket} className="noticeBasketInProduct__window__close">×</div>
              <img className="noticeBasketInProduct__window__icon" src={success} alt="упс" />
              <div className="noticeBasketInProduct__window__text">Продукт добавлен в вашу корзину</div>
              <button onClick={this.handleBasket} className="noticeBasketInProduct__window__btn">Перейти в корзину</button>
            </div>
          </div>
        )}
        {isBasketOpen && <Basket></Basket>}
      </div>
    );
  }
}

export default ProductListItem;
