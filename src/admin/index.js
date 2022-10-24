import { Navigate, Route, Routes } from "react-router-dom";

import AdminIndex from "./link";
import AdminSkin from "./skin";
import AdminSetting from "./setting";
import AdminNav from "../components/AdminNav";
import StyledFrame from "../components/StyledFrame";
import UserProfile from "../components/UserProfile";

import "./index.css";

export default function Admin() {
    const theme = {
        main: "mediumseagreen",
    };
    // github  user avatar
    const devLinks = [
        {thumb:"https://avatars.githubusercontent.com/u/1024025?v=4", title:"React", url:"https://reactjs.org/", lid: 0},
        {thumb:"https://avatars.githubusercontent.com/u/1024025?v=4", title:"React", url:"https://reactjs.org/", lid: 1},
        {thumb:"https://avatars.githubusercontent.com/u/1024025?v=4", title:"React", url:"https://reactjs.org/", lid: 2},
        {thumb:"https://avatars.githubusercontent.com/u/10203793?v=4", title:"very very very ", url:"https://reactjs.org/", lid: 3},
    ];

    const user = {
        userName: "Austin",
        pageBio: "I am a developer",
        profilePicture: "https://avatars.githubusercontent.com/u/1680273?v=4",

    }
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
                    <div className="inner">
                        <div className="previewWrap">
                            <div className="phone">
                                <StyledFrame height="100%" width="100%" theme={theme}>
                                    <UserProfile user={user} devLinks={devLinks} />
                                </StyledFrame>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
