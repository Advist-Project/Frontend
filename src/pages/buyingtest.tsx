import { Layout } from "components/layout";
import { Colors, Gradient, Button, Inputs, BuyProduct } from "components/ui";

export default function Home() {
  console.log(Colors, Gradient);

  const { Buying } = BuyProduct;
  
  return (
    <Layout>
      <Button type = "login">로그인</Button>
      <br/> <br/>
      <Button type = "start">시작하기</Button>
      <br/> <br/>
      <Inputs/>
      <br/> <br/>    
      <Inputs isDisable = {true}/>
      <br/> <br/>
      <Buying discount={100} price={50000}/>
      <br/> <br/>
    </Layout>
  )
}