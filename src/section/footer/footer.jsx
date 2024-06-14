/* eslint-disable react/no-unescaped-entities */
import"./footer.scss";
import logo from"../../icons/logo.png";
function Footer()  {
	return(

		<footer className="footer">
        <div className="container">
            <div className="footer__wrapper">
                <div className="footer__wrapper__item">
                    <div className="footer__wrapper__title">О Компании</div>
                     <nav  aria-label="О компании">
                        <ul className="footer__wrapper__list">
                            <li className="logoWrapper"><img src={logo} alt="РОСМОСТ icon"/> <h3>РОСМОСТ</h3></li>
                            <li>"Росмост" - это компания, специализирующаяся на межконтинентальных перевозках. Она предоставляет широкий спектр услуг по доставке грузов и пассажиров между континентами, обеспечивая надежные и эффективные транспортные решения.</li>
                        </ul>
                     </nav>
                </div>
                <nav  aria-label="Документы">
                    <div className="footer__wrapper__item">
                        <div className="footer__wrapper__title">Документы</div>
                        <ul className="footer__wrapper__list">
                            <li><a href="#">Политика конфиденциальности</a></li>
                            <li><a href="#">Пользовательское соглашение</a></li>
                            <li><a href="#">Лицензионное соглашение</a></li>
                            <li><a href="#">Оферта</a></li>
                        </ul>
                    </div>
                </nav>
                <nav aria-label="Контакты" >
                    <div className="footer__wrapper__item" id="contacts">
                        <div className="footer__wrapper__title">Контакты</div>
                        <ul className="footer__wrapper__list">
                            <li  aria-label="телефон"className="tel"><div href="#">+7 (900) 228-00-97</div></li>
                            <li aria-label="адрес" className="adres"><div href="#">Москва, Ленинградский проспект, д. 37, корп. 3</div></li>
                            <li aria-label="email" className="email"><div href="#">info@rosmost.ru</div></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    </footer>

	)
}
export default Footer;