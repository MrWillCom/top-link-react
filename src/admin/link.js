import "./link.css";
import { MusicSvg, PictureSvg } from "../components/Svg";
import ControlCard from "../components/ControlCard";
import { useState, useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import { v4 as uuid } from "uuid";
import SiderBar from "./siderbar";

export default function AdminLink() {
    const user = {
        userName: "Austin",
        pageBio: "I am a developer",
        profilePicture: "https://avatars.githubusercontent.com/u/1680273?v=4",
    }

    const theme = {
        color: "#000",
    }

    /* ----------  STATE ---------- */

    const [links, setLinks] = useState([]);
    const [isSorting, setIsSorting] = useState(false); // 控制卡片是否在排序中

    /* ---------- LIFETIME ---------- */
    useEffect(() => {


        let cards = [
            { thumb: "https://avatars.githubusercontent.com/u/1024025?v=4", title: "React 1", url: "https://reactjs.org/", lid: uuid(), is_show: true, position: 2 },
            { thumb: "https://avatars.githubusercontent.com/u/1024025?v=4", title: "React 2", url: "https://reactjs.org/", lid: uuid(), is_show: true, position: 3 },
            { thumb: "https://avatars.githubusercontent.com/u/1024025?v=4", title: "React 3", url: "https://reactjs.org/", lid: uuid(), is_show: true, position: 1 },
            { thumb: "https://avatars.githubusercontent.com/u/10203793?v=4", title: "very very very 4 ", url: "https://reactjs.org/", lid: uuid(), is_show: true, position: 4 },
        ];
        cards.sort((a, b) => {
            return a.position - b.position;
        })
        setLinks(cards);
    }, [])

    // 检测 links 发生的变化
    useEffect(() => {
        console.log("links changed", links);
    }, [links])

    /* ---------- FUNCTION ---------- */

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

    /* 添加一个新的链接 */
    const addNewLink = () => {
        let newLink = {
            thumb: "https://avatars.githubusercontent.com/u/10203793?v=4",
            title: "the top",
            url: "https://the.top/",
            lid: uuid(),
            is_show: false,
            position: links.length + 1,
        };
        setLinks([newLink, ...links]);
    }

    // 删除一个链接
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
                        <div className="link-card-add link-add">
                            <button className="link-button" onClick={addNewLink}>添加新链接</button>
                        </div>
                        <div className="link-card-add link-add-magic">
                            <div className="button-icon icon-music">
                                <MusicSvg size="16" strokeWidth={1.6}></MusicSvg>
                            </div>
                            <div className="button-icon icon-pic">
                                <PictureSvg size="16" strokeWidth={1.5}></PictureSvg>
                            </div>
                            <button className="link-button">魔法链接</button>
                        </div>
                    </div>

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
                </div>
            </div>

            <div className="link-siderbar admin-right">
                <SiderBar links={links} user={user} theme={theme}></SiderBar>
            </div>

        </div>
    )
}
