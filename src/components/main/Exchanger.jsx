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
    const [coins, setCoins] = useState([
        {
            id: 1,
            value: 'IXI',
            label: 'IXI'
        },
        {
            id: 2,
            value: 'BIT',
            label: 'BIT'
        }
    ]);
    const [tokenSend, setTokenSend] = useState({
                defAmount: null,
                minAmount: null,
                maxAmount: null,
            });
    const [name, setName] = useState({
        nameSend: 'IXA',
        nameGet: 'BTC',
    });
    const [defSend, setdefSend] = useState({
        value: 'IXA',
        label: 'IXA',
        defaultValue: true
    });
    const [defGet, setdefGet] = useState({
        value: 'BTC',
        label: 'BTC',
        defaultValue: true
    });

    const [amountGet, setAmountGet] = useState({
        valueGet: null,
    });

    const changeAmount = (e) => {
        if (validChar.test(e.target.value)) 
        setTokenSend({...tokenSend, defAmount: e.target.value})
    };

    // const changeAmountBeck = (e) => {
    //     if (validChar.test(e.target.value)) 
    //     setAmountGet({ ...amountGet, valueGet: e.target.value })
    // }

    // const customChangeSalect = (ref) => {
    //     let res =  ref.current
    //     .getValue().map( v => {
    //         return v.value
    //     }).join('');
    //     return res
    // }

    // const change = (e) => {
    //     e.preventDefault();
    //     let changeSend = selectSend.current
    //     .getValue().map( v => {
    //         return v.value
    //     }).join('');
    //     let changeGet = selectGet.current
    //     .getValue().map( v => {
    //         return v.value
    //     }).join('');
    //     // name.nameSend = customChangeSalect (selectSend)
    //     // name.nameGet = customChangeSalect (selectGet)
    //     // let send = customChangeSalect(selectSend);
    //     // let get = customChangeSalect(selectGet)
    //     setName ({...name, nameSend : changeGet})
    //     setName ({...name, nameGet : changeSend})
    //     console.log(name.nameSend);
    //     console.log(name.nameGet);
    // };

    const fetchCoins = async () => {
        return await API.getAll().then( data => {
            setCoins([...data])
        });
    };

    const requestToken = async () => {
        return await API.getToken( name.nameSend, name.nameGet, tokenSend.defAmount ).then( data => {
            setAmountGet({...data})
            setTokenSend({...data})
        });
    };

    useEffect(() => {
        //fetchCoins();
    }, []);

    useEffect(() => {
        requestToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[name.nameSend, name.nameGet, tokenSend.defAmount]);

    return (
        <div className='main__exchanger'>
            <form className='exchanger__form' >

                {
                        tokenSend.defAmount > tokenSend.maxAmount 
                        ? <div className='exchanger__sent-amount'>{t('exchanger.maxAmount')} {tokenSend.maxAmount}</div> 
                        : <div className='exchanger__sent-amount'>{t('exchanger.minAmount')} {tokenSend.minAmount}</div>
                }

                <div className='exchanger__sent'>
                    <div className='exchanger__sent-control'>
                        <span>{t('exchanger.send')}</span>
                        <input 
                            type="text" 
                            title={t('exchanger.title')} 
                            inputMode='demicial'
                            placeholder={t('exchanger.enter')}
                            value = {tokenSend.defAmount}
                            onChange={e => changeAmount(e)}
                        />
                    </div>
                    <div 
                    // style={{backgroundImage:`url(${baseURL}/resources/images/${coins.tokenSend.nameSend})`}}
                    className='exchanger__img-sent'></div>
                    <Select 
                        ref={selectSend}
                        className='exchanger__select'
                        options={coins}
                        defaultValue={defSend}
                        onChange={e => setName({...name, nameSend: e.value })}
                    />
                </div>

                {/* <div className='exchanger__switch'>
                    <button onClick={change} >change</button>
                </div> */}

                <div className='exchanger__sent'>

                    <div className='exchanger__sent-control'>
                        <span>{t('exchanger.get')}</span>
                        <input 
                            type="text" 
                            title={t('exchanger.title')} 
                            placeholder="-"
                            readOnly
                            // onChange={ e => changeAmountBeck (e)} 
                            value={amountGet.valueGet} 
                        />
                    </div>

                    <div 
                    // style={{backgroundImage:`url(${baseURL}/resources/images/${coins.tokenSend.nameGet})`}}
                    className='exchanger__img-get'></div>

                    <Select 
                        ref={selectGet} 
                        className='exchanger__select'
                        options={coins}
                        defaultValue={defGet}
                        onChange={e => setName({...name, nameGet: e.value })}
                    />
                </div>

                    {
                        name.nameSend === name.nameGet
                        ?<div className='exchanger__massage'>
                            <span>{t('exchanger.same1')}</span>
                            <br/>
                            <span>{t('exchanger.same2')}</span>
                        </div>
                        :null
                    }
                    
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