import React, { useContext, useState } from "react";
import styled from "@emotion/styled";
import { min, max, Button, Colors, DimmedOnlyMobile } from "components/ui";
import { myContext } from "../context";
import { User } from '../types/logintypes';
import { LogoutButtons } from 'components/logout-buttons';
import { MobileMembersMenu } from 'components/members-menu';

export const Header = (props: any) => {
  const userObject = useContext(myContext) as User;
  const [open, setOpen] = useState<boolean>(false);


  function toggleMenu(){
    setOpen(!open);
    if(!open){
      document.body.classList.add('dimmed_mo');
    } else {
      document.body.classList.remove('dimmed_mo');
    }
  }

  return (
    <Container className={props.white && 'white'}>
      {/* Desktop */}
      <Desktop className="desktop wrap">
        <a href="/"><img src={props.white ? '/logo_white.svg' : '/logo.png'} height="44" /></a>
        <RightElements>
          <a onClick={()=>alert('준비 중입니다.')}>서비스 소개</a>
          <a href="/all">코칭 프로그램</a>
          {userObject ? <LogoutButtons white={props.white ? true : false} /> : <Button onClick = {() =>  window.location.href = "/login"} type={props.white ? 'loginWhite' : 'login'}>로그인</Button>}
        </RightElements>
      </Desktop>
      {/* Mobile */}
      <Mobile className="mobile wrap">
        <a href="/"><img src={props.white ? '/logo_white.svg' : '/logo.png'}height="22" /></a>
        <MobileMenuBtn className={open ? 'close' : props.white ? 'white' : ''}
                      onClick={toggleMenu} />
        <MobileMenu className={open ? 'open' : ''}>
          <a href="/"><img src="/logo.png" height="22" /></a>
          <ul>
            {userObject ? <MobileMembersMenu username={userObject.username} /> : <li><a href="/login">로그인</a></li>}
            <li>
              <a onClick={()=>alert('준비 중입니다.')}>서비스 소개</a>
            </li>
            <li>
              <a href="/all">코칭 프로그램</a>
            </li>
          </ul>
        </MobileMenu>
      </Mobile>
      {
        open
        ? <DimmedOnlyMobile onClick={toggleMenu}/>
        : null
      }
    </Container>
  )
}

const Container = styled.header`
  &.white {
    position: absolute;
    top: 0;
    width: 100%;

    .desktop a {
      color: ${Colors.white};
    }
  }
`;

const Desktop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 156px;

  ${max[1]} {
    display: none;
  }
`;

const RightElements = styled.div`
  display: flex;
  align-items: center;

  a {
    display: inline-block;
    text-align: center;
    margin-right: 68px;
    cursor: pointer;
  
    font-weight: 500;
    font-size: 16px;
    color: ${Colors.black};
  }
`;

const Mobile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;

  ${min[1]} {
    display: none;
  }
`;

const MobileMenuBtn = styled.button`
  width: 56px;
  height: 56px;
  background: url(/icon/menu_56px.svg) center/56px 56px no-repeat;
  border: 0px;
  cursor: pointer;
  margin-right: -20px;
  -webkit-transition: background-image 0.3s, -webkit-transform 0.3s;
  transition: background-image 0.3s, transform 0.3s;

  &.white {
    background-image: url(/icon/menu_white_56px.svg);
  }

  &.close {
    background-image: url(/icon/close_56px.svg);
    position: relative;
    z-index: 11;
  }
`;

const MobileMenu = styled.div`
  display: none;
  text-align: left;
  width: 75%;
  height: 100vh;
  background: ${Colors.white};
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 18px 20px;
  font-weight: 500;
  font-size: 16px;
  line-height: 167%;
  color: ${Colors.gray1};

  &.open {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 12;
  }

  a {
    color: inherit;
    cursor: pointer;
  }

  > ul {
    margin-top: 44px;
  }
  > ul > li {
    margin-bottom: 22px;
  }
`;