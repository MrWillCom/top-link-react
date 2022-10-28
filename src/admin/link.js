import "./link.css";
import { MusicSvg, PictureSvg} from "../components/Svg";
import ControlCard from "../components/ControlCard";

export default function AdminIndex() {
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
                <div className="link-control-box">
                    <ControlCard></ControlCard>
                    <ControlCard></ControlCard>
                </div>
            </div>
        </div>
    )
}