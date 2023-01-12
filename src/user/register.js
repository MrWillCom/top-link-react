import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { InputWithLable } from '../components/utily';
import { Button } from '../components/button';
import request from '../utils/request';
import { setToken } from '../utils/request';
import { debounceFunction } from '../utils/utils';
import { isEmail, isNumber, isUsername, isChinese, isContainSpecial } from '../utils/utils';
import "./register.css";
import { Overlay } from '../components/utily';
import { useTranslation } from 'react-i18next';

export default function Register() {
  const { t, i18n } = useTranslation();
  const [isEn, setIsEn] = React.useState(i18n.language === "en" ? true : false);

  React.useEffect(() => {
    document.title = t("register.title");
  }, [])

  const [username, setUsername] = React.useState({ check: false, value: "" });
  const [email, setEmail] = React.useState({ check: false, value: "" });
  const [password, setPassword] = React.useState({ check: false, value: "" });
  const [fieldCode, setFieldCode] = React.useState(0);

  const [tags, setTags] = React.useState([]);

  const [isStepOneOk, setIsStepOneOk] = React.useState(false);
  const [isStepTwoOk, setIsStepTwoOk] = React.useState(false);
  const [step, setStep] = React.useState(1);

  const [showOverlay, setShowOverlay] = React.useState(false);
  const [msg, setMsg] = React.useState("");

  React.useEffect(() => {
    if (fieldCode && tags.length > 0 && tags.length <= 10) {
      setIsStepTwoOk(true);
    } else {
      setIsStepTwoOk(false);
    }
  }, [fieldCode, tags])

  React.useEffect(() => {
    if (username.check && email.check && password.check) {
      setIsStepOneOk(true);
    } else {
      setIsStepOneOk(false);
    }
  }, [username, email, password]);

  const handleLayerEnter = () => {
    setShowOverlay(false);
    window.location.reload();
  }

  const handleSubmit = () => {
    let tag_list = [];

    tags.forEach(tag => {
      tag_list.push(tag.name);
    })

    let formData = {
      user_name: username.value,
      email: email.value,
      password: password.value,
      field_code: fieldCode, 
      tags: tag_list
    }
    // console.log("formData: ", formData);
    request({
      url: "/user/signup",
      method: "POST",
      data: formData,
    }).then(res => {
      setToken(res.data.access_token);
      window.location.href = "/admin";
    }).catch(err => {
      setMsg(t("register.failedMsg"));
      setShowOverlay(true);
    })
  }

  const handleLogin = () => {
    window.location.href = "/login";
  }

  return (
    <div className="register-main">
      {showOverlay && <Overlay setIsOverlayShow={setShowOverlay} title={t("register.layerTitle")}>
        <p class="layer-msg">{msg}</p>
        <div className="layer-button">
          <Button primary onClick={handleLayerEnter}>{t("register.tipsButton")}</Button>
        </div>
      </Overlay>}
      <div className="title-wraper">
        <div className="title">THE TOP LINK</div>
      </div>
      <div className="register-wraper">

        <div className="register-box">
          {step === 1 && <RegisterBase setEmail={setEmail} setPassword={setPassword} setUsername={setUsername}></RegisterBase>}
          {step === 2 && <CompleteData onChangeField={setFieldCode} isEn={isEn} setTags={setTags} ></CompleteData>}
          <div className='register-action'>

            {(step === 1 && isStepOneOk) ?
              <Button primary onClick={() => { setStep(2) }}>{t("register.next")}</Button> :
              step === 1 && <Button>{t("register.next")}</Button>
            }
            {(step === 2 && isStepTwoOk) ?
              <Button primary onClick={handleSubmit}>{t("register.signup")}</Button> :
              step === 2 && <Button>{t("register.signup")}</Button>
            }
          </div>

          <div className="login-link"> 
            <span>{t("register.alreadyAccount")}</span>
            <a className="login" onClick={handleLogin}>{t("register.login")}</a> 
          </div>
        </div>
      </div>
    </div>
  )
}


