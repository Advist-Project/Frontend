import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React, { useState, useEffect, useRef, useContext } from "react";
import { Layout } from "components/layout";
import { Colors } from "components/ui";
import { ProductList } from "components/product-card-list";
import styled from "@emotion/styled";

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
  console.log(exhibition);

  return (
    <Layout>
      <Jumbotron>
        <div className="wrap">
          당신이 꿈꾸는 커리어를 만드는 방법,<br/>
          업계 선배가 1:1로 알려드려요
        </div>
      </Jumbotron>
      <div className="wrap">
      {
        exhibition.map((item: any) => (
          <Exhibition key={item._id}>
            <Title>{item.title}</Title>
            <Desc>{item.subTitle}</Desc>
            <ProductListWrap>
              <ProductList data={[item.itemInfo]} />
            </ProductListWrap>
          </Exhibition>
        ))
      }
      </div>
    </Layout>
  )
}

const Jumbotron = styled.div`
  background: ${Colors.gray4};
  padding: 80px 0;
  font-size: 1.5rem;
  line-height: 1.5em;
  margin-bottom: 80px;
`;

const Exhibition = styled.div`
  margin-bottom: 80px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1em;
`;

const Desc = styled.p`
  margin-bottom: 2em;
`;

const ProductListWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
`;