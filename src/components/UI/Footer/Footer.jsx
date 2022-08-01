import {Link} from "react-router-dom";

function Footer() {
    return ( 
    <div className="footer">
        <div className="footer__container">
            <div className="footer__logo">
                <Link to='/main' className='logo__link'>
                    <div className='logo'></div>
                    <div className='logo__text'>
                        <span>Crypto</span>
                        Exchanger
                    </div>
                </Link>
            </div>
            <div className="footer__text">
                <div>
                © Crypto Exchanger – 2022
                </div>
                <a href="/">
                    <div className="telegramm" ></div>
                </a>
            </div>
        </div>
    </div> 
    )
}

export default Footer;