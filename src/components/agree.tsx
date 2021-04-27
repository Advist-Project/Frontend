import React, { useState } from "react";
import styled from "@emotion/styled";
import { Colors } from "components/ui";
import { AgreeTab } from 'components/tab';
import { TermsText, UserinfoText, RefundText } from "components/agreeText"

export function AgreePage(props : any) {
    // Tab Control
    const [activeTab, setActiveTab] = useState<string>('terms');

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
                <DetailContent>
                {activeTab === 'terms'? <TermsText/> : activeTab === 'userinfo'? <UserinfoText/> : <RefundText/>}
                </DetailContent>
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
    width: 67%;
    height: 82.3%;
    left: 16.3%;
    top: 14.9%;
    background: ${Colors.gray1};
    border-radius: 20px;

    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 8px;
      height: 0;
      background: rgba(255, 255, 255, 0.4);
    }
    &::-webkit-scrollbar-thumb {
      height: 138px;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 6px;
    }
    &::-webkit-scrollbar-track-piece{
      width: 0;
      height: 0;
    }
`;

const DetailInfo = styled.div`
  background-color: ${Colors.gray6};
  padding-top: 9px;
  padding-bottom: 209px;
  border-radius: 0px 0px 20px 20px;
`;
const DetailInfoContainer = styled.div`
  margin-top : 72px;
  display: flex;
  align-items: flex-start;
  position: relative;
`;
const DetailContent = styled.div`
  flex-basis: 832px;
`; 