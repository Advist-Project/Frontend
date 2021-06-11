import React, { useState } from "react";
import axios, { AxiosResponse } from 'axios';
import styled from "@emotion/styled";
import { Colors } from 'components/ui';
import router from "next/router";

export function MobileMembersMenu({username}: any){
  const [isOpen, setIsOpen] = useState(false);
  const [toggleMenuClassName, setuserClassName] = useState<string>('closed');

  function logoutListener(){
    axios.get("https://advist.herokuapp.com/user/auth/logout", {
      withCredentials: true
    }).then((res: AxiosResponse) => {
        if (res.data === "done") {
          window.location.href = "/"
        }
    })    
  }

  const MemberMenu = () => {
    return (
      <MemberMenuContainer>
        <li><a onClick={()=>router.push('/mypage')}>마이페이지</a></li>
        <li><a onClick={logoutListener}>로그아웃</a></li>
      </MemberMenuContainer>
    )
  }

  function toggleMenu(isOpen: any){
    setuserClassName(isOpen ? 'closed' : 'opened')
    setIsOpen(!isOpen);

  }

  return (
    <Container>
      <ToggleMenu onClick={()=>toggleMenu(isOpen)} className={toggleMenuClassName}>
        <Name>{username}</Name>&nbsp;<div>님</div>
      </ToggleMenu>
      {
        isOpen ? <MemberMenu /> : null
      }
    </Container>
  )
}
export default MobileMembersMenu;

const Container = styled.li`
  border-bottom: 1px solid #D9DBE9;
`;

const ToggleMenu = styled.div`
  display: flex;
  align-items: center;
  text-decoration: underline;
  cursor: pointer;
  background: url('/open.png') right center/16px 16px no-repeat;
  margin-bottom: 20px;

  &.opened {
    background-image: url('/close.png');
  }
`;

const Name = styled.div`
  color: ${Colors.primary};
  max-width: calc(100% - 20px);
  overflow : hidden;
  text-overflow: ellipsis;
  white-space : nowrap;
`;

const MemberMenuContainer  = styled.ul`
  padding: 0 0 8px 12px;

  li {
    margin-bottom: 12px;
  }
`;