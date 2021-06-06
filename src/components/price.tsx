import styled from "@emotion/styled";
import { Colors } from "./_design/colors";
import { priceFormat } from "./formatter";

// Heading
interface IPriceProps {
  // discount: number | undefined;
  price: number;
  discountPrice: number | undefined;
}
export const Price: React.FC<IPriceProps> = ({ price, discountPrice }) => {
  const dcPrice = discountPrice ? discountPrice : 0;
  const discountPercent = Math.floor(100 - dcPrice / price * 100);
  const isDiscounted = discountPercent > 0;

  return (
    <div>
      {
        isDiscounted ?
        <Wrap> {/* 할인 정보 있는 경우 */}
          <BasePrice>{priceFormat(price)}원</BasePrice>
          <Discount>
            <DiscountPercent>{discountPercent}%</DiscountPercent>
            <FinalPrice>{priceFormat(dcPrice)}원</FinalPrice>
          </Discount>
        </Wrap> :
        <Wrap> {/* 할인 정보 없는 경우 */}
          <FinalPrice>{priceFormat(price)}원</FinalPrice>
        </Wrap>
      }
    </div>
  )
}

const Wrap = styled.div`
  text-align: right;
`;
const BasePrice = styled.div`
  text-decoration: line-through;
  text-decoration-thickness: 1px;
  font-size: 0.9em;
  color: ${Colors.gray3};
  margin-bottom: 0.5em;

  @media (min-width: 769px) {
    font-size: 1.25em;
    margin-bottom: 12px;
  }
  @media (min-width: 992px) and (max-width: 1100px) {
    font-size: 1em;
  }
`;
const Discount = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const DiscountPercent = styled.div`
  color: ${Colors.primary};
  font-weight: 700;
  font-size: 1.2em;
  margin-right: 0.5em;

  @media (min-width: 769px) {
    font-size: 1.75em;
    margin-right: 16px;
  }
  @media (min-width: 992px) and (max-width: 1100px) {
    font-size: 1.45em;
    margin-right: 12px;
  }
`;
const FinalPrice = styled.div`
  font-weight: 700;
  font-size: 1.2em;

  @media (min-width: 769px) {
    font-size: 1.75em;
  }
  @media (min-width: 992px) and (max-width: 1100px) {
    font-size: 1.45em;
  }
`;