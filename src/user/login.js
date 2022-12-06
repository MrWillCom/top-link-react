import React from "react"
import "./login.css"
import { InputWithLable } from '../components/utily';
import { Button } from "../components/button";
import styled from "styled-components";
import request from "../utils/request";
import { setToken } from "../utils/request";


export default function Login() {
  React.useEffect(() => {
    document.title = "登录 - THE.TOP LINK"
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
      setMsg({ color: "red", text: "请输入用户名和密码" });
      return;
    } else {
      setMsg({ color: "green", text: "正在登录..." });
      request({
        url: "/user/login",
        method: "POST",
        data: { user_name: username, password: password },
      }).then((res) => {
        setToken(res.data.access_token);
        window.location.href = "/admin";
      }).catch((err) => {
        setMsg({ color: "red", text: "用户名或密码错误" });
      })
    }
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      login();
    }
  }
  
  return (
    <div className="login-main" onKeyDown={handleKeyDown}>
      <div className="title-wraper">
        <div className="title">THE.TOP LINK</div>
      </div>
      <div className="login-wraper">
        <div className="login-box">
          <div className="login-title">登录</div>
          <div className="form-item">
            <InputWithLable title={"账号"} placeholder={"请输入用户名"} color="white" onChange={handleUsernameChange} content={username}></InputWithLable>
          </div>
          <div className="form-item">
            <InputWithLable title={"密码"} placeholder={"请输入密码"} type="password" color="white" onChange={handlePasswordChange} content={password}></InputWithLable>
          </div>
          <Message color={msg.color}>{msg.text}</Message>
          <Button primary onClick={login}>登录</Button>
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