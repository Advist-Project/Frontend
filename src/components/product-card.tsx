import React, { useState } from "react";
import styled from "@emotion/styled";
import { Box, Tags, Colors } from "./ui";
import Image from 'next/image';
import { LikeBtn } from "./like-button";
import { priceFormat } from "./formatter";

// Heading
interface IProductCardProps {
  label: string | undefined;
  title: string;
  likes: number;
  img: string;
  tag: string[];
  price: number;
  discount: number | undefined;
}
export const ProductCard: React.FC<IProductCardProps> = ({ label, title, likes, img, tag, price, discount }) => {
  const [likesCount, setLikesCount] = useState<number>(likes);
  const [userLikeState, setUserLikeState] = useState<boolean>(true);

  const chageUserLikeState = () => {
    if(userLikeState){
      setLikesCount(likesCount - 1);
      setUserLikeState(false);
    } else {
      setLikesCount(likesCount + 1);
      setUserLikeState(true);
    }
  }

  return (
    <Container className="productCard">
      <Box shadow={1} round>
        <Thumbnail>
          <Label>{label}</Label>
          <Image
            src={img}
            alt=""
            width={412}
            height={232}
          />
        </Thumbnail>
        <ProductInfo>
          <Title>{title}</Title>
          <Tags data={tag} />
          <LikesAndPrice>
            <Likes>
              <LikeBtn small state={userLikeState} onClick={chageUserLikeState} />
              <LikesCount>{likesCount}</LikesCount>
            </Likes>
            {
              discount && discount > 0 ?
              <PriceWrap>
                <OriginalPrice>{priceFormat(price)}원</OriginalPrice>
                <Discount>
                  <DiscountPercent>{discount}%</DiscountPercent>
                  <Price>{priceFormat(price * ((100 - discount) / 100))}원</Price>
                </Discount>
              </PriceWrap> :
              <PriceWrap>
                <Price>{price}원</Price>
              </PriceWrap>
            }
          </LikesAndPrice>
        </ProductInfo>
      </Box>
    </Container>
  )
}

const Container = styled.div`
  cursor: pointer;
`;
const Label = styled.div`
  position: absolute;
  z-index: 1;
  top: 10px;
  left: 20px;
  width: 84px;
  height: 32px;
  padding: 10px 0 0;
  border-radius: 16px;
  text-align: center;
  background: rgba(255,208,51,0.8);
`;
const Thumbnail = styled.div`
  position: relative;
`;
const ProductInfo = styled.div`
  padding: 24px 20px 20px;
`;
const Title = styled.h3`
  font-size: 16px;
  font-weight: 500;
  line-height: 125%;
  word-break: keep-all;
  margin-bottom: 16px;
`;

const LikesAndPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 32px;
`;
const Likes = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: -8px;
`;
const LikesCount = styled.span`
  color: ${Colors.primary};
  font-size: 14px;
`;
const PriceWrap = styled.div`
  text-align: right;
`;
const OriginalPrice = styled.div`
  text-decoration: line-through;
  text-decoration-thickness: 1px;
  color: ${Colors.gray3};
  font-size: 20px;
  margin-bottom: 12px;
`;
const Discount = styled.div`
  display: flex;
`;
const DiscountPercent = styled.div`
  color: ${Colors.primary};
  font-size: 28px;
  font-weight: 700;
  margin-right: 16px;
`;
const Price = styled.div`
  font-size: 28px;
  font-weight: 700;
`;