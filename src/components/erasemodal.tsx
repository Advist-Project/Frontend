import styled from "@emotion/styled";
import { min, max, Colors, Dimmed, Button } from "components/ui";
import axios, { AxiosResponse } from 'axios';

export function EraseModal(props : any){ 

    function onCloseListener(){
        props.closeEraseModal(false);
        document.body.removeAttribute('style');
    }
    function eraseListener(){
        axios.get(process.env.NEXT_PUBLIC_API_URL as string + `/mypage/uncheckedall/${props.userId}`, { withCredentials: true }).then((res: AxiosResponse) => {
            if (res.data){
                //console.log(res.data);
                window.location.reload();
            }
        })
    }

    return(
        <>
        <Container>
            <OnContainer>
                <Box>
                    <FirstText>모두 지우기</FirstText>
                    <SecondText>지우면 다시 되돌릴 수 없어요.</SecondText>
                    <ButtonBox>
                        <Button onClick={onCloseListener} style = {{width : '200px'}} type='login'>이전</Button>
                        <Button onClick = {eraseListener} style = {{width : '200px'}}>다음</Button>
                    </ButtonBox>
                    <MobileButtonBox>
                        <Button onClick = {eraseListener} style = {{width : '200px', height : '26px', fontSize : '12px', fontWeight : '400'}}>지울래요</Button>
                        <Button onClick={onCloseListener} style = {{width : '200px', height : '26px', fontSize : '12px', fontWeight : '400'}} type='login'>잠시만요</Button>
                    </MobileButtonBox>                    
                </Box>
            </OnContainer>
        </Container>
        <Dimmed/>
        </>
    )
}
export default EraseModal;

const Container = styled.div`
    position: fixed;
    width: calc(100% - 40px);
    max-width: 560px;
    max-height : 320px;
    min-height : 200px;
    height: calc(100vh - 80px);
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: ${Colors.gray1};
    border-radius: 20px;
    z-index: 11;

    ${max[1]}{
        width: 280px;
        height: 200px;
        transform: translateX(-50%) translateY(-50%);
        border-radius: 10px;
    }
`;

const OnContainer = styled.div`
    width: 100%;
    height: calc(100vh - 80px);
    max-width: 560px;
    max-height : 320px;
    min-height : 200px;
    background : white;
    border-radius: 20px;
    padding : 0 70px 0 70px;
    ${max[1]}{
        width: 280px;
        height: 200px;
        border-radius: 10px;
        padding : 0 50px 0 50px;
    }
`;

const Box = styled.div`
    display : flex;
    flex-direction : column;
`;

const FirstText = styled.div`
    width : 100%;
    padding-top : 72px;
    font-family: Spoqa Han Sans Neo;
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: 34px;
    letter-spacing: 0px;
    text-align: center;
    ${max[1]}{
        padding-top : 40px;
        font-size: 18px;
        line-height: 24px;        
    }
`;

const SecondText = styled.div`
    margin-top : 40px;
    width : 100%;
    font-family: Spoqa Han Sans Neo;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px;
    letter-spacing: 0px;
    text-align: center;
    ${max[1]}{
        margin-top : 12px;
        font-size: 10px;
        line-height: 16px;        
    }    
`;

const ButtonBox = styled.div`
    margin-top : 68px;
    display : flex;
    flex-direction : row;
    justify-content : space-between;
    ${max[1]}{
        display : none;      
    }     
`;

const MobileButtonBox = styled.div`
    margin-top : 28px;
    height : 60px;
    display : flex;
    flex-direction : column;
    justify-content : space-between;
    align-items : center;
    ${min[1]}{
        display : none;      
    }   
`;