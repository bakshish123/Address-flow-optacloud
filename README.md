# Address Flow - OptaCloud

## Overview

**Address Flow** is a MERN stack application designed to manage saved addresses efficiently. It provides users with features like editing, favoriting, and deleting addresses. The application includes a user-friendly interface for handling multiple addresses and offers full backend integration to perform CRUD operations seamlessly.

## Features

- **Saved Addresses Page**: View all saved addresses with options to edit, delete, and favorite them.
- **Edit Address Popup**: Modify address details with real-time backend updates.
- **Favorite Addresses**: Mark and display favorite addresses in a dedicated section.
- **Backend Integration**: Complete CRUD functionality using a RESTful API.
- **Responsive Design**: Optimized for both desktop and mobile users.
- **Redux State Management**: Manage application state efficiently.

---

## Technologies Used

### Frontend:
- **React.js**: For building the user interface.
- **Redux**: For state management.
- **Axios**: For making API requests.
- **Tailwind CSS**: For styling the application.

### Backend:
- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing address data.

---

## Installation

Follow these steps to set up the project on your local machine:

### Prerequisites
- Node.js
- MongoDB
- Git

### Clone the Repository
```bash
git clone https://github.com/bakshish123/Address-flow-optacloud.git
cd Address-flow-optacloud

##Backend Setup

Navigate to the backend directory:
cd backend

Install dependencies:

npm install
Create a .env file in the backend directory with the following variables:

MONGO_URI=your_mongodb_connection_string
PORT=5000

Replace your_mongodb_connection_string with the connection string for your MongoDB instance.
Start the backend server:


npm start
Confirm the backend is running at http://localhost:5000.

Frontend Setup
Navigate to the frontend directory:

cd ../frontend

Install dependencies:

npm install

Start the development server:

npm start
Open your browser and visit http://localhost:3000 to view the application.

Usage
Start the Backend: Ensure the backend server is running on http://localhost:5000.
Start the Frontend: Access the application at http://localhost:3000.
Features:
View all saved addresses.
Edit or delete addresses.
Mark addresses as favorite for quick access.
