import styled from "@emotion/styled";
import { Colors } from "components/ui";
import { Heading, Box } from "components/ui";

export default function CompanyLinks(){
  return (
    <>
      <Headline>
        <Heading level={2} bold><Small>다양한 기업이 직원 성장을 위해 </Small><br/><Highlight>어드바이스트</Highlight>를 활용하고 있어요</Heading>
      </Headline>

      <div className="wrap">
        <CompanyList>
          <CompanyCard img="/logo/cppay.png" name="쿠팡페이" />
          <CompanyCard img="/logo/axa.png" name="AXA" />
          <CompanyCard img="/logo/mrntd.png" name="mrntd" />
          <CompanyCard img="/logo/fdding.png" name="프딩" />
          <CompanyCard img="/logo/fdding.png" name="프딩" />
        </CompanyList>
        <CompanyList>
          <CompanyCard img="/logo/cppay.png" name="쿠팡페이" />
          <CompanyCard img="/logo/axa.png" name="AXA" />
          <CompanyCard img="/logo/mrntd.png" name="mrntd" />
          <CompanyCard img="/logo/fdding.png" name="프딩" />
          <CompanyCard img="/logo/fdding.png" name="프딩" />
        </CompanyList>
      </div>
    </>
  )
}

function CompanyCard({ img, name }: any) {
  return (
    <Company>
      <Box shadow={1} round style={{ backgroundImage: `url(${img})` }} className="logo"/>
      <span>{ name }</span>
    </Company>
  )
}

const Headline = styled.div`
  background: ${Colors.primary};
  color: ${Colors.white};
  text-align: center;
  padding: 38px;
  margin-bottom: 102px;
`;
const Highlight = styled.span`
  display: inline-block;
  background-color: ${Colors.secondary};
  color: ${Colors.black};
  font-weight: 700;
  padding-top: 8px;
`;
const Small = styled.span`
  font-size: 0.7em;
`;
const CompanyList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 57px;
`;
const Company = styled.div`
  flex-grow: 1;
  text-align: center;

  .logo {
    width: 100px;
    height: 100px;
    background-size: cover;
    margin: 0 auto 35px;
  }
`;