import { Layout } from "components/layout";
import styled from "@emotion/styled";
import { min, max, Heading, Colors } from "components/ui";
import Image from 'next/image';
import React, { useState, useEffect } from "react";
import { AgreePage } from "components/agree";

export default function LoginPage(){
    const [AgreeModal, setAgreeModal] = useState<boolean>(false);
    useEffect(() => {
        const referrer = document.referrer; // 이전 경로 저장
        console.log(referrer);     
    }, [])

    function onClickListener(){
        setAgreeModal(true);
        document.body.style.overflow = 'hidden';
    }

    return(
        <div>
        <Layout noFooter={true}>
            <Section1>
            <div className="wrap">
                <div className="contentArea">
            {/* 1번 콘텐츠 */}
                    <MobileHeading>SNS로 간편하게 시작하세요</MobileHeading>
                    <PCImages>
                        <Image
                            src="/mainGraphic_section1_human.png"
                            alt=""
                            width={529}
                            height={352}
                            priority
                        />
                    </PCImages>
                    <MobileImages>
                        <Image
                            src="/mainGraphic_section1_human.png"
                            alt=""
                            width={149}
                            height={99}
                            priority
                        />
                    </MobileImages>
                </div>
                <Container>
                    <HeadingBox>
                        <Heading level={5} bold>SNS로 간편하게 시작하세요</Heading>
                    </HeadingBox>
                    <MarginBox/>
                    <LoginButton onClick = {() => location.href = process.env.NEXT_PUBLIC_LOGIN_NAVER as string} style={{marginTop : '13px'}}>
                        <ImageBox><img src="/naver.png"/></ImageBox>
                        <MobileImageBox><img style={{width : '16px', height : '16px'}} src="/naver.png"/></MobileImageBox>
                        <ButtonBox>Naver로 시작하기</ButtonBox>                        
                    </LoginButton>
                    <LoginButton onClick = {() => location.href = process.env.NEXT_PUBLIC_LOGIN_KAKAO as string} style={{marginTop : '13px'}}>
                        <ImageBox><img src="/kakao.png"/></ImageBox>
                        <MobileImageBox><img style={{width : '16px', height : '16px'}} src="/kakao.png"/></MobileImageBox>
                        <ButtonBox>Kakao로 시작하기</ButtonBox>                        
                    </LoginButton>
                    <LoginButton onClick = {() => location.href = process.env.NEXT_PUBLIC_LOGIN_GOOGLE as string} style={{marginTop : '13px'}}>
                        <ImageBox><img src="/google.png"/></ImageBox>
                        <MobileImageBox><img style={{width : '16px', height : '16px'}} src="/google.png"/></MobileImageBox>
                        <ButtonBox>Google로 시작하기</ButtonBox>                        
                    </LoginButton>

                    <Agree>최초 로그인 시 어드바이스트의&nbsp;
                    <a onClick = {() => onClickListener()} style={{color : '#9622FC', fontStyle : "normal", cursor : "pointer"}}
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
        ${max[1]}{
            justify-content: center;
        }        
      }
    
      > .contentArea {
        height: 642px;
      }    

      ${max[1]}{
        margin-top: 50px;
        margin-bottom : 65px;
        display: flex;
        flex-direction : column;
        justify-content: space-between;
        align-items: center;
      }
`;

const PCImages = styled.div`
    ${max[1]}{
        display : none;
    }
`;

const MobileImages = styled.div`
    margin-top : 85px;
    margin-left : 123px;
    ${min[1]}{
        display : none;
    }
`;

const Container = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : flex-start;
`;

const MobileHeading = styled.div`
    width: 280px;
    height: 48px;

    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 24px;
    text-align: justify;
    color: ${Colors.black};

    ${min[1]}{
        display : none;
    }
`;

const HeadingBox = styled.div`
    text-align : center;
    ${max[1]}{
        display : none;
    }
`;

const MarginBox = styled.div`
    margin-top : 123px;
    ${max[1]}{
        margin-top : 0;
    }
`;

const LoginButton = styled.button`
    cursor : pointer;
    display : flex;
    flex-direction : row;

    width: 448px;
    padding : 0;
    border : 0;
    background: ${Colors.white};    
    ${max[1]}{
        width : 281px;
        height : 32px;
    }
`;

const ImageBox = styled.div`
    width: 56px;
    height: 56px;
    background: ${Colors.white};
    border: 1px solid ${Colors.gray2};
    box-sizing: border-box;
    border-radius: 10px 0px 0px 10px;
    padding-top : 12px;
    padding-bottom : 12px;
    ${max[1]}{
        display : none;
    }
`;

const MobileImageBox = styled.div`
    width : 32px;
    height : 32px;
    background: ${Colors.white};
    border: 1px solid ${Colors.gray2};
    box-sizing: border-box;
    border-radius: 10px 0px 0px 10px;
    padding-top : 8px;
    padding-bottom : 8px;
    ${min[1]}{
        display : none;
    }
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
    ${max[1]}{
        width : 249px;
        height : 32px;
        font-size: 10px;
        line-height: 32px;
        letter-spacing: 0px;
        text-align: center;        
    }
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
    ${max[1]}{
        width: 280px;
        height: 24px;
        margin-top : 20px;    
        font-size: 10px;
        line-height: 12px;   
    }    
`;