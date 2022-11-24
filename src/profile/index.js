import { useParams } from "react-router-dom";
import UserProfile from "../components/UserProfile";
import React from "react";
import request from "../utils/request";
import { ThemeProvider } from "styled-components";

export default function Profile() {

    let params = useParams();

    let [setting, setSetting] = React.useState({});
    let [links, setLinks] = React.useState([]);
    const theme = {
        textColor: "#FFF",
    };
    React.useEffect(() => {
        getSetting(params.username);
        getLinks(params.username);
    }, [params.username]);

    const getSetting = (username) => {
        request({
            url: `/setting/${username}`,
            method: "GET",
        }).then(res => {
            console.log("get user successfully", res.data);
            setSetting(res.data);
            // 获取并设置用户信息
        }).catch(err => {
            console.log("get user failed", err);
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