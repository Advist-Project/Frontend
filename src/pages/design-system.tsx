import styled from "@emotion/styled";
import { Heading, Text, Colors as c, Gradient as g, Button, Box, Spacing, Tags, Input } from "components/ui";
import { useState } from "react";

export default function DesignSystem() {
  const [contentView, changeContent] = useState('Heading');
  const View: {[key: string]: any} = {
    Colors: <ContentColors />,
    Gradient: <ContentGradient />,
    Heading: <ContentHeading />,
    Text: <ContentText />,
    Button: <ContentButton />,
    Box: <ContentBox />,
    Tags: <ContentTags />,
    Input: <ContentInput />
  }

  return (
    <>
      <Header>어드바이스트 디자인시스템</Header>
      <Container>
        <Nav>
          <ul>
            <li>General
              <ul>
                <li><a onClick={()=>changeContent('Colors')}
                       style={contentView === 'Colors' ? {color: c.primary} : {}}>Colors</a></li>
                <li><a onClick={()=>changeContent('Gradient')}
                       style={contentView === 'Gradient' ? {color: c.primary} : {}}>Gradient</a></li>
              </ul>
            </li>
            <li>Components
              <ul>
                <li><a onClick={()=>changeContent('Heading')}
                       style={contentView === 'Heading' ? {color: c.primary} : {}}>Heading</a></li>
                <li><a onClick={()=>changeContent('Text')}
                       style={contentView === 'Text' ? {color: c.primary} : {}}>Text</a></li>
                <li><a onClick={()=>changeContent('Button')}
                       style={contentView === 'Button' ? {color: c.primary} : {}}>Button</a></li>
                <li><a onClick={()=>changeContent('Input')}
                       style={contentView === 'Input' ? {color: c.primary} : {}}>Input</a></li>
                <li><a onClick={()=>changeContent('Box')}
                       style={contentView === 'Box' ? {color: c.primary} : {}}>Box</a></li>
                <li><a onClick={()=>changeContent('Tags')}
                       style={contentView === 'Tags' ? {color: c.primary} : {}}>Tags</a></li>
              </ul>
            </li>
            
          </ul>
        </Nav>
        <Main>
          <Title>{contentView}</Title>
          { View[contentView] }
        </Main>
      </Container>
    </>
  )
}

const Header = styled.header`
  height: 68px;
  color: ${c.white};
  background: ${c.black};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
`;

const Container = styled.main`
  display: flex;
  height: calc(100vh - 68px);
`

const Nav = styled.nav`
  width: 280px;
  max-height: 100%;
  overflow: auto;
  background: ${c.gray6};
  border-right: 1px ${c.gray4} solid;
  padding: 32px 28px;

  > ul > li {
    font-size: 14px;
    font-weight: 500;
    color: ${c.gray3};
    text-transform: uppercase;
  }
  > ul > li > ul {
    margin-top: 28px;
    margin-bottom: 44px;
  }
  > ul > li > ul > li {
    font-size: 20px;
    font-weight: 400;
    text-transform: none;
    color: ${c.black};
    margin-bottom: 20px;

    > a:hover {
      cursor: pointer;
      color: ${c.primary}
    }
  }
`

const Main = styled.main`
  padding: 32px;
  flex-grow: 1;
  height: 100%;
  overflow: auto;
`

const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const Code = styled.code`
  display: block;
  padding: 24px 20px;
  background: ${c.primaryLight};
  border-radius: 20px;
  margin-bottom: 32px;
`
const Code2 = styled.code`
  display: block;
  font-size: 14px;
  padding:12px 16px;
  background: ${c.tertiaryLight};
  margin-top: 12px;
`
const Hr = styled.hr`
  margin: 28px 0;
  border: 0;
  border-bottom: 1px ${c.gray4} solid;
`;
const Ul = styled.ul`
  margin-left: 20px;
  > li {
    list-style: initial;
    line-height: 24px;
  }
`;

