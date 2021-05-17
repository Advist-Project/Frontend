import React, { useContext, useState } from "react";
import styled from "@emotion/styled";
import { min, max, Button, Colors } from "components/ui";
import { myContext } from "../context";
import { User } from '../types/logintypes';
import { LogoutButtons } from 'components/logout-buttons'

export const Header = () => {
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
    <header>
      {/* Desktop */}
      <Desktop className="wrap">
        <a href="/"><img src="/logo.png" height="44" /></a>
        <RightElements>
          <a href="/all">워크북</a>
          {userObject ? <LogoutButtons/> : <Button url="/login" type="login">로그인</Button>}
          {/*<Button url={userObject? undefined : "/login"} type="login">{userObject? "로그아웃" : "로그인"}</Button> */}
        </RightElements>
      </Desktop>
      {/* Mobile */}
      <Mobile className="wrap">
        <a href="/"><img src="/logo.png" height="22" /></a>
        <MobileMenuBtn src={open ? '/icon/close_56px.svg' : '/icon/menu_56px.svg'}
                      className={open ? 'close' : ''}
                      onClick={toggleMenu} />
        <MobileMenu className={open ? 'open' : ''}>
          <a href="/"><img src="/logo.png" height="22" /></a>
          <ul>
            {/* <li>
              {userObject ? "로그아웃" : <a href="/login">로그인</a>}
            </li> */}
            <li>
              <a href="/all">워크북</a>
            </li>
          </ul>
        </MobileMenu>
      </Mobile>
      {
        open? <Dimmed/> : null 
      }
    </header>
  )
}

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
    width: 70px;
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

const MobileMenuBtn = styled.img`
  width: 56px;
  height: 56px;
  cursor: pointer;
  margin-right: -20px;

  &.close {
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