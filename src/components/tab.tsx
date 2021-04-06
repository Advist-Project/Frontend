import styled from "@emotion/styled";

// Heading
interface IAnchorTabProps {
  active: string[];
}
export const AnchorTab: React.FC<IAnchorTabProps> = ({ active }) => {
  const AnchorTab = styled.div`
    height: 109px;
    background: #FCFCFC;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    position: sticky;
    top: 0;
    z-index: 1;
  `;
  const tab:{[key:string]: any} = {
    "workbook": { target: "wrkb", value: "워크북" },
    "coaching": { target: "coaching", value: "코칭" },
    "review": { target: "rv", value: "리뷰" },
    "qna": { target: "qna", value: "문의" }
  }

  return (
    <AnchorTab>
      <div className="wrap">
        <ul>
          {
            active.map((type, i) => (
              <li key={i}>{tab[type].value}</li>
          ))}
        </ul>
      </div>
    </AnchorTab>
  )
}