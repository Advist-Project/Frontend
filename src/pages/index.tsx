import React, { useState, useEffect } from 'react'
import { Layout } from "components/layout";
import styled from "@emotion/styled";
import { min, Heading, Text, Button, Colors, Box } from "components/ui";
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
    <Layout>
      {/* 1번 콘텐츠 */}
      <Section1>
        <div className="wrap">
          <div className="contentArea">
            <Heading>혼자 일하는 당신을 위한 <br /><Highlight style={{marginTop: '18px'}}>진짜 실무 자료.</Highlight></Heading>
            <Text size="16px" style={{marginTop: '68px', marginBottom: '81px'}}>일 시키는 사람만 있고 알려주는 사람이 없어서 힘든 당신,<br />업계 일잘러들이 직접 만든 업무 자료와 노하우를 업무에 활용해보세요.</Text>
            <Button type="start">시작하기</Button>
          </div>
          <Image
            src="/mainGraphic_section1_human.png"
            alt=""
            width={529}
            height={378}
            priority
          />
        </div>
      </Section1>
      {/* 2번 콘텐츠 */}
      <Section2>
        <div className="wrap">
          <Text size="20px" bold style={{marginBottom: '43px'}}>혼자서 검색하고 책도 찾아보고 교육을 들어봐도</Text>
          <Heading level={2} bold>모니터 앞에 앉으면 <Em>막</Em><Em>막</Em>한 이유</Heading>
          <div style={{marginTop: '60px'}}>
          <Image
            src="/mainGraphic_section2_research.png"
            alt="업무의 Why, What, How를 어디서 찾으시나요? 사수 없이 일하는 실무자 158명 대상 설문조사 결과. Why, 왜 해야 하는지는 79 퍼센트가 회사 내 리더나 동료, 14 퍼센트가 검색이나 뉴스 또는 스터디의 도움을 받았습니다. What, 무슨 뜻인지를 알기 위헤서는 24 퍼센트가 회사 내 리더나 동료, 56 퍼센트가 검색 또는 유투브의 도움을 받았으며, 18 퍼센트가 책 또는 강의를 참고했습니다. How, 어떻게 해야 하는지는 15 퍼센트가 회사 내 리더나 동료, 70 퍼센트가 혼자 고민 또는 잘 모르겠다는 응답을 하였습니다."
            width={856}
            height={676}
            priority
          />
          </div>
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
          <img src="/icon/review_64p.svg" style={{marginRight: '26px'}} />
          <Heading level={3} bold>구매 후기</Heading>
          <Text size="16px">워크북, 코칭을 구매하고 업무에 활용한 고객이 작성하신 후기입니다.</Text>
        </SectionHeader>
        <Image
          src="/mainGraphic_section4_review.png"
          alt="조직문화 진단은 제가 경험도 없고 큰 프로젝트여서 굉장히 막막했는데, 일할 떄 딱 필요한 실무 양식이랑 작성 사례도 주시고 매주 업무 방향을 같이 고민해주셔서 일을 생각보다 쉽게 해낸 것 같아요. 덕분에 프로젝트도 잘 마무리했고 감사했습니다. 쿠팡페이 HR Leader 홍*영님의 리뷰"
          width={1300}
          height={759.5}
          priority
        />
      </Section4>
      {/* 5번 콘텐츠 */}
      <Section5 className="wrap">
        <SectionHeader style={{marginBottom: '60px'}}>
          <img src="/icon/workbook_64p.svg" style={{marginRight: '5px'}} />
          <Heading level={3} bold>실무자를 위한 워크북</Heading>
          <Text size="16px">업계 선배들의 시행착오 경험과 구체적인 업무 사례를 만나보세요.</Text>
        </SectionHeader>

        <ProductListWrap>
          <ProductList data={[Data]} />
          {/* 페이지 생성되면 url 변경 */}
          <a href="/detail/1" className="allProductLink">
            <Box shadow={1} round className="allProductCard">
              제품 전체보기
            </Box>
          </a>
        </ProductListWrap>
      </Section5>
      <Dunning />
    </Layout>
  )
}




const Highlight = styled.span`
  display: inline-block;
  background-color: ${Colors.secondary};
  color: ${Colors.black};
  font-weight: 700;
  padding-top: 8px;
`;
const Highlight2 = styled.span`
  color: ${Colors.secondary};
`;

const Section1 = styled.section`
  color: ${Colors.black};
  margin-top: 162px;
  margin-bottom: 227px;

  > .wrap {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
  }

  > .contentArea {
    height: 642px;
  }
`;



// Section2
const Section2 = styled.section`
  color: ${Colors.black};
  background: url(/mainGraphic_section2_bg.svg) bottom center/1300px auto no-repeat;
  text-align: center;
`;
const Em = styled.span`
  position: relative;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: -20px;
    left: 12px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${Colors.black};
  }
`

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
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  
  > img {
    width: 64px;
    height: 64px;
  }
  > p {
    width: 100%;
    margin-top: 31px;
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
    height: 100%;
    padding: 36px;
    font-size: 20px;
    font-weight: 700;
    background: url(/forwardArrow.svg) bottom 36px right 28px/48px 48px no-repeat;
    background-color: ${Colors.primary};
    color: ${Colors.white};
  }
`;