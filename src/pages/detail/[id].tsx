import React, { useState, useEffect, useRef } from "react";
import { Layout } from "components/layout";
import styled from "@emotion/styled";
import Image from 'next/image';
import { Heading, Tags, Button, Colors, Text, Box } from "components/ui";
import { LikeBtn } from "components/like-button";
import { Price } from "components/price";
import axios from 'axios';
import { useRouter } from 'next/router';
import { queryFormat } from 'components/formatter';
<<<<<<< HEAD
import React, { useState } from 'react'
=======
import AnchorTab from 'components/tab';
import { ContentTemplate } from "components/detail-content-template";
import { BuyingList } from "components/buying-card-list";

>>>>>>> origin/develop

// virtualData
// 상품정보 api의 결과값
const vData = { 
  _id: 'asdf1234',
  img: '/test.jpg',
  title: "새 회사, 직무에 빠르게 적응하고 싶은 신입사원을 위한 업무 관리 워크북",
  tag: ['고구마', '감자', '옥수수'],
<<<<<<< HEAD
  price: 50000,
  discountPrice : 20000
=======
  "options" : [
    {
        "optionId" : 1,
        "title" : "새 회사, 직무에 빠르게 적응하는 신입사원의 업무 관리 워크북",
        "type" : "workbook",
        "desc" : "상품 설명을 짧게 적습니다(최대 60자)상품 설명을 짧게 적습니다(최대 60자)상품 설명을 짧게 적습니다",
        "price" : 50000, //상품 원가격,
        "discountPrice" : 20000 //할인된 가격을 계산한 값
    },
    {
      "optionId" : 2,
      "title" : "워크북 작성 1:1 코칭(1회)",
      "type" : "coach",
      "desc" : "상품 설명을 짧게 적습니다(최대 60자)상품 설명을 짧게 적습니다(최대 60자)상품 설명을 짧게 적습니다",
      "price" : 50000, //상품 원가격,
      "discountPrice" : 20000 //할인된 가격을 계산한 값
  }
  ]
>>>>>>> origin/develop
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

<<<<<<< HEAD
=======
  // Tab Control
  const [activeTab, setActiveTab] = useState<string>('workbook');
  const DetailInfoContainerRef = useRef<HTMLDivElement>(null);
  const workbookSectionRef = useRef<HTMLDivElement>(null);
  const coachingSectionRef = useRef<HTMLDivElement>(null);
  const reviewSectionRef = useRef<HTMLDivElement>(null);
  // const askSectionRef = useRef<HTMLDivElement>(null);
 
  const tabHeight:number = 161; //109 + 52
  useEffect(() => {
    const handleScroll = () => {
      if(DetailInfoContainerRef.current && workbookSectionRef.current && coachingSectionRef.current && reviewSectionRef.current) { // && askSectionRef.current
        const parentOffsetTop = DetailInfoContainerRef.current.offsetTop;

        const onWorkbookSection = window.scrollY+tabHeight < coachingSectionRef.current.offsetTop + parentOffsetTop;
        const onCoachingSection = window.scrollY+tabHeight >= coachingSectionRef.current.offsetTop + parentOffsetTop && window.scrollY+tabHeight < reviewSectionRef.current.offsetTop + parentOffsetTop;
        const onReviewSection = window.scrollY+tabHeight >= reviewSectionRef.current.offsetTop + parentOffsetTop; //&& window.scrollY+tabHeight < askSectionRef.current.offsetTop
        // const onAskSection = window.scrollY+tabHeight >= askSectionRef.current.offsetTop;

        if(onWorkbookSection){
          setActiveTab('workbook');
        }
        else if(onCoachingSection){
          setActiveTab('coaching');
        }
        else if(onReviewSection){
          setActiveTab('review');
        }
        // else if(onAskSection){
        //   setActiveTab('ask');
        // }
      }
    };
    window.addEventListener('scroll', handleScroll);
  },[]);


  function scrollCotroll(target: string){
    const ref:{[key: string]: any} = {
      "workbook": workbookSectionRef,
      "coaching": coachingSectionRef,
      "review": reviewSectionRef
      // "ask": askSectionRef
    }
    const y:number = ref[target].current.offsetParent.offsetTop + ref[target].current.offsetTop - tabHeight + 1;
    window.scrollTo(0, y);
  }
  
>>>>>>> origin/develop

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
            <div>{/* 로그인 안된 상태ㅐ에서 찜하기 버튼 눌렀을 때 케이스 */}
              <LikeBtn state={false} />
            </div>
            <div className="rightArea">
              <Price discountPrice={vData.options[0].discountPrice} price={vData.options[0].price} />
              <a onClick={getOrderData}><Button type="start">구매하기</Button></a>
              {/* 보유중 상태가 필요하겠네요 */}
            </div>
          </FunctionsAndPriceInfo>
        </div>
      </ProductInfo>
      <div className="wrap">
        <Box border={1} shadow={1} round style={{padding: '40px 72px', marginBottom: '72px'}}>
          <img src="/detail/coach_1.png" style={{width: '100%'}}
               alt="안녕하세요. HR/조직문화 분야에서 실무 코치로 활동하고 있는 Tim입니다. 저는 대기업과 스타트업의 HR 실무자로 근무하면서 크고 작은 직원 행사부터 전사 차원의 조직문화 개선 프로젝트까지 다양한 실무들을 경험했어요. 고객사 조직문화 컨설팅 프로젝트를 수행하면서 생긴 유용한 실무 팁과 노하우들을 바탕으로 현재 재직 중이신 회사의 조직문화 진단 프로젝트를 성공적으로 마무리하실 수 있도록 도와드릴게요. 주요 경력 및 이력: 전 프딩 HR Manager, 전 삼성전자 인재개발 HRD Professional, 전 KT 미래사업팀. 진행 프로젝트: 2019 삼성전자 조직문화행사, HR 컨설팅"/>
        </Box>
      </div>
      <AnchorTab create={{ workbook: { sectionRef: 'workbook' },
                           coaching: { sectionRef: 'coaching' },
                           review: { sectionRef: 'review' },
                          //  ask: { sectionRef: 'ask' }
                        }}
                  active={activeTab}
                  scrollfn={scrollCotroll}/>
      <DetailInfo>
        <DetailInfoContainer className="wrap" ref={DetailInfoContainerRef}>
          <DetailContent>
            <section ref={workbookSectionRef}><ContentTemplate type="workbook" img="/detail/1.png"/></section>
            <section ref={coachingSectionRef}><ContentTemplate type="coach" img="/detail/2.png"/></section>
            <section ref={reviewSectionRef}><ContentTemplate type="review" img="/detail/3.png"/></section>
            {/* <section ref={askSectionRef}>
              <Box shadow={1} style={{height: '700px', background: '#FCFCFC'}}>문의 섹션</Box>
            </section> */}
          </DetailContent>
          <Options>
            <SectionTitle>
              <Text size="20px" bold>상품 옵션</Text>
            </SectionTitle>
            <BuyingList data={vData.options} />
          </Options>
        </DetailInfoContainer>
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
  padding-top: 9px;
  padding-bottom: 209px;
`;
const DetailInfoContainer = styled.div`
  display: flex;
  align-items: flex-start;
  position: relative;
`;
const DetailContent = styled.div`
  flex-basis: 832px;
`;

const Options = styled.div`
  position: sticky;
  top: 0;
  right: 0;
  padding-left: 40px;
`;
const SectionTitle = styled.div`
  margin-top: 69px;
  margin-bottom: 56px;
`;