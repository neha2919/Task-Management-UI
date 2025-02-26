import React from "react";
import Sidebar from "../components/Sidebar";
import TaskList from "../components/TaskList";
import MeetingSchedule from "../components/MeetingSchedule";
import "../styles/App.css";
import UserGreeting from "../components/UserGreeting";
import Footer from "../components/Footer";

const Dashboard = ({ user }) => {
    return (
        <div className="dashboard-container">
            <Sidebar />
            <UserGreeting />
            <div className="main-content">
                <TaskList tasks={user.tasks} />
                <MeetingSchedule />
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default Dashboard;
