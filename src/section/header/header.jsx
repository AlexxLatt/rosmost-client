import React from 'react';
import PropTypes from 'prop-types';
import './header.scss';
import Logo from "../../icons/logo.png";

function Header(props) {
    const { toggleRegistrationForm , toggleLoginForm } = props;

    return (
        <header>
            <div className="container">
                <div className="header">
                    <div className="header__logoWrapper">
                        <div className="header__logoWrapper-text">РОСМОСТ</div>
                        <img src={Logo} alt="Логотип РОСМОСТ" className="header__logo-img" />
                    </div>

                    <nav aria-label="Главное меню">
                        <ul className="header__navWrapper">
                            <li className="header__navWrapper-item"><a href="#main" className="link">Главная</a></li>
                            <li className="header__navWrapper-item"><a href="#adventages" className="link">Преимущества</a></li>
                            <li className="header__navWrapper-item"><a href="#product" className="link">Продукты</a></li>
                            <li className="header__navWrapper-item"><a href="#rosmost" className="link">РОСМОСТ</a></li>
                            <li className="header__navWrapper-item"><a href="#contacts" className="link">Контакты</a></li>
                        </ul>
                    </nav>

                    <div className="header__btnWrapper">
                        <a  onClick={toggleLoginForm} className="header__btnWrapper__button btn">Вход</a>
                        <a  onClick={toggleRegistrationForm} className="header__btnWrapper__button btn">Регистрация →</a>
                    </div>
                </div>
            </div>
        </header>
    );
}

Header.propTypes = {
    toggleRegistrationForm: PropTypes.func.isRequired
};
Header.propTypes = {
    toggleLoginForm: PropTypes.func.isRequired
};


export default Header;
