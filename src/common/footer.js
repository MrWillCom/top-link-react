
import "./footer.css";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t, i18n} = useTranslation();
  
  /* change langaue */
  const changeLanguage = () => {
    if(i18n.language && i18n.language === "en") {
      i18n.changeLanguage("zh");
    } else {
      i18n.changeLanguage("en");
    }
  } 

  return (
    <div className="footer-main header-main">
      <div className="footer-wraper">
        <div className="footer-box">
          <div className="foot-nav">
            <div className="foot-nav-items">

              <div className="item">
                <div className="logo">THE TOP LINK</div>
                <div className="email">Email: admin@the.top</div>
                <div className="select-lang" onClick={changeLanguage}>{t("selectLang")}</div>
              </div>

              <div className="item products">
                <div className="item-title">{t("footer.products")}</div>
                <a href="/" target="_blank">TOP Link</a>
                <a href="https://news.the.top" target="_blank">TOP News</a>
              </div>

              <div className="item resources">
                <div className="item-title">{t("footer.documents")}</div>
                <a href="/about">About</a>
              </div>
              
              <div className="item community">
                <div className="item-title">{t("footer.community")}</div>
                <a href="https://discord.gg/NDeNQB9y" target="_blank">Discord</a>
                <a href="https://support.qq.com/product/488339" target="_blank">{t("footer.suggestion")}</a>
              </div>

            </div>
          </div>
          <div className="bottom">
            <div className="copyright">
              Copyright  &copy; 2019-2023 THE.TOP All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}