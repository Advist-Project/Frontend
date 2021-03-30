import styled from "@emotion/styled";
import { Colors } from "./colors"
import React, {useState, useEffect} from 'react';

interface IInputProps{ // phone, serach 구분
    type?: string;
}

export const Input: React.FC<IInputProps> = ({ type }) => {

    const [PhoneNumber, setPhoneNumber] = useState("");

    useEffect(() => {        
        if (PhoneNumber.length === 10) {
            setPhoneNumber(PhoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
        }
        if (PhoneNumber.length === 13) {
            setPhoneNumber(PhoneNumber.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
        }
    }, [PhoneNumber]);    

    const onPhoneNumberHandler = (event : any) => {
        const regex = /^[0-9\b -]{0,13}$/;
        if(regex.test(event.target.value)){
            setPhoneNumber(event.target.value);
        }
        console.log(PhoneNumber);
    }

    const Input = styled.input`
        height: 64px;
        width: 325px;
        
        /* Grayscale / Input Background */        
        background: #EFF0F7;
        border-radius: 20px;
        border-width : 0;
        border-color : ${Colors.gray7};
        color : ${Colors.black};

        font-family: Spoqa Han Sans Neo;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 28px;
        text-indent : 24px;

        &:focus{
            outline : none;
            background-color: ${Colors.white};
            border: 2px solid;
            border-color: ${PhoneNumber.length === 13? Colors.secondaryDark : 
                PhoneNumber.length > 0? Colors.primary : Colors.black};
        }

        &:visited{
            border-color : ${Colors.secondaryDark};
        }
    `;

    return (
        <Input type="text" placeholder ="전화번호를 입력하세요" 
        value = {PhoneNumber} onChange = {onPhoneNumberHandler}
        autoFocus/>
    )
}