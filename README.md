# Event Management System - Frontend

This repository contains the frontend of an **Event Management System** that allows users to manage their events, invite others to events, and track the status of invitations. The application is built with **React** and communicates with the backend API to perform CRUD operations.

## Brief Overview

The **Event Management System** frontend provides users with the following features:
- User registration and login.
- Event creation and management.
- Tracking sent and received invitations.
- RSVP to event invitations.

## Application Structure

The frontend of the system is structured around several pages and components, each serving a specific role in the user's experience:

### Pages:
1. **Landing Page**:
   - Provides options for **Login** and **Registration**.
   - Routes:
     - `/`: The **Landing Page** where users can log in or register.
  
2. **Home Page**:
   - Displays a list of the events the user has created and allows them to create new events.
   - Routes:
     - `/home`: The **Home Page** for viewing and managing events.
     - The navigation bar includes a link to the Home Page where the user can see their events.
   
3. **Invitations Page**:
   - Displays events the user has been invited to (received invites) and events the user has sent invites to (sent invites).
   - Users can RSVP to event invitations.
   - Routes:
     - `/invitations`: The **Invitations Page** where users can track their received and sent invitations, and accept or decline invites.

4. **404 Error Page**:
   - Any unimplemented routes will lead to a **404 Error Page**.
   - Routes:
     - `/404`: This page will be displayed for any undefined routes.

### Other Links in the Navbar:
- The **404 Page** will be shown for links that are not yet developed.
  
---

## How to Run the Application

### Prerequisites:
- **Node.js** installed on your machine.

### Step-by-Step Guide:

1. **Clone the repository**:
    ```bash
    git clone https://your-repository-url.git
    cd your-repository-folder
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Run the application**:
    ```bash
    npm run start
    ```
    This will start the frontend development server at `http://localhost:3000`.

4. **Access the application**:
    - The **Landing Page** (login/registration) is available at `http://localhost:3000/`.
    - The **Home Page** is accessible at `http://localhost:3000/home`.
    - The **Invitations Page** is accessible at `http://localhost:3000/invitations`.
    - Any other routes will show the **404 Page**.

---

## Page Descriptions and Routes

### 1. **Landing Page** (`/`):
   - The **Landing Page** provides the entry point for users to either **login** or **register** to the system.
   - Upon successful login, users are redirected to the **Home Page** (`/home`).
   - The page also offers registration functionality for new users to create an account and log in.

   - **Key Features**:
     - Login Form
     - Registration Form

### 2. **Home Page** (`/home`):
   - This page shows the events the logged-in user has created.
   - **Event Creation**: Users can create new events via the **Create Event** button in the **Navbar**.
   - **Event Viewing**: Users can view details of events they’ve created.
   - The **Navbar** includes a link to the Home Page for managing and viewing created events.

   - **Key Features**:
     - List of created events.
     - Option to create a new event.
     - Event details page (to view more info about specific events).

### 3. **Invitations Page** (`/invitations`):
   - This page displays two sections: **Sent Invitations** and **Received Invitations**.
   - **Sent Invitations**: Lists events the user has invited others to. The user can see the status of each invite.
   - **Received Invitations**: Displays events the user has been invited to, with the option to RSVP.
   - The user can **Accept** or **Decline** invites, and this status will be reflected both in the frontend and backend.

   - **Key Features**:
     - View received invitations with the option to RSVP (Accept/Decline).
     - View sent invitations with their statuses.

### 4. **404 Error Page** (`/404`):
   - This page is displayed for any invalid or undefined routes.
   - A simple error message indicating that the page was not found.

   - **Key Features**:
     - Error message: "Page Not Found"
     - A button to navigate back to the **Home Page**.

### 5. **Future Routes**:
   - The application has placeholders for additional features such as **User Profile**, **Admin Dashboard**, and **Event Notifications**, but these pages are not yet developed. Any attempt to navigate to these routes will lead to the **404 Error Page**.

---

## Conclusion

This frontend application works seamlessly with the backend of the **Event Management System** to provide users with a way to manage their events, send invitations, and track the status of invites.

The frontend is built with **React** and communicates with the backend API to handle all event and invitation data. The app uses **React Router** to manage routes and provide users with a smooth navigation experience.

Feel free to reach out for more details or clarifications.

---
