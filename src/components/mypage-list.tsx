import styled from "@emotion/styled";
import { min, max, Heading, Text ,Colors } from "components/ui";
import React, { useState, useContext } from "react";
import Image from 'next/image';
import { myContext } from "context";
import { User } from 'types/logintypes';
import { MypageCardList } from "components/mypage-card-list";
import { MybuyingList } from 'components/mybuying-table-list'
import { EraseModal } from 'components/erasemodal'

import axios, { AxiosResponse } from 'axios';

export function MypageList(props : any){
    const userObject = useContext(myContext) as User;
    const [Isbought, setIsbought] = useState<boolean>(false);
    const [PaymentData, setPaymentData] = useState<Object>();
    const [LikeData, setLikeData] = useState<Object>();
    const [RunOnce, setRunOnce] = useState<boolean>(true);
    const [ShowEraseModal, setShowEraseModal] = useState<boolean>(false);
    
        if(userObject !== undefined && RunOnce){ // api로딩 후 처음 한 번만 실행
            axios.get(process.env.NEXT_PUBLIC_API_URL as string + `/mypage/payment/${userObject.userId}`, { withCredentials: true }).then((res: AxiosResponse) => {
            if (res.data){
                if(res.status === 201){ // 구매내역 없을때
                    setIsbought(false);
                }
                else{
                    setIsbought(true); // 구매내역 있을때
                    setPaymentData(res.data);
                }
            }
            }) 
            axios.get(process.env.NEXT_PUBLIC_API_URL as string + `/mypage/likeslist/${userObject.userId}`, { withCredentials: true }).then((res: AxiosResponse) => {
                if (res.data){
                    //console.log(res.data.result);
                    setLikeData(res.data.result);
                }
            })            
            setRunOnce(false);
        }

    function onEraseListener(){
        setShowEraseModal(true);
        document.body.style.overflow = 'hidden';
    }

    return(
        <>     
        {userObject? ( // 로그인 시
        <>
        <div className="wrap">
            {props.activeTab === 'mybuying' ? ( // 구매내역
                (Isbought?
                    ( // 내역 있을 경우
                    <>
                        <PCHeading>
                            <Heading bold level = {2} style={{color : Colors.gray1, marginTop : '99px'}}>
                                {userObject.username + '님이 '} {<span style={{color : Colors.primary}}>구매하신 내역</span>}{'입니다.'}
                            </Heading>
                        </PCHeading>
                        <MobileHeading>{userObject.username + '님이 '} {<span style={{color : Colors.primary}}>구매하신 내역</span>}{'입니다.'}</MobileHeading>
                        <MybuyingList data = {PaymentData}/>                        
                    </>
                    ) :  
                    ( // 내역 없을 경우
                    <>
                        <MobileBox>
                        <PCMessage>
                            <Heading bold level = {2} style={{color : Colors.black}}>
                                {userObject.username + '님의'} {<span style={{color : Colors.primary}}>구매 내역</span>}{'이 없어요 :('}
                            </Heading>
                            <Text size='20px'>입력하신 정보에 따라 적합한 워크북과 코칭 프로그램을 추천해드려요.</Text>
                        </PCMessage>
                        <MobileMessage>
                            <MobileHeading>
                                {userObject.username + '님의'} {<span style={{color : Colors.primary}}>구매 내역</span>}{'이 없어요 :('}
                            </MobileHeading>
                            <MobileText>입력하신 정보에 따라 적합한 워크북과 코칭 프로그램을<br/>추천해드려요.</MobileText>            
                        </MobileMessage>
                        <PCImages>
                            <Image
                                src="/mainGraphic_section1_human.png"
                                alt=""
                                width={348}
                                height={231.56}
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
                        </MobileBox>                        
                    </>
                    ) 
                )
            ) : 
            ( // 찜한내역
            (userObject.likeItemIds.length > 0?
                ( // 찜한내역 있을 경우
                <>  
                    <EraseAll>
                        <Erase onClick = {onEraseListener}>모두 지우기</Erase>
                    </EraseAll>
                    <ProductListWrap>
                        <MypageCardList data={[LikeData]} />
                    </ProductListWrap>                    
                </>
                ) 
                : 
                ( // 찜한내역 없는 경우
                <>
                    <MobileBox>
                        <PCMessage>
                            <Heading bold level = {2} style={{color : Colors.black}}>
                                {userObject.username + '님의'} {<span style={{color : Colors.primary}}>찜한 내역</span>}{'이 없어요 :('}
                            </Heading>
                            <Text size='20px'>입력하신 정보에 따라 적합한 워크북과 코칭 프로그램을 추천해드려요.</Text>
                        </PCMessage>
                        <MobileMessage>
                            <MobileHeading>
                                {userObject.username + '님의'} {<span style={{color : Colors.primary}}>찜한 내역</span>}{'이 없어요 :('}
                            </MobileHeading>
                            <MobileText>입력하신 정보에 따라 적합한 워크북과 코칭 프로그램을<br/>추천해드려요.</MobileText>            
                        </MobileMessage>
                        <PCImages>
                            <Image
                                src="/mainGraphic_section1_human.png"
                                alt=""
                                width={348}
                                height={231.56}
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
                    </MobileBox>
                </>
                )
            )
            )
            }
        {           
            userObject? (ShowEraseModal? <EraseModal userId = {userObject.userId} closeEraseModal={setShowEraseModal}/> : null) : (<div/>)
        }
        </div>
        </>
        )
        :
        // 비로그인시, 로딩 전
        (<></>
        )
        }

        </>
    )
}
export default MypageList;

const MobileBox = styled.div`
    ${max[1]}{
        display : flex;
        flex-direction : column;
        align-items : center;
    }
`;

const PCHeading = styled.div`
    ${max[1]}{
        display : none;
    }
`;

const PCMessage = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : space-between;
    width: 675px;
    height: 106px;
    margin-top : 99px;
    ${max[1]}{
        display : none;
    }    
`;

const MobileMessage = styled.div`

`;

const MobileText = styled.div`
    margin-top : 19px;
    width : 100%;
    min-width : 233px;
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

const MobileHeading = styled.div`
    min-width: 280px;
    width : 100%;
    height: 24px;
    margin-top : 40px;
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

const PCImages = styled.div`
    margin-left : 63.5%;
    margin-top : 15%;
    ${max[1]}{
        display : none;
    } 
`;

const MobileImages = styled.div`
    margin-top : 228px;
    margin-left : 65px;
    ${min[1]}{
        display : none;
    }
`;

const EraseAll = styled.div`
    cursor : pointer;
    position : relative;
    height: 30px;
    width: 97px;
    margin-top : 59px;
    margin-left : calc(100% - 97px);
    border-radius: nullpx;
`;

const ProductListWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top : 34px;

  .productCard{
    flex-basis: 100%;
    margin-bottom: 32px;

    ${min[1]} {
      flex-basis: calc(50% - 16px);
    }
    ${min[3]} {
      max-width: 412px;
      flex-basis: calc((100% / 3) - 16px);
    }
  }
`;

const Erase = styled.span`
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 30px;
    letter-spacing: 0px;
    text-align: left;   
    ${max[1]}{
        margin-left : 20px;
        font-size: 15px;
    } 
`;