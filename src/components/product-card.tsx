import React, { useState } from "react";
import styled from "@emotion/styled";
import { Box, Tags, Colors } from "./ui";
import { LikeBtn } from "./like-button";
import { Price } from "./price";
import Thumbnail from "./product-card-thumb";

// Heading
interface IProductCardProps {
  id: number;
  label: string | undefined;
  title: string;
  likes: number;
  img: string;
  tag: string[];
  price: number;
  discountPrice: number | undefined;
}
export const ProductCard: React.FC<IProductCardProps> = ({ id, label, title, likes, img, tag, price, discountPrice }) => {
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
      <Label>{label}</Label>
      <Box shadow={1} round>
        <a href={`/detail/${id}`}>
          <Thumbnail url={img}/>
        </a>
        <ProductInfo>
          <a href={`/detail/${id}`}>
            <Title>{title}</Title>
          </a>
          <Tags data={tag} />
          <LikesAndPrice>
            <Likes>
              <LikeBtn small state={userLikeState} onClick={chageUserLikeState} />
              <LikesCount>{likesCount}</LikesCount>
            </Likes>
            <Price discountPrice={discountPrice} price={price} />
          </LikesAndPrice>
        </ProductInfo>
      </Box>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
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