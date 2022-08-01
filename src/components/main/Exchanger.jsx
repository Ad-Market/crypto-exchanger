import { useEffect, useState, useRef } from 'react';
import API from '../../api/API';
import { useTranslation } from 'react-i18next';
import { validChar } from '../../global/globalValues';
import Select from 'react-select';
import { baseURL } from '../../global/globalValues';

const Exchanger = () => {

    const selectSend = useRef(null);
    const selectGet = useRef(null);
    const { t } = useTranslation();
    const coins = [
        {
            id: 1,
            value: 'BTC',
            label: 'Bitcoin'
        },
        {
            id: 2,
            value: 'ETH',
            label: 'Ethereum'
        },
        {
            id: 3,
            value: 'XTZ',
            label: 'Tezos'
        },
        {
            id: 4,
            value: 'XLM',
            label: 'Stellar'
        },
        {
            id: 5,
            value: 'DOGE',
            label: 'Dogecoin'
        },
        {
            id: 6,
            value: 'TRX',
            label: 'Tron'
        },
        {
            id: 7,
            value: 'XRP',
            label: 'Ripple'
        },
        {
            id: 8,
            value: 'ADA',
            label: 'Cardano'
        },
        {
            id: 9,
            value: 'LTC',
            label: 'Litecoin'
        },
    ];
    const coinsGet = [
        {
            id: 1,
            value: 'USDT',
            label: 'Tether'
        },
        {
            id: 2,
            value: 'USDC',
            label: 'USD coin'
        },
        {
            id: 3,
            value: 'BUSD',
            label: 'Binance USD'
        }
    ];
    const defSend = {
        value: 'BTC',
        label: 'Bitcoin',
        defaultValue: true
    };
    const defGet = {
        value: 'USDT',
        label: 'Tether',
        defaultValue: true
    };

    const [name, setName] = useState({
        nameSend: 'BTC',
        nameGet: 'USDT',
    });

    const [tokenSend, setTokenSend] = useState({
                minAmount: null,
                maxAmount: null,
            });

    const [amountSend, setAmountSend] = useState(0.1);
    const [amountGet, setAmountGet] = useState(null);
    const [isForward, setIsisForward] = useState(true);
    const [isBeck, setIsBeck] = useState(false);

    const chnageAmountSend = (e) => {
        if (validChar.test(e.target.value)) 
        setAmountSend(e.target.value)
        setIsisForward(true)
        setIsBeck(false)
    };

    const chnageAmountGet = (e) => {
        if (validChar.test(e.target.value)) 
        setAmountGet(e.target.value)
        setIsBeck(true)
        setIsisForward(false)
    }

    const requestToken = async () => {
        return await API.getToken( name.nameSend, name.nameGet, amountSend, isForward ).then( data => {
            setAmountGet(data.amountSend)
            setTokenSend({...tokenSend, minAmount: data.minAmount, maxAmount: data.maxAmount})
        });
    };

    const requestTokenBeck = async () => {
        return await API.getTokenBeck( name.nameGet, name.nameSend, amountGet, isBeck ).then( data => {
            setAmountSend(data)
        });
    }

    useEffect(() => {
        requestToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[name.nameSend, name.nameGet, amountSend, isForward]);

    useEffect(() => {
        requestTokenBeck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[name.nameSend, name.nameGet, amountGet, isBeck]);

    return (
        <div className='main__exchanger'>
            <form className='exchanger__form' >

                {
                    amountSend < tokenSend.minAmount 
                    ? <div className='exchanger__sent-amount' style={{color:`#ff0000`}}>{t('exchanger.minAmount')} {tokenSend.minAmount}</div>
                    : <div className='exchanger__sent-amount' style={{color:`#ff8000`}}>{t('exchanger.maxAmount')} {tokenSend.maxAmount}</div>
                }

                <div className='exchanger__sent'>

                    <div className='exchanger__sent-control'>
                        <span>{t('exchanger.send')}</span>
                        <input 
                            type="text" 
                            title={t('exchanger.title')} 
                            inputMode='demicial'
                            placeholder={t('exchanger.enter')}
                            value = {amountSend}
                            onChange={e => chnageAmountSend(e)}
                        />
                    </div>

                    <div 
                    // style={{backgroundImage:`url(${baseURL}/resources/images/${name.nameSend})`}}
                    className='exchanger__img-sent'
                    ></div>

                    <Select 
                        ref={selectSend}
                        className='exchanger__select'
                        options={coins}
                        defaultValue={defSend}
                        onChange={e => setName({...name, nameSend: e.value })}
                    />
                </div>

                <div className='exchanger__sent'>

                    <div className='exchanger__sent-control'>
                        <span>{t('exchanger.get')}</span>
                        <input 
                            type="text" 
                            title={t('exchanger.title')} 
                            placeholder="-"
                            // readOnly
                            onChange={ e => chnageAmountGet (e)} 
                            value={amountGet} 
                        />
                    </div>

                    <div 
                    // style={{backgroundImage:`url(${baseURL}/resources/images/${name.nameGet})`}}
                    className='exchanger__img-get'
                    ></div>

                    <Select 
                        ref={selectGet} 
                        className='exchanger__select'
                        options={coinsGet}
                        defaultValue={defGet}
                        onChange={e => setName({...name, nameGet: e.value })}
                    />
                </div>

                    <span>{t('exchanger.wallet')}</span>
                    <div className='exchanger__payment'>
                        <input
                            type='text'
                            title={t('exchanger.titlePayment')}
                            placeholder={t('exchanger.payout')}
                        />
                    </div>

                <div className='exchanger__button'>
                    <button type='submit' >{t('exchanger.button')}</button>
                </div>
            </form>
        </div>
    )
}

export default Exchanger;