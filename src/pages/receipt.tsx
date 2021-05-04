import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "@emotion/styled";
import { Layout } from "components/layout";
import { Heading, Button, Colors } from "components/ui";
import { bootpay } from "components/bootpay";
import { withRouter } from 'next/router';
import { useRouter } from 'next/router';
import { priceFormat } from "components/formatter";
import { InputPhone } from "components/input-phone";
import { InputName } from "components/input-name";
import { AgreePage } from "components/agree";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { itemId, optionId, userId } = context.query;
  const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pay/checkorder/${userId}?itemId=${itemId}&optionId=${optionId}`);
  return {
    props: { data: result.data.order_receipts },
  }
}

function Order({data}: InferGetServerSidePropsType<typeof getServerSideProps>){
  // 약관 동의 모달
  const [AgreeModal, setAgreeModal] = useState<boolean>(false);

  function onClickListener(){
    setAgreeModal(true);
    document.body.style.overflow = 'hidden';
  }

  // 오류 판별 및 리다이렉트
  const error = window.location.pathname === '/order';
  const router = useRouter();
  useEffect(() => {
    if(!error){
      router.push('/404');
    }
  },[]);

  // 주문서 추가 정보(입력폼 정보)
  const [pg, setPg] = useState<string>('danal');
  const [method, setMethod] = useState<string>('card');
  const [userName, setUserName] = useState<string>('');
  const [userNameState, setUserNameState] = useState<boolean>(false);
  const [userPhone, setUserPhone] = useState<string>('');
  const [userPhoneState, setUserPhoneState] = useState<boolean>(false);
  const [agree, setAgree] = useState<boolean>(false);

  // 폼 상태 체크해서 구매하기 버튼 활성화
  const [buyBtnState, setBuyBtnState] = useState<string>('disabled');
  useEffect(() => {
    if(userNameState && userPhoneState && agree){
      setBuyBtnState('');
    } else {
      setBuyBtnState('disabled');
    }
  },[userNameState, userPhoneState, agree]);

  //구매하기 버튼 클릭 시, 유저 정보 넘기고 부트페이 실행
  async function tryPay() {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/pay/userinfo`, {
        orderId: data.orderId,
        userId: data.userId,
        userName: userName,
        userPhone: userPhone
      });
      console.log('save userinfo: ', res);
      bootpay(data, {method: method, pg: pg, userName: userName, userPhone: userPhone});
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Layout noFooter>
      {                
        AgreeModal ? <AgreePage setActiveTab="refund" setAgreeModal={setAgreeModal}/> : null
      }
      <Bg>
      <Container>
        <Heading level={3}>결제하기</Heading>
        <hr/>

        <Section>
          <Heading level={5}>주문 정보</Heading>
          <Flex style={{alignItems: 'flex-end', marginTop: '20px'}}>
            <Img src={`/detail/${data.itemInfo.itemId}/thumb.png`}/>
            <OrderInfoText>
              <Title>{data.itemInfo.itemName}</Title> {/* 문과생 출신 마케터가 알려주는 GTM으로 전자상거래 구축하기 */}
              {
                data.itemInfo.option.type === "workbook" ?
                <Type>[워크북] 업무에 활용했던 자료들입니다.</Type> :
                <Type>[코칭] {data.itemInfo.option.title}</Type>
              }
            </OrderInfoText>
          </Flex>
        </Section>
        <hr/>

        <Section>
          <Heading level={5}>결제 금액</Heading>
          <PriceInfo>
            <dt>상품 금액</dt>
            <dd>{priceFormat(data.itemInfo.option.price)}원</dd>
            <dt>할인 금액</dt>
            <dd>{priceFormat(data.itemInfo.option.discountPrice - data.itemInfo.option.price)}원</dd>
            <dt>최종 결제금액</dt>
            <dd className="finalPrice">{priceFormat(data.itemInfo.option.discountPrice)}원</dd>
          </PriceInfo>
        </Section>
        <hr/>

        <Section>
          <Heading level={5}>결제 수단</Heading>
          <Methods>
            <MethodBtn className={method === 'card' ? 'active' : ''}
                      onClick={()=>{setPg('danal');setMethod('card');}}>카드결제</MethodBtn>
            <MethodBtn className={pg === 'kakao' ? 'active' : ''}
                      onClick={()=>{setPg('kakao');setMethod('easy');}}>카카오페이</MethodBtn>
            <MethodBtn className={pg === 'npay' ? 'active' : ''}
                      onClick={()=>{setPg('npay');setMethod('');}}>네이버페이</MethodBtn>
          </Methods>

          <Heading level={5}>주문하시는 분 정보</Heading>
          <UserInfo>
            <Flex>
              <label>이름</label>
              <InputName useState={userName} useStateFunction={setUserName} formStateFunction={setUserNameState} />
            </Flex>
            <Flex>
              <label>연락처</label>
              <InputPhone useState={userPhone} useStateFunction={setUserPhone} formStateFunction={setUserPhoneState} />
            </Flex>
          </UserInfo>
        </Section>

        <Section>
          <Agree>
            <input id="ag" type="checkbox" onClick={()=>setAgree(!agree)} />
            <label htmlFor="ag">주문 내용을 확인하였으며, <label style={{color: Colors.primary, cursor: 'pointer'}} onClick={onClickListener}>서비스 취소/환불 정책&nbsp;</label>및 결제에 동의합니다. (필수)</label>
          </Agree>
          <div onClick={buyBtnState !== 'disabled' ? tryPay : ()=>console.log('실행불가')}>
            <Button type="start" style={{width:'100%'}} disabled={buyBtnState}>결제하기</Button>
          </div>
        </Section>
      </Container>
      </Bg>
    </Layout>
  )
}
export default withRouter(Order);

