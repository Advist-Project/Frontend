import styled from "@emotion/styled";
import { min, Colors, Tags } from "components/ui";

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
          desc.split('\\n').map(( line, idx ) => {
            return (<span key={idx}>{line}<br/></span>)
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
  max-width: 256px;
  height: 332px;
  padding: 32px 20px 18px;
  background: #FCFCFC;
  box-shadow: 0px 20px 24px rgba(17, 17, 17, 0.06);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 35px;
  margin-left: 20px;
  margin-right: 20px;

  ${min[1]} {
    max-width: 600px;
    height: 480px;
    padding: 40px 100px 60px;
    border-radius: 20px;
    margin-left: 40px;
    margin-right: 40px;
  }
`;

const Title = styled.h4`
  font-size: 0.875rem;
  line-height: 150%;
  text-align: center;

  &::after {
    content: '';
    display: block;
    width: 40px;
    height: 1px;
    background: ${Colors.gray3};
    margin: 20px auto 28px;
  }

  ${min[1]}{
    font-size: 1.25rem;

    &::after {
      width: 100px;
      height: 2px;
      margin: 44px auto 36px;
    }
  }
`;

const Company = styled.span`
  font-weight: 700;
`;

const Desc = styled.p`
  max-width: 400px;
  margin: 0 auto;
  font-size: 0.625rem;
  line-height: 171%;
  text-align: justify;

  ${min[1]}{
    font-size: 0.875rem;
  }
`;

const TagWrap = styled.div`
  width: 100%;
  max-width: 400px;
  text-align: left;
  font-size: 0.625rem;

  ${min[1]}{
    font-size: 1rem;
  }
`;