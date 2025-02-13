import React from "react";
import styles from "./EventDetailsModal.module.css";

const EventDetailsModal = ({ show, event, onClose }) => {
    if (!show) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2>Event Details: {event.title}</h2>
                <ul>
                    {event.invitations.map((invite, index) => (
                        <li key={index}>
                            <span>{invite.userId.firstName} {invite.userId.lastName}</span>
                            <span className={styles.status}>Status: {invite.status}</span>
                        </li>
                    ))}
                </ul>
                <div className={styles.modalActions}>
                    <button className={styles.closeBtn} onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default EventDetailsModal;
