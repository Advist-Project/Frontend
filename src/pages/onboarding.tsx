import { Layout } from "components/layout";
import styled from "@emotion/styled";
import { Heading, Colors, Text } from "components/ui";
import Image from 'next/image';
import React, { useState, useContext } from "react";
import { myContext } from "context";
import { User } from 'types/logintypes';
import { Button } from "components/_design/buttons"
import { JobInput } from "components/onboarding/job"
import { YearsInput } from "components/onboarding/years"

export default function OnboardingPage(){
    const userObject = useContext(myContext) as User;
    const [CompanyName, setCompanyName] = useState("");

    const onNameHandler = (event : any) => {
        setCompanyName(event.currentTarget.value)
    }
    return(
        <>
        {userObject? ( // 로그인 시
        <div>
        <Layout noFooter={true}>
            <Section1>
            <div className="wrap">
                <div className="contentArea">                    
                {/* 1번 콘텐츠 */}
                <Message>
                    <Heading bold level = {2} style={{color : Colors.black}}>
                        {<span style={{color : Colors.primary}}>{userObject.username}</span>}{'님 반갑습니다!'}
                    </Heading>
                    <Text size='20px'>입력하신 정보에 따라 적합한 워크북과 코칭 프로그램을 추천해드려요.</Text>
                </Message>
                <Image
                src="/onboarding_hello.png"
                alt=""
                width={593}
                height={354}
                priority
                />
                </div>
                <Container>
                    <InputBox>
                        <Label>회사명</Label>
                        <InputCompany value = {CompanyName} onChange = {onNameHandler} placeholder = "재직중인 회사명을 입력하세요"></InputCompany>
                    </InputBox>
                    <InputBox>
                        <Label>직무</Label>
                        <JobInput/>
                    </InputBox>
                    <InputBox>
                        <Label>연차</Label>
                        <YearsInput/>
                    </InputBox>
                    <ButtonBox>
                        <Button style = {{width : '236px', height : '52px'}}>다음에 하기</Button>
                        <Button style = {{width : '236px', height : '52px'}} type = "start" disabled = {true}>완료</Button>
                    </ButtonBox>
                </Container>
            </div>
            </Section1>
        </Layout>
        </div>
        )
        : // 비로그인
        (<></>)
        }
        </>
    )
}

const Section1 = styled.section`
    color: ${Colors.black};
    > .wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
    }
    

`;

const Container = styled.div`
    margin-top : 289px;
    display : flex;
    flex-direction : column;
    justify-content : flex-start;
`;

const Message = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : space-between;


    width: 570px;
    height: 107px;
    margin-top : 64px;
    margin-bottom : 229.22px;
`;

const InputBox = styled.div`
    display : flex;
    flex-direction : column;
`;

const Label = styled.label`
    width: 56px;
    height: 30px;
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    color : ${Colors.black};
    margin-bottom : 12px;
`;

const InputCompany = styled.input`
    margin-bottom : 40px;
    height: 52px;
    width: 480px;
    background: ${Colors.white};                    

    border: 1px solid;      
    border-radius: 20px;
    border-color: ${Colors.gray3};
    box-sizing: border-box;

    color : ${Colors.black};

    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 26px;
    text-indent : 24px;

    &:focus{
        outline : none;
        border-width : 2px;
        border-color : ${Colors.black};  
    }
`;

const ButtonBox = styled.div`
    width : 480px;
    margin-top : 24px;
    display : flex;
    flex-direction : row;
    justify-content : space-between;
`;