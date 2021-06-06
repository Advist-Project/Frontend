import React, { useState, useContext } from "react";
import styled from "@emotion/styled";
import { Colors, Text } from 'components/ui'
import { myContext } from "../context";
import { User } from '../types/logintypes';
import axios, { AxiosResponse } from 'axios';

export function LogoutButtons({white}: any){
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
  border-color : ${white ? Colors.white : Colors.black};
  border-style : solid;
  background-color: ${white ? 'transparent' : Colors.white};
  color : ${white ? Colors.white : Colors.black};

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
  margin-left : 10px;
  height: 24px;
  width: 24px;
  border-radius: 0px;

  img {
    width: 100%;
    height: 100%;
  }
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
          <div style={{height : '52px', marginLeft : '28px', display : 'flex', flexDirection : 'row' , cursor : 'pointer'}} onClick = {() => setIsOpen(!isOpen)}>

            <div style={{marginTop : '16px', width : '70px', color : Colors.primary, overflow : 'hidden', textOverflow: 'ellipsis', whiteSpace : 'nowrap'}}>{userObject.username}</div>
            <div style={{marginTop : '13px'}}><Text size = '16px' bold>님</Text></div>
            <ImageBox style = {{alignSelf : 'center'}}><img src={white ? '/icon/chevron_up_white_24px.png' : "/close.png"}/></ImageBox>
          </div>
          <OpenBox onClick = {() => window.location.href = "/mypage"}>마이페이지</OpenBox>
          <OpenBox onClick = {logoutListener}>로그아웃</OpenBox>
        </div> 
        :
        <div style={{ marginLeft : '28px', display : 'flex', flexDirection : 'row' , cursor : 'pointer'}} onClick = {() => setIsOpen(!isOpen)}>
          <div style={{width : '70px', height : '24px', lineHeight : '26px', color : Colors.primary, overflow : 'hidden', textOverflow: 'ellipsis', whiteSpace : 'nowrap'}}>{userObject.username}</div>
          <Text size = '16px' bold>님</Text>
          <ImageBox><img src={white ? '/icon/chevron_down_white_24px.png' : "/open.png"}/></ImageBox>
        </div>
      : ''}
    </Button>
    </>
  )
}
export default LogoutButtons;