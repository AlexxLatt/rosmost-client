/* eslint-disable no-mixed-spaces-and-tabs */
import './firstWindow.scss';
import handshake from"../../icons/handshake.png";
import truck from"../../icons/truck.png";
import insurance from"../../icons/insurance.png";
function FirstWindow()  {
	return(

	   <section className="firstWindow">
        <div className="container">
 
            <div className="firstWindow__main" id='main'>
                <h1 className="firstWindow__main__title">Цифровая платформа<br/> для грузоперевозок</h1>
                <h2 className="firstWindow__main__subTitle">Экосистема сервисов для транспортной логистики Транспортные тендеры | Спот-аукционы | TMS | Трекинг грузов
                </h2>
            </div>
            <h2 id='adventages' className="adventages__title ">Преимущества</h2>
            <div className="firstWindow__infWrapper " >
                
                <div className="firstWindow__infWrapper__item">
                    <img src={handshake} alt="упс..." className="firstWindow__infWrapper__item__icons"/>
                    <div className="firstWindow__infWrapper__item__text">Более 6 000 перевозчиков уже работают с нами</div>
                </div>
                <div className="firstWindow__infWrapper__item">
                    <img src={truck} alt="упс..." className="firstWindow__infWrapper__item__icons"/>
                    <div className="firstWindow__infWrapper__item__text">Свыше 100 000<br/> рейсов в год</div>
                </div>
                <div className="firstWindow__infWrapper__item">
                    <img src={insurance} alt="упс..." className="firstWindow__infWrapper__item__icons"/>
                    <div className="firstWindow__infWrapper__item__textWhite">Своя служба безопасности</div>
                </div>
                
            </div>

        </div>
   
        


    </section>

	)
}
export default FirstWindow;