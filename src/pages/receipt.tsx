import React, { useState, useEffect } from 'react';
import styled from "@emotion/styled";
import { Heading, Button } from "components/ui";
import { Price } from "components/price";
import { bootpay } from "components/bootpay";
import { withRouter } from 'next/router';
import { useRouter } from 'next/router';

function Order(props: any) {
  const query = props.router.query;
  const error = Object.keys(query).length <= 5;
  console.log(Object.keys(query).length);

  const router = useRouter();
  useEffect(() => {
    if(error){
      router.push('/404');
    }
  },[]);

  const [pg, setPg] = useState<string>('kcp');
  const [method, setMethod] = useState<string>('card');

  return (
    <>
    {
      !error ?
      <Container>
        <Heading level={4} bold>{query.itemName}</Heading>
        <Price price={query.price} discountPrice={query.discountPrice} />

        <h2>결제수단</h2>
        <Methods>
          <MethodBtn className={method === 'card' ? 'active' : ''}
                     onClick={()=>{setPg('kcp');setMethod('card');}}>카드결제</MethodBtn>
          <MethodBtn className={pg === 'kakao' ? 'active' : ''}
                     onClick={()=>{setPg('kakao');setMethod('easy');}}>카카오페이</MethodBtn>
        </Methods>

        <div onClick={()=>bootpay(query, {method: method, pg: pg})}>
          <Button type="start">결제하기</Button>
        </div>
      </Container>
      : null
    }
    </>
  )
}
export default withRouter(Order);

const Container = styled.div`
  width: 600px;
  margin: 50px auto;
`;


const Methods = styled.div`
  display: flex;
  padding: 0 -3px;
`;
const MethodBtn = styled.div`
  text-align: center;
  flex-basis: 0px;
  flex-grow: 1;
  height: 60px;
  line-height: 60px;
  margin: 0 3px;
  background: #FFFFFF;
  border: 1px solid #E3E3E3;
  cursor: pointer;

  &.active {
    background: #F8F8F8;
    border: 1px solid #373737;
  }
`;