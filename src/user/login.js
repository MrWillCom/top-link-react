import React from "react"
import "./login.css"
import { InputWithLable } from '../components/utily';
import { Button } from "../components/button";
import styled from "styled-components";
import request from "../utils/request";
import { setToken } from "../utils/request";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t } = useTranslation();
  React.useEffect(() => {
    document.title = t("login.title") 
  }, [])

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [msg, setMsg] = React.useState({ color: "white", text: "提示文档" });

  const handlePasswordChange = (value) => {
    setPassword(value);
  }

  const handleUsernameChange = (value) => {
    setUsername(value);
  }

  const login = () => {
    if (username.length < 1 || password.length < 1) {
      setMsg({ color: "red", text: t("login.inputUsername") });
      return;
    } else {
      setMsg({ color: "green", text: t("login.logining") });
      request({
        url: "/user/login",
        method: "POST",
        data: { user_name: username, password: password },
      }).then((res) => {
        setToken(res.data.access_token);
        window.location.href = "/admin";
      }).catch((err) => {
        setMsg({ color: "red", text: t("login.error") });
      })
    }
  }

  const hanldeRegister = () => {
    window.location.href = "/register";
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      login();
    }
  }
  
  return (
    <div className="login-main" onKeyDown={handleKeyDown}>
      <div className="title-wraper">
        <div className="title">THE TOP LINK</div>
      </div>
      <div className="login-wraper">
        <div className="login-box">
          <div className="login-title">{t("login.login")}</div>
          <div className="form-item">
            <InputWithLable title={t("login.username")} placeholder={t("login.inputUsername")} color="white" onChange={handleUsernameChange} content={username}></InputWithLable>
          </div>
          <div className="form-item">
            <InputWithLable title={t("login.password")} placeholder={t("login.inputPassword")} type="password" color="white" onChange={handlePasswordChange} content={password}></InputWithLable>
          </div>
          <Message color={msg.color}>{msg.text}</Message>
          <Button primary onClick={login}>{t("login.login")}</Button>
          <div className="register-link"> 
            <span>{t("login.noAccount")}</span>
            <a className="register" onClick={hanldeRegister}>{t("login.register")}</a> 
          </div>
        </div>
      </div>
    </div>
  )
}

const Message = styled.p`
  color: ${props => props.color ? props.color : "white"};
  font-size: 14px;
  margin-left: 1rem;
  margin-bottom: 0.5rem;
`;