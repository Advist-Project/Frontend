import React, { useState } from 'react';
import { Colors, min } from "components/ui";
import styled from "@emotion/styled";
import { AgreePage } from "components/agree";


interface ISectionTitleTypes {
  icon: string;
  children: string;
};
function SectionTitle({icon, children}: ISectionTitleTypes) {
  const Wrap = styled.div`
    display: flex;
    align-items: center;
    margin-top: 24px;
    margin-bottom: 12px;

    img {
      width: 42px;
      height: 42px;
    }

    ${min[1]} {
      margin-top: 52px;
      margin-bottom: 40px;

      img {
        width: 64px;
        height: 64px;
      }
    }
  `;
  const Title = styled.p`
    font-size: 1rem;
    font-weight: 700;
  `;
  return  (
    <Wrap>
      <img src={icon} style={{marginRight: '7px'}}/>
      <Title>{children}</Title>
    </Wrap>
  )
}


interface IContentTemplateTypes {
  type: string;
  imgPc: string;
  imgMo: string;
};
export const ContentTemplate = React.memo(function WorkbookContent({type, imgPc, imgMo}: IContentTemplateTypes) {
  const typeStyles:{[key: string]: any} = {
    "workbook": {
      icon: "/icon/workbook_64p.svg",
      message: "워크북으로 다양한 템플릿을 참고해봐요.",
    },
    "coach": {
      icon: "/icon/coach_64p.svg",
      message: "코칭에 대해 자세히 알아보세요.",
    },
    "review": {
      icon: "/icon/review_64p.svg",
      message: "교육 후기",
    }
  }

  return (
    <>
      <SectionTitle icon={typeStyles[type].icon}>
        {typeStyles[type].message}
      </SectionTitle>
      <Box>
        <img
          src={imgPc}
          alt=""
          className="imgPc"
        />
        <img
          src={imgMo}
          alt=""
          className="imgMo"
        />
      </Box>
    </>
  )
});


export const AskContentTemplate = React.memo(function WorkbookContent() {
  // 약관 동의 모달
  const [AgreeModal, setAgreeModal] = useState<boolean>(false);
  function onClickListener(){
    setAgreeModal(true);
  }

  return (
    <>
      {                
        AgreeModal ? <AgreePage setActiveTab="refund" setAgreeModal={setAgreeModal}/> : null
      }
      <SectionTitle icon="/icon/ask_64p.svg">
        자주 묻는 질문
      </SectionTitle>
      <Box>
        <Heading>코칭은 어떻게 진행하나요?</Heading>
        <Text>코칭을 구매하시면 어드바이스트 운영팀에서 일정을 조율한 후 온라인(zoom)으로 미팅을 진행합니다.</Text>
        <Text><span className="primaryColor">**</span> 어드바이스트의 코칭 서비스는 기본적으로 비대면으로 진행하며, 구매하신 분과 코치님과 조율을 통해 대면 미팅으로도 진행 가능합니다.</Text>
        <Heading>코칭을 신청할 때 결제를 먼저 하나요?</Heading>
        <Text>일정을 조율해야 하는 코칭 서비스 성격상 원활한 스케줄 관리와 노쇼 방지를 위해 결제를 먼저 진행합니다.</Text>
        <Text>코칭 서비스가 제공되기 전에는 언제든 100% 환불 신청이 가능합니다.</Text>
        <Heading>구매 취소/환불 규정</Heading>
        <Text>워크북·전자책은 자료 형태이므로 교환이나 환불이 불가능하며, 코칭·컨설팅은 서비스를 제공받기 전이라면 서비스 기간 내 100% 환불이 가능합니다.</Text>
        <Text><a onClick={onClickListener} style={{
    textDecoration: 'underline'}}>취소/환불 규정 전체보기</a></Text>
        <Heading>고객센터</Heading>
        <Text>상품 상세 정보나 구매, 취소/환불 등 문의사항은 <a href="mailto:timkim@advist.kr">timkim@advist.kr</a>로 문의주시면 24시간 내로 답변드립니다.</Text>
      </Box>
    </>
  )
});

const Box = styled.div`
  padding: 16px;
  border-radius: 10px;
  background: #FCFCFC;
  box-shadow: 0px 8px 16px rgba(17, 17, 17, 0.06);

  img { width: 100%; }
  .imgPc { display: none; }

  ${min[1]}{
    padding: 40px 52px;
    border-radius: 20px;

    .imgMo { display: none }
    .imgPc { display: inline }
  }
`;
const Heading = styled.h4`
  font-weight: 700;
  line-height: 167%;
  margin-top: 1.25em;
  margin-bottom: 1em;

  ${min[1]}{
    margin-top: 3em;
    font-size: 20px;
  }

  &:first-of-type {
    margin-top: 0;
  }
`;
const Text = styled.p`
  font-size: 14px;
  color: ${Colors.gray1};
  line-height: 160%;
  word-break: keep-all;

  .primaryColor {
    color: ${Colors.primary};
  }
  a {
    color: ${Colors.primary};
    cursor: pointer;
  }

  ${min[1]}{
    font-size: 16px;
  }
`;