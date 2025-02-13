import { useState, useEffect } from "react";
import styles from "./HomePage.module.css";
import Navbar from "../components/Navbar";
import EventList from "../components/EventList";
import EventModal from "../components/EventModal";
import FilterBar from "../components/FilterBar";  
import API from "../api";
import InviteUsersModal from "../components/InviteUsersModal";

const HomePage = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [firstName, setFirstName] = useState(""); 
    const [showModal, setShowModal] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [eventData, setEventData] = useState({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        reminder: false
    });

    const [showInviteModal, setShowInviteModal] = useState(false); 
    const [selectedEventId, setSelectedEventId] = useState(null);

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    const authHeaders = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData?.firstName) {
            setFirstName(userData.firstName);
        }
        console.log(token)
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const { data } = await API.get("/events", authHeaders);
            setEvents(data);
            setFilteredEvents(data);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingEvent) {
                await API.put(`/events/${editingEvent._id}`, eventData, authHeaders);
            } else {
                await API.post("/events", eventData, authHeaders);
            }
            fetchEvents();
            closeModal();
        } catch (error) {
            console.error("Error saving event:", error);
        }
    };

    const openEditModal = (event) => {
        setEditingEvent(event);
        const formattedDate = event.date ? new Date(event.date).toISOString().split("T")[0] : "";
        
        setEventData({
            ...event,
            date: formattedDate,
            time: event.time,
        });

        setShowModal(true);
    };

    const deleteEvent = async (eventId) => {
        try {
            await API.delete(`/events/${eventId}`, authHeaders);
            setEvents(events.filter(event => event._id !== eventId));
            fetchEvents();
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingEvent(null);
        setEventData({
            title: "",
            description: "",
            date: "",
            location: "",
            reminder: false
        });
    };

    const handleFilterChange = ({ searchTerm, filterDate, filterLocation }) => {
        let filtered = events;

        if (searchTerm) {
            filtered = filtered.filter(event => 
                event.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filterDate) {
            filtered = filtered.filter(event => 
                new Date(event.date).toISOString().split("T")[0] === filterDate
            );
        }

        if (filterLocation) {
            filtered = filtered.filter(event => 
                event.location.toLowerCase().includes(filterLocation.toLowerCase())
            );
        }

        setFilteredEvents(filtered);
    };

    const openInviteModal = (event) => {
        setSelectedEventId(event._id);  
        setShowInviteModal(true);
    };

    const closeInviteModal = () => {
        setShowInviteModal(false);
    };

    const handleInvite = async (userIds) => {
        try {
            console.log("Sending invites for event ID:", selectedEventId);
            const response = await API.post(`/events/${selectedEventId}/invite`, { userIds }, authHeaders);
            console.log("Invites sent:", response.data);
            setShowInviteModal(false);
        } catch (error) {
            console.error("Error sending invites:", error);
        }
    };
    
    

    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.mainContent}>
                <div className={styles.top}>
                    <h2>Welcome, {firstName}! 🎉</h2>
                    <p>Manage your events seamlessly.</p>

                    <button className={styles.createEventBtn} onClick={() => setShowModal(true)}>+ Create New Event</button>
                </div>
                                
                <FilterBar onFilterChange={handleFilterChange} />

                <EventList 
                    events={filteredEvents} 
                    pageType="home"
                    onEdit={openEditModal} 
                    onDelete={deleteEvent} 
                    openInviteModal={openInviteModal} 
                />


                <InviteUsersModal 
                    show={showInviteModal} 
                    eventId={selectedEventId}
                    onClose={closeInviteModal}
                    onInvite={handleInvite} 
                />


                <EventModal 
                    showModal={showModal} 
                    eventData={eventData} 
                    setEventData={setEventData} 
                    onClose={closeModal} 
                    onSubmit={handleSubmit} 
                    isEditing={!!editingEvent} 
                /> 
            </div>
        </div>
    );
};

export default HomePage;
