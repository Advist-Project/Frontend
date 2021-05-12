import React, { useEffect } from 'react';
import styled from "@emotion/styled";
import { Colors } from "components/ui";

function isPhoneNumber(asValue : string) {
  const regExp = /^[0-9\b -]{0,13}$/;
  return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}

function getPhoneNumber(oldValue: string, newValue: string){
  if(isPhoneNumber(newValue)){
    switch(newValue.length){
      case 10 :
        return newValue.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
      case 13 :
        return newValue.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
      default :
        return newValue;
    }
  } else {
    return oldValue;
  }
}

export function InputPhone({useState, useStateFunction, formStateFunction}: any){
  const message:{[key: string]: string} = {
    'success': '',
    'fail': '올바른 휴대폰 번호를 입력해주세요. (-없이 숫자만)'
  };

  const [stateCd, setStateCd] = React.useState<string>('');
  const [showMsg, setShowMsg] = React.useState<boolean>(false);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = getPhoneNumber(useState, e.target.value);
    useStateFunction(value);
  };

  useEffect(() => {
    if(useState.length === 13){
      setShowMsg(false);
      setStateCd('success');
      formStateFunction(true);
    } else {
      setShowMsg(false);
      setStateCd('fail');
      formStateFunction(false);
    }     
  }, [useState]);  

  const onBlurListener = () => {
    if(useState.length !== 0 && useState.length !== 13) {
      setShowMsg(true);
    }
  }

  //초기회
  useEffect(() => {
    setStateCd('');
  }, []);  

  return (
    <div key="aa">
        <Input placeholder="숫자만 입력"
                value={useState}
                onChange={onChangeHandler}
                onBlur={onBlurListener}
                className={stateCd === 'success' ? 'success' : stateCd === 'fail' ? 'fail' : ''}
                />
        <Msg className={showMsg ? 'visible msg' : 'msg'}>{ message[stateCd] }</Msg>
    </div>
  )
}


const Input = styled.input`
  &:focus {
    outline: none;
  }
  &:focus, &.fail {
    border-color: ${Colors.primary};
  }
  &.success {
    border-color: ${Colors.gray3} !important;
  }

  &.fail + .msg {
    display: block !important;
  }
  &.success + .msg {
    display: none !important;
  }
`;

const Msg = styled.p`
  display: none;
  margin-top: 8px;
  font-size: 14px;
  line-height: 157%;
  color: ${Colors.primary};
  text-align: right;

  &.visible {
    display: block;
  }
`;