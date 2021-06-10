import styled from "@emotion/styled";
import { useState, useEffect } from 'react'
import { max, Colors, Dimmed } from "components/ui";
import axios, { AxiosResponse } from 'axios';

export function OrderDetail(props : any){ 
    const [Data, setData] = useState<any>();
    useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_API_URL as string  + `/mypage/paymentdetail/${props.orderId}`, { withCredentials: true }).then((res: AxiosResponse) => {
            //https://advist.herokuapp.com/mypage/paymentdetail/166
            if (res.data) {
                setData(res.data.result);
            }
        })
    }, [])

    function onCloseListener(){
        props.setOrderDetail(false);
        document.body.removeAttribute('style');
    }

    return(
        <>
        {Data === undefined?
            <></> :
            <>
        <Container>
            <OnContainer>
                <OutButton onClick={onCloseListener}><img src="/out.png"/></OutButton>
                <Box>
                    <BoxHeader>구매 내역</BoxHeader>
                    <Line/>
                    <PayBox>
                        <PayName>결제 정보</PayName>
                        <PayInfoBox>
                            <PayInfo>주문 번호 <InfoStyle>{Data.orderIdForCustomer}</InfoStyle></PayInfo>
                            <PayInfo>결제 수단 <InfoStyle>{Data.payMethod}</InfoStyle></PayInfo>
                            <PayInfo>결제 일시 <InfoStyle>{Data.purchasedTime}</InfoStyle></PayInfo>
                            <PayInfo>상품 옵션 <InfoStyle>{Data.optionName}</InfoStyle></PayInfo>
                            <PayInfo>상품 금액 <InfoStyle>{Data.price}</InfoStyle></PayInfo>
                            <PayInfo>할인 금액 <InfoStyle>{Data.discount}</InfoStyle></PayInfo>
                        </PayInfoBox>
                    </PayBox>
                </Box>
            </OnContainer>
        </Container>
        <Dimmed onClick={onCloseListener} />
        </>
        }
        </>
    )
}
export default OrderDetail;

const Container = styled.div`
    position: fixed;
    width: calc(100% - 40px);
    max-width: 800px;
    max-height : 480px;
    min-height : 465px;
    height: calc(100vh - 80px);
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: ${Colors.gray1};
    border-radius: 20px;
    z-index: 11;

    ${max[1]}{
        width: calc(100% - 20px);
        transform: translateX(-50%) translateY(-50%);
        border-radius: 10px;
    }
`;

const OnContainer = styled.div`
    width: 100%;
    height: calc(100vh - 80px);
    max-width: 800px;
    max-height : 480px;
    min-height : 465px;
    background : white;
    border-radius: 20px;
    ${max[1]}{
        border-radius: 10px;
    }
`;

const OutButton = styled.div`
    position: absolute;
    top: 32px;
    right: 32px;
    cursor : pointer;
    width: 24px;
    height: 24px;
    z-index: 12;
    ${max[1]}{
        top: 12px;
        right: 12px;
    }       
`;
// 600px
const Box = styled.div`
    display : flex;
    flex-direction : column;
    width: 100%;
    height : 304px;
    padding : 72px 100px 104px 100px;
    ${max[1]}{
        border-radius: 10px;
        padding : 54px 20px 175px 20px;
    }    
`;

const BoxHeader = styled.div`
    height: 28px;
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: bold;
    font-size: 28px;
    line-height: 34px;
    color : ${Colors.black};   
    ${max[1]}{
        height: 20px;
        font-size: 16px;
        font-weight: 700;
        line-height: 20px;
        letter-spacing: 0px;
        text-align: left;        
    }       
`;
// 600px
const Line = styled.div`
    margin-top : 24px;
    width: 100%;
    height: 0px;
    border: 1px solid ${Colors.gray3};
    ${max[1]}{
        margin-top : 12px;
    }       
`;

const PayBox = styled.div`
    display : flex;
    flex-direction : row;
    margin-top : 32px;
    ${max[1]}{
        flex-direction : column;
        margin-top : 12px;
    }     
`;

const PayName = styled.div`
    width: 120px;
    height: 20px;
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 20px; 
    color : ${Colors.black};
    ${max[1]}{
        width: 48px;
        font-size: 12px;
        letter-spacing: 0px;
        text-align: left;
    }     
`;

const PayInfoBox = styled.div`
    margin-left : 29px;
    ${max[1]}{
        margin-left : 0;
        margin-top : 16px;
    }       
`;

const PayInfo = styled.p`
    margin-bottom : 24px;
    width: 280px;
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px; 
    color : ${Colors.gray3};
    ${max[1]}{
        font-size: 10px;
        line-height: 16px;
        width: 240px;
    }      
`;

const InfoStyle = styled.span`
    margin-left : 29px;
    color : ${Colors.gray2};
    ${max[1]}{
        margin-left : 12px;
    }   
`;