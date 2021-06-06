import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from "react";
import { Layout } from "components/layout";
import { ProductList } from "components/product-card-list2";
import styled from "@emotion/styled";
import Image from 'next/image';

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL as string +`/exhibition`);
  const data = await res.json();

  if (!data.exhibition) {
    return {
      notFound: true,
    }
  }

  return {
    props: { exhibition: data.exhibition },
  }
}
export default function All({exhibition}: InferGetServerSidePropsType<typeof getServerSideProps>){

  return (
    <Layout whiteHeader>
      <Jumbotron>
        <p className="wrap">
          당신이 꿈꾸는 커리어를 만드는 방법, <br/>
          <Strong>업계 선배가 1:1로 알려드려요</Strong>
        </p>
        <Image
          src="/thumb.png"
          alt=""
          width={1920}
          height={432}
        />
      </Jumbotron>
      <div className="wrap">
      {
        exhibition.map((item: any) => (
          <Exhibition key={item._id}>
            <Title>
              <img src="/icon/coach_64p.svg" style={{marginRight: '6px'}}/>
              {item.title}
            </Title>
            <ProductListWrap>
              <ProductList data={item.itemInfo} />
            </ProductListWrap>
          </Exhibition>
        ))
      }
      </div>
    </Layout>
  )
}

const Jumbotron = styled.div`
  padding-top: calc(156px + 48px);
  background: url('/allPage_bg.png') center bottom/100% auto no-repeat;
  text-align: center;
  margin-bottom: 112px;

  img {
    display: block;
  }
  p {
    color: #F3EFFF;
    font-size: 20px;
    line-height: 150%;
  }
`;

const Strong = styled.span`
  font-weight: 700;
`;

const Exhibition = styled.div`
  margin-bottom: calc(156px - 32px);
`;

const Title = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 80px;
  
  img { vertical-align: middle; }
`;

const ProductListWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
`;