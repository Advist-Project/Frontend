import React, { useEffect } from 'react';
import styled from "@emotion/styled";

export function InputName({useState, useStateFunction, formStateFunction}: any){
  const [stateCd, setStateCd] = React.useState<string>('');

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    useStateFunction(e.target.value);
  };

  useEffect(() => {
    if(useState.length > 0){
      setStateCd('success');
      formStateFunction(true);
    } else {
      setStateCd('fail');
      formStateFunction(false);
    }     
  }, [useState]);

  //초기회
  useEffect(() => {
    setStateCd('');
  }, []);  

  return (
    <div key="bb">
        <Input placeholder="성함을 입력해주세요."
                value={useState}
                onChange={onChangeHandler}
                className={stateCd === 'success' ? 'blue' : stateCd === 'fail' ? 'red' : ''} />
    </div>
  )
}

const Input = styled.input`
  &.blue {
    border-color: blue;
  }
  &.red {
    border-color: red;
  }
`;