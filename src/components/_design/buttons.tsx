import styled from "@emotion/styled";
import { Colors } from "./colors"
import Loader from "react-loader-spinner";
import React, {useState, useEffect} from "react";
import { assignCss } from "./assignCss";
import { useRouter } from "next/router";

interface IButtonProps{ // type = "login" => 로그인, type = "start" => 시작하기
    type?: string;
    style?: object[] | object;
    url?: string;
    disabled?: any;
    onClick?: any;
}
export const Button: React.FC<IButtonProps> = ({ children, type, style, url, disabled, onClick }) => {

    const [buttonText, setButtonText] = useState(children);
    const [isLoading, setisLoading] = useState(false);
    const router = useRouter();

    const loader = <Loader type="TailSpin" color = {type === "start" ? Colors.white : Colors.black} 
    height={30} width={30} timeout={0} radius={3}/>

    useEffect(() => {       
      setButtonText(children);
    }, [children]);

    function loading() {      
      setButtonText(loader);
      setisLoading(true);
      if(url !== undefined) router.push(url);
    }

    const tagType:string = type ? type : 'start'; //기본 타입 start
    const styles:{[key: string]: any} = {
      'login': {
        weight : '500',
        background: Colors.white,
        borderColor: Colors.black,
        color: Colors.black,
        hover: {
          background: Colors.white,
          borderColor: Colors.primary,
          color: Colors.primary,
        },
        pressed: {
          background: Colors.white,
          borderColor: Colors.primaryDark,
          color: Colors.primaryDark,
        },
        disabled: {
          background: Colors.white,
          borderColor: Colors.gray3,
          color: Colors.gray3,
        },
      },
      'secondary': {
        weight : '500',
        background: Colors.white,
        borderColor: Colors.black,
        color: Colors.black,
        hover: {
          background: Colors.white,
          borderColor: Colors.primary,
          color: Colors.primary,
        },
        pressed: {
          background: Colors.white,
          borderColor: Colors.primaryDark,
          color: Colors.primaryDark,
        },
        disabled: {
          background: Colors.white,
          borderColor: Colors.gray3,
          color: Colors.gray3,
        },
      },
      'start': {
        weight : '500',
        background: Colors.primary,
        borderColor: Colors.primary,
        color: Colors.white,
        hover: {
          background: Colors.primaryDark,
          borderColor: Colors.primaryDark,
          color: Colors.white,
        },
        pressed: {
          background: Colors.primaryDark,
          borderColor: Colors.primaryDark,
          color: Colors.white,
        },
        disabled: {
          background: Colors.primarySemiLight,
          borderColor: Colors.primarySemiLight,
          color: Colors.white,
        },
      },
    }

    const Button = styled.button`
      cursor : pointer;
      height : 52px;
      width : 160px;
      min-width: 136px;
      border-radius: 20px;
      border-width : 1px;
      border-color : ${styles[tagType].borderColor};
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
        background-color: ${styles[tagType].hover.background};
        color: ${styles[tagType].hover.color};
        border-color : ${!isLoading? styles[tagType].hover.borderColor : styles[tagType].borderColor};
      }    

      &:active{
        background-color: ${styles[tagType].pressed.background};
        color: ${styles[tagType].pressed.color};
        border-color : ${styles[tagType].pressed.borderColor};
      }

      &:disabled{
        cursor : default;
        background-color: ${styles[tagType].disabled.background};
        color: ${styles[tagType].disabled.color};
        border-color : ${styles[tagType].disabled.borderColor};
      }

      &:focus{
        outline : none;
      }
    `;
    return (
      <Button style={assignCss(style)} disabled={disabled} onClick={()=>{loading(); onClick ? onClick() : null}}>{buttonText}</Button>
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
`;