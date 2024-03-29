import { useParams } from "react-router-dom";
import UserProfile from "../components/UserProfile";
import React from "react";
import request from "../utils/request";
import { ThemeProvider } from "styled-components";

export default function Profile() {

    let { username } = useParams();

    let [setting, setSetting] = React.useState({});
    let [links, setLinks] = React.useState([]);
    const [theme, setTheme] = React.useState({});

    React.useEffect(() => {
        document.title = `TOP LINK - ${username}`;
    }, []) 

    React.useEffect(() => {
        if (!username) return;
        init(username);
    }, [username]);

    const init = (username) =>  { 
        getSetting(username);
    }

    const getSetting = (username) => {
        request({
            url: `/setting/user/${username}`,
            method: "GET",
        }).then(res => {
            //console.log(res)
            res.data["page_bio"] = res.data["page_bio"].replace("\\n","\n")
            // console.log("debug:", res.data["page_bio"]);
            setSetting(res.data);
            /* get theme */
            getTheme(res.data.theme);
        }).catch(err => {
            window.location.href = "/404";
            // console.log("get user failed", err);
        })
    }

    const getTheme = (themeName) => {
        request({
            url: `/theme/${themeName}`,
            method: "GET",
        }).then(res => {
            // console.log("get theme success", res.data);
            setTheme(res.data);
            getLinks(username);
        }).catch(err => {
            console.log("get theme failed", err);
        })
    }


    const getLinks = (username) => {
        request({
            'url': `/links/${username}`,
            'method': 'GET',
            needToken: true
        }).then(res => {
            let cards = res.data;
            cards.sort((a, b) => {
                return a.position - b.position;
            })
            setLinks(cards);
        })
    }

    return (
        <ThemeProvider theme={theme}>
            <UserProfile setting={setting} devLinks={links}></UserProfile>
        </ThemeProvider>
    )
}