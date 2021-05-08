import styled from "@emotion/styled";
import { Colors } from "./colors"
import Loader from "react-loader-spinner";
import React, {useState, useEffect} from 'react';
import { assignCss } from "./assignCss";
import { useRouter } from 'next/router';
import axios, { AxiosResponse } from 'axios';

interface IButtonProps{ // type = "login" => 로그인, type = "start" => 시작하기
    type?: string;
    style?: object[] | object;
    url?: string; // 로그아웃 상태일 경우 "/login" 로그인 => undefined
    disabled?: any;
}
export const Button: React.FC<IButtonProps> = ({ children, type, style, url, disabled }) => {

    const [buttonText, setButtonText] = useState(children);
    const [isLoading, setisLoading] = useState(false);
    const router = useRouter();

    const loader = <Loader type="TailSpin" color = {type === "login" ? Colors.black : Colors.white} 
    height={30} width={30} timeout={0} radius={3}/>

    useEffect(() => {       
      setButtonText(children);
    }, [children]);

    function loading() {
      if(url === undefined && type === "login") {
        axios.get("https://advist.herokuapp.com/user/auth/logout", {
            withCredentials: true
        }).then((res: AxiosResponse) => {
            if (res.data === "done") {
              window.location.href = "/"
            }
        })}
      
      setButtonText(loader);
      setisLoading(true);
      if(url !== undefined) router.push(url);
    }

    const tagType = type==='login' ? 'login' : 'start'; //기본 타입 start
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
      <Button style={assignCss(style)} onClick={loading} disabled={disabled}>{buttonText}</Button>
    )
  }

export const ToggleBtn = styled.button`
  border-radius: 20px;
  border: 1px ${Colors.gray3} solid;
  color: ${Colors.gray3};
  background-color: ${Colors.white};
  height: 52px;
  font-size: 14px;
  cursor: pointer;

  &.active {
    border-color: ${Colors.primary};
    background-color: ${Colors.primary};
    color : ${Colors.white};
  }
`