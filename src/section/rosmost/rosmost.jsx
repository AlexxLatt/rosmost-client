import React, { useState, useEffect } from 'react';
import './rosmost.scss';
import bg from "../../img/bg(form).png";
import successIcon from "../../icons/success.png";
import warningIcon from "../../icons/warning.png";
import InputMask from "react-input-mask";
import axios from 'axios';

function Rosmost() {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showError, setShowError] = useState(false); // State to toggle error message display
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    document.body.style.overflow = isSubmitted || showError ? 'hidden' : '';
  }, [isSubmitted, showError]);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Regular expression to validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailPattern.test(value));
  };

  const toggleSubmitted = () => {
    setIsSubmitted(prevIsSubmitted => !prevIsSubmitted);
    setShowError(false); // Hide error message when toggling submission state
  };

  const toggleError = () => {
    setShowError(prevShowError => !prevShowError);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const tel = e.target.tel.value;

    try {
      const response = await axios.post('http://localhost:3000/contact', {
        contact: {
          name,
          email,
          tel
        }
      });

      if(response.status)
      if (response.status === 201) {
        setIsSubmitted(true);
        setErrorMessage('');
        console.log('Заявка успешно отправлена');
      } else {
        setErrorMessage('Email или телефон уже есть');
        toggleError(); // Show error message
        console.error('Error:', response);
      }
    } catch (error) {
      setErrorMessage('Email или телефон уже есть');
      toggleError(); // Show error message
      console.error('There was an error!', error);
    }
  };

  return (
    <section className="rosmost">
      <div className="container">
        <div className="rosmost__wrapper">
          <h2 className="rosmost__wrapper__title" id='rosmost'>Росмост</h2>
          <button className="rosmost__wrapper__button btn">Скачать презентацию</button>
          <div className="rosmost__wrapper__desc">Это цифровая платформа для грузоперевозок. Пользователям доступны продукты и сервисы для автоматизации закупки и исполнения перевозок: транспортные тендеры, спот-аукционы, TMS и трекинг. Цифровые продукты Росмост объединены в экосистему, интегрированы с ИТ-системами грузоотправителей, позволяют оптимизировать рутинные процессы и значительно снизить расходы на транспортную логистику.</div>
        </div>
        <form action="#" className="rosmost__form" onSubmit={handleSubmit}>
          <img src={bg} alt="упс..." className="rosmost__form__img" />
          <div className="rosmost__form__wrapper">
            <div className="rosmost__form__wrapper__title">Связаться с нами</div>
            <label className='rosmost__form__label' htmlFor="nameInput">Имя:<br/></label>
            <input type="text" id="nameInput" name="name" required />
            <label className='rosmost__form__label' htmlFor="emailInput">Email:</label>
            <input
              type="email"
              id="emailInput"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className={!isEmailValid ? 'invalid' : ''}
              required
            />
            {!isEmailValid && <div className="rosmost__error">Некорректный email</div>}
            <label className='rosmost__form__label' id="tel" htmlFor="phoneInput">Номер телефона:</label>
            <InputMask mask="+7 (999) 999 99-99" maskChar={null}>
              {(inputProps) => <input {...inputProps} id="tel" type="tel" name="tel" required />}
            </InputMask>
            <button className="rosmost__form__wrapper__button btn" disabled={!isEmailValid}>Оставить заявку</button>
          </div>
        </form>
        {isSubmitted && (
          <div className="rosmost__successContact">
            <div className="rosmost__successContact__form">
              <img src={successIcon} alt='...упс' className="rosmost__successContact__form__img" />
              <div className="rosmost__successContact__form__title">Вы оставили заявку</div>
              <button onClick={toggleSubmitted} className="rosmost__successContact__form__btn">ОК</button>
            </div>
          </div>
        )}
        {errorMessage && showError && (
          <div className="rosmost__errorContact">
            <div className="rosmost__errorContact__form">
              <img src={warningIcon} alt='...упс' className="rosmost__errorContact__form__img" />
              <div className="rosmost__errorContact__form__title">{errorMessage}</div>
              <button onClick={toggleError} className="rosmost__errorContact__form__btn">ОК</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Rosmost;
