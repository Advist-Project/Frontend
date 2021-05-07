import React from "react";
import styled from "@emotion/styled";
import { Colors } from "components/ui";

// Heading
interface IAnchorTabProps {
  create: any;
  active: string;
  scrollfn: any;
}
const AnchorTab: React.FC<IAnchorTabProps> = ({ create, active, scrollfn }) => {

  const tab:{[key:string]: any} = {
    workbook: { value: "워크북", icon: '/icon/workbook_set_64p.svg', sectionRef: '', ...create.workbook },
    coaching: { value: "코칭", icon: '/icon/coach_set_64p.svg', sectionRef: '', ...create.coaching },
    review: { value: "리뷰", icon: '/icon/review_set_64p.svg', sectionRef: '', ...create.review },
    ask: { value: "문의", icon: '/icon/ask_set_64p.svg', sectionRef: '', ...create.ask }
  }

  const AnchorTab = styled.div`
    height: 109px;
    background: ${Colors.white};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    position: sticky;
    top: -1px;
    left: 0;
    z-index: 1;

    ul {
      display: flex;
    }
  `;
  const Tab = styled.li`
    flex-basis: 208px;
    height: 109px;
    text-align: center;
    line-height: 24px;
    cursor: pointer;

    .icon {
      display: block;
      width: 64px;
      height: 64px;
      margin: 6px auto 0;
      background-position: right center;
    }

    &.workbook {
      .icon {
        background-image: url(${tab.workbook.icon});
      }
    }
    &.coaching {
      .icon {
        background-image: url(${tab.coaching.icon});
      }
    }
    &.review {
      .icon {
        background-image: url(${tab.review.icon});
      }
    }
    &.ask {
      .icon {
        background-image: url(${tab.ask.icon});
      }
    }


    &.active {
      border-bottom: 8px ${Colors.secondary} solid;

      .icon {
        background-position: left center;
      }
    }
  `;

  return (
    <AnchorTab>
      <div className="wrap">
        <ul>
          {
            Object.keys(create).map((type, i) => (
              <Tab key={i} className={`${type} ${active === tab[type].sectionRef ? 'active' : ''}`} onClick={()=>{scrollfn(type)}}>
                <div className="icon"/>
                {tab[type].value}
              </Tab>
          ))}
        </ul>
      </div>
    </AnchorTab>
  )
}

// Agree
interface IAgreeTabProps {
  create: any;
  active: string;
  clicktab : any;
}
export const AgreeTab: React.FC<IAgreeTabProps> = ({ create, active, clicktab }) => {
  const tab:{[key:string]: any} = {
    terms: { value: "이용약관", sectionRef: '', ...create.terms },
    userinfo: { value: "개인정보 처리방침", sectionRef: '', ...create.userinfo },
    refund: { value: "환불 정책", sectionRef: '', ...create.refund },
  }

  const AgreeTab = styled.div`
    border-radius: 20px 20px 0px 0px;
    padding-top: 100px;
    height: 209px;
    background: ${Colors.white};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    position: relative;
    z-index: 1;
    ul {
      display: flex;
      justify-content : center;
    }
  `;

  const Tab = styled.li`
    flex-basis: 353px;
    height: 109px;
    text-align: center;
    line-height: 109px;
    cursor: pointer;

    font-family: Spoqa Han Sans Neo;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    letter-spacing: 0px;
    color : ${Colors.gray2};

    &.active {
      border-bottom: 8px ${Colors.secondary} solid;
      color : ${Colors.secondary};
    }
  `;

  return (
    <AgreeTab>
      <div className="wrap">
        <ul>
          {
            Object.keys(create).map((type, i) => (
              <Tab key={i} className={`${type} ${active === tab[type].sectionRef ? 'active' : ''}`} onClick={()=>{clicktab(tab[type].sectionRef)}}>
                {tab[type].value}
              </Tab>
          ))}
        </ul>
      </div>
    </AgreeTab>
  )
}

export default React.memo(AnchorTab);