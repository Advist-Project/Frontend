import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "@emotion/styled";
import { Layout } from "components/layout";
import { Button, ToggleBtn, Colors } from "components/ui";
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
  // const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pay/checkorder/${userId}?itemId=${itemId}&optionId=${optionId}`);
  // return {
  //   props: { data: result.data.order_receipts },
  // }

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

  //오류 판별 및 리다이렉트
  // const error = window.location.pathname === '/order';
  // const router = useRouter();
  // useEffect(() => {
  //   if(!error){
  //     router.push('/404');
  //   }
  // },[]);

  // 주문서 추가 정보(입력폼 정보)
  const [pg, setPg] = useState<string>('');
  const [method, setMethod] = useState<string>('');
  const [schedule, setSchedule] = useState<string[]>([]);
  const [userName, setUserName] = useState<string>('');
  const [userNameState, setUserNameState] = useState<boolean>(false);
  const [userPhone, setUserPhone] = useState<string>('');
  const [userPhoneState, setUserPhoneState] = useState<boolean>(false);
  const [agree, setAgree] = useState<boolean>(false);

  useEffect(() => {
    console.log(schedule);
  },[schedule]);

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
                <ScheduleSection scheduleList={schedule} setScheduleList={setSchedule}/>
              </Container>
              <Buttons>
                <Button type="secondary" onClick={()=>window.history.back()}>이전</Button>
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
                <Button type="secondary" onClick={()=>changeStep(1)}>이전</Button>
                <Button type="start" disabled={userNameState && userPhoneState ? false : 'disabled'} onClick={()=>changeStep(3)}>결제하기</Button>
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

