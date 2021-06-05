import styled from "@emotion/styled";
import { Colors, Tags } from "components/ui";

interface ICoachProps {
  company: string;
  team: string;
  desc: string;
  tag: any[];
}

export const Coach: React.FC<ICoachProps> = ({company, team, desc, tag}) => {

  return (
    <Box>
      <div>
        <Title>
          <Company>{company}</Company><br/>
          <span>{team}</span>
        </Title>
        <Desc>
        {
          desc.split('\\n').map( line => {
            return (<span>{line}<br/></span>)
          })
        }
        </Desc>
      </div>
      <TagWrap>
        <Tags data={tag}/>
      </TagWrap>
    </Box>
  )
}

const Box = styled.div`
  padding: 40px 100px 60px;
  background: #FCFCFC;
  box-shadow: 0px 20px 24px rgba(17, 17, 17, 0.06);
  border-radius: 20px;
  max-width: 600px;
  height: 480px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 35px;
  margin-left: 40px;
  margin-right: 40px;
`;

const Title = styled.h4`
  font-size: 20px;
  line-height: 150%;
  text-align: center;

  &::after {
    content: '';
    display: block;
    width: 100px;
    height: 2px;
    background: ${Colors.gray3};
    margin: 44px auto 36px;
  }
`;

const Company = styled.span`
  font-weight: 700;
`;

const Desc = styled.p`
  max-width: 400px;
  margin: 0 auto;
  font-size: 14px;
  line-height: 171%;
  text-align: justify;
`;

const TagWrap = styled.div`
  width: 100%;
  max-width: 400px;
  text-align: left;
`;