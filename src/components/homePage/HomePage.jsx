import React, { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { RxTriangleDown } from "react-icons/rx";
import { RxTriangleUp } from "react-icons/rx";
import MarketCap from "../marketCap/MarketCap";
import styles from './HomePage.module.css';
import PortFolio from "../portFolio/PortFolio";
import ChartDashboard from '../chartDashboard/ChartDashboard';
import Carousel from "../chartDashboard/Carousal";
import ExchangeCoin from "../exchangeCoin/ExchangeCoin";


const HomePage = () => {


    const [topcurrency, setTopCurrency] = useState("INR")
    const [topcurrency_dropdown, setTopCurrency_DropDown] = useState(false)
    const [currency_symbol, setCurrency_Symbol] = useState("₹")


    const handleTopCurrency = (top_currency, dropdown, currencySymbol) => {
        setTopCurrency(top_currency)
        setTopCurrency_DropDown(true)
        setCurrency_Symbol(currencySymbol)
    }

    const [searchTerm, setSearchTerm] = useState('');
    const [dummyImg, setDummyImg] = useState('');
    const [searchId, setSearchId] = useState('');


    // search bar entry
    const [searchTermInput, setSearchTermInput] = useState('');
    const [inputResult, setInputResult] = useState([]);


    useEffect(() => {
        const timerId = setTimeout(() => {
            if (searchTerm !== "") {
                setSearchTermInput(searchTerm)
            }
        }, 1500)

        return () => {
            clearTimeout(timerId)
        }

    }, [searchTerm])

    const handleChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
    };

    const handleInput = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        if (value === '') {
            setSearchTermInput('');
            setSearchId('');
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch(`https://api.coingecko.com/api/v3/search?query=${searchTermInput}`)
                const response = await result.json()
                setInputResult(response.coins);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [searchTermInput]);

    console.log(inputResult)

    // search bar entry

    const handlesearch = (id) => {

        setSearchId(id)
    }


    console.log(searchId)


    return (
        <>
            <section className="container mx-auto overflow-hidden">

                <div className="p-5  my-5  grid grid-cols-12 gap-4" style={{ backgroundColor: '#f6f6fd' }}>

                    {/* left side of dashboard */}

                    <div className="col-span-12 xl:col-span-9" style={{ backgroundColor: '#f6f6fd' }}>
                        <div className="grid grid-cols-12 gap-4" >

                            {/* choose base currency */}

                            <div className={`${styles.form_selecttt} col-span-4 lg:col-span-2 p-2 border-2 border-solid shadow bg-white`}>
                                <li className=" relative [&>.sub-menu]:hover:visible [&>.sub-menu]:hover:animate-popper-pop-in [&>.sub-menu]:hover:opacity-100" style={{ listStyle: 'none' }}>
                                    <a className="relative justify-between  align-middle items-center flex text-xl font-semibold pt-5  leading-10 after:absolute after:bottom-[7px] after:left-0 after:h-[2px] after:bg-white after:transition-transform after:w-full  after:scale-x-0 hover:after:scale-x-100 " href="#">
                                        <div>{topcurrency}</div>
                                        <div className="ms-8">{topcurrency_dropdown ? (< RxTriangleUp size={35} color="blue" />) : (<RxTriangleDown size={35} color="red" />)}</div>
                                    </a>

                                    <ul className="sub-menu invisible absolute z-20 flex w-52 flex-col bg-white dark:bg-gray-800 py-5  font-bold opacity-0 shadow-2xl transition-all mt-12 h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" >
                                        <li onClick={() => { handleTopCurrency("INR", true, "₹") }}>
                                            <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                <p className="w-full py-2 ms-2 text-xl font-medium text-gray-900 rounded dark:text-gray-300">INR</p>
                                            </div>
                                        </li>
                                        <li onClick={() => { handleTopCurrency("GBP", true, "£") }}>
                                            <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                <p className="w-full py-2 ms-2 text-xl font-medium text-gray-900 rounded dark:text-gray-300">GBP</p>
                                            </div>
                                        </li>
                                        <li onClick={() => { handleTopCurrency("EUR", true, "€") }}>
                                            <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                <p className="w-full py-2 ms-2 text-xl font-medium text-gray-900 rounded dark:text-gray-300">EUR</p>
                                            </div>
                                        </li>
                                        <li onClick={() => { handleTopCurrency("JPY", true, "¥") }}>
                                            <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                <p className="w-full py-2 ms-2 text-xl font-medium text-gray-900 rounded dark:text-gray-300">JPY</p>
                                            </div>
                                        </li>

                                    </ul>
                                </li>
                            </div>

                            {/* choose base currency */}

                            {/* search bar */}

                            <div className="col-span-8 lg:col-span-10 border-2 border-solid shadow  bg-white">


                                <form className={`${styles.height}`}>
                                    <div className={`relative ${styles.height}`} style={{ height: '100%' }}>
                                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                            <IoSearchSharp size={25} />
                                        </div>
                                        <input
                                            type="search"
                                            id="default-search"
                                            className="block w-full p-4 pl-16 text-xl text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Search by coin"
                                            value={searchTerm}
                                            onChange={handleChange}
                                            onInput={handleInput}
                                            style={{ height: '100%' }}
                                            autoComplete="off"
                                        />

                                    </div>
                                </form>

                            </div>

                            {searchTermInput && (
                                <div className="col-span-12 px-5">
                                    <div className="grid grid-cols-12 gap-4 overflow-y-auto" style={{ maxHeight: '200px' }}>
                                        <div className="col-span-4 md:col-span-4 lg:col-span-2"></div>
                                        <div className="col-span-8 md:col-span-8 lg:col-span-10">


                                            {inputResult && inputResult.length > 0 ? (
                                                inputResult.map((item, index) => (

                                                    <div onClick={() => { handlesearch(item.id) }} key={index} className="flex justify-start pl-5  gap-3 items-center pb-2 bg-orange-100 py-1 hover:bg-orange-200" style={{ cursor: 'pointer' }}>
                                                        <img src={item.thumb} alt="almabetter" height={30} width={30}></img >
                                                        <p className="font-medium text-slate-950 pl-10">{item.name}</p>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="col-span-12 px-5 text-center flex justify-center items-center">
                                                    <div id="loader"></div>
                                                </div>
                                            )}



                                        </div>
                                    </div>
                                </div>
                            )}




                            {/* search bar */}

                            {/* Carousel section */}
                            <div className="col-span-12  border-2 border-solid shadow py-5 bg-white">

                                <div className={`${styles.height}`}>
                                    <Carousel currency={topcurrency} symbol={currency_symbol} />
                                </div>

                            </div>
                            {/* Carousel section */}

                            {/* chartdashboard */}

                            <ChartDashboard currency={topcurrency} />

                            {/* chartdashboard */}

                            {/* portfolio */}

                            <PortFolio currency={topcurrency} symbol={currency_symbol} />

                            {/* portfolio */}

                            {/* Exchange coin section  */}

                            <ExchangeCoin currency={topcurrency} />

                            {/* Exchange coin section  */}



                        </div>
                    </div>

                    {/* left side of dashboard */}


                    {/* right side of dashboard */}

                    <div className="col-span-12 xl:col-span-3 bg-white px-5 py-7 border-2 border-solid shadow">
                        <MarketCap currency={topcurrency} symbol={currency_symbol} id={searchId} />
                    </div>

                    {/* right side of dashboard */}

                </div>

            </section>
        </>
    )

}

export default HomePage
