import React from "react"
import { Routes, Route } from "react-router-dom"
import AuthPage from "./Pages/AuthPage"
import TokenPage from "./Pages/TokenPage"
import AdminPage from "./Pages/AdminPage"
import InfoPage from "./Pages/InfoPage"


export const useRoutes = (isAuthenticated, isCompletely) => {
    if(isAuthenticated) {
        if(isCompletely) {
            return(
                <Routes>
                    <Route path="/" element={<AdminPage />} exact />
                    <Route path="*" element={<AdminPage />} exact />
                </Routes>
            );
        }
        else {
            return(
                <Routes>
                    <Route path="/" element={<InfoPage />} exact />
                    <Route path="*" element={<InfoPage />} exact />
                </Routes>
            );
        }

    }

    return(
        <Routes>
            <Route path="/" element={<AuthPage />} exact />
            <Route path="/window" element={<TokenPage />} exact />
            <Route path="*" element={<AuthPage />} exact />
        </Routes>
    );
}