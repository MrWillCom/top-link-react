import "./link.css";
import {  PlusSvg, LoadingSvg } from "../components/Svg";
import ControlCard from "../components/ControlCard";
import { useState, useEffect, useCallback } from "react";
import { ReactSortable } from "react-sortablejs";
import { v4 as uuid } from "uuid";
import request from "../utils/request";
import SiderBar from "./siderbar";
import { debounceFunction } from "../utils/utils";
import { useTranslation } from "react-i18next";

export default function AdminLink() {


    /* ----------  STATE ---------- */
    
    const [setting, setSetting] = useState({});
    const [links, setLinks] = useState([]);
    const [hasLinks, setHasLinks] = useState(true);
    const [theme, setTheme] = useState({});
    const [isSorting, setIsSorting] = useState(false); // 控制卡片是否在排序中

    const {t} = useTranslation();

    /* ---------- LIFETIME ---------- */
    useEffect(() => {
        const getMe = () => {
            request({
                url: "/user/me",
                method: "GET",
                needToken: true,
            }).then(res => {
                // 获取并设置用户设置信息
                getSetting(res.data.user_name);
                // 获取用户链接相关信息
                getLinks(res.data.user_name);;

            }).catch(err => {
                console.log("get me failed", err);
            })
        }
        getMe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // 检测 links 发生的变化
    useEffect(() => {
        // 向服务器提交更新
        if (links.length) {
            debounceSyncLinks(links)
        }
        // eslint-disable-next-line
    }, [links])

    /* ---------- FUNCTION ---------- */
    const syncLinks = (links) => {
        request({
            url: "/links",
            method: "POST",
            needToken: true,
            data: {links: links}
        }).then(res => {
            console.log("sync links successfully", links);
        }).catch(err => {
            console.log("sync links failed", err);
        })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceSyncLinks = useCallback(
        // eslint-disable-next-line
        debounceFunction((newLinks) => syncLinks(newLinks), 300),
        []
    );

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
            if(cards.length===0){
                setHasLinks(false);
            }
            setLinks(cards);
        })
    }

    const updateOrder = (updatedList) => {
        if (!isSorting) return;
        setIsSorting(false);
        updatedList.forEach((link, index) => {
            link.position = index + 1;
        });
        updatedList.sort((a, b) => {
            return a.position - b.position;
        });
        setLinks(updatedList);
    };

    const addNewLink = () => {
        let newLink = {
            thumb: "",
            title: t("adminLink.editText"),
            url: "https://the.top/",
            lid: uuid(),
            display: false,
            position: 1,
        };
        
        let newLinks = [newLink, ...links];
        newLinks.forEach((link, index) => {
            link.position = index + 1;
        });
        setLinks(newLinks);
    }

    const deleteLink = (lid) => {
        let newLinks = links.filter((link) => {
            return link.lid !== lid;
        });
        setLinks(newLinks);
    }

    // 子组件更新link
    const updateLink = (data) => {
        let newLinks = [...links];
        newLinks.forEach((link, index) => {
            if (link.lid === data.lid) {
                newLinks[index] = data;
            }
        })
        setLinks(newLinks);
    }

    return (
        <div className="link-root">
            <div className="link-main admin-left">
                <div className="link-box">
                    <div className="link-tools">
                        <div className="link-card-add link-add" onClick={addNewLink}>
                            <button className="link-button">
                               <PlusSvg/ > {t("adminLink.addLink")}
                            </button>
                        </div>
                    </div>
                    {
                        links.length > 0 ? (
                            <ReactSortable
                            className="link-control-box" sort={true}
                            animation={250} easing="cubic-bezier(1, 0, 0, 1)"
                            dragClass="dragging"
                            handle=".control-bar"
                            onStart={() => {
                                setIsSorting(true);
                            }}
                            onChange={() => {
                                setIsSorting(true);
                            }}
                            onEnd={() => { }}
                            list={links}
                            setList={(updatedList) => updateOrder(updatedList)}
                        >
                            {links.map((item) => {
                                return <ControlCard link={item} key={item.lid} updateLink={updateLink} deleteLink={deleteLink}></ControlCard>;
                            })}
                        </ReactSortable>
                        ): (
                            hasLinks ? (
                                <div className="is-loading">
                                    <LoadingSvg></LoadingSvg>
                                </div>
                            ):(
                                <></>
                            )
                        )
                    }
               
                </div>
            </div>

            <div className="link-siderbar admin-right">
                <SiderBar links={links} setting={setting} theme={theme}></SiderBar>
            </div>

        </div>
    )
}
