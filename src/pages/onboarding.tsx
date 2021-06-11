import { Layout } from "components/layout";
import styled from "@emotion/styled";
import { min, max, Heading, Colors, Text } from "components/ui";
import Image from 'next/image';
import React, { useState, useContext, useEffect } from "react";
import { myContext } from "context";
import { User } from 'types/logintypes';
import { Button } from "components/_design/buttons"
import { JobInput } from "components/onboarding/job"
import { YearsInput } from "components/onboarding/years"
import { useRouter } from 'next/router';
import axios from 'axios';

export default function OnboardingPage(){
    const userObject = useContext(myContext) as User;
    const [CompanyName, setCompanyName] = useState("");
    const [Job, setJob] = useState("");
    const [Years, setYears] = useState("");
    const [Prev, setPrev] = useState('/');
    const router = useRouter();

    useEffect(() => {
        const prev = localStorage.getItem("prev") || '/';
        setPrev(prev);
        //console.log(prev);
    }, [])

    const onNameHandler = (event : any) => {
        setCompanyName(event.currentTarget.value);
    }

    function onClickListener(){
        // 온보딩 정보 post로 전송
        axios.post(process.env.NEXT_PUBLIC_API_URL as string +`/user/onboarding`, {
            userId: userObject.userId,
            company: CompanyName,
            jobDepartment: Job,
            career: Years
        })
        .then(function () {
             // response  
            // console.log(res.data.result);
            router.push(Prev);
            localStorage.removeItem("prev");
        }).catch(function (err : any) {
            // 오류발생시 실행
            console.log(err);
        }).then(function() {
            // 항상 실행
        });        
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
                <PCMessage>
                    <Heading bold level = {2} style={{color : Colors.black}}>
                        {<span style={{color : Colors.primary}}>{userObject.username}</span>}{'님 반갑습니다!'}
                    </Heading>
                    <Text size='20px'>입력하신 정보에 따라 적합한 워크북과 코칭 프로그램을 추천해드려요.</Text>
                </PCMessage>
                <MobileHeading>
                    {<span style={{color : Colors.primary}}>{userObject.username}</span>}{'님 반갑습니다!'}
                </MobileHeading>
                <MobileText>입력하신 정보에 따라 적합한 워크북과 코칭 프로그램을<br/>추천해드려요.</MobileText>
                <PCImages>
                    <Image
                    src="/onboarding_hello.png"
                    alt=""
                    width={593}
                    height={354}
                    priority
                    />
                </PCImages>
                <MobileImages>
                    <Image
                        src="/onboarding_hello.png"
                        alt=""
                        width={148}
                        height={88.54}
                        priority
                    />                    
                </MobileImages>
                </div>
                <Container>
                    <InputBox>
                        <Label>회사명</Label>
                        <InputCompany value = {CompanyName} onChange = {onNameHandler} placeholder = "재직중인 회사명을 입력하세요"/>
                    </InputBox>
                    <InputBox>
                        <Label>직무</Label>
                        <JobInput setJob = {setJob}/>
                    </InputBox>
                    <InputBox>
                        <Label>연차</Label>
                        <YearsInput setYears = {setYears}/>
                    </InputBox>
                    <PCButtonBox>
                        <Button onClick = {() => router.push(Prev)} style = {{width : '236px', height : '52px'}}>다음에 하기</Button>
                        <Button onClick = {onClickListener} style = {{width : '236px', height : '52px'}} type = "start" disabled = {CompanyName === '' ||Job === '' || Years === ''? true : false}>완료</Button>
                    </PCButtonBox>
                    <MobileButtonBox>
                        <Button onClick = {() => router.push(Prev)} style = {{width : '136px', height : '28px', fontSize : '12px', borderWidth : '0.4px', borderRadius : '10px'}}>다음에 하기</Button>
                        <Button onClick = {onClickListener} style = {{width : '136px', height : '28px', fontSize : '12px', borderWidth : '0.4px', borderRadius : '10px'}} type = "start" disabled = {CompanyName === '' ||Job === '' || Years === ''? true : false}>완료</Button>
                    </MobileButtonBox>                    
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
        ${max[1]}{
            justify-content: center;
        }        
    }   
`;

const Container = styled.div`
    margin-top : 118px;
    display : flex;
    flex-direction : column;
    justify-content : flex-start;
    ${max[1]}{
        margin-top : 23.77px;
    }       
`;

const PCMessage = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : space-between;

    width: 570px;
    height: 107px;
    margin-top : 64px;
    margin-bottom : 229.22px;
    ${max[1]}{
        display : none;
    }    
`;

const MobileHeading = styled.div`
    margin-top : 50px;
    width: 280px;
    height: 24px;
    font-family: Spoqa Han Sans Neo;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: justified;
    ${min[1]}{
        display : none;
    }    
`;

const MobileText = styled.div`
    margin-top : 19px;
    font-family: Spoqa Han Sans Neo;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0px;
    text-align: left;
    ${min[1]}{
        display : none;
    }       
`;

const PCImages = styled.div`
    ${max[1]}{
        display : none;
    }
`;

const MobileImages = styled.div`
    margin-top : 33px;
    margin-left : 148px;
    ${min[1]}{
        display : none;
    }
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
    ${max[1]}{
        width: 34px;
        height: 12px;
        font-size: 12px;
        line-height: 20px;
        letter-spacing: 0px;
        text-align: left;   
        margin-bottom : 8px;     
    }    
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
    ::-webkit-input-placeholder { color : ${Colors.gray3};} /* Chrome/Opera/Safari */
    ::-moz-placeholder { color : ${Colors.gray3};} /* Firefox 19+ */
    :-ms-input-placeholder { color : ${Colors.gray3};} /* IE 10+ */
    :-moz-placeholder { color : ${Colors.gray3};}  /* Firefox 18- */
    ${max[1]}{
        margin-bottom : 18px;
        height: 24px;
        width: 280px;  
        font-size: 10px;
        line-height: 16px;
        letter-spacing: 0px;
        text-align: left; 
        box-sizing: border-box;
        border-radius: 8px;    
        text-indent : 12px;           
    }     
`;

const PCButtonBox = styled.div`
    width : 480px;
    margin-top : 24px;
    display : flex;
    flex-direction : row;
    justify-content : space-between;
    ${max[1]}{
        display : none;              
    }       
`;

const MobileButtonBox = styled.div`
    width : 280px;
    margin-top : 20px;
    display : flex;
    flex-direction : row;
    justify-content : space-between;    
    ${min[1]}{
        display : none;              
    }      
`;