import {Link} from "react-router-dom";
import cl from './Header.module.css';
import i18n from 'i18next';
import {useState, useRef} from 'react';
import { useOutside } from "../../../hooks/useOutside";

const Header = () => {
    
    const outsideRef = useRef(null);
    const [modal, setModal] = useState('none');
    const [lang, setLang] = useState('ru');

    const selectLeng = [cl.selected__lang];

    
    const changeLang = (e) => {
        i18n.changeLanguage(e)
        setLang(e)
        setModal('none')
    }

    if (lang === 'ru') {
        selectLeng.push(cl.ru)
    } else {
        selectLeng.push(cl.en)
    };

    const activeModal = () => {
        setModal('flex')
    };

    const activeBurger = () => {
        const tog = document.getElementById('toggleRef');
        const togled = document.getElementById('togledRef');
        tog.classList.toggle('active');
        togled.classList.toggle('active');
        document.body.classList.toggle('lock');
}

    useOutside (outsideRef, setModal)

    return (
            <header className={cl.content}>
                <div className={cl.container}>
                    <div className={cl.body}>
                        <Link to='/main' className={cl.logo__link}>
                            <div className={cl.logo}></div>
                            <div className={cl.logo__text}>
                                <span>Crypto</span>
                                Exchanger
                            </div>
                        </Link>

                        <div ref={outsideRef} className={cl.menu}>

                            <nav id="togledRef" className={cl.burg__body}>
                                <ul className={cl.burg__list}>
                                    <li>
                                        <Link 
                                        className={cl.burg__link} 
                                        to='/main'
                                        >Main
                                        </Link>
                                    </li>
                                    <li>
                                        <Link 
                                        className={cl.burg__link} 
                                        to='/main'
                                        >Main
                                        </Link>
                                    </li>
                                    <li>
                                        <Link 
                                        className={cl.burg__link} 
                                        to='/main'
                                        >Main
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                            <div className={cl.lang__menu}>
                            <div 
                                className={selectLeng.join(' ')}
                                onClick = {activeModal}>
                                </div>

                                <ul 
                                style={{display: modal}}
                                className={cl.selected__list}
                                >
                                    <li

                                    className={cl.en}
                                    onClick={e => changeLang("en")}
                                    >
                                    </li>
                                    <li 

                                    className={cl.ru}
                                    onClick={e => changeLang("ru")}
                                    >
                                    </li>
                                </ul>
                            </div>
                            

                            <div id="toggleRef" onClick={activeBurger} className={cl.burg__tog}>
                                    <span></span>
                            </div>

                        </div>
                    </div>
                </div>
                    
            </header>
    );
};

export default Header;