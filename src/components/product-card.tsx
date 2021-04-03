import React, { useState } from "react";
import styled from "@emotion/styled";
import { Box, Tags, Colors } from "./ui";
import Image from 'next/image';
import { LikeBtn } from "./like-button";

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
    <Box shadow={1}>
      <Thumbnail>
        <Label>{label}</Label>
        <Image
          src={img}
          alt=""
          width={412}
          height={232}
        />
      </Thumbnail>
      <Title>{title}</Title>
      <Tags data={tag} />
      <div>
        <Likes>
          <LikeBtn small state={userLikeState} onClick={chageUserLikeState} />
          <LikesCount>{likesCount}</LikesCount>
        </Likes>
        {price}
        {discount}
      </div>
    </Box>
  )
}

const Label = styled.div`
  position: absolute;
`;
const Thumbnail = styled.div`
  position: relative;
`;
const Title = styled.h3`
  font-size: 20px;
  line-height: 125%;
  margin-top: 24px;
`;
const Likes = styled.div`
  display: flex;
  align-items: center;
`;
const LikesCount = styled.span`
  color: ${Colors.primary};
  font-size: 14px;
`;