const Hr = styled.hr`
  border: 0px;
  border-bottom: 1px ${Colors.gray3} solid;
  margin: 0;
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

function ScheduleSection({scheduleList, setScheduleList}: any){
  const Btns = styled.ul`
    display: flex;
    margin-top: 36px;
    margin-bottom: 16px;
    
    li {
      flex-grow: 1;
      flex-basis: 0px;
      margin-right: 9px;
  
      &:last-of-type {
        margin-right: 0;
      }
    }
  `;

  const Btn = styled.button`
    border: 1px ${Colors.gray3} solid;
    background: ${Colors.white};
    cursor: pointer;
    width: 100%;
    padding: 3px 4px;
    border-radius: 8px;
    font-size: 14px;
    line-height: 24px;
    color: ${Colors.gray3};

    &.on {
      border-color: ${Colors.primary};
      color: ${Colors.primary};
    }
  `;

  const Times = styled.ul`
    visibility: hidden;
    border: 1px ${Colors.primary} solid;
    border-radius: 8px;
    padding: 4px 20px;
    margin-bottom: 36px;

    &.visible {
      visibility: visible;
    }

    li {
      padding: 16px 0;
    }

    input[type=checkbox]{
      display: none;
    }
    label {
      font-size: 16px;
      cursor: pointer;
    }
    input[type=checkbox] + label::before {
      content: '';
      display: inline-block;
      width: 24px;
      height: 24px;
      vertical-align: middle;
      margin-right: 15px;
      border-radius: 4px;
      border: 1px solid ${Colors.gray3};
    }
    input[type=checkbox] + label:hover::before {
      border-color: ${Colors.primary};
    }
    input[type=checkbox]:checked + label::before {
      border-color: ${Colors.primary};
      background: url('/icon/done_24px.svg') center/17px 13px no-repeat;
      background-color: ${Colors.primary};
    }
  `;

  const SelectedTimes = styled.div`
    margin-top: 24px;
    padding-top: 36px;
    padding-bottom: 36px;
  `;

  const times = {
    b9: false,
    a9b12: false,
    a12b15: false,
    a15b18: false,
    a19b21: false,
    a21b24: false,
    a24: false
  }
  const [schedule, setSchedule] = useState<{[key: string]: any}>({
    mon: {
      label: '월',
      active: false,
      time: { ...times },
    },
    tue: {
      label: '화',
      active: false,
      time: { ...times },
    },
    wed: {
      label: '수',
      active: false,
      time: { ...times },
    },
    thu: {
      label: '목',
      active: false,
      time: { ...times },
    },
    fri: {
      label: '금',
      active: false,
      time: { ...times },
    },
    sat: {
      label: '토',
      active: false,
      time: { ...times },
    },
    sun: {
      label: '일',
      active: false,
      time: { ...times },
    },
  });

  console.log(schedule);

  const [every, onEvery] = useState<boolean>(false);
  const [day, onDay] = useState<boolean>(false);
  const [end, onEnd] = useState<boolean>(false);

  const isActived = schedule.mon.active || schedule.tue.active || schedule.wed.active || schedule.thu.active || schedule.fri.active || schedule.sat.active || schedule.sun.active;
  const isEvery = schedule.mon.active && schedule.tue.active && schedule.wed.active && schedule.thu.active && schedule.fri.active && schedule.sat.active && schedule.sun.active;
  const isDay = schedule.mon.active && schedule.tue.active && schedule.wed.active && schedule.thu.active && schedule.fri.active;
  const isEnd = schedule.sat.active && schedule.sun.active;

  useEffect(() => {
    isEvery ? onEvery(true) : onEvery(false);
    isDay ? onDay(true) : onDay(false);
    isEnd ? onEnd(true) : onEnd(false);
  },[schedule]);

  function pushSchedule(){
    // const copy = [...scheduleList];
    // const daysKo = ["월", "화", "수", "목", "금", "토", "일"];
    // const days = [mon, tue, wed, thu, fri, sat, sun];
    // const time = "오후 (3시 - 6시)";

    // for(let i = 0; i < 7; i++){
    //   if(days[i]){
    //     let timeStr = daysKo[i] + ' / ' + time;
    //     if(copy.indexOf(timeStr) < 0){
    //       copy.push(timeStr);
    //     }
    //   }
    // }
    // setScheduleList(copy);
  }

  function removeSchedule(item: string){
    // const copy = [...schedule];
    // copy.indexOf('')
    console.log(item);
  }

  // 버튼 클릭 시 토글 동작
  function toggle(day:string){
    if(day in schedule){
      let dayObj = {...schedule[day]};
      let newObj = {
        ...schedule,
        [day]: {...dayObj, active: !dayObj.active }
      }
      setSchedule(newObj);
    }
  }

  function toggleEvery() {
    const status = !every;
    const newObj = {...schedule};
    for(const key in newObj){
      newObj[key].active = status;
    }
    setSchedule(newObj);
  }

  function toggleDay() {
    const status = !day;
    const newObj = {...schedule};
    newObj.mon.active = status;
    newObj.tue.active = status;
    newObj.wed.active = status;
    newObj.thu.active = status;
    newObj.fri.active = status;
    setSchedule(newObj);
  }

  function toggleEnd() {
    const status = !end;
    const newObj = {...schedule};
    newObj.sat.active = status;
    newObj.sun.active = status;
    setSchedule(newObj);
  }


  return (
    <section>
      <Headline>
        <Title>코칭 신청</Title>
        <Desc>2주 내에 코칭받을 수 있는 일정을 모두 선택해주세요. 요일 선택 뒤, 시간 선택이 가능합니다.</Desc>
      </Headline>
      <Btns>
        <li><Btn className={every ? 'on' : ''} onClick={toggleEvery}>모든 요일</Btn></li>
        <li><Btn className={day ? 'on' : ''} onClick={toggleDay}>평일</Btn></li>
        <li><Btn className={end ? 'on' : ''} onClick={toggleEnd}>주말</Btn></li>
        <li><Btn className={schedule.mon.active ? 'on' : ''} onClick={()=>toggle('mon')}>월</Btn></li>
        <li><Btn className={schedule.tue.active ? 'on' : ''} onClick={()=>toggle('tue')}>화</Btn></li>
        <li><Btn className={schedule.wed.active ? 'on' : ''} onClick={()=>toggle('wed')}>수</Btn></li>
        <li><Btn className={schedule.thu.active ? 'on' : ''} onClick={()=>toggle('thu')}>목</Btn></li>
        <li><Btn className={schedule.fri.active ? 'on' : ''} onClick={()=>toggle('fri')}>금</Btn></li>
        <li><Btn className={schedule.sat.active ? 'on' : ''} onClick={()=>toggle('sat')}>토</Btn></li>
        <li><Btn className={schedule.sun.active ? 'on' : ''} onClick={()=>toggle('sun')}>일</Btn></li>
      </Btns>
      <Times className={isActived ? "visible" : ""}>
        <li>
          <input id="all" type="checkbox" onClick={pushSchedule}/>
          <label htmlFor="all">모든 시간</label>
        </li>
        <li>
          <input id="b9" type="checkbox" onClick={pushSchedule}/>
          <label htmlFor="b9">오전 (9시 이전)</label>
          </li>
        <li>
          <input id="a9b12" type="checkbox" onClick={pushSchedule}/>
          <label htmlFor="a9b12">오전 (9시 - 12시)</label>
          </li>
        <li>
          <input id="a12b15" type="checkbox" onClick={pushSchedule}/>
          <label htmlFor="a12b15">오후 (12시 - 3시)</label>
          </li>
        <li>
          <input id="a15b18" type="checkbox" onClick={pushSchedule}/>
          <label htmlFor="a15b18">오후 (3시 - 6시)</label>
          </li>
        <li>
          <input id="a19b21" type="checkbox" onClick={pushSchedule}/>
          <label htmlFor="a19b21">저녁 (7시 - 9시)</label>
          </li>
        <li>
          <input id="a21b24" type="checkbox" onClick={pushSchedule}/>
          <label htmlFor="a21b24">밤 (9시 - 12시)</label>
          </li>
        <li>
          <input id="a24" type="checkbox" onClick={pushSchedule}/>
          <label htmlFor="a24">새벽 (12시 - 2시)</label>
          </li>
      </Times>
      {
        scheduleList.map((time:string, i:any) => (
          <li key={i} onClick={()=>removeSchedule(time)}>{time}</li>
        ))
      }
      <Hr/>
      <SelectedTimes>
        <Headline>
          <Title>선택한 모든 일정</Title>
        </Headline>
      </SelectedTimes>
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


const Section = styled.section`
  padding: 24px 0; 
