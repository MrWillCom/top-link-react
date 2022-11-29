import "./index.css";
import React from "react";

export default function Index() {
  return (
    <div className="index-main">
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
                        <a href="/login" className="user-wraper">
                           
                          <div className="login-box user-box-mobile">
                            <span className="login-text">登 录</span>
                          </div>
                        </a>
                      </div>
                      <div className="signup-wraper user-box">
                        <a href="/signup" className="user-wraper">
                          <div className="signup-box user-box-mobile">
                            <span className="signup-text">免 费 注 册</span>
                          </div>
                        </a>
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
                        <a href="/login" className="user-wraper">
                          <div className="login-box">
                            <span className="login-text">登 录</span>
                          </div>
                        </a>
                      </div>
                      <div className="signup-wraper user-box">
                        <a href="/signup" className="user-wraper">
                          <div className="signup-box">
                            <span className="signup-text">免费注 册</span>
                          </div>
                        </a>
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

      <div className="container">
        <div className="intro intro-1">
          <div className="intro-box">
            <div className="intro-wraper">
              <div className="intro-content">
                <div className="intro-color">
                  <div className="content-main">
                    <div className="content-wraper">
                      <div className="content-text">
                        <div className="text-wraper">
                          <div className="text-title">
                            <div className="text-h1 text-colorful">THE TOP LINK 您的专属数字名片</div>
                          </div>
                          <div className="text-subtitle">
                            <div className="subtitle-wraper">
                              <div className="subtitle-box text-colorful">
                                <p>仅需几分钟创建您的专属数字名片页面，一站聚合所有平台链接。</p>
                              </div>
                            </div>
                          </div>
                          <div className="text-button"></div>
                        </div>
                      </div>
                    </div>
                    <div className="content-extra">
                      <div className="extra-wraper">
                        <div className="extra-box extra-animotion">
                          <img src="/images/index/profile_blue.png" alt="profile_blue"></img>
                          <img src="/images/index/profile_dark.png" alt="dark"></img>
                          <img src="/images/index/profile_colorful.png" alt="colorful"></img>
                          <img src="/images/index/profile_orange.png" alt="organge"></img>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="intro intro-2">
          <div className="intro-box">
            <div className="intro-wraper">
              <div className="intro-content">
                <div className="intro-color">
                  <div className="content-main content-main-reverse">
                    <div className="content-wraper">
                      <div className="content-text">
                        <div className="text-wraper">
                          <div className="text-title">
                            <div className="text-h1">Link Everything 链一切</div>
                          </div>
                          <div className="text-subtitle">
                            <div className="subtitle-wraper">
                              <div className="subtitle-box">
                                <p>不论是抖音、淘宝店铺、哔哩哔哩还是其他平台，将您所有的链接融入一个简单界面</p>
                              </div>
                            </div>
                          </div>
                          <div className="text-button-common">
                            <button>免费注册</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="content-extra">
                      <div className="extra-wraper extra-wraper-reverse">
                        <div className="extra-common">
                          <img src="/images/index/intro3.png" alt="blue"></img>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="intro intro-3">
          <div className="intro-box">
            <div className="intro-wraper">
              <div className="intro-content">
                <div className="intro-color">
                  <div className="content-main">
                    <div className="content-wraper">
                      <div className="content-text">
                        <div className="text-wraper">
                          <div className="text-title">
                            <div className="text-h1">Explore space 探索你关注的领域IP</div>
                          </div>
                          <div className="text-subtitle">
                            <div className="subtitle-wraper">
                              <div className="subtitle-box">
                                <p>搜索你喜欢的自媒体、艺人、社群、品牌...</p>
                              </div>
                            </div>
                          </div>
                          <div className="text-button-common">
                            <button>开始探索</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="content-extra">
                      <div className="extra-wraper">
                        <div className="extra-common">
                          <img src="/images/index/intro4.png" alt="blue"></img>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="footer-wraper">
            <p>&copy;THE.TOP 2019 - 2022</p>
          </div>
        </div>
      </div>
    </div>
  );
}
