import "./utily.css";
import React from "react";
import ReactAvatarEditor from "react-avatar-editor";
import { CloseSvg } from "./Svg";
import request from "../utils/request";
import styled from "styled-components";

export default function ImageEditor(props) {
    /*
    props:
        - title: 弹出框的标题
        - imageObject: 图片
        - visible: 弹出框是否可见
        - setVisible: 设置弹出框是否可见
        - hasRemove: 是否有删除按钮
        - handleIconRemove: 点击删除图片的回调函数
        - handleIconResult: 点击确认图片的回调函数
    */

    const { title, setVisible, hasRemove, imageObject, handleRemove, handleResult } = props;
    const [isOverlayShow, setIsOverlayShow] = React.useState(false);
    // mode 0 是上传模式，模式2是选择模式
    const [mode, setMode] = React.useState(0);
    var editor = null;

    // 图标编辑插件
    const [iconObj, setIconObj] = React.useState({
        image: imageObject,
        allowZoomOut: false,
        position: { x: 0.5, y: 0.5 },
        scale: 1,
        rotate: 0,
        borderRadius: 0,
        preview: null,
        width: 200,
        height: 200,
    });


    const handleImageRemove = () => {
        handleRemove();
    }

    const handleImageResult = () => {
        const canvasScaledData = editor.getImageScaledToCanvas().toDataURL();
        handleResult(canvasScaledData);
        setIsOverlayShow(false);
    }

    // 监听弹出框的显示与隐藏
    React.useEffect(() => {
        setIsOverlayShow(props.visible);
    }, [props.visible]);


    React.useEffect(() => {
        setVisible(isOverlayShow);
        // eslint-disable-next-line
    }, [isOverlayShow]);

    //eslint-disable
    React.useEffect(() => {
        setIconObj({
            ...iconObj,
            image: imageObject,
        })
        //eslint-disable-next-line
    }, [props.imageObject]);

    //eslint-disable-next-line
    const handleNewImage = e => {
        if (e.target.files) {
            setIconObj({ ...iconObj, image: e.target.files[0] });
        }
    }

    const handleScale = e => {
        const scale = parseFloat(e.target.value)
        setIconObj({ ...iconObj, scale: scale })
    }

    const handlePositionChange = position => {
        setIconObj({ ...iconObj, position: position })
    }

    const setEitorRef = (ed) => editor = ed;


    // 选完之后，将图片的base64传给父组件
    const handleModeChange = () => {
        setMode(mode === 0 ? 1 : 0);
    }
    const [icons, setIcons] = React.useState([
    ]);

    React.useEffect(() =>{
        request({
            url: "/upload/icon"
        }).then(res=>{
            setIcons(res.data)
        })
    }, [])

    return (
        <>
            {isOverlayShow && <Overlay setIsOverlayShow={setIsOverlayShow} title={title}>
                <div className="editor-box">

                    {mode === 0 && <> <div className="editor-canvas">
                        <ReactAvatarEditor
                            crossOrigin="use-credentials"
                            ref={setEitorRef}
                            scale={parseFloat(iconObj.scale)}
                            width={iconObj.width}
                            height={iconObj.height}
                            position={iconObj.position}
                            onPositionChange={handlePositionChange}
                            rotate={parseFloat(iconObj.rotate)}
                            borderRadius={iconObj.width / (100 / iconObj.borderRadius)}
                            image={iconObj.image}
                            className="editor-canvas"
                        />
                        <div className="editor-scale flex flex-row">
                            <div className="scale-label">
                                缩放:
                            </div>
                            <div className="scale-box">
                                <input
                                    name="scale"
                                    type="range"
                                    onChange={handleScale}
                                    min={iconObj.allowZoomOut ? '0.1' : '1'}
                                    max="2"
                                    step="0.01"
                                    defaultValue="1"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="editor-ops">
                        <div className="editor-button editor-select" onClick={handleModeChange}>
                            从图标库选择
                        </div>

                        {hasRemove && <div className="editor-enter editor-button" onClick={handleImageRemove}>
                            移除当前
                        </div>}

                        <div className="editor-upload editor-button">
                            上传图片
                            <input name="newImage" type="file" onChange={handleNewImage} />
                        </div>

                        <div className="editor-enter editor-button" onClick={handleImageResult}>
                            确定
                        </div>
                    </div></>}

                    {mode === 1 && <div className="select-box">
                        {icons.map((item) => {
                            return <div className="select-item" key={item.id}>
                                <img src={item.url} alt={item.name}
                                    onClick={() => {
                                        setIconObj({ ...iconObj, image: item.url });
                                        setMode(0);
                                    }
                                    }
                                />
                            </div>
                        })}
                        </div>}
                </div>
            </Overlay>}
        </>
    )
}