function ContentColors(){
  return (
    <>
      <Code>{`import { Colors } from "components/ui";`}</Code>
      <div style={{ background: c.primary, width: '100px', height: '100px', display: 'inline-block', marginRight: '16px'}}></div>
      <div style={{ background: c.primaryDark, width: '100px', height: '100px', display: 'inline-block', marginRight: '16px'}}></div>
      <div style={{ background: c.primarySemiLight, width: '100px', height: '100px', display: 'inline-block', marginRight: '16px'}}></div>
      <div style={{ background: c.primaryLight, width: '100px', height: '100px', display: 'inline-block'}}></div>
      <Code2>Colors.primary<br/>Colors.primaryDark<br/>Colors.primarySemiLight<br/>Colors.primaryLight</Code2>
      <Hr/>
      <div style={{ background: c.secondary, width: '100px', height: '100px', display: 'inline-block', marginRight: '16px'}}></div>
      <div style={{ background: c.secondaryDark, width: '100px', height: '100px', display: 'inline-block', marginRight: '16px'}}></div>
      <div style={{ background: c.secondarySemiLight, width: '100px', height: '100px', display: 'inline-block', marginRight: '16px'}}></div>
      <div style={{ background: c.secondaryLight, width: '100px', height: '100px', display: 'inline-block'}}></div>
      <Code2>Colors.secondary<br/>Colors.secondaryDark<br/>Colors.secondarySemiLight<br/>Colors.secondaryLight</Code2>
      <Hr/>
      <div style={{ background: c.tertiary, width: '100px', height: '100px', display: 'inline-block', marginRight: '16px'}}></div>
      <div style={{ background: c.tertiaryDark, width: '100px', height: '100px', display: 'inline-block', marginRight: '16px'}}></div>
      <div style={{ background: c.tertiarySemiLight, width: '100px', height: '100px', display: 'inline-block', marginRight: '16px'}}></div>
      <div style={{ background: c.tertiaryLight, width: '100px', height: '100px', display: 'inline-block'}}></div>
      <Code2>Colors.tertiary<br/>Colors.tertiaryDark<br/>Colors.tertiarySemiLight<br/>Colors.tertiaryLight</Code2>
      <Hr/>
      <div style={{ background: c.error, width: '100px', height: '100px', display: 'inline-block', marginRight: '16px'}}></div>
      <div style={{ background: c.errorDark, width: '100px', height: '100px', display: 'inline-block', marginRight: '16px'}}></div>
      <div style={{ background: c.errorSemiLight, width: '100px', height: '100px', display: 'inline-block', marginRight: '16px'}}></div>
      <div style={{ background: c.errorLight, width: '100px', height: '100px', display: 'inline-block'}}></div>
      <Code2>Colors.error<br/>Colors.errorDark<br/>Colors.errorSemiLight<br/>Colors.errorLight</Code2>
      <Hr/>
      <div style={{ background: c.black, width: '100px', height: '100px', display: 'inline-block', marginRight: '16px'}}></div>
      <div style={{ background: c.gray1, width: '100px', height: '100px', display: 'inline-block', marginRight: '16px'}}></div>
      <div style={{ background: c.gray2, width: '100px', height: '100px', display: 'inline-block', marginRight: '16px'}}></div>
      <div style={{ background: c.gray3, width: '100px', height: '100px', display: 'inline-block', marginRight: '16px'}}></div>
      <div style={{ background: c.gray4, width: '100px', height: '100px', display: 'inline-block', marginRight: '16px'}}></div>
      <div style={{ background: c.gray5, width: '100px', height: '100px', display: 'inline-block', marginRight: '16px'}}></div>
      <div style={{ background: c.gray6, width: '100px', height: '100px', display: 'inline-block', marginRight: '16px'}}></div>
      <div style={{ background: c.white, width: '100px', height: '100px', display: 'inline-block'}}></div>
      <Code2>Colors.black<br/>Colors.gray1<br/>Colors.gray2<br/>Colors.gray3<br/>Colors.gray4<br/>Colors.gray5<br/>Colors.gray6<br/>Colors.white</Code2>
    </>
  )
}
function ContentGradient(){
  return (
    <>
      <Code>{`import { Gradient } from "components/ui";`}</Code>
      <div style={{ background: g.primary, width: '100px', height: '100px', display: 'inline-block', marginRight: '16px'}}></div>
      <div style={{ background: g.blue, width: '100px', height: '100px', display: 'inline-block', marginRight: '16px'}}></div>
      <div style={{ background: g.orange, width: '100px', height: '100px', display: 'inline-block', marginRight: '16px'}}></div>
      <div style={{ background: g.green, width: '100px', height: '100px', display: 'inline-block', marginRight: '16px'}}></div>
      <div style={{ background: g.purple, width: '100px', height: '100px', display: 'inline-block', marginRight: '16px'}}></div>
      <div style={{ background: g.yellow, width: '100px', height: '100px', display: 'inline-block'}}></div>
      <Code2>Gradient.primary<br/>Gradient.blue<br/>Gradient.orange<br/>Gradient.green<br/>Gradient.purple<br/>Gradient.yellow</Code2>
    </>
  )
}
function ContentHeading(){
  return (
    <>
      <Code>{`import { Heading } from "components/ui";`}</Code>
      <Heading level={5} bold>속성 (Attribute)</Heading>
      <Ul>
      <li>level: number, optional, 2~5 입력. 헤딩의 사이즈가 결정됩니다. 미 입력 시 디폴트인 h1 레벨로 적용됩니다.</li>
      <li>bold: boolean, optional, 속성 사용 시 글자가 굵게 처리됩니다. (font-weight: 700)</li>
      </Ul>
      <Hr/>
      <Heading>업무를 위한 가이드라인,<br/>어드바이스트가 도울게요</Heading>
      <Code2>{`<Heading>업무를 위한 가이드라인, 어드바이스트가 도울게요</Heading>`}</Code2>
      <Hr/>
      <Heading bold>업무를 위한 가이드라인,<br/>어드바이스트가 도울게요</Heading>
      <Code2>{`<Heading bold>업무를 위한 가이드라인, 어드바이스트가 도울게요</Heading>`}</Code2>
      <Hr/>
      <Heading level={2}>업무를 위한 가이드라인,<br/>어드바이스트가 도울게요</Heading>
      <Code2>{`<Heading level={2}>업무를 위한 가이드라인, 어드바이스트가 도울게요</Heading>`}</Code2>
      <Hr/>
      <Heading level={2} bold>업무를 위한 가이드라인,<br/>어드바이스트가 도울게요</Heading>
      <Code2>{`<Heading level={2} bold>업무를 위한 가이드라인, 어드바이스트가 도울게요</Heading>`}</Code2>
      <Hr/>
      <Heading level={3}>업무를 위한 가이드라인,<br/>어드바이스트가 도울게요</Heading>
      <Code2>{`<Heading level={3}>업무를 위한 가이드라인, 어드바이스트가 도울게요</Heading>`}</Code2>
      <Hr/>
      <Heading level={3} bold>업무를 위한 가이드라인,<br/>어드바이스트가 도울게요</Heading>
      <Code2>{`<Heading level={3} bold>업무를 위한 가이드라인, 어드바이스트가 도울게요</Heading>`}</Code2>
      <Hr/>
      <Heading level={4}>업무를 위한 가이드라인,<br/>어드바이스트가 도울게요</Heading>
      <Code2>{`<Heading level={4}>업무를 위한 가이드라인, 어드바이스트가 도울게요</Heading>`}</Code2>
      <Hr/>
      <Heading level={4} bold>업무를 위한 가이드라인,<br/>어드바이스트가 도울게요</Heading>
      <Code2>{`<Heading level={4} bold>업무를 위한 가이드라인, 어드바이스트가 도울게요</Heading>`}</Code2>
      <Hr/>
      <Heading level={5}>업무를 위한 가이드라인,<br/>어드바이스트가 도울게요</Heading>
      <Code2>{`<Heading level={5}>업무를 위한 가이드라인, 어드바이스트가 도울게요</Heading>`}</Code2>
      <Hr/>
      <Heading level={5} bold>업무를 위한 가이드라인,<br/>어드바이스트가 도울게요</Heading>
      <Code2>{`<Heading level={5} bold>업무를 위한 가이드라인, 어드바이스트가 도울게요</Heading>`}</Code2>
    </>
  )
}
function ContentText(){
  return (
    <>
      <Code>{`import { Text } from "components/ui";`}</Code>
      <Heading level={5} bold>속성 (Attribute)</Heading>
      <Ul>
      <li>size: string, optional, px 등의 단위를 포함한 사이즈 문자열로 입력. 텍스트의 사이즈가 결정됩니다. 미 입력 시 디폴트인 14px 사이즈가 적용됩니다.</li>
      <li>inline: boolean, optional, 속성 사용 시 span 태그로 생성되며, 인라인 처리됩니다.</li>
      <li>bold: boolean, optional, 속성 사용 시 글자가 굵게 처리됩니다. (font-weight: 500)</li>
      </Ul>
      <Hr/>
      <Text>업무를 위한 가이드라인, 어드바이스트가 도울게요</Text>
      <Code2>{`<Text>업무를 위한 가이드라인, 어드바이스트가 도울게요</Text>`}</Code2>
      <Hr/>
      <Text inline>업무를 위한 가이드라인, 어드바이스트가 도울게요</Text>
      <Code2>{`<Text inline>업무를 위한 가이드라인, 어드바이스트가 도울게요</Text>`}</Code2>
      <Hr/>
      <Text bold>업무를 위한 가이드라인, 어드바이스트가 도울게요</Text>
      <Code2>{`<Text bold>업무를 위한 가이드라인, 어드바이스트가 도울게요</Text>`}</Code2>
      <Hr/>
      <Text size="16px">업무를 위한 가이드라인, 어드바이스트가 도울게요</Text>
      <Code2>{`<Text size="16px">업무를 위한 가이드라인, 어드바이스트가 도울게요</Text>`}</Code2>
      <Hr/>
      <Text size="16px" inline>업무를 위한 가이드라인, 어드바이스트가 도울게요</Text>
      <Code2>{`<Text size="16px" inline>업무를 위한 가이드라인, 어드바이스트가 도울게요</Text>`}</Code2>
      <Hr/>
      <Text size="16px" bold>업무를 위한 가이드라인, 어드바이스트가 도울게요</Text>
      <Code2>{`<Text size="16px" bold>업무를 위한 가이드라인, 어드바이스트가 도울게요</Text>`}</Code2>
      <Hr/>
      <Text size="20px">업무를 위한 가이드라인, 어드바이스트가 도울게요</Text>
      <Code2>{`<Text size="20px">업무를 위한 가이드라인, 어드바이스트가 도울게요</Text>`}</Code2>
      <Hr/>
      <Text size="20px" inline>업무를 위한 가이드라인, 어드바이스트가 도울게요</Text>
      <Code2>{`<Text size="20px" inline>업무를 위한 가이드라인, 어드바이스트가 도울게요</Text>`}</Code2>
      <Hr/>
      <Text size="20px" bold>업무를 위한 가이드라인, 어드바이스트가 도울게요</Text>
      <Code2>{`<Text size="20px" bold>업무를 위한 가이드라인, 어드바이스트가 도울게요</Text>`}</Code2>
    </>
  )
}
function ContentButton(){
  return (
    <>
      <Code>{`import { Button } from "components/ui";`}</Code>
      <Heading level={5} bold>속성 (Attribute)</Heading>
      <Ul>
      <li>type:</li>
      </Ul>
      <Hr/>
      <Button type="start">시작하기</Button>
      <Code2>{`<Button>시작하기</Button>`}</Code2>
      <Hr/>
      <Button type="login">로그인</Button>
      <Code2>{`<Button>로그인</Button>`}</Code2>
    </>
  )
}
function ContentBox(){
  return (
    <>
      <Code>{`import { Box } from "components/ui";`}</Code>
      <Heading level={5} bold>속성 (Attribute)</Heading>
      <Ul>
      <li>width: string, optional, px 등의 단위를 포함한 사이즈 문자열로 입력. 박스의 너비가 지정됩니다.</li>
      <li>height: string, optional, px 등의 단위를 포함한 사이즈 문자열로 입력. 박스의 높이가 지정됩니다.</li>
      <li>round: boolean, optional, 속성 사용 시 모서리가 둥글게 처리됩니다. (border-radius: 20px)</li>
      <li>border: number, optional, 1 이상의 숫자 입력. 해당 굵기(px)로 검정색 solid border가 적용됩니다.</li>
      <li>shadow: number, optional, 1~3 숫자 입력. 1~3 단계의 box-shadow 스타일이 적용됩니다.</li>
      <li>style: object[] | object, optional, 해당 박스에 스타일을 적용합니다. 작성 규칙은 jsx 문법과 동일합니다. 배열로 객체 여러개를 전달할 수도 있습니다.</li>
      <li>className: string, optional, 해당 박스에 클래스를 적용합니다.</li>
      </Ul>
      <Hr/>
      <Box width="168px" height="100px" shadow={1}></Box>
      <Code2>{`<Box width="168px" height="100px" shadow={1}></Box>`}</Code2>
      <Hr/>
      <Box width="168px" height="100px" shadow={2}></Box>
      <Code2>{`<Box width="168px" height="100px" shadow={2}></Box>`}</Code2>
      <Hr/>
      <Box width="168px" height="100px" shadow={3}></Box>
      <Code2>{`<Box width="168px" height="100px" shadow={3}></Box>`}</Code2>
      <Hr/>
      <Box width="168px" height="100px" border={1} round></Box>
      <Code2>{`<Box width="168px" height="100px" border={1} round></Box>`}</Code2>
      <Hr/>
      <Box width="168px" height="100px" shadow={1} border={1} round></Box>
      <Code2>{`<Box width="168px" height="100px" shadow={1} border={1} round></Box>`}</Code2>
      <Hr/>
      <Box width="168px" height="100px" shadow={1} border={1} round style={{color: 'red', borderColor: 'blue'}}>어드바이스트</Box>
      <Code2>{`<Box width="168px" height="100px" shadow={1} border={1} round style={{color: 'red', borderColor: 'blue'}}>어드바이스트</Box>`}</Code2>
      <Hr/>
      <Box width="168px" height="100px"
           shadow={1} border={1} round
           style={[
             Spacing.padding(3),
             {color: 'red', borderColor: 'blue'}
          ]}>어드바이스트</Box>
      <Code2>{`<Box width="168px" height="100px"
                    shadow={1} border={1} round 
                    style={[
                      Spacing.padding(3),
                      {color: 'red', borderColor: 'blue'}
                    ]}>어드바이스트</Box>`}</Code2>
    </>
  )
}
function ContentTags(){
  return (
    <>
      <Code>{`import { Tags } from "components/ui";`}</Code>
      <Heading level={5} bold>속성 (Attribute)</Heading>
      <Ul>
      <li>data: string[], require, 태그로 표시할 단어 배열</li>
      </Ul>
      <Hr/>
      <Heading level={5} bold>※ 개발 중인 사항입니다. (21-03-29)</Heading>
      <Ul>
      <li>색상은 보라 → 초록 → 노랑 → 회색 순으로 반복됩니다.</li>
      <li>태그의 너비는 4 글자 기준 84px입니다. (좌우 여백 0.89em)</li>
      </Ul>
      <Hr/>
      <Tags data={['감자깡', '양파깡', '고구마깡', '옥수수깡', '꿀꽈배기', '오징어땅콩']} />
      <Code2>{`<Tags data={['감자깡', '양파깡', '고구마깡', '옥수수깡', '꿀꽈배기', '오징어땅콩']} />`}</Code2>
    </>
  )
}
function ContentInput(){
  return (
    <>
      <Code>{`import { Input } from "components/ui";`}</Code>
      <Heading level={5} bold>속성 (Attribute)</Heading>
      <Ul>
      <li></li>
      </Ul>
      <Hr/>
      <Input />
    </>
  )
}