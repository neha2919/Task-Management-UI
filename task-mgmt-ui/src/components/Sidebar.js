import React, { useState } from "react";
import "../styles/Sidebar.css";
import TaskModal from "./TaskModal"; // Import Task Modal

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleAddTaskClick = () => {
    setShowTaskModal(true);
  };

  return (
    <>
      <div className={`custom-sidebar ${isOpen ? "open" : ""}`}>
        {/* Toggle Button */}
        <button className="custom-toggle-btn" onClick={toggleSidebar}>
          {isOpen ? "✖" : "▶"}
        </button>

        {/* Sidebar Menu */}
        <ul className="custom-menu">
          <li className="custom-menu-item">
            <span className="custom-icon">📥</span>
            {isOpen && <span className="custom-text">Inbox</span>}
          </li>
          <li className="custom-menu-item">
            <span className="custom-icon">⭐</span>
            {isOpen && <span className="custom-text">Today</span>}
          </li>
          <li className="custom-menu-item">
            <span className="custom-icon">📅</span>
            {isOpen && <span className="custom-text">Upcoming</span>}
          </li>
        </ul>

        {/* Always Visible Create Task Button */}
        <div className="custom-add-task-container" onClick={handleAddTaskClick}>
          <button className="custom-add-task">+</button>
          <span className={`custom-create-task-text ${isOpen ? "visible" : "hidden"}`}>
            Create Task
          </span>
        </div>
      </div>

      {showTaskModal && <TaskModal onClose={() => setShowTaskModal(false)} />}
    </>
  );
};

export default Sidebar;
