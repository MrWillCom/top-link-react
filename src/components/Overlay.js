import "./Overlay.css";
import { CloseSvg } from "./Svg";

export default function Overlay({ children, setIsOverlayShow, title}) {

    return (
    <>
      <div className="darkBG" onClick={() => setIsOverlayShow(false)} />
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