
import Header from "../common/header"
import Footer from "../common/footer"
import "./index.css"
import { useTranslation } from "react-i18next"

export default function About() {
    const { t } = useTranslation();

    return (
        <div className="about-main">
            <Header bgColor="var(--gray-bg)" />
            <div className="about-wraper">
                <div className="about-container header-main">
                    <div className="about-content">
                        <h4 className="title">{t("about.q1")}</h4>
                        <p>{t("about.a1")}</p>
                        <h4 className="title">{t("about.q2")}</h4>
                        <p>{t("about.a2")}</p>
                        <h4 className="title">{t("about.q3")}</h4>
                        <p>{t("about.a3")}</p>
                        <h4 className="title">{t("about.q4")}</h4>
                        <p>{t("about.a4")}</p>
                        <h4 className="title">{t("about.q5")}</h4>
                        <p>{t("about.a5")}</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}