import { Navigate, Route, Routes } from "react-router-dom";
import request from "../utils/request";
import AdminLink from "./link";
import AdminSkin from "./skin";
import AdminSetting from "./setting";
import AdminNav from "../components/AdminNav";
import React from "react";
import "./index.css";

export default function Admin() {
    const [username, setUsername] = React.useState("");

    React.useEffect(() => {
        const initMe = () => {
            request({
                url: "/user/me",
                method: "GET",
                needToken: true,
            }).then(res => {
                setUsername(res.data.user_name);
            }).catch(err => {
                console.log("get me failed", err);
            })
        }
        initMe();
    }, []);
    return (
        /* 公共的头部 */
        <div className="admin flex flex-direction-column">
            {/* 顶部的导航区*/}
            <div className="admin-header flex flex-direction-row">

                {/* 顶部的导航区 */}
                <div className="nav-header admin-left">
                    <AdminNav />
                </div>

                {/* 顶部的导航区的链接及分享 */}
                <div className="nav-user admin-right">
                    <div className="title">专属链接:</div>
                    <a className="link" target="_blank" href={"/"+username}>{"https://the.top/"+username}</a>
                </div>
            </div>

            {/* 下侧的分区*/}
            <div className="admin-content">
                <Routes>
                    <Route index element={<Navigate replace to="link" />}></Route>
                    <Route path="link" index element={<AdminLink />} />
                    <Route path="skin" element={<AdminSkin />} />
                    <Route path="setting" element={<AdminSetting />} />
                </Routes>
            </div>
        </div>
    );
}
