import styled from "@emotion/styled";
import { Heading, Button } from "components/ui";
import { Price } from "components/price";
import { buying } from "components/buying";

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


export default function Orders() {
  return (
    <Container>
      <Heading level={4} bold>{vData.title}</Heading>
      <Price discount={vData.discount} price={vData.price} />
      <div onClick={()=>buying(vData)}>
        <Button type="start">결제하기</Button>
      </div>
    </Container>
  )
}

const Container = styled.div`
  width: 600px;
  margin: 50px auto;
`;