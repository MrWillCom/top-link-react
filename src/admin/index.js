
import { Navigate, Route, Routes } from "react-router-dom";
import AdminIndex from "./link/link";
import AdminSkin from "./skin/skin";
import AdminSetting from "./setting/setting";
import AdminNav from "../components/AdminNav";
import "./index.css";

export default function Admin() {
    return (
        <div className="admin flex flex-direction-row">
            <div className="admin-content">
                <AdminNav />
                <Routes>
                    <Route index element={<Navigate replace to="link" />}></Route>
                    <Route path="link" index element={<AdminIndex />} />
                    <Route path="skin" element={<AdminSkin />} />
                    <Route path="setting" element={<AdminSetting />} />
                </Routes>
            </div>
            <div className="admin-sidebar">
                <div className="sidebar-header">
                    <div className="title">专属链接:</div>
                    <div className="link">https://www.baidu.com/</div>
                </div>
                <div className="sidebar-content">
                </div>
            </div>
        </div>
    );
}