import React, { useEffect, useState } from 'react'
import styles from './ExchangeCoin.module.css'
import { RxTriangleDown, RxTriangleUp } from "react-icons/rx";

const ExchangeCoin = ({ currency }) => {

    const [cryptocurrency, setCryptoCurrency] = useState("bitcoin");
    const [defaultCurrency, setDefaultCurrency] = useState("To Sell");
    const [defaultCurrency_buy, setDefaultCurrency_buy] = useState("To Buy");
    const [cryptodata, setCryptoData] = useState("Bitcoin");
    const [dropdown, setDropdown] = useState(false);
    const [dropdown_buy, setDropdown_buy] = useState(false);
    const [id, setId] = useState([]);
    const [toSell, setToSell] = useState('');
    const [valueinbitcoin, setValueInBitcoin] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [cryptoUnit, setCryptoUnit] = useState('');
    const [cryptoUnit_buy, setCryptoUnit_buy] = useState('');
    const [currency_Buy, setCurrency_Buy] = useState('');
    const [final_to_buy, Set_final_to_buy] = useState('');


    const handleInputChange = (event) => {
        const enteredValue = event.target.value;
        // Check if enteredValue is numeric
        if (/^\d*\.?\d*$/.test(enteredValue)) {
            // If it's numeric, update the state
            setInputValue(enteredValue);
            // Log the value to the console
            console.log(enteredValue);
        }
    };

    const handleCryptoCurrency = (crypto_currency, dropdown, cryp_unit, to_sell) => {
        setDefaultCurrency(crypto_currency)
        setDropdown(true)
        setCryptoUnit(cryp_unit)
        setToSell(to_sell)
    }

    const handleCryptoCurrency_buy = (cryp_id, cryp_unit, to_buy) => {
        setDefaultCurrency_buy(cryp_id)
        setCryptoUnit_buy(cryp_unit)
        setCurrency_Buy(to_buy)
        setDropdown_buy(true)
    }

    useEffect(() => {
        const fetchCryptoData = async () => {
            try {
                const result = await fetch(`https://api.coingecko.com/api/v3/exchange_rates`)
                const response = await result.json()
                console.log(response)
                setCryptoData(response);
            } catch (error) {
                console.error(error);
            }
        }
        fetchCryptoData();
    }, []);

    useEffect(() => {
        const final_to_sell = (inputValue / toSell);
        setValueInBitcoin(final_to_sell)
    }, [inputValue, toSell])


    const handleExchangeChange = () => {
        const final_to_buyy = (valueinbitcoin * currency_Buy).toFixed(4);
        console.log(final_to_buyy)
        Set_final_to_buy(final_to_buyy)
    }

    // console.log(inputValue)

    // console.log(defaultCurrency_buy)
    // console.log(cryptoUnit_buy)
    // console.log(currency_Buy)
    // console.log(dropdown_buy)



    return (
        <div className="col-span-12 lg:col-span-6 border-2 border-solid shadow bg-white">
            <div className="flex justify-start py-8 px-5">

                <h4 className="font-medium text-xl lg:text-2xl">
                    Exchange Coins
                </h4>

            </div>

            {/* md,lg and upper devices */}
            <div className='hidden md:block'>
                <div className="grid grid-flow-col justify-between px-6 my-5">
                    <div className="flex items-center pr-4">

                        <p className="font-medium text-start text-red-600 text-lg lg:text-xl pt-5">
                            Sell
                        </p>
                    </div>
                    <div className="flex items-center mt-8">

                        <div>
                            <li className=" relative [&>.sub-menu]:hover:visible [&>.sub-menu]:hover:animate-popper-pop-in [&>.sub-menu]:hover:opacity-100" style={{ listStyle: 'none' }}>
                                <a className={`${styles.paddingleft}  relative justify-between flex text-2xl font-semibold items-center gap-x-2 leading-10 after:absolute after:bottom-[7px] after:left-0 after:h-[2px]   bg-slate-200 text-center text-gray-500  py-2 lg:text-xl rounded-lg after:transition-transform after:w-full after:origin-right hover:after:origin-left after:scale-x-0 hover:after:scale-x-100 w-52`} href="#">
                                    {defaultCurrency}
                                    {dropdown ? (< RxTriangleUp size={35} color="blue" />) : (<RxTriangleDown size={35} color="blue" />)}
                                </a>


                                <ul className="sub-menu invisible absolute z-20 flex w-52 flex-col bg-white dark:bg-gray-800 py-5  font-bold opacity-0 shadow-2xl transition-all h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" >
                                    {
                                        cryptodata && cryptodata.rates && Object.keys(cryptodata.rates).map(currency => {
                                            const { name, unit, value } = cryptodata.rates[currency];
                                            let cryp_id = `${name}`;
                                            let cryp_unit = `${unit}`;
                                            let to_sell = `${value}`;

                                            return (
                                                <li key={cryp_id} onClick={() => { handleCryptoCurrency(cryp_id, true, cryp_unit, to_sell) }}>
                                                    <div className="flex justify-center items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                        <input id={cryp_id} type="text" defaultValue={cryp_id} className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                        <label htmlFor={cryp_id} className="w-full py-2 ms-2 text-xl font-medium text-gray-900 rounded dark:text-gray-300">{cryp_id}</label>
                                                    </div>
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                            </li>
                        </div>

                    </div>
                    <div className='ps-4'>
                        <label htmlFor="enter_value" className="block mb-2  dark:text-white font-medium text-start text-gray-500 text-lg lg:text-xl">Enter Value</label>
                        <div className={`flex justify-center items-center ${styles.inputwidth}`}>
                            <input
                                type="text"
                                id="enter_value"

                                value={`${inputValue}`}
                                onChange={handleInputChange}
                                className={` bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                placeholder="Avl :030.5B9999"
                                required
                            />
                            <span>{cryptoUnit}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-flow-col justify-between px-6 my-5">
                    <div className="flex items-center">
                        <p className="font-medium text-start text-green-600 text-lg lg:text-xl">
                            Buy
                        </p>
                    </div>
                    <div className="flex items-center">
                        <li className=" relative [&>.sub-menu-buy]:hover:visible [&>.sub-menu-buy]:hover:animate-popper-pop-in [&>.sub-menu-buy]:hover:opacity-100" style={{ listStyle: 'none' }}>
                            <a className={`${styles.paddingleft} relative justify-between flex text-2xl font-semibold items-center gap-x-2 leading-10 after:absolute after:bottom-[7px] after:left-0 after:h-[2px]   bg-slate-200 text-center text-gray-500  py-2 lg:text-xl rounded-lg after:transition-transform after:w-full after:origin-right hover:after:origin-left after:scale-x-0 hover:after:scale-x-100 w-52`} href="#">
                                {defaultCurrency_buy}
                                {dropdown_buy ? (< RxTriangleUp size={35} color="blue" />) : (<RxTriangleDown size={35} color="blue" />)}
                            </a>


                            <ul className="sub-menu-buy invisible absolute z-20 flex w-52 flex-col bg-white dark:bg-gray-800 py-5  font-bold opacity-0 shadow-2xl transition-all h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" >
                                {
                                    cryptodata && cryptodata.rates && Object.keys(cryptodata.rates).map((currency, index) => {
                                        const { name, unit, value } = cryptodata.rates[currency];
                                        let cryp_id = `${name}`;
                                        let cryp_unit = `${unit}`;
                                        let to_buy = `${value}`;

                                        return (
                                            <li key={index} onClick={() => { handleCryptoCurrency_buy(cryp_id, cryp_unit, to_buy) }}>
                                                <div className="flex justify-center items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                    <input id={index} type="text" defaultValue={cryp_id} className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                    <label htmlFor={index} className="w-full py-2 ms-2 text-xl font-medium text-gray-900 rounded dark:text-gray-300">{cryp_id}</label>
                                                </div>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </li>

                    </div>
                    <div >

                        <div className={`flex justify-center items-center ${styles.inputwidth}`}>
                            <input
                                type="text"
                                id="enter_valuee"
                                defaultValue={final_to_buy}
                                readOnly
                                onChange={handleInputChange}
                                className={` bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                            />
                            <span>{cryptoUnit_buy}</span>
                        </div>

                    </div>
                </div>
            </div>
            {/* md,lg and upper devices */}

            {/* small screen devices */}

            <div className='block md:hidden overflow-hidden'>
                <div className='pt-3 flex justify-between items-center overflow-hidden'>
                    <div>
                        <p className="font-medium  ps-1 text-start text-red-600 text-lg lg:text-xl pt-5">
                            Sell
                        </p>
                    </div>
                    <div>
                        <li className=" relative [&>.sub-menu]:hover:visible [&>.sub-menu]:hover:animate-popper-pop-in [&>.sub-menu]:hover:opacity-100" style={{ listStyle: 'none' }}>
                            <a className={`${styles.paddingmobild} relative justify-between flex text-2xl font-semibold items-center gap-x-2 leading-10 after:absolute after:bottom-[7px] after:left-0 after:h-[2px]   bg-slate-200 text-center text-gray-500  py-2 lg:text-xl rounded-lg after:transition-transform after:w-full after:origin-right hover:after:origin-left after:scale-x-0 hover:after:scale-x-100`} href="#">
                                {defaultCurrency}
                                {dropdown ? (< RxTriangleUp size={35} color="blue" />) : (<RxTriangleDown size={35} color="blue" />)}
                            </a>


                            <ul className="sub-menu invisible absolute z-20 flex w-52 flex-col bg-white dark:bg-gray-800 py-5  font-bold opacity-0 shadow-2xl transition-all h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" >
                                {
                                    cryptodata && cryptodata.rates && Object.keys(cryptodata.rates).map(currency => {
                                        const { name, unit, value } = cryptodata.rates[currency];
                                        let cryp_id = `${name}`;
                                        let cryp_unit = `${unit}`;
                                        let to_sell = `${value}`;

                                        return (
                                            <li key={cryp_id} onClick={() => { handleCryptoCurrency(cryp_id, true, cryp_unit, to_sell) }}>
                                                <div className="flex justify-center items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                    <input id={cryp_id} type="text" defaultValue={cryp_id} className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                    <label htmlFor={cryp_id} className="w-full py-2 ms-2 text-xl font-medium text-gray-900 rounded dark:text-gray-300">{cryp_id}</label>
                                                </div>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </li>
                    </div>
                    <div className='pr-2'>
                        <label htmlFor="enter_value" className="block mb-2  dark:text-white font-medium text-start text-gray-500 text-lg lg:text-xl">Enter Value</label>
                        <div className={`flex justify-center items-center ${styles.inputwidth}`}>
                            <input
                                type="text"
                                id="enter_value"

                                value={`${inputValue}`}
                                onChange={handleInputChange}
                                className={` bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                placeholder="Avl :030.5B9999"
                                required
                            />
                            <span>{cryptoUnit}</span>
                        </div>
                    </div>
                </div>
                <div className='pt-3 flex justify-between items-center overflow-hidden'>
                    <div>
                        <p className="font-medium ps-1 text-start text-green-600 text-lg lg:text-xl">
                            Buy
                        </p>
                    </div>
                    <div >
                        <li className=" relative [&>.sub-menu-buy]:hover:visible [&>.sub-menu-buy]:hover:animate-popper-pop-in [&>.sub-menu-buy]:hover:opacity-100" style={{ listStyle: 'none' }}>
                            <a className={`${styles.paddingmobild} relative justify-between flex text-2xl font-semibold items-center gap-x-2 leading-10 after:absolute after:bottom-[7px] after:left-0 after:h-[2px]   bg-slate-200 text-center text-gray-500  py-2 lg:text-xl rounded-lg after:transition-transform after:w-full after:origin-right hover:after:origin-left after:scale-x-0 hover:after:scale-x-100`} href="#">
                                {defaultCurrency_buy}
                                {dropdown_buy ? (< RxTriangleUp size={35} color="blue" />) : (<RxTriangleDown size={35} color="blue" />)}
                            </a>


                            <ul className="sub-menu-buy invisible absolute z-20 flex w-52 flex-col bg-white dark:bg-gray-800 py-5  font-bold opacity-0 shadow-2xl transition-all h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" >
                                {
                                    cryptodata && cryptodata.rates && Object.keys(cryptodata.rates).map((currency, index) => {
                                        const { name, unit, value } = cryptodata.rates[currency];
                                        let cryp_id = `${name}`;
                                        let cryp_unit = `${unit}`;
                                        let to_buy = `${value}`;

                                        return (
                                            <li key={index} onClick={() => { handleCryptoCurrency_buy(cryp_id, cryp_unit, to_buy) }}>
                                                <div className="flex justify-center items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                    <input id={index} type="text" defaultValue={cryp_id} className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                    <label htmlFor={index} className="w-full py-2 ms-2 text-xl font-medium text-gray-900 rounded dark:text-gray-300">{cryp_id}</label>
                                                </div>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </li>
                    </div>
                    <div className='pr-2'>
                        <div className={`flex justify-center items-center ${styles.inputwidth}`}>
                            <input
                                type="text"
                                id="enter_valuee"
                                defaultValue={final_to_buy}
                                readOnly
                                onChange={handleInputChange}
                                className={` bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                            />
                            <span>{cryptoUnit_buy}</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* small screen devices */}


            {/* {updatedInputValue} */}

            {/* value in bitcoin */}

            <div className="flex pt-5 justify-center items-center">
                <button type="submit" onClick={() => { handleExchangeChange() }} className="text-white  bottom-6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg mb-6 text-xl px-7 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Exchange</button>
            </div>
        </div>
    )
}

export default ExchangeCoin