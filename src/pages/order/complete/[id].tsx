import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import styled from "@emotion/styled";
import { Layout } from "components/layout";
import { Heading, Colors } from "components/ui";
import { withRouter } from 'next/router';
import { priceFormat } from "components/formatter";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const optionId = context.query.id;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pay/complete/${optionId}`);
  const data = await res.json();

  if (!data.order_receipts) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data: data.order_receipts },
  }
}

function OrderComplete({data}: InferGetServerSidePropsType<typeof getServerSideProps>){
  const { itemInfo, orderId, paymentInfo } = data;
  const { itemId, itemName, option } = itemInfo;
  const { method, cardName, purchasedTime } = paymentInfo;

  const type:{[key: string]: string} = {
    "workbook": "워크북",
    "coaching": "코칭",
    "both": "코칭 & 워크북"
  }
  
  return (
    <Layout noFooter>
      <Bg>
        <Container>
          <Heading level={3}>결제가 완료되었습니다.</Heading>
          <hr/>

          <Section>
            <Heading level={5}>주문 정보</Heading>
            <Flex style={{alignItems: 'flex-end', marginTop: '20px'}}>
              <Img src={`/detail/${itemId}/thumb.png`}/>
              <OrderInfoText>
                <Title>{itemName}</Title>
                <Type>[{type[option.type]}] {option.type === "coaching" ? option.title : "업무에 활용했던 자료들입니다."}</Type>
              </OrderInfoText>
            </Flex>
            {/* <DLBtn>워크북 자료 받기</DLBtn> */}
          </Section>
          <hr/>
          <Section>
            <Heading level={5}>구매 내역</Heading>
            <Flex style={{justifyContent: 'space-between', marginTop: '20px'}}>
              <label>결제 정보</label>
              <Payresult>
                <dt>주문번호</dt>
                <dd>{orderId}</dd>
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
            </Flex>
          </Section>
          <hr/>
          <Noti>
          · 어드바이스트는 통신판매중개업자이며 통신판매의 당사자가 아닙니다. 따라서 어드바이스트는 상품, 거래정보 및 거래에 대하여 책임을 지지 않습니다.<br/>· 구매주문내역 확인과 워크북 다운로드는 사이트 상단의 내 구매내역에서 하실 수 있습니다.<br/>· 워크북은 전자문서 특성상 교환이나 환불이 불가합니다.
          </Noti>
        </Container>
      </Bg>
    </Layout>
  )
}
export default withRouter(OrderComplete);

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
  min-height: calc(100vh - 156px);
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

const Payresult = styled.dl`
  display: flex;
  flex-wrap: wrap;
  width: calc(100% - 108px);

  dt, dd {
    margin-bottom: 13px;
    font-size: 16px;
  }

  dt {
    width: 93px;
    color: #7B7B7B;
  }
  dd {
    width: calc(100% - 93px);
    color: #737373;
  }
`;

const Noti = styled.p`
  font-size: 12px;
  line-height: 145.3%;
  letter-spacing: -0.02em;
  color: #3D3D3D;

  margin-bottom: 20px;
`;