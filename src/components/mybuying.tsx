import styled from "@emotion/styled";
import { Heading, Text ,Colors } from "components/ui";
import React, { useContext } from "react";
import Image from 'next/image';
import { myContext } from "context";
import { User } from 'types/logintypes';

export function MyBuying(){
    const userObject = useContext(myContext) as User;

    return(
        <>
        {userObject? (
        <>
        <div className="wrap">
        <Message>
            <Heading bold level = {2} style={{color : Colors.gray1}}>
                {userObject.username + '님의'} {<span style={{color : Colors.primary}}>구매내역</span>}{'이 없어요 :('}
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
export default MyBuying;

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