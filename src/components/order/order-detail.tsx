import styled from "@emotion/styled";
import { useState, useEffect } from 'react'
import { Colors } from "components/ui";
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
            <Box>
            <OutButton onClick = {() => onCloseListener()}><img src="/out.png"/></OutButton>
            <p>주문번호 {Data.orderIdForCustomer}</p>
            <p>결제수단 {Data.payMethod}</p>
            <p>결제일시 {Data.purchasedTime}</p>
            <p>상품옵션 {Data.optionName}</p>
            <p>상품금액 {Data.price}</p>
            <p>할인금액 {Data.discount}</p>
            </Box>
        </Container>
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
    height: calc(100vh - 80px);
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: ${Colors.gray1};
    border-radius: 20px;
    z-index: 11;

    &::after {
      content: '';
      display: block;
      position: fixed;
      top: -50%;
      left: -50%;
      width: 1000vw;
      height: 1000vh;
      background: rgba(20, 20, 42, 0.5);
      z-index: -1;
    }
`;

const Box = styled.div`
    width: 100%;
    height: calc(100vh - 80px);
    max-width: 800px;
    max-height : 480px;
    background : white;
    border-radius: 20px;
`;

const OutButton = styled.div`
  position: absolute;
  top: 32px;
  right: 32px;
  cursor : pointer;
  width: 24px;
  height: 24px;
  z-index: 12;
`;