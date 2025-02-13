import React, { useState } from 'react';
import styles from './InviteUsersModal.module.css';
import API from '../api'; 

const InviteUsersModal = ({ show, onClose, onInvite, eventId }) => {
    const [email, setEmail] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [emailError, setEmailError] = useState('');

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    const authHeaders = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const handleInputChange = (e) => {
        setEmail(e.target.value);
        setEmailError(''); 
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSearch = async () => {
        if (!validateEmail(email)) {
            setEmailError('Invalid email address');
            return;
        }

        try {
            const { data } = await API.get(`/users/search?email=${email}`, authHeaders);
            if (data.length === 0) {
                setEmailError('No users found with that email');
            }
            setSearchResults(data); 
        } catch (error) {
            console.error("Error searching for users:", error);
        }
    };

    const handleSelectUser = (user) => {
        const isSelected = selectedUsers.some(u => u._id === user._id);
        if (isSelected) {
            setSelectedUsers(selectedUsers.filter(u => u._id !== user._id)); 
        } else {
            setSelectedUsers([...selectedUsers, user]);  
        }
    };

    const handleRemoveUser = (userId) => {
        setSelectedUsers(selectedUsers.filter(user => user._id !== userId));
    };

    const handleSendInvite = () => {
        const userIds = selectedUsers.map(user => user._id);
        onInvite(userIds, eventId);  
        setSelectedUsers([]);
    };

    const handleClose = () => {
        onClose();  
        setSelectedUsers([]);
        setEmail('');
        setSearchResults([]);
        setEmailError('');
    };

    if (!show) {
        return null;
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h3>Select Users to Invite</h3>
                <input
                    type="email"
                    placeholder="Search by email..."
                    value={email}
                    onChange={handleInputChange}
                />
                {emailError && <p className={styles.errorText}>{emailError}</p>}

                <button onClick={handleSearch}>Search</button>


                {searchResults.length > 0 && (
                    <div className={styles.searchResults}>
                        {searchResults.map(user => (
                            <div key={user._id} className={styles.userItem}>
                                <input
                                    type="checkbox"
                                    checked={selectedUsers.some(u => u._id === user._id)} 
                                    onChange={() => handleSelectUser(user)} 
                                />
                                <span>{user.firstName} {user.lastName} - {user.email}</span>
                            </div>
                        ))}
                    </div>
                )}

                {selectedUsers.length > 0 && (
                    <div className={styles.selectedUsers}>
                        <h4>Selected Users:</h4>
                        {selectedUsers.map(user => (
                            <div key={user._id} className={styles.selectedUserItem}>
                                <span>{user.firstName} {user.lastName} - {user.email}</span>
                                <button onClick={() => handleRemoveUser(user._id)} className={styles.removeBtn}>✖</button>
                            </div>
                        ))}
                    </div>
                )}

                <div className={styles.modalActions}>
                    <button onClick={handleSendInvite}>Send Invite</button>
                    <button onClick={handleClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default InviteUsersModal;
