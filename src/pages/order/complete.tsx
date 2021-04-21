import styled from "@emotion/styled";
import { Layout } from "components/layout";
import { Colors } from "components/ui";
import { withRouter } from 'next/router';

function OrderComplete() {
  return (
    <Layout noFooter>
      <Bg>
        <Container>결제 완료다!</Container>
      </Bg>
    </Layout>
  )
}
export default withRouter(OrderComplete);

const Bg = styled.div`
  background: ${Colors.gray7};
`;
const Container = styled.div`
  background: ${Colors.white};
  width: 804px;
  padding: 20px 40px;
  margin: 0 auto;
`;