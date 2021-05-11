import React, { useState, useContext } from "react";
import styled from "@emotion/styled";
import { Colors, Text } from 'components/ui'
import { myContext } from "../context";
import { User } from '../types/logintypes';
// display : 'flex', flexDirection : 'row', justifyContent : 'center'
export function LogoutButtons(){
  const userObject = useContext(myContext) as User;
  const [isOpen, setIsOpen] = useState(false);

  const Button = styled.button`
  cursor : pointer;
  padding : 0;
  width: 160px;
  height: ${isOpen? '156px' : '52px'};
  margin-top : ${isOpen? '52px' : ''};
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
`;

const ImageBox = styled.div`
  height: 24px;
  width: 24px;
  border-radius: 0px;
`;

  return(
    <>
    <Button onClick = {() => setIsOpen(!isOpen)}>
      {userObject?
      <div style={{ marginLeft : '38px',display : 'flex', flexDirection : 'row'}}>
        <div style={{width : '84px', height : '24px'}}>
          <Text size = '16px' bold>{<span style={{color : Colors.primary}}>{userObject.username}</span>} 님</Text>
        </div>
        <ImageBox><img src="/open.png"/></ImageBox>
      </div>
      : ''}
    </Button>
    </>
  )
}
export default LogoutButtons;