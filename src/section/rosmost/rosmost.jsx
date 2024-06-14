import './rosmost.scss';
import bg from "../../img/bg(form).png";
import InputMask from "react-input-mask";
function Rosmost() {

  return (
    <section className="rosmost">
      <div className="container">
        <div className="rosmost__wrapper">
          <h2 className="rosmost__wrapper__title" id='rosmost'>Росмост</h2>
          <button className="rosmost__wrapper__button btn">Скачать презентацию</button>
          <div className="rosmost__wrapper__desc">Это цифровая платформа для грузоперевозок. Пользователям доступны продукты и сервисы для автоматизации закупки и исполнения перевозок: транспортные тендеры, спот-аукционы, TMS и трекинг. Цифровые продукты Росмост объединены в экосистему, интегрированы с ИТ-системами грузоотправителей, позволяют оптимизировать рутинные процессы и значительно снизить расходы на транспортную логистику.</div>
        </div>
        <form action="#" className="rosmost__form">
          <img src={bg} alt="упс..." className="rosmost__form__img" />
          <div className="rosmost__form__wrapper">
            <div className="rosmost__form__wrapper__title">Зарегистрироваться</div>
            <label htmlFor="nameInput">Имя:<br/></label>
            <input type="text" id="nameInput" name="name" />
            <label htmlFor="emailInput">Email:</label>
            <input type="email" id="emailInput" name="email" />
            <label htmlFor="textInput">Компания:</label>
            <input type="text" id="textInput" name="text" />
            <label id="tel"htmlFor="phoneInput">Номер телефона:</label>
             <InputMask mask="+7 (999) 999 99-99" maskChar={null}>
              {(inputProps) => <input {...inputProps} id="tel"  type="tel"  />}
            </InputMask>
            <button  className="rosmost__form__wrapper__button btn">Зарегистрироваться</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Rosmost;
