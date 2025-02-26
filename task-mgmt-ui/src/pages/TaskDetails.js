import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTaskById, updateTask, getAllUsers, assignUsersToTask, getSubTasks } from "../utils/api";
import Sidebar from "../components/Sidebar";
import UserGreeting from "../components/UserGreeting";
import TaskModal from "../components/TaskModal";
import SubTaskTable from "../components/SubTaskTable"; // Import the new component
import Select from "react-select";
import "../styles/TaskDetails.css";

const TaskDetails = () => {
    const { taskId } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [subTasks, setSubTasks] = useState([]);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const taskDetails = await getTaskById(taskId);
                setTask(taskDetails);

                // Fetch subtasks if they exist
                if (taskDetails.subTasks && taskDetails.subTasks.length > 0) {
                    const subTaskDetails = await getSubTasks(taskDetails.subTasks);
                    setSubTasks(subTaskDetails);
                }
            } catch (err) {
                setError("Failed to load task details.");
            } finally {
                setLoading(false);
            }
        };

        fetchTask();
    }, [taskId]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersList = await getAllUsers();
                setUsers(usersList.map(user => ({ value: user.username, label: user.username })));
            } catch (err) {
                setError("Failed to load users.");
            }
        };
        fetchUsers();
    }, []);

    const handleTaskUpdate = async () => {
        if (!task) return;

        const updatedTaskData = {
            ...task,
            progress: task.progress === "PENDING" ? "IN_PROGRESS" : "COMPLETED"
        };

        try {
            const updatedTask = await updateTask(updatedTaskData);
            setTask(updatedTask);
        } catch (err) {
            setError("Failed to update task status.");
        }
    };

    const handleAssignUsers = async () => {
        if (!selectedUsers.length) return;
        try {
            await assignUsersToTask(taskId, selectedUsers.map(u => u.value));
            setTask({ ...task, username: [...task.username, ...selectedUsers.map(u => u.value)] });
            setSelectedUsers([]);
        } catch (err) {
            setError("Failed to assign users.");
        }
    };

    if (loading) return <div className="loading">Loading task details...</div>;
    if (error) return <div className="error">{error}</div>;

    const getActionButtonText = () => {
        switch (task.progress) {
            case "PENDING":
                return "Start Task";
            case "IN_PROGRESS":
                return "Complete Task";
            case "COMPLETED":
                return "Task Completed";
            default:
                return "Start Task";
        }
    };

    return (
        <div className="task-page">
            <Sidebar />
            <div className="content">
                <UserGreeting />
                <div className="task-details-container">
                    <div className="task-header">
                        <h2>{task.title}</h2>
                    </div>
                    <div className="task-info">
                        <p><strong>Description:</strong> {task.description}</p>
                        <p><strong>Assigned By:</strong> 
                            <span className="assigned-badge">{task.assignedBy}</span>
                        </p>
                        <p><strong>Created By:</strong> 
                            <span className="created-highlight">{task.createdBy}</span>
                        </p>
                        <p><strong>Assigned On:</strong> {task.assignedOn}</p>
                        <p><strong>Due Date:</strong> {task.dueDate}</p>
                        <p><strong>Priority:</strong> 
                            <span className={`priority-${task.priority ? task.priority.toLowerCase() : "default"}`}>
                                {task.priority || "N/A"}
                            </span>
                        </p>
                        <p><strong>Assigned To:</strong> {task.username.join(", ")}</p>
                        <p><strong>Status:</strong> 
                            <span className={`task-status ${task.progress}`}>
                                {task.progress || "PENDING"}
                            </span>
                        </p>
                    </div>

                    <div className="task-actions">
                        <button 
                            className={`action-button ${task.progress}`} 
                            onClick={handleTaskUpdate} 
                            disabled={task.progress === "COMPLETED"}
                        >
                            {getActionButtonText()}
                        </button>
                        <button className="back-button" onClick={() => navigate(-1)}>Back</button>
                    </div>

                    <div className="assign-users">
                        <h3>Assign Users</h3>
                        <div className="assign-container">
                            <Select
                                options={users}
                                isMulti
                                value={selectedUsers}
                                onChange={setSelectedUsers}
                                className="user-select"
                            />
                            <button className="assign-button" onClick={handleAssignUsers}>Assign</button>
                        </div>
                    </div>
                    
                    <div className="create-subtask-container">
                        <button className="create-subtask-button" onClick={() => setShowTaskModal(true)}>
                            Create Sub-Task
                        </button>
                    </div>
                </div>
                 {/* Subtasks Table */}
                 {subTasks.length > 0 && (
                        <div className="subtask-container">
                            <SubTaskTable subTasks={subTasks} /> {/* Use SubTaskTable instead of TaskList */}
                        </div>
                    )}
            </div>
            {showTaskModal && <TaskModal onClose={() => setShowTaskModal(false)} parentTaskId={taskId} />}
        </div>
    );
};

export default TaskDetails;
