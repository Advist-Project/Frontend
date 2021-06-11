import styled from "@emotion/styled";
import { Colors } from "./colors"
import React, {useState, useEffect} from 'react';

interface IInputProps{ // phone, serach 구분
    type? : string;
    isDisable? : boolean;
}

export const Input: React.FC<IInputProps> = ({ isDisable }) => {
    const [PhoneNumber, setPhoneNumber] = useState("");
    const [TextMsg, setTextMsg] = useState("");
    const [ShowLabel, setShowLabel] = useState(false);
    const [ShowMsg, setShowMsg] = useState(false);

    useEffect(() => {        
        if (PhoneNumber.length === 0) setShowLabel(false);
        else setShowLabel(true);
        if (PhoneNumber.length === 10) {
            setPhoneNumber(PhoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
        }
        if (PhoneNumber.length === 13) {
            setPhoneNumber(PhoneNumber.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
            setTextMsg("완료되었어요!");
            setShowMsg(true);
        } else {
            setShowMsg(false);
            setTextMsg("올바른 전화번호를 입력해주세요!");
        }
    }, [PhoneNumber]);    

    function onBlurListener() {
        if(PhoneNumber.length !==0){
            setShowMsg(true)
        }
    }

    const onPhoneNumberHandler = (event : any) => {
        const regex = /^[0-9\b -]{0,13}$/;
        if(regex.test(event.target.value)){
            setPhoneNumber(event.target.value);
        }
    }

    const Label = styled.div`
        font-family: Spoqa Han Sans Neo;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 22px;    
        letter-spacing: 0.25px;
        color : ${PhoneNumber.length===13? Colors.secondaryDark : 
            !ShowMsg? Colors.gray8 :
            PhoneNumber.length !== 13? Colors.pinkDark : ""};
    `;

    const Input = styled.input`
        height: 64px;
        width: 325px;
        
        /* Grayscale / Input Background */
        background: ${PhoneNumber.length === 13? Colors.secondaryLight : 
            PhoneNumber.length === 0? Colors.gray7 : Colors.pinkLight};                    

        border: 2px solid;      
        border-radius: 20px;
        border-color: ${PhoneNumber.length === 13? Colors.secondaryDark : 
            PhoneNumber.length === 0? Colors.black : Colors.pinkdefault};

        color : ${Colors.black};
        
        border-width : ${PhoneNumber.length === 0? 0 : ""};        
        font-family: Spoqa Han Sans Neo;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 28px;
        text-indent : 24px;
        padding-top : ${ShowLabel? "15px" : "0"};
        
        &:focus{
            outline : none;
            border-width : 2px;   
            background : ${PhoneNumber.length===13? Colors.secondaryLight : 
                !ShowMsg? Colors.white :
                PhoneNumber.length !== 13? Colors.pinkLight : ""};    

            border-color : ${PhoneNumber.length===13? Colors.secondaryDark : 
                PhoneNumber.length === 0? Colors.black :
                !ShowMsg? Colors.primary :
                PhoneNumber.length !== 13? Colors.pinkdefault : ""};    
        }

        &:disabled{
            cursor : default;
            background-color: ${Colors.gray7};
            opacity: 0.5;
            font-family: Poppins;
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 28px;
        }
    `;

    const Msg = styled.div`
        font-family: Spoqa Han Sans Neo;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 22px;    
        letter-spacing: 0.25px;

        color : ${PhoneNumber.length === 13? Colors.secondaryDark : Colors.pinkDark};
    `;

    return (
        <div style = {{position : "relative", display : "flex", flexDirection : "column"}}>
        <Label style = {{position : "absolute", top : "7px", left : "28px"}}>{ShowLabel? "전화번호" : null}</Label>
        <Input type="text" placeholder = {isDisable? "Phone Number" : "전화번호를 입력하세요"}
        value = {PhoneNumber} onChange = {onPhoneNumberHandler}
        disabled = {isDisable} onBlur = {onBlurListener}
        autoFocus/>
        <Msg>{ShowMsg? TextMsg : null}</Msg>
        </div>
    )
}