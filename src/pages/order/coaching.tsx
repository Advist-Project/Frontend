import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "@emotion/styled";
import { Layout } from "components/layout";
import { Button, Colors } from "components/ui";
import { bootpay } from "components/bootpay";
import { withRouter } from 'next/router';
import { useRouter } from 'next/router';
import { priceFormat } from "components/formatter";
import { InputPhone } from "components/input-phone";
import { InputName } from "components/input-name";
import { AgreePage } from "components/agree";
import { Step } from "components/step";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const { itemId, optionId, userId } = context.query;
  // const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pay/checkorder/1?itemId=1&optionId=1`);
  const vDate = {customerOrderId: 484979,
    itemInfo:{
    itemId: 1,
    itemImg: "",
    itemName: "문과생 출신 마케터가 알려주는 GTM으로 GA 전자상거래 구축하기",
    itemOwner: "문인호",
    option:{
    deleteYN: false,
    desc: "업무적으로 궁금하신 점이나 막히는 점을 어떻게 해결하면 되는지 방법을 알려드려요",
    discountPrice: 100000,
    optionId: 1,
    price: 100000,
    title: "실무 Q&A(2시간)",
    type: "coaching",
    }},
    orderId: 49,
    status: -1,
    userEmail: "pjhk5797@gmail.com",
    userId: 1
  }

  return {
    // props: { data: result.data.order_receipts },
    props: { data: vDate },
  }
}

function OrderCoaching({data}: InferGetServerSidePropsType<typeof getServerSideProps>){
  // 약관 동의 모달
  const [AgreeModal, setAgreeModal] = useState<boolean>(false);

  function onClickListener(){
    setAgreeModal(true);
    document.body.style.overflow = 'hidden';
  }

  // 오류 판별 및 리다이렉트
  // const error = window.location.pathname === '/order';
  // const router = useRouter();
  // useEffect(() => {
  //   if(!error){
  //     router.push('/404');
  //   }
  // },[]);

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

  // Step 활성화 useState
  const [crntStep, changeStep] = useState<number>(1);

  return (
    <Layout noFooter>
      {                
        AgreeModal ? <AgreePage setActiveTab="refund" setAgreeModal={setAgreeModal}/> : null
      }
      <Wrap>
        <Step active={crntStep} labels={["스케줄 선택", "개인정보 입력", "결제하기", "결제 완료"]}/>
        {
          crntStep === 1 ? (
            <>
              <Container>
                <ScheduleSection />
              </Container>
              <Buttons>
                <Button type="login" disabled={true}>이전</Button>
                <Button type="start" onClick={()=>changeStep(2)}>다음</Button>
              </Buttons>
            </>
          ) : null
        }
        {
          crntStep === 2 ? (
            <>
              <Container>
                <OrdererSection userName={userName}
                                setUserName={setUserName}
                                setUserNameState={setUserNameState}
                                userPhone={userPhone}
                                setUserPhone={setUserPhone}
                                setUserPhoneState={setUserPhoneState} />
              </Container>
              <Buttons>
                <Button type="login" onClick={()=>changeStep(1)}>이전</Button>
                <Button type="start" onClick={()=>changeStep(3)}>결제하기</Button>
              </Buttons>
            </>
          ) : null
        }
        {
          crntStep === 3 ? (
            <>
              <Container>
                <PaymentSection />
              </Container>
              <Buttons>
                <Button type="login" onClick={()=>changeStep(2)}>이전</Button>
                <button onClick={()=>changeStep(4)}>다음</button>
              </Buttons>
            </>
          ) : null
        }
        {
          crntStep === 4 ? (
            <>
              <Container>
                <DoneSection />
              </Container>
              <Buttons>
                <Button type="login">다른 상품 보기</Button>
                <button>내 구매내역 보기</button>
              </Buttons>
            </>
          ) : null
        }
      </Wrap>
    </Layout>
  )
}
export default withRouter(OrderCoaching);

const Wrap = styled.div`
  padding: 0 40px;
  margin: 0 auto;
  width: 100%;
  max-width: 916px;
`;

const Container = styled.div`
  background: ${Colors.white};
  width: 100%;
  margin-top: 24px;
  padding: 24px 36px 12px;
  border-radius: 20px;
  box-shadow: 0px 8px 16px rgba(17, 17, 17, 0.06);
`;

const Headline = styled.div`
  display: flex;
  align-items: baseline;
`;
const Title = styled.h2`
  font-weight: 700;
  line-height: 32px;
  font-size: 20px;
  word-break: keep-all;
  white-space: nowrap;
`
const Desc = styled.p`
  line-height: 26px;
  font-size: 16px;
  word-break: keep-all;
  margin-left: 20px;
`

const Textarea = styled.textarea`
  width: 100%;
  height: 183px;
  padding: 20px;
  border: 1px ${Colors.gray3} solid;
  border-radius: 20px;
  font-size: 14px;
  line-height: 24px;
  resize: none;
  margin-top: 20px;

  &::placeholder {
    color: ${Colors.gray3}
  }
`;

const Characters = styled.p`
  margin-bottom: 52px;
  text-align: right;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
`;

const UserInfo = styled.div`
  padding: 36px 0 26px;

  label {
    display: block;
    font-size: 16px;
    margin-bottom: 16px;
  }
  input {
    width: 100%;
    height: 52px;
    font-size: 16px;
    padding: 12px 24px;
    border-radius: 20px;
    border: 1px solid ${Colors.gray3};

    &::placeholder {
      color: ${Colors.gray3}
    }
  }

  div + div {
    margin-top: 32px;
  }
`;

const Buttons = styled.div`
  display: flex;
  margin: 60px -6px 86px;

  button {
    flex-basis: 50%;
    flex-grow: 1;
    margin: 0 6px;
  }
`;

function ScheduleSection(){
  return (
    <section>
      <Headline>
        <Title>코칭 신청</Title>
        <Desc>2주 내에 코칭받을 수 있는 일정을 모두 선택해주세요. 요일 선택 뒤, 시간 선택이 가능합니다.</Desc>
      </Headline>
    </section>
  )
}

function OrdererSection({userName, setUserName, setUserNameState, userPhone, setUserPhone, setUserPhoneState}: any){
  return (
    <section>
      <Headline>
        <Title>상담 내용</Title>
        <Desc>코치에게 전하는 말을 남겨주세요.</Desc>
      </Headline>
      <Textarea placeholder="지금 고민하고 있는 부분이나 코치님에게 어떤 상담/교육을 받고 싶은지 구체적으로 작성해주세요."></Textarea>
      <Characters>0/200</Characters>
      <Headline>
        <Title>신청하시는 분 정보</Title>
        <Desc>입력하신 연락처로 코칭 진행에 대해 자세히 안내드립니다.</Desc>
      </Headline>
      <UserInfo>
        <div>
          <label>이름</label>
          <InputName useState={userName} useStateFunction={setUserName} formStateFunction={setUserNameState} />
        </div>
        <div>
          <label>연락처</label>
          <InputPhone useState={userPhone} useStateFunction={setUserPhone} formStateFunction={setUserPhoneState} />
        </div>
      </UserInfo>
    </section>
  )
}

function PaymentSection(){
  return (
    <section>
      <Headline>
        <Title>주문 정보</Title>
        <Desc>주문 정보를 다시 한번 확인해주세요.</Desc>
      </Headline>
      <Headline>
        <Title>결제 정보</Title>
        <Title>결제 수단</Title>
      </Headline>
    </section>
  )
}

function DoneSection(){
  return (
    <section>
      <Headline>
        <Title>결제가 완료되었습니다.</Title>
      </Headline>
    </section>
  )
}