import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React, { useState, useEffect, useRef } from "react";
import { Layout } from "components/layout";
import styled from "@emotion/styled";
import Image from 'next/image';
import { Heading, Tags, Button, Colors, Text, Box, Buying } from "components/ui";
import { LikeBtn } from "components/like-button";
import { Price } from "components/price";
import AnchorTab from 'components/tab';
import { ContentTemplate } from "components/detail-content-template";
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const itemId = context.query.id;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/item/${itemId}`);
  const data = await res.json();

  if (!data.item) {
    return {
      notFound: true,
    }
  }

  return {
    props: { itemData: data.item },
  }
}
export default function Details({itemData}: InferGetServerSidePropsType<typeof getServerSideProps>){
  const { itemId, title, owner, tag, options } = itemData;
  const router = useRouter();

  function routeToOrder(userId: any, itemId: any, optionId: any){
    router.push({
      pathname: `${process.env.NEXT_PUBLIC_ORDER_PAGE_URL}`,
      query: {userId: userId, itemId: itemId, optionId: optionId},
    }, '/order');
  }

  // Tab Control
  const [activeTab, setActiveTab] = useState<string>('workbook');
  const DetailInfoContainerRef = useRef<HTMLDivElement>(null);
  // const workbookSectionRef = useRef<HTMLDivElement>(null);
  const coachingSectionRef = useRef<HTMLDivElement>(null);
  // const reviewSectionRef = useRef<HTMLDivElement>(null);
  const askSectionRef = useRef<HTMLDivElement>(null);
 
  const tabHeight:number = 161; //109 + 52
  useEffect(() => {
    const handleScroll = () => {
      if(DetailInfoContainerRef.current && coachingSectionRef.current && askSectionRef.current) {
        const parentOffsetTop = DetailInfoContainerRef.current.offsetTop;

        // const onWorkbookSection = window.scrollY+tabHeight < coachingSectionRef.current.offsetTop + parentOffsetTop;
        const onCoachingSection = window.scrollY+tabHeight < askSectionRef.current.offsetTop + parentOffsetTop;
        // const onCoachingSection = window.scrollY+tabHeight >= coachingSectionRef.current.offsetTop + parentOffsetTop && window.scrollY+tabHeight < askSectionRef.current.offsetTop + parentOffsetTop;
        // const onReviewSection = window.scrollY+tabHeight >= reviewSectionRef.current.offsetTop + parentOffsetTop && window.scrollY+tabHeight < askSectionRef.current.offsetTop;
        const onAskSection = window.scrollY+tabHeight >= askSectionRef.current.offsetTop;

        if(false){
          setActiveTab('workbook');
        }
        else if(onCoachingSection){
          setActiveTab('coaching');
        }
        else if(false){
          setActiveTab('review');
        }
        else if(onAskSection){
          setActiveTab('ask');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
  },[]);


  function windowScroll(target: string){
    const ref:{[key: string]: any} = {
      // "workbook": workbookSectionRef,
      "coaching": coachingSectionRef,
      // "review": reviewSectionRef,
      "ask": askSectionRef
    }
    const y:number = ref[target].current.offsetParent.offsetTop + ref[target].current.offsetTop - tabHeight + 1;
    window.scrollTo(0, y);
  }
  

  return (
    <Layout title={title}>
      <ProductInfo className="wrap">
        <div className="leftArea">
          <Image
            src={`/detail/${itemId}/thumb.png`}
            alt=""
            width={645}
            height={363}
            priority
          />
        </div>
        <div className="rightArea">
          <DefaultInfo>
            <Heading level={4} bold style={{marginBottom: '27px'}}>{title}</Heading>
            <Tags data={tag}/>
            <p style={{marginTop: '36px'}}>제공자 : {owner}</p>
          </DefaultInfo>
          <FunctionsAndPriceInfo>
            <div>{/* 로그인 안된 상태에서 찜하기 버튼 눌렀을 때 케이스 */}
              <LikeBtn state={false} />
            </div>
            <div className="rightArea">
              <Price discountPrice={options[0].discountPrice} price={options[0].price} />
              <a onClick={()=>routeToOrder(1, itemId, 1)}><Button type="start">구매하기</Button></a>
              {/* 보유중 상태가 필요하겠네요 */}
            </div>
          </FunctionsAndPriceInfo>
        </div>
      </ProductInfo>
      <div className="wrap">
        <Box border={1} shadow={1} round style={{padding: '40px 72px', marginBottom: '72px'}}>
          <img src={`/detail/${itemId}/coach.png`} style={{width: '100%'}}/>
        </Box>
      </div>
      <AnchorTab create={{
                          //  workbook: { sectionRef: 'workbook' },
                           coaching: { sectionRef: 'coaching' },
                          //  review: { sectionRef: 'review' },
                           ask: { sectionRef: 'ask' }
                        }}
                  active={activeTab}
                  scrollfn={windowScroll}/>
      <DetailInfo>
        <DetailInfoContainer className="wrap" ref={DetailInfoContainerRef}>
          <DetailContent>
            <section ref={coachingSectionRef}><ContentTemplate type="coach" img={`/detail/${itemId}/0.png`}/></section>
            {/* <section ref={workbookSectionRef}><ContentTemplate type="workbook" img="/detail/1.png"/></section> */}
            {/* <section ref={reviewSectionRef}><ContentTemplate type="review" img="/detail/3.png"/></section> */}
            <section ref={askSectionRef}>
            </section>
          </DetailContent>
          <Options>
            <SectionTitle>
              <Text size="20px" bold>상품 옵션</Text>
            </SectionTitle>
            {
              options.map((item: any) => (
                <Buying
                        type="coach"
                        key={item.optionId}
                        title={item.title}
                        price={item.price}
                        discountPrice={item.discountPrice}
                        desc={item.desc}
                        optionId={item.optionId}
                        itemId={itemId}
                        fn={routeToOrder}
                />
              ))
            }
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