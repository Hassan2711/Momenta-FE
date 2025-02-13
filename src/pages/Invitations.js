import { useState, useEffect } from "react";
import styles from "./InvitationsPage.module.css";
import Navbar from "../components/Navbar";
import EventList from "../components/EventList";
import API from "../api"; 

const InvitationsPage = () => {
    const [invitedEvents, setInvitedEvents] = useState([]);
    const [sentInvites, setSentInvites] = useState([]);
    const [activeSection, setActiveSection] = useState("received"); 

    const user = JSON.parse(localStorage.getItem("user"));  
    const token = user?.token; 
    const userId = user?.userId;   
    const authHeaders = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        if (userId) {
            fetchInvitedEvents(userId);
            fetchSentInvites(userId);
        } else {
            console.error("User ID not found in localStorage");
        }
    }, [userId]);

    const fetchInvitedEvents = async (userId) => {
        try {
            const { data } = await API.get(`/events/invited/${userId}`, authHeaders); 
            setInvitedEvents(data.events || []);
        } catch (error) {
            console.error("Error fetching invited events:", error);
        }
    };

    const fetchSentInvites = async (userId) => {
        try {
            const { data } = await API.get(`/events/sent-invites/${userId}`, authHeaders);  
            setSentInvites(data.events || []);
        } catch (error) {
            console.error("Error fetching sent invites:", error);
        }
    };

    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.mainContent}>
                <div className={styles.buttonContainer}>
                    <button 
                        className={activeSection === "received" ? styles.activeButton : styles.button} 
                        onClick={() => setActiveSection("received")}
                    >
                        Invites Received
                    </button>
                    <button 
                        className={activeSection === "sent" ? styles.activeButton : styles.button} 
                        onClick={() => setActiveSection("sent")}
                    >
                        Invites Sent
                    </button>
                </div>

                <h2>{activeSection === "received" ? "Invites You've Received" : "Invites You've Sent"}</h2>
                <EventList 
                    events={activeSection === "received" ? invitedEvents : sentInvites} 
                    pageType={activeSection} 
                />
            </div>
        </div>
    );
};

export default InvitationsPage;
