import "./link.css";
import { MusicSvg, PictureSvg } from "../components/Svg";
import ControlCard from "../components/ControlCard";
import { useState, useEffect } from "react";
import { ReactSortable } from "react-sortablejs";


export default function AdminIndex() {

    /* ----------  STATE ---------- */

    const [links, setLinks] = useState([]);
    const [isSorting, setIsSorting] = useState(false); // 控制卡片是否在排序中

    /* ---------- LIFETIME ---------- */

    useEffect(() => {
        let cards = [
            { thumb: "https://avatars.githubusercontent.com/u/1024025?v=4", title: "React 1", url: "https://reactjs.org/", lid: 2, is_show: true, position: 2 },
            { thumb: "https://avatars.githubusercontent.com/u/1024025?v=4", title: "React 2", url: "https://reactjs.org/", lid: 3, is_show: true, position: 3 },
            { thumb: "https://avatars.githubusercontent.com/u/1024025?v=4", title: "React 3", url: "https://reactjs.org/", lid: 4, is_show: true, position: 1 },
            { thumb: "https://avatars.githubusercontent.com/u/10203793?v=4", title: "very very very 4 ", url: "https://reactjs.org/", lid: 5, is_show: true, position: 4 },
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

    // 子组件更新link
    const updateLink = (data) => {
        let newLinks = [...links];
        newLinks.forEach((link) => {
            if (link.lid === data.lid) {
                link[data.key] = data.value;
            }
        }
        );
        setLinks(newLinks);
    }

    return (
        <div className="link-root">
            <div className="link-main">
                <div className="link-tools">
                    <div className="link-card-add link-add">
                        <button className="link-button">添加新链接</button>
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
                    className="link-control-box"
                    sort={true}
                    animation={150}
                    easing="cubic-bezier(1, 0, 0, 1)"
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
                        return <ControlCard link={item} key={item.lid} updateLink={updateLink}></ControlCard>;
                    })}
                </ReactSortable>

            </div>
        </div>
    )
}
