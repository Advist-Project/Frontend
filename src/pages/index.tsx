import React, { useState, useEffect } from 'react'
import { Layout } from "components/layout";
import styled from "@emotion/styled";
import { min, max, Colors } from "components/ui";
import { breakpoints as bp } from "components/ui";
import Image from 'next/image';
import { ProductList } from "components/product-card-list";
import axios, { AxiosResponse } from 'axios';
import { Dunning } from "components/main/dunning";
import { Coach } from 'components/main/coach';
import Slider from "react-slick";

export default function Home() {
  const [Data, setData] = useState<object>();
  useEffect(() => {  
    axios.get(process.env.NEXT_PUBLIC_API_URL as string + '/exhibition/best', { withCredentials: true }).then((res: AxiosResponse) => {
      if (res.data) {
        setData(res.data.exhibition.itemInfo);
      }
    }) 
  }, [])

  var settings = {
    dots: false,
    infinite: true,
    className: "center",
    centerMode: true,
    variableWidth: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 10000, //슬라이드 속도
    autoplaySpeed: 0, //한 슬라이드에 머무르는 시간
    cssEase: 'ease',
    responsive: [
      {
        breakpoint: 576,
        settings: {
          speed: 7000, //슬라이드 속도
        }
      },
    ]
  };

  return (
    <Layout whiteHeader>
      {/* 1번 콘텐츠 */}
      <Keyvisual>
        <div>
          <h2>회사에 일을 시키는 사람만 있고 <br/><Highlight2>어떻게 하는지</Highlight2> 알려줄 사람이 없을 때</h2>
          <p>지금 나에게 필요한 부분을 알려주고, 조언해줄 업계의 일잘러 선배들을 만나보세요.</p>
        </div>
        <Image
          src="/main_whiteLogo.svg"
          alt=""
          width={91}
          height={110.16}
          priority
        />
      </Keyvisual>
      {/* 2번 콘텐츠 */}
      <Section2>
        <div className="wrap">
          <Headline><Highlight>지금 나, 잘 하고 있는걸까..?</Highlight></Headline>
          <p>오늘도 주변에 말 못하고 혼자 고민하는 분들이 많습니다.</p>
          <Comments>
            <li>지금 몸담은 분야가 잘 맞긴 한데, 이 분야만으로는 부족하다고 느껴질 때가 있습니다. 혹시 이 분야에서 더 발전시켜야될 기술은 무엇이 있을까요?<br/>
            -2년차 대기업 개발자 조○○님-</li>
            <li>“최근 실무자에서 관리자로 직책이 바뀌었습니다. <br/>
            같은 문제가 생겨도 예전처럼 대응하면 안 될 것 같고, 제 포지션을 바꾸어야 하는 것 같은데.. 뭐가 맞는지 잘 모르겠어요”<br/>
            - 3년차 스타트업 영업팀 이○○님 -</li>
            <li>선배님들이 생각하는 HR 업계 동향과 앞으로의 전망이 어떠한지 궁금합니다. 제가 어떤 부분을 미리 쌓아가야 할까요?<br/>
            - 5년차 HR 김○○님-</li>
            <li>첫 회사에서 쭉 근무를 하고 있어, 지금 제 업무량이 적절한 수준이 맞는지 모르겠습니다. 필요 이상으로 회사에 에너지를 쓰고 있는건가 싶어요<br/>
            - 5년차 대기업 경영지원 김○○님-</li>
            <li>“1년 차 때보다는 나아지지 않았나? 하는 생각으로 힘을 내다가도 어느 순간 들어오는 뾰족한 말들에 와르르 무너질 때가 있습니다. 내가 잘하고 있는 게 맞는지.. 나만 이렇게 헤매고 있는 건지.. 다른 스타트업 선배님들은 어떻게 풀어가셨을까요”<br/>
            - 5년차 스타트업 대표 정○○님-</li>
            <li>“그 동안 모든 회사에서 사수없이 일해서, 일반적인 회사의 프로세스를 잘 모릅니다. 직접 만나서 대화할 기회가 있다면 사소한 것부터 물어보고 싶은게 많습니다.”<br/>
            - 3년차 중소기업 재무팀 김○○님 -</li>
            <li>첫 회사에서 쭉 근무를 하고 있어, 지금 제 업무량이 적절한 수준이 맞는지 모르겠습니다. 필요 이상으로 회사에 에너지를 쓰고 있는건가 싶어요<br/>
            - 5년차 대기업 경영지원 김○○님-</li>
            <li>지금까지는 어찌어찌 잘 해온 것 같은데, 앞으로의 커리어는 어떻게 그려가야 할 지 고민입니다.<br/>
            -5년차 스타트업 기획자 이○○님-</li>
            <li>제 상황에서의 적절한 이직 시점, 언제부터 이직을 준비하는게 맞을까요?<br/>
            - 2년차 스타트업 개발자 홍○○님-</li>
          </Comments>
        </div>
      </Section2>
      {/* 3번 콘텐츠 */}
      <Section3>
        <Headline className="wrap">나와 똑같은 고민을 과거에 했던 선배들이 <Highlight>나만의 사수</Highlight>가 됩니다.</Headline>
        <SliderWrap>
        <Slider {...settings}>
          <div>
            <Coach company="패스트파이브" team="Culture팀 리더" desc="안녕하세요. 저는 패스트파이브의 30번째 멤버로 입사하여 현재는 200명의 구성원의 조직문화와 컬처를 담당하고 있습니다. 커리어를 시작한 4년 동안 전시기획, 영업 직무를 맡았다가 5년차부터 HR로 새 출발을 하고 이제 적응을 마친 것 같습니다. 패스트파이브는 평균연령 31세로 구성된 젊고 빠르게 성장하는 조직으로, 회사와 구성원들이 성장하는 과정에서 겪은 노하우와 경험을 바탕으로 조직문화에 대한 허심탄회한 이야기를 나누고 싶습니다." tag={['HR', '조직문화']}/>
          </div>
          <div>
            <Coach company="크래프톤" team="E-sport 팀" desc="체대를 준비하던 학창 시절부터 스포츠의 가슴 뛰는 설렘을 전달하는 사람이 되고 싶었습니다. 항상 스포츠마케터를 꿈꾸었지만 직무에 대한 구체적인 정보나 아는 사람이 없어 취업, 이직을 하는 과정에서 여러가지 어려움을 겪었습니다. \n커리어 상담을 통해 스포츠 마케팅 분야에서의 커리어를 꿈꾸는 학생/직장인 분들에게 작게나마 도움이 되면 좋겠습니다." tag={['마케터', '스포츠마케팅']}/>
          </div>
          <div>
            <Coach company="삼성전자" team="HRD팀" desc="대기업과 스타트업에서 HR담당자로 근무하며 크고 작은 직원 행사부터 교육 체계, 전사 조직문화 개선 프로젝트까지 여러 HRD 업무를 담당했습니다. \n대기업과 스타트업 사이에서 커리어를 고민하시고 있거나 HRD, 조직문화 분야에서 고민하시는 주니어 실무자 분들에게 도움을 드리고 싶습니다." tag={['HR', '조직문화']}/>
          </div>
          <div>
            <Coach company="모리엔티드" team="마케팅 에이전시 Co-founder" desc="저는 IT 서비스 기업 인하우스 마케터로 일을 시작하였고, 마케팅 관련 강의 기획자를 거쳐 현재는 마케팅 에이전시를 창업하여 운영하고 있습니다. 일이나 커리어에 있어 확실한 정답이 무엇인지는 알 수 없지만, 필요하신 분들에게 제가 겪었던 경험과 시행착오를 공유하고 함께 고민하고 싶습니다." tag={['마케터', '퍼포먼스마케팅']}/>
          </div>
        </Slider>
        </SliderWrap>
      </Section3>

      {/* 코칭 프로그램 */}
      <ProgramSection className="wrap">
        <SectionHeader>
          <img src="/icon/coach_64p.svg" style={{marginRight: '5px'}} className="icon_pc"/>
          <img src="/icon/coach_42p.svg" style={{marginRight: '5px'}} className="icon_mo"/>
          <SectionTitle>신청할 수 있는 코칭 프로그램</SectionTitle>
          <SectionDesc>성공적인 커리어와 이직의 기술, 회사에서 인정받은 중요 프로젝트의 노하우를 만나보세요.</SectionDesc>
        </SectionHeader>

        <ProductListWrap>
          <ProductList data={[Data]} />
          {/* 페이지 생성되면 url 변경 */}
          <a href="/all" className="allProductLink">
            <div className="allProductCard">
              코칭 전체보기
            </div>
          </a>
        </ProductListWrap>
      </ProgramSection>
      {/* 리뷰 */}
      <ReviewSection className="wrap">
        <SectionHeader style={{marginBottom: '80px'}}>
          <img src="/icon/review_64p.svg" style={{marginRight: '26px'}} className="icon_pc" />
          <img src="/icon/review_42p.svg" style={{marginRight: '8px'}} className="icon_mo" />
          <SectionTitle>구매 후기</SectionTitle>
          <SectionDesc>코칭을 신청하고 업무에 활용한 고객이 작성하신 후기입니다.</SectionDesc>
        </SectionHeader>
        <div className="img_pc">
          <Image
            src="/mainGraphic_section4_review.png"
            alt="조직문화 진단은 제가 경험도 없고 큰 프로젝트여서 굉장히 막막했었는데, 일할 떄 딱 필요한 실무 양식이랑 작성 사례도 주시고 매주 업무 방향을 같이 고민해주셔서 일을 생각보다 쉽게 해낸 것 같아요. 덕분에 프로젝트도 잘 마무리했고 감사했습니다. 쿠팡페이 HR Leader 홍*영님의 리뷰, 기본적인 보고나 메일 커뮤니케이션을 직접 신입사원 분들께 알려주자니 시간이 너무 많이 들고, 외부 강의는 효과가 없어요 고민이었는데 코칭을 받은 후 실제로 변화한 분들이 많았습니다. 디지털 마케팅 에이전시 Co-founder 문*호님"
            width={1300}
            height={759.5}
            priority
          />
        </div>
        <div className="img_mo">
          <Image
            src="/mainGraphic_section4_review_mo.png"
            alt="조직문화 진단은 제가 경험도 없고 큰 프로젝트여서 굉장히 막막했었는데, 일할 떄 딱 필요한 실무 양식이랑 작성 사례도 주시고 매주 업무 방향을 같이 고민해주셔서 일을 생각보다 쉽게 해낸 것 같아요. 덕분에 프로젝트도 잘 마무리했고 감사했습니다. 쿠팡페이 HR Leader 홍*영님의 리뷰, 기본적인 보고나 메일 커뮤니케이션을 직접 신입사원 분들께 알려주자니 시간이 너무 많이 들고, 외부 강의는 효과가 없어요 고민이었는데 코칭을 받은 후 실제로 변화한 분들이 많았습니다. 디지털 마케팅 에이전시 Co-founder 문*호님"
            width={768}
            height={856}
            priority
          />
        </div>
      </ReviewSection>
      {/* 더닝크루거 */}
      <Dunning />
    </Layout>
  )
}

