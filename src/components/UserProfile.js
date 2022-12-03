import { useEffect, useState } from "react";
import styled from "styled-components";
import { VerifySvg } from "./Svg";


export const Container = styled.div`
  align-items: center;
  flex-direction: column;
  position: relative;
  padding-bottom: 0px;
  min-height: 95vh;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  display: flex;
`;

export const ContentWraper = styled.div`
  flex: 1 1 0%;
  flex-direction: column;
  -webkit-box-pack: justify;
  justify-content: space-between;
  padding: 64px 16px 32px;
  height: 100%;
  width: 95%;
`;

export const Wraper = styled(ContentWraper)`
  display: flex;
`;

export const ProfileBox = styled.div`
  margin: 0px auto;
  height: 100%;
  width: 100%;
  max-width: 680px;
`;

export const Footer = styled.div`
  margin-top: 32px;
  margin: 0px;
  padding: 0px;
  border: 0px;
  font: inherit;
  vertical-align: baseline;
`;

export const FooterBox = styled.div`
  cursor: pointer;
  display: flex;
  height: 20px;
  width: 100%;
  -webkit-box-pack: center;
  justify-content: center;
`;

export const FooterContent = styled.div`
  color: ${(props) => props.theme.footer_color};
  font-size: 16px;
  font-weight: 600;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProfileDivImg = styled.div`
  margin-bottom: 6px;
`;

const ProfileImg = styled.img`
  border-radius: 50%;
  width: 96px;
  height: 96px;
`;

const ProfielTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const UserName = styled.div`
  color: ${(props) => props.theme.title_color};
  font-size: 20px;
  font-weight: bold;
  margin-right: 4px;
`;

const UserBio = styled.div`
  margin-top: 3px;
  color: ${(props) => props.theme.bio_color};
  font-size: 16px;
  font-weight: 500;
`;

const Content = styled.div`
  margin-top: 48px;
`;

const BasicBg = styled.div`
  position: fixed;
  inset: 0px;
  z-index: -1;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  background:${(props) => props.theme.basic_bg}; 
`;

// 滤镜，包括头像和噪音滤镜
const ColorBox = styled.div`
  display: ${(props) => props.theme.has_filter ? "block" : "none"};
  position: fixed;
  inset: 0px;
  z-index: -1;
`;

const Color = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  &:before {
    content: "";
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    background-image: url(${(props) => props.profile_picture});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    opacity: 0.25;
    filter: blur(50px);
  }
  &:after {
    content: "";
    position: fixed;
    width: 100%;
    top: 0px;
    height: 100%;
    background-image: url(/images/noise.png);
    background-repeat: repeat;
    opacity: 0.05;
    mix-blend-mode: overlay;
  }
`;


export default function UserProfile(props) {
  const { setting, devLinks } = props;
  const [links, setLinks] = useState([]);

  useEffect(() => {
    let data = devLinks.filter((link) => link.display === true);
    setLinks(data);
  }, [devLinks]);

  
  const handleClickFooter = () => {
    window.open("/", "_blank");
  }
  return (
    <Container>
      <Wraper>
        <ProfileBox>
          <BasicBg />
          <ColorBox><Color profile_picture={setting.profile_picture} /></ColorBox>
          <Profile>
            <ProfileDivImg>
              <ProfileImg src={setting.profile_picture} />
            </ProfileDivImg>

            <ProfielTitle>
              <UserName>{setting.page_title}</UserName>
              {setting.verified && <VerifySvg />}
            </ProfielTitle>

            {setting.page_bio && <UserBio>{setting.page_bio}</UserBio>}
          </Profile>

          <Content>
            <Links links={links}></Links>
          </Content>

        </ProfileBox>

        <Footer>
          <FooterBox>
            <FooterContent onClick={handleClickFooter}>Thetop</FooterContent>
          </FooterBox>
        </Footer>
      </Wraper>
    </Container>
  );
}

function Links({ links }) {
  if (links === null) {
    return <></>;
  }

  return links.map((link) => {
    return <Link {...link} key={link.lid}></Link>;
  });
}


export const LinkBox = styled.div`
  position: relative;
  height: auto;
  border-radius: ${(props) => props.theme.link_border_radius};
  z-index: 0;
  overflow: hidden;
  margin-bottom: 16px;
  border: 1px solid ${(props) => props.theme.link_border_color};
  background-color: ${(props) => props.theme.link_bg};
  color: ${(props) => props.theme.text_color};
  transition: transform 0.15s cubic-bezier(0, 0.2, 0.5, 3) 0s;
  box-shadow: rgb(10 11 13 / 8%) 0px 2px 4px 0px;
  &:hover {
    ${(props) => props.theme.is_link_scale && "transform: scale(1.02);"}
    border-color: ${(props) => props.theme.link_border_color_hover};
    background-color: ${(props) => props.theme.link_bg_hover};
    color: ${(props) => props.theme.text_color_hover};
  }
`;


export const LinkThumb = styled.div`
  display: ${(props) => props.hasThumb ? "block" : "none"};
  position: absolute;
  top: 50%;
  left: 4px;
  transform: translateY(-50%);
  pointer-events: none;
  overflow: hidden;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  border-radius: ${(props) => props.theme.thumb_border_radius};
  width: 48px;
  height: 48px;
`;

export const ThumbImg = styled.img`
  width: 100%;
  max-width: 100%;
  border-radius: ${(props)=> props.theme.thumb_border_radius};
  display: block;
  height: 100%;
  object-fit: cover;
  object-position: initial;
`;

export const LinkTitle = styled.p`
  
  padding: 0px;
  margin: 0px;
  line-height: 1.5;
  width: 100%;
  font-weight: 500;
  font-size: 14px;  
  position: relative;
  hyphens: none;
  @media screen and (min-width: 576px) {
    font-size: 16px;
  }
`;

export const LinkWraper = styled.a`
  margin: 0px;
  border: none;
  font-family: inherit;
  font-weight: inherit;
  font-size: inherit;
  text-align: center;
  cursor: pointer;
  background: none;
  text-decoration: none;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  height: auto;
  position: relative;
  padding: 16px 20px;
  width: 100%;
  appearance: none;
  box-sizing: border-box;
  vertical-align: middle;
`;


export const LinkContent = styled(LinkWraper)`
  overflow-wrap: break-word;
  word-break: break-word;
  hyphens: auto;
  white-space: normal;
  background: none;
  color: inherit;
  transition: box-shadow 0.25s cubic-bezier(0.08, 0.59, 0.29, 0.99) 0s, border-color 0.25s cubic-bezier(0.08, 0.59, 0.29, 0.99) 0s, transform 0.25s cubic-bezier(0.08, 0.59, 0.29, 0.99) 0s, background-color 0.25s cubic-bezier(0.08, 0.59, 0.29, 0.99) 0s;
  padding-left: 66px;
  padding-right: 66px;
`;


export const LinkDiv = styled.div`
  position: relative;
`;

function Link(props) {
  return (
    <LinkDiv>
      <LinkDiv><LinkBox>
        <LinkContent href={props.url} target="_blank">
          <LinkThumb hasThumb={props.thumb.length}>
            <ThumbImg src={props.thumb} />
          </LinkThumb>
          <LinkTitle>{props.title}</LinkTitle>
        </LinkContent>
      </LinkBox> </LinkDiv>
    </LinkDiv>
  );
}