function RegisterBase(props) {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const {t} = useTranslation();

  let params = useParams();

  React.useEffect(() => {
    if (params.username) {
      setUsername(params.username);
      debounceCheckUserName(params.username);
    }
  }, [params.username])

  const [tipUsername, setTipUsername] = React.useState({
    color: "white",
    text: t("register.usernameLong"),
  });

  const [tipEmail, setTipEmail] = React.useState({
    color: "white",
    text: "邮箱长度为 4-16 个字符",
  })

  const [tipPass, setTipPass] = React.useState({
    color: "white",
    text: "密码长度为 6-16 个字符",
  })

  const checkUsername = (value) => {
    if (value) {
      request({
        url: `/user/exists/${value}`,
        method: "GET",
      }).then((res) => {
        if (res.data) {
          setTipUsername({ color: "red", text: t("register.usernameExist") })
          props.setUsername({ check: false, value: value });
        } else {
          if (isUsername(value) && !isNumber(value)) {
            setTipUsername({ color: "green", text: t("register.available") })
            props.setUsername({ check: true, value: value });
          } else {
            props.setUsername({ check: false, value: value });
            if (value.length === 0) {
              setTipUsername({ color: "black", text: t("register.usernameLong") })
            } else if (value.length < 4) {
              setTipUsername({ color: "red", text: t("register.usernameLeast") })
            } else if (value.length > 16) {
              setTipUsername({ color: "red", text: t("register.usernameMost") })
            } else if (value.length >= 4 && value.length <= 16 && isNumber(value)) {
              setTipUsername({ color: "red", text: t("register.usernameNumber")})
            } else if (isContainSpecial(value)) {
              setTipUsername({ color: "red", text: t("register.usernameSpecial")})
            } else if (isChinese(value)) {
              setTipUsername({ color: "red", text: t("register.usernameError") })
            }
          }
        }
      }).catch(err => {
        console.log(err)
        setTipUsername({ color: "red", text: t("register.usernameExist") })
        props.setUsername({ check: false, value: value });
      })
    }
  }

  // eslint-disable-next-line
  const debounceCheckUserName = React.useCallback(
    debounceFunction((username) => checkUsername(username), 350),
    []
  );

  const handleUsernameChange = (username) => {
    setUsername(username)
    debounceCheckUserName(username);
  }

  // eslint-disable-next-line
  const debounceCheckEmail = React.useCallback(
    debounceFunction((email) => checkEmail(email), 350),
    []
  );

  const checkEmail = (email) => {
    if (isEmail(email)) {
      setTipEmail({ color: "green", text: t("register.available") })
      props.setEmail({ check: true, value: email });
    } else {
      setTipEmail({ color: "red", text: t("register.errorEmail") })
      props.setEmail({ check: false, value: email });
    }
  }

  const handleEmailChange = (email) => {
    setEmail(email)
    debounceCheckEmail(email);
  }

  const handlePasswordChange = (password) => {
    setPassword(password);
    if (password.length >= 6 && password.length <= 16) {
      setTipPass({ color: "green", text: t("register.available") })
      props.setPassword({ check: true, value: password });
    } else {
      setTipPass({ color: "red", text: t("register.passwordLength") })
      props.setPassword({ check: false, value: password });
    }
  }

  return (
    <>
      <div className="register-title">{t("register.createAccount")}</div>
      <InputWithLable title={"the.top/"} placeholder={ t("register.username")} color={tipUsername.color} onChange={handleUsernameChange} content={username}></InputWithLable>
      <InputTips color={tipUsername.color}>{tipUsername.text}</InputTips>

      <InputWithLable title={ t("register.email")} placeholder={t("register.inputEmail")} color={tipEmail.color} onChange={handleEmailChange} content={email}></InputWithLable>
      <InputTips color={tipEmail.color}>{tipEmail.text}</InputTips>

      <InputWithLable title={ t("register.password")} placeholder={t("register.inputPassword")} color={tipPass.color} onChange={handlePasswordChange} content={password}></InputWithLable>
      <InputTips color={tipPass.color}>{tipPass.text}</InputTips>
    </>
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

function CompleteData(props) {

  const {t} = useTranslation();
  const {isEn} = props;
  const [fields, setFields] = React.useState([]);
  const [currentField, setCurrentField] = React.useState(0);

  const [tags, setTags] = React.useState([]);

  const [selectedTags, setSelectedTags] = React.useState([]);
  const [customTag, setCustomTag] = React.useState("");
  const [tagTips, setTagTips] = React.useState({ color: "white", text: "" });

  React.useEffect(() => {
    props.setTags(selectedTags);
  }, [selectedTags])
  React.useEffect(() => {

    const getFields = () => {
      request({
        url: "/setting/fields",
        method: "GET",
      }).then(res => {
        setFields(res.data);
      })
    }

    const getTags = () => {
      if(isEn) {
        request({
          url: "/setting/tags/default/en",
          method: "GET",
        }).then(res => {
          setTags(res.data);
        })
      } else {
        request({
          url: "/setting/tags/default/zh",
          method: "GET",
        }).then(res => {
          setTags(res.data);
        })
      }
    }
    getFields();
    getTags();
  }, [])

  const currentTagIsSelected = (tag) => {
    for (let i = 0; i < selectedTags.length; i++) {
      if (selectedTags[i].id === tag.id) {
        return true;
      }
    }
    return false;
  }


  const handleTagClick = (tag) => {
  
    if (!currentTagIsSelected(tag)) {
      if (selectedTags.length >= 10) { 
        setTagTips({ color: "red", text: t("register.tagSelectMax") });
        return;
      } else {
        setTagTips({ color: "white", text: "" });
      }
      setSelectedTags([...selectedTags, tag]);
    } else {
      setTagTips({ color: "white", text: "" });
      const newSelectedTags = selectedTags.filter(item => item.id !== tag.id);
      setSelectedTags(newSelectedTags);
    }
  }

  const handleTagAdd = (e) => {
    if (e.keyCode === 13) {
      if (customTag === "") {
        setTagTips({ color: "red", text: t("register.tagEmpty") });
      } else if (customTag.length > 30) {
        setTagTips({ color: "red", text: t("register.tagExceed") });
      }
      else{
        // console.log("add tag", customTag);
        if (currentTagIsSelected({ name: customTag })) {
          setTagTips({ color: "red", text: t("register.tagExist") });
          return;
        } else if (selectedTags.length >= 10) {
          setTagTips({ color: "red", text: t("register.tagSelectMax") });
          return;
        }

        const newTag = {
          id: selectedTags.length + 1,
          name: customTag,
        }

        setSelectedTags([...selectedTags, newTag]);
        setTags([...tags, newTag]);
        setCustomTag("");
      }
    }
  }

  const handleCustomTagChange = (e) => {
    setCustomTag(e.target.value);
  }

  // 监听领域和兴趣的变化
  React.useEffect(() => {
    props.onChangeField(currentField);
  },
  [currentField, props])

  return (
    <>
      <div className="register-title">{t("register.completeProfile")}</div>
      <div className="register-step2">
        <div className="subtitle">1. {t("register.chooseCategory")}</div>
        <fieldset className="fieldset-field fieldset-box">
          {
            fields.map((field) => {
              return (
                <div className={currentField === field.id ? 'subitem active-subitem' : 'subitem'} key={field.id} onClick={() => setCurrentField(field.id)}>
                  <span>
                    {isEn ? field.name_en : field.name}
                  </span>
                </div>
              )
            })
          }
        </fieldset>

        <div className='subtitle'> 2. {t("register.chooseTag")} </div>
        <fieldset className="fieldset-tag fieldset-box">
        {
            tags.map((tag) => {
              return (
                <div className={currentTagIsSelected(tag) ? "subitem active-subitem": "subitem"} key={tag.id} onClick={() => handleTagClick(tag)}>
                  <span>
                    {tag.name}
                  </span>
                </div>
              )
            })
          }
        </fieldset>
        <div className="customize-tags">
          <input type="text" placeholder={t("register.tagCustom")} value={customTag} onChange={handleCustomTagChange} onKeyUp={handleTagAdd}></input>
        </div>
        <InputTips color={tagTips.color}>{tagTips.text}</InputTips>
      </div>
    </>
  )
}