`

function PaymentSection({itemInfo}: any){
  const OrderInfo = styled.div`
    display: flex;
    align-items: flex-start;
    margin-top: 39px;
  `;
  const ItemImg = styled.img`
  width: 172px;
  height: 96px;
  border-radius: 10px;
`
const OrderInfoText = styled.div`
  margin-left: 36px;
`;
const ItemTitle = styled.h3`
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  margin-bottom: 10px;
`;
const Type = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: ${Colors.primary};
`

const PriceInfo = styled.dl`
  display: flex;
  flex-wrap: wrap;
  font-size: 16px;
  line-height: 40px;
  margin-top: 26px;
  margin-bottom: -10px;

  dt {
    width: 200px;
  }
  dd {
    width: calc(100% - 200px);
    text-align: right;
    font-weight: 500;
  }
  .finalPrice {
    color: ${Colors.primary};
    font-weight: 500;
  }
`;

  return (
    <>
    <Section>
      <Headline>
        <Title>주문 정보</Title>
        <Desc>주문 정보를 다시 한번 확인해주세요.</Desc>
      </Headline>
      <OrderInfo>
        <ItemImg src={`/detail/${itemInfo.itemId}/thumb.png`}/>
        <OrderInfoText>
          <ItemTitle>{itemInfo.itemName}</ItemTitle>
          {
            itemInfo.option.type === "workbook" ?
            <Type>[워크북] 업무에 활용했던 자료들입니다.</Type> :
            <Type>[코칭] {itemInfo.option.title}</Type>
          }
        </OrderInfoText>
      </OrderInfo>
    </Section>
    <Hr/>
    <Section>
      <Headline>
        <Title>결제 정보</Title>
      </Headline>
      <PriceInfo>
        <dt>상품 금액</dt>
        <dd>{priceFormat(itemInfo.option.price)}원</dd>
        <dt>할인 금액</dt>
        <dd>{priceFormat(itemInfo.option.discountPrice - itemInfo.option.price)}원</dd>
        <dt className="finalPrice">최종 결제금액</dt>
        <dd className="finalPrice">{priceFormat(itemInfo.option.discountPrice)}원</dd>
      </PriceInfo>
    </Section>
    </>
  )
}

function PaymentSectionMethod({method, setMethod, pg, setPg}: any){
const Methods = styled.div`
  display: flex;
  margin: 0 -5px;
  margin-top: 20px;
  margin-bottom: 12px;

  > button {
    flex-grow: 1;
    margin: 0 5px;
  }
`;

  return (
    <Section>
      <Headline>
        <Title>결제 수단</Title>
      </Headline>
      <Methods>
        <ToggleBtn className={method === 'card' ? 'active' : ''}
                  onClick={()=>{setPg('danal');setMethod('card');}}>카드결제</ToggleBtn>
        <ToggleBtn className={pg === 'kakao' ? 'active' : ''}
                  onClick={()=>{setPg('kakao');setMethod('easy');}}>카카오페이</ToggleBtn>
        <ToggleBtn className={pg === 'npay' ? 'active' : ''}
                  onClick={()=>{setPg('npay');setMethod('');}}>네이버페이</ToggleBtn>
      </Methods>
    </Section>
  )
}

function PaymentSectionAgree({agree, setAgree, onClickListener}: any){
const Agree = styled.div`
  font-size: 14px;
  text-align: center;
  margin-bottom: 3px;

  input[type=checkbox] {
    display: none;
  }
  input[type=checkbox] + label::before {
    content: '';
    display: inline-block;
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-right: 15px;
    border-radius: 4px;
    border: 1px solid #6E7191;
  }
  input[type=checkbox]:checked + label::before {
    border-color: ${Colors.primary};
    background: url('/icon/done_24px.svg') center/17px 13px no-repeat;
    background-color: ${Colors.primary};
  }
  input[type=checkbox] + label {
    cursor: pointer;
  }

  .highlight {
    color: ${Colors.primary};
    border-bottom: 1px ${Colors.primary} solid;
    cursor: pointer;
  }
`;

  return (
    <Section style={{paddingTop: '14px'}}>
      <Agree>
        <input id="ag" type="checkbox" onClick={()=>setAgree(!agree)} checked={agree} />
        <label htmlFor="ag">주문 내용을 확인하였으며, <label className="highlight" onClick={onClickListener}>서비스 취소/환불 정책</label> 및 결제에 동의합니다. (필수)</label>
      </Agree>
    </Section>
  )
}
