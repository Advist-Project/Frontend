import styled from "@emotion/styled";
import { Colors } from "components/ui";

// Heading
interface IAnchorTabProps {
  create: any;
  active: string;
}
export const AnchorTab: React.FC<IAnchorTabProps> = ({ create, active }) => {
  const AnchorTab = styled.div`
    height: 109px;
    background: ${Colors.white};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    position: sticky;
    top: 0;
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

    img {
      display: block;
      margin: 6px auto 0;
    }

    &.active {
      border-bottom: 8px ${Colors.secondary} solid;
    }
  `;
  const tab:{[key:string]: any} = {
    workbook: { value: "워크북", icon: '/Workbook.png', icon_active: '/icon/workbook_64p.svg', sectionRef: '', ...create.workbook },
    coaching: { value: "코칭", icon: '/icon/coach_gray_64p.svg', icon_active: '/icon/coach_64p.svg', sectionRef: '', ...create.coaching },
    review: { value: "리뷰", icon: '/icon/review_gray_64p.svg', icon_active: '/review_64p.svg', sectionRef: '', ...create.review },
    qna: { value: "문의", icon: '/icon/ask_gray_64p.svg', icon_active: '/icon/ask_64p.svg', sectionRef: '', ...create.qna }
  }

  console.log(tab);

  return (
    <AnchorTab>
      <div className="wrap">
        <ul>
          {
            Object.keys(create).map((type, i) => (
              <Tab key={i} className={active === tab[type].sectionRef ? 'active' : ''}>
                <img src={active === tab[type].sectionRef ? tab[type].icon_active : tab[type].icon} />
                {tab[type].value}
              </Tab>
          ))}
        </ul>
      </div>
    </AnchorTab>
  )
}