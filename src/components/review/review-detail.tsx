import styled from "@emotion/styled";
import { useState } from 'react'
import { min, max, Colors, Button } from "components/ui";
import axios from 'axios';
import { useRouter } from 'next/router'

export function ReviewDetail(props : any){
    const[ReviewText, setReviewText] = useState(""); // 코칭 후기
    const[Star,setStar] = useState([false, false, false, false, false]);
    const[Icon,setIcon] = useState([true, true, true, true]);
    const router = useRouter();

    const handleStarClick = (e : any, index : number) => {
        e.preventDefault();
        let clickStates = [...Star];
        for (let i = 0; i < 5; i++) {
            if (i <= index) clickStates[i] = true;
            else clickStates[i] = false;
        }
        setStar(clickStates);
    };

    const clickStar = {
        star_big : "/star_big.png",
        nostar_big : "/nostar_big.png"
        // 모바일 처리 필요 window.innerWidth
    }  

    const handleIconClick = (e : any, index : number, tf : boolean) => {
        e.preventDefault();
        let updateIcon = [...Icon];
        updateIcon[index] = tf;
        setIcon(updateIcon);
    }

    const clickIcon = {
        good_pc_click : "/good_pc_clicked.png",
        good_pc_unclick : "/good_pc_unclicked.png",
        bad_pc_click : "/bad_pc_clicked.png",
        bad_pc_unclick : "/bad_pc_unclicked.png"
        // 모바일 처리 필요 window.innerWidth        
    }  

    const onReviewHandler = (event : any) => {
        setReviewText(event.currentTarget.value);
    }

    function onCloseListener(){
        props.setReviewDetail(false);
        document.body.removeAttribute('style');
    }

    const questions = ["저에게 실질적으로 도움이 되는 피드백을 받았어요.", 
                       "지나치게 간섭하지 않고 적당한 선을 지키면서 필요한 조언을 해주었어요.",
                       "제가 고민하고 있던 부분을 실행할 수 있도록 동기 부여를 해주었어요.",
                       "코칭에 필요한 직무 전문성을 가지고 있어요."]

    const goodQuestions : any = [];
    const badQuestions : any = [];

    function onSubmitListener(){
        let cntStar = 0;
        Star.forEach((elem) => {
            elem === true? cntStar++ : null;
        })

        Icon.forEach((currentValue, index) => {
            currentValue === true? goodQuestions.push(questions[index]) : badQuestions.push(questions[index]);
        });

        axios.post(process.env.NEXT_PUBLIC_API_URL as string  + `/mypage/review`, {
            orderId: props.orderId,
            score: cntStar,
            good: goodQuestions,
            bad: badQuestions,
            content : ReviewText
        })
        .then(function (res : any) {
             // response  
            console.log(res.data.result);
            router.reload();
        }).catch(function (err : any) {
            // 오류발생시 실행
            console.log(err);
        }).then(function() {
            // 항상 실행
        });               
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
                        <StarBox>
                            <Icons type = "image" onClick = {(e) => handleStarClick(e, 0)} src = {clickStar[Star[0]? 'star_big' : 'nostar_big']}/>
                            <Icons type = "image" onClick = {(e) => handleStarClick(e, 1)} src = {clickStar[Star[1]? 'star_big' : 'nostar_big']}/>
                            <Icons type = "image" onClick = {(e) => handleStarClick(e, 2)} src = {clickStar[Star[2]? 'star_big' : 'nostar_big']}/>
                            <Icons type = "image" onClick = {(e) => handleStarClick(e, 3)} src = {clickStar[Star[3]? 'star_big' : 'nostar_big']}/>
                            <Icons type = "image" onClick = {(e) => handleStarClick(e, 4)} src = {clickStar[Star[4]? 'star_big' : 'nostar_big']}/>
                        </StarBox>
                        <SecondQuestions>___님의 코칭은 어떠셨나요?</SecondQuestions>
                        <ClickBox>
                            <Icons type = "image" onClick = {(e) => handleIconClick(e, 0, true)} src = {clickIcon[Icon[0]? 'good_pc_click' : 'good_pc_unclick']}/>
                            <Icons type = "image" onClick = {(e) => handleIconClick(e, 0, false)} src = {clickIcon[!Icon[0]? 'bad_pc_click' : 'bad_pc_unclick']}/>
                            <ClickQuestion>{questions[0]}</ClickQuestion>
                        </ClickBox>
                        <ClickBox>
                            <Icons type = "image" onClick = {(e) => handleIconClick(e, 1, true)} src = {clickIcon[Icon[1]? 'good_pc_click' : 'good_pc_unclick']}/>
                            <Icons type = "image" onClick = {(e) => handleIconClick(e, 1, false)} src = {clickIcon[!Icon[1]? 'bad_pc_click' : 'bad_pc_unclick']}/>
                            <ClickQuestion>{questions[1]}</ClickQuestion>
                        </ClickBox>
                        <ClickBox>
                            <Icons type = "image" onClick = {(e) => handleIconClick(e, 2, true)} src = {clickIcon[Icon[2]? 'good_pc_click' : 'good_pc_unclick']}/>
                            <Icons type = "image" onClick = {(e) => handleIconClick(e, 2, false)} src = {clickIcon[!Icon[2]? 'bad_pc_click' : 'bad_pc_unclick']}/>
                            <ClickQuestion>{questions[2]}</ClickQuestion>
                        </ClickBox>
                        <ClickBox>
                            <Icons type = "image" onClick = {(e) => handleIconClick(e, 3, true)} src = {clickIcon[Icon[3]? 'good_pc_click' : 'good_pc_unclick']}/>
                            <Icons type = "image" onClick = {(e) => handleIconClick(e, 3, false)} src = {clickIcon[!Icon[3]? 'bad_pc_click' : 'bad_pc_unclick']}/>
                            <ClickQuestion>{questions[3]}</ClickQuestion>
                        </ClickBox>                                                      
                        <ThirdQuestions>코칭 후기를 작성해주세요.</ThirdQuestions>
                        <InputReview value = {ReviewText} onChange = {onReviewHandler} placeholder = "이번 코칭이 본인에게 어떤 식으로 도움이 되었는지, 그리고 어떤 분들에게 도움이 될지 적어주세요."/>
                        <Button onClick = {onSubmitListener} type="start" style = {{marginLeft : '200px', width : '200px', height : '52px'}}>완료</Button>   
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

const StarBox = styled.div`
    margin-top : 18.62px;
    margin-bottom : 30.62px;
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

const ClickBox = styled.div`
    margin-top : 16px;
    display : flex;
    flex-direction : row;
    width : 550px;
    height : 20px;
`;

const Icons = styled.input`
    margin-right : 21.22px;
`;

const ClickQuestion = styled.div`
    margin-left : 15px;
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

const InputReview = styled.textarea`
    margin-top : 24px;
    margin-bottom : 28px;
    width: 600px;
    height: 110px;
    background: #FFFFFF;
    border: 1px solid ${Colors.gray3};
    box-sizing: border-box;
    border-radius: 10px;

    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0px;
    text-align: left;   
    font-size: 12px;
    resize: none;
    &::placeholder {
        color: ${Colors.gray3};
        ${min[1]} {
            width : 560px;
        }        
    }

    &:focus {
        border-color: ${Colors.primary};
        outline: none;
    }

    ${min[1]} {
        font-size: 14px;
        line-height: 24px;
        border-radius: 20px;
        padding: 20px;
    }
`;