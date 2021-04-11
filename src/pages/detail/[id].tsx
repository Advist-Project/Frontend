import React, { useState, useEffect, useRef } from "react";
import { Layout } from "components/layout";
import styled from "@emotion/styled";
import Image from 'next/image';
import { Heading, Tags, Button, Colors, Box } from "components/ui";
import { LikeBtn } from "components/like-button";
import { Price } from "components/price";
// import axios from 'axios';
import { useRouter } from 'next/router';
import { queryFormat } from 'components/formatter';
import AnchorTab from 'components/tab';


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
const vData2 = {
  "_id" : "String",
  "orderId" : "seq(increase)",
  "userId" : "kildong",
  "useremail" : "kildong@naver.com",
  "itemInfo" : [{
      "itemId" : "Int",
      "itemImg" : "String",
      "itemName" : "새 회사, 직무에 빠르게 적응하고 싶은 신입사원을 위한 업무 관리",
      "itemOwner" : "String",
      "option" : [{
            "optionId" : "Int",
            "title" : "워크북",
            "type" : "workbook",
            "desc" : "String",
            "price" : 50000,
            "deleteYN" : "Boolean",
            "discountPrice" : 20000
           }]
  }],
  "deleteYN" : "Boolean",
}

export default function Details() {
  const router = useRouter();
  function getOrderData(){
    // const res = await axios.get(`${process.env.NEXT_PUBLIC_ORDER_API_URL}/2`);
    // const data = await res.data;
  
    router.push({
      pathname: `${process.env.NEXT_PUBLIC_ORDER_PAGE_URL}`,
      query: queryFormat(vData2),
    }, '/order');
  }

  // Tab Control
  const [activeTab, setActiveTab] = useState<string>('wrkb');
  const workbookSectionRef = useRef<HTMLDivElement>(null);
  const coachingSectionRef = useRef<HTMLDivElement>(null);
  const reviewSectionRef = useRef<HTMLDivElement>(null);
  const askSectionRef = useRef<HTMLDivElement>(null);
  const tabHeight:number = 208; //110 + 156/2
  useEffect(() => {
    const handleScroll = () => {
      if(workbookSectionRef.current && coachingSectionRef.current && reviewSectionRef.current && askSectionRef.current) {
        const onWorkbookSection = window.scrollY+tabHeight < coachingSectionRef.current.offsetTop;
        const onCoachingSection = window.scrollY+tabHeight >= coachingSectionRef.current.offsetTop && window.scrollY+tabHeight < reviewSectionRef.current.offsetTop;
        const onReviewSection = window.scrollY+tabHeight >= reviewSectionRef.current.offsetTop && window.scrollY+tabHeight < askSectionRef.current.offsetTop;
        const onAskSection = window.scrollY+tabHeight >= askSectionRef.current.offsetTop;

        if(onWorkbookSection){
          setActiveTab('wrkb');
        }
        else if(onCoachingSection){
          setActiveTab('ch');
        }
        else if(onReviewSection){
          setActiveTab('rv');
        }
        else if(onAskSection){
          setActiveTab('ask');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
  },[]);

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
            <Heading level={4} bold style={{marginBottom: '27px'}}>{vData.title}</Heading>
            <Tags data={vData.tag}/>
            <p style={{marginTop: '36px'}}>제공자 : Tim</p>
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
      <AnchorTab create={{ workbook: { sectionRef: 'wrkb' },
                           coaching: { sectionRef: 'ch' },
                           review: { sectionRef: 'rv' },
                           ask: { sectionRef: 'ask' } }}
                  active={activeTab}/>
      <DetailInfo>
        <div className="wrap">
          <section ref={workbookSectionRef}>
            <Box shadow={1} style={{height: '700px', background: '#FCFCFC', marginBottom: '156px'}}>워크북 섹션</Box>
          </section>
          <section ref={coachingSectionRef}>
            <Box shadow={1} style={{height: '700px', background: '#FCFCFC', marginBottom: '156px'}}>코칭 섹션</Box>
          </section>
          <section ref={reviewSectionRef}>
            <Box shadow={1} style={{height: '700px', background: '#FCFCFC', marginBottom: '156px'}}>리뷰 섹션</Box>
          </section>
          <section ref={askSectionRef}>
            <Box shadow={1} style={{height: '700px', background: '#FCFCFC'}}>문의 섹션</Box>
          </section>
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
  margin-bottom: 93px;

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
  padding: 68px 0 209px;
`;