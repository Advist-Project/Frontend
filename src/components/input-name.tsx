import React, { useEffect } from 'react';
import { Input, Msg } from "components/order/common-styles";

export function InputName({useState, useStateFunction, formStateFunction}: any){
  const message:{[key: string]: string} = {
    'success': '',
    'fail': '실명을 입력해주세요.'
  };

  const [stateCd, setStateCd] = React.useState<string>('');
  const [focusStatus, changeFocusStatus] = React.useState<boolean>(false);


  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    useStateFunction(e.target.value);
  };

  //타이핑 시
  useEffect(() => {
    if(focusStatus){
      setStateCd('fail');
    }
    if(useState.length > 0){
      formStateFunction(true);
    } else {
      formStateFunction(false);
    }
  }, [useState]);

  //포커스 아웃 시
  useEffect(() => {
    if(!focusStatus){
      if(useState.length > 0){
        setStateCd('success');
      }
    }
  }, [focusStatus]);

  //초기화
  useEffect(() => {
    setStateCd('');
  }, []);

  return (
    <div key="bb">
        <Input placeholder="성함을 입력해주세요."
                value={useState}
                onChange={onChangeHandler}
                onFocus={()=>changeFocusStatus(true)}
                onBlur={()=>changeFocusStatus(false)}
                className={stateCd === 'success' ? 'success' : stateCd === 'fail' ? 'fail' : ''} />
        <Msg className="msg">{ message[stateCd] }</Msg>
    </div>
  )
}