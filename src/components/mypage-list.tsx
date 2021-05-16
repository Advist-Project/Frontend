import styled from "@emotion/styled";
import { mq, Heading, Text ,Colors } from "components/ui";
import React, { useState, useEffect , useContext } from "react";
import Image from 'next/image';
import { myContext } from "context";
import { User } from 'types/logintypes';
import { MypageCardList } from "components/mypage-card-list";
import { MybuyingList } from 'components/mybuying-table-list'
import axios, { AxiosResponse } from 'axios';

export function MypageList(props : any){
    const userObject = useContext(myContext) as User;

    const [Isbought, setIsbought] = useState<boolean>(false);
    const [Data, setData] = useState<Object>();
    
    useEffect(() => {  
        if(userObject !== undefined){
            axios.get(process.env.NEXT_PUBLIC_API_URL as string + `/mypage/payment/:${userObject.userId}`, { withCredentials: true }).then((res: AxiosResponse) => {
            // /mypage/payment/1
            if (res.data){
                if(res.status === 201){ // 구매내역 없을때
                    setIsbought(false);        
                }
                else{
                    setIsbought(true); // 구매내역 있을때
                    setData(res.data);
                }
            }
            }) 
        }
    }, [])    

    return(
        <>     
        {userObject? ( // 로그인 시
        <>
        <div className="wrap">
            {Isbought ? ( // 내역 있을 경우
                (props.activeTab === 'mybuying'? ( // 구매내역
                <>
                    <Heading bold level = {2} style={{color : Colors.gray1, marginTop : '99px'}}>
                        {userObject.username + '님이 '} {<span style={{color : Colors.primary}}>구매하신 내역</span>}{'입니다.'}
                    </Heading>
                    <MybuyingList data = {Data}/>
                </>) : 
                ( // 찜한 내역
                <>  
                    <EraseAll>
                        <Text size='20px'>모두 지우기</Text>
                        {/*모두 지우기 기능 구현 필요(api연동 후) */}
                    </EraseAll>
                    <ProductListWrap>
                        <MypageCardList data={[]} /> {/* 데이터 넣어야 함 */}
                        {/* 페이지 생성되면 url 변경 */}
                    </ProductListWrap>                    
                </>))
            ) : ( // 내역 없을 경우
            <>
                <Message>
                <Heading bold level = {2} style={{color : Colors.gray1}}>
                    {userObject.username + '님의'} {<span style={{color : Colors.primary}}>{props.activeTab === 'mybuying'? '구매 내역' : '찜한 내역'}</span>}{'이 없어요 :('}
                </Heading>
                <Text size='20px'>입력하신 정보에 따라 적합한 워크북과 코칭 프로그램을 추천해드려요.</Text>
            </Message>
            <ImageContent>
                <Image
                    src="/mainGraphic_section1_human.png"
                    alt=""
                    width={348}
                    height={231.56}
                    priority
                />
            </ImageContent>            
            </>)}
        </div>
        </>
        ) :
        // 비로그인시, 로딩 전
        (<div/>
        )
        }

        </>
    )
}
export default MypageList;

const Message = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : space-between;


    width: 675px;
    height: 106px;
    margin-top : 99px;
`;

const ImageContent = styled.div`
    margin-left : 827px;
    margin-top : 195.18px;

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

    ${mq[1]} {
      flex-basis: calc(50% - 16px);
    }
    ${mq[3]} {
      max-width: 412px;
      flex-basis: calc((100% / 3) - 16px);
    }
  }
`;