import React, { useEffect, useState } from "react";
import { getUserTasks } from "../utils/api";
import "../styles/TaskList.css";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState({ dueDate: "", progress: "", priority: "", assignedOn: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      const userTasks = await getUserTasks();
      setTasks(userTasks);
      setFilteredTasks(userTasks);
    };

    fetchTasks();
  }, []);


  const handleTaskClick = (taskId)=>{
      navigate(`/details/${taskId}`);
  }

  const applyFilters = () => {
    let filtered = [...tasks];

    if (filter.dueDate) {
      filtered = filtered.filter((task) => task.dueDate === filter.dueDate);
    }
    if (filter.progress) {
      filtered = filtered.filter((task) => (task.progress || "PENDING") === filter.progress);
    }
    if (filter.priority) {
      filtered = filtered.filter((task) => task.priority === filter.priority);
    }
    if (filter.assignedOn) {
      filtered = filtered.filter((task) => task.assignedOn === filter.assignedOn);
    }

    setFilteredTasks(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [filter]);

  return (
    <div className="task-list">
      <h2>Today's Tasks</h2>

      <div className="filters">
        <input
          type="date"
          placeholder="Due Date"
          onChange={(e) => setFilter({ ...filter, dueDate: e.target.value })}
        />
        <select onChange={(e) => setFilter({ ...filter, progress: e.target.value })}>
          <option value="">Progress</option>
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
        <select onChange={(e) => setFilter({ ...filter, priority: e.target.value })}>
          <option value="">Priority</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
        <input
          type="date"
          placeholder="Assigned Date"
          onChange={(e) => setFilter({ ...filter, assignedOn: e.target.value })}
        />
      </div>

      <div className="task-container">
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Assigned On</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <tr key={task.taskId} onClick={() => handleTaskClick(task.taskId)}>
                  <td>{task.title}</td>
                  <td>{task.assignedOn || "N/A"}</td>
                  <td className={new Date(task.dueDate).toDateString()!== new Date().toDateString() ? "due-date-overdue":""}>{task.dueDate || "N/A"}</td>
                  <td className={`priority priority-${task.priority.toLowerCase()}`}>{task.priority}</td>
                  <td className={`status status-${task.progress}`}>{task.progress || "PENDING"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-tasks">There are no tasks assigned to you.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;