const Keyvisual = styled.section`
  width: 100%;
  height: 100vh;
  min-height: 320px;
  max-height: 568px;
  background: url('/main_bg.png') top center/cover no-repeat;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color: ${Colors.white};
  text-align: center;
  padding: 10vh 0 0;

  ${min[1]} {
    max-height: 100vh;
  }

  h2 {
    font-weight: 700;
    font-size: 18px;
    line-height: 125%;
    margin-bottom: 40px;
    
    ${min[1]}{
      font-size: 40px;
    }
  }
  p {
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
    word-break: keep-all;
    padding: 0 20px;
    max-width: 375px;

    ${min[1]}{
      font-size: 1.25rem;
      max-width: 100%;
    }
  }
  img {
    ${max[1]}{
      height: 56px;
    }
  }
`;

const Highlight = styled.span`
  color: ${Colors.primary};
`;
const Highlight2 = styled.span`
  color: ${Colors.secondary};
`;

const Headline = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 125%;
  word-break: keep-all;
  
  ${min[1]}{
    font-size: 1.75rem;
  }
`;

// Section2
const Section2 = styled.section`
  margin-top: 40px;

  h3 {
    margin-bottom: 1.5em;
  }
  p {
    font-size: 0.875rem;
    line-height: 150%;
  }

  ${min[1]}{
    margin-top: 120px;
  
    p {
      font-size: 1.25rem;
    }
  }
