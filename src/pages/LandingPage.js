import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api';
import styles from './LandingPage.module.css';
import heroImage from '../assets/heroImage.png'; 

const LandingPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (isLogin) {
                const { data } = await API.post('/auth/login', { email, password });

                localStorage.setItem("user", JSON.stringify({ 
                    firstName: data.user.firstName, 
                    lastName: data.user.lastName,
                    token: data.token, 
                    userId: data.user.userId
                }));

                navigate('/home');
            } else {
                if (!agreed) {
                    setError('You must agree to the Terms & Conditions.');
                    return;
                }

                const { data } = await API.post('/auth/register', { firstName, lastName, email, password });

                setFirstName('');
                setLastName('');
                setEmail('');
                setPassword('');
                setAgreed(false);
                setIsLogin(true);
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className={styles.container}>
            {/* Left Side */}
            <div className={styles.leftSide}>
                <div className={styles.imageContainer}>
                    <div className={styles.textOverlay}>
                        <h1>"Moments That Matter"</h1>
                        <h3>Create. Organize. Celebrate.</h3>
                    </div>
                    <img src={heroImage} alt="Sample" className={styles.image} />
                </div>
            </div>

            {/* Right Side */}
            <div className={styles.rightSide}>
                <h1>Momenta – Capturing and managing every moment</h1>
                <h2>{isLogin ? 'Login to Your Account' : 'Create an Account'}</h2>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {!isLogin && (
                        <>
                            <input 
                                type="text" 
                                placeholder="First Name" 
                                value={firstName} 
                                onChange={(e) => setFirstName(e.target.value)} 
                                required 
                                className={styles.inputField}
                            />
                            <input 
                                type="text" 
                                placeholder="Last Name" 
                                value={lastName} 
                                onChange={(e) => setLastName(e.target.value)} 
                                required 
                                className={styles.inputField}
                            />
                        </>
                    )}

                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className={styles.inputField}
                    />
                    <input 
                        type="password" 
                        placeholder="Enter your password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        className={styles.inputField}
                    />

                    {!isLogin && (
                        <>
                            <label className={styles.checkboxLabel}>
                                <input 
                                    type="checkbox" 
                                    checked={agreed} 
                                    onChange={() => setAgreed(!agreed)} 
                                />
                                I agree to the <Link to="#">Terms & Conditions</Link>
                            </label>
                        </>
                    )}

                    {/* Display Error Messages */}
                    {error && <p className={styles.errorMessage}>{error}</p>}

                    <button type="submit" className={styles.button}>
                        {isLogin ? 'Login' : 'Create Account'}
                    </button>
                </form>

                <p>
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button 
                        onClick={() => { 
                            setIsLogin(!isLogin);
                            setError('');
                        }} 
                        className={styles.toggleButton}
                    >
                        {isLogin ? 'Sign Up' : 'Log in'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LandingPage;
