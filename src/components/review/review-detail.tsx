import styled from "@emotion/styled";
import { useState, useEffect } from 'react'
import { min, max, Colors, Button } from "components/ui";
import axios from 'axios';
import { useRouter } from 'next/router'

export function ReviewDetail(props : any){
    const[ReviewText, setReviewText] = useState(""); // 코칭 후기
    const[Star,setStar] = useState([false, false, false, false, false]);
    const[Icon,setIcon] = useState([2, 2, 2, 2]); // 0 : unclick, 1 : click , 2 : default
    const[IsMobile,setIsMobile] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // pc, 모바일 따라 표시할 아이콘
        function testMobile() {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        }
        testMobile()? setIsMobile(true) : setIsMobile(false);
      }, [])

    const handleStarClick = (e : any, index : number) => {
        e.preventDefault();
        let clickStates = [...Star];
        for (let i = 0; i < 5; i++) {
            if (i <= index) clickStates[i] = true;
            else clickStates[i] = false;
        }
        setStar(clickStates);
    };

    window.addEventListener("resize", handleResize);
    function handleResize() {
        var wlength = window.innerWidth;
            if(wlength<=769){
                setIsMobile(true);
            }else{
                setIsMobile(false);
            }
    }

    let clickStar = {
        star : IsMobile? "/star_small.png" : "/star_big.png",
        nostar : IsMobile? "/nostar_small.png" : "/nostar_big.png"
    }

    const handleIconClick = (e : any, index : number, status : number) => {
        e.preventDefault();
        let updateIcon = [...Icon];
        updateIcon[index] = status;
        setIcon(updateIcon);
    }

    const clickIcon = {
        good_click : IsMobile? "/good_mobile_clicked.png" : "/good_pc_clicked.png",
        good_unclick : IsMobile? "/good_mobile_unclicked.png" : "/good_pc_unclicked.png",
        bad_click : IsMobile? "/bad_mobile_clicked.png" : "/bad_pc_clicked.png",
        bad_unclick : IsMobile? "/bad_mobile_unclicked.png" : "/bad_pc_unclicked.png"
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
            currentValue === 1? goodQuestions.push(questions[index]) : badQuestions.push(questions[index]);
        });

        axios.post(process.env.NEXT_PUBLIC_API_URL as string  + `/mypage/review`, {
            orderId: props.orderId,
            score: cntStar,
            good: goodQuestions,
            bad: badQuestions,
            content : ReviewText
        })
        .then(function () {
            // response  
            // console.log(res.data.result);
            router.reload();
        }).catch(function (err : any) {
            // 오류발생시 실행
            console.log(err);
        }).then(function() {
            // 항상 실행
        });               
    }

    const MobileButton = styled.button`
        min-width : 12px;
        width : 47%;
        border: 1px solid;
        border-color : ${Icon[0] == 1?  Colors.primary : Colors.gray3};
        background : ${Colors.white};
        box-sizing: border-box;
        border-radius: 4px; 
    `;

    const MobileButton3 = styled.button`
        min-width : 12px;
        width : 47%;
        border: 1px solid;
        border-color : ${Icon[1] == 1?  Colors.primary : Colors.gray3};
        background : ${Colors.white};
        box-sizing: border-box;
        border-radius: 4px; 
    `;

    const MobileButton5 = styled.button`
        min-width : 12px;
        width : 47%;
        border: 1px solid;
        border-color : ${Icon[2] == 1?  Colors.primary : Colors.gray3};
        background : ${Colors.white};
        box-sizing: border-box;
        border-radius: 4px; 
    `;

    const MobileButton7 = styled.button`
        min-width : 12px;
        width : 47%;
        border: 1px solid;
        border-color : ${Icon[3] == 1?  Colors.primary : Colors.gray3};
        background : ${Colors.white};
        box-sizing: border-box;
        border-radius: 4px; 
    `;

    const MobileButton2 = styled.button`
        min-width : 12px;
        width : 47%;
        border: 1px solid;
        border-color : ${Icon[0] == 0?  Colors.primary : Colors.gray3};
        background : ${Colors.white};
        box-sizing: border-box;
        border-radius: 4px; 
    `;

    const MobileButton4 = styled.button`
        min-width : 12px;
        width : 47%;
        border: 1px solid;
        border-color : ${Icon[1] == 0?  Colors.primary : Colors.gray3};
        background : ${Colors.white};
        box-sizing: border-box;
        border-radius: 4px; 
    `;
    
    const MobileButton6 = styled.button`
        min-width : 12px;
        width : 47%;
        border: 1px solid;
        border-color : ${Icon[2] == 0?  Colors.primary : Colors.gray3};
        background : ${Colors.white};
        box-sizing: border-box;
        border-radius: 4px; 
    `;
    
    const MobileButton8 = styled.button`
        min-width : 12px;
        width : 47%;
        border: 1px solid;
        border-color : ${Icon[3] == 0?  Colors.primary : Colors.gray3};
        background : ${Colors.white};
        box-sizing: border-box;
        border-radius: 4px; 
    `;    

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
                            <StarIcons type = "image" onClick = {(e) => handleStarClick(e, 0)} src = {clickStar[Star[0]? 'star' : 'nostar']}/>
                            <StarIcons type = "image" onClick = {(e) => handleStarClick(e, 1)} src = {clickStar[Star[1]? 'star' : 'nostar']}/>
                            <StarIcons type = "image" onClick = {(e) => handleStarClick(e, 2)} src = {clickStar[Star[2]? 'star' : 'nostar']}/>
                            <StarIcons type = "image" onClick = {(e) => handleStarClick(e, 3)} src = {clickStar[Star[3]? 'star' : 'nostar']}/>
                            <StarIcons type = "image" onClick = {(e) => handleStarClick(e, 4)} src = {clickStar[Star[4]? 'star' : 'nostar']}/>
                        </StarBox>
                        <SecondQuestions>___님의 코칭은 어떠셨나요?</SecondQuestions>
                        
                        <ClickBox>
                            <PCIcons type = "image" onClick = {(e) => handleIconClick(e, 0, 1)} src = {clickIcon[Icon[0] == 1? 'good_click' : 'good_unclick']}/>
                            <PCIcons type = "image" onClick = {(e) => handleIconClick(e, 0, 0)} src = {clickIcon[Icon[0] == 0? 'bad_click' : 'bad_unclick']}/>
                            <ClickQuestion>{questions[0]}</ClickQuestion>
                            <MobileBox>
                                <MobileButton onClick = {(e) => handleIconClick(e, 0, 1)}><MobileIcons src = {clickIcon[Icon[0] == 1? 'good_click' : 'good_unclick']}/></MobileButton>
                                <MobileButton2 onClick = {(e) => handleIconClick(e, 0, 0)}><MobileIcons src = {clickIcon[Icon[0] == 0? 'bad_click' : 'bad_unclick']}/></MobileButton2>
                            </MobileBox>
                        </ClickBox>
                        
                        <ClickBox>
                            <PCIcons type = "image" onClick = {(e) => handleIconClick(e, 1, 1)} src = {clickIcon[Icon[1] == 1? 'good_click' : 'good_unclick']}/>
                            <PCIcons type = "image" onClick = {(e) => handleIconClick(e, 1, 0)} src = {clickIcon[Icon[1] == 0? 'bad_click' : 'bad_unclick']}/>
                            <ClickQuestion>{questions[1]}</ClickQuestion>
                            <MobileBox>
                                <MobileButton3 onClick = {(e) => handleIconClick(e, 1, 1)}><MobileIcons src = {clickIcon[Icon[1] == 1? 'good_click' : 'good_unclick']}/></MobileButton3>
                                <MobileButton4 onClick = {(e) => handleIconClick(e, 1, 0)}><MobileIcons src = {clickIcon[Icon[1] == 0? 'bad_click' : 'bad_unclick']}/></MobileButton4>
                            </MobileBox>                            
                        </ClickBox>

                        <ClickBox>
                            <PCIcons type = "image" onClick = {(e) => handleIconClick(e, 2, 1)} src = {clickIcon[Icon[2] == 1? 'good_click' : 'good_unclick']}/>
                            <PCIcons type = "image" onClick = {(e) => handleIconClick(e, 2, 0)} src = {clickIcon[Icon[2] == 0? 'bad_click' : 'bad_unclick']}/>
                            <ClickQuestion>{questions[2]}</ClickQuestion>
                            <MobileBox>
                                <MobileButton5 onClick = {(e) => handleIconClick(e, 2, 1)}><MobileIcons src = {clickIcon[Icon[2] == 1? 'good_click' : 'good_unclick']}/></MobileButton5>
                                <MobileButton6 onClick = {(e) => handleIconClick(e, 2, 0)}><MobileIcons src = {clickIcon[Icon[2] == 0? 'bad_click' : 'bad_unclick']}/></MobileButton6>
                            </MobileBox>                            
                        </ClickBox>

                        <ClickBox>
                            <PCIcons type = "image" onClick = {(e) => handleIconClick(e, 3, 1)} src = {clickIcon[Icon[3] == 1? 'good_click' : 'good_unclick']}/>
                            <PCIcons type = "image" onClick = {(e) => handleIconClick(e, 3, 0)} src = {clickIcon[Icon[3] == 0? 'bad_click' : 'bad_unclick']}/>
                            <ClickQuestion>{questions[3]}</ClickQuestion>
                            <MobileBox>
                                <MobileButton7 onClick = {(e) => handleIconClick(e, 3, 1)}><MobileIcons src = {clickIcon[Icon[3] == 1? 'good_click' : 'good_unclick']}/></MobileButton7>
                                <MobileButton8 onClick = {(e) => handleIconClick(e, 3, 0)}><MobileIcons src = {clickIcon[Icon[3] == 0? 'bad_click' : 'bad_unclick']}/></MobileButton8>
                            </MobileBox>                            
                        </ClickBox>                                                     
                        
                        <ThirdQuestions>코칭 후기를 작성해주세요.</ThirdQuestions>
                        <InputReview value = {ReviewText} onChange = {onReviewHandler} placeholder = "이번 코칭이 본인에게 어떤 식으로 도움이 되었는지, 그리고 어떤 분들에게 도움이 될지 적어주세요."/>
                        <MobileSubmitButton>
                            <Button onClick = {onSubmitListener} disabled = {ReviewText === ''? true : false} type="start" style = {{minWidth : '136px', width : '50%', height : '28px', fontSize : '12px'}}>완료</Button>   
                        </MobileSubmitButton>
                        <PCSubmitButton>
                            <Button onClick = {onSubmitListener} disabled = {ReviewText === ''? true : false} type="start" style = {{width : '200px', height : '52px'}}>완료</Button>   
                        </PCSubmitButton>
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
    min-width: 280px;
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
        width: calc(100% - 40px);
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

    padding : 72px 100px 104px 100px;
    ${max[1]}{
        border-radius: 10px;
        padding : 54px 20px 16px 20px;
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
        border-width : 0.8px;
    }       
