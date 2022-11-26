import "./utily.css";
import React from "react";
import ReactAvatarEditor from "react-avatar-editor";
import { CloseSvg } from "./Svg";

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

    const {title, setVisible, hasRemove, imageObject, handleRemove, handleResult} = props;
    const [isOverlayShow, setIsOverlayShow] = React.useState(false);
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
            width: 100,
            height: 100,
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
    }, [isOverlayShow]);
    
    React.useEffect(() => {
        setIconObj({
            ...iconObj,
            image: imageObject,
        })
    }, [props.imageObject]);

    const handleNewImage = e => {
        if(e.target.files) {
            setIconObj({ ...iconObj, image: e.target.files[0]});
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

    return (
        <>
            {isOverlayShow && <Overlay setIsOverlayShow={setIsOverlayShow} title={title}>
                <div className="editor-box">
                    <div className="editor-canvas">
                        <ReactAvatarEditor
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
                    </div>
                </div>
            </Overlay>}
        </>
    )
}




export function Overlay({ children, setIsOverlayShow, title}) {
    /*
    props:
        - title: 弹出框的标题
        - setOverlayShow: 设置弹出框是否可见
        - children: 弹出框的内容
    */
    return (
    <>
      <div className="darkBG" onClick={() => {setIsOverlayShow(false)}} 
        />
      <div className="centered">
        <div className="modal">
        {/* 头部 */}
          <div className="modalHeader">
            <h5 className="heading">{title}</h5>
          </div>
          <div className="closeBtn" onClick={()=> setIsOverlayShow(false)}>
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