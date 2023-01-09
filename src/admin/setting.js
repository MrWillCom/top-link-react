import "./setting.css";
import { useState, useEffect } from "react";
import React from 'react';
import request from "../utils/request";
import { InputNormal } from "../components/utily";
import SiderBar from "./siderbar";
import { Button } from "../components/button";
import ImageEditor from "../components/utily";
import { debounceFunction, staticUrl } from "../utils/utils";
import { useTranslation } from "react-i18next";

export default function AdminSetting() {

    /* ----------  STATE ---------- */
    const [theme, setTheme] = useState({});
    const [setting, setSetting] = useState({});
    const [links, setLinks] = useState([]);
    const [isAvatarEditting, setIsAvatarEditting] = useState(false);

    const {t} = useTranslation();

    /* ---------- LIFETIME ---------- */
    useEffect(() => {

        const initMe = () => {
            request({
                url: "/user/me",
                method: "GET",
                needToken: true,
            }).then(res => {
                // 获取并设置用户设置信息
                getSetting(res.data.user_name);
                // 获取用户链接相关信息
                getLinks(res.data.user_name);

            }).catch(err => {
                console.log("get me failed", err);
            })
        }

        const getTheme = (themeName) => {
            request({
                url: `/theme/${themeName}`,
                method: "GET",
            }).then(res => {
               
                setTheme(res.data);
            }).catch(err => {
                console.log("get theme failed", err);
            })
        }
    
        const getSetting = (username) => {
            request({
                url: `/setting/user/${username}`,
                method: "GET",
            }).then(res => {
               
                setSetting(res.data);
                getTheme(res.data.theme);
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
         
        // 初始化加载
        initMe();
    }, [])
    
    
    // 同步设置
    const syncSetting = React.useCallback(
        debounceFunction((data) => {
            request({
                url: "/setting/base",
                method: "PATCH",
                needToken: true,
                data : {page_title: data.page_title, page_bio: data.page_bio, profile_picture: data.profile_picture},
            })
            .then(res => {
                //console.log("sync setting success", res);
            }).catch(err => {
                console.log("sync setting failed", err);
            })
        }, 300), []);

    
    // 监听 setting 变化
    React.useEffect(() => {
        if (Object.keys(setting).length > 0) {
            syncSetting(setting);
        }
    }, [setting])

    
    const handleChangeTitle = (value) => {
        if (value.length <= 28 && value.length > 0) {
            setSetting({
                ...setting,
                page_title: value,
            })
        }
    }

    const handleChangeBio = (value) => {
        if (value.length <= 80) {
            setSetting({
                ...setting,
                page_bio: value,
            })
        }
    }

    const handleChangeAvatar = () => {
        setIsAvatarEditting(true);
    }

    const handleAvatarResult = (result) => {
        request({
            url: "/upload/images/avatar",
            method: "POST",
            needToken: true,
            data: {image_b64: result, origin: setting.profile_picture},
        }).then(res => {
            console.log(res.data);
            setSetting({
                ...setting,
                profile_picture: `${res.data.file_name}`
            })
            setIsAvatarEditting(false);
        }).catch(err => {
            console.log("upload avatar failed", err);
        })
    }
    
    const handleAvatarRemove = () => {

    }

    return (
        <div className="setting-root">
            <ImageEditor 
                title={t("adminSetting.layerTitle")}
                imageObject = {staticUrl + setting.profile_picture}
                visible={isAvatarEditting} 
                setVisible={setIsAvatarEditting}
                hasRemove={false}
                hasChoose={false}
                handleRemove={handleAvatarRemove} 
                handleResult={handleAvatarResult}
            />

            <div className="setting-main admin-left">
                <h4>{t("adminSetting.profile")}</h4>
                <div className="setting-box">
                    <div className="setting-wraper">
                        <div className="setting-avatar">
                            <div className="avatar">
                                {setting.profile_picture &&  <img src={staticUrl + setting.profile_picture} alt="avatar" />} 
                            </div>
                            <div className="upload-avatar">
                                <Button primary onClick={handleChangeAvatar}>{t("adminSetting.changeAvatar")}</Button>
                            </div>
                        </div>
                        <div className="setting-info">
                            <InputNormal title={t("adminSetting.title")} content={setting.page_title} maxLength={28} onChange={handleChangeTitle}/>
                            <InputNormal title={t("adminSetting.bio")} content={setting.page_bio} maxLength={80} onChange={handleChangeBio}/>
                            <div className="bio"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="link-siderbar admin-right">
                <SiderBar links={links} setting={setting} theme={theme}></SiderBar>
            </div>

        </div>
    )
}