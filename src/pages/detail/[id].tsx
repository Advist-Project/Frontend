import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React, { useState, useEffect, useRef, useContext } from "react";
import { Layout } from "components/layout";
import styled from "@emotion/styled";
import Image from 'next/image';
import { min, MobilePrimaryBtn, Heading, Tags, Button, Colors, Text, Box, Buying } from "components/ui";
import { LikeBtn } from "components/like-button";
import { Price } from "components/price";
import AnchorTab from 'components/tab';
import { ContentTemplate, AskContentTemplate } from "components/detail-content-template";
import { useRouter } from 'next/router';
import { myContext } from "context";
import { User } from 'types/logintypes';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const itemId = context.query.id;
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL as string +`/item/${itemId}`);
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

  function routeToOrder(userId: any, itemId: any, optionId: any, type: string){
    if(type === 'workbook'){
        router.push({
        pathname: '/receipt',
        query: {userId: userId, itemId: itemId, optionId: optionId},
      }, '/order');
    } else {
      router.push({
        pathname: '/order/coaching',
        query: {userId: userId, itemId: itemId, optionId: optionId},
      }, '/order');
    }
  }

  // Tab Control
  const [activeTab, setActiveTab] = useState<string>('workbook');
  const DetailInfoContainerRef = useRef<HTMLDivElement>(null);
  // const workbookSectionRef = useRef<HTMLDivElement>(null);
  const coachingSectionRef = useRef<HTMLDivElement>(null);
  // const reviewSectionRef = useRef<HTMLDivElement>(null);
  const askSectionRef = useRef<HTMLDivElement>(null);
  const tabHeight:number = 161; //109 + 52

  const userObject = useContext(myContext) as User;

  function onClickListener(){
    // 비로그인 || 로그인 api 받기 전에 클릭할 경우 경고
  //  userObject? routeToOrder(userObject.userId, itemId, 1, options[0].type) : alert('로그인이 필요합니다.\n (로그인 상태라면 버튼을 다시 클릭해주세요.)');
  userObject? routeToOrder(userObject.userId, itemId, 1, options[0].type) : routeToOrder(1, itemId, 1, options[0].type)
  }
  
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
  
  const [optionPanel, setOptionPanel] = useState<boolean>(false);

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
            <ItemTitle>{title}</ItemTitle>
            <Tags data={tag}/>
          </DefaultInfo>
          <FunctionsAndPriceInfo>
            <div className="likeBtn">{/* 로그인 안된 상태에서 찜하기 버튼 눌렀을 때 케이스 */}
              <LikeBtn state={false} />
            </div>
            <div className="rightArea">
              <Price discountPrice={options[0].discountPrice} price={options[0].price} />
              <a onClick={onClickListener} className="buyBtn"><Button type="start">구매하기</Button></a>
              {/* 보유중 상태가 필요하겠네요 */}
            </div>
          </FunctionsAndPriceInfo>
        </div>
      </ProductInfo>
      <MobileFloatingBtn>
        <OptionPanel className={optionPanel ? 'visible' : ''}>
          옵션
        </OptionPanel>
        <div className="btnWrap">
          <LikeBtn state={false} small border />
          <MobileBuyBtn onClick={()=>setOptionPanel(true)}>구매하기</MobileBuyBtn>
        </div>
      </MobileFloatingBtn>
      <CoachProfile className="wrap">
          <img src={`/detail/${itemId}/coach.png`} className="img_pc"/>
          <img src={`/detail/${itemId}/coach_mobile.png`} className="img_mo"/>
      </CoachProfile>
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
              <AskContentTemplate />
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
  margin-top: 12px;
  margin-bottom: 16px;

  .leftArea {
    margin-bottom: 28px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 8px 16px rgba(17, 17, 17, 0.06);
  }
  

  ${min[1]}{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 56px;
    margin-bottom: 93px;

    .leftArea {
      flex-basis: 645px;
      border-radius: 20px;
      margin-bottom: 0;
      
      > div {
        display: block !important;
      }
    }

    .rightArea {
      align-self: normal;
      margin-left: 100px;
      flex-grow: 1;
      max-width: 555px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
`;

const DefaultInfo = styled.div`
  font-size: 0.75rem;
  margin-bottom: 43px;
`;
const ItemTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 133%;
  margin-bottom: 21px;

  ${min[1]}{
    margin-bottom: 27px;
  }
`;

const FunctionsAndPriceInfo = styled.div`
  .likeBtn, .buyBtn { display: none; }

  ${min[1]} {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    > .rightArea {
      text-align: right;
    }

    button {
      margin-top: 32px;
    }
    .likeBtn { display: block; }
    .buyBtn { display: inline; }
  }
`;

const MobileFloatingBtn = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 20;
  width: 100%;

  .btnWrap {
    display: flex;
    padding: 18px 20px;
    background: ${Colors.white};
    box-shadow: 0px -4px 8px rgba(0, 0, 0, 0.08);
  }

  ${min[1]}{
    display: none;
  }
`;

const MobileBuyBtn = styled.button`
  ${MobilePrimaryBtn}

  flex-grow: 1;
  height: 36px;
  margin-left: 4px;
`;

const OptionPanel = styled.div`
  display: none;
  width: 100%;
  position: absolute;
  top: -57px;
  left: 0;
  z-index: -1;
  padding: 20px;

  background: ${Colors.white};
  border: 1px solid ${Colors.black};
  border-width: 1px 1px 0px 1px;
  border-radius: 10px 10px 0px 0px;

  &.visible {
    display: block;
  }
`;

const CoachProfile = styled.div`
  border-top: 4px ${Colors.gray4} solid;
  padding-top: 16px;

  img {
    width: 100%;
  }
  .img_pc {
    display: none;
  }

  ${min[1]}{
    border: 1px ${Colors.black} solid;
    border-radius: 20px;
    box-shadow: 0px 8px 16px rgba(17, 17, 17, 0.06);
    padding: 40px 72px;
    margin-bottom: 72px;

    .img_mo {
      display: none;
    }
    .img_pc {
      display: inline;
    }
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
  display: none;

  ${min[1]}{
    display: block;
    position: sticky;
    top: 0;
    right: 0;
    padding-left: 40px;
  }
`;
const SectionTitle = styled.div`
  margin-top: 69px;
  margin-bottom: 56px;
`;