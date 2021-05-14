import React, { useState } from 'react';
import { Box, Heading, Text } from "components/ui";
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
    margin-top: 52px;
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
export const ContentTemplate = React.memo(function WorkbookContent({type, img}: IContentTemplateTypes) {
  const typeStyles:{[key: string]: any} = {
    "workbook": {
      icon: "/icon/workbook_64p.svg",
      message: "워크북으로 다양한 템플릿을 참고해봐요.",
      padding: "40px 52px 40px 52px"
    },
    "coach": {
      icon: "/icon/coach_64p.svg",
      message: "코칭으로 더욱 자세한 가이드라인을 받아보세요.",
      padding: "40px 52px 40px 52px"
    },
    "review": {
      icon: "/icon/review_64p.svg",
      message: "교육 후기",
      padding: "45px 64px 16px 37px"
    }
  }

  return (
    <>
      <SectionTitle icon={typeStyles[type].icon}>
        {typeStyles[type].message}
      </SectionTitle>
      <Box shadow={1} round style={{padding: `${typeStyles[type].padding}`, background: '#FCFCFC'}}>
        <img
          src={img}
          alt=""
          style={{width: '100%'}}
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

  const A = styled.a`
    cursor: pointer;
    text-decoration: underline;
  `;

  return (
    <>
      {                
        AgreeModal ? <AgreePage setActiveTab="refund" setAgreeModal={setAgreeModal}/> : null
      }
      <SectionTitle icon="/icon/ask_64p.svg">
        자주 묻는 질문
      </SectionTitle>
      <Box shadow={1} round style={{padding: '56px 53px', background: '#FCFCFC'}}>
        <Heading level={5} bold>코칭은 어떻게 진행하나요?</Heading>
        <Text size="16px">코칭을 구매하시면 어드바이스트 운영팀에서 일정을 조율한 후 온라인(zoom)으로 미팅을 진행합니다.</Text>
        <Text size="16px" style={{color: '#888'}}>※ 어드바이스트의 코칭 서비스는 기본적으로 비대면으로 진행하며,<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;구매하신 분과 코치님과 조율을 통해 대면 미팅으로도 진행 가능합니다.</Text>
        <br/><br/>
        <Heading level={5} bold>코칭을 신청할 때 결제를 먼저 하나요?</Heading>
        <Text size="16px">일정을 조율해야 하는 코칭 서비스 성격상 원활한 스케줄 관리와 노쇼 방지를 위해 결제를 먼저 진행합니다.</Text>
        <Text size="16px">코칭 서비스가 제공되기 전에는 언제든 100% 환불 신청이 가능합니다.</Text>
        <br/><br/>
        <Heading level={5} bold>구매 취소/환불 규정</Heading>
        <Text size="16px">워크북·전자책은 자료 형태이므로 교환이나 환불이 불가능하며,<br/>코칭·컨설팅은 서비스를 제공받기 전이라면 서비스 기간 내 100% 환불이 가능합니다.</Text>
        <Text size="16px"><A onClick={onClickListener}>취소/환불 규정 전체보기</A></Text>
        <br/><br/>
        <Heading level={5} bold>고객센터</Heading>
        <Text size="16px">상품 상세 정보나 구매, 취소/환불 등 문의사항은<br/>
        <A href="mailto:timkim@advist.kr">timkim@advist.kr</A>로 문의주시면 24시간 내로 답변드립니다.</Text>
      </Box>
    </>
  )
});