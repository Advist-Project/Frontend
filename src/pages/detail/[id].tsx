import { Layout } from "components/layout";
import styled from "@emotion/styled";
import Image from 'next/image';
import { Heading, Tags, Button, Colors } from "components/ui";
import { LikeBtn } from "components/like-button";
import { Price } from "components/price";

// virtualData
// 상품정보 api의 결과값
const vData = { 
  _id: 'asdf1234',
  img: '/test.jpg',
  title: "새 회사, 직무에 빠르게 적응하고 싶은 신입사원을 위한 업무 관리 워크북",
  tag: ['고구마', '감자', '옥수수'],
  discount: 60,
  price: 12300,
}

export default function Details() {
  console.log('여기서 구매하기 버튼을 클릭하면, 서버에 데이터 보내고 주문번호 받아옴');

  return (
    <Layout>
      <ProductInfo className="wrap">
        <div className="leftArea">
          <Image
            src={vData.img}
            alt=""
            width={645}
            height={363}
          />
        </div>
        <div className="rightArea">
          <DefaultInfo>
            <Heading level={4} bold>{vData.title}</Heading>
            <Tags data={vData.tag}/>
            <p>제공자 : Tim</p>
          </DefaultInfo>
          <FunctionsAndPriceInfo>
            <div>
              <LikeBtn state={false} />
            </div>
            <div className="rightArea">
              <Price discount={vData.discount} price={vData.price} />
              <a href="/order/0"><Button type="start">구매하기</Button></a>
            </div>
          </FunctionsAndPriceInfo>
        </div>
      </ProductInfo>
      <DetailInfo>
        <div className="wrap">
          상세 내용 들어갈 예정
        </div>
      </DetailInfo>
    </Layout>
  )
}

const ProductInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 56px;

  > .leftArea {
    flex-basis: 645px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0px 8px 16px rgba(17, 17, 17, 0.06);

    > div {
      display: block !important;
    }
  }
  > .rightArea {
    align-self: normal;
    margin-left: 100px;
    flex-grow: 1;
    max-width: 555px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const DefaultInfo = styled.div``;

const FunctionsAndPriceInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  > .rightArea {
    text-align: right;
  }

  button {
    margin-top: 32px;
  }
`;

const DetailInfo = styled.div`
  background-color: ${Colors.gray6};
  margin-top: 93px;
  padding: 68px 0 209px;
`;

