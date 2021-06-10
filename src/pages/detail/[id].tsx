import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React, { useState, useEffect, useRef, useContext } from "react";
import { Layout } from "components/layout";
import styled from "@emotion/styled";
import Image from 'next/image';
import { min, max, BtnCss, Tags, Button, Colors, Text, Buying, DimmedOnlyMobile } from "components/ui";
import { LikeBtn } from "components/like-button";
import { Price } from "components/price";
import AnchorTab from 'components/tab';
import { ContentTemplate, AskContentTemplate } from "components/detail-content-template";
import { useRouter } from 'next/router';
import { myContext } from "context";
import { User } from 'types/logintypes';
import Loader from "react-loader-spinner";
import axios, { AxiosResponse } from 'axios';

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
  const { itemId, title, tag, options } = itemData;
  const router = useRouter();

  const userObject = useContext(myContext) as User;

  const [userLikeState, setUserLikeState] = useState<boolean>(false); // 좋아요 상태
  const [RunOnce, setRunOnce] = useState<boolean>(true);

  if(userObject !== undefined && RunOnce){ // api로딩 후 처음 한 번만 실행
    // 자신이 좋아요 클릭했었던 경우 체크된 아이콘 표시
    setUserLikeState(userObject.likeItemIds.indexOf(itemId) === -1? false : true);
    setRunOnce(false);
  }

  const chageUserLikeState = () => {
    if(userLikeState){ // 좋아요 취소
      if(userObject){
        setUserLikeState(false);
        axios.get(process.env.NEXT_PUBLIC_API_URL as string + `/item/cancelheart/${userObject.userId}` + `?itemId=${itemId}`, { withCredentials: true }).then((res: AxiosResponse) => {
          if (res.data){
            //console.log(res);
          }
        }) 
      } else{
        alert('로그인이 필요합니다.');
      }      
    } else { // 좋아요
      if(userObject){
        setUserLikeState(true);
        axios.get(process.env.NEXT_PUBLIC_API_URL as string + `/item/heart/${userObject.userId}` + `?itemId=${itemId}`, { withCredentials: true }).then((res: AxiosResponse) => {
          if (res.data){
            //console.log(res);
          }
        })  
      } else{
        alert('로그인이 필요합니다.');
      }
    }
  }  

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

  

  function onClickListener(optionId: number){
    // 비로그인 || 로그인 api 받기 전에 클릭할 경우 경고
    userObject? routeToOrder(userObject.userId, itemId, optionId, options[optionId-1].type) : alert('로그인이 필요합니다.\n (로그인 상태라면 버튼을 다시 클릭해주세요.)');
  //userObject? routeToOrder(userObject.userId, itemId, optionId, options[optionId-1].type) : routeToOrder(1, itemId, optionId, options[optionId-1].type)
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
  const [selectedOption, selectOption] = useState<number>(0);
  const [buttonText, setButtonText] = useState<any>('구매하기');
  const loader = <Loader type="TailSpin" color={Colors.white} height={20} width={20} timeout={0} radius={3}/>

  function onClickListenerMobileBuyBtn(){
    if(!optionPanel){
      setOptionPanel(true);
      document.body.classList.add('dimmed_mo');
    }
    else if(selectedOption > 0){
      setButtonText(loader);
      onClickListener(selectedOption);
    }
  }
  function closeOptionPanel(){
    setOptionPanel(false);
    document.body.classList.remove('dimmed_mo');
  }

  return (
    <MobilePadding>
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
              <LikeBtn state={userLikeState} onClick={chageUserLikeState} />
            </div>
            <div className="rightArea">
              <Price discountPrice={options[0].discountPrice} price={options[0].price} />
              <a onClick={()=>onClickListener(1)} className="buyBtn"><Button type="start">구매하기</Button></a>
              {/* 보유중 상태가 필요하겠네요 */}
            </div>
          </FunctionsAndPriceInfo>
        </div>
      </ProductInfo>
      <MobileFloatingBtn>
        <OptionPanel className={optionPanel ? 'visible' : ''}>
          <h5>상품 옵션</h5>
          <ul>
          {
            options.map((item: any) => (
              <Option key={item.optionId}>
                <div>
                  <input type="radio" name="option" id={`opt${item.optionId}`} onChange={()=>selectOption(item.optionId)}/>
                  <label htmlFor={`opt${item.optionId}`}>{item.title}</label>
                </div>
                <TypeAndPrice>
                  <div>
                    <img src={item.type === 'coaching' ? '/icon/coach_64p.svg' : '/icon/workbook_64p.svg'} />
                    {item.type}
                  </div>
                  <Price discountPrice={item.discountPrice} price={item.price} />
                </TypeAndPrice>
                <OptionDesc>{item.desc}</OptionDesc>
              </Option>
            ))
          }
          </ul>
        </OptionPanel>
        <div className="btnWrap">
          <LikeBtn state={userLikeState} onClick = {chageUserLikeState} small border />
          <MobileBuyBtn onClick={onClickListenerMobileBuyBtn}>{buttonText}</MobileBuyBtn>
        </div>
      </MobileFloatingBtn>
      <div className="wrap">
        <CoachProfile>
          <img src={`/detail/${itemId}/coach.png`} className="img_pc"/>
          <img src={`/detail/${itemId}/coach_mobile.png`} className="img_mo"/>
        </CoachProfile>
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
            <section ref={coachingSectionRef}>
              <ContentTemplate type="coach" imgPc={`/detail/${itemId}/0.png`}
                                            imgMo={`/detail/${itemId}/0_mobile.png`}/>
            </section>
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
                        fn={onClickListener}
                />
              ))
            }
          </Options>
        </DetailInfoContainer>
      </DetailInfo>
    </Layout>
    {
      optionPanel
      ? <DimmedOnlyMobile onClick={closeOptionPanel} style={{zIndex: 8}}/>
      : null
    }
    </MobilePadding>
  )
}

