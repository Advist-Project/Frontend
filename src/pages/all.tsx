import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from "react";
import { Layout } from "components/layout";
import { ProductList } from "components/product-card-list2";
import styled from "@emotion/styled";
import Image from 'next/image';
import { min } from "components/ui";

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
        <div className="imgWrap">
          <div className="img_pc">
            <Image
              src="/allPage_bg.png"
              alt="당신이 꿈꾸는 커리어를 만드는 방법, 업계 선배가 1:1로 알려드려요"
              width={1920}
              height={540}
            />
          </div>
          <div className="img_mo">
            <Image
              src="/allPage_bg_mo.png"
              alt="당신이 꿈꾸는 커리어를 만드는 방법, 업계 선배가 1:1로 알려드려요"
              width={768}
              height={480}
            />
          </div>
        </div>
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
  padding-top: 56px;
  margin-bottom: 40px;
  background: url('/allPage_bg_repeat.png') center bottom/auto 540px repeat-x;
  background-color: #14142A;
  text-align: center;

  .img_pc div,
  .img_mo div,
  img {
    display: block !important;
  }
  .imgWrap {
    max-width: 1920px;
    margin: 0 auto;
  }
  .img_pc {
    display: none;
  }

  ${min[1]}{
    padding-top: 156px;
    margin-bottom: 112px;

    .img_mo {
      display: none;
    }
    .img_pc {
      display: block;
    }
  }
`;

const Exhibition = styled.div`
  margin-bottom: 80px;
  ${min[1]}{
    margin-bottom: calc(156px - 32px);
  }
`;

const Title = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 40px;
  
  img {
    width: 42px;
    height: 42px;
    vertical-align: middle;
  }

  ${min[1]}{
    font-size: 2.25rem;
    margin-bottom: 80px;

    img {
      width: 64px;
      height: 64px;
    }
  }
`;

const ProductListWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
`;