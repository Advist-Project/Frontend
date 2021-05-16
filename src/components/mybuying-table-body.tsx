import React, { useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios';
import styled from "@emotion/styled";
import Image from 'next/image';
import { Colors } from "components/ui";

export function MybuyingTableBody(){
    const [Data, setData] = useState<any>();
    const [Length, setLength] = useState<number>(0);
    useEffect(() => {  
        axios.get(process.env.NEXT_PUBLIC_API_URL as string + '/mypage/payment/1', { withCredentials: true }).then((res: AxiosResponse) => {
            if (res.data){
                setData(res.data.result); // api 데이터 저장
                setLength(res.data.result.length); // 배열 요소 개수
            }
        }) 
    }, [])    

    return(
        <>
        {Data === undefined? 
                <>
                </>
                : // api 받아올때
                <>
                {new Array(Length).fill(0).map((_, num) => ( 
                    <>
                    <Template key = {num}>
                        <td>
                            <BuyingProductContainer>
                                <Image
                                    src="/mainGraphic_section1_human.png"
                                    /* src = Data[num].img */
                                    alt=""
                                    width={136}
                                    height={77}
                                    priority
                                />
                                <BuyingProductInfo>
                                    <div>
                                        <InfoName>구매 상품</InfoName>
                                        <InfoMain>{Data[num].itemName}</InfoMain>
                                    </div>
                                    <div>
                                        <InfoName>결제 금액</InfoName>                                        
                                        <InfoMain>{Data[num].price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원</InfoMain>
                                    </div>
                                    <div>
                                        <InfoName>구매 일자</InfoName>                                        
                                        <InfoMain>{Data[num].purchasedTime}</InfoMain>
                                    </div>             
                                </BuyingProductInfo>         
                            </BuyingProductContainer>
                        </td>
                        <StatusBox>                            
                            <Status>{Data[num].status}</Status>
                        </StatusBox>
                        <td style={{verticalAlign : 'middle'}}>
                            <div style = {{height : '80px', display : 'flex', flexDirection : 'column', justifyContent : 'space-between'}}>
                                <Button>후기 작성</Button>
                                <Button>주문 상세보기</Button>
                            </div>
                        </td>
                    </Template>
                    </>
                ))}
                </>   
        }    
        </>

    )
}
export default MybuyingTableBody;

const BuyingProductContainer = styled.div`
    display : flex;
    flex-direction : row;
    padding-left : 24px;
    padding-top : 24px;
`;

const BuyingProductInfo = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : space-between;
    margin-left : 24px;
`;

const InfoName = styled.span`
    font-family: Spoqa Han Sans Neo;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: left;
    margin-right : 12px;

    color: ${Colors.gray3};
`;

const InfoMain = styled.span`
    font-family: Spoqa Han Sans Neo;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: left;
`;

const StatusBox = styled.td`
    vertical-align : middle;
`;

const Status = styled.div`
    width: 102px;
    height: 16px; 
    text-align: center;
    text-decoration-line: underline;

    font-family: Spoqa Han Sans Neo;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0px; 

    color : ${Colors.primary};
`;

const Button = styled.button`
    cursor : pointer;

    height: 32px;
    width: 99px;

    border-radius: 8px;
    padding: 4px, 8px, 4px, 8px;

    font-family: Spoqa Han Sans Neo;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0px;
    text-align: center;

    color : ${Colors.gray1};
    background : ${Colors.white};

`;

const Template = styled.tr`
    height : 128px;
    border-bottom: 1px solid ${Colors.gray3};
`;