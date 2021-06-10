import React, { useState } from "react";
import styled from "@emotion/styled";
import { max, Colors, Dimmed } from "components/ui";
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
      document.body.removeAttribute('style');
    }
    return(
      <>
        <Container>
            <OutButton onClick={onCloseListener}><img src="/out.png"/></OutButton>
            <AgreeTab create={{ terms: { sectionRef: 'terms' },
                          userinfo: { sectionRef: 'userinfo' },
                          refund: { sectionRef: 'refund' }
                        }}
                    active={activeTab}
                    clicktab={onClickListener}
                    />
            <DetailInfo>
              <DetailInfoContainer className="wrap">
                {activeTab === 'terms'? <TermsText/> : activeTab === 'userinfo'? <UserinfoText/> : <RefundText/>}
              </DetailInfoContainer>
            </DetailInfo>              
        </Container>
        <Dimmed onClick={onCloseListener}/>
      </>
    )
}

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
    z-index: 11;
`;
const OutButton = styled.div`
  position: absolute;
  top: 32px;
  right: 32px;
  cursor : pointer;
  width: 24px;
  height: 24px;
  z-index: 12;
  ${max[1]}{
    top : 16px;   
    right: 16px;
  }
`;
const DetailInfo = styled.div`
  background-color: ${Colors.gray6};
  padding : 9px 9% 209px 9%;
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
    ${max[1]}{
      height: 69px;
    } 
  } 
  ${max[1]}{
    height: calc(100% - 149px);
    padding-bottom : 100px;
  }    
`;
const DetailInfoContainer = styled.div`
  margin-top : 72px;
  display: flex;
  flex-direction : row;
  padding : 0;
  flex-wrap : wrap;

  h2 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 30px;
    width : 100%;
    ${max[1]}{
      font-size: 3vw;
    }      
  }
  h3 {
    font-size: 20px;
    font-weight: 500;
    word-break: keep-all;
    width : 31.5%;
    line-height: 162%;
    ${max[1]}{
      font-size: 3vw;
    }      
  }
  p {
    margin-bottom: 1.2em;
    line-height: 162%;

    > ul { margin-top: 16px; }
    > ul > li { margin-left: 16px; margin-bottom: 10px; color: ${Colors.gray1}}
    > ul > li > ul > li { list-style-type: '- '; margin-left: 32px; }
    ${max[1]}{
      font-size: 3vw;
    } 
  }
  th, td {
    border: 1px #000 solid;
    padding: 10px;
  }
  div{
    max-width : 720px;
    width : 68.5%;
  }
  ${max[1]}{
    margin-top : 22px;
  }  
`;

