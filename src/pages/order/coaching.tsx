import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "@emotion/styled";
import { Layout } from "components/layout";
import { min, max, Button, Colors } from "components/ui";
import { bootpay } from "components/bootpay";
import { withRouter } from 'next/router';
import { useRouter } from 'next/router';
import { AgreePage } from "components/agree";
import { Step } from "components/step";
import ScheduleSection from "components/order/coaching-schedule";
import OrdererSection from "components/order/coaching-orderer";
import { PaymentSection, PaymentSectionMethod, PaymentSectionAgree } from "components/order/coaching-receipt";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { itemId, optionId, userId } = context.query;
  const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pay/checkorder/${userId}?itemId=${itemId}&optionId=${optionId}`);
  return {
    props: { data: result.data.order_receipts },
  }
}

function OrderCoaching({data}: InferGetServerSidePropsType<typeof getServerSideProps>){
  // 약관 동의 모달
  const [AgreeModal, setAgreeModal] = useState<boolean>(false);

  function onClickListener(){
    setAgreeModal(true);
    document.body.style.overflow = 'hidden';
  }

  //오류 판별 및 리다이렉트
  const error = window.location.pathname === '/order';
  const router = useRouter();
  useEffect(() => {
    if(!error){
      router.push('/404');
    }
    document.body.style.overflow = 'auto';
  },[]);

  // 주문서 추가 정보(입력폼 정보)
  const [pg, setPg] = useState<string>('danal');
  const [method, setMethod] = useState<string>('card');
  const [schedule, setSchedule] = useState<any[]>([]);
  const [userName, setUserName] = useState<string>('');
  const [userNameState, setUserNameState] = useState<boolean>(false);
  const [userPhone, setUserPhone] = useState<string>('');
  const [userPhoneState, setUserPhoneState] = useState<boolean>(false);
  const [userMessage, setUserMessage] = useState<string>('');
  const [agree, setAgree] = useState<boolean>(false);

  // Step 활성화 useState
  const [crntStep, changeStep] = useState<number>(1);

  //코칭 일정 데이터베이스에 보내기
  async function postCoachingDate() {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/pay/coachingdate`, {
        orderId: data.orderId,
        dates: schedule.map((item:any)=>item.label)
      });
      changeStep(2);
    } catch (error) {
      console.error(error);
    }
  }

  //코치에게 할 말 데이터베이스에 보내기
  async function postCocachingUserData() {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/pay/coachingcontent`, {
        orderId: data.orderId,
        content: userMessage
      });
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/pay/userinfo`, {
        orderId: data.orderId,
        userId: data.userId,
        userName: userName,
        userPhone: userPhone
      });
      changeStep(3);
    } catch (error) {
      console.error(error);
    }
  }

  //구매하기 버튼 클릭 시, 유저 정보 넘기고 부트페이 실행
  function tryPay() {
    bootpay(data, {method: method, pg: pg, userName: userName, userPhone: userPhone});
  }

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
                <ScheduleSection scheduleList={schedule} setScheduleList={setSchedule}/>
              </Container>
              <Buttons>
                <Button type="secondary" onClick={()=>router.push(`/detail/${data.itemInfo.itemId}`)}>이전</Button>
                <Button type="start" disabled={schedule.length > 0 ? false : true} onClick={postCoachingDate}>다음</Button>
              </Buttons>
            </>
          ) : null
        }
        {
          crntStep === 2 ? (
            <>
              <Container>
                <OrdererSection userMessage={userMessage}
                                setUserMessage={setUserMessage}
                                userName={userName}
                                setUserName={setUserName}
                                setUserNameState={setUserNameState}
                                userPhone={userPhone}
                                setUserPhone={setUserPhone}
                                setUserPhoneState={setUserPhoneState} />
              </Container>
              <Buttons>
                <Button type="secondary" onClick={()=>changeStep(1)}>이전</Button>
                <Button type="start" disabled={userNameState && userPhoneState ? false : 'disabled'} onClick={postCocachingUserData}>결제하기</Button>
              </Buttons>
            </>
          ) : null
        }
        {
          crntStep === 3 ? (
            <>
              <Container>
                <PaymentSection itemInfo={data.itemInfo} />
                <Hr/>
                <PaymentSectionMethod pg={pg}
                                      setPg={setPg}
                                      method={method}
                                      setMethod={setMethod} />
                <PaymentSectionAgree agree={agree}
                                     setAgree={setAgree}
                                     onClickListener={onClickListener} />
              </Container>
              <Buttons>
                <Button type="secondary" onClick={()=>changeStep(2)}>이전</Button>
                <Button type="start" disabled={pg && method && agree ? false : 'disabled' } onClick={pg && method && agree ? tryPay : ()=>console.log('실행불가')}>결제하기</Button>
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
  width: 100%;
  margin-top: 20px;
  padding: 0 20px;

  ${min[1]} {
    padding: 0 40px;
    margin: 0 auto;
    max-width: 916px;
  }
`;

const Container = styled.div`
  width: calc(100% + 40px);
  background: ${Colors.white};
  border-top: 4px #EFF0F6 solid;
  padding: 20px 20px 0;
  margin: 24px -20px 0;

  ${min[1]} {
    width: 100%;
    margin: 24px 0 0;
    padding: 24px 36px 12px;
    border-top: 0;
    border-radius: 20px;
    box-shadow: 0px 8px 16px rgba(17, 17, 17, 0.06);
  }
`;

const Hr = styled.hr`
  border: 0px;
  border-bottom: 1px ${Colors.gray3} solid;
  margin: 0;
`;

const Buttons = styled.div`
  display: flex;
  margin: 40px -4px 40px;

  ${min[1]}{
    margin: 60px -6px 86px;
  }

  button {
    flex-basis: 50%;
    flex-grow: 1;
    margin: 0 6px;

    ${max[1]}{
      font-size: 12px;
      border-radius: 10px;
      height: 28px;
      margin: 0 4px;

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;