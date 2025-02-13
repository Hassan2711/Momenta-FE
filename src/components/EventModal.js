import styles from "./EventModal.module.css";

const EventModal = ({ showModal, eventData, setEventData, onClose, onSubmit, isEditing }) => {
    if (!showModal) return null;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEventData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2>{isEditing ? "Edit Event" : "Create New Event"}</h2>
                <form onSubmit={onSubmit}>
                    <input type="text" name="title" placeholder="Title" value={eventData.title} onChange={handleChange} required />
                    <textarea name="description" placeholder="Description" value={eventData.description} onChange={handleChange} required />
                    
                    <label>Date:</label>
                    <input type="date" name="date" value={eventData.date} onChange={handleChange} required />

                    <label>Time:</label>
                    <input type="time" name="time" value={eventData.time} onChange={handleChange} required />

                    <input type="text" name="location" placeholder="Location" value={eventData.location} onChange={handleChange} required />
                    
                    <label>
                        <input type="checkbox" name="reminder" checked={eventData.reminder} onChange={handleChange} />
                        Set Reminder
                    </label>

                    <div className={styles.modalButtons}>
                        <button type="submit">{isEditing ? "Update" : "Create"}</button>
                        <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EventModal;
