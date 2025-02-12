const InputField = ({ type, placeholder, value, onChange }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required
            style={{ padding: '10px', borderRadius: '5px' }}
        />
    );
};

export default InputField;
