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
                window.location.replace("/login")
                console.log("get me failed", err);
            })
        }
        initMe();
    }, []);

    const handleLoginOut = () => {
        window.localStorage.removeItem("token");
        window.location.replace("/");
    }
    
    return (
        <>
        <div className="admin flex flex-direction-column">
            {/* 顶部的导航区*/}
            <div className="admin-header flex flex-direction-row">

                {/* 顶部的导航区 */}
                <div className="nav-header admin-left">
                    <AdminNav />
                </div>

                {/* 顶部的导航区的链接及分享 */}
                <div className="nav-user admin-right">
                   <div className="user-link">
                    <div className="title">专属链接:
                        <a className="link" target="_blank" href={"/"+username}>{"https://the.top/"+username}</a>
                    </div>
                  
                   </div>
                   <div className="logout-box" onClick={handleLoginOut}>
                    <div className="login-out">退出登录</div>
                   </div>
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
        <div className="need-pc">后台暂时仅支持大屏幕设备访问</div>
        </>
    );
}
