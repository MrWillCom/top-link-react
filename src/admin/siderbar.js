import StyledFrame from "../components/StyledFrame";
import UserProfile from "../components/UserProfile";
import "./siderbar.css";

export default function SiderBar(props) {
    let { setting, links, theme } = props;
    return (
        <div className="sidebar-content">
            <div className="inner">
                <div className="previewWrap">
                    <div className="phone">
                        <StyledFrame height="100%" width="100%" theme={theme}>
                            <UserProfile setting={setting} devLinks={links} />
                        </StyledFrame>
                    </div>
                </div>
            </div>
        </div>
    )
}