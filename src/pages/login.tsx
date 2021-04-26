import { Layout } from "components/layout";
import styled from "@emotion/styled";
import { Heading, Colors } from "components/ui";
import Image from 'next/image';
import React, {useState} from "react";
import { AgreePage } from "components/agree";

export default function LoginPage(){
    const [AgreeModal, setAgreeModal] = useState<boolean>(false);

    return(
        <div style = {{background : AgreeModal? 'rgba(20, 20, 42, 0.5)' : undefined}}>
        <Layout noFooter={true}>
            <Section1>
            <div className="wrap">
                <div className="contentArea">
            {/* 1번 콘텐츠 */}
                <Image
                src="/mainGraphic_section1_human.png"
                alt=""
                width={529}
                height={352}
                priority
                />
                </div>
                <Container>
                    <Heading level={5} bold>지금 가입하시면 5만원 상당의 자료를 무료로 드려요</Heading>
                    <LoginButton onClick = {() => location.href = process.env.NEXT_PUBLIC_LOGIN_NAVER as string} style={{marginTop : '136px'}}>
                        <ImageBox><img style={{marginTop : '12px', marginBottom : '12px'}} src="/naver.png"/></ImageBox>
                        <ButtonBox>Naver로 시작하기</ButtonBox>                        
                    </LoginButton>
                    <LoginButton onClick = {() => location.href = process.env.NEXT_PUBLIC_LOGIN_KAKAO as string} style={{marginTop : '13px'}}>
                        <ImageBox><img style={{marginTop : '12px', marginBottom : '12px'}} src="/kakao.png"/></ImageBox>
                        <ButtonBox>Kakao로 시작하기</ButtonBox>                        
                    </LoginButton>
                    <LoginButton onClick = {() => location.href = process.env.NEXT_PUBLIC_LOGIN_GOOGLE as string} style={{marginTop : '13px'}}>
                        <ImageBox><img style={{marginTop : '12px', marginBottom : '12px'}} src="/google.png"/></ImageBox>
                        <ButtonBox>Google로 시작하기</ButtonBox>                        
                    </LoginButton>

                    <Agree>최초 로그인 시 어드바이스트의&nbsp;
                    <a onClick = {() => setAgreeModal(true)} style={{color : '#9622FC', fontStyle : "normal", cursor : "pointer"}}
                    target="_blank">이용약관, 개인정보취급방침</a>    
                    에 동의하는 것으로 간주합니다.</Agree>                                                       
                </Container>
            </div>
            </Section1>
            {                
                AgreeModal ? <AgreePage setAgreeModal={setAgreeModal}/> : null
            }
        </Layout>
        </div>
    )
}

const Section1 = styled.section`
    color: ${Colors.black};
    margin-top: 162px;
    margin-bottom: 227px;

    > .wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
      }
    
      > .contentArea {
        height: 642px;
      }    
`;

const Container = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : flex-start;
`;

const LoginButton = styled.button`
    cursor : pointer;
    display : flex;
    flex-direction : row;

    width: 448px;
    padding : 0;
    border : 0;
    background: ${Colors.white};
`;

const ImageBox = styled.div`
    width: 56px;
    height: 56px;
    background: ${Colors.white};
    border: 1px solid ${Colors.gray2};
    box-sizing: border-box;
    border-radius: 10px 0px 0px 10px;
`;

const ButtonBox =styled.div`
    width: 392px;
    height: 56px;
    background: ${Colors.white};
    border: 1px solid ${Colors.gray2};
    border-left : 0;
    box-sizing: border-box;
    border-radius: 0px 10px 10px 0px;

    font-family: Spoqa Han Sans Neo;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 54px;
    letter-spacing: 0px;
    text-align: center;
`;

const Agree = styled.div`
    width: 447px;
    height: 48px;

    margin-top : 58px;

    font-family: Spoqa Han Sans Neo;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: left;
    

    color: ${Colors.gray10};
`;