`;

const ReviewBox = styled.div`
    margin-top : 28px;

    ${max[1]}{
        flex-direction : column;
        margin-top : 12px;
        height: calc(100vh - 80px - 98px - 16px);
        overflow-y: scroll;
        overflow-x: hidden;
        &::-webkit-scrollbar {
            width: 7px;
        }
        &::-webkit-scrollbar-thumb {
            background-color: ${Colors.gray2};
            border-radius: 6px;         
        }         
    }
`;

const StarBox = styled.div`
    margin-top : 18.62px;
    margin-bottom : 30.62px;
    ${max[1]}{
        margin-top : 9.75px;
        margin-bottom : 21.75px;
    }        
`;

const FirstQuestions = styled.div`
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
        width : 100%;
        min-width: 240px;
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
        width : 100%;
        min-width: 240px;
        font-weight: 500;
        font-size: 12px;
        line-height: 20px;
        margin-bottom : 14px;
    } 
`;

const ClickBox = styled.div`
    margin-bottom : 12px;
    ${min[1]}{
        margin-top : 16px;
        width : 550px;
        height : 20px;
        display : flex;
        flex-direction : row;
    }     
`;

const StarIcons = styled.input`
    margin-right : 5.25px;
    ${max[1]}{
        margin-right : 3.5px;
    } 
