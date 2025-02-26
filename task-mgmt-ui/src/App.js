import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import TaskDetails from "./pages/TaskDetails";

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/" />} />
                <Route path="/" element={<SignIn setUser={setUser} />} /> 
                <Route path="/signup" element={<SignUp />} />
                <Route path="/details/:taskId" element={<TaskDetails />} />
            </Routes>
        </Router>
    );
};

export default App;
