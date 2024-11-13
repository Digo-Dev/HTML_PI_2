import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import GetData from '../components/MyRequests/MyRequests.jsx';
import Navbar from "../components/Navbar/Navbar";
import SignUp from "../pages/Citizen/SignUp.jsx";
import HomeCitizen from "../pages/Citizen/HomeCitizen.jsx";
import Login from "../pages/Citizen/Login.jsx";
import ServiceSelection from "../pages/Citizen/ServiceSelection.jsx";
import EmployeeRegisterForm from "../pages/Goverment/Admin/RegisterEmployee.jsx";
import AddNewService from "../pages/Goverment/Admin/AddService.jsx";
import LoginGoverment from "../pages/Goverment/Login.jsx";
import ServiceAdd from "../pages/Citizen/ServiceRequest.jsx";
import HomeEmployee from "../pages/Goverment/HomeEmployee.jsx";

const AppRouter = () => {
        const isAdmin = false; 
    
        return (
            <BrowserRouter>
                <Navbar isAdmin={isAdmin} />
                <Routes>
                    <Route path="/HTML_PI_2/home" element={<HomeCitizen />} />
                    <Route path="/HTML_PI_2/login" element={<Login />} />
                    <Route path="/HTML_PI_2/service-request" element={<ServiceAdd />} />
                    <Route path="/HTML_PI_2/service-selection" element={<ServiceSelection />} />
                    <Route path="/HTML_PI_2/sign-up" element={<SignUp />} />
                    <Route path="/HTML_PI_2/add-new-service" element={<AddNewService />} />
                    <Route path="/HTML_PI_2/register-employee" element={<EmployeeRegisterForm />} />
                    <Route path="/HTML_PI_2/login-goverment" element={<LoginGoverment />} />
                    <Route path="/HTML_PI_2/home-employee" element={<HomeEmployee />} />
                    <Route path="/" element={<Login />} />
                </Routes>
            </BrowserRouter>
        );
    };

 export default AppRouter;