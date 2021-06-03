import React, {useState} from "react";
import styled from "@emotion/styled";
import Image from 'next/image';
import { min, max, Colors } from "components/ui";
import { OrderDetail } from "components/order/order-detail"
import { ReviewDetail } from "components/review/review-detail"

export function MybuyingTableBody(props : any){
    const Data = props.data.result; // api 데이터 저장
    const Length = props.data.result.length; // 배열 요소 개수
    const [OrderModal, setOrderModal] = useState<boolean>(false);
    const [ReviewModal, setReviewModal] = useState<boolean>(false);
    const [ClickKey, setClickKey] = useState<number>(0)
    //console.log(Data);
    function onDetailListener(key : number){
        setClickKey(key);
        setOrderModal(true);
        document.body.style.overflow = 'hidden';
    }

    function onReviewListener(key : number){
        setClickKey(key);
        setReviewModal(true);
        document.body.style.overflow = 'hidden';
    }
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
                        <MobileStatusBox>                            
                            <Status>{Data[num].status}</Status>
                        </MobileStatusBox>
                        <td>
                            <BuyingProductContainer>
                                <PCImages>
                                    <Image
                                        src="/mainGraphic_section1_human.png"
                                        // src = {Data[num].img}
                                        alt=""
                                        width={136}
                                        height={77}
                                        priority
                                    />
                                </PCImages>
                                <MobileImages>
                                    <Image
                                        src="/mainGraphic_section1_human.png"
                                        // src = {Data[num].img}
                                        alt=""
                                        width={81}
                                        height={46}
                                        priority
                                    />
                                </MobileImages>                                
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
                        <PCStatusBox>                            
                            <Status>{Data[num].status}</Status>
                        </PCStatusBox>
                        <td style={{verticalAlign : 'middle'}}>
                            <ButtonBox>
                                {Data[num].status === "결제 완료"? (<Button style = {{marginBottom : '16px'}} onClick = {() => onReviewListener(num)}>후기 작성</Button>) : (<></>)}
                                <Button onClick = {() => onDetailListener(num)}>주문 상세보기</Button>
                            </ButtonBox>
                        </td>
                    </Template>
                    </>
                ))}
                {                
                    OrderModal ? <OrderDetail orderId = {Data[ClickKey].orderId} setOrderDetail={setOrderModal}/> : null
                }
                {                
                    ReviewModal ? <ReviewDetail orderId = {Data[ClickKey].orderId} setReviewDetail={setReviewModal}/> : null
                }                
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
    ${max[1]}{
        padding-left : 0;
        padding-top : 12px;
    }    
`;

const PCImages = styled.div`
    ${max[1]}{
        display : none;
    }
`;

const MobileImages = styled.div`
    min-width : 81px;
    min-height : 46px;
    ${min[1]}{
        display : none;
    }
`;

const BuyingProductInfo = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : space-between;
    margin-left : 24px;
    ${max[1]}{
        margin-left : 8px;
    }        
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
    ${max[1]}{
        display : none;
    }    
`;

const InfoMain = styled.span`
    font-family: Spoqa Han Sans Neo;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: left;
    ${max[1]}{
        font-size: 10px;
        line-height: 16px;        
    }       
`;

const PCStatusBox = styled.td`
    vertical-align : middle;
    ${max[1]}{
        display : none;
    }
`;

const MobileStatusBox = styled.td`
    ${min[1]}{
        display : none;
    }       
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
    ${max[1]}{
        margin-top : 12px;
        font-size: 12px;
        line-height: 18px;
        text-align: left;        
    }    
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
    ${max[1]}{
        width : 136px;
        height : 20px;
        font-size: 10px;   
        border-width : 1px;
        border-radius: 4px;
    } 
`;

const ButtonBox = styled.div`
    height : 80px;
    display : flex;
    flex-direction : column;
    justify-content : center;    
    ${max[1]}{
        height : 20px;
        margin-top : 11px;        
        flex-direction : row;
    }
`;

const Template = styled.tr`
    height : 128px;
    border-bottom: 1px solid ${Colors.gray3};
    ${max[1]}{
        min-width : 280px;
        width: calc( 100vw - 10% );
        min-height : 138px;
        height : auto;
        display : flex;
        flex-direction : column;
        border-bottom: 4px solid ${Colors.gray5};
    }      
`;