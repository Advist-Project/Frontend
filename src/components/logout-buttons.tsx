import React, { useState, useContext } from "react";
import styled from "@emotion/styled";
import { Colors, Text } from 'components/ui'
import { myContext } from "../context";
import { User } from '../types/logintypes';
import axios, { AxiosResponse } from 'axios';

export function LogoutButtons(){
  const userObject = useContext(myContext) as User;
  const [isOpen, setIsOpen] = useState(false);

  function logoutListener(){
    axios.get("https://advist.herokuapp.com/user/auth/logout", {
      withCredentials: true
    }).then((res: AxiosResponse) => {
        if (res.data === "done") {
          window.location.href = "/"
        }
    })    
  }

  const Button = styled.button`
  padding : 0;
  width: 160px;
  height: ${isOpen? '156px' : '52px'};
  margin-top : ${isOpen? '104px' : ''};
  border-radius: 20px;
  border-width : 1px;
  border-color : ${Colors.black};
  border-style : solid;
  background-color: ${Colors.white};
  color : ${Colors.black};

  font-family: Spoqa Han Sans Neo;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: center;
  z-index : 10;
`;

const ImageBox = styled.div`
  cursor : pointer;
  height: 24px;
  width: 24px;
  border-radius: 0px;
  
`;

const OpenBox = styled.div`
  cursor : pointer;
  height : 52px;
  line-height : 52px;
  border-top: 1px solid ${Colors.gray3};
`;

  return(
    <>
    <Button>
      {userObject? // 로그인 상태
        isOpen? // open 상태
        <div style={{ width : '160px', height : '156px', display : 'flex', flexDirection : 'column', justifyContent : 'space-around' }}>
          <div style={{height : '52px', marginLeft : '38px', display : 'flex', flexDirection : 'row'}}>
            <div style={{width : '84px', height : '24px'}}>
              <Text size = '16px' bold>{<span style={{lineHeight : '52px',color : Colors.primary}}>{userObject.username}</span>} 님</Text>
            </div>
            <ImageBox style = {{alignSelf : 'center'}} onClick = {() => setIsOpen(!isOpen)}><img src="/close.png"/></ImageBox>
          </div>
          <OpenBox onClick = {() => window.location.href = "/mypage"}>마이페이지</OpenBox>
          <OpenBox onClick = {logoutListener}>로그아웃</OpenBox>
        </div> 
        :
        <div style={{ marginLeft : '38px', display : 'flex', flexDirection : 'row'}}>
          <div style={{width : '84px', height : '24px'}}>
            <Text size = '16px' bold>{<span style={{color : Colors.primary}}>{userObject.username}</span>} 님</Text>
          </div>
          <ImageBox onClick = {() => setIsOpen(!isOpen)}><img src="/open.png"/></ImageBox>
        </div>
      : ''}
    </Button>
    </>
  )
}
export default LogoutButtons;