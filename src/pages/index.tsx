import { Layout } from "components/layout";
import styled from "@emotion/styled";
import { Heading, Text, Button, Colors, Box } from "components/ui";
import Image from 'next/image';

export default function Home() {
  return (
    <Layout>
      {/* 1번 콘텐츠 */}
      <Section1>
        <div className="wrap">
          <div className="contentArea">
            <Heading>혼자 일하는 당신을 위한 <br /><Highlight>진짜 실무 자료.</Highlight></Heading>
            <Text size="16px" style={{marginTop: '68px', marginBottom: '81px'}}>일 시키는 사람만 있고 알려주는 사람이 없어서 힘든 당신,<br />업계 일잘러들이 직접 만든 업무 자료와 노하우를 업무에 활용해보세요.</Text>
            <Button type="start">시작하기</Button>
          </div>
          <Image
            src="/mainGraphic_section1_human.png"
            alt=""
            width={529}
            height={378}
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
          />
          </div>
        </div>
      </Section2>
      {/* 3번 콘텐츠 */}
      <Section3>
        <Heading level={2} bold><Highlight2>How</Highlight2>를 알려면</Heading>
        <Text size="20px" bold style={{marginTop: '26px'}}>실제 업무에 활용했던 구체적인 자료와 시행착오 경험, 노하우가 필요합니다.</Text>
        <ImagesArea>
          <Box width="400px" height="400px" shadow={2} round style={{margin: '0 16px'}}></Box>
          <Box width="400px" height="400px" shadow={2} round style={{margin: '0 16px'}}></Box>
        </ImagesArea>
        <Text size="20px">지금 내가 고민하고 있는 일을 성공적으로 해냈던 업계 선배들의 실제 업무 자료를 활용해보세요.</Text>
      </Section3>
    </Layout>
  )
}

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

const Highlight = styled.span`
  display: inline-block;
  background-color: ${Colors.secondary};
  font-weight: 700;
  margin-top: 18px;
  padding-top: 8px;
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
const Highlight2 = styled.span`
  color: ${Colors.secondary};
  margin-right: 8px;
`;
const ImagesArea = styled.div`
  margin-top: 40px;
  margin-bottom: 100px;
  display: flex;
  justify-content: center;
`;