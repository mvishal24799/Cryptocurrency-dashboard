import React, { useEffect, useState } from 'react';
import styles from './PortFolio.module.css'
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

import { Pie } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)


const PortFolio = ({ currency, symbol }) => {
    const [portfolio_data, setPortFolio_Data] = useState([]);

    useEffect(() => {
        const fetchTrendingCoins = async () => {
            try {
                const result = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=5&page=1&sparkline=false&price_change_percentage=24h`)
                const response = await result.json()
                setPortFolio_Data(response);
            } catch (error) {
                console.error(error);
            }
        }
        fetchTrendingCoins();
    }, [currency]);

    console.log(portfolio_data)
    console.log('port')



    const sum = portfolio_data.reduce((acc, coin) => {
        const currentPrice = Number(coin?.current_price.toFixed(2));
        return acc + currentPrice;
    }, 0).toFixed(1);

    return (

        <div className='col-span-12 lg:col-span-6 border-2 border-solid shadow bg-white'>
            {portfolio_data && portfolio_data.length > 0 ? (

                <div>
                    <div className="flex justify-between py-8 px-5">
                        <div>
                            <h4 className="font-medium text-lg lg:text-2xl">
                                Portfolio
                            </h4>
                        </div>
                        <div className="flex">
                            <p className="font-medium text-base lg:text-2xl text-slate-500">Total value <span><b className="text-black">{symbol}{sum}M</b></span></p>
                        </div>
                    </div>
                    <div className='flex justify-center align-middle items-center'>
                        <Pie className={`${styles.heighwidth} pb-2`}
                            data={{
                                labels: portfolio_data.map((coin) => coin.name),
                                datasets: [{
                                    data: portfolio_data.map((coin) =>
                                        coin.market_cap
                                            .toString()
                                            .slice(0, -6)
                                    ),
                                    backgroundColor: ['red', 'yellow', 'pink', 'green', 'grey']
                                }]
                            }}
                            options={{ maintainAspectRatio: true }}
                            width={500} height={300}
                        />

                    </div>


                </div>
            ) :
                (
                    <div className='flex loading justify-center align-middle items-center'>
                        <div className='descriptiontwo widthskeleton h-100'></div >
                    </div >
                )
            }
        </div>

    )



}

export default PortFolio;
