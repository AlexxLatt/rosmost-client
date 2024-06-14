/* eslint-disable no-mixed-spaces-and-tabs */
import"./platformProducts.scss";
import iconProduct_1 from "../../icons/iconProduct(1).png";
import iconProduct_2 from "../../icons/iconProduct(2).png";
import iconProduct_3 from "../../icons/iconProduct(3).png";
import iconProduct_4 from "../../icons/iconProduct(4).png";
function PlatformProducts()  {
	return(

	  <section className="platformProducts">
        <div className="container">
            <h2 className="platformProducts__title" id="product">Продукты платформы</h2>
            <div className="platformProducts__wrapper">
                <div className="platformProducts__wrapper__item">
                    <img src={iconProduct_1} alt="упс..." className="platformProducts__wrapper__item__icon"/>
                    <div className="platformProducts__wrapper__item__title">Транспортные тендеры</div>
                    <div className="platformProducts__wrapper__item__descr">•	Прозрачность процессов закупки<br/>
                                                                        •	Автоматизация распределения объемов<br/>
                                                                        •	Консолидированная отчетность<br/>
                                                                        •	Хранение результатов и истории торгов
                </div>
                </div>
                <div className="platformProducts__wrapper__item">
                    <img src={iconProduct_2} alt="упс..." className="platformProducts__wrapper__item__icon"/>
                    <div className="platformProducts__wrapper__item__title">Спот-аукционы</div>
                    <div className="platformProducts__wrapper__item__descr">•	Оперативное закрытие срочных перевозок<br/>
                                                                        •	Три вида аукционов: на понижение, первого согласия, без стартовой цены
                </div>
                </div>
                <div className="platformProducts__wrapper__item">
                    <img src={iconProduct_3} alt="упс..." className="platformProducts__wrapper__item__icon"/>
                    <div className="platformProducts__wrapper__item__title">TMS / Система управления<br/> перевозками</div>
                    <div className="platformProducts__wrapper__item__descr">•	Фиксация и учет договорных условий<br/>
                                                                        •	Автоматизация логистических процессов<br/>
                                                                        •	Возможность настройки под конкретные задачи
                </div>
                </div>
                <div className="platformProducts__wrapper__item">
                    <img src={iconProduct_4} alt="упс..." className="platformProducts__wrapper__item__icon"/>
                    <div className="platformProducts__wrapper__item__title">Трекинг грузов</div>
                    <div className="platformProducts__wrapper__item__descr">Все виды отслеживания:<br/>
                                                                            •	Бортовые блоки<br/>
                                                                            •	GSM-связь
                                                                            
                    </div>
                </div>
            </div>
        </div>
    </section>

	)
}
export default PlatformProducts;