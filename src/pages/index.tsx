import React, { useState, useEffect } from 'react'
import { Layout } from "components/layout";
import styled from "@emotion/styled";
import { min, max, Heading, Text, Colors, Box } from "components/ui";
import Image from 'next/image';
import { ProductList } from "components/product-card-list";
import axios, { AxiosResponse } from 'axios';
import { Dunning } from "components/main/dunning";

export default function Home() {
  const [Data, setData] = useState<object>();
  useEffect(() => {  
    axios.get(process.env.NEXT_PUBLIC_API_URL as string + '/exhibition/best', { withCredentials: true }).then((res: AxiosResponse) => {
      if (res.data) {
        setData(res.data.exhibition.itemInfo);
      }
    }) 
  }, [])

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
        지금 나, 잘 하고 있는걸까..?
        오늘도 주변에 말 못하고 혼자 고민하는 분들이 많습니다.

        <ul>
          <li>지금 몸담은 분야가 잘 맞긴 한데, 이 분야만으로는 부족하다고 느껴질 때가 있습니다. 혹시 이 분야에서 더 발전시켜야될 기술은 무엇이 있을까요?
          -2년차 대기업 개발자 조○○님-</li>
        </ul>
        </div>
      </Section2>
      {/* 3번 콘텐츠 */}
      <Section3>
        <Heading level={2} bold><Highlight2 style={{marginRight: '0.3em'}}>How</Highlight2>를 알려면</Heading>
        <Text size="20px" bold style={{marginTop: '26px'}}>실제 업무에 활용했던 구체적인 자료와 시행착오 경험, 노하우가 필요합니다.</Text>
        <ImagesArea>
          <Box width="400px" height="400px" shadow={2} round style={{margin: '0 16px', fontSize: '20px', lineHeight: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            &lt;실무 템플릿과 작성사례&gt;<br/>샘플 이미지
          </Box>
          <Box width="400px" height="400px" shadow={2} round style={{margin: '0 16px', fontSize: '20px', lineHeight: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            &lt;실무 템플릿과 작성사례&gt;<br/>샘플 이미지
          </Box>
        </ImagesArea>
        <Text size="20px">지금 내가 고민하고 있는 일을 성공적으로 해냈던 업계 선배들의 실제 업무 자료를 활용해보세요.</Text>
      </Section3>
      {/* 4번 콘텐츠 */}
      <Section4 className="wrap">
        <SectionHeader style={{marginBottom: '80px'}}>
          <img src="/icon/review_64p.svg" style={{marginRight: '26px'}} className="icon_pc" />
          <img src="/icon/review_42p.svg" style={{marginRight: '8px'}} className="icon_mo" />
          <SectionTitle>구매 <span className="hightlight_mo">후기</span></SectionTitle>
          <SectionDesc>워크북, 코칭을 구매하고 업무에 <br/>활용한 고객이 작성하신 후기입니다.</SectionDesc>
        </SectionHeader>
        <div className="img_pc">
          <Image
            src="/mainGraphic_section4_review.png"
            alt="조직문화 진단은 제가 경험도 없고 큰 프로젝트여서 굉장히 막막했는데, 일할 떄 딱 필요한 실무 양식이랑 작성 사례도 주시고 매주 업무 방향을 같이 고민해주셔서 일을 생각보다 쉽게 해낸 것 같아요. 덕분에 프로젝트도 잘 마무리했고 감사했습니다. 쿠팡페이 HR Leader 홍*영님의 리뷰"
            width={1300}
            height={759.5}
            priority
          />
        </div>
        <div className="img_mo">
          <Image
            src="/mainGraphic_section4_review_mo.png"
            alt="조직문화 진단은 제가 경험도 없고 큰 프로젝트여서 굉장히 막막했는데, 일할 떄 딱 필요한 실무 양식이랑 작성 사례도 주시고 매주 업무 방향을 같이 고민해주셔서 일을 생각보다 쉽게 해낸 것 같아요. 덕분에 프로젝트도 잘 마무리했고 감사했습니다. 쿠팡페이 HR Leader 홍*영님의 리뷰"
            width={768}
            height={856}
            priority
          />
        </div>
      </Section4>
      {/* 5번 콘텐츠 */}
      <Section5 className="wrap">
        <SectionHeader>
          <img src="/icon/workbook_64p.svg" style={{marginRight: '5px'}} className="icon_pc"/>
          <img src="/icon/workbook_42p.svg" style={{marginRight: '5px'}} className="icon_mo"/>
          <SectionTitle>신청할 수 있는 <span className="hightlight_mo">코칭 프로그램</span></SectionTitle>
          <SectionDesc>성공적인 커리어와 이직의 기술, <br/>회사에서 인정받는 프로젝트 노하우를 만나보세요.</SectionDesc>
        </SectionHeader>

        <ProductListWrap>
          <ProductList data={[Data]} />
          {/* 페이지 생성되면 url 변경 */}
          <a href="/all" className="allProductLink">
            <div className="allProductCard">
              코칭 더보기
            </div>
          </a>
        </ProductListWrap>
      </Section5>
      <Dunning />
    </Layout>
  )
}

const Keyvisual = styled.section`
  width: 100%;
  height: 100vh;
  min-height: 700px;
  background: url('/main_bg.png') top center/cover no-repeat;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: ${Colors.white};
  text-align: center;
  padding: 15% 0 5%;

  h2 {
    font-weight: 700;
    font-size: 40px;
    line-height: 125%;
    margin-bottom: 40px;
  }
  p {
    font-weight: 500;
    font-size: 20px;
    line-height: 150%;
  }
`;
const Highlight2 = styled.span`
  color: ${Colors.secondary};
`;


// Section2
const Section2 = styled.section`
  
`;

// Section3
const Section3 = styled.section`
  color: ${Colors.black};
  text-align: center;
  margin-top: 245px;
`;

const ImagesArea = styled.div`
  margin-top: 40px;
  margin-bottom: 100px;
  display: flex;
  justify-content: center;
`;

// Section4
const Section4 = styled.section`
  color: ${Colors.black};
  margin-top: 245px;

  .img_pc {
    display: none;
  }
  ${min[1]}{
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

  ${max[1]} {
    .hightlight_mo {
      color: ${Colors.secondary};
    }
  }

  ${min[1]} {
    font-size: 2.25rem;
  }
`;
const SectionDesc = styled.p`
  width: 100%;
  color: ${Colors.gray1};
  font-size: 0.875rem;
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

// Section5
const Section5 = styled.section`
  color: ${Colors.black};
  margin-top: 205px;
`;
const ProductListWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .allProductLink {
    display: block;
    margin-bottom: 32px;

    ${min[1]} {
      width: calc(50% - 16px);
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
      height: 100%;
      padding: 36px;
      font-size: 20px;
      font-weight: 700;
      background: url(/forwardArrow.svg) bottom 36px right 28px/48px 48px no-repeat;
      background-color: ${Colors.primary};
      color: ${Colors.white};
      border-radius: 20px;
      box-shadow: 0px 8px 16px rgba(17, 17, 17, 0.06);
    }
  }
`;