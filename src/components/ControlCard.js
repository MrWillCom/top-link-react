/* eslint-disable react-hooks/exhaustive-deps */
import Switch from "../components/button";
import { CardItemSvg, PictureSvg, DeleteSvg, EditSvg } from "./Svg";
import { useState, useRef, useEffect } from "react";
import "./ControlCard.css";


export default function ControlCard(props) {

    let { updateLink } = props;
    const refTitle = useRef();
    const refUrl = useRef();

    /* ----------  STATE ---------- */
    const [link, setLink] = useState(props.link);

    // 是否在编辑标题
    const [isEditingTitle, setIsEditingTitle] = useState(false);

    // 是否在编辑链接
    const [isEditingUrl, setIsEditingUrl] = useState(false);


    /* ---------- LIFETIME ---------- */

    useEffect(()=>{
        updateLink(link);
    }, [link])

    /* ---------- FUNCTION ---------- */

    // 点击了启用按钮
    const handleClickSwitch = () => {
        let newLink = { ...link };
        newLink.is_show = !newLink.is_show;
        setLink(newLink);
    }

    // input输入了 Title
    const handleInputTitle = (e) => {
        let { value } = e.target;
        let newLink = { ...link };
        newLink.title = value;
        setLink(newLink);        
    };

    // input输入了 Url
    const handleInputUrl = (e) => {
        let { value } = e.target;
        let newLink = { ...link };
        newLink.url = value;
        setLink(newLink);
    };

    // handleClickTitle
    const handleClickTitle = () => {
        setIsEditingTitle(true);
        refTitle.current.focus();
    }

    //hanldeClickUrl 
    const handleClickUrl = () => {
        setIsEditingUrl(true);
        refUrl.current.focus();
    }

    // hanldeTitleOnBlur
    const handleTitleOnBlur = () => {
        setIsEditingTitle(false);
    }
    // handleUrlOnBlur
    const handleUrlOnBlur = () => {
        setIsEditingUrl(false);
    }

    return (
        <div className="link-control-item-box">
            <div className="link-control-item">
                <div className="link-control-content">
                    <div className="control-bar">
                        <CardItemSvg size={16}></CardItemSvg>
                    </div>
                    <div className="control-link">
                        <div className="control-text">
                            <div className="content">
                                <div className="title">
                                    <div className="content-edit" style={{ opacity: isEditingTitle ? '1' : '0', pointerEvents: isEditingTitle ? 'inherit' : 'none' }}>
                                        <input ref={refTitle} className="input input-text-base input-title" type="text" value={link.title}
                                            onChange={handleInputTitle} onBlur={handleTitleOnBlur}></input>
                                    </div>
                                    <div className="content-show" style={{ display: isEditingTitle ? "none" : "inline-flex" }} onClick={handleClickTitle}>
                                        <div className="title-value input-text-base input-title">{link.title}</div>
                                        <EditSvg size={12} className="input-svg"></EditSvg>
                                    </div>
                                </div>

                                <div className="url">
                                    <div className="content-edit" style={{ opacity: isEditingUrl ? '1' : '0', pointerEvents: isEditingUrl ? 'inherit' : 'none' }}>
                                        <input ref={refUrl} className="input input-text-base input-title" type="text" value={link.url}
                                            onChange={handleInputUrl} onBlur={handleUrlOnBlur}></input>
                                    </div>
                                    <div className="content-show" style={{ display: isEditingUrl ? "none" : "inline-flex" }} onClick={handleClickUrl}>
                                        <div className="title-value input-text-base input-url">{link.url}</div>
                                        <EditSvg size={12} className="input-svg"></EditSvg>
                                    </div>
                                </div>
                            </div>
                            <div className="icon">
                                <Switch on={link.is_show} onClick={handleClickSwitch}></Switch>
                            </div>
                        </div>
                        <div className="control-magic">
                            <div className="control-icons">
                                <PictureSvg size="24" strokeWidth={1}></PictureSvg>
                                <PictureSvg size="24" strokeWidth={1}></PictureSvg>
                            </div>
                            <div className="control-delete">
                                <DeleteSvg size={16}></DeleteSvg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="link-control-extra">

                </div>
            </div>
        </div>
    )
}