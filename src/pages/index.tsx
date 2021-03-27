import { Layout } from "components/layout";
import { Typography, Colors, Gradient } from "components/ui";

const { Heading, Text } = Typography;

export default function Home() {
  console.log(Colors, Gradient);
  
  return (
    <Layout>
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
    </Layout>
  )
}