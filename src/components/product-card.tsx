import React, { useState } from "react";
import styled from "@emotion/styled";
import { min, Tags, Colors } from "./ui";
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
  const [userLikeState, setUserLikeState] = useState<boolean>(false);

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
    <Product>
      <DesktopCard>
        <Label>{label}</Label>
        <a href={`/detail/${id}`}>
          <Thumbnail url={img}/>
        </a>
        <ProductInfo>
          <a href={`/detail/${id}`}>
            <Title>{title}</Title>
          </a>
          <Tags data={tag} gray />
          <LikesAndPrice>
            <Likes>
              <LikeBtn small state={userLikeState} onClick={chageUserLikeState} />
              <LikesCount>{likesCount}</LikesCount>
            </Likes>
            <Price discountPrice={discountPrice} price={price} />
          </LikesAndPrice>
        </ProductInfo>
      </DesktopCard>

      <MobileCard>
        <div className="card">
          <a href={`/detail/${id}`}>
            <Thumbnail url={img}/>
          </a>
          <TitleAndPrice>
            <a href={`/detail/${id}`}>
              <Title>{title}</Title>
            </a>
            <Price discountPrice={discountPrice} price={price} />
          </TitleAndPrice>
        </div>
        <TagAndLike>
          <Tags data={tag} gray />
          <Likes>
            <LikesCount>{likesCount}</LikesCount>
            <LikeBtn small state={userLikeState} onClick={chageUserLikeState} />
          </Likes>
        </TagAndLike>
      </MobileCard>
    </Product>
  )
}

const Product = styled.div`
  width: 100%;
  margin-bottom: 16px;
  position: relative;

  ${min[1]} {
    width: calc(50% - 16px);
    margin-right: 32px;
    margin-bottom: 32px;

    &:nth-of-type(2n) {
      margin-right: 0;
    }
  }
  ${min[2]} {
    max-width: 412px;
    width: calc((100% / 3) - (64px / 3));
    margin-right: 32px;

    &:nth-of-type(2n) {
      margin-right: 32px;
    }

    &:nth-of-type(3n) {
      margin-right: 0;
    }
  }
`;

const DesktopCard = styled.div`
  display: none;
  overflow: hidden;
  height: 100%;

  ${min[1]} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    
    border-radius: 20px;
    box-shadow: 0px 8px 16px rgba(17, 17, 17, 0.06);
  }
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
  flex-grow: 1;
  width: 100%;
  padding: 24px 20px 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;

  h3 {
    margin-bottom: 16px;
  }
`;

const Title = styled.h3`
  font-weight: 500;
  line-height: 125%;
  word-break: keep-all;
`;

const LikesAndPrice = styled.div`
  align-self: flex-end;
  width: 100%;
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
  font-size: 0.75rem;

  ${min[1]} {
    order: 2;
    font-size: 0.875rem;
  }
`;


//font-size: 1rem;
//font-size: 0.875rem;
const MobileCard = styled.div`
  display: block;
  font-size: 0.75rem;
  
  ${min[1]} {
    display: none;
  }

  .card {
    display: flex;
    height: 7.8em;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 8px 16px rgba(17, 17, 17, 0.06);
    margin-bottom: 0.5em;

    > a {
      min-width: 164px;
      max-width: 164px;
    }
  }
`;

const TitleAndPrice = styled.div`
  padding: 8px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TagAndLike = styled.div`
  font-size: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;