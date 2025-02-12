const Checkbox = ({ checked, onChange }) => {
    return (
        <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input type="checkbox" checked={checked} onChange={onChange} />
            I agree to the <a href="#">Terms & Conditions</a>
        </label>
    );
};

export default Checkbox;
