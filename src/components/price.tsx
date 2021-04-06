import styled from "@emotion/styled";
//import { Colors } from "./ui";
import { Colors } from "./_design/colors";
import { priceFormat } from "./formatter";

// Heading
interface IProductCardProps {
  discount: number | undefined;
  price: number;
}
export const Price: React.FC<IProductCardProps> = ({ discount, price }) => {
  return (
    <div>
      {
        discount && discount > 0 ?
        <Wrap> {/* 할인 정보 있는 경우 */}
          <BasePrice>{priceFormat(price)}원</BasePrice>
          <Discount>
            <DiscountPercent>{discount}%</DiscountPercent>
            <FinalPrice>{priceFormat(price * ((100 - discount) / 100))}원</FinalPrice>
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
  color: ${Colors.gray3};
  font-size: 20px;
  margin-bottom: 12px;
`;
const Discount = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const DiscountPercent = styled.div`
  color: ${Colors.primary};
  font-size: 28px;
  font-weight: 700;
  margin-right: 16px;
`;
const FinalPrice = styled.div`
  font-size: 28px;
  font-weight: 700;
`;