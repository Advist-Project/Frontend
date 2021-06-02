import styled from "@emotion/styled";
import { useState, useEffect } from 'react'
import { max, Colors, Button } from "components/ui";
import axios, { AxiosResponse } from 'axios';
import Image from 'next/image';

export function ReviewDetail(props : any){
    const [Data, setData] = useState<any>();
    useEffect(() => {
        /*
        axios.get(process.env.NEXT_PUBLIC_API_URL as string  + `/mypage/review`, { withCredentials: true }).then((res: AxiosResponse) => {
            if (res.data) {
                setData(res.data.result);
            }
        })
        */
    }, [])

    function onCloseListener(){
        props.setReviewDetail(false);
        document.body.removeAttribute('style');
    }

    return(
        <>
        <Container>
            <OnContainer>
                <OutButton onClick = {() => onCloseListener()}><img src="/out.png"/></OutButton>
                <Box>
                    <BoxHeader>후기 작성</BoxHeader>
                    <Line/>
                    <ReviewBox>
                        <FirstQuestions>___님의 코칭에 전반적으로 만족하셨나요?</FirstQuestions>
                        <StarBox>star</StarBox>
                        <SecondQuestions>___님의 코칭은 어떠셨나요?</SecondQuestions>
                        <ClickBox>
                            <Image src="/good_pc_unclicked.png" alt="" width={20} height={20} priority/>
                            <div style={{marginRight : '21.22px'}}/>
                            <Image src="/bad_pc_unclicked.png" alt="" width={20} height={20} priority/>
                            <ClickQuestion>저에게 실질적으로 도움이 되는 피드백을 받았어요.</ClickQuestion>
                        </ClickBox>
                        <ClickBox>
                            <Image src="/good_pc_unclicked.png" alt="" width={20} height={20} priority/>
                            <div style={{marginRight : '21.22px'}}/>
                            <Image src="/bad_pc_unclicked.png" alt="" width={20} height={20} priority/>
                            <ClickQuestion>지나치게 간섭하지 않고 적당한 선을 지키면서 필요한 조언을 해주었어요.</ClickQuestion>
                        </ClickBox>
                        <ClickBox>
                            <Image src="/good_pc_unclicked.png" alt="" width={20} height={20} priority/>
                            <div style={{marginRight : '21.22px'}}/>
                            <Image src="/bad_pc_unclicked.png" alt="" width={20} height={20} priority/>
                            <ClickQuestion>제가 고민하고 있던 부분을 실행할 수 있도록 동기 부여를 해주었어요.</ClickQuestion>
                        </ClickBox>
                        <ClickBox>
                            <Image src="/good_pc_unclicked.png" alt="" width={20} height={20} priority/>
                            <div style={{marginRight : '21.22px'}}/>
                            <Image src="/bad_pc_unclicked.png" alt="" width={20} height={20} priority/>
                            <ClickQuestion>코칭에 필요한 직무 전문성을 가지고 있어요.</ClickQuestion>
                        </ClickBox>                                                      
                        <ThirdQuestions>코칭 후기를 작성해주세요.</ThirdQuestions>
                        <InputReview placeholder = "이번 코칭이 본인에게 어떤 식으로 도움이 되었는지, 그리고 어떤 분들에게 도움이 될지 적어주세요."/>
                        <Button type="start" style = {{width : '200px', height : '52px'}}>완료</Button>   
                    </ReviewBox>
                </Box>
            </OnContainer>
        </Container>      
        </>
    )

}
export default ReviewDetail;

const Container = styled.div`
    position: fixed;
    width: calc(100% - 40px);
    max-width: 800px;
    max-height : 696px;
    min-height : 465px;
    height: calc(100vh - 80px);
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: ${Colors.gray1};
    border-radius: 20px;
    z-index: 11;

    &::after {
    content: '';
    display: block;
    position: fixed;
    top: -100%;
    left: -100%;
    width: 1000vw;
    height: 1000vh;
    background: rgba(20, 20, 42, 0.5);
    z-index: -1; 
    }
    ${max[1]}{
        width: calc(100% - 20px);
        transform: translateX(-50%) translateY(-50%);
        border-radius: 10px;
    }
`;

const OnContainer = styled.div`
    width: 100%;
    height: calc(100vh - 80px);
    max-width: 800px;
    max-height : 696px;
    min-height : 465px;
    background : white;
    border-radius: 20px;
    ${max[1]}{
        border-radius: 10px;
    }
`;

const OutButton = styled.div`
    position: absolute;
    top: 32px;
    right: 32px;
    cursor : pointer;
    width: 24px;
    height: 24px;
    z-index: 12;
    ${max[1]}{
        top: 12px;
        right: 12px;
    }       
`;
// 600px
const Box = styled.div`
    display : flex;
    flex-direction : column;
    width: 100%;
    height : 304px;
    padding : 72px 100px 104px 100px;
    ${max[1]}{
        border-radius: 10px;
        padding : 54px 20px 175px 20px;
    }    
`;

const BoxHeader = styled.div`
    height: 28px;
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: bold;
    font-size: 28px;
    line-height: 34px;
    color : ${Colors.black};   
    ${max[1]}{
        height: 20px;
        font-size: 16px;
        font-weight: 700;
        line-height: 20px;
        letter-spacing: 0px;
        text-align: left;        
    }       
`;
// 600px
const Line = styled.div`
    margin-top : 24px;
    width: 100%;
    height: 0px;
    border: 1px solid ${Colors.gray3};
    ${max[1]}{
        margin-top : 12px;
    }       
`;

const ReviewBox = styled.div`
    margin-top : 28px;
    ${max[1]}{
        flex-direction : column;
        margin-top : 12px;
    }     
`;

const FirstQuestions = styled.span`
    width: 305px;
    height: 16px;

    font-family: Spoqa Han Sans Neo;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0px;
    text-align: left;
    color : ${Colors.gray2};
    ${max[1]}{
        width: 240px;
        font-weight: 500;
        font-size: 12px;
        line-height: 20px;
    }     
`;

const SecondQuestions = styled.div`
    margin-bottom : 10px;
    width: 305px;
    height: 16px;

    font-family: Spoqa Han Sans Neo;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0px;
    text-align: left;
    color : ${Colors.gray2};
    ${max[1]}{
        width: 240px;
        font-weight: 500;
        font-size: 12px;
        line-height: 20px;
    } 
`;

const StarBox = styled.div`
    margin-top : 18.62px;
    margin-bottom : 12px;
    width: 36.75px;
    height: 36.75px;
`;

const ClickBox = styled.div`
    margin-top : 16px;
    display : flex;
    flex-direction : row;
    width : 550px;
    height : 20px;
`;

const ClickQuestion = styled.div`
    margin-left : 37.22px;
    width: 454px;
    left: 756px;

    font-family: Spoqa Han Sans Neo;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0px;
    text-align: left;
    color : ${Colors.gray1};
`;

const ThirdQuestions = styled.div`
    margin-top : 30px;
    width: 305px;
    height: 16px;

    font-family: Spoqa Han Sans Neo;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0px;
    text-align: left;
    color : ${Colors.gray2};
    ${max[1]}{
        width: 240px;
        font-weight: 500;
        font-size: 12px;
        line-height: 20px;
    } 
`;

const InputReview = styled.input`
    margin-top : 24px;
    margin-bottom : 28px;
    width: 600px;
    height: 110px;
    background: #FFFFFF;
    border: 1px solid #A0A3BD;
    box-sizing: border-box;
    border-radius: 20px;
`;