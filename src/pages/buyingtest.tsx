import { Layout } from "components/layout";
import { Button, Inputs } from "components/ui";
// Buying 사용하려면 BuyProduct 선언
import { BuyingList, SmallList } from "../components/buying-card-list"

export default function Home() {
  
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
      <BuyingList data={[]} />
      <br/> <br/>
      <SmallList data={[]} />
      <br/> <br/>
    </Layout>
  )
}