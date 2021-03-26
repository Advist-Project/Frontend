import styled from "@emotion/styled";
import Loader from "react-loader-spinner";
import React, {useState} from 'react';

function ButtonPage() {
    const element = <div>로그인</div> // 로그인 또는 시작하기 입력(값에 따라 이벤트 달라짐)

    const loader = <Loader type="TailSpin" color = {element.props.children === "로그인" ? "black" : "white"} height={30} width={30} timeout={0} radius={3}/>
    const [buttonText, setButtonText] = useState(element);
    const [isdisable,setIsDisable] = useState(false);

    function loading() {
        setButtonText(loader);
    }

    const disabledBack : string = (element.props.children === "로그인")? '#D9DBE9' : '#C6ACFC';

    const EnabledButton = styled.button`
    cursor : pointer;
    height: 52px;
    width: 160px;
    left: 289px;
    top: 1626px;
    border-radius: 20px;
    background: ${props => props.id === "로그인" ? 'white' : '#9622FC'};

    font-family: Spoqa Han Sans Neo;
    font-size: 16px;
    font-style: normal;
    font-weight: bold;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: center;  
    color: ${props => props.id === "로그인" ? '#14142A' : '#FFFFFF'};

    &:hover{
        background: ${props => props.id === "로그인" ? '#14142A' : '#FCFCFC'};
        color: ${props => props.id === "로그인" ? '#FCFCFC' : '#9622FC'};
    }    

    &:active{
        background : ${props => props.id === "로그인" ? '#EFF0F6' : '#4A0B82'};
        color: ${props => props.id === "로그인" ? '#14142A' : '#FFFFFF'};
    }

`;

    return(
        <>
        <EnabledButton id = {element.props.children} disabled = {isdisable} onClick={loading} style = {(isdisable) ? {background : disabledBack, color : "FFFFFF"} : {}}>{buttonText}</EnabledButton>
        <button style = {{width : '100px', height : '50px'}} onClick = {() => setIsDisable(true)}>비활성화</button>
        </>
    )
    
}

export default ButtonPage;