export function Overlay({ children, setIsOverlayShow, title }) {
    /*
    props:
        - title: 弹出框的标题
        - setOverlayShow: 设置弹出框是否可见
        - children: 弹出框的内容
    */
    return (
        <>
            <div className="darkBG" onClick={() => { setIsOverlayShow(false) }}
            />
            <div className="centered">
                <div className="modal">
                    {/* 头部 */}
                    <div className="modalHeader">
                        <h5 className="heading">{title}</h5>
                    </div>
                    <div className="closeBtn" onClick={() => setIsOverlayShow(false)}>
                        <CloseSvg size={28}></CloseSvg>
                    </div>
                    {/* 内容 */}
                    <div className="modalContent">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

const InputWithLableMain = styled.div`
    width: 100%;
    position: relative;
    border-radius: 10px;
    transition: all 0.3s cubic-bezier(0,0,.2,1);
    border: 2px solid ${props => props.editting ? 'black' : "white"};
    padding: 1px 2px 2px 1px;
`;

const InputWithLableWraper = styled.div`
    background-color: #fff0;
    border-radius: 10px;
    border-style: solid;
    border-width: 2px;
    border-color: ;
    display: flex;
    line-height: 48px;
    border-color: ${props => props.editting ? 'white' : props.color ? props.color : "white"};
    &:hover {
        border: 2px solid ${props => props.editting ?
        (props.color === "white" ? 'white' : props.color) :
        (props.color === "white" ? '#e3e3e3' : props.color)};
        };
    }
`;

const InputWithLableTag = styled.label`
    display: flex;
    color: rbg(103 107 96);
    line-height: 0;
    font-size: 14px;
    padding-left: 1rem;
    background-color: rgb(239 240 235);
    align-items: center;
    height: 3rem;
    border-radius: 0.5rem 0 0 0.5rem;

`;


const InputWithLableBox = styled.div`
    position: relative;
    flex-grow: 1;
`;

const WithLableInput = styled.input`
    transition: all 0.3s cubic-bezier(0,0,.2,1);
    outline: 2px solid #0000!important;
    border: none;
    outline-offset: 2px!important;
    color: #000;
    line-height: 48px;
    font-size: 14px;
    border-radius: 0 .5rem .5rem 0;
    height: 3rem;
    width: 100%;
    display: block;
    padding-left: 0.25rem;
    padding-right: 3rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    background-color: rgb(239 240 236)
`;

export function InputWithLable(props) {
    /*
    :params
        :title 标题
        :content 编辑器内容
        :onChange 改变内容的方法
    */
    const [content, setContent] = React.useState(props.content);
    const [isEditting, setIsEditting] = React.useState(false);

    React.useEffect(() => {
        setContent(props.content);
    }, [props.content])

    const handleChange = (e) => {
        setContent(e.target.value);
        props.onChange(e.target.value);
    }

    const handleBlur = () => {
        setIsEditting(false);
    }

    const handleFoucs = () => {
        setIsEditting(true);
    }
    
    return (
        <InputWithLableMain editting={isEditting}>
            <InputWithLableWraper color={props.color} editting={isEditting}>
                <InputWithLableTag>{props.title}</InputWithLableTag>
                <InputWithLableBox>
                    <WithLableInput type={props.type ? props.type : "text"} placeholder={props.placeholder} value={content} onFocus={handleFoucs} onBlur={handleBlur} onChange={handleChange}></WithLableInput>
                </InputWithLableBox>
            </InputWithLableWraper>
        </InputWithLableMain>
    )
}




const InputBox = styled.div`
    width: 100%;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    border: 2px solid ${props => props.isOverLength ? 'red' : props.editting ? 'black' : 'white'}; 
    margin-bottom: 10px;
    background-color: var(--gray-bg);
    transition: all 0.3s cubic-bezier(0,0,.2,1);
    &:hover {
        border: 2px solid ${props => props.isOverLength ? 'red' : props.editting ? 'black' : '#e3e3e3'}; 
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


export function InputNormal(props) {
    const [content, setContent] = React.useState(props.content);
    const [isEditting, setIsEditting] = React.useState(false);
    const [isOverLength, setIsOverLength] = React.useState(false);

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