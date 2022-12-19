import "./skin.css";
import { useState, useEffect } from "react";
import request from "../utils/request";
import styled from "styled-components";
import SiderBar from "./siderbar";
import { staticUrl } from "../utils/utils";
import { useTranslation } from "react-i18next";

export default function AdminSkin() {

 

    /* ----------  STATE ---------- */
    const [theme, setTheme] = useState({});
    const [setting, setSetting] = useState({});
    const [links, setLinks] = useState([]);

    // 目前的主题名字
    const [currTheme, setCurrTheme] = useState("");
    const [themes, setThemes] = useState([]);

    const { t } = useTranslation();

    /* ---------- LIFETIME ---------- */
    useEffect(() => {
        const getThemes = () => {
            request({
                url: `/theme/all`,
                method: "GET",
            }).then(res => {
                console.log("get themes success", res.data);
                let themes = res.data.filter(theme => {return theme.display !== false});
                themes.sort((a, b) => {return a.position - b.position});
                setThemes(themes);
            }).catch(err => {
                console.log("get themes failed", err);
            })
        }

        const getMe = () => {
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
        getMe();
        getThemes();
    }, [])

  useEffect(() =>{
    console.log("currTheme changed", currTheme);
    if (currTheme) {
        getTheme(currTheme);
    }
  }, [currTheme])
 
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
            url: `/setting/user/${username}`,
            method: "GET",
        }).then(res => {
            setCurrTheme(res.data.theme);
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

    return (
        <div className="skin-root">
            <div className="skin-main admin-left">
                <h4>{t("adminTheme.list")}</h4>
                <div className="skin-box">
                    <div className="skin-wraper">
                        <SkinList themes={themes} currTheme={currTheme} setCurrTheme={setCurrTheme}></SkinList>
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
    const { themes, currTheme, setCurrTheme } = props;
    return (
        <div className="skin-list">
            {themes.map((theme, index) => {
                return <SkinDetail key={index} {...theme} setCurrTheme={setCurrTheme} currTheme={currTheme}></SkinDetail>
            })}
        </div>
    )
}


const Thumb = styled.div`
    transition: all 0.25s cubic-bezier(0,0,.2,1);
    border-radius: 25px;
    height: 100%;
    padding: ${(props) => props.isCurrent ? '3': '0'}px;
    border: ${(props) => props.isCurrent? '2': '1'}px solid rgb(235 238 241);
`;

const ThumbImg = styled.img`
    width: 100%;
    height: 100%;
    opacity: .9;
    border-radius: 25px;
`;


function SkinDetail(props) {
    const { thumb, title, name, currTheme, setCurrTheme} = props;

    const patchTheme = (name) => {
        request({
            url: `/setting/theme/${name}`,
            method: "PATCH",
            needToken: true,
        }).then(res => {
            setCurrTheme(name);
            console.log("PATCH /setting/theme", res.data);
        }).catch(err => {
            console.log("PATCH /setting/theme failed", err);
        })
    }

    const changeCurrTheme = () => {
        patchTheme(name);
    }

    return (
        <div className="skin-detail" onClick={changeCurrTheme}>
            <div className="detail-box">
                <Thumb isCurrent={currTheme===name}>
                    <ThumbImg src={staticUrl +  thumb}></ThumbImg>
                </Thumb>
            </div>
            <div className="title">{title}</div>
        </div>
    )
}