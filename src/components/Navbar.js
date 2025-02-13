import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { FaBell } from "react-icons/fa";
import io from "socket.io-client";

const socket = io("http://localhost:5000", {
    withCredentials: true,
    transports: ["websocket"],
});


const Navbar = () => {
    const [reminders, setReminders] = useState([]);
    const [showReminders, setShowReminders] = useState(false);
    const [forceRender, setForceRender] = useState(false);

    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData?.userId;

    useEffect(() => {
        if (!userId) return;

        const handleConnect = () => {
            socket.emit("registerUser", userId);
        };

        socket.on("connect", handleConnect);

        if (socket.connected) {
            handleConnect();
        }

        const handleReminder = (event) => {
            setReminders((prev) => {
                if (!prev.some((rem) => rem._id === event._id)) {
                    return [...prev, event];
                }
                return prev;
            });
            setForceRender((prev) => !prev);
        };

        socket.on("eventReminder", handleReminder);

        return () => {
            socket.off("connect", handleConnect);
            socket.off("eventReminder", handleReminder);
        };
    }, [userId]);

    return (
        <nav className={styles.navbar}>
            <h1 className={styles.logo}>Momenta</h1>

            <ul className={styles.navLinks}>
                <li><Link to="/error404">Dashboard</Link></li>
                <li><Link to="/home">My Events</Link></li>
                <li><Link to="/invitations">Invitations</Link></li>
                <li><Link to="/error404">Settings</Link></li>
            </ul>

            <div className={styles.userSection}>
                <div className={styles.reminderIcon} onClick={() => setShowReminders(!showReminders)}>
                    <FaBell />
                    {reminders.length > 0 && <span className={styles.reminderBadge}>{reminders.length}</span>}
                </div>

                {showReminders && (
                    <div className={styles.reminderDropdown}>
                        <h3>🔔 Reminders</h3>

                        {reminders.length > 0 ? (
                            reminders.map((event, index) => (
                                <div key={index} className={styles.reminderItem}>
                                    <p><strong>{event.title}</strong> at {event.time}</p>
                                </div>
                            ))
                        ) : (
                            <p className={styles.noReminders}>No upcoming reminders.</p>
                        )}
                    </div>
                )}

                <span className={styles.userName}>Hello, {userData?.firstName || "Guest"}! 👋</span>

                <button className={styles.logout} onClick={() => {
                    localStorage.removeItem("user");
                    window.location.href = "/";
                }}>Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;
