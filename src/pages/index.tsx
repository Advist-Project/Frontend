import { Layout } from "components/layout";
import { Heading, Text, Colors, Gradient, Button, Box, Spacing } from "components/ui";

export default function Home() {
  console.log(Colors, Gradient);
  
  return (
    <Layout>
      <Box border={1} width="300px"
                      height="300px"
                      style={[
                        Spacing.margin(3),
                        Spacing.padding(3),
                        {color:'red', background: 'yellow'}
                      ]}>하이</Box>
      <Box shadow={2} width="300px"
                      height="300px">하이</Box>
      <Box round border={1} shadow={3}
                            width="300px"
                            height="300px">하이</Box>

      <Heading>Heading - default</Heading>
      <Heading bold>Heading - default, bold</Heading>
      <Heading level={2}>Heading - level2</Heading>
      <Heading level={2} bold>Heading - level2, bold</Heading>
      <Heading level={3}>Heading - level3</Heading>
      <Heading level={3} bold>Heading - level3, bold</Heading>
      <Heading level={4}>Heading - level4</Heading>
      <Heading level={4} bold>Heading - level4, bold</Heading>
      <Heading level={5}>Heading - level5</Heading>
      <Heading level={5} bold>Heading - level5, bold</Heading>
      <Text>Text - default</Text>
      <Text bold>Text - default, bold</Text>
      <Text bold inline>Text - default, bold, inline</Text>
      <Text size='16px' bold>Text - 16px</Text>
      <Text size='16px' bold>Text - 16px, bold</Text>
      <Text size='16px' bold inline>Text - 16px, bold, inline</Text>
      <Text size='20px' bold>Text - 20px</Text>
      <Text size='20px' bold>Text - 20px, bold</Text>
      <Text size='20px' bold inline>Text - 20px, bold, inline</Text>
      <br/> <br/>
      <Button type = "login">로그인</Button>
      <br/> <br/>
      <Button type = "start">시작하기</Button>
      <br/> <br/>
    </Layout>
  )
}