`;

const Comments = styled.ul`
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  
  li {
    width: 100%;
    max-width: 280px;
    margin: 16px auto;
    text-align: center;
    color: ${Colors.gray2};
    font-size: 0.72rem;
    line-height: 171%;
  }
  ${max[0]}{
    li:nth-of-type(2){
      opacity: 0.7;
    }
    li:nth-of-type(3){
      opacity: 0.4;
    }
    li:nth-of-type(4){
      opacity: 0.2;
    }
    li:nth-of-type(n+5){
      display: none;
    }
  }

  ${min[0]}{
    margin-top: 65px;

    li {
      width: calc(50% - 40px);
      max-width: 100%;
      margin: 30px 20px;
    }
  }

  @media (max-width: ${bp[2]}px) and (min-width: ${bp[0]}px) {
    li:nth-of-type(2n-1){
      margin-left: 0;
    }
    li:nth-of-type(2n){
      margin-right: 0;
    }
    li:nth-of-type(n+3){
      opacity: 0.65;
    }
    li:nth-of-type(n+5){
      opacity: 0.3;
    }
    li:nth-of-type(n+7){
      display: none;
    }
  }

  ${min[2]}{
    li {
      width: calc((100% / 3) - 40px);
      max-width: 320px;
      margin: 30px 20px;
    }
    li:nth-of-type(3n-2){
      margin-left: 0;
    }
    li:nth-of-type(3n){
      margin-right: 0;
    }
    li:nth-of-type(n+4){
      opacity: 0.65;
    }
    li:nth-of-type(n+7){
      opacity: 0.3;
    }
  }
