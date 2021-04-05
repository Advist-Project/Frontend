import styled from "@emotion/styled";
import { Text, Colors } from "components/ui";

export const Footer = () => {
  return (
    <footer>
      <div className="wrap">
        <LogoArea>
          <img src="/logo.png" height="44" />
          <Text>더 많은 사람들이 일에서 성취감을 얻고 성장할 수 있도록 지원합니다.</Text>
        </LogoArea>
        <TextInfo>
          <Column1>
            <InfoList>
              <li>
                <label>상호명</label>
                어드바이스트
              </li>
              <li>
                <label>대표</label>
                김태원
              </li>
              <li>
                <label>개인정보보호책임</label>
                김태원
              </li>
              <li>
                <label>사업자등록번호</label>
                205-40-75437
              </li>
              <li>
                <label>통신판매업번호</label>
                2021-서울서초-0571
              </li>
              <li>
                <label>호스팅 사업자</label>
                Amazon Web Service(AWS)
              </li>
            </InfoList>
          </Column1>
          <Column2>
            <InfoList>
              <li>
                <label className="dark">고객센터</label>
                평일 오전 10시 - 오후 6시 (공휴일 제외)
              </li>
              <li>
                <label>이메일</label>
                timkim@advist.kr
              </li>
              <li>
                <label>전화번호</label>
                010-4710-5582
              </li>
            </InfoList>
          </Column2>
          <Column3>
            <InfoList>
              <li>
                <a>이용약관</a>
              </li>
              <li>
                <a>개인정보 처리방침</a>
              </li>
              <li>
                <a>교환/환불 정책</a>
              </li>
            </InfoList>
          </Column3>
        </TextInfo>
      </div>
      <Copylight>
        <div className="wrap">
          어드바이스트는 통신판매중개업자이며, 통신판매의 당사자가 아닙니다. 상품, 상품정보, 거래에 관한 의무와 책임은 판매회원에게 있습니다. <br/>
          어드바이스트의 상품/코치/중개 서비스/거래 정보, 콘텐츠, UI등에 대한 무단복제, 전송, 배포, 스크래핑 등의 행위는 저작권법, 콘텐츠산업 진흥법 등  관련 법령에 의하여 엄격히 금지됩니다.
        </div>
      </Copylight>
    </footer>
  )
}

const LogoArea = styled.div`
  margin: 60px 0;
  display: flex;
  align-items: center;
  color: ${Colors.gray2};

  > img {
    margin-right: 68px;
  }
`;

const TextInfo = styled.div`
  display: flex;
  margin-bottom: 50px;
`;
const Column1 = styled.div`
  flex-basis: 602px;
`;
const Column2 = styled.div`
  flex-basis: 596px;
`;
const Column3 = styled.div`
  flex-shrink: 0;
`;

const InfoList = styled.ul`
  li {
    margin-bottom: 8px;
    font-size: 14px;
    line-height: 24px;
    color: ${Colors.gray2};
  }
  label {
    color: ${Colors.gray3};
    margin-right: 16px;
  }
  label.dark, a {
    font-weight: 500;
    color: ${Colors.gray1};
  }
`;

const Copylight = styled.div`
  border-top: 1px solid ${Colors.gray4};
  color: ${Colors.gray3};
  padding: 40px 0 46px;
  text-align: center;
  font-size: 14px;
  line-height: 24px;
  word-break: keep-all;
`;