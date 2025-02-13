import React from "react";
import styles from "./Error404.module.css";

const Error404 = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.errorTitle}>404</h1>
                <h2 className={styles.errorMessage}>Oops! Page not found</h2>
                <p className={styles.errorDescription}>
                    The page you're looking for might have been removed or moved to a different URL.
                </p>
                <button className={styles.goHomeBtn} onClick={() => window.location.href = '/home'}>
                    Go Back to Home
                </button>
            </div>
        </div>
    );
};

export default Error404;
