
import "./footer.css";

export default function Footer() {
  return (
    <div className="footer-main header-main">
      <div className="footer-wraper">
        <div className="footer-box">
          <div className="foot-nav">
            <div className="foot-nav-items">
              <div className="item">
                <div className="logo">THE.TOP</div>
              </div>
              <div className="item products">
                <div className="item-title">产品</div>
                <a href="/" target="_blank">THE.TOP Link</a>
                <a href="/" target="_blank">THE.TOP News</a>
              </div>
              <div className="item resources">
                <div className="item-title">文档</div>
                <a href="/" target="_blank">THE.TOP Link</a>
              </div>
              <div className="item community">
                <div className="item-title">社区</div>
                <a href="/" target="_blank">Discord</a>
                <a href="/" target="_blank">TG Group</a>
              </div>

            </div>
          </div>
          <div className="bottom">
            <div className="copyright">
              Copyright  &copy; 2019-2022 THE.TOP All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}