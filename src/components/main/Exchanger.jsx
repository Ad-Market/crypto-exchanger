import { useEffect, useMemo, useRef, useState } from 'react';
import API from '../../api/API';
import { useTranslation } from 'react-i18next';
import { validChar } from '../../global/globalValues';
import { useAmount } from '../../hooks/useAmount';

const Exchanger = () => {

    const [coins, setCoins] = useState([
        // {
        //     id: 1,
        //     image: '',
        //     name: 'BIT',
        //     value: 22877.30,
        // },
        // {
        //     id: 2,
        //     image: '',
        //     name: 'ETH',
        //     value: 1610.62,
        // },
    ]);
    const [coin, setCoin] = useState({});
    const [ amount, setAmount] = useState({
        minAmount: 1.3,
        maxAmount: 3
    });
    const [tokenIn, setTokenIn] = useState({
        value: 0,
        name: 'ILUXACOIN',
    });
    const [tokenOut, setTokenOut] = useState({
        value: 0,
        name: 'BTC',
    });
    const { t } = useTranslation();

    const fetchCoins = async () => {
        return await API.getAll().then( data => {
            setCoins([ ...coins, ...data ])
        });
    }

    // let tokIn
    // useMemo (() => {
    //     tokIn = amount.minAmount
    // }, [amount.minAmount])



    function sendCurrcy (e) {
        if (validChar.test(e.target.value)) 
        setTokenIn( {...tokenIn, value: e.target.value} );
        // setTokenIn( {...tokenIn, value: e.target.value.replace(/^(\d*\.)?\d+$/g, '')} );
        let formData = new FormData();
        formData.append('value', e.target.value);
        formData.append('nameIn', tokenIn.name);
        formData.append('nameOut', tokenOut.name);

        API.postCurrcy (formData).then((data)=> {
            setTokenOut({ ...tokenOut, ...data })
        })
    }

    // const fetchCurrcy = async () => {
    //     return await API.getCurrcy().then( data => {
            
    //     })
    // }

    const requestToken = async (id) => {
        return await API.getToken( id ).then( data => {
            setCoin({ ...coin, ...data })
        })
    }

    let update = true
    useEffect(() => {
        if (!update) return
        // eslint-disable-next-line react-hooks/exhaustive-deps
        update = false
        fetchCoins();
        // fetchCurrcy();
    },[]);

    return (
        <div className='main__exchanger'>
            <input 
            type="text" 
            title="Используйте числовой формат" 
            // pattern="^?[+-]?\d+(?:[.]\d+)?" 
            inputMode='demicial'
            placeholder="Enter amount"
            value = {tokenIn.value}
            onChange={ e => sendCurrcy(e)}
            />

            <input 
            type="text" 
            title="Используйте числовой формат" 
            // pattern="^?[+-]?\d+(?:[.]\d+)?" 
            // onChange={ e => setTokenOut( fetchCurrcy )} 
            defaultValue={tokenOut.value} 
            />

            <button></button>
            {coins.map( 
                coin => 
                    <div key={coin.id}>
                        <div>
                            {coin.name}
                        </div>
                        <div>
                            {coin.value}
                        </div>
                        <div>
                            {coin.image}
                        </div>
                    </div>
                )}
                <div>ILUXACOIN: {tokenIn.value}</div>
                <div>BTC: {tokenOut.value}</div>
                <div>Max Amount: {
                    tokenIn.value > 
                    amount.maxAmount ? 'max amount:' + 
                    amount.maxAmount : tokenOut.value
                }</div>
        </div>
    )
}

export default Exchanger;