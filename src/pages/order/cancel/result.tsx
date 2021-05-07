import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { Layout } from "components/layout";
import { Heading, Text, Colors } from "components/ui";

export function OrderCancel(){
  useEffect(()=>{
    // router.push({
    //   pathname: `${process.env.NEXT_PUBLIC_ORDER_PAGE_URL}`,
    //   query: ,
    // }, '/order');
  })

  return (
    <Layout noFooter>
      <Bg>
        <Container>
        <Heading level={4} style={{marginBottom: '20px'}}>결제가 정상적으로 처리되지 않았습니다.</Heading>
        <Text size="20px">잠시 후 상세 화면으로 이동합니다.</Text>
        </Container>
      </Bg>
    </Layout>
  )
}
export default OrderCancel;
const Bg = styled.div`
  background: ${Colors.gray7};
`;
const Container = styled.div`
  background: ${Colors.white};
  width: 100%;
  max-width: 804px;
  padding: 170px 40px;
  margin: 0 auto;
  min-height: calc(100vh - 156px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;