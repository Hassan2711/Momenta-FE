const Button = ({ text, onClick }) => {
    return (
        <button
            onClick={onClick}
            style={{
                padding: '10px',
                backgroundColor: '#6a5acd',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
            }}
        >
            {text}
        </button>
    );
};

export default Button;
