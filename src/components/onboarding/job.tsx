import styled from "@emotion/styled";
import { Colors } from "components/ui";
import React, { useState } from "react";

export function JobInput(){
    const [isOpen, setIsOpen] = useState(false);
    return(
        <>
        <InputJob>        
        {isOpen?
            <div style={{display : 'flex', flexDirection : 'column'}}>
                <CloseBox onClick = {() => setIsOpen(!isOpen)}>
                    <div>
                        현재 담당하고 있는 직무를 선택해주세요
                    </div>
                    <ImageBox style = {{alignSelf : 'center'}}><img src="/close.png"/></ImageBox>
                </CloseBox>
                <div>test</div>
            </div> 
            : 
            <CloseBox onClick = {() => setIsOpen(!isOpen)}>
                <div>
                    현재 담당하고 있는 직무를 선택해주세요
                </div>
                <ImageBox><img src="/open.png"/></ImageBox>
            </CloseBox>
        }
        </InputJob>
        </>
    )

}
export default JobInput;

const InputJob = styled.button`
    margin-bottom : 40px;
    height: 52px;
    width: 480px;
    background: ${Colors.white};     
    padding : 0 14px 0 24px;               

    border: 1px solid;      
    border-radius: 20px;
    border-color: ${Colors.gray3};
    box-sizing: border-box;

    color : ${Colors.gray3};

    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 26px;

    &:focus{
        outline : none;
        border-width : 2px;
        border-color : ${Colors.black};  
    }
`;

const ImageBox = styled.div`
  height: 24px;
  width: 24px;
  border-radius: 0px;
`;

const CloseBox = styled.div`
    display : flex;
    flex-direction : row;
    justify-content : space-between;
    cursor : pointer;
`;