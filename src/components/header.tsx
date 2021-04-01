import React, { useState } from "react";
import styled from "@emotion/styled";
import { Button, Colors } from "components/ui";

export const Header = () => {
  const [loginState, changeLoginState] = useState<boolean>(false);

  return (
    <header>
      <Wrap className="wrap">
        <img src="/logo.png" height="44" />
        <div>
          <A href="/all">워크북</A>
          {
            loginState?
            <button>로그아웃</button>:
            <Button type="login">로그인</Button>
          }
        </div>
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

const A = styled.a`
  display: inline-block;
  width: 70px;
  text-align: center;
  margin-right: 68px;

  font-weight: 500;
  font-size: 16px;
  color: ${Colors.black};
`;