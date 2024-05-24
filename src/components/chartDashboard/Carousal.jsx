import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { numberWithCommas } from '../../services/regix';

const Carousel = ({ currency, symbol }) => {

    const [trending, setTrending] = useState([]);

    const fetchTrendingCoins = async () => {
        try {
            const result = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`)
            const response = await result.json()
            setTrending(response);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTrendingCoins();
    }, [currency]);


    const items = trending.map((coin) => {
        let profit = coin?.price_change_percentage_24h >= 0;

        return (

            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                textTransform: "uppercase",
                color: "white",
            }}>
                <img
                    src={coin?.image}
                    alt={coin.name}

                    style={{ marginBottom: 10, height: 50, width: 50 }}
                />
                <span style={{ textAlign: 'center' }}>


                    <span
                        style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                            textAlign: 'center'
                        }}
                    >
                        {profit && "+"}
                        {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </span>
            </div>

        );
    });

    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        },
    };

    return (
        <div>
            {items.length > 0 ? (
                <div className="w-full" style={{
                    height: "50%",
                    display: "flex",
                    alignItems: "center",
                }}>
                    <AliceCarousel
                        mouseTracking
                        infinite
                        autoPlayInterval={1000}
                        animationDuration={1500}
                        disableDotsControls
                        disableButtonsControls
                        items={items}
                        autoPlay
                        responsive={responsive}
                    />
                </div>
            ) : (
                <div className='flex loading justify-center align-middle items-center'>
                    <div className='descriptionthree widthskeleton h-100'></div >
                </div >
            )}
        </div>
    );
};

export default Carousel;
