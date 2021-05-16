import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import styled from "@emotion/styled";
import { Layout } from "components/layout";
import { Button, Colors } from "components/ui";
import { withRouter } from 'next/router';
import { priceFormat } from "components/formatter";
import { Step } from "components/step";
import Router from "next/router";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const optionId = context.query.id;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pay/complete/${optionId}`);
  const data = await res.json();

  if (!data.order_receipts || !data.order_receipts.paymentInfo) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data: data.order_receipts },
  }
}

function OrderComplete({data}: InferGetServerSidePropsType<typeof getServerSideProps>){
  const { itemInfo, customerOrderId, paymentInfo, userEmail, userName, userPhone } = data;
  const { itemId, itemName, option } = itemInfo;
  const { method, cardName, purchasedTime } = paymentInfo;

  console.log(data);

  const type:{[key: string]: string} = {
    "workbook": "워크북",
    "coaching": "코칭",
    "both": "코칭 & 워크북"
  }
  
  return (
    <Layout noFooter>
      <Wrap>
        {
          option.type !== 'workbook'
          ? <Step active={4} labels={["스케줄 선택", "개인정보 입력", "결제하기", "결제 완료"]}/>
          : <Step active={2} labels={["결제하기", "결제 완료"]}/>
        }
        <Container>
          {
            option.type !== 'workbook'
            ? (
              <>
              <Headline>
                <Title>결제가 완료되었습니다.</Title>
                <Desc>담당 매니저가 코치님과 일정 조율을 위해 아래 연락처로 상세 안내드리겠습니다.</Desc>
              </Headline>

              <OrdererInfo>
                <dt>성함</dt>
                <dd>{userName}</dd>
                <dt>연락처</dt>
                <dd>{userPhone}</dd>
                <dt>메일</dt>
                <dd>{userEmail}</dd>
              </OrdererInfo>
              <Hr style={{marginBottom: '24px'}}/>
              </>
            ) : null
          }
          
          <section>
            <Headline>
              <Title>구매 내역</Title>
            </Headline>

            <OrderInfo>
              <ItemImg src={`/detail/${itemId}/thumb.png`}/>
              <OrderInfoText>
                <ItemTitle>{itemName}</ItemTitle>
                <Type>[{type[option.type]}] {option.type === "coaching" ? option.title : "업무에 활용했던 자료들입니다."}</Type>
              </OrderInfoText>
            </OrderInfo>
            <Payresult>
              <dt>주문번호</dt>
              <dd>{customerOrderId}</dd>
              <dt>구매상품</dt>
              <dd>{itemName}</dd>
              <dt>구매옵션</dt>
              <dd>[{type[option.type]}] {option.title}</dd>
              <dt>결제수단</dt>
              <dd>{method ? method : ""}{method && cardName ? " - " : ""}{cardName ? cardName : ""}</dd>
              <dt>결제일시</dt>
              <dd>{purchasedTime}</dd>
              <dt>결제금액</dt>
              <dd>{priceFormat(option.discountPrice)}원</dd>
            </Payresult>
          </section>
          <Noti>
          - 어드바이스트는 통신판매중개업자이며 통신판매의 당사자가 아닙니다. 따라서 어드바이스트는 상품, 거래정보 및 거래에 대하여 책임을 지지 않습니다.<br/>- 구매주문내역 확인과 워크북 다운로드는 사이트 상단의 내 구매내역에서 하실 수 있습니다.<br/>- 워크북은 전자문서 특성상 교환이나 환불이 불가합니다.
          </Noti>
        </Container>
        <Buttons>
          <Button type="secondary">다른 상품 보기</Button>
          <Button type="start" onClick={()=>Router.push(`/mypage`)}>내 구매내역 보기</Button>
        </Buttons>
      </Wrap>
    </Layout>
  )
}
export default withRouter(OrderComplete);

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
const Hr = styled.hr`
  border: 0px;
  border-bottom: 1px ${Colors.gray3} solid;
  margin: 0;
`;

const Headline = styled.div``;
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
  font-weight: 500;
  word-break: keep-all;
  color: ${Colors.primary};
  margin-top: 14px;
`

const OrdererInfo = styled.dl`
  display: flex;
  flex-wrap: wrap;
  margin-top: 46px;

  dt, dd {
    margin-bottom: 24px;
    font-size: 16px;
    font-weight: 500;
  }

  dt {
    width: 60px;
    color: ${Colors.gray3};
  }
  dd {
    width: calc(100% - 60px);
    color: ${Colors.gray2};
  }
`;

const OrderInfo = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 24px;
`;
const ItemImg = styled.img`
  width: 172px;
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

const Payresult = styled.dl`
  display: flex;
  flex-wrap: wrap;
  margin-top: 36px;

  dt, dd {
    margin-bottom: 24px;
    font-size: 16px;
    font-weight: 500;
  }

  dt {
    width: 80px;
    color: ${Colors.gray3};
  }
  dd {
    width: calc(100% - 80px);
    color: ${Colors.gray2};
  }
`;

const Noti = styled.p`
  font-size: 12px;
  line-height: 150%;
  letter-spacing: -0.02em;
  color: ${Colors.gray2};
  margin-top: 4px;
  margin-bottom: 24px;
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