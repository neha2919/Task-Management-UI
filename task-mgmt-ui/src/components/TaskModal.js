import React, { useEffect, useState, useRef } from "react";
import Input from "./Input";
import { createTask, createSubTask, getAllUsers } from "../utils/api";
import "../styles/TaskModal.css";

const TaskModal = ({ onClose, parentTaskId }) => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "LOW",
    username: [],
    assignedOn: new Date().toISOString().split("T")[0],
  });

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userList = await getAllUsers();
        setUsers(userList.map((user) => user.username));
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleUserSelection = (user) => {
    if (!taskData.username.includes(user)) {
      setTaskData({ ...taskData, username: [...taskData.username, user] });
    }
    setIsDropdownOpen(false);
    setSearchTerm("");
  };

  const handleRemoveUser = (userToRemove) => {
    setTaskData({
      ...taskData,
      username: taskData.username.filter((user) => user !== userToRemove),
    });
  };

  const filteredUsers = users.filter((user) =>
    user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log(taskData)
      if (parentTaskId) {
        await createSubTask(parentTaskId, [taskData]);
      } else {
        await createTask(taskData);
      }
      onClose();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{parentTaskId ? "Create Sub-Task" : "Create New Task"}</h2>
        <form onSubmit={handleSubmit}>
          <Input label="Task Title" type="text" name="title" value={taskData.title} onChange={handleChange} />
          <Input label="Task Description" type="text" name="description" value={taskData.description} onChange={handleChange} />

          <label>Due Date</label>
          <input type="date" name="dueDate" value={taskData.dueDate} onChange={handleChange} />

          <label>Priority</label>
          <select name="priority" value={taskData.priority} onChange={handleChange}>
            <option value="HIGH">HIGH</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="LOW">LOW</option>
          </select>

          <label>Assign Users</label>
          <div className="dropdown-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
            />
            {isDropdownOpen && (
              <div className="dropdown show" ref={dropdownRef}>
                <ul>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <li key={user} className="dropdown-item" onClick={() => handleUserSelection(user)}>
                        {user}
                      </li>
                    ))
                  ) : (
                    <li className="dropdown-item">No users found</li>
                  )}
                </ul>
              </div>
            )}
          </div>

          <div className="selected-users">
            {taskData.username.map((user) => (
              <span key={user} className="user-tag">
                {user}
                <button className="remove-user" onClick={() => handleRemoveUser(user)}>x</button>
              </span>
            ))}
          </div>

          <label>Assigned On</label>
          <input type="date" value={taskData.assignedOn} readOnly />

          <div className="modal-buttons">
            <button type="submit" className="create-btn">Create</button>
            <button type="button" className="close-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
