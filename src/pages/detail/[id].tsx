import React, { useState, useEffect, useRef } from "react";
import { Layout } from "components/layout";
import styled from "@emotion/styled";
import Image from 'next/image';
import { Heading, Tags, Button, Colors, Box, Text } from "components/ui";
import { LikeBtn } from "components/like-button";
import { Price } from "components/price";
import axios from 'axios';
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

  // Tab Control
  const [activeTab, setActiveTab] = useState<string>('wrkb');
  const workbookSectionRef = useRef<HTMLDivElement>(null);
  const coachingSectionRef = useRef<HTMLDivElement>(null);
  const reviewSectionRef = useRef<HTMLDivElement>(null);
  const askSectionRef = useRef<HTMLDivElement>(null);
  const tabHeight:number = 161; //109 + 52
  useEffect(() => {
    const handleScroll = () => {
      if(workbookSectionRef.current && coachingSectionRef.current && reviewSectionRef.current) { // && askSectionRef.current
        const onWorkbookSection = window.scrollY+tabHeight < coachingSectionRef.current.offsetTop;
        const onCoachingSection = window.scrollY+tabHeight >= coachingSectionRef.current.offsetTop && window.scrollY+tabHeight < reviewSectionRef.current.offsetTop;
        const onReviewSection = window.scrollY+tabHeight >= reviewSectionRef.current.offsetTop; //&& window.scrollY+tabHeight < askSectionRef.current.offsetTop
        // const onAskSection = window.scrollY+tabHeight >= askSectionRef.current.offsetTop;

        if(onWorkbookSection){
          setActiveTab('wrkb');
        }
        else if(onCoachingSection){
          setActiveTab('ch');
        }
        else if(onReviewSection){
          setActiveTab('rv');
        }
        // else if(onAskSection){
        //   setActiveTab('ask');
        // }
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
            <div>{/* 로그인 안된 상태ㅐ에서 찜하기 버튼 눌렀을 때 케이스 */}
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
                          //  ask: { sectionRef: 'ask' }
                        }}
                  active={activeTab}/>
      <DetailInfo className="wrap">
        <DetailContent>
          <section ref={workbookSectionRef}><ContentTemplate type="workbook" img="/detail/1.png"/></section>
          <section ref={coachingSectionRef}><ContentTemplate type="coach" img="/detail/2.png"/></section>
          <section ref={reviewSectionRef}><ContentTemplate type="review" img="/detail/3.png"/></section>
          {/* <section ref={askSectionRef}>
            <Box shadow={1} style={{height: '700px', background: '#FCFCFC'}}>문의 섹션</Box>
          </section> */}
        </DetailContent>
        <div>
          옵션들
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
  padding-top: 68px;
  padding-bottom: 157px;
  display: flex;
`;

const DetailContent = styled.div`

  flex-basis: 832px;
`;

function SectionTitle({icon, children}: any) {
  const Wrap = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 40px;
  `;
  return  (
    <Wrap>
      <img src={icon} style={{marginRight: '7px'}}/>
      <Text size="20px" bold>{children}</Text>
    </Wrap>
  )
}

interface IContentTemplateTypes {
  type: string;
  img: string;
};
const ContentTemplate = React.memo(function WorkbookContent({type, img}: IContentTemplateTypes) {
  const typeStyles:{[key: string]: any} = {
    "workbook": {
      icon: "/icon/workbook_64p.svg",
      message: "워크북으로 다양한 템플릿을 참고해봐요.",
      padding: "64px 64px 64px 52px"
    },
    "coach": {
      icon: "/icon/coach_64p.svg",
      message: "코칭으로 더욱 자세한 가이드라인을 받아보세요.",
      padding: "64px 64px 64px 52px"
    },
    "review": {
      icon: "/icon/review_64p.svg",
      message: "교육 후기",
      padding: "45px 64px 16px 37px"
    }
  }

  console.log(type + " 렌더링");
  return (
    <>
      <SectionTitle icon={typeStyles[type].icon}>
        {typeStyles[type].message}
      </SectionTitle>
      <Box shadow={1} round style={{padding: `${typeStyles[type].padding}`, background: '#FCFCFC', marginBottom: '52px'}}>
        <img
          src={img}
          alt=""
          style={{width: '100%'}}
        />
      </Box>
    </>
  )
});