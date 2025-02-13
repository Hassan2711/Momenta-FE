import styles from "./EventList.module.css";
import { useState } from "react";
import EventDetailsModal from "./EventDetailsModal"; 
import API from "../api"; 

const EventList = ({ events, pageType, onEdit, onDelete, openInviteModal }) => {

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    const authHeaders = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [rsvpStatus, setRsvpStatus] = useState({});  

    const handleViewDetails = (event) => {
        setSelectedEvent(event);  
        setShowModal(true); 
    };

    const handleCloseModal = () => {
        setShowModal(false); 
        setSelectedEvent(null); 
    };

    const handleRSVP = async (eventId, invitationId, status) => {
        try {
            const response = await API.post(`/events/${eventId}/invitation/${invitationId}/rsvp`, { status }, authHeaders); 
            if (response.data.success) {
                setRsvpStatus(prevState => ({
                    ...prevState,
                    [eventId]: status,
                }));
            }
        } catch (error) {
            console.error("Error updating RSVP:", error);
        }
    };

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
                            {pageType === "home" ? (
                                <>
                                    <button className={styles.editBtn} onClick={() => onEdit(event)}>Edit</button>
                                    <button className={styles.deleteBtn} onClick={() => onDelete(event._id)}>Delete</button>
                                    <button className={styles.inviteBtn} onClick={() => openInviteModal(event)}>Invite</button>
                                </>
                            ) : pageType === "received" ? (
                                <>
                                    {rsvpStatus[event._id] === "accepted" || rsvpStatus[event._id] === "declined" ? (
                                        <span>{rsvpStatus[event._id] === "accepted" ? "Invite Accepted" : "Invite Declined"}</span> 
                                    ) : (
                                        <>
                                            <button 
                                                className={styles.inviteBtn} 
                                                onClick={() => handleRSVP(event._id, event.invitations[0]._id, "accepted")}>Accept Invite</button>
                                            <button 
                                                className={styles.inviteBtn} 
                                                onClick={() => handleRSVP(event._id, event.invitations[0]._id, "declined")}>Decline Invite</button>
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    <button className={styles.inviteBtn} onClick={() => handleViewDetails(event)}>
                                        View Details
                                    </button>
                                </>
                            )}
                        </div>

                        <EventDetailsModal show={showModal} event={selectedEvent} onClose={handleCloseModal} />
                    </div>
                ))
            ) : (
                <p className={styles.noEvents}>No upcoming events.</p>
            )}
        </div>
    );
};

export default EventList;
