import styled from "@emotion/styled";
import { min, max, Colors } from "components/ui";
import { AgreePage } from "components/agree";
import React, { useState } from 'react';

export const Footer = () => {
  const [ClickTab, setClickTab] = useState<string>("terms");
  const [AgreeModal, setAgreeModal] = useState<boolean>(false);

  function onClickListener(){
    setAgreeModal(true);
    document.body.style.overflow = 'hidden';
  }

  const bizUrl = "https://www.ftc.go.kr/bizCommPop.do?wrkr_no=2054075437";
  function popupModal(){
    window.open(bizUrl, "bizCommPop", "width=750, height=700,left='+ popupX + ', top='+ popupY ;");
  }
  return (
    <footer>
          {                
            AgreeModal ? <AgreePage setActiveTab={ClickTab} setAgreeModal={setAgreeModal}/> : null
          }
      <div className="wrap">
        <LogoArea>
          <img src="/logo.png" />
          <p>더 많은 사람들이 일에서 성취감을 얻고 성장할 수 있도록 지원합니다.</p>
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
              <li className="bizNum_pc" onClick = {popupModal} style={{cursor : "pointer"}}>
                <label>통신판매업번호</label>
                <u>2021-서울서초-0571</u>
              </li>
              <li className="bizNum_mo" style={{cursor : "pointer"}}>
                <a href={bizUrl} target="_blank">
                  <label>통신판매업번호</label>
                  <u>2021-서울서초-0571</u>
                </a>
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
                <label className="dark cs">고객센터</label>
                평일 오전 10시 - 오후 6시 (공휴일 제외)
              </li>
              <li className="email">
                <label>이메일</label>
                tmsnvl031@gmail.com
              </li>
              <li className="tel">
                <label>전화번호</label>
                070-8064-4534
              </li>
            </InfoList>
          </Column2>
          <Column3>
            <InfoList onClick={onClickListener} style={{cursor : "pointer"}}>
              <li className="policy">
                <a onClick={() => setClickTab("terms")}>이용약관</a>
              </li>
              <li className="policy">
                <a onClick={() => setClickTab("userinfo")}>개인정보 처리방침</a>
              </li>
              <li className="policy">
                <a onClick={() => setClickTab("refund")}>교환/환불 정책</a>
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
  margin: 16px 0 14px;
  display: flex;
  align-items: center;
  color: ${Colors.gray2};
  
  img {
    height: 13px;
    margin-right: 12px;
  }
  p {
    font-size: 7px;
    line-height: 150%;
    word-break: keep-all;
  }
  ${max[1]} {
    padding-bottom: 16px;
    border-bottom: 1px ${Colors.gray3} solid;
  }

  ${min[1]} {
    margin: 60px 0;

    img {
      height: 44px;
      margin-right: 68px;
    }
    p {
      font-size: 14px;
    }
  }
`;

const TextInfo = styled.div`
  display: flex;
  margin-bottom: 28px;
  font-size: 7px;
  flex-wrap: wrap;
  
  ${min[1]}{
    flex-wrap: nowrap;
    font-size: 14px !important;
    line-height: 24px;
    margin-bottom: 50px;
  }
`;
const Column1 = styled.div`
  order: 2;
  flex-basis: 100%;

  ${min[0]}{
    order: 1;
    flex-basis: 50%;
  }
  ${min[1]}{
    flex-basis: 602px;
  }
`;
const Column2 = styled.div`
  order: 1;
  flex-basis: 100%;
  border-bottom: 1px ${Colors.gray5} solid;
  margin-bottom: 12px;

  ${min[0]}{
    order: 2;
    flex-basis: 50%;
    border-bottom: 0;
  }
  ${min[1]}{
    flex-basis: 596px;
  }
`;
const Column3 = styled.div`
  flex-shrink: 0;
  order:3;

  ${max[1]} {
    width: 100%;
    
    ul {
      display: flex;
      justify-content: space-around;
      margin-top: 25px;
    }
  }
`;

const InfoList = styled.ul`
  li {
    margin-bottom: 8px;
    color: ${Colors.gray2};

    &.bizNum_pc { display: none }
    &.bizNum_mo { display: block }

    ${min[1]} {
      &.bizNum_pc { display: block }
      &.bizNum_mo { display: none }
    }

    a {
      color: ${Colors.gray2};
      font-weight: 400;
    }
  }

  label {
    color: ${Colors.gray3};
    margin-right: 8px;
  }
  label.dark, a {
    font-weight: 500;
    color: ${Colors.gray1};
  }

  ${max[1]}{
    label.cs {
      display: block;
      margin-bottom: 8px;
    }
    li.email,
    li.tel {
      display: inline-block;
    }
    li.email {
      border-right: 1px ${Colors.gray3} solid;
      margin-right: 8px;
      padding-right: 8px;
    }
    li.email label,
    li.tel label {
      display: none;
    }
    li.policy {
      display: inline-block;
      line-height: 14px;
      flex-grow: 1;
      text-align: center;
      border-right: 1px ${Colors.gray3} solid;

      &:last-of-type {
        border-right: 0;
      }
    }
  }
  ${min[1]}{
    label {
      margin-right: 16px;
    }
  }
`;

const Copylight = styled.div`
  border-top: 1px solid ${Colors.gray4};
  color: ${Colors.gray3};
  padding: 25px 0 28px;
  text-align: center;
  font-size: 7px;
  line-height: 170%;
  word-break: keep-all;

  ${min[1]} {
    padding: 40px 0 46px;
    font-size: 14px;
  }
`;