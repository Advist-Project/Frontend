import styled from "@emotion/styled";
import { min, max, Colors, ToggleBtn } from "components/ui";
import { Headline, Title, Desc, Hr } from "./common-styles";
import { priceFormat } from "components/formatter";

export function PaymentSection({itemInfo}: any){
  const OrderInfo = styled.section`
    ${min[1]}{
      padding: 24px 0;
    }
  `;
  const PaymentInfo = styled.section`
    padding: 16px 0;
    
    ${min[1]}{
      padding: 24px 0;
    }
  `;

  return (
    <>
    <OrderInfo>
      <Headline>
        <Title>주문 정보</Title>
        <Desc>주문 정보를 다시 한번 확인해주세요.</Desc>
      </Headline>
      <ItemInfo>
        <ItemImg src={`/detail/${itemInfo.itemId}/thumb.png`}/>
        <OrderInfoText>
          <ItemTitle>{itemInfo.itemName}</ItemTitle>
          {
            itemInfo.option.type === "workbook" ?
            <Type>[워크북] 업무에 활용했던 자료들입니다.</Type> :
            <Type>[코칭] {itemInfo.option.title}</Type>
          }
        </OrderInfoText>
      </ItemInfo>
    </OrderInfo>
    <Hr/>
    <PaymentInfo>
      <Headline>
        <Title>결제 정보</Title>
      </Headline>
      <PriceInfo>
        <dt>상품 금액</dt>
        <dd>{priceFormat(itemInfo.option.price)}원</dd>
        <dt>할인 금액</dt>
        <dd>{priceFormat(itemInfo.option.discountPrice - itemInfo.option.price)}원</dd>
        <dt className="finalPrice">최종 결제금액</dt>
        <dd className="finalPrice">{priceFormat(itemInfo.option.discountPrice)}원</dd>
      </PriceInfo>
    </PaymentInfo>
    </>
  )
}

const ItemInfo = styled.div`
  margin-top: 20px;

  ${min[1]}{
    display: flex;
    align-items: flex-start;
    margin-top: 40px;
  }
`;

const ItemImg = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;

  ${min[1]}{
    width: 172px;
    height: 96px;
  }
`;

const OrderInfoText = styled.div`
  margin: 12px 0 16px 0;

  ${min[1]}{
    margin: 0 0 0 36px;
  }
`;

const ItemTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 160%;
  margin-bottom: 4px;

  ${min[1]}{
    font-size: 16px;
    margin-bottom: 10px;
  }
`;

const Type = styled.p`
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 160%;
  color: ${Colors.primary};

  ${min[1]}{
    font-size: 14px;
  }
`;

const PriceInfo = styled.dl`
  display: flex;
  flex-wrap: wrap;
  font-size: 0.875rem;
  line-height: 36px;
  margin-top: 8px;
  margin-bottom: -10px;

  ${min[1]}{
    font-size: 16px;
    line-height: 40px;
    margin-top: 26px;
    margin-bottom: -10px;
  }

  dt {
  width: 200px;
  }
  dd {
  width: calc(100% - 200px);
  text-align: right;
  font-weight: 500;
  }
  .finalPrice {
  color: ${Colors.primary};
  font-weight: 500;
  }
`;

export function PaymentSectionMethod({method, setMethod, setPg}: any){
  const Section = styled.section`
    padding: 16px 0;

    ${min[1]}{
      padding: 24px 0;
    }
  `;
  const Methods = styled.div`
    margin-top: 20px;

    ${max[1]}{
      > button {
        width: 100%;
        padding: 4px;
        border-radius: 10px;
        margin-bottom: 8px;
        font-size: 0.875rem;
      }
    }

    ${min[1]}{
      display: flex;
      margin-left: -5px;
      margin-right: -5px;
      margin-bottom: 12px;
    
      > button {
        flex-grow: 1;
        margin: 0 5px;
      }
    }
  `;
  
    return (
      <Section>
        <Headline>
          <Title>결제 수단</Title>
        </Headline>
        <Methods>
          <ToggleBtn className={method === 'card' ? 'active' : ''}
                    onClick={()=>{setPg('danal');setMethod('card');}}>카드결제</ToggleBtn>
          {/* <ToggleBtn className={pg === 'kakao' ? 'active' : ''}
                    onClick={()=>{setPg('kakao');setMethod('easy');}}>카카오페이</ToggleBtn>
          <ToggleBtn className={pg === 'npay' ? 'active' : ''}
                    onClick={()=>{setPg('npay');setMethod('');}}>네이버페이</ToggleBtn> */}
        </Methods>
      </Section>
    )
  }



export function PaymentSectionAgree({agree, setAgree, onClickListener}: any){
  const Section = styled.section`
    ${min[1]}{
      padding: 14px 0 24px;
    }
  `;
  const Agree = styled.div`
    font-size: 0.75rem;
    padding-left: 22px;
    line-height: 160%;

    input[type=checkbox] {
      display: none;
    }
    input[type=checkbox] + label::before {
      content: '';
      display: inline-block;
      width: 12px;
      height: 12px;
      vertical-align: middle;
      margin: 0 8px 0 -22px;
      border-radius: 1px;
      border: 1px solid #6E7191;
    }
    input[type=checkbox]:checked + label::before {
      border-color: ${Colors.primary};
      background: url('/icon/done_24px.svg') center/10px 8px no-repeat;
      background-color: ${Colors.primary};
    }
    input[type=checkbox] + label {
      cursor: pointer;
    }

    .highlight {
      color: ${Colors.primary};
      border-bottom: 1px ${Colors.primary} solid;
      cursor: pointer;
    }

    ${min[1]}{
      font-size: 14px;
      text-align: center;
      padding-left: 0;
      margin-bottom: 3px;

      input[type=checkbox] + label::before {
        width: 24px;
        height: 24px;
        margin: 0 15px 0 0;
        border-radius: 4px;
      }
      input[type=checkbox]:checked + label::before {
        background-size: 17px 13px;
      }
    }
  `;

  return (
    <Section>
      <Agree>
        <input id="ag" type="checkbox" onChange={()=>setAgree(!agree)} checked={agree} />
        <label htmlFor="ag">주문 내용을 확인하였으며, <label className="highlight" onClick={onClickListener}>서비스 취소/환불 정책</label> 및 결제에 동의합니다. (필수)</label>
      </Agree>
    </Section>
  )
}