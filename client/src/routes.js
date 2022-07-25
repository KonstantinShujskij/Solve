import React from "react"
import { Routes, Route } from "react-router-dom"
import AuthPage from "./Pages/AuthPage"
import TokenPage from "./Pages/TokenPage"
import InfoPage from "./Pages/InfoPage"
import ClientPage from "./Pages/ClientPage"
import MasterPage from "./Pages/MasterPage"
import SettingsPage from "./Pages/SettingsPage"
import CreatePage from "./Pages/CreatePage"


export const useRoutes = (isAuthenticated, isCompletely, type) => {
    if(isAuthenticated) {
        if(isCompletely) {
            if(type === 'CLIENT') {
                return(
                    <Routes>
                        <Route path="/" element={<ClientPage />} exact />
                        <Route path="/settings" element={<SettingsPage />} exact />
                        <Route path="/create" element={<CreatePage />} exact />
                        <Route path="*" element={<ClientPage />} exact />
                    </Routes>
                )
            }
            else if(type === 'MASTER') {
                return(
                    <Routes>
                        <Route path="/" element={<MasterPage />} exact />
                        <Route path="*" element={<MasterPage />} exact />
                    </Routes>
                )
            }      
        }
        else {
            return(
                <Routes>
                    <Route path="/" element={<InfoPage />} exact />
                    <Route path="*" element={<InfoPage />} exact />
                </Routes>
            )
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