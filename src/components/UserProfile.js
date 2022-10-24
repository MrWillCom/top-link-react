import { useEffect, useState } from "react";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Pagediv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const Cover = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: rgb(235, 238, 241);
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

const UserName = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const UserBio = styled.div`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 500;
`;

const Content = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 92%;
`;

const Classic = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 12px 12px;
  width: 100%;
  max-width: 640px;
  min-height: 56px;
  background-color: white;
  border-radius: 16px;
  cursor: pointer;
  transform: transform 0.25s;
  :hover {
    transform: scale(1.046);
  }
`;

const ClassicBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LinkThumbImg = styled.img`
  position: relative;
  left: 8px;
  border-radius: 12px;
  width: 46px;
  height: 46px;
  object-fit: contain;
  object-position: initial;
`;

const LinkText = styled.div`
  font-weight: 500;
  font-size: 14px;
  margin: 0 auto;
  padding-right: 48px;
`;

const VirtualLima = styled.div`
  width: 46px;
`;

export default function UserProfile(props) {
  const { user, devLinks } = props;
  const [links, setLinks] = useState([]);

  useEffect(() => {
    setLinks(devLinks);
  }, [devLinks]);

  return (
    <Container>
      <Pagediv>
        <Cover />
        <Profile>
          <ProfileDivImg>
            <ProfileImg src={user.profilePicture} />
          </ProfileDivImg>
          <UserName>{user.userName}</UserName>
          <UserBio>{user.pageBio}</UserBio>
        </Profile>
        <Content>
          <Links links={links}></Links>
        </Content>
      </Pagediv>
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

function Link(props) {
  const handleClick = () => {
    window.open(props.url, "_blank");
  };
  return (
    <Classic onClick={handleClick}>
      <ClassicBox>
        {props.thumb !== "nil" ? <LinkThumbImg src={props.thumb} alt="thumb" /> : <VirtualLima />}
        <LinkText>{props.title}</LinkText>
      </ClassicBox>
    </Classic>
  );
}
