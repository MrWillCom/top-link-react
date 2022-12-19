import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react';
import './AdminNav.css'
import { useTranslation } from 'react-i18next';

export default function AdminNav() {
    /* state */

    
    /* lifetime */
    useEffect(() => {
        
    }, []);

    /* function */
    const {t, i18n} = useTranslation();

    /* 根据路径处理下划线效果 */
    const location = useLocation();
    let index = 0;
    let navLeft = "";
    switch(location.pathname) {
        case '/admin/link':
            index = 0;
            break;
        case '/admin/skin':
            index = 1;
            break;
        case '/admin/setting':
            index = 2;
            break;
        default:
            index = 0;
    }
    
    // let navLeft = `${index * 80 + 15}px`;
    if(index===0) {
        navLeft = "15px";
    }
    else if (i18n.language === 'zh') {
        navLeft = `${index * 80 + 16}px`;
    } else {
        navLeft = `${index * 100 + 5}px`;
    }

    return (
        <div className="nav flex flex-direction-row  align-center">
            <MyNavLink to="/admin/link" text={t("adminNav.link")} />
            <MyNavLink to="/admin/skin" text={t("adminNav.theme")} />
            <MyNavLink to="/admin/setting" text={t("adminNav.setting")} />
            <MyNavLink to="/explore" text={t("adminNav.explore")} />
            <div className="nav-indicator" style={{left: navLeft}}></div>
            <Outlet></Outlet>
        </div>
    )
}

const MyNavLink = (props) => {
    const { to, text} = props;
    return (
        <NavLink to={to} className="nav-item">
            <span className="nav-span flex flex-direction-row justify-center align-center">
                <span className='nav-text'>{text}</span>
            </span>
        </NavLink>
    )
}