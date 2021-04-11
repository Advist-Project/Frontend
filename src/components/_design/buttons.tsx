import styled from "@emotion/styled";
import { Colors } from "./colors"
import Loader from "react-loader-spinner";
import React, {useState} from 'react';
import { assignCss } from "./assignCss";

interface IButtonProps{ // type = "login" => 로그인, type = "start" => 시작하기
    type?: string;
    style?: object[] | object;
}
export const Button: React.FC<IButtonProps> = ({ children, type, style }) => {

    const [buttonText, setButtonText] = useState(children);
    const [isLoading, setisLoading] = useState(false);

    const loader = <Loader type="TailSpin" color = {type === "login" ? Colors.black : Colors.white} 
    height={30} width={30} timeout={0} radius={3}/>

    function loading() {
      setButtonText(loader);
      setisLoading(true);
    }

    const tagType = type==='login' ? 'login' : 'start';
    const styles = {
      'login': { weight : 'bold' , background: Colors.white, color: Colors.black , 
      hoverBack : Colors.black, hoverColor : Colors.white, disabledBack : Colors.loginDisabled,
      pressedBack : Colors.loginPressed },

      'start': { weight : 'normal', background: Colors.primary , color: Colors.white,
      hoverBack : Colors.white, hoverColor : Colors.primary, disabledBack : Colors.primarySemiLight,
      pressedBack : Colors.primaryDark}
    }

    const Button = styled.button`
      cursor : pointer;
      height: 52px;
      width: 160px;
      border-radius: 20px;
      border-width : ${type === 'login'? '1px' : '0'};
      border-color : ${Colors.black};
      border-style : solid;
      background-color: ${styles[tagType].background};
      color : ${styles[tagType].color};

      font-family: Spoqa Han Sans Neo;
      font-size: 16px;
      font-style: normal;
      font-weight: ${styles[tagType].weight};
      line-height: 19px;
      letter-spacing: 0em;
      text-align: center;

      &:hover{
        border-width : ${!isLoading? '1px' : null};
        background-color: ${!isLoading? styles[tagType].hoverBack : null};
        color: ${!isLoading? styles[tagType].hoverColor : null};
        border-color : ${!isLoading? styles[tagType].hoverColor : null};
      }    

      &:active{
          border-width : ${!isLoading? type === 'login'? '1px' : '0' : null};
          background-color: ${!isLoading? styles[tagType].pressedBack : null};
          color: ${!isLoading? styles[tagType].color : null};
      }

      &:disabled{
        cursor : default;
        background-color: ${styles[tagType].disabledBack};
        color: ${Colors.white};
      }

      &:focus{
        outline : none;
      }
    `;
    return (
      <Button style={assignCss(style)} onClick={loading}>{buttonText}</Button>
    )
  }