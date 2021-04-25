import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { Colors } from "components/ui";
import { AgreeTab } from 'components/tab';

export function AgreePage() {
    // Tab Control
    const [activeTab, setActiveTab] = useState<string>('terms');
    const DetailInfoContainerRef = useRef<HTMLDivElement>(null);
    const termsSectionRef = useRef<HTMLDivElement>(null);
    const userinfoSectionRef = useRef<HTMLDivElement>(null);
    const refundSectionRef = useRef<HTMLDivElement>(null);

    function windowScroll(target: string){
        const ref:{[key: string]: any} = {
          "terms": termsSectionRef,
          "userinfo": userinfoSectionRef,
          "refund": refundSectionRef
        }
        const y:number = ref[target].current.offsetParent.offsetTop + ref[target].current.offsetTop - tabHeight + 1;
        window.scrollTo(0, y);
      }
      const tabHeight:number = 161; //109 + 52
      useEffect(() => {
        const handleScroll = () => {
          if(DetailInfoContainerRef.current && termsSectionRef.current && userinfoSectionRef.current && refundSectionRef.current) { // && askSectionRef.current
            const parentOffsetTop = DetailInfoContainerRef.current.offsetTop;  
            const onTermsSection = window.scrollY+tabHeight < userinfoSectionRef.current.offsetTop + parentOffsetTop;
            const onUserinfoSection = window.scrollY+tabHeight >= userinfoSectionRef.current.offsetTop + parentOffsetTop && window.scrollY+tabHeight < refundSectionRef.current.offsetTop + parentOffsetTop;
            const onRefundSection = window.scrollY+tabHeight >= refundSectionRef.current.offsetTop + parentOffsetTop; //&& window.scrollY+tabHeight < askSectionRef.current.offsetTop
            // const onAskSection = window.scrollY+tabHeight >= askSectionRef.current.offsetTop;
    
            if(onTermsSection){
              setActiveTab('terms');
            }
            else if(onUserinfoSection){
              setActiveTab('userinfo');
            }
            else if(onRefundSection){
              setActiveTab('refund');
            }
            // else if(onAskSection){
            //   setActiveTab('ask');
            // }
          }
        };
        window.addEventListener('scroll', handleScroll);
      },[]);

    return(
        <Container>
            <div style={{position : "absolute", marginLeft : "100px"}}>testsetsetset</div>
            <AgreeTab create={{ terms: { sectionRef: 'terms' },
                          userinfo: { sectionRef: 'userinfo' },
                          refund: { sectionRef: 'refund' }
                        }}
                    active={activeTab}
                    scrollfn={windowScroll}
                    />
            <DetailInfo>
              <DetailInfoContainer className="wrap" ref={DetailInfoContainerRef}>
                <DetailContent>
                  <section ref={termsSectionRef}>이용약관
                  <br/><br/><br/><br/><br/><br/><br/><br/>
                  <br/><br/><br/><br/><br/><br/><br/><br/>
                  <br/><br/><br/><br/><br/><br/><br/><br/>
                  <br/><br/><br/><br/><br/><br/><br/><br/>
                  </section>
                  <section ref={userinfoSectionRef}>개인정보개인정보
                  <br/><br/><br/><br/><br/><br/><br/><br/>
                  <br/><br/><br/><br/><br/><br/><br/><br/>
                  <br/><br/><br/><br/><br/><br/><br/><br/>
                  </section>
                  <section ref={refundSectionRef}>환불환불환불
                  <br/><br/><br/><br/><br/><br/><br/><br/>
                  <br/><br/><br/><br/><br/><br/><br/><br/>
                  </section>
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
    width: 1300px;
    height: 907px;
    left: 310px;
    top: 164px;

    background: ${Colors.gray1};
    border-radius: 20px;
`;

const DetailInfo = styled.div`
  background-color: ${Colors.gray6};
  padding-top: 9px;
  padding-bottom: 209px;
  border-radius: 0px 0px 20px 20px;
`;
const DetailInfoContainer = styled.div`
  margin-top : 172px;
  display: flex;
  align-items: flex-start;
  position: relative;
`;
const DetailContent = styled.div`
  flex-basis: 832px;
`;