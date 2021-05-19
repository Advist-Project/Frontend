import styled from "@emotion/styled";
import { min, Colors } from "components/ui";
import Image from 'next/image';

export function Dunning(){
  return (
    <Section6 className="wrap">
      <MobileTitle><Highlight>프로 일잘러</Highlight>가 될 수 있도록 지원합니다</MobileTitle>
      <Card>
        <ImageBlock>
          <Image
            src="/mainGraphic_section6_graph.svg"
            alt="더닝 크루거 효과. 지식과 기술에 대해 잘 알지 못하는 시기에는, 실제 아는 건 적지만 잘 알고 있다고 착각. 지식과 기술에 대해 조금 알고나면, 사실 잘 모르고 있음을 스스로 깨달고 좌절. 지식과 기술에 대해 전문가 수준이 될 수록, 경험과 자신감을 갖춘 진짜 전문가가 된다."
            width={444}
            height={342}
            priority
          />
        </ImageBlock>
        <Message>
          <DesktopTitle><Highlight>프로 일잘러</Highlight>가 될 수 있도록 지원합니다</DesktopTitle>
          <div>
            <p style={{ color: Colors.gray1 }}>아는 게 정말 적으면 일에서 어려움을 느끼지 않습니다. 일하면서 좌절도 해보았고 더 잘하기 위해 고민하는 분들이 진짜 전문가로 성장할 것이라고 믿습니다.</p>
            <Strong>현재 겪고 있는 업무의 막막함을 해소하고 성공적으로 해내실 수 있도록 돕겠습니다.</Strong>
          </div>
        </Message>
      </Card>
    </Section6>
  )
}

const Section6 = styled.section`
  color: ${Colors.black};
  margin-top: 242px;
  margin-bottom: 96px;
`;

const Highlight = styled.span`
  color: ${Colors.secondary};
`;

const MobileTitle = styled.h3`
  font-weight: 700;
  line-height: 125%;

  ${min[1]} {
    display: none;
  }
`;
const DesktopTitle = styled.h3`
  display: none;
  font-size: 36px;
  font-weight: 700;
  line-height: 125%;
  margin-bottom: 20px;

  ${min[1]} {
    display: block;
  }
`;

const Card = styled.div`
  ${min[1]} {
    box-shadow: 0px 32px 68px rgba(17, 17, 17, 0.08);
    border-radius: 20px;
    display: flex;
    padding: 35px 36px;
  }
`;

const ImageBlock = styled.div`
  max-width: 444px;
  width: calc(100% - 100px);
  margin: 50px auto 40px;
  text-align: center;
`;

const Message = styled.div`
  width: calc(100% - 100px);
  margin: 0 auto;
  text-align: center;
  font-size: 0.875rem;
  line-height: 160%;
  word-break: keep-all;

  ${min[1]} {
    flex-grow: 1;
    padding-left: 36px;
    font-size: 1rem;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: left;
  }
`;

const Strong = styled.p`
  margin-top: 32px;
  font-size: 1.1em;
  font-weight: 500;
  color: ${Colors.black}
`;