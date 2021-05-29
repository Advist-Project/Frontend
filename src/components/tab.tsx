import React from "react";
import styled from "@emotion/styled";
import { Colors, min, max } from "components/ui";

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
    flex-basis: 30%;
    height: 72px;
    text-align: center;
    font-size: 0.75rem;
    line-height: 150%;
    color: ${Colors.gray2};
    cursor: pointer;

    .icon {
      display: block;
      width: 40px;
      height: 40px;
      margin: 6px auto 0;
      background-position: right center;
      background-size: auto 100%;
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
      color: ${Colors.black};
      border-bottom: 4px ${Colors.secondary} solid;

      .icon {
        background-position: left center;
      }
    }

    ${min[1]}{
      font-size: 1rem;
      flex-basis: 208px;
      height: 109px;

      .icon {
        width: 64px;
        height: 64px;
      }
      &.active {
        border-bottom: 8px ${Colors.secondary} solid;
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

// myPage
interface IMypageTabProps {
  create: any;
  active: string;
  clicktab : any;
}
export const MypageTab: React.FC<IMypageTabProps> = ({ create, active, clicktab }) => {
  const tab:{[key:string]: any} = {
    mybuying: { value: "내 구매내역", sectionRef: '', ...create.mybuying },
    mypick: { value: "찜한내역", sectionRef: '', ...create.mypick },
  }

  const MypageTab = styled.div`
    border-radius: 20px 20px 0px 0px;
    height: 109px;
    background: ${Colors.white};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    position: relative;
    z-index: 1;
    ul {
      display: flex;
      justify-content : center;
    }
    ${max[1]}{
      height : 44px;
    }    
  `;

  const Tab = styled.li`
    flex-basis: 650px;
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
      ${max[1]}{
        border-bottom: 4px ${Colors.secondary} solid;
      }        
    }
    ${max[1]}{
      height : 44px;
      font-size: 3vw;
      line-height: 44px;
      letter-spacing: 0px;
      text-align: center;
    }    
  `;

  return (
    <MypageTab>
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
    </MypageTab>
  )
}

export default React.memo(AnchorTab);