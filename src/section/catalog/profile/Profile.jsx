import React, { Component } from 'react';
import axios from 'axios';
import profileIcon from "../../../icons/profile1.png";
import './Profile.scss'; // Импорт CSS файла
import loading from "../../../icons/loading.gif";
import rofloLoading from "../../../icons/rofloLoading.gif";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      address: '',
      firstName: '',
      secondName: '',
      patromicName: '',
      tel: '',
      img: '',
      isProfileWindow: false,
      profileDataWindow: true,
      isLoadingWindow: false,
      errors: {
        tel: '',
      }
    };
  }

  componentDidMount() {
    this.fetchCurrentUser();
  }

  toggleProfileWindow = () => {
    this.setState((prevState) => ({
      isProfileWindow: !prevState.isProfileWindow
    }));
    document.body.style.overflow = !this.state.isProfileWindow ? 'hidden' : '';
  }

  toggleProfileDataWindow = () => {
    this.setState((prevState) => ({
      profileDataWindow: !prevState.profileDataWindow
    }));
    document.body.style.overflow = !this.state.profileDataWindow ? 'hidden' : '';
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    let errors = { ...this.state.errors };

    switch (name) {
      case 'tel':
        errors.tel = !/^7\d{9,10}$/.test(value) ? 'Телефон должен начинаться с 7 и содержать 10 цифр' : '';
      break;
      default:
        break;
    }

    this.setState({ [name]: value, errors: errors });
  };

  saveAndChange = () => {
    const { errors, tel } = this.state;

    // Проверка на наличие ошибок валидации
    if (errors.tel || !/^\+?\d{10,15}$/.test(tel)) {
      console.error('Форма содержит ошибки. Проверьте введенные данные.');
      return;
    }

    this.toggleProfileWindow();
    
    this.updateUser();
  }

  toggleTwice = () => {
    this.toggleProfileDataWindow();
    this.toggleProfileWindow();
  }

  fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log("Токен не найден в localStorage");
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
          firstName: user.firstName || '',
          secondName: user.secondName || '',
          patromicName: user.patromicName || '',
          username: user.username || '',
          email: user.email || '',
          address: user.address || '',
          tel: user.tel || '',
          img: user.img || ''
        });
      } else {
        console.log('Неожиданный код статуса:', response.status);
      }
    } catch (error) {
      console.log('Ошибка:', error);
    }
  };

  updateUser = async () => {
    try {
      const { address, tel, username, email, img } = this.state;
      const token = localStorage.getItem('token');
      if (!token) {
        console.log("Токен не найден в localStorage");
        return;
      }

      const response = await axios.put('http://localhost:3000/userWithout', {
        user: {
          address: address,
          tel: tel,
          username: username,
          email: email,
          img: img
        }
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200 || response.status === 201) {
        console.log('Пользователь успешно обновлен');
        console.log(response.data);
        this.setState({
          isProfileWindow: false
        });
        window.location.reload();
      } else {
        console.log('Неожиданный код статуса:', response.status);
      }
    } catch (error) {
      console.log('Ошибка:', error);
    }
  };

  handleImageChange = async (e) => {
    const formdata = new FormData();
    formdata.append("image", e.target.files[0]);

    try {
      this.setState({isLoadingWindow: true})
      const response = await axios.post('https://api.imgur.com/3/image/', formdata, {
        headers: {
          Authorization: 'Client-ID 11c5e80f09a3b8b'
        }
      });
      
      if (response.status === 200 || response.status === 201) {
        console.log("Картинка была успешно сохранена");

        this.setState({isLoadingWindow: false})
        this.setState({ img: response.data.data.link }, () => {
          this.updateUser(); // Обновление пользователя после обновления изображения
        });
        
      } else {
        console.error('Ошибка при загрузке изображения:', response.status);
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }

  render() {
    const { address, email, username, tel, img, isProfileWindow, isLoadingWindow, profileDataWindow, firstName, secondName, patromicName, errors } = this.state;
    return (
      <>
        {profileDataWindow && (
          <div className="profile">
            <div className="profile__window">
              <div onClick={this.toggleProfileDataWindow} className="profile__window__close">×</div>
              <div className="profile__window__title">Ваш профиль</div>
              <div className="profile__window__wrapper">
                <img src={img || profileIcon} alt="Profile" className="profile__window__wrapper__img" />
                <div className="profile__window__wrapper__username label">Username: {username}</div>
                <div className="profile__window__wrapper__email label">Email: {email}</div>
                <div className="profile__window__wrapper__username label">Имя: {firstName}</div>
                <div className="profile__window__wrapper__username label">Фамилия: {secondName}</div>
                <div className="profile__window__wrapper__username label">Отчество: {patromicName}</div>
                <div className="profile__window__wrapper__address label">Адрес: {address}</div>
                <div className="profile__window__wrapper__tel label">Телефон: {tel}</div>
                {errors.tel.length > 0 && <div className='error'>{errors.tel}</div>}
                <button onClick={this.toggleTwice} className="profile__window__wrapper__chengeData">Поменять и обновить данные</button>
              </div>
            </div>
          </div>
        )}
        {isProfileWindow && (
          <div className="profile">
            <div className="profile__window">
              <div onClick={this.toggleProfileWindow} className="profile__window__close">×</div>
              <div className="profile__window__title">Заполните данные</div>
              <div className="profile__window__wrapper">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  name="username"
                  className="profile__window__wrapper__input"
                  value={username}
                  onChange={this.handleChange}
                />
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  className="profile__window__wrapper__input"
                  value={email}
                  onChange={this.handleChange}
                />
                <label htmlFor="firstName">Имя</label>
                <input
                  id="firstName"
                  name="firstName"
                  className="profile__window__wrapper__input"
                  value={firstName}
                  onChange={this.handleChange}
                />
                <label htmlFor="secondName">Фамилия</label>
                <input
                  id="secondName"
                  name="secondName"
                  className="profile__window__wrapper__input"
                  value={secondName}
                  onChange={this.handleChange}
                />
                <label htmlFor="patromicName">Отчество</label>
                <input
                  id="patromicName"
                  name="patromicName"
                  className="profile__window__wrapper__input"
                  value={patromicName}
                  onChange={this.handleChange}
                />
                <label htmlFor="address">Адрес</label>
                <input
                  id="address"
                  name="address"
                  className="profile__window__wrapper__input"
                  value={address}
                  onChange={this.handleChange}
                />
                <label htmlFor="tel">Телефон</label>
                <input
                  id="tel"
                  name="tel"
                  className="profile__window__wrapper__input"
                  value={tel}
                  onChange={this.handleChange}
                />
                {errors.tel.length > 0 && <span className='error'>{errors.tel}</span>}
         	      <label className='labelImg' htmlFor="img">Изменить изображение профиля</label>
                <label class="input-file">
                <input        
                  type="file"
                  id="img"
                  name="img"
                  className="inputFile"
                  onChange={this.handleImageChange}
                />
                <span>Выберите файл</span>  
                </label>
                {isLoadingWindow && (
                    <div className='loading'>
                      <div className="loading__window">
                        <div className="loading__window__title">Загружаем изображение</div>
                        <img className='loading__window__img' src={loading} alt="упс..." />
                      </div>
                  </div>
                  )}
                <button onClick={this.saveAndChange} className="profile__window__wrapper__chengeData">Сохранить</button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Profile;
