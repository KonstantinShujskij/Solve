import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Welcom from "./Pages/WelcomePage"
import AuthPage from "./Pages/AuthPage"
import TokenPage from "./Pages/TokenPage"
import InfoPage from "./Pages/InfoPage"
import ClientPage from "./Pages/ClientPage"
import MasterPage from "./Pages/MasterPage"
import SettingsPage from "./Pages/SettingsPage"
import CreatePage from "./Pages/CreatePage"
import LoginSection from "./sections/LoginSection"
import SignupSection from "./sections/SignupSection"
import DevicePage from "./Pages/DevicePage"
import ContractPage from "./Pages/ContractPage"
import ProfilePage from "./Pages/ProfilePage"
import SearchPage from "./Pages/SearchPage"
import DevicesListSection from "./sections/DevicesListSection"
import AuctionListSection from "./sections/AuctionListSection"
import WorkListSection from "./sections/WorkListSection"
import ClaimListSection from "./sections/ClaimListSection"
import SearchListSection from "./sections/SearchListSection"
import SettingsMenuSection from "./sections/SettingsMenuSection"
import SettingsPhoneSection from "./sections/SettingsPhoneSection"
import SettingsSocialSection from "./sections/SettingsSocialSection"
import TestPage from "./Pages/TestPage"
import AcceptPage from "./Pages/AcceptPage"
import ListSection from "./sections/ListSection"
import SearchFilterSection from "./sections/SearchFilterSection"
import WorkFilterSection from "./sections/WorkFilterSection"
import ConfirmPage from "./Pages/ConfirmPage"
import RulesPage from "./Pages/RulesPage"
import PolicyPage from "./Pages/PolicyPage"


export const useRoutes = (isAuthenticated, isConfirm, isCompletely, type) => {
    if(!isAuthenticated) {
        return(
            <Routes>
                <Route path="/" element={<Welcom />} exact />
                <Route path="/auth" element={<AuthPage />} exact >
                    <Route path="login" element={<LoginSection />} exact />
                    <Route path="signup" element={<SignupSection />} exact />
                </Route>
                <Route path="/window" element={<TokenPage />} exact />

                <Route path="/rules" element={<RulesPage />} exact />
                <Route path="/policy" element={<PolicyPage />} exact />
                <Route path="*" element={<Welcom />} exact />
            </Routes>
        )
    }

    if(!isConfirm) {
        return(
            <Routes>
                <Route path="*" element={<ConfirmPage />} exact />
            </Routes>
        )
    }

    if(!isCompletely) {
        return(
            <Routes>
                <Route path="/" element={<InfoPage />} exact />
                <Route path="*" element={<InfoPage />} exact />
            </Routes>
        )
    }

    if(type === 'CLIENT') {
        return(
            <Routes>
                <Route path="/" element={<ClientPage />} exact>
                    <Route index element={<DevicesListSection />} exact />
                    <Route path="auction-list" element={<AuctionListSection />} exact />
                </Route>                       
                <Route path="/settings" element={<SettingsPage />} exact>
                    <Route index element={<SettingsMenuSection />} exact />
                    <Route path="phone" element={<SettingsPhoneSection />} exact />
                    <Route path="social" element={<SettingsSocialSection />} exact />
                </Route>
                <Route path="/create" element={<CreatePage />} exact />
                <Route path="/search" element={<SearchPage />} exact />
                <Route path="/device/:id" element={<DevicePage />} exact />
                <Route path="/contract/:id" element={<ContractPage />} exact />
                <Route path="/accept/:device/:owner" element={<AcceptPage />} exact />
                <Route path="/profile/:id" element={<ProfilePage />} exact />
                
                <Route path="*" element={<Navigate to="/" replace />} exact />
            </Routes>
        )
    }
    else if(type === 'MASTER') {
        return(
            <Routes>
                <Route path="/" element={<MasterPage />} exact>
                    <Route index element={<Navigate to="/work-list" replace />} />
                    
                    <Route path="work-list" element={<ListSection />} exact>
                        <Route index element={<WorkListSection />} exact />
                        <Route path="filter" element={<WorkFilterSection />} exact />
                    </Route>

                    <Route path="search-list" element={<ListSection />} exact>
                        <Route index element={<SearchListSection />} exact />
                        <Route path="filter" element={<SearchFilterSection />} exact />
                    </Route>
                    
                    <Route path="claim-list" element={<ClaimListSection />} exact />

                    <Route path="*" element={<Navigate to="/work-list" replace />} />
                </Route>        
                <Route path="/device/:id" element={<DevicePage />} exact />
                <Route path="/contract/:id" element={<ContractPage />} exact />
                <Route path="/settings" element={<SettingsPage />} exact>
                    <Route index element={<SettingsMenuSection />} exact />
                    <Route path="phone" element={<SettingsPhoneSection />} exact />
                    <Route path="social" element={<SettingsSocialSection />} exact />
                </Route>
                <Route path="/test" element={<TestPage />} exact />

                <Route path="*" element={<Navigate to="/work-list" replace />} exact />
            </Routes>
        )
    }      

}