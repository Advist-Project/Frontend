import styled from "@emotion/styled";
import { max, Colors } from "components/ui";
import React, { useState } from "react";

export function YearsInput(props : any){
    const [isOpen, setIsOpen] = useState(false);
    const [YearText, setYearText] = useState('');
    const yearLists = ['1년 미만', '1~3년' , '3~5년' , '5~7년', '7~10년', '10년 이상'];

    function OnClickListener(i : number){
        setYearText(yearLists[i]);
        props.setYears(yearLists[i]);
        setIsOpen(!isOpen);
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

    color : ${YearText === ''? Colors.gray3 : Colors.black};

    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 26px;
    ${max[1]}{
        height: 24px;
        width: 280px;     
        font-size: 10px;
        line-height: 22px;
        letter-spacing: 0px;
        text-align: left;
        padding : 0 9px 0 12px;
        border-radius: 8px;
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

const YearList = styled.div`
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
    z-index : 11;
    ${max[1]}{
        width: 280px;
        height : 100px;
        margin-top : 26px;   
        padding : 8.74px 46px; 8.74px 46px;        
    }       
`;

const YearButton = styled.button`
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
    ${max[1]}{
        width: 71px;
        height : 17.87px;   
        font-size: 8px;
        line-height: 8px;          
    }        
`;

const MarginDiv = styled.div`
    margin-bottom : 40px;
    ${max[1]}{
        margin-bottom : 16px;            
    }     
`;

    return(
        <>      
        {isOpen? // 선택 모달 open
            <div style={{position : 'relative', display : 'flex', flexDirection : 'column'}}>
                <InputJob>
                    <CloseBox onClick = {() => setIsOpen(!isOpen)}>
                        <span>{YearText === ''? '위에서 선택한 직무의 연차를 입력해주세요' : YearText}</span>
                        <ImageBox style = {{alignSelf : 'center'}}><img src="/close.png"/></ImageBox>
                    </CloseBox>
                </InputJob>
                <YearList>
                    {new Array(yearLists.length).fill(0).map((_, i) => (
                        <>
                            <YearButton key = {i} onClick = {() => OnClickListener(i)}>{yearLists[i]}</YearButton>
                        </>
                    ))}
                </YearList>
            </div>
            : 
            <InputJob>
            <CloseBox onClick = {() => setIsOpen(!isOpen)}>
                <span>{YearText === ''? '위에서 선택한 직무의 연차를 입력해주세요' : YearText}</span>
                <ImageBox><img src="/open.png"/></ImageBox>
            </CloseBox>
            </InputJob>
        }
        <MarginDiv/>
        </>
    )

}
export default YearsInput;