/* eslint-disable react-hooks/exhaustive-deps */
import Switch from "../components/button";
import { CardItemSvg, PictureSvg, DeleteSvg, EditSvg } from "./Svg";
import { useState, useRef, useEffect } from "react";
import { Button } from "./button";
import AnimateHeight from "react-animate-height";
import request from "../utils/request";
import ImageEditor from "./utily";
import "./ControlCard.css";


export default function ControlCard(props) {

    let { updateLink, deleteLink } = props;
    const refTitle = useRef();
    const refUrl = useRef();
  

    /* ----------  STATE ---------- */
    const [link, setLink] = useState(props.link);

    // 是否在编辑标题
    const [isEditingTitle, setIsEditingTitle] = useState(false);

    // 是否在编辑链接
    const [isEditingUrl, setIsEditingUrl] = useState(false);

    // 扩展组件选择
    const [extraId, setExtraId] = useState(0);

    // 用于卡片动画的高度控制
    const [height, setHeight] = useState(0);

    // 控制弹出层是否显示
    const [isOverlayShow, setIsOverlayShow] = useState(false);

    /* ---------- LIFETIME ---------- */

    useEffect(() => {
        updateLink(link);
    }, [link])

    /* ---------- FUNCTION ---------- */

    // 点击了启用按钮
    const handleClickSwitch = () => {
        let newLink = { ...link };
        newLink.display = !newLink.display;
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
    // 点击删除按钮后
    const handleDetele = () => {
        // 展开删除确定组件
        setExtraId(1);
        setHeight('auto');
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

    // handleEdit
    const handleEditIcon = () => {
        setExtraId(2);
        setHeight('auto');
    }
    

    const handleIconResult = (imageData) => {
        request({
            url: "/upload/icon",
            method: "POST",
            needToken: true,
            data: {image_b64: imageData, origin: link.thumb}, 
        }).then(res => {
            console.log(res)
            let newLink = { ...link };
            newLink.thumb = `/images/thumb/${res.data.file_name}`
            setLink(newLink);
            // 关闭弹出层与编辑组件
            setHeight(0);
            setIsOverlayShow(false);
        }).catch(err => {
            console.log(err)
        })
    }

    const handleIconRemove = () => {
        request({
            url: "/upload/icon",
            method: "DELETE",
            needToken: true,
            data: {data: link.thumb},
        }).then(res=>{
            console.log(res)
        })

        let newLink = { ...link };
        newLink.thumb = ""
        setLink(newLink);
        // 关闭弹出层与编辑组件
        setHeight(0);
        setIsOverlayShow(false);
    }

    return (
        <div className="link-control-item-box">

            <ImageEditor 
                title="上传图片"
                imageObject = {link.thumb}
                visible={isOverlayShow}
                setVisible={setIsOverlayShow} 
                hasRemove={true} 
                handleRemove={handleIconRemove} 
                handleResult={handleIconResult}
            />

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
                                <Switch on={link.display} onClick={handleClickSwitch}></Switch>
                            </div>
                        </div>
                        <div className="control-magic">
                            <div className="control-icons" onClick={handleEditIcon}>
                                <PictureSvg size="24" strokeWidth={1}></PictureSvg>
                            </div>
                            {/*  删除按钮 */}
                            <div className="control-delete" onClick={handleDetele} aria-expanded={height !== 0} aria-controls="exam">
                                <DeleteSvg size={16}></DeleteSvg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 卡片底部，扩展显示 */}
                <div className="link-control-extra">
                    <AnimateHeight id="exam" duration={500} height={height}>
                        <SwitchExtraItem
                            extraId={extraId} setExtraId={setExtraId}
                            link={link} deleteLink={deleteLink}
                            setHeight={setHeight} height={height}
                            setIsOverlayShow={setIsOverlayShow}

                        ></SwitchExtraItem>
                    </AnimateHeight>
                </div>
            </div>
        </div>
    )
}


// 根据编号选择子组件
function SwitchExtraItem(props) {
    switch (props.extraId) {
        case 1:
            return <ExtraControlDelete {...props}></ExtraControlDelete>
        case 2:
            return <ExtraControlEditIcon {...props}></ExtraControlEditIcon>
        default:
            return <ExtraControlDefault></ExtraControlDefault>
    }
}

// extraId = 1, 删除链接组件
export function ExtraControlDelete({ deleteLink, link, setHeight, height }) {
    const handleClickDelete = () => {
        deleteLink(link.lid);
        request({
            url: '/links/',
            method: 'DELETE',
            needToken: true,
            data: {data: link.lid}
        }).then(res => {
            console.log("删除卡片", res)
        })
        request({
            url: "/upload/icon",
            method: "DELETE",
            needToken: true,
            data: {data: link.thumb},
        }).then(res=>{
            console.log("删除缩略图", res)
        })

    }
    const handleClickCancle = () => {
        setHeight(0);
    }
    return (
        <div className="extra-contron-item extra-control-delete">
            <div className="header">删除</div>
            <div className="content">是否要永久删除此链接?</div>
            <div className="ops">
                <Button primary onClick={handleClickDelete}>确定</Button>
                <Button onClick={handleClickCancle} aria-expanded={height !== 0} aria-controls="exam">取消</Button>
            </div>
        </div>
    )
}

// extraId = 2
export function ExtraControlEditIcon({ setIsOverlayShow, setHeight, height }) {
    const handleClickCancle = () => {
        setHeight(0);
    }

    const handleClickUpload = () => {
        setIsOverlayShow(true);
    }
    return (
        <div className="extra-contron-item extra-control-edit">
            <div className="header">设置缩略图</div>
            <div className="content">设置链接左侧缩略图</div>
            <div className="ops">
                <Button primary onClick={handleClickUpload}>设置</Button>
                <Button onClick={handleClickCancle} aria-expanded={height !== 0} aria-controls="exam">取消</Button>
            </div>
        </div>
    )
}

export function ExtraControlDefault() {
    return (
        <div className="extra-contron-item extra-control-edit">
            <div className="header"> hide </div>
            <div className="content">hide </div>
            <div className="ops">
                <Button primary> hide </Button>
                <Button> hide </Button>
            </div>
        </div>
    )
}