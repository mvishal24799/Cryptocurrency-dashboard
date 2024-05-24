import React, { useEffect, useState } from 'react';
import { BiSolidCaretUpCircle, BiSolidCaretDownCircle } from "react-icons/bi";
import { FaForward } from "react-icons/fa";
import { FaBackward } from "react-icons/fa6";
import { numberWithCommas } from '../../services/regix';

const MarketCap = ({ currency, symbol, id }) => {
    const [marketcap, setMarketCap] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const searchId = id;

    console.log(searchId)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
                const response = await result.json()
                setMarketCap(response);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [currency, symbol]);

    // Calculate the index range for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentItems = marketcap.slice(indexOfFirstItem, indexOfLastItem);

    // Filter currentItems based on the provided id if searchId is present
    const filteredItems = searchId ? marketcap.filter(item => item.id === searchId) : marketcap;

    // Get the items for the current page
    const currentItems = searchId ? filteredItems.slice(indexOfFirstItem, indexOfLastItem) : marketcap.slice(indexOfFirstItem, indexOfLastItem);

    // Function to handle page navigation
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <h3 className="font-semibold text-2xl ">
                Cryptocurrency by
            </h3>
            <h4 className="font-semibold text-2xl ">
                market cap
            </h4>

            {currentItems.length > 0 ? (
                currentItems.map((data) => {
                    const profit = data.price_change_percentage_24h > 0;
                    const loss = data.price_change_percentage_24h <= 0;
                    return (
                        <div key={data.name} className=" flex justify-between py-8" style={{ borderBottom: '0.5px solid #dbdbdb' }}>
                            <div>
                                <p className=" font-bold text-lg ">{data.name}</p>
                                <p className=" font-semibold text-gray-600 text-base ">Mkt.Cap <span>
                                    {symbol}
                                    {numberWithCommas(
                                        data.market_cap.toString().slice(0, -6)
                                    )}
                                    M
                                </span></p>
                            </div>
                            <div className=" w-24">
                                {
                                    profit ? (
                                        <p className="font-semibold text-base lg:text-lg flex pt-7 justify-between">
                                            {profit && <BiSolidCaretUpCircle size={25} color="green" className="mr-2" />}
                                            {data.price_change_percentage_24h.toFixed(2)}%
                                        </p>
                                    ) : (
                                        <p className="font-semibold text-base lg:text-lg flex  pt-7 justify-between">
                                            {loss && <BiSolidCaretDownCircle size={25} color="red" className="mr-2" />}
                                            {data.price_change_percentage_24h.toFixed(2).substring(1)}%
                                        </p>
                                    )
                                }
                            </div>
                        </div>
                    );
                })
            ) : (
                <>
                    <div className="loading flex justify-between py-8" style={{ borderBottom: '0.5px solid #dbdbdb' }}>
                        <div>
                            <p className="description font-bold text-lg lg:text-xl"></p>
                            <p className="description font-semibold text-gray-600 text-base lg:text-lg"><span>
                            </span></p>
                        </div>
                        <div className={`description widthskeleton`}>
                            <p className="font-semibold text-base lg:text-lg flex pt-7 justify-between">

                            </p>
                        </div>
                    </div>
                    <div className="loading flex justify-between py-8" style={{ borderBottom: '0.5px solid #dbdbdb' }}>
                        <div>
                            <p className="description font-bold text-lg lg:text-xl"></p>
                            <p className="description font-semibold text-gray-600 text-base lg:text-lg"><span>
                            </span></p>
                        </div>
                        <div className={`description widthskeleton`}>
                            <p className="font-semibold text-base lg:text-lg flex pt-7 justify-between">

                            </p>
                        </div>
                    </div>
                </>
            )}



            {/* pagination button start here */}

            <div className="flex  justify-evenly  items-center gap-2 mt-2 lg:mt-16">
                <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    className={`px-3 py-1 bg-gray-200 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={currentPage === 1}
                >

                    <FaBackward size={25} />

                </button>
                <button
                    onClick={() => paginate(Math.min(Math.ceil(marketcap.length / itemsPerPage), currentPage + 1))}
                    className={`px-3 py-1 bg-gray-200 rounded ${currentPage === Math.ceil(marketcap.length / itemsPerPage) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={currentPage === Math.ceil(marketcap.length / itemsPerPage)}
                >
                    <FaForward size={25} />
                </button>
            </div>

            {/* pagination button end here */}

        </div>
    );
}

export default MarketCap;


























































{/* Pagination */ }
{/* <div className="flex gap-2 mt-4">
                {Array.from({ length: Math.min(10, Math.ceil(marketcap.length / itemsPerPage)) }, (_, index) => (
                    <button key={index} onClick={() => paginate(index + 1)} className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded">
                        {index + 1}
                    </button>
                ))}
            </div> */}

{/* <div className="flex gap-2 mt-4">
                {Array.from({ length: Math.min(10, Math.ceil(marketcap.length / itemsPerPage)) }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded ${currentPage === index + 1 ? 'text-white bg-red-500' : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div> */}

{/* <div className="flex gap-2 mt-4">
                {Array.from({ length: Math.min(10, Math.ceil(marketcap.length / itemsPerPage)) }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`px-3 py-1 bg-gray-200 rounded ${currentPage === index + 1 ? 'text-white bg-blue-600' : 'hover:bg-gray-300'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div> */}

{/* <div className="flex items-center gap-2 mt-4">
                <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    className={`px-3 py-1 bg-gray-200 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={currentPage === 1}
                >
                    &lt;
                </button>
                {Array.from({ length: Math.min(10, Math.ceil(marketcap.length / itemsPerPage)) }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`px-3 py-1 bg-gray-200 rounded ${currentPage === index + 1 ? 'text-white bg-red-500' : 'hover:bg-gray-300'}`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => paginate(Math.min(Math.ceil(marketcap.length / itemsPerPage), currentPage + 1))}
                    className={`px-3 py-1 bg-gray-200 rounded ${currentPage === Math.ceil(marketcap.length / itemsPerPage) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={currentPage === Math.ceil(marketcap.length / itemsPerPage)}
                >
                    &gt;
                </button>
            </div> */}


