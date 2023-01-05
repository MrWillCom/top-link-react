
import Header from "../common/header"
import Footer from "../common/footer"
import "./index.css"

export default function About() {
    return (
        <div className="about-main">
            <Header bgColor="var(--gray-bg)" />
            <div className="about-wraper">
                <div className="about-container header-main">
                    <div className="about-content">
                        <h4 className="title">1. 网站的功能是什么，面向哪些人群？</h4>
                        <p>答：本网站是一个面向全球的数字名片平台，支持中英双语，旨在服务创作者、品牌、IP、独立开发者等等，不论你是属于何种人群都能使用我们的产品。</p>
                        <h4 className="title">2. 为什么要做这个网站？</h4>
                        <p>答：我们希望通过这个网站，让更多的人能够更好的展示自己，让更多的人能够更好的找到自己。在这个互联网时代，我们每个人都有被别人发现和发掘的机会，因此我们需要这样一个平台，提供这种机会</p>
                        <h4 className="title">3. 为什么要选择我们？</h4>
                        <p>答：简短的域名便于记忆和展示；我们也提供多种名片主题供你选择，优雅、易用的界面是你使用与展示自己的不二选择。</p>
                        <h4 className="title">4. 你们的团队是谁？</h4>
                        <p>答：我们是一群热爱技术的人，我们希望通过技术让世界变得更美好。</p>
                        <h4 className="title">5. 这个网站是什么什么技术开发？</h4>
                        <p>答：如你所见，我们主要使用 React.js 进行构建视图与交互，使用 Python 编程语言开发了网站后端。</p>
                        <h4 className="title">6. 你们是否持续认真做的？遇到 Bug 或不爽怎么办？</h4>
                        <p>答：我们会持续认真做的，如果你遇到了 Bug 或者不爽的地方，欢迎在我们的底部反馈链接种提出宝贵的建议和意见，我们会尽快解决。</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}