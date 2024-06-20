import React, { Component } from "react";
import axios from 'axios';
import Header from "./section/header/header";
import FirstWindow from "./section/firstWindow/firstWindow";
import PlatformProducts from "./section/platformProducts/platformProducts";
import Rosmost from "./section/rosmost/rosmost";
import Footer from "./section/footer/footer";
import { Routes, Route, Link } from "react-router-dom";
import "../src/sass/style.scss";
import "../src/sass/base/forms.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRegistrationForm: false,
      showLoginForm: false,
      email: "",
      password: "",
      username: "",
      token: "",
      registrationError: null,
      loginError: null,
      agreedToTerms: false, // Track if terms are agreed
      termsError: "" // Error message for terms agreement
    };
  }

  toggleRegistrationForm = () => {
    this.setState((prevState) => ({
      showRegistrationForm: !prevState.showRegistrationForm
    }));
    document.body.style.overflow = !this.state.showRegistrationForm ? 'hidden' : '';
    document.body.classList.toggle('modal-open');
  };

  toggleLoginForm = () => {
    this.setState((prevState) => ({
      showLoginForm: !prevState.showLoginForm
    }));
    document.body.style.overflow = !this.state.showLoginForm ? 'hidden' : '';
    document.body.classList.toggle('modal-open');
  };

  register = async (email, password, username) => {
    localStorage.clear();
    try {
      const response = await axios.post("http://localhost:3000/users", {
        "user": {
          "email": email,
          "password": password,
          "username": username
        }
      });
      console.log("Registration Response:", response); // Add this line for debugging
      if (response.status === 200 || response.status === 201) {
        const token = response.data.user.token;
        const username = response.data.user.username;
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        window.location.href = "/catolog.html";
      } else {
        console.log("Unexpected status code:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
      this.setState({ registrationError: "Ошибка регистрации. Пожалуйста, попробуйте ввести другие данные." });
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, username, agreedToTerms } = this.state;

    if (!agreedToTerms) {
      this.setState({ termsError: "Пожалуйста, согласитесь с условиями." });
      return;
    }

    await this.register(email, password, username);
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleCheckboxChange = () => {
    this.setState((prevState) => ({
      agreedToTerms: !prevState.agreedToTerms,
      termsError: "" // Clear terms error message on checkbox change
    }));
  };

  renderRegistrationForm = () => {
    const { showRegistrationForm, email, password, username, registrationError, agreedToTerms, termsError } = this.state;
    if (showRegistrationForm) {
      return (
        <div className="bg show">
          <form className="registerForm" onClick={(e) => e.stopPropagation()} onSubmit={this.handleSubmit}>
            <div onClick={this.toggleRegistrationForm} className="registerForm__close">×</div>
            <div className="registerForm__title">Регистрация</div>
            {registrationError && <div className="error">{registrationError}</div>}
            <div className="registerForm__wrapper">
              <input name="username" value={username} onChange={this.handleChange} className="registerForm__wrapper__Input" type="text" placeholder="  Username" />
              <input name="email" value={email} onChange={this.handleChange} className="registerForm__wrapper__Input" type="email" placeholder="  Email" />
              <input name="password" value={password} onChange={this.handleChange} className="registerForm__wrapper__Input" type="password" placeholder="  Password" />
              <label>
                <input className="registerForm__wrapper__checkbox" type="checkbox" checked={agreedToTerms} onChange={this.handleCheckboxChange} />
                <span className="registerForm__wrapper__checkbox__label">Я согласен с <a href="../policy.html" target="_blank">условиями</a></span>
              </label>
              {termsError && <div className="registerForm__wrapper__checkbox__error">{termsError}</div>}
              <button className="registerForm__wrapper__btn" type="submit">Зарегистрироваться</button>
            </div>
          </form>
        </div>
      );
    }
  };

  login = async (email, password) => {
    try {
      localStorage.clear();
      const response = await axios.post("http://localhost:3000/users/login", {
        "user": {
          "email": email,
          "password": password
        }
      });
      console.log("Ответ от входа:", response);
      
      // Проверяем как на код 200, так и на код 201
      if (response.status === 200 || response.status === 201) {
        const token = response.data.user.token;
        const username = response.data.user.username;
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        window.location.href = "/catolog.html";
      } else {
        console.log("Неожиданный код состояния:", response.status);
        // Обработка неожиданных кодов состояния (по желанию)
        this.setState({ loginError: "Ошибка входа. Пожалуйста, проверьте введенные данные." });
      }
    } catch (error) {
      console.error("Ошибка:", error);
      this.setState({ loginError: "Ошибка входа. Пожалуйста, проверьте введенные данные." });
    }
  };
  
  handleLoginSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    await this.login(email, password);
  };

  renderLoginForm = () => {
    const { showLoginForm, email, password, loginError } = this.state;
    if (showLoginForm) {
      return (
        <div className="bg show" >
          <form className="loginForm" onClick={(e) => e.stopPropagation()} onSubmit={this.handleLoginSubmit}>
            <div className="loginForm__close" onClick={this.toggleLoginForm}>×</div>
            <div className="loginForm__title">Вход</div>
            {loginError && <div className="error">{loginError}</div>}
            <div className="loginForm__wrapper">
              <input name="email" value={email} onChange={this.handleChange} className="loginForm__wrapper__Input" type="email" placeholder="  Email" />
              <input name="password" value={password} onChange={this.handleChange} className="loginForm__wrapper__Input" type="password" placeholder="  Password" />
              <button className="loginForm__wrapper__btn" type="submit">Войти</button>
            </div>
          </form>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <Header toggleRegistrationForm={this.toggleRegistrationForm} toggleLoginForm={this.toggleLoginForm} />
        <FirstWindow />
        <PlatformProducts />
        <Rosmost />
        {this.renderRegistrationForm()}
        {this.renderLoginForm()}
        <Footer />
      </div>
    );
  }
}

export default App;