`;

// Section3
const Section3 = styled.section`
  color: ${Colors.black};
  margin-top: 115px;
  height: 500px;
  overflow: hidden;

  ${min[1]}{
    margin-top: 245px;
    height: auto;
  }
`;
const SliderWrap = styled.div`
  margin-top: 40px;
  width: 100%;
  
  ${min[1]}{
    margin-top: 145px;
  }
`;

// Section4
const ReviewSection = styled.section`
  color: ${Colors.black};
  margin-top: 80px;

  .img_pc {
    display: none;
  }
  ${min[1]}{
    margin-top: 245px;

    .img_pc {
      display: block;
    }
    .img_mo {
      display: none;
    }
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 40px;
  
  img.icon_pc {
    width: 64px;
    height: 64px;
    display: none;
  }
  img.icon_mo {
    width: 42px;
    height: 42px;
  }
  ${min[1]}{
    margin-bottom: 60px;

    img.icon_mo {
      display: none;
    }
    img.icon_pc {
      display: inline;
    }
  }
`;
const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 125%;

  ${min[1]} {
    font-size: 2.25rem;
  }
`;
const SectionDesc = styled.p`
  width: 100%;
  color: ${Colors.gray1};
  font-size: 0.75rem;
  line-height: 150%;
  margin-top: 12px;
  word-break: keep-all;

  ${min[1]} {
    font-size: 1rem;
    margin-top: 31px;

    br {
      display: none;
    }
  }
`;

// ProgramSection
const ProgramSection = styled.section`
  color: ${Colors.black};
  margin-top: 0;

  ${min[1]}{
    margin-top: 205px;
  }
`;
const ProductListWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .allProductLink {
    display: block;
    width: 100%;
    text-align: right;

    ${min[1]} {
      width: calc(50% - 16px);
      margin-bottom: 32px;
    }
    ${min[2]} {
      max-width: 412px;
      width: calc((100% / 3) - (64px / 3));
    }
  }

  .allProductCard {
    ${max[1]}{
      display: inline-block;
      padding-right: 24px;
      color: ${Colors.primary};
      font-weight: 700;
      margin-top: 32px;
      background: url(/icon/chevron_right_24px.svg) right center/24px 24px no-repeat;
    }

    ${min[1]}{
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      padding-right: 91px;
      padding-bottom: 44px;
      height: 100%;
      font-size: 28px;
      font-weight: 700;
      background: url(/icon/forwardArrow.svg) bottom 36px right 28px/48px 48px no-repeat;
      background-color: ${Colors.white};
      color: ${Colors.black};
      border-radius: 20px;
      box-shadow: 0px 8px 16px rgba(17, 17, 17, 0.06);
    }
  }
`;