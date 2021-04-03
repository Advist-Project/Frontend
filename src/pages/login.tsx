import styled from "@emotion/styled";
import { Heading } from "components/ui";

export default function LoginPage(){

    return (
        <Box>
            <div style={{marginTop : "62px"}}>
                <Heading level={3} bold>advist</Heading>
            </div>
            <div style={{marginTop : "66px"}}>
                <Heading level={4} bold >지금 가입하시면 5만원 상당의 자료를 무료로 드려요</Heading>
            </div>
            <div style={{marginTop : "60px"}}>
            <Naver><Icon/><Name>Naver로 시작하기</Name></Naver>
            <Kakao><Icon/><Name>Kakao로 시작하기</Name></Kakao>
            <Twitter onClick = {() => location.href = "https://criel.herokuapp.com/auth/twitter"}><Icon/><Name>Twitter로 시작하기</Name></Twitter>
            <Google onClick = {() => location.href = "https://criel.herokuapp.com/auth/google"}><Icon/><Name>Google로 시작하기</Name></Google>
            <Github onClick = {() => location.href = "https://criel.herokuapp.com/auth/github"}><Icon/><Name>Github로 시작하기</Name></Github>
            </div>
            <Agree>최초 로그인 시 어드바이스트의&nbsp;
            <a style={{textDecorationLine : "underline", color : "#5F5F5F",
            fontWeight : "bold", fontFamily : "Noto Sans KR" , fontStyle : "normal"}}
            href="http://www.naver.com" target="_blank">이용약관, 개인정보취급방침</a>    
            에 동의하는 것으로 간주합니다.</Agree>
        </Box>
    )
}

const Box = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;

    width: 768px;
    height: 813px;
    margin:0 auto; 

    background: #FFFFFF;
    border: 1px solid #BDBDBD;
    box-sizing: border-box;

`;

const Icon  = styled.div`
    width: 33px;
    height: 33px;
    background: #C4C4C4;

    margin : 12px 14px 11px 130px;
`;

const Name = styled.div`
    font-family: Roboto;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: center;

    margin-top : 19px;
    margin-bottom : 16px;
`;

const Naver = styled.button`
    display : flex;
    flex-direction : row;

    cursor : pointer;
    height: 56px;
    width: 447px;
    border-radius: 4px;
    border-width : 0;

    box-shadow: 0px 4px 4px 0px #000000 25%;
    
    color: #FFFFFF;

    background: #63C33D;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
`;

const Kakao = styled.button`
    display : flex;
    flex-direction : row;

    cursor : pointer;
    height: 56px;
    width: 447px;
    border-radius: 4px;
    border-width : 0;

    margin-top : 14px;
    box-shadow: 0px 4px 4px 0px #000000 25%;
    
    font-family: Roboto;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: center;
    color: #FFFFFF;

    background: #FCE84D;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
`;

const Twitter = styled.button`
    display : flex;
    flex-direction : row;

    cursor : pointer;
    height: 56px;
    width: 447px;
    border-radius: 4px;
    border-width : 0;

    margin-top : 14px;
    box-shadow: 0px 4px 4px 0px #000000 25%;
    
    font-family: Roboto;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: center;
    color: #FFFFFF;

    background: #1DA1F2;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
`;

const Google = styled.button`
    display : flex;
    flex-direction : row;

    cursor : pointer;
    height: 56px;
    width: 447px;
    border-radius: 4px;
    border-width : 0;

    margin-top : 14px;
    box-shadow: 0px 4px 4px 0px #000000 25%;
    
    font-family: Roboto;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: center;
    color: #FFFFFF;

    background: #D0533F;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
`;

const Github = styled.button`
    display : flex;
    flex-direction : row;

    cursor : pointer;
    height: 56px;
    width: 447px;
    border-radius: 4px;
    border-width : 0;

    margin-top : 14px;
    box-shadow: 0px 4px 4px 0px #000000 25%;
    
    font-family: Roboto;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: center;
    color: #FFFFFF;

    background: #000000;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
`;

const Agree = styled.div`
    width: 447px;
    height: 46px;

    margin-top : 35px;

    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 15.7871px;
    line-height: 23px;
    letter-spacing :-1px;

    color: #898989;
`;