const Bg = styled.div`
  background: ${Colors.gray7};
`;
const Flex = styled.div`
  display: flex;
`;
const Container = styled.div`
  background: ${Colors.white};
  width: 100%;
  max-width: 804px;
  padding: 20px 40px;
  margin: 0 auto;
`;
const Section = styled.section`
  padding: 20px 0; 
`


const OrderInfoText = styled.div`
  margin-left: 20px;
`;
const Img = styled.img`
  width: 180px;
  border: 1px ${Colors.gray4} solid;
`
const Title = styled.h6`
  font-weight: 500;
  line-height: 32px;
  font-size: 20px;
  word-break: keep-all;
`
const Type = styled.p`
  font-size: 16px;
  line-height: 26px;
`


const PriceInfo = styled.dl`
  display: flex;
  flex-wrap: wrap;
  font-size: 20px;
  line-height: 60px;
  padding: 10px 0 0;

  dt {
    width: 200px;
  }
  dd {
    width: calc(100% - 200px);
    text-align: right;
  }
  dd.finalPrice {
    font-size: 26px;
  }
`;


const Methods = styled.div`
  display: flex;
  padding: 0 -3px;
  margin-top: 20px;
  margin-bottom: 60px;
`;
const MethodBtn = styled.div`
  text-align: center;
  flex-basis: 0px;
  flex-grow: 1;
  height: 60px;
  line-height: 60px;
  margin: 0 3px;
  background: ${Colors.white};
  border: 1px solid ${Colors.gray3};
  cursor: pointer;

  &.active {
    background: ${Colors.gray5};
    border: 1px solid ${Colors.gray1};
  }
`;


const UserInfo = styled.div`
  padding: 20px 0 0;

  div {
    margin-bottom: 10px;
  }

  label {
    align-self: flex-start;
    display: inline-block;
    width: 100px;
    line-height: 52px;
    font-size: 16px;
  }
  input {
    width: 280px;
    height: 52px;
    font-size: 16px;
    padding: 12px;
    border: 1px solid ${Colors.gray3};
  }
`;


const Agree = styled.div`
  font-size: 16px;
  margin-bottom: 20px;

  input {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    margin-right: 10px;
  }
`;