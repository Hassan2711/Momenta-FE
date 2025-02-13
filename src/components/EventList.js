import styles from "./EventList.module.css";

const EventList = ({ events, onEdit, onDelete }) => {
    return (
        <div className={styles.eventsList}>
            {events.length > 0 ? (
                events.map(event => (
                    <div key={event._id} className={styles.eventCard}>
                        <h3>{event.title}</h3>
                        <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                        <p><strong>Location:</strong> {event.location}</p>
                        <p><strong>Time:</strong> {event.time ? event.time : "N/A"}</p>
                        <div className={styles.eventActions}>
                            <button className={styles.editBtn} onClick={() => onEdit(event)}>Edit</button>
                            <button className={styles.deleteBtn} onClick={() => onDelete(event._id)}>Delete</button>
                        </div>
                    </div>
                ))
            ) : (
                <p className={styles.noEvents}>No upcoming events.</p>
            )}
        </div>
    );
};

export default EventList;
