import styled from "@emotion/styled";
import { Colors } from "components/ui";
import React, { useState } from "react";

export function JobInput(props : any){
    const [isOpen, setIsOpen] = useState(false);
    const [JobText, setJobText] = useState('');
    const jobLists = ['기획', '영업/서비스운영' , '개발' , '인사/총무', '디자인', '재무/회계', '마케팅', '기타'];

    function OnClickListener(i : number){
        setJobText(jobLists[i]);
        props.setJob(jobLists[i]);
    }
    const InputJob = styled.button`
    height: 52px;
    width: 480px;
    background: ${Colors.white};     
    padding : 0 14px 0 24px;               

    border: 1px solid;
    border-radius: 20px;
    border-color: ${Colors.gray3};
    box-sizing: border-box;

    color : ${JobText === ''? Colors.gray3 : Colors.black};

    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 26px;
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

const JobList = styled.div`
    position : absolute;
    margin-top : 54px;
    width: 481px;
    height: 216px;
    background: ${Colors.white};   
    border: 1px solid;
    border-color : ${isOpen? Colors.primary : Colors.gray3};
    box-sizing: border-box;
    border-radius: 20px;   
    padding : 15px 92px; 15px 92px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap; 
    z-index : 12;
`;

const JobButton = styled.button`
    cursor : pointer;
    width: 122px;
    height: 38.6px;
    background: ${Colors.gray11};
    border-radius: 66px;
    border-width : 0;
    color : ${Colors.black}; 

    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 26px;     
`;

    return(
        <>      
        {isOpen? // 선택 모달 open
            <div style={{position : 'relative', display : 'flex', flexDirection : 'column'}}>
                <InputJob>
                    <CloseBox onClick = {() => setIsOpen(!isOpen)}>
                        <span>{JobText === ''? '현재 담당하고 있는 직무를 선택하세요' : JobText}</span>
                        <ImageBox style = {{alignSelf : 'center'}}><img src="/close.png"/></ImageBox>
                    </CloseBox>
                </InputJob>
                <JobList>
                    {new Array(jobLists.length).fill(0).map((_, i) => (
                        <>
                            <JobButton onClick = {() => OnClickListener(i)}>{jobLists[i]}</JobButton>
                        </>
                    ))}
                </JobList>
            </div>
            : 
            <InputJob>
            <CloseBox onClick = {() => setIsOpen(!isOpen)}>
                <span>{JobText === ''? '현재 담당하고 있는 직무를 선택하세요' : JobText}</span>
                <ImageBox><img src="/open.png"/></ImageBox>
            </CloseBox>
            </InputJob>
        }
        <div style = {{marginBottom : '40px'}}/>
        </>
    )

}
export default JobInput;