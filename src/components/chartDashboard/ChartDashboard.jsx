import { useEffect, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { RxTriangleDown, RxTriangleUp } from "react-icons/rx";
import { numberWithCommas } from '../../services/regix';
import { chartDays } from '../../services/data';
import SelectButton from './SelectButton';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import moment from "moment";
import { Line, Bar } from "react-chartjs-2";
import { BsBorderWidth } from "react-icons/bs";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

const ChartDashboard = ({ currency, symbol }) => {

    const [cryptocurrency, setCryptoCurrency] = useState("Cryptocurrency")
    const [dropdown, setDropdown] = useState(false)
    const [historicData, setHistoricData] = useState([]);
    const [coinChartData, setCoinChartData] = useState([])
    const [days, setDays] = useState(1);
    const [flag, setflag] = useState(false);
    const [id, setId] = useState([])
    const [myId, setMyId] = useState("bitcoin")
    const [charttype, setChartType] = useState('line')

    const handleCryptoCurrency = (crypto_currency, dropdown) => {
        setCryptoCurrency(crypto_currency)
        setDropdown(true)
        setMyId(crypto_currency)
    }

    // const handleCryptoCurrency = (crypto_currency, dropdown) => {
    //     // If the selected cryptocurrency is already in the list, remove it
    //     if (cryptocurrency.includes(crypto_currency)) {
    //         setCryptoCurrency(cryptocurrency.filter(item => item !== crypto_currency));
    //     } else {
    //         // Otherwise, add it to the list
    //         setCryptoCurrency([...cryptocurrency, crypto_currency]);
    //     }
    //     setDropdown(true);
    //     setMyId(cryptocurrency[0]); // Set the first cryptocurrency as the active one for now
    // }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
                const response = await result.json()
                setId(response);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [currency]);


    const fetchHistoricData = async () => {

        try {
            // const result = await fetch(`https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=inr&days=1`)
            const result = await fetch(`https://api.coingecko.com/api/v3/coins/${myId}/market_chart?vs_currency=${currency}&days=${days}`)
            const response = await result.json()
            setflag(true);
            console.log('my history response')
            console.log(response)

            // Limiting the length of coinChartData to 89
            // const limitedChartData = response.prices.slice(0, 20).map(value => ({ x: value[0], y: value[1].toFixed(2) }));
            const limitedChartData = response.prices.map(value => ({ x: value[0], y: value[1].toFixed(2) }));
            setCoinChartData(limitedChartData);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchHistoricData();
    }, [days, currency, myId]);

    console.log('sethistory')
    console.log(historicData)

    const arrayLength = coinChartData.length;
    console.log(arrayLength); // This will log the length of the array


    const options = {
        responsive: true
    }
    const data = {
        labels: coinChartData.map(value => moment(value.x).format('MMM')),
        // labels: ['mon', 'tues', 'wed'],
        datasets: [
            {
                fill: true,
                label: id,
                data: coinChartData.map(val => val.y),
                // label: 'Branch',
                // data: [3, 6, 9],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }
        ]
    }

    const data_bar_horizontal = {
        labels: coinChartData.map(value => moment(value.x).format('MMM DD')),
        // labels: ['mon', 'tues', 'wed'],
        datasets: [
            {
                label: id,
                data: coinChartData.map(val => val.y),
                // label: 'Branch',
                // data: [3, 6, 9],
                backgroundColor: '#61DBFB',
            }
        ]
    }

    const data_bar_vertical = {
        labels: coinChartData.map(value => moment(value.x).format('MMM DD')),
        // labels: ['mon', 'tues', 'wed'],
        datasets: [
            {
                label: id,
                // label: 'Branch',
                // data: [3, 6, 9],
                data: coinChartData.map(val => val.y),
                backgroundColor: '#61DBFB',
                borderWidth: 1
            },

        ]
    }

    const options_bar_horizontal = {
        indexAxis: 'y',
        layout: {
            padding: 10
        }
    }

    const options_bar_vertical = {

    }

    const handleChartType = (type) => {
        setChartType(type)
    }


    return (
        <div className="col-span-12 border-2 border-solid shadow bg-white">

            {/* lg ,xl ,xxl   select date and cryptocurrency,chart type */}

            <div className="hidden lg:block">
                <div className="grid grid-cols-12 py-8 ">

                    <div
                        className="flex gap-5 items-center lg:col-span-6 pl-4 text-xl"
                    >
                        {chartDays && chartDays.map((day) => (
                            <SelectButton
                                key={day.value}
                                onClick={() => {
                                    setDays(day.value);
                                    setflag(false);
                                }}
                                selected={true}

                            >
                                <p className="text-xl">{day.label}</p>
                            </SelectButton>
                        ))}
                    </div>


                    <div className="flex items-center  gap-6 lg:col-span-6 pl-5">
                        <div>
                            <li className=" relative [&>.sub-menu]:hover:visible [&>.sub-menu]:hover:animate-popper-pop-in [&>.sub-menu]:hover:opacity-100" style={{ listStyle: 'none' }}>
                                <a className="relative justify-between flex text-xl font-semibold items-center gap-x-2 leading-10 after:absolute after:bottom-[7px] after:left-0 after:h-[2px] after:bg-white after:transition-transform after:w-full after:origin-right hover:after:origin-left after:scale-x-0 hover:after:scale-x-100 w-52" href="#">
                                    {cryptocurrency}
                                    {dropdown ? (< RxTriangleUp size={35} color="blue" />) : (<RxTriangleDown size={35} color="blue" />)}
                                </a>
                          
                                <ul className="sub-menu invisible absolute z-20 flex w-52 flex-col bg-white dark:bg-gray-800 py-5  font-bold opacity-0 shadow-2xl transition-all h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" >
                                    {
                                        id && id.map((value) => {
                                            let cryp_id = value.id;
                                            return (
                                                <li key={value.symbol} onClick={() => { handleCryptoCurrency(cryp_id, true) }}>
                                                    <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                        <input id={value.id} type="checkbox" value={value.id} className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                        <label htmlFor={value.id} className="w-full py-2 ms-2 text-xl font-medium text-gray-900 rounded dark:text-gray-300">{value.id}</label>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }

                                </ul> 


                                {/* <ul className="sub-menu invisible absolute z-20 flex w-52 flex-col bg-white dark:bg-gray-800 py-5  font-bold opacity-0 shadow-2xl transition-all h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" >
                                    <li onClick={() => { handleCryptoCurrency("bitcoin", true) }}>
                                        <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                            <input id={"bitcoin"} type="checkbox" value={"bitcoin"} className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label htmlFor={"bitcoin"} className="w-full py-2 ms-2 text-xl font-medium text-gray-900 rounded dark:text-gray-300">bitcoin</label>
                                        </div>
                                    </li>
                                    <li onClick={() => { handleCryptoCurrency("tether", true) }}>
                                        <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                            <input id={"tether"} type="checkbox" value={"tether"} className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label htmlFor={"tether"} className="w-full py-2 ms-2 text-xl font-medium text-gray-900 rounded dark:text-gray-300">tether</label>
                                        </div>
                                    </li>
                                    <li onClick={() => { handleCryptoCurrency("Ethereum", true) }}>
                                        <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                            <input id={"Ethereum"} type="checkbox" value={"Ethereum"} className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label htmlFor={"Ethereum"} className="w-full py-2 ms-2 text-xl font-medium text-gray-900 rounded dark:text-gray-300">Ethereum</label>
                                        </div>
                                    </li>

                                </ul> */}





                            </li>
                        </div>


                        <div>
                            <li className=" relative [&>.sub-menu]:hover:visible [&>.sub-menu]:hover:animate-popper-pop-in [&>.sub-menu]:hover:opacity-100" style={{ listStyle: 'none' }}>
                                <a className="relative justify-between  flex text-xl font-semibold items-center  leading-10 after:absolute after:bottom-[7px] after:left-0 after:h-[2px] after:bg-white after:transition-transform after:w-full  after:scale-x-0 hover:after:scale-x-100 " href="#">
                                    <div>Chart Type</div>
                                    <div className="ms-8">< RxTriangleUp size={35} color="blue" /></div>
                                </a>

                                <ul className="sub-menu invisible absolute z-20 flex w-52 flex-col bg-white dark:bg-gray-800 py-5  font-bold opacity-0 shadow-2xl transition-all h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" >
                                    <li onClick={() => { handleChartType("line") }}>
                                        <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                            <p className="w-full py-2 ms-2 text-xl font-medium text-gray-900 rounded dark:text-gray-300">Line</p>
                                        </div>
                                    </li>
                                    <li onClick={() => { handleChartType("vertical bar") }}>
                                        <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                            <p className="w-full py-2 ms-2 text-xl font-medium text-gray-900 rounded dark:text-gray-300">Vertical Bar</p>
                                        </div>
                                    </li>
                                    <li onClick={() => { handleChartType("horizontal bar") }}>
                                        <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                            <p className="w-full py-2 ms-2 text-xl font-medium text-gray-900 rounded dark:text-gray-300">Horizontal Bar</p>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </div>
                    </div>

                </div>
            </div>

            {/* lg ,xl ,xxl   select date and cryptocurrency,chart type */}


            {/* sm,md  select date and cryptocurrency,chart type */}

            <div className="block lg:hidden">
                <div className="grid grid-cols-12 py-8 ">


                    <div className="flex gap-5 items-center justify-center col-span-12 px-5">
                        {chartDays && chartDays.map((day) => (
                            <SelectButton
                                key={day.value}
                                onClick={() => {
                                    setDays(day.value);
                                    setflag(false);
                                }}
                                selected={true}

                            >
                                <p className="text-xs">{day.label}</p>
                            </SelectButton>
                        ))}
                    </div>

                    <div className="flex gap-5 mt-5 items-center justify-center col-span-12">
                        <button type="button" className="btn-outline-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border border-blue-700 hover:bg-blue-700 text-blue-700 hover:text-white text-xl font-semibold py-2 px-4 rounded">1Y</button>
                        <button type="button" className="btn-outline-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border border-blue-700 hover:bg-blue-700 text-blue-700 hover:text-white text-xl font-semibold py-2 px-4 rounded">
                            <FaRegCalendarAlt size={27} />
                        </button>
                    </div>




                    <div className="flex pl-4 items-center justify-center pt-8  gap-4 col-span-12">
                        <div>
                            <li className=" relative [&>.sub-menu]:hover:visible [&>.sub-menu]:hover:animate-popper-pop-in [&>.sub-menu]:hover:opacity-100" style={{ listStyle: 'none' }}>
                                <a className="relative inline-flex text-lg font-semibold items-center gap-x-2 leading-10 after:absolute after:bottom-[7px] after:left-0 after:h-[2px] after:bg-white after:transition-transform after:w-full after:origin-right hover:after:origin-left after:scale-x-0 hover:after:scale-x-100" href="#">
                                    Cryptocurrency
                                    <svg role="img" className="h-2 w-2 rotate-90 fill-white">
                                        <use xlinkHref="assets/img/yt1/sprite.svg#arrow-right"></use>
                                    </svg>
                                </a>

                                <ul className="sub-menu invisible absolute z-20 flex w-52 flex-col bg-white dark:bg-gray-800 py-5  font-bold opacity-0 shadow-2xl transition-all h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" >
                                    <li>
                                        <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                            <input id="checkbox-item-11" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label htmlFor="checkbox-item-11" className="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Bonnie Green</label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                            <input id="checkbox-item-12" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label htmlFor="checkbox-item-12" className="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Jese Leos</label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                            <input id="checkbox-item-13" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label htmlFor="checkbox-item-13" className="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Michael Gough</label>
                                        </div>
                                    </li>


                                </ul>
                            </li>
                        </div>


                        <div>
                            <li className=" relative [&>.sub-menu]:hover:visible [&>.sub-menu]:hover:animate-popper-pop-in [&>.sub-menu]:hover:opacity-100" style={{ listStyle: 'none' }}>
                                <a className="relative text-lg font-semibold inline-flex items-center gap-x-2 leading-10 after:absolute after:bottom-[7px] after:left-0 after:h-[2px] after:bg-white after:transition-transform after:w-full after:origin-right hover:after:origin-left after:scale-x-0 hover:after:scale-x-100" href="#">
                                    Chart Type
                                    <svg role="img" className="h-2 w-2 rotate-90 fill-white">
                                        <use xlinkHref="assets/img/yt1/sprite.svg#arrow-right"></use>
                                    </svg>
                                </a>

                                <ul className="sub-menu invisible absolute z-20 flex w-52 flex-col bg-white dark:bg-gray-800 py-5  font-bold opacity-0 shadow-2xl transition-all h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" >
                                    <li onClick={() => { handleChartType("line") }}>
                                        <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                            <p className="w-full py-2 ms-2 text-xl font-medium text-gray-900 rounded dark:text-gray-300">Line</p>
                                        </div>
                                    </li>
                                    <li onClick={() => { handleChartType("vertical bar") }}>
                                        <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                            <p className="w-full py-2 ms-2 text-xl font-medium text-gray-900 rounded dark:text-gray-300">Vertical Bar</p>
                                        </div>
                                    </li>
                                    <li onClick={() => { handleChartType("horizontal bar") }}>
                                        <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                            <p className="w-full py-2 ms-2 text-xl font-medium text-gray-900 rounded dark:text-gray-300">Horizontal Bar</p>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </div>
                    </div>

                </div>
            </div>

            {/* sm,md  select date and cryptocurrency,chart type */}


            <div>


                {
                    coinChartData && charttype === "line" && (
                        <Line options={options} data={data} />
                    )
                }
                {
                    coinChartData && charttype === "vertical bar" && (
                        <Bar data={data_bar_vertical} options={options_bar_vertical} />
                    )
                }
                {
                    coinChartData && charttype === "horizontal bar" && (
                        <Bar data={data_bar_horizontal} options={options_bar_horizontal} />
                    )
                }


            </div>




        </div>
    )
}

export default ChartDashboard