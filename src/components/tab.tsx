import React from "react";
import styled from "@emotion/styled";
import { Colors } from "components/ui";

// Heading
interface IAnchorTabProps {
  create: any;
  active: string;
}
const AnchorTab: React.FC<IAnchorTabProps> = ({ create, active }) => {

  const tab:{[key:string]: any} = {
    workbook: { value: "워크북", icon: '/icon/workbook_64p.svg', icon_active: '/icon/workbook_64p.svg', sectionRef: '', ...create.workbook },
    coaching: { value: "코칭", icon: '/icon/coach_gray_64p.svg', icon_active: '/icon/coach_64p.svg', sectionRef: '', ...create.coaching },
    review: { value: "리뷰", icon: '/icon/review_gray_64p.svg', icon_active: '/icon/review_64p.svg', sectionRef: '', ...create.review },
    ask: { value: "문의", icon: '/icon/ask_gray_64p.svg', icon_active: '/icon/ask_64p.svg', sectionRef: '', ...create.ask }
  }

  const AnchorTab = styled.div`
    height: 109px;
    background: ${Colors.white};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    position: sticky;
    top: 0;
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

    .icon {
      display: block;
      width: 64px;
      height: 64px;
      margin: 6px auto 0;
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
    }
    &.active.workbook {
      .icon {
        background-image: url(${tab.workbook.icon_active});
      }
    }
    &.active.coaching {
      .icon {
        background-image: url(${tab.coaching.icon_active});
      }
    }
    &.active.review {
      .icon {
        background-image: url(${tab.review.icon_active});
      }
    }
    &.active.ask {
      .icon {
        background-image: url(${tab.ask.icon_active});
      }
    }
  `;

  return (
    <AnchorTab>
      <div className="wrap">
        <ul>
          {
            Object.keys(create).map((type, i) => (
              <Tab key={i} className={`${type} ${active === tab[type].sectionRef ? 'active' : ''}`}>
                <div className="icon"/>
                {tab[type].value}
              </Tab>
          ))}
        </ul>
      </div>
    </AnchorTab>
  )
}

export default React.memo(AnchorTab);