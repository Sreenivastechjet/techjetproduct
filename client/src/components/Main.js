import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../components/auth/Login"
import Sidebar from "../components/sidebar/Sidebar.js"
import Dashboard from "../components/dashboard/Dashboard.js"
import Leads from "../components/leads/Leads.js"
import AddLeads from "../components/leads/AddLeads.js"
import LeadDetails from "../components/leads/LeadDetails.js"
import Deals from "./deals/Deals";
import Register from "./auth/Register";
import Task from "./task/Task";
import Meeting from "./meetings/Meeting";
import DealDetails from "./deals/DealDetails";
import Profile from "./profile/Profile";
// import ProtectedRoute from "./middleware/ProtectedRoute"

function Main() {
    const [token, setToken] = useState("")

    useEffect(() => {
        const storedToken = localStorage.getItem('loginToken');
        if (storedToken) {
            setToken(JSON.parse(storedToken));
        }
    }, [])

    return (

        <Router>
            {token ? (
                <>
                    <Sidebar />
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/leads" element={<Leads />} />
                        <Route path="/addleads" element={<AddLeads />} />
                        <Route path="/leaddetails/:id" element={<LeadDetails />} />
                        <Route path="/deals" element={<Deals />} />
                        <Route path="/dealdetails/:id" element={<DealDetails />} />
                        <Route path="/meetings" element={<Meeting />} />
                        <Route path="/tasks" element={<Task />} />
                    </Routes>
                </>
            ) : (
                
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Login />} />
                </Routes>
            )}
        </Router>


    )

}

export default Main;