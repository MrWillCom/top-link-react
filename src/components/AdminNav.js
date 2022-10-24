import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react';
import './AdminNav.css'

export default function AdminNav() {
    /* state */

    
    /* lifetime */
    useEffect(() => {
        
    }, []);

    /* function */



    /* 根据路径处理下划线效果 */
    const location = useLocation();
    let index = 0;
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
    let navLeft = `${index * 80 + 15}px`;

    return (
        <div className="nav flex flex-direction-row  align-center">
            <MyNavLink to="/admin/link" text="链接" />
            <MyNavLink to="/admin/skin" text="皮肤" />
            <MyNavLink to="/admin/setting" text="设置" />
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