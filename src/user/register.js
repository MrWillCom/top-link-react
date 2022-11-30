import React from 'react';
import styled from 'styled-components';
import { InputWithLable } from '../components/utily';
import "./register.css";

export default function Register() {

  React.useEffect(()=>{
    document.title = "THE.TOP | 创建账户";
  }, [])

  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [tipUsername, setTipUsername] = React.useState({
    color: "red",
    text: "用户名长度为 4-16 个字符",
  });

  const [tipEmail, setTipEmail] = React.useState({
    color: "white",
    text: "邮箱长度为 4-16 个字符",
  })

  const [tipPass, setTipPass] = React.useState({
    color: "white",
    text: "密码长度为 6-16 个字符",
  })
  
  const handleUsernameChange = (username) => {
    console.log("username", username)
    setUsername(username)
  }

  const handleEmailChange = (email) => {
    console.log("email", email);
    setEmail(email)
  }

  return (
    <div className="register-main">
      <div className="title-wraper">
        <div className="title">THE.TOP LINK</div>
      </div>
      <div className="register-wraper">
        <div className="register-box">
          <div className="register-title">创建账户</div>
          <InputWithLable title={"the.top/"} placeholder={"用户名"} color={tipUsername.color} onChange={handleUsernameChange} content={username}></InputWithLable>
          <InputTips color={tipUsername.color}>{tipUsername.text}</InputTips> 

          <InputWithLable title={"邮箱"}  placeholder={"请输入邮箱"} color={tipEmail.color} onChange={handleEmailChange} content={email}></InputWithLable>
          <InputTips color={tipEmail.color}>{tipEmail.text}</InputTips> 

          <InputWithLable title={"密码"}  placeholder={"请输入密码"} color={tipPass.color} onChange={handleEmailChange} content={email}></InputWithLable>
          <InputTips color={tipPass.color}>{tipPass.text}</InputTips> 
        </div>
      </div>
    </div>
  )
}


const InputTipsMain = styled.div`
  font-size: 14px;
  color: ${props => props.color ? props.color : "white"};
  margin-top: 0.5rem;
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
`;

function InputTips(props) {
  return (
    <InputTipsMain isOverLength={props.isOverLength} color={props.color}>
      {props.children}
    </InputTipsMain>
  )
}