import "./index.css";
import React from "react";
import { getToken } from "../utils/request";

export default function Header() {
  const [hasToken, setHasToken] = React.useState(false);

  React.useEffect(()=>{
    const token = getToken();
    if(token && token.length > 0){
      setHasToken(true);
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token");
    setHasToken(false);
  }

  const handleClickSignup = () => {
    if(hasToken) {
      handleLogout()
    } else {
      window.location.href = "/register";
    }
  }

  const handleClickLogin = () => {
    if(hasToken){
      window.location.href = "/admin";
    } else {
      window.location.href = "/login";
    }
  }

  return (
    <div className="header">
      <div className="header-wraper">
        <div className="header-box">
          <div className="header-main">
            <div className="header-bar">
              <div className="header-mobile">
                <a href="/">
                  <div className="mobile-logo">THE.TOP</div>
                </a>
                <div className="mobile-user">
                  <div className="mobile-user-wraper">
                    <div className="mobile-user-content">
                      <div className="login-wraper user-box">
                        <div className="user-wraper" onClick={handleClickLogin}>
                          <div className="login-box user-box-mobile">
                            <span className="login-text">{hasToken ? "控制台": "登录"}</span>
                          </div>
                        </div>
                      </div>
                      <div className="signup-wraper user-box">
                        <div className="user-wraper" onClick={handleClickSignup}>
                          <div className="signup-box user-box-mobile">
                            <span className="signup-text">{hasToken ?"退 出 登 录": "免 费 注 册"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="header-desktop">
                <div className="desktop-nav">
                  <div className="desktop-nav-wraper">
                    <a className="nav-logo" href="/">
                      <div className="logo-mobile">THE.TOP</div>
                      <div className="logo-desktop">THE.TOP LINK</div>
                    </a>
                    <div className="nav-item">
                      <div className="item">
                        <a className="item-box" href="/explore">
                          <div className="item-wraper">
                            <span className="item-text">探索</span>
                          </div>
                        </a>
                      </div>
                      <div className="item">
                        <a className="item-box" href="/about">
                          <div className="item-wraper">
                            <span className="item-text">关于</span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="desktop-user">
                  <div className="user-wraper">
                    <div className="login-wraper user-box">
                      <div className="user-wraper" onClick={handleClickLogin}>
                        <div className="login-box">
                          <span className="login-text">{hasToken ? "控制台": "登录"}</span>
                        </div>
                      </div>
                    </div>
                    <div className="signup-wraper user-box">
                      <div className="user-wraper" onClick={handleClickSignup}>
                        <div className="signup-box">
                          <span className="signup-text">{hasToken ?"退 出 登 录": "免 费 注 册"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mobile-box"></div>
          </div>
        </div>
      </div>
      <div className="header-bottom"></div>
    </div>
  );
}
