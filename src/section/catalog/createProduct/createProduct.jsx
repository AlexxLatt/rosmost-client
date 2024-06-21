import React, { Component } from 'react';
import axios from 'axios';
import './createProduct.scss';
import loading from "../../../icons/loading.gif";

class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      country: '',
      cost: '',
      description: '',
      tags: '',
      isCreateProduct: true,
      isLoadingWindow: false,
      img: ''
    };
  }

  toggleCreateProduct = () => {
    const { isCreateProduct } = this.state;
    this.setState({
      isCreateProduct: !isCreateProduct
    });
    document.body.style.overflow = !isCreateProduct ? 'hidden' : '';
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleImageChange = async (e) => {
    const formdata = new FormData();
    formdata.append("image", e.target.files[0]);

    try {
      this.setState({ isLoadingWindow: true });
      const response = await axios.post('https://api.imgur.com/3/image/', formdata, {
        headers: {
          Authorization: 'Client-ID 11c5e80f09a3b8b'
        }
      });
      
      if (response.status === 200 || response.status === 201) {
        console.log("Картинка была успешно сохранена");

        this.setState({ img: response.data.data.link, isLoadingWindow: false });
      } else {
        console.error('Ошибка при загрузке изображения:', response.status);
        this.setState({ isLoadingWindow: false });
      }
    } catch (error) {
      console.error('Ошибка:', error);
      this.setState({ isLoadingWindow: false });
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/products', {
        product: {
          title: this.state.title,
          country: this.state.country,
          cost: parseFloat(this.state.cost),
          description: this.state.description,
          tags: this.state.tags.split(',').map(tag => tag.trim()),
          img: this.state.img
        }
      }, {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      if (response.status === 200 || response.status === 201) {
        console.log('Product created successfully.');
        window.location.reload();
        // Опционально: добавьте дополнительную логику после успешного создания продукта
      } else {
        console.log('Unexpected status code:', response.status);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }

  render() {
    const { isCreateProduct, isLoadingWindow } = this.state;
    return (
      <>
        {isCreateProduct && (
          <div className="create-product">
            <div className="create-product__window">
              <button onClick={this.toggleCreateProduct} className="create-product__window__close">×</button>
              <h2 className="create-product__window__title">Создать продукт</h2>
              <form className='create-product__window__form' onSubmit={this.handleSubmit}>
                <label className='create-product__window__form__label'>Заголовок:</label>
                <input className='create-product__window__form__input' type="text" name="title" value={this.state.title} onChange={this.handleInputChange} required />
                <label className='create-product__window__form__label'>Страна:</label>
                <input className='create-product__window__form__input' type="text" name="country" value={this.state.country} onChange={this.handleInputChange} required />
                <label className='create-product__window__form__label'>Цена:</label>
                <input className='create-product__window__form__input' type="number" name="cost" value={this.state.cost} onChange={this.handleInputChange} required />
                <label className='create-product__window__form__label'>Теги:</label>
                <input className='create-product__window__form__input' type="text" name="tags" value={this.state.tags} onChange={this.handleInputChange} required />
                <label className='create-product__window__form__label'>Описание:</label>
                <textarea className='create-product__window__form__textarea' name="description" value={this.state.description} onChange={this.handleInputChange} required />
                <label className='labelImg' htmlFor="img">Изменить изображение продукта</label>
                <label className="input-file  crLeft">
                  <input        
                    type="file"
                    id="img"
                    name="img"
                    className="inputFile"
                    onChange={this.handleImageChange}
                  />
                  <span>Выберите файл</span>  
                </label>
                <button className='create-product__window__form__btn' type="submit">Создать</button>
              </form>
            </div>
          </div>    
        )}
        {isLoadingWindow && (
          <div className='loading'>
            <div className="loading__window">
              <div className="loading__window__title">Загружаем изображение</div>
              <img className='loading__window__img' src={loading} alt="упс..." />
            </div>
         </div>
        )}
      </>
    );
  }
}

export default CreateProduct;
