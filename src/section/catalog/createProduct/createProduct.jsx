import React, { Component } from 'react';
import axios from 'axios';
import './createProduct.scss';

class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      country: '',
      cost: '',
      description: '',
      tags: '',
      isCreateProduct: true
    };
   
  }

  toggleCreateProduct = ()=>{
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
          tags: this.state.tags.split(',').map(tag => tag.trim())
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
    const { isCreateProduct } = this.state;
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
                <button className='create-product__window__form__btn' type="submit">Создать</button>
              </form>
            </div>
          </div>    
        )}
      </>
    );
  }
}

export default CreateProduct;
