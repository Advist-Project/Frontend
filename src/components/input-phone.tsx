import React, { useEffect } from 'react';
import { Input, Msg } from "components/order/common-styles";


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
  const [focusStatus, changeFocusStatus] = React.useState<boolean>(false);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = getPhoneNumber(useState, e.target.value);
    useStateFunction(value);
  };

  useEffect(() => {
    if(useState.length === 13){
      setStateCd('success');
      formStateFunction(true);
    } else {
      setStateCd('fail');
      formStateFunction(false);
    }     
  }, [useState]);  

  const onBlurListener = () => {
    if(useState.length !== 0 && useState.length !== 13) {
    }
  }

  //초기화
  useEffect(() => {
    setStateCd('');
  }, []);  

  return (
    <div key="aa">
        <Input placeholder="숫자만 입력"
                value={useState}
                onChange={onChangeHandler}
                onFocus={()=>changeFocusStatus(true)}
                onBlur={()=>{changeFocusStatus(false);onBlurListener();}}
                className={stateCd === 'success' ? 'success' : stateCd === 'fail' ? 'fail' : ''}
                />
        <Msg className="msg">{ message[stateCd] }</Msg>
    </div>
  )
}