`;

const PCIcons = styled.input`
    margin-right : 22.44px;
    ${max[1]}{
        display : none;
    } 
`;

const MobileBox = styled.div`
    margin-top : 8px;
    display : flex;
    flex-direction : row;
    justify-content : space-between;
    height : 20px;
    ${min[1]}{
        display : none;
    } 
`;

const MobileIcons = styled.img`
    margin-top : 2px;
`;

const ClickQuestion = styled.div`
    margin-left : 15px;
    width: 454px;

    font-family: Spoqa Han Sans Neo;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0px;
    text-align: left;
    color : ${Colors.gray1};
    ${max[1]}{
        margin : 0;
        width : 100%;
        font-size: 10px;
        font-weight: 500;
        line-height: 16px;        
    }     
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
        width : 100%;
        min-width: 240px;
        font-weight: 500;
        font-size: 12px;
        line-height: 20px;
        margin-top : 20px;
    } 
`;

const InputReview = styled.textarea`
    margin-top : 12px;
    margin-bottom : 28px;
    padding: 12px;
    width: 100%;
    min-height: 110px;
    background: #FFFFFF;
    border: 1px solid ${Colors.gray3};
    box-sizing: border-box;
    border-radius: 10px;

    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0px;
    text-align: left;   
    font-size: 10px;
    line-height: 16px;
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
        width: 600px;
        height: 110px;
        margin-top : 24px;
        font-size: 14px;
        line-height: 24px;
        border-radius: 20px;
        padding: 20px;
    }
`;

const MobileSubmitButton = styled.div`
    width : 100%;
    text-align : center;
    ${min[1]}{
        display : none;
    }
`;

const PCSubmitButton = styled.div`
    width : 100%;
    text-align : center;
    ${max[1]}{
        display : none;
    }
`;