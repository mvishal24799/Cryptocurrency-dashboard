const SelectButton = ({ children, selected, onClick }) => {
    return (
        <button 
            type="button" 
            onClick={onClick} 
            className={`btn-outline-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border border-blue-700 text-xl font-semibold py-2 px-4 rounded ${
                selected ? 'hover:bg-blue-700 hover:text-white' : ''
            }`}
        >
            {children}
        </button>
    );
};

export default SelectButton;
