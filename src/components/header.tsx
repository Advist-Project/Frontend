import React, { useContext } from "react";
import styled from "@emotion/styled";
import { Button, Colors } from "components/ui";
import { myContext } from "context";
import { User } from '../types/logintypes';
// import axios, { AxiosResponse } from 'axios';

export const Header = () => {
  const userObject = useContext(myContext) as User;
/*
  const logout = () => {

    axios.get("https://criel.herokuapp.com/user/auth/logout", {
        withCredentials: true
    }).then((res: AxiosResponse) => {
        if (res.data === "done") {
            window.location.href = "/"
        }
    })
}
*/
  return (
    <header>
      <Wrap className="wrap">
        <a href="/"><img src="/logo.png" height="44" /></a>
        <RightElements>
          <a href="/all">워크북</a>
          {
            userObject?(
            <Button type="login">로그아웃</Button> ) : (
            <Button url="/login" type="login">로그인</Button>
            )
          }
        </RightElements>
      </Wrap>
    </header>
  )
}

const Wrap = styled.div`
  height: 156px;

  display: flex;
  justify-content: space-between;
  align-items: center;
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