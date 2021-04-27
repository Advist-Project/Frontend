import React, { useState } from "react";
import styled from "@emotion/styled";
import { Colors } from "components/ui";
import { AgreeTab } from 'components/tab';
import { TermsText, UserinfoText, RefundText } from "components/agreeText"

export function AgreePage(props : any) {
    // Tab Control
    const [activeTab, setActiveTab] = useState<string>(props.setActiveTab === undefined? "terms" : props.setActiveTab);

    function onClickListener(type: string){
      setActiveTab(type);
    }
    function onCloseListener(){
      props.setAgreeModal(false);
    }
    return(
        <Container>
            <AgreeTab create={{ terms: { sectionRef: 'terms' },
                          userinfo: { sectionRef: 'userinfo' },
                          refund: { sectionRef: 'refund' }
                        }}
                    active={activeTab}
                    clicktab={onClickListener}
                    clickclose={onCloseListener}
                    />
            <DetailInfo>
              <DetailInfoContainer className="wrap">
                {activeTab === 'terms'? <TermsText/> : activeTab === 'userinfo'? <UserinfoText/> : <RefundText/>}
              </DetailInfoContainer>
            </DetailInfo>              
        </Container>
    )
}
// width: 1300px;
// width: 67%;
// height: 82%;
// left: 310px;
// left: 16.3%;
// top: 14.9%;
const Container = styled.div`
    position: fixed;
    width: calc(100% - 40px);
    max-width: 1300px;
    height: calc(100vh - 80px);
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: ${Colors.gray1};
    border-radius: 20px;
    z-index: 1;

    &::after {
      content: '';
      display: block;
      position: fixed;
      top: -50%;
      left: -50%;
      width: 1000vw;
      height: 1000vh;
      background: rgba(20, 20, 42, 0.5);
      z-index: -1;
    }
`;
const DetailInfo = styled.div`
  background-color: ${Colors.gray6};
  padding : 9px 120px 209px 120px;
  border-radius: 0px 0px 20px 20px;
  overflow: auto;
  height: calc(100% - 209px);
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    height: 139px;
    background-color: ${Colors.gray2};
    border-radius: 6px;
  }
`;
const DetailInfoContainer = styled.div`
  margin-top : 72px;
  display: flex;

  h2 {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 10px;
  }
  h3 {
    font-weight: 500;
  }
  p {
    margin-bottom: 5px;
    line-height: 135%;
  }
  th, td {
    border: 1px #000 solid;
    padding: 10px;
  }
`;

