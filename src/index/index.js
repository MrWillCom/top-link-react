import "./index.css";
import React from "react";
import Header from "../common/header";
import Footer from "../common/footer";
import { useTranslation } from "react-i18next";

import { staticUrl } from "../utils/utils";

export default function Index() {

  const { t } = useTranslation();

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

  React.useEffect(() => {
    document.title = "THE TOP LINK - " + t("title");
    return () => {
      
    };
  }, []);

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
                            <div className="text-h1 text-colorful">{t("index.intro1.title")}</div>
                          </div>
                          <div className="text-subtitle">
                            <div className="subtitle-wraper">
                              <div className="subtitle-box text-colorful">
                                <p>{t("index.intro1.description")}</p>
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
                                  {t("index.intro1.buttonText")}
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
                          <img src={staticUrl + '/top/static/index/profile_blue.png'} alt="profile_blue"></img>
                          <img src={staticUrl + '/top/static/index/profile_dark.png'}alt="dark"></img>
                          <img src={staticUrl + "/top/static/index/profile_colorful.png"} alt="colorful"></img>
                          <img src={staticUrl + "/top/static/index/profile_orange.png"} alt="organge"></img>
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
                            <div className="text-h1">{t("index.intro2.title")}</div>
                          </div>
                          <div className="text-subtitle">
                            <div className="subtitle-wraper">
                              <div className="subtitle-box">
                                <p>{t("index.intro2.description")}</p>
                              </div>
                            </div>
                          </div>
                          <div className="text-button-common" onClick={redirectToRegister}>
                            <button>{t("index.intro2.buttonText")}</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="content-extra">
                      <div className="extra-wraper extra-wraper-reverse">
                        <div className="extra-common">
                          <img src={staticUrl +  "/top/static/index/intro3.png"} alt="blue"></img>
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
                            <div className="text-h1">{t("index.intro3.title")}</div>
                          </div>
                          <div className="text-subtitle">
                            <div className="subtitle-wraper">
                              <div className="subtitle-box">
                                <p>{t("index.intro3.description")}</p>
                              </div>
                            </div>
                          </div>
                          <div className="text-button-common" onClick={redirectToExplore}>
                            <button>{t("index.intro3.buttonText")}</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="content-extra">
                      <div className="extra-wraper">
                        <div className="extra-common">
                          <img src={staticUrl +  "/top/static/index/intro4.png"} alt="blue"></img>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
       
      </div>
      <Footer></Footer>
    </div>
  );
}
