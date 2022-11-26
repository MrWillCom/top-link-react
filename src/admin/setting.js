import "./setting.css";
import { useState, useEffect } from "react";
import React from 'react';
import request from "../utils/request";
import styled from "styled-components";
import SiderBar from "./siderbar";
import { Button } from "../components/button";
import ImageEditor from "../components/utily";


export default function AdminSetting() {


    /* ----------  STATE ---------- */
    const [theme, setTheme] = useState({});
    const [setting, setSetting] = useState({});
    const [links, setLinks] = useState([]);
    const [isAvatarEditting, setIsAvatarEditting] = useState(false);


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
                console.log("fetch theme ->", res.data);
                setTheme(res.data);
            }).catch(err => {
                console.log("get theme failed", err);
            })
        }
    
        const getSetting = (username) => {
            request({
                url: `/setting/${username}`,
                method: "GET",
            }).then(res => {
                console.log(res.data)
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

 
    const handleChangeTitle = (value) => {
        if (value.length <= 28 && value.length > 0) {
            setSetting({
                ...setting,
                page_title: value,
            })
        }
    }

    const handleChangeBio = (value) => {
        if (value.length <= 80 && value.length > 0) {
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

    }
    
    const handleAvatarRemove = () => {

    }
    return (
        <div className="setting-root">
            <ImageEditor 
                title="更换头像"
                imageObject = {setting.profile_picture}
                visible={isAvatarEditting} 
                setVisible={setIsAvatarEditting}
                hasRemove={false}
                handleRemove={handleAvatarRemove} 
                handleResult={handleAvatarResult}
            />

            <div className="setting-main admin-left">
                <h4>个人资料</h4>
                <div className="setting-box">
                    <div className="setting-wraper">
                        <div className="setting-avatar">
                            <div className="avatar">
                                <img src={setting.profile_picture} alt="avatar" />
                            </div>
                            <div className="upload-avatar">
                                <Button primary onClick={handleChangeAvatar}>更换</Button>
                            </div>
                        </div>
                        <div className="setting-info">
                            <PrifileEdit title="用户名" content={setting.page_title} maxLength={28} onChange={handleChangeTitle}/>
                            <PrifileEdit title="简介" content={setting.page_bio} maxLength={80} onChange={handleChangeBio}/>
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



const InputBox = styled.div`
    width: 100%;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    border: 2px solid ${props => props.isOverLength ? 'red': props.editting ? 'black': 'white'}; 
    margin-bottom: 10px;
    background-color: var(--gray-bg);
    transition: all 0.3s cubic-bezier(0,0,.2,1);
    &:hover {
        border: 2px solid ${props => props.isOverLength ? 'red': props.editting ? 'black': '#e3e3e3'}; 
    }
`;


const InputTitle = styled.div`
    padding: 10px 0 0px 0;
    margin-left: 10px;
    color: rgb(103 107 95);
`;

const Input = styled.input`
    background-color: var(--gray-bg);
    width: 90%;
    margin-left: 10px;
    border: none;
    padding: 5px 0px 10px 0px;
    font-size: 16px;
    outline: none;
`;


function PrifileEdit(props) {
    const [content, setContent] = useState(props.content);
    const [isEditting, setIsEditting] = useState(false);
    const [isOverLength, setIsOverLength] = useState(false);

    React.useEffect(() => {
        setContent(props.content);
    }, [props.content])

    const handleChange = (e) => {
        setContent(e.target.value);
        if (e.target.value.length > props.maxLength) {
            setIsOverLength(true);
        } else {
            setIsOverLength(false);
        }
        props.onChange(e.target.value);
    }

    const handleBlur = () => {
        setIsEditting(false);
    }
    
    const handleFoucs = () => {
        setIsEditting(true);
    }

    return (
        <InputBox editting={isEditting} isOverLength={isOverLength}>
            <InputTitle>{props.title}</InputTitle>
            <Input type="text" value={content || ''} onChange={handleChange} onFocus={handleFoucs} onBlur={handleBlur} />
        </InputBox>
    )
}