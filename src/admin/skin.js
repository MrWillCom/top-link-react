import "./skin.css";
import { useState, useEffect, useCallback } from "react";
import request from "../utils/request";
import SiderBar from "./siderbar";


export default function AdminSkin() {

    const theme = {
        textColor: "#fff",
    };

    /* ----------  STATE ---------- */
    const [setting, setSetting] = useState({});
    const [links, setLinks] = useState([]);

    const themes = [
        { name: "default", thumb: "/images/themes/default.png", "title": "默认" },
        { name: "dark", thumb: "/images/themes/dark.png", "title": "暗黑" },
        { name: "rainbow", thumb: "/images/themes/rainbow.png", "title": "彩虹" },
        { name: "blue", thumb: "/images/themes/blue.png", "title": "灵动蓝" },
        { name: "green", thumb: "/images/themes/green.png", "title": "清新绿" },
        { name: "color", thumb: "/images/themes/color.png", "title": "多彩" },
    ];

    /* ---------- LIFETIME ---------- */
    useEffect(() => {
        const getMe = () => {
            request({
                url: "/user/me",
                method: "GET",
                needToken: true,
            }).then(res => {

                console.log("get me successfully", res.data);

                // 获取并设置用户设置信息
                getSetting(res.data.user_name);
                // 获取用户链接相关信息
                getLinks(res.data.user_name);;

            }).catch(err => {
                console.log("get me failed", err);
            })
        }
        getMe();
    }, [])


    const getSetting = (username) => {
        request({
            url: `/setting/${username}`,
            method: "GET",
        }).then(res => {
            console.log("get user successfully", res.data);
            setSetting(res.data);
            // 获取并设置用户信息
        }).catch(err => {
            console.log("get user failed", err);
        })
    }

    const getLinks = (username) => {
        request({
            'url': `/links/${username}`,
            'method': 'GET',
            needToken: true
        }).then(res => {
            let cards = res.data;
            cards.sort((a, b) => {
                return a.position - b.position;
            })
            setLinks(cards);
        })
    }

    return (
        <div className="skin-root">
            <div className="skin-main admin-left">
                <h2>主题列表</h2>
                <div className="skin-box">
                    <div className="skin-wraper">
                        <SkinList themes={themes}></SkinList>
                    </div>
                </div>
            </div>

            <div className="link-siderbar admin-right">
                <SiderBar links={links} setting={setting} theme={theme}></SiderBar>
            </div>

        </div>
    )
}

function SkinList(props) {
    const { themes } = props;
    return (
        <div className="skin-list">
            {themes.map((theme, index) => {
                return <SkinDetail key={index} {...theme}></SkinDetail>
            })}
        </div>
    )
}

function SkinDetail(props) {
    const { thumb, title } = props;
    return (
        <div className="skin-detail">
            <div className="detail-box">
                <div className="thumb">
                    <img src={thumb} alt="" />
                </div>
            </div>
            <div className="title">{title}</div>
        </div>
    )
}