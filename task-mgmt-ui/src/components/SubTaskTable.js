import React from "react";
import "../styles/SubTaskTable.css"; // Import CSS

const SubTaskTable = ({ subTasks }) => {
    return (
        <div className="subtask-table-container">
            <h3>Sub-Tasks</h3>
            {subTasks.length > 0 ? (
                <table className="subtask-table">
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Assigned On</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Assigned To</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subTasks.map((subTask) => (
                            <tr key={subTask.taskId}>
                                <td>{subTask.title}</td>
                                <td>{subTask.assignedOn || "N/A"}</td>
                                <td>{subTask.dueDate || "N/A"}</td>
                                <td className={`status-${subTask.progress.toLowerCase()}`}>{subTask.progress}</td>
                                <td>{subTask.username.length > 0 ? subTask.username.join(", ") : "Unassigned"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="no-subtasks">No sub-tasks available.</p>
            )}
        </div>
    );
};

export default SubTaskTable;
