import "./index.css";
import React from "react";
import Header from "../header";

export default function Index() {
  const redirectToRegister = () => {
    window.location.href = "/register"
  }

  const redirectToExplore = () => {
    window.location.href = "/explore"
  }

  const [value, setValue] = React.useState("");

  const changeValue = (e) => {
    setValue(e.target.value);
  }

  const handleRegister = () => {
    window.open("/register/" + value);
  }

  return (
    <div className="index-main">
      <Header />
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
                          <div className="text-button">
                             <div className="wraper">
                              <form className="form">
                                <div className="form-content form-box">
                                  <p className="text">
                                    <label>the.top/</label>
                                  </p>
                                  <p className="text">
                                    <input value={value} onChange={changeValue}></input>
                                    <span></span>
                                  </p>
                                </div>
                                <div className="button-box" onClick={handleRegister}>
                                  免费创建
                                </div>
                              </form>
                             </div>
                          </div>
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
                          <div className="text-button-common" onClick={redirectToRegister}>
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
                          <div className="text-button-common" onClick={redirectToExplore}>
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
            <p>&copy;THE.TOP 2019 - 2022 | 邮箱: lookcos@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
