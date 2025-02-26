import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Logout.css"; 

const UserGreeting = () => {
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem("user")) || {};
    const fullName = userData.fullName || "User"; 

    const hour = new Date().getHours();
    let greeting;
    if (hour >= 5 && hour < 12) {
        greeting = "Good Morning";
    } else if (hour >= 12 && hour < 17) {
        greeting = "Good Afternoon";
    } else if (hour >= 17 && hour < 21) {
        greeting = "Good Evening";
    } else {
        greeting = "Good Night";
    }

    const handleLogOut = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <div className="user-greeting-container">
            <h1 className="greeting-text">
                {greeting}, {fullName} 👋🏼
            </h1>
            <button className="logout-button" onClick={handleLogOut}>
                Log Out
            </button>
        </div>
    );
};

export default UserGreeting;
