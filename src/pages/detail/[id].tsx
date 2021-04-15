import { Layout } from "components/layout";
import styled from "@emotion/styled";
import Image from 'next/image';
import { Heading, Tags, Button, Colors } from "components/ui";
import { LikeBtn } from "components/like-button";
import { Price } from "components/price";
import axios from 'axios';
import { useRouter } from 'next/router';
import { queryFormat } from 'components/formatter';
import React, { useState } from 'react'

// virtualData
// 상품정보 api의 결과값
const vData = { 
  _id: 'asdf1234',
  img: '/test.jpg',
  title: "새 회사, 직무에 빠르게 적응하고 싶은 신입사원을 위한 업무 관리 워크북",
  tag: ['고구마', '감자', '옥수수'],
  price: 50000,
  discountPrice : 20000
}

export default function Details() {
  const router = useRouter();
  const [OrderIds, setOrderIds] = useState<Number>(); // query로 넘길 orderId
  const [OrderPage, setOrderPage] = useState(false); // 비동기처리 해결위해 선언
  const [QueryData, setQueryData] = useState<any>();

  async function getOrderData(){
    const result = await axios.get(`https://advist.herokuapp.com/pay/checkorder/2?itemId=3&optionId=1`)
      console.log(result.data);
      setQueryData(result.data.order_receipts);
      console.log('orderId :' + (result.data.order_receipts.orderId));
      setOrderIds(result.data.order_receipts.orderId);
      setOrderPage(true);
  }
  if(OrderPage){
    console.log(OrderIds);
    router.push({
      pathname: `${process.env.NEXT_PUBLIC_ORDER_PAGE_URL}`,
      query: queryFormat(QueryData),
    }, '/order');
  }


  return (
    <Layout>
      <ProductInfo className="wrap">
        <div className="leftArea">
          <Image
            src={vData.img}
            alt=""
            width={645}
            height={363}
          />
        </div>
        <div className="rightArea">
          <DefaultInfo>
            <Heading level={4} bold>{vData.title}</Heading>
            <Tags data={vData.tag}/>
            <p>제공자 : Tim</p>
          </DefaultInfo>
          <FunctionsAndPriceInfo>
            <div>
              <LikeBtn state={false} />
            </div>
            <div className="rightArea">
              <Price discountPrice={vData.discountPrice} price={vData.price} />
              <a onClick={getOrderData}><Button type="start">구매하기</Button></a>
              {/* 보유중 상태가 필요하겠네요 */}
            </div>
          </FunctionsAndPriceInfo>
        </div>
      </ProductInfo>
      <DetailInfo>
        <div className="wrap">
          상세 내용 들어갈 예정
        </div>
      </DetailInfo>
    </Layout>
  )
}

const ProductInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 56px;

  > .leftArea {
    flex-basis: 645px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0px 8px 16px rgba(17, 17, 17, 0.06);

    > div {
      display: block !important;
    }
  }
  > .rightArea {
    align-self: normal;
    margin-left: 100px;
    flex-grow: 1;
    max-width: 555px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const DefaultInfo = styled.div``;

const FunctionsAndPriceInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  > .rightArea {
    text-align: right;
  }

  button {
    margin-top: 32px;
  }
`;

const DetailInfo = styled.div`
  background-color: ${Colors.gray6};
  margin-top: 93px;
  padding: 68px 0 209px;
`;