const MobilePadding = styled.div`
  ${max[1]}{
    padding-bottom: 72px;
  }
`;

const ProductInfo = styled.div`
  margin-top: 12px;
  padding-bottom: 16px;
  border-bottom: 4px ${Colors.gray4} solid;

  .leftArea {
    margin-bottom: 28px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 8px 16px rgba(17, 17, 17, 0.06);
      
    > div {
      display: block !important;
    }
  }
  

  ${min[1]}{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 56px;
    margin-bottom: 93px;
    padding-bottom: 0;
    border-bottom : 0;

    .leftArea {
      flex-basis: 645px;
      border-radius: 20px;
      margin-bottom: 0;
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
  z-index: 9;
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
  ${BtnCss.PrimaryMo}

  flex-grow: 1;
  height: 36px;
  margin-left: 4px;
  font-size: 0.875rem;
`;

const OptionPanel = styled.div`
  display: none;
  width: 100%;
  height: 322px;
  max-height: calc(100vh - 122px);
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(calc(-100% + 1px));
  z-index: -1;
  padding: 0 20px;

  background: ${Colors.white};
  border: 1px solid ${Colors.black};
  border-width: 1px 1px 0px 1px;
  border-radius: 10px 10px 0px 0px;

  &.visible {
    display: block;
  }

  h5 {
    cursor: pointer;
    text-align: center;
    font-size: 0.875rem;
    font-weight: 500;
    padding: 20px 0 10px;
    margin-bottom: 10px;
  }

  ul {
    max-height: calc(100% - 37px);
    overflow: auto;
  }
`;

const Option = styled.li`
  input[type=radio] {
    display: none;
  }
  input[type=radio] + label::before {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url('/icon/checkbox_16p.svg') center/16px 16px no-repeat;
    vertical-align: middle;
    margin-right: 8px;
    margin-bottom: 1px;
  }
  input[type=radio]:checked + label::before {
    background-image: url('/icon/checkbox_filled_16p.svg');
  }

  label {
    cursor: pointer;
    font-weight: 700;
  }

  margin-bottom: 24px;
  border-bottom: 1px ${Colors.black} solid;
  &:last-of-type { border-bottom: 0; }
`;

const TypeAndPrice = styled.div`
  font-size: 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 20px;
  margin-left: 40px;
  padding-bottom: 8px;

  img {
    width: 28px;
    height: 28px;
    vertical-align: middle;
  }
`;

const OptionDesc = styled.p`
  font-size: 0.75rem;
  border-top: 1px ${Colors.gray3} dashed;
  margin-left: 40px;
  padding: 12px 0;
  word-break: keep-all;
  line-height: 160%;
`;


const CoachProfile = styled.div`
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
  padding-bottom: 60px;

  ${min[1]}{
    padding-bottom: 209px;
  }
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