import React from "react";
import { Box, Text } from "components/ui";
import styled from "@emotion/styled";

interface IContentTemplateTypes {
  type: string;
  img: string;
};
export const ContentTemplate = React.memo(function WorkbookContent({type, img}: IContentTemplateTypes) {
  const typeStyles:{[key: string]: any} = {
    "workbook": {
      icon: "/icon/workbook_64p.svg",
      message: "워크북으로 다양한 템플릿을 참고해봐요.",
      padding: "64px 64px 64px 52px"
    },
    "coach": {
      icon: "/icon/coach_64p.svg",
      message: "코칭으로 더욱 자세한 가이드라인을 받아보세요.",
      padding: "64px 64px 64px 52px"
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