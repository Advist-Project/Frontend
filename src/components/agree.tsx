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
    position: absolute;
    width: calc(100% - 40px);
    max-width: 1300px;
    height: calc(100vh - 80px);
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: ${Colors.gray1};
    border-radius: 20px;
`;

const DetailInfo = styled.div`
  background-color: ${Colors.gray6};
  padding-top: 9px;
  padding-bottom: 209px;
  border-radius: 0px 0px 20px 20px;
  overflow: auto;
  height: calc(100% - 209px);
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