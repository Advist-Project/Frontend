import React, { useContext, useState } from "react";
import styled from "@emotion/styled";
import { min, max, Button, Colors } from "components/ui";
import { myContext } from "../context";
import { User } from '../types/logintypes';
import { LogoutButtons } from 'components/logout-buttons';

export const Header = (props: any) => {
  const userObject = useContext(myContext) as User;
  const [open, setOpen] = useState<boolean>(false);
  
  function toggleMenu(){
    setOpen(!open);
    if(!open){
      document.body.style.overflow = 'hidden';
    } else {
      document.body.removeAttribute('style');
    }
  }

  return (
    <Container className={props.white && 'white'}>
      {/* Desktop */}
      <Desktop className="desktop wrap">
        <a href="/"><img src={props.white ? '/logo_white.svg' : '/logo.png'} height="44" /></a>
        <RightElements>
          <a href="/all">코칭 프로그램</a>
          {userObject ? <LogoutButtons white={props.white ? true : false} /> : <Button onClick = {() =>  window.location.href = "/login"} type={props.white ? 'loginWhite' : 'login'}>로그인</Button>}
          {/*<Button url={userObject? undefined : "/login"} type="login">{userObject? "로그아웃" : "로그인"}</Button> */}
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
            {userObject ? null : <li><a href="/login">로그인</a></li>}
            <li>
              <a href="/all">코칭 프로그램</a>
            </li>
          </ul>
        </MobileMenu>
      </Mobile>
      {
        open? <Dimmed/> : null 
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
    z-index: 3;
  }
`;

const MobileMenu = styled.div`
  display: none;
  text-align: left;
  width: calc(100vw - 80px);
  height: 100vh;
  background: ${Colors.white};
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 18px 20px;

  &.open {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 12;
  }

  a {
    font-weight: 500;
    font-size: 16px;
    color: ${Colors.gray1};
  }

  ul {
    margin-top: 44px;
  }
  li {
    margin-bottom: 22px;
  }
`;

const Dimmed = styled.div`
  position: fixed;
  top: -50%;
  left: -50%;
  width: 1000vw;
  height: 1000vh;
  background: rgba(20, 20, 42, 0.5);
  z-index: 